import React from "react";

const CSS = `
.xw-code {
  font-family: var(--font-mono); font-size: var(--text-sm);
  background: var(--surface-2); border: 1px solid var(--border);
  border-radius: var(--radius-md); overflow: hidden; color: var(--fg);
}
.xw-code__head {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 10px 8px 14px; border-bottom: 1px solid var(--border);
  background: var(--surface); font-family: var(--font-sans);
}
.xw-code__dot { width: 9px; height: 9px; border-radius: 50%; background: var(--border-strong); flex: none; }
.xw-code__name { font-size: var(--text-sm); color: var(--fg-muted); font-weight: var(--weight-medium); }
.xw-code__lang { margin-left: auto; font-size: var(--text-xs); color: var(--fg-faint); font-family: var(--font-mono); text-transform: lowercase; letter-spacing: 0.02em; }
.xw-code__copy {
  appearance: none; border: 1px solid transparent; background: none; cursor: pointer;
  color: var(--fg-subtle); border-radius: var(--radius-sm); padding: 4px 6px;
  display: inline-flex; align-items: center; gap: 5px; font-family: var(--font-sans); font-size: var(--text-xs);
  transition: var(--transition-colors);
}
.xw-code__copy:hover { background: var(--surface-2); color: var(--fg); }
.xw-code__copy svg { width: 13px; height: 13px; }
.xw-code__scroll { overflow: auto; }
.xw-code pre { margin: 0; padding: 14px 16px; line-height: 1.65; font-feature-settings: "calt" 1; }
.xw-code--numbered pre { padding-left: 0; }
.xw-code__line { display: block; padding: 0 16px; }
.xw-code--numbered .xw-code__line { display: grid; grid-template-columns: 40px 1fr; padding: 0; }
.xw-code__ln { color: var(--fg-faint); text-align: right; padding-right: 14px; user-select: none; }
.xw-code__line--hl { background: var(--accent-subtle); box-shadow: inset 2px 0 0 var(--accent); }
`;
let _i = false;
function inject() { if (_i || typeof document === "undefined") return; _i = true; const s = document.createElement("style"); s.setAttribute("data-xw", "codeblock"); s.textContent = CSS; document.head.appendChild(s); }

const COPY = <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5"/><path d="M10.5 5.5V4A1.5 1.5 0 0 0 9 2.5H3.5A1.5 1.5 0 0 0 2 4v5.5A1.5 1.5 0 0 0 3.5 11H5"/></svg>;
const DONE = <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m3.5 8.5 3 3 6-7"/></svg>;

export function CodeBlock({ code = "", language, filename, lineNumbers = false, highlight = [], copyable = true, className = "" }) {
  inject();
  const [copied, setCopied] = React.useState(false);
  const lines = String(code).replace(/\n$/, "").split("\n");
  const hl = new Set(highlight);
  const copy = () => {
    try { navigator.clipboard.writeText(code); } catch (e) {}
    setCopied(true); setTimeout(() => setCopied(false), 1400);
  };
  const showHead = filename || language || copyable;
  return (
    <div className={["xw-code", lineNumbers ? "xw-code--numbered" : "", className].filter(Boolean).join(" ")}>
      {showHead && (
        <div className="xw-code__head">
          {filename && <span className="xw-code__dot" />}
          {filename && <span className="xw-code__name">{filename}</span>}
          {language && <span className="xw-code__lang">{language}</span>}
          {copyable && (
            <button type="button" className="xw-code__copy" onClick={copy} style={filename ? undefined : { marginLeft: "auto" }}>
              {copied ? DONE : COPY}{copied ? "Copied" : "Copy"}
            </button>
          )}
        </div>
      )}
      <div className="xw-code__scroll">
        <pre><code>
          {lines.map((ln, i) => (
            <span key={i} className={`xw-code__line${hl.has(i + 1) ? " xw-code__line--hl" : ""}`}>
              {lineNumbers && <span className="xw-code__ln">{i + 1}</span>}
              <span>{ln || "\u200b"}</span>
            </span>
          ))}
        </code></pre>
      </div>
    </div>
  );
}
