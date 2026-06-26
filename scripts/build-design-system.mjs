import { createHash } from "node:crypto";
import { existsSync, promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as esbuild from "esbuild";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const namespace = "XuanwoDesignSystem_8e9a9d";

const componentDirOrder = new Map([
  ["components/content", 0],
  ["components/core", 1],
  ["components/feedback", 2],
  ["components/forms", 3],
  ["components/navigation", 4],
]);

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function rel(value) {
  return toPosix(path.relative(root, value));
}

async function readText(file) {
  return fs.readFile(file, "utf8");
}

async function writeJson(file, value) {
  await fs.writeFile(file, `${JSON.stringify(value, null, 2)}\n`);
}

async function listFiles(dir, predicate = () => true) {
  if (!existsSync(dir)) return [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listFiles(fullPath, predicate));
    } else if (predicate(fullPath)) {
      files.push(fullPath);
    }
  }
  return files;
}

function sha256Short(source) {
  return createHash("sha256").update(source).digest("hex").slice(0, 12);
}

function parseAttrs(source) {
  const attrs = {};
  for (const match of source.matchAll(/([A-Za-z][\w-]*)="([^"]*)"/g)) {
    attrs[match[1]] = match[2];
  }
  return attrs;
}

function parseExports(source) {
  const names = [];
  for (const match of source.matchAll(/^\s*export\s+(?:async\s+)?(?:function|class|const|let|var)\s+([A-Za-z_$][\w$]*)/gm)) {
    names.push(match[1]);
  }
  for (const match of source.matchAll(/^\s*export\s*\{([^}]+)\};?/gm)) {
    for (const spec of match[1].split(",")) {
      const name = spec.trim().split(/\s+as\s+/).pop()?.trim();
      if (name) names.push(name);
    }
  }
  return [...new Set(names)];
}

function rewriteImportsAndExports(source, sourcePath) {
  let code = source.replace(/^\s*import\s+React\s+from\s+["']react["'];?\s*$/gm, "");

  code = code.replace(/^\s*import\s+\{([^}]+)\}\s+from\s+["'][^"']+["'];?\s*$/gm, (_, rawSpecifiers) => {
    const specifiers = rawSpecifiers
      .split(",")
      .map((specifier) => specifier.trim())
      .filter(Boolean)
      .map((specifier) => specifier.replace(/\s+as\s+/g, ": "));
    return `const { ${specifiers.join(", ")} } = __ds_scope;`;
  });

  const remainingImport = code.match(/^\s*import\s+.*$/m);
  if (remainingImport) {
    throw new Error(`${sourcePath}: unsupported import: ${remainingImport[0].trim()}`);
  }

  code = code.replace(/^\s*export\s+(?=(?:async\s+)?(?:function|class|const|let|var)\s+)/gm, "");
  code = code.replace(/^\s*export\s*\{[^}]+\};?\s*$/gm, "");
  return code;
}

async function transformJsx(source, sourcePath) {
  const result = await esbuild.transform(source, {
    loader: "jsx",
    jsx: "transform",
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
    target: "es2018",
    legalComments: "inline",
    sourcefile: sourcePath,
  });
  return result.code.trimEnd();
}

async function componentInfo() {
  const files = await listFiles(path.join(root, "components"), (file) => file.endsWith(".jsx"));
  const sorted = files.sort((a, b) => {
    const aRel = rel(a);
    const bRel = rel(b);
    const aDir = toPosix(path.dirname(aRel));
    const bDir = toPosix(path.dirname(bRel));
    const groupDelta = (componentDirOrder.get(aDir) ?? 99) - (componentDirOrder.get(bDir) ?? 99);
    return groupDelta || aRel.localeCompare(bRel);
  });

  const infos = [];
  for (const file of sorted) {
    const source = await readText(file);
    infos.push({
      file,
      path: rel(file),
      exports: parseExports(source),
      source,
    });
  }
  return infos;
}

