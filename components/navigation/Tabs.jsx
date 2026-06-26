import React from "react";

const CSS = `
.xw-tabs { font-family: var(--font-sans); }
.xw-tabs__list { display: flex; gap: 2px; border-bottom: 1px solid var(--border); position: relative; }
.xw-tabs__list--pill { gap: 4px; border-bottom: none; background: var(--surface-2); padding: 3px; border-radius: var(--radius-md); display: inline-flex; }
.xw-tab {
  appearance: none; background: none; border: none; cursor: pointer;
  font-family: inherit; font-size: var(--text-base); font-weight: var(--weight-medium);
  color: var(--fg-subtle); padding: 9px 12px; position: relative;
  display: inline-flex; align-items: center; gap: 7px; white-space: nowrap;
  transition: var(--transition-colors);
}
.xw-tab:hover { color: var(--fg); }
.xw-tab[aria-selected="true"] { color: var(--fg); }
.xw-tab[disabled] { color: var(--fg-faint); cursor: not-allowed; }
.xw-tab__count { font-size: var(--text-xs); color: var(--fg-faint); background: var(--surface-2); border-radius: var(--radius-full); padding: 1px 6px; }
.xw-tab[aria-selected="true"] .xw-tab__count { color: var(--accent-text); background: var(--accent-subtle); }
/* underline indicator */
.xw-tabs__list:not(.xw-tabs__list--pill) .xw-tab::after {
  content: ""; position: absolute; left: 8px; right: 8px; bottom: -1px; height: 2px;
  background: var(--accent); border-radius: 2px 2px 0 0;
  transform: scaleX(0); transition: transform var(--duration-base) var(--ease-out);
}
.xw-tabs__list:not(.xw-tabs__list--pill) .xw-tab[aria-selected="true"]::after { transform: scaleX(1); }
/* pill variant */
.xw-tabs__list--pill .xw-tab { padding: 6px 12px; border-radius: var(--radius-sm); }
.xw-tabs__list--pill .xw-tab[aria-selected="true"] { background: var(--surface); color: var(--fg); box-shadow: var(--shadow-overlay); }
.xw-tabs__panel { padding-top: var(--space-4); }
`;
let _i = false;
function inject() { if (_i || typeof document === "undefined") return; _i = true; const s = document.createElement("style"); s.setAttribute("data-xw", "tabs"); s.textContent = CSS; document.head.appendChild(s); }

export function Tabs({ items = [], value, defaultValue, onChange, variant = "underline", className = "", children }) {
  inject();
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.value);
  const active = value !== undefined ? value : internal;
  const select = (v) => { if (value === undefined) setInternal(v); onChange && onChange(v); };
  const activeItem = items.find((it) => it.value === active);

  return (
    <div className={["xw-tabs", className].filter(Boolean).join(" ")}>
      <div className={`xw-tabs__list${variant === "pill" ? " xw-tabs__list--pill" : ""}`} role="tablist">
        {items.map((it) => (
          <button
            key={it.value}
            type="button"
            role="tab"
            aria-selected={it.value === active}
            disabled={it.disabled}
            className="xw-tab"
            onClick={() => select(it.value)}
          >
            {it.icon && <span style={{ display: "inline-flex" }}>{it.icon}</span>}
            {it.label}
            {it.count != null && <span className="xw-tab__count">{it.count}</span>}
          </button>
        ))}
      </div>
      {typeof children === "function" ? (
        <div className="xw-tabs__panel" role="tabpanel">{children(active)}</div>
      ) : activeItem?.content ? (
        <div className="xw-tabs__panel" role="tabpanel">{activeItem.content}</div>
      ) : null}
    </div>
  );
}
