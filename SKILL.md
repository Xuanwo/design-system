---
name: xuanwo-design
description: Use this skill to generate well-branded interfaces and assets for Xuanwo (漩涡), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick map
- `readme.md` — the full design guide: content voice, visual foundations (color, type, space, motion, states), iconography, and a file manifest. Read this first.
- `styles.css` — the only stylesheet to link; it pulls in `tokens/` (colors incl. full light+dark theme, typography, layout, base reset) and the webfonts.
- `components/` — 19 React primitives (`Button`, `Card`, `Callout`, `Input`, `Tabs`, `Dialog`, `CodeBlock`, `Logo`, …). Each has a `.prompt.md` with usage. Load them from `window.XuanwoDesignSystem_8e9a9d` after including `_ds_bundle.js`.
- `ui_kits/` — full-screen recreations (personal site landing, blog reading view) showing how the pieces compose.
- `templates/slide-deck/` — a ready talk deck (1920×1080) to copy and edit.
- `assets/logo/` — the **Xuanwo** wordmark (`wordmark.png`, dog-face "X") + the standalone **X** monogram (`monogram.png`) for tight spaces/favicons + `logo.jpeg` (full scene illustration, used as the avatar).

## Essence (don't violate)
- One **azure** accent (`--azure-500` `#0f83cf`, the logo's screen-blue) on cool near-neutrals; **full dual theme** via `[data-theme]` and OS preference — always use semantic tokens (`--accent`, `--fg`, `--surface`).
- **Serif (Source Serif 4 / Noto Serif SC) for display & long-form; humanist sans (Source Sans 3 / Noto Sans SC) for UI; Fira Code for code.** One language per artifact — English or 中文 throughout, never mixed (proper nouns and code identifiers excepted).
- **Crisp & flat: depth from hairline borders + layered surfaces, NOT shadows** (shadows only on floating overlays). Small 6px radii. Sentence case. No emoji.
- **Quiet, short motion** — fades and gentle slides, no bounce, nothing abrupt.
- Icons: **Lucide** style (24px, ~1.7 stroke, outline, `currentColor`).