async function uiKitInfo() {
  const files = await listFiles(path.join(root, "ui_kits"), (file) => file.endsWith(".jsx"));
  const sorted = files.sort((a, b) => rel(a).localeCompare(rel(b)));
  return Promise.all(sorted.map(async (file) => ({
    file,
    path: rel(file),
    source: await readText(file),
  })));
}

async function compileFileBlock({ path: sourcePath, source, exports = [] }, exposeExports) {
  const rewritten = rewriteImportsAndExports(source, sourcePath);
  const transformed = await transformJsx(rewritten, sourcePath);
  const assign = exposeExports && exports.length > 0
    ? `\nObject.assign(__ds_scope, { ${exports.join(", ")} });`
    : "";

  return [
    `// ${sourcePath}`,
    "try { (() => {",
    transformed,
    assign,
    `})(); } catch (e) { __ds_ns.__errors.push({ path: ${JSON.stringify(sourcePath)}, error: String((e && e.message) || e) }); }`,
    "",
  ].join("\n");
}

async function buildBundle(components, uiKits) {
  const sourceHashes = {};
  for (const item of [...components, ...uiKits]) {
    sourceHashes[item.path] = sha256Short(item.source);
  }

  const publicComponents = components.flatMap((item) =>
    item.exports.map((name) => ({ name, sourcePath: item.path })),
  );

  const meta = {
    format: 3,
    namespace,
    components: publicComponents,
    sourceHashes,
    inlinedExternals: [],
    unexposedExports: [],
  };

  const chunks = [
    `/* @ds-bundle: ${JSON.stringify(meta)} */`,
    "",
    "(() => {",
    "",
    `const __ds_ns = (window.${namespace} = window.${namespace} || {});`,
    "",
    "const __ds_scope = {};",
    "",
    "(__ds_ns.__errors = __ds_ns.__errors || []);",
    "",
  ];

  for (const item of components) {
    chunks.push(await compileFileBlock(item, true));
  }

  for (const item of uiKits) {
    chunks.push(await compileFileBlock({ ...item, exports: [] }, false));
  }

  for (const component of publicComponents) {
    chunks.push(`__ds_ns.${component.name} = __ds_scope.${component.name};`);
    chunks.push("");
  }

  chunks.push("})();", "");
  await fs.writeFile(path.join(root, "_ds_bundle.js"), chunks.join("\n"));
  return meta;
}

async function parseCards() {
  const files = await listFiles(root, (file) =>
    file.endsWith(".card.html") || /ui_kits[/\\][^/\\]+[/\\]index\.html$/.test(file),
  );
  const cards = [];
  for (const file of files) {
    const source = await readText(file);
    const match = source.match(/<!--\s*@dsCard\s+([^]*?)-->/);
    if (!match) continue;
    const attrs = parseAttrs(match[1]);
    cards.push({
      path: rel(file),
      group: attrs.group,
      viewport: attrs.viewport,
      subtitle: attrs.subtitle,
      name: attrs.name,
    });
  }
  return cards.sort((a, b) => a.group.localeCompare(b.group) || a.path.localeCompare(b.path));
}

async function parseTemplates() {
  const files = await listFiles(path.join(root, "templates"), (file) => file.endsWith(".html"));
  const templates = [];
  for (const file of files.sort((a, b) => rel(a).localeCompare(rel(b)))) {
    const source = await readText(file);
    const match = source.match(/<!--\s*@template\s+([^]*?)-->/);
    if (!match) continue;
    const attrs = parseAttrs(match[1]);
    const folder = rel(path.dirname(file));
    const thumbnailPath = `${folder}/.thumbnail`;
    const template = {
      name: attrs.name,
      description: attrs.description,
      folder,
      entryPath: rel(file),
    };
    if (existsSync(path.join(root, thumbnailPath))) {
      template.thumbnail = { path: thumbnailPath, kind: "captured" };
    }
    templates.push(template);
  }
  return templates;
}

