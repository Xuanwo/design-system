import React from "react";

const CSS = `
.xw-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius-lg); color: var(--fg);
  transition: border-color var(--duration-fast) var(--ease-out),
              background-color var(--duration-fast) var(--ease-out);
}
.xw-card--p0 { padding: 0; }
.xw-card--p-sm { padding: var(--space-4); }
.xw-card--p-md { padding: var(--space-5); }
.xw-card--p-lg { padding: var(--space-6); }
.xw-card--interactive { cursor: pointer; }
.xw-card--interactive:hover { border-color: var(--border-strong); background: var(--surface-2); }
.xw-card--interactive:active { background: var(--surface-3); }
.xw-card--accent { border-color: var(--accent-border); }
.xw-card a.xw-card, a.xw-card { text-decoration: none; }
`;
let _i = false;
function inject() { if (_i || typeof document === "undefined") return; _i = true; const s = document.createElement("style"); s.setAttribute("data-xw", "card"); s.textContent = CSS; document.head.appendChild(s); }

export function Card({ padding = "md", interactive = false, accent = false, as, href, className = "", children, ...rest }) {
  inject();
  const Tag = as || (href ? "a" : "div");
  const cls = [
    "xw-card",
    `xw-card--p-${padding === "none" ? "0" : padding}`,
    interactive || href ? "xw-card--interactive" : "",
    accent ? "xw-card--accent" : "",
    className,
  ].filter(Boolean).join(" ");
  return <Tag className={cls} href={href} {...rest}>{children}</Tag>;
}
