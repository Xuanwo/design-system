import React from "react";

const CSS = `
.xw-callout {
  display: flex; gap: 12px; padding: var(--space-4) var(--space-4);
  border: 1px solid var(--border); border-radius: var(--radius-md);
  background: var(--surface-2); color: var(--fg);
  font-family: var(--font-sans); font-size: var(--text-base); line-height: var(--leading-normal);
}
.xw-callout__icon { flex: none; display: inline-flex; margin-top: 1px; color: var(--fg-subtle); }
.xw-callout__icon svg { width: 18px; height: 18px; display: block; }
.xw-callout__body { min-width: 0; }
.xw-callout__title { font-weight: var(--weight-semibold); margin-bottom: 2px; }
.xw-callout__body > :last-child { margin-bottom: 0; }
.xw-callout--accent  { background: var(--accent-subtle); border-color: var(--accent-border); }
.xw-callout--accent  .xw-callout__icon, .xw-callout--accent .xw-callout__title { color: var(--accent-text); }
.xw-callout--info    { background: var(--info-subtle); border-color: var(--info-border); }
.xw-callout--info    .xw-callout__icon, .xw-callout--info .xw-callout__title { color: var(--info-text); }
.xw-callout--success { background: var(--success-subtle); border-color: var(--success-border); }
.xw-callout--success .xw-callout__icon, .xw-callout--success .xw-callout__title { color: var(--success-text); }
.xw-callout--warning { background: var(--warning-subtle); border-color: var(--warning-border); }
.xw-callout--warning .xw-callout__icon, .xw-callout--warning .xw-callout__title { color: var(--warning-text); }
.xw-callout--danger  { background: var(--danger-subtle); border-color: var(--danger-border); }
.xw-callout--danger  .xw-callout__icon, .xw-callout--danger .xw-callout__title { color: var(--danger-text); }
`;
let _i = false;
function inject() { if (_i || typeof document === "undefined") return; _i = true; const s = document.createElement("style"); s.setAttribute("data-xw", "callout"); s.textContent = CSS; document.head.appendChild(s); }

const DEFAULT_ICONS = {
  note: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/></svg>,
  accent: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3 11.2c.6.4 1 1 1 1.8h4c0-.8.4-1.4 1-1.8A6 6 0 0 0 12 3z"/></svg>,
  info: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/></svg>,
  success: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>,
  warning: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>,
  danger: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M15 9l-6 6M9 9l6 6"/></svg>,
};

export function Callout({ variant = "note", title, icon, hideIcon = false, className = "", children, ...rest }) {
  inject();
  const key = variant === "note" ? "note" : variant;
  const cls = ["xw-callout", variant !== "note" ? `xw-callout--${variant}` : "", className].filter(Boolean).join(" ");
  return (
    <div className={cls} role="note" {...rest}>
      {!hideIcon && <span className="xw-callout__icon">{icon || DEFAULT_ICONS[key] || DEFAULT_ICONS.note}</span>}
      <div className="xw-callout__body">
        {title && <div className="xw-callout__title">{title}</div>}
        {children}
      </div>
    </div>
  );
}
