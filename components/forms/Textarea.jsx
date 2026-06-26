import React from "react";

const CSS = `
.xw-textarea {
  width: 100%; min-height: 84px; padding: 9px 12px;
  font-family: var(--font-sans); font-size: var(--text-base); line-height: var(--leading-normal); color: var(--fg);
  background: var(--surface); border: 1px solid var(--border-strong);
  border-radius: var(--radius-md); resize: vertical;
  transition: var(--transition-colors), box-shadow var(--duration-fast) var(--ease-out);
}
.xw-textarea::placeholder { color: var(--fg-faint); }
.xw-textarea:hover { border-color: var(--fg-faint); }
.xw-textarea:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--ring); }
.xw-textarea:disabled { background: var(--surface-2); color: var(--fg-faint); cursor: not-allowed; }
.xw-textarea--mono { font-family: var(--font-mono); font-size: var(--text-sm); }
.xw-textarea--error { border-color: var(--danger); }
`;
let _i = false;
function inject() { if (_i || typeof document === "undefined") return; _i = true; const s = document.createElement("style"); s.setAttribute("data-xw", "textarea"); s.textContent = CSS; document.head.appendChild(s); }

let _id = 0;
export function Textarea({ label, hint, error, required = false, mono = false, id, className = "", style, ...rest }) {
  inject();
  const fid = id || `xw-textarea-${++_id}`;
  const cls = ["xw-textarea", mono ? "xw-textarea--mono" : "", error ? "xw-textarea--error" : "", className].filter(Boolean).join(" ");
  const control = <textarea id={fid} className={cls} aria-invalid={!!error} {...rest} />;
  if (!label && !hint && !error) return control;
  return (
    <div className="xw-field" style={style}>
      {label && <label className="xw-field__label" htmlFor={fid}>{label}{required && <span className="xw-field__req">*</span>}</label>}
      {control}
      {(error || hint) && <span className={`xw-field__hint${error ? " xw-field__hint--error" : ""}`}>{error || hint}</span>}
    </div>
  );
}
