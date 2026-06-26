import React from "react";

const CSS = `
.xw-check { display: inline-flex; align-items: flex-start; gap: 9px; font-family: var(--font-sans); font-size: var(--text-base); color: var(--fg); cursor: pointer; user-select: none; }
.xw-check--disabled { color: var(--fg-faint); cursor: not-allowed; }
.xw-check__input { position: absolute; opacity: 0; width: 0; height: 0; }
.xw-check__box {
  flex: none; width: 18px; height: 18px; margin-top: 1px;
  border: 1px solid var(--border-strong); border-radius: var(--radius-xs);
  background: var(--surface); display: inline-flex; align-items: center; justify-content: center;
  color: var(--accent-fg); transition: var(--transition-colors), box-shadow var(--duration-fast) var(--ease-out);
}
.xw-check__box svg { width: 12px; height: 12px; opacity: 0; transform: scale(0.6); transition: opacity var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out); }
.xw-check__input:checked + .xw-check__box,
.xw-check__input:indeterminate + .xw-check__box { background: var(--accent); border-color: var(--accent); }
.xw-check__input:checked + .xw-check__box svg,
.xw-check__input:indeterminate + .xw-check__box svg { opacity: 1; transform: scale(1); }
.xw-check__input:focus-visible + .xw-check__box { box-shadow: 0 0 0 3px var(--ring); border-color: var(--accent); }
.xw-check:hover .xw-check__input:not(:checked):not(:disabled) + .xw-check__box { border-color: var(--fg-faint); }
.xw-check__label-text { line-height: 1.35; }
.xw-check__desc { display: block; font-size: var(--text-sm); color: var(--fg-subtle); margin-top: 1px; }
`;
let _i = false;
function inject() { if (_i || typeof document === "undefined") return; _i = true; const s = document.createElement("style"); s.setAttribute("data-xw", "checkbox"); s.textContent = CSS; document.head.appendChild(s); }

const CHECK = <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2.5 6 2.5 2.5 4.5-5" /></svg>;
const DASH = <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h6" /></svg>;

export function Checkbox({ label, description, indeterminate = false, disabled = false, className = "", ...rest }) {
  inject();
  const ref = React.useRef(null);
  React.useEffect(() => { if (ref.current) ref.current.indeterminate = indeterminate; }, [indeterminate]);
  return (
    <label className={["xw-check", disabled ? "xw-check--disabled" : "", className].filter(Boolean).join(" ")}>
      <input ref={ref} type="checkbox" className="xw-check__input" disabled={disabled} {...rest} />
      <span className="xw-check__box">{indeterminate ? DASH : CHECK}</span>
      {(label || description) && (
        <span className="xw-check__label-text">{label}{description && <span className="xw-check__desc">{description}</span>}</span>
      )}
    </label>
  );
}
