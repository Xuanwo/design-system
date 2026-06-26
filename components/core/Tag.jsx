import React from "react";

const CSS = `
.xw-tag {
  display: inline-flex; align-items: center; gap: 6px;
  height: 26px; padding: 0 10px;
  font-family: var(--font-sans); font-size: var(--text-sm); font-weight: var(--weight-medium);
  line-height: 1; border-radius: var(--radius-sm);
  background: var(--surface-2); color: var(--fg-muted); border: 1px solid var(--border);
  transition: var(--transition-colors); white-space: nowrap;
}
.xw-tag--clickable { cursor: pointer; }
.xw-tag--clickable:hover { background: var(--surface-3); color: var(--fg); }
.xw-tag--selected { background: var(--accent-subtle); color: var(--accent-text); border-color: var(--accent-border); }
.xw-tag__hash { color: var(--fg-faint); }
.xw-tag--selected .xw-tag__hash { color: var(--accent); }
.xw-tag__x {
  display: inline-flex; align-items: center; justify-content: center;
  width: 16px; height: 16px; margin-right: -3px; border-radius: var(--radius-xs);
  color: var(--fg-subtle); cursor: pointer; border: none; background: none; padding: 0;
}
.xw-tag__x:hover { background: var(--border-strong); color: var(--fg); }
.xw-tag__x svg { width: 11px; height: 11px; }
`;
let _i = false;
function inject() { if (_i || typeof document === "undefined") return; _i = true; const s = document.createElement("style"); s.setAttribute("data-xw", "tag"); s.textContent = CSS; document.head.appendChild(s); }

const X = (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 3l6 6M9 3l-6 6" /></svg>
);

export function Tag({ hash = false, selected = false, onRemove, onClick, className = "", children, ...rest }) {
  inject();
  const clickable = !!onClick;
  const cls = ["xw-tag", clickable ? "xw-tag--clickable" : "", selected ? "xw-tag--selected" : "", className].filter(Boolean).join(" ");
  return (
    <span className={cls} onClick={onClick} {...rest}>
      {hash && <span className="xw-tag__hash">#</span>}
      {children}
      {onRemove && (
        <button type="button" className="xw-tag__x" aria-label="Remove" onClick={(e) => { e.stopPropagation(); onRemove(e); }}>{X}</button>
      )}
    </span>
  );
}
