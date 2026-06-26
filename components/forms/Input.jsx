import React from "react";

const CSS = `
.xw-field { display: flex; flex-direction: column; gap: 6px; font-family: var(--font-sans); }
.xw-field__label { font-size: var(--text-sm); font-weight: var(--weight-medium); color: var(--fg); }
.xw-field__req { color: var(--danger); margin-left: 2px; }
.xw-field__hint { font-size: var(--text-sm); color: var(--fg-subtle); }
.xw-field__hint--error { color: var(--danger-text); }

.xw-input-wrap { position: relative; display: flex; align-items: center; }
.xw-input {
  width: 100%; height: 36px; padding: 0 12px;
  font-family: var(--font-sans); font-size: var(--text-base); color: var(--fg);
  background: var(--surface); border: 1px solid var(--border-strong);
  border-radius: var(--radius-md); transition: var(--transition-colors), box-shadow var(--duration-fast) var(--ease-out);
}
.xw-input::placeholder { color: var(--fg-faint); }
.xw-input:hover { border-color: var(--fg-faint); }
.xw-input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--ring); }
.xw-input:disabled { background: var(--surface-2); color: var(--fg-faint); cursor: not-allowed; }
.xw-input--sm { height: 30px; font-size: var(--text-sm); }
.xw-input--lg { height: 44px; font-size: var(--text-md); }
.xw-input--error { border-color: var(--danger); }
.xw-input--error:focus { box-shadow: 0 0 0 3px color-mix(in srgb, var(--danger) 30%, transparent); }
.xw-input--has-prefix { padding-left: 36px; }
.xw-input--has-suffix { padding-right: 36px; }
.xw-input-wrap__affix { position: absolute; display: inline-flex; color: var(--fg-subtle); pointer-events: none; }
.xw-input-wrap__affix svg { width: 16px; height: 16px; }
.xw-input-wrap__affix--prefix { left: 11px; }
.xw-input-wrap__affix--suffix { right: 11px; }
`;
let _i = false;
function inject() { if (_i || typeof document === "undefined") return; _i = true; const s = document.createElement("style"); s.setAttribute("data-xw", "input"); s.textContent = CSS; document.head.appendChild(s); }

let _id = 0;
export function Input({ label, hint, error, required = false, size = "md", prefix, suffix, id, className = "", style, ...rest }) {
  inject();
  const fid = id || `xw-input-${++_id}`;
  const inputCls = [
    "xw-input",
    size !== "md" ? `xw-input--${size}` : "",
    error ? "xw-input--error" : "",
    prefix ? "xw-input--has-prefix" : "",
    suffix ? "xw-input--has-suffix" : "",
    className,
  ].filter(Boolean).join(" ");
  const field = (
    <div className="xw-input-wrap">
      {prefix && <span className="xw-input-wrap__affix xw-input-wrap__affix--prefix">{prefix}</span>}
      <input id={fid} className={inputCls} aria-invalid={!!error} {...rest} />
      {suffix && <span className="xw-input-wrap__affix xw-input-wrap__affix--suffix">{suffix}</span>}
    </div>
  );
  if (!label && !hint && !error) return field;
  return (
    <div className="xw-field" style={style}>
      {label && <label className="xw-field__label" htmlFor={fid}>{label}{required && <span className="xw-field__req">*</span>}</label>}
      {field}
      {(error || hint) && <span className={`xw-field__hint${error ? " xw-field__hint--error" : ""}`}>{error || hint}</span>}
    </div>
  );
}
