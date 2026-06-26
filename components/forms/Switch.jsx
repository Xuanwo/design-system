import React from "react";

const CSS = `
.xw-switch { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-sans); font-size: var(--text-base); color: var(--fg); cursor: pointer; user-select: none; }
.xw-switch--disabled { color: var(--fg-faint); cursor: not-allowed; }
.xw-switch__input { position: absolute; opacity: 0; width: 0; height: 0; }
.xw-switch__track {
  position: relative; flex: none; width: 38px; height: 22px; border-radius: var(--radius-full);
  background: var(--border-strong); transition: background-color var(--duration-base) var(--ease-out);
}
.xw-switch__track::after {
  content: ""; position: absolute; top: 2px; left: 2px; width: 18px; height: 18px;
  border-radius: 50%; background: #fff;
  transition: transform var(--duration-base) var(--ease-out);
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
}
.xw-switch__input:checked + .xw-switch__track { background: var(--accent); }
.xw-switch__input:checked + .xw-switch__track::after { transform: translateX(16px); }
.xw-switch__input:focus-visible + .xw-switch__track { box-shadow: 0 0 0 3px var(--ring); }
.xw-switch--sm .xw-switch__track { width: 32px; height: 18px; }
.xw-switch--sm .xw-switch__track::after { width: 14px; height: 14px; }
.xw-switch--sm .xw-switch__input:checked + .xw-switch__track::after { transform: translateX(14px); }
.xw-switch__desc { display: block; font-size: var(--text-sm); color: var(--fg-subtle); margin-top: 1px; }
`;
let _i = false;
function inject() { if (_i || typeof document === "undefined") return; _i = true; const s = document.createElement("style"); s.setAttribute("data-xw", "switch"); s.textContent = CSS; document.head.appendChild(s); }

export function Switch({ label, description, size = "md", disabled = false, className = "", ...rest }) {
  inject();
  return (
    <label className={["xw-switch", size === "sm" ? "xw-switch--sm" : "", disabled ? "xw-switch--disabled" : "", className].filter(Boolean).join(" ")}>
      <input type="checkbox" role="switch" className="xw-switch__input" disabled={disabled} {...rest} />
      <span className="xw-switch__track" />
      {(label || description) && <span>{label}{description && <span className="xw-switch__desc">{description}</span>}</span>}
    </label>
  );
}
