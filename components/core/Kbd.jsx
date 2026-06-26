import React from "react";

const CSS = `
.xw-kbd {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 20px; height: 20px; padding: 0 6px;
  font-family: var(--font-mono); font-size: 11px; font-weight: 500; line-height: 1;
  color: var(--fg-muted); background: var(--surface-2);
  border: 1px solid var(--border-strong); border-bottom-width: 2px;
  border-radius: var(--radius-sm);
}
.xw-kbd-group { display: inline-flex; align-items: center; gap: 3px; }
.xw-kbd-group__plus { color: var(--fg-faint); font-size: 11px; font-family: var(--font-sans); }
`;
let _i = false;
function inject() { if (_i || typeof document === "undefined") return; _i = true; const s = document.createElement("style"); s.setAttribute("data-xw", "kbd"); s.textContent = CSS; document.head.appendChild(s); }

export function Kbd({ keys, className = "", children, ...rest }) {
  inject();
  if (keys && keys.length) {
    return (
      <span className={["xw-kbd-group", className].filter(Boolean).join(" ")} {...rest}>
        {keys.map((k, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="xw-kbd-group__plus">+</span>}
            <kbd className="xw-kbd">{k}</kbd>
          </React.Fragment>
        ))}
      </span>
    );
  }
  return <kbd className={["xw-kbd", className].filter(Boolean).join(" ")} {...rest}>{children}</kbd>;
}
