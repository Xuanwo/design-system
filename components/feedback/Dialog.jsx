import React from "react";
import { IconButton } from "../core/IconButton.jsx";

const CSS = `
.xw-dialog__backdrop {
  position: fixed; inset: 0; z-index: var(--z-dialog);
  background: color-mix(in srgb, #0a0c0e 45%, transparent);
  backdrop-filter: blur(2px);
  display: flex; align-items: center; justify-content: center; padding: var(--space-5);
  animation: xw-dialog-fade var(--duration-base) var(--ease-out);
}
@keyframes xw-dialog-fade { from { opacity: 0; } to { opacity: 1; } }
.xw-dialog {
  width: 100%; max-width: 460px; max-height: calc(100vh - 2 * var(--space-5));
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius-xl); box-shadow: var(--shadow-popover);
  display: flex; flex-direction: column; overflow: hidden;
  font-family: var(--font-sans); color: var(--fg);
  animation: xw-dialog-rise var(--duration-base) var(--ease-out);
}
@keyframes xw-dialog-rise { from { opacity: 0; transform: translateY(8px) scale(0.98); } to { opacity: 1; transform: none; } }
.xw-dialog--sm { max-width: 380px; }
.xw-dialog--lg { max-width: 640px; }
.xw-dialog__head { display: flex; align-items: flex-start; gap: 12px; padding: var(--space-5) var(--space-5) var(--space-3); }
.xw-dialog__titles { flex: 1; min-width: 0; }
.xw-dialog__title { font-size: var(--text-lg); font-weight: var(--weight-semibold); letter-spacing: var(--tracking-snug); }
.xw-dialog__desc { font-size: var(--text-base); color: var(--fg-muted); margin-top: 3px; line-height: var(--leading-normal); }
.xw-dialog__body { padding: 0 var(--space-5) var(--space-5); overflow: auto; }
.xw-dialog__foot { display: flex; justify-content: flex-end; gap: 10px; padding: var(--space-4) var(--space-5); border-top: 1px solid var(--border); background: var(--surface-2); }
`;
let _i = false;
function inject() { if (_i || typeof document === "undefined") return; _i = true; const s = document.createElement("style"); s.setAttribute("data-xw", "dialog"); s.textContent = CSS; document.head.appendChild(s); }

const X = <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M5 5l10 10M15 5L5 15" /></svg>;

export function Dialog({ open, onClose, title, description, size = "md", footer, showClose = true, className = "", children }) {
  inject();
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose && onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="xw-dialog__backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose && onClose(); }}>
      <div className={["xw-dialog", size !== "md" ? `xw-dialog--${size}` : "", className].filter(Boolean).join(" ")} role="dialog" aria-modal="true">
        {(title || showClose) && (
          <div className="xw-dialog__head">
            <div className="xw-dialog__titles">
              {title && <div className="xw-dialog__title">{title}</div>}
              {description && <div className="xw-dialog__desc">{description}</div>}
            </div>
            {showClose && <IconButton label="Close" size="sm" onClick={onClose}>{X}</IconButton>}
          </div>
        )}
        {children && <div className="xw-dialog__body">{children}</div>}
        {footer && <div className="xw-dialog__foot">{footer}</div>}
      </div>
    </div>
  );
}
