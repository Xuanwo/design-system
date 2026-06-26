import React from "react";

const CSS = `
.xw-select-wrap { position: relative; display: inline-flex; align-items: center; width: 100%; }
.xw-select {
  appearance: none; -webkit-appearance: none;
  width: 100%; height: 36px; padding: 0 34px 0 12px;
  font-family: var(--font-sans); font-size: var(--text-base); color: var(--fg);
  background: var(--surface); border: 1px solid var(--border-strong);
  border-radius: var(--radius-md); cursor: pointer;
  transition: var(--transition-colors), box-shadow var(--duration-fast) var(--ease-out);
}
.xw-select:hover { border-color: var(--fg-faint); }
.xw-select:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--ring); }
.xw-select:disabled { background: var(--surface-2); color: var(--fg-faint); cursor: not-allowed; }
.xw-select--sm { height: 30px; font-size: var(--text-sm); }
.xw-select--lg { height: 44px; font-size: var(--text-md); }
.xw-select-wrap__chevron { position: absolute; right: 11px; display: inline-flex; color: var(--fg-subtle); pointer-events: none; }
.xw-select-wrap__chevron svg { width: 15px; height: 15px; }
`;
let _i = false;
function inject() { if (_i || typeof document === "undefined") return; _i = true; const s = document.createElement("style"); s.setAttribute("data-xw", "select"); s.textContent = CSS; document.head.appendChild(s); }

const CHEVRON = <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m4 6 4 4 4-4" /></svg>;

let _id = 0;
export function Select({ label, hint, error, required = false, size = "md", options, placeholder, id, className = "", style, children, ...rest }) {
  inject();
  const fid = id || `xw-select-${++_id}`;
  const cls = ["xw-select", size !== "md" ? `xw-select--${size}` : "", error ? "xw-input--error" : "", className].filter(Boolean).join(" ");
  const control = (
    <div className="xw-select-wrap">
      <select id={fid} className={cls} aria-invalid={!!error} {...rest}>
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options
          ? options.map((o) => {
              const opt = typeof o === "string" ? { value: o, label: o } : o;
              return <option key={opt.value} value={opt.value} disabled={opt.disabled}>{opt.label}</option>;
            })
          : children}
      </select>
      <span className="xw-select-wrap__chevron">{CHEVRON}</span>
    </div>
  );
  if (!label && !hint && !error) return control;
  return (
    <div className="xw-field" style={style}>
      {label && <label className="xw-field__label" htmlFor={fid}>{label}{required && <span className="xw-field__req">*</span>}</label>}
      {control}
      {(error || hint) && <span className={`xw-field__hint${error ? " xw-field__hint--error" : ""}`}>{error || hint}</span>}
    </div>
  );
}