async function globalCssPaths() {
  const stylesPath = path.join(root, "styles.css");
  if (!existsSync(stylesPath)) return [];
  const source = await readText(stylesPath);
  const imports = [...source.matchAll(/@import\s+url\(["']?([^"')]+)["']?\);/g)].map((match) => match[1]);
  return [...imports, "styles.css"];
}

function inferTokenKind(name, value, filePath, annotation) {
  if (annotation) return annotation;
  if (filePath.includes("typography.css")) return "font";
  if (name.endsWith("-text") || name.startsWith("--font") || name.startsWith("--text") || name.startsWith("--weight") || name.startsWith("--leading") || name.startsWith("--tracking")) return "font";
  if (name.startsWith("--radius")) return "radius";
  if (name.startsWith("--shadow")) return "shadow";
  if (name === "--gutter" || name.startsWith("--transition-colors")) return "color";
  if (name.startsWith("--space") || name.startsWith("--container") || name.startsWith("--border-width")) return "spacing";
  if (name.startsWith("--z") || name.startsWith("--ease") || name.startsWith("--duration") || name.startsWith("--transition")) return "other";
  if (/color|border|bg|surface|fg|accent|success|warning|danger|info|selection|ring|azure/.test(name) || /#|rgb|hsl|color-mix|var\(--/.test(value)) return "color";
  return "other";
}

async function parseTokens(paths) {
  const tokens = [];
  for (const cssPath of paths.filter((item) => item.startsWith("tokens/"))) {
    const absolutePath = path.join(root, cssPath);
    if (!existsSync(absolutePath)) continue;
    const source = (await readText(absolutePath))
      .replace(/\/\*[^]*?\*\//g, (comment) => comment.includes("@kind") ? comment : "");
    for (const block of source.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
      const selector = block[1].trim();
      const body = block[2];
      const scope = selector === ":root" ? undefined : selector;
      for (const declaration of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
        const name = declaration[1];
        const rawValue = declaration[2].replace(/\/\*[^]*?\*\//g, "").trim();
        const lineEnd = body.indexOf("\n", declaration.index);
        const line = body.slice(declaration.index, lineEnd === -1 ? undefined : lineEnd);
        const annotation = line.match(/@kind\s+([A-Za-z-]+)/)?.[1];
        const token = {
          name,
          value: rawValue,
          kind: inferTokenKind(name, rawValue, cssPath, annotation),
          definedIn: cssPath,
        };
        if (scope) token.scope = scope;
        if (annotation) token.annotation = annotation;
        tokens.push(token);
      }
    }
  }
  return tokens;
}

function brandFontsFromTokens(tokens) {
  const fontTokens = tokens.filter((token) => token.name.startsWith("--font-"));
  const byFamily = new Map();
  for (const token of fontTokens) {
    const family = token.value.match(/"([^"]+)"/)?.[1];
    if (!family) continue;
    if (!byFamily.has(family)) {
      byFamily.set(family, {
        family,
        status: "ok",
        tokens: [],
        path: token.definedIn,
      });
    }
    byFamily.get(family).tokens.push(token.name);
  }
  return [...byFamily.values()];
}

async function buildManifest(components) {
  const cssPaths = await globalCssPaths();
  const tokens = await parseTokens(cssPaths);
  const manifest = {
    namespace,
    components: components.flatMap((item) => item.exports.map((name) => ({ name, sourcePath: item.path }))),
    startingPoints: [],
    cards: await parseCards(),
    templates: await parseTemplates(),
    hasThumbnailHtml: false,
    globalCssPaths: cssPaths,
    tokens,
    themes: [...new Set(tokens.map((token) => token.scope).filter(Boolean))]
      .map((selector) => ({ selector, label: selector.includes("dark") ? "Dark" : selector })),
    fonts: [],
    brandFonts: brandFontsFromTokens(tokens),
    source: "spa",
  };

  await writeJson(path.join(root, "_ds_manifest.json"), manifest);
  return manifest;
}

function parseDtsProps(source, componentName) {
  const match = source.match(new RegExp(`export\\s+interface\\s+${componentName}Props[^}]*\\{([^]*?)\\n\\}`));
  if (!match) return null;
  const body = match[1];
  const props = [];
  const unions = {};
  for (const prop of body.matchAll(/^\s*([A-Za-z_$][\w$]*)\??:\s*([^;]+);/gm)) {
    props.push(prop[1]);
    const values = [...prop[2].matchAll(/"([^"]+)"/g)].map((value) => value[1]);
    if (values.length > 0) unions[prop[1]] = values;
  }
  return { props, unions };
}

async function buildAdherenceConfig(components, manifest) {
  const restrictedSyntax = [
    {
      selector: "Literal[value=/#[0-9a-fA-F]{3,8}\\b/]",
      message: "Raw hex color — use a design-system color token via var().",
    },
    {
      selector: "Literal[value=/\\b\\d+px\\b/]",
      message: "Raw px value — use a design-system spacing token via var().",
    },
  ];

  const fontFamilies = manifest.brandFonts.map((font) => font.family).sort();
  if (fontFamilies.length > 0) {
    restrictedSyntax.push({
      selector: `Literal[value=/font-family\\s*:\\s*(?!['\\"]?(?:${fontFamilies.map((font) => font.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")}))/i]`,
      message: `Font not provided by the design system. Available: ${fontFamilies.join(", ")}.`,
    });
  }

  for (const item of components) {
    for (const componentName of item.exports) {
      const dtsPath = path.join(root, item.path.replace(/\.jsx$/, ".d.ts"));
      if (!existsSync(dtsPath)) continue;
      const parsed = parseDtsProps(await readText(dtsPath), componentName);
      if (!parsed) continue;
      const allowed = [...new Set([...parsed.props, "key", "ref", "className", "style", "children"])];
      restrictedSyntax.push({
        selector: `JSXOpeningElement[name.name='${componentName}'] > JSXAttribute > JSXIdentifier[name!=/^(?:${allowed.join("|")})$/]`,
        message: `<${componentName}> doesn't accept that prop. Declared props: ${parsed.props.join(", ")}.`,
      });
      for (const [prop, values] of Object.entries(parsed.unions)) {
        restrictedSyntax.push({
          selector: `JSXOpeningElement[name.name='${componentName}'] > JSXAttribute[name.name='${prop}'] > Literal[value!=/^(?:${values.join("|")})$/]`,
          message: `<${componentName}> ${prop} must be one of ${values.map((value) => `'${value}'`).join(" | ")}.`,
        });
      }
    }
  }

  const config = {
    plugins: ["react", "import"],
    rules: {
      "react/forbid-elements": ["warn", { forbid: [] }],
      "no-restricted-imports": [
        "warn",
        {
          patterns: [
            {
              group: [
                "components/content/**",
                "components/core/**",
                "components/feedback/**",
                "components/forms/**",
                "components/navigation/**",
                "ui_kits/blog/**",
                "ui_kits/personal-site/**",
              ],
              message: "Import design-system components from 'index.js', not component internals.",
            },
          ],
        },
      ],
      "no-restricted-syntax": ["warn", ...restrictedSyntax],
    },
    overrides: [],
    "x-omelette": {
      namespace,
      components: manifest.components,
      tokens: manifest.tokens,
      globalCssPaths: manifest.globalCssPaths,
    },
  };

  await writeJson(path.join(root, "_adherence.oxlintrc.json"), config);
  return config;
}

async function main() {
  const components = await componentInfo();
  const uiKits = await uiKitInfo();
  const bundleMeta = await buildBundle(components, uiKits);
  const manifest = await buildManifest(components);
  await buildAdherenceConfig(components, manifest);

  console.log(`Built _ds_bundle.js (${bundleMeta.components.length} exports, ${Object.keys(bundleMeta.sourceHashes).length} sources)`);
  console.log(`Built _ds_manifest.json (${manifest.cards.length} cards, ${manifest.templates.length} templates, ${manifest.tokens.length} tokens)`);
  console.log("Built _adherence.oxlintrc.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
