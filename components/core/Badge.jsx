import React from "react";

const CSS = `
.xw-badge {
  display: inline-flex; align-items: center; gap: 5px;
  height: 20px; padding: 0 8px;
  font-family: var(--font-sans); font-size: var(--text-xs); font-weight: var(--weight-semibold);
  line-height: 1; letter-spacing: 0.01em; border-radius: var(--radius-sm);
  border: 1px solid transparent; white-space: nowrap;
}
.xw-badge--lg { height: 24px; padding: 0 10px; font-size: var(--text-sm); }
.xw-badge__dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; flex: none; }

/* subtle (default): tinted bg + colored text + soft border */
.xw-badge--subtle.xw-badge--neutral { background: var(--surface-2); color: var(--fg-muted); border-color: var(--border); }
.xw-badge--subtle.xw-badge--accent  { background: var(--accent-subtle); color: var(--accent-text); border-color: var(--accent-border); }
.xw-badge--subtle.xw-badge--success { background: var(--success-subtle); color: var(--success-text); border-color: var(--success-border); }
.xw-badge--subtle.xw-badge--warning { background: var(--warning-subtle); color: var(--warning-text); border-color: var(--warning-border); }
.xw-badge--subtle.xw-badge--danger  { background: var(--danger-subtle); color: var(--danger-text); border-color: var(--danger-border); }
.xw-badge--subtle.xw-badge--info    { background: var(--info-subtle); color: var(--info-text); border-color: var(--info-border); }

/* solid */
.xw-badge--solid { color: #fff; }
.xw-badge--solid.xw-badge--neutral { background: var(--fg-muted); }
.xw-badge--solid.xw-badge--accent  { background: var(--accent); color: var(--accent-fg); }
.xw-badge--solid.xw-badge--success { background: var(--success); }
.xw-badge--solid.xw-badge--warning { background: var(--warning); }
.xw-badge--solid.xw-badge--danger  { background: var(--danger); }
.xw-badge--solid.xw-badge--info    { background: var(--info); }
`;
let _i = false;
function inject() { if (_i || typeof document === "undefined") return; _i = true; const s = document.createElement("style"); s.setAttribute("data-xw", "badge"); s.textContent = CSS; document.head.appendChild(s); }

export function Badge({ color = "neutral", variant = "subtle", size = "md", dot = false, className = "", children, ...rest }) {
  inject();
  const cls = ["xw-badge", `xw-badge--${variant}`, `xw-badge--${color}`, size === "lg" ? "xw-badge--lg" : "", className].filter(Boolean).join(" ");
  return (
    <span className={cls} {...rest}>
      {dot && <span className="xw-badge__dot" />}
      {children}
    </span>
  );
}
