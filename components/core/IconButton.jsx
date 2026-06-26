import React from "react";

const CSS = `
.xw-iconbtn {
  --_s: 36px;
  display: inline-flex; align-items: center; justify-content: center;
  width: var(--_s); height: var(--_s); padding: 0;
  border-radius: var(--radius-md); border: 1px solid transparent;
  background: transparent; color: var(--fg-muted); cursor: pointer;
  transition: var(--transition-colors);
}
.xw-iconbtn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.xw-iconbtn[disabled] { opacity: 0.45; pointer-events: none; }
.xw-iconbtn svg { width: 1.1em; height: 1.1em; display: block; }
.xw-iconbtn--sm { --_s: 28px; font-size: var(--text-sm); }
.xw-iconbtn--md { font-size: var(--text-md); }
.xw-iconbtn--lg { --_s: 44px; font-size: var(--text-lg); }

.xw-iconbtn--ghost:hover { background: var(--surface-2); color: var(--fg); }
.xw-iconbtn--ghost:active { background: var(--surface-3); }
.xw-iconbtn--secondary { border-color: var(--border-strong); background: var(--surface); color: var(--fg); }
.xw-iconbtn--secondary:hover { background: var(--surface-2); }
.xw-iconbtn--primary { background: var(--accent); color: var(--accent-fg); }
.xw-iconbtn--primary:hover { background: var(--accent-hover); }
`;
let _i = false;
function inject() { if (_i || typeof document === "undefined") return; _i = true; const s = document.createElement("style"); s.setAttribute("data-xw", "iconbutton"); s.textContent = CSS; document.head.appendChild(s); }

export function IconButton({ variant = "ghost", size = "md", label, disabled = false, className = "", children, ...rest }) {
  inject();
  const cls = ["xw-iconbtn", `xw-iconbtn--${variant}`, `xw-iconbtn--${size}`, className].filter(Boolean).join(" ");
  return (
    <button type="button" className={cls} aria-label={label} title={label} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
