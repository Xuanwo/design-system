import React from "react";

/* Inject structural CSS once. Visual values reference design-system
   tokens from styles.css; pseudo-states live here so markup stays clean. */
const CSS = `
.xw-btn {
  --_h: 36px; --_px: 14px; --_fs: var(--text-base); --_gap: 8px;
  display: inline-flex; align-items: center; justify-content: center; gap: var(--_gap);
  height: var(--_h); padding: 0 var(--_px);
  font-family: var(--font-sans); font-size: var(--_fs); font-weight: var(--weight-semibold);
  line-height: 1; white-space: nowrap; border-radius: var(--radius-md);
  border: 1px solid transparent; cursor: pointer; user-select: none;
  transition: background-color var(--duration-fast) var(--ease-out),
              border-color var(--duration-fast) var(--ease-out),
              color var(--duration-fast) var(--ease-out),
              opacity var(--duration-fast) var(--ease-out);
}
.xw-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.xw-btn[disabled], .xw-btn[aria-disabled="true"] { opacity: 0.5; pointer-events: none; }
.xw-btn--sm { --_h: 28px; --_px: 10px; --_fs: var(--text-sm); --_gap: 6px; }
.xw-btn--lg { --_h: 44px; --_px: 20px; --_fs: var(--text-md); }
.xw-btn--full { width: 100%; }

/* primary — filled accent */
.xw-btn--primary { background: var(--accent); color: var(--accent-fg); }
.xw-btn--primary:hover { background: var(--accent-hover); }
.xw-btn--primary:active { background: var(--accent-active); }

/* secondary — bordered neutral */
.xw-btn--secondary { background: var(--surface); color: var(--fg); border-color: var(--border-strong); }
.xw-btn--secondary:hover { background: var(--surface-2); }
.xw-btn--secondary:active { background: var(--surface-3); }

/* ghost — quiet */
.xw-btn--ghost { background: transparent; color: var(--fg-muted); }
.xw-btn--ghost:hover { background: var(--surface-2); color: var(--fg); }
.xw-btn--ghost:active { background: var(--surface-3); }

/* danger — destructive */
.xw-btn--danger { background: var(--danger); color: #fff; }
.xw-btn--danger:hover { filter: brightness(1.06); }
.xw-btn--danger:active { filter: brightness(0.94); }

.xw-btn__icon { display: inline-flex; flex: none; }
.xw-btn__icon svg { width: 1.05em; height: 1.05em; display: block; }
.xw-btn__spin { width: 1em; height: 1em; border-radius: 50%; border: 2px solid currentColor; border-top-color: transparent; animation: xw-btn-spin 0.6s linear infinite; }
@keyframes xw-btn-spin { to { transform: rotate(360deg); } }
`;

let _injected = false;
function inject() {
  if (_injected || typeof document === "undefined") return;
  _injected = true;
  const s = document.createElement("style");
  s.setAttribute("data-xw", "button");
  s.textContent = CSS;
  document.head.appendChild(s);
}

export function Button({
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  loading = false,
  disabled = false,
  fullWidth = false,
  as,
  href,
  className = "",
  children,
  ...rest
}) {
  inject();
  const Tag = as || (href ? "a" : "button");
  const cls = [
    "xw-btn",
    `xw-btn--${variant}`,
    size !== "md" ? `xw-btn--${size}` : "",
    fullWidth ? "xw-btn--full" : "",
    className,
  ].filter(Boolean).join(" ");

  const tagProps = Tag === "button"
    ? { type: rest.type || "button", disabled: disabled || loading }
    : { href, "aria-disabled": disabled || loading ? "true" : undefined };

  return (
    <Tag className={cls} {...tagProps} {...rest}>
      {loading && <span className="xw-btn__spin" aria-hidden="true" />}
      {!loading && iconLeft && <span className="xw-btn__icon">{iconLeft}</span>}
      {children}
      {!loading && iconRight && <span className="xw-btn__icon">{iconRight}</span>}
    </Tag>
  );
}
