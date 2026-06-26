import React from "react";

const CSS = `
.xw-avatar {
  --_s: 36px;
  position: relative; display: inline-flex; align-items: center; justify-content: center;
  width: var(--_s); height: var(--_s); flex: none;
  font-family: var(--font-sans); font-weight: var(--weight-semibold);
  font-size: calc(var(--_s) * 0.4); line-height: 1; color: var(--accent-text);
  background: var(--accent-subtle); border: 1px solid var(--accent-border);
  overflow: hidden; user-select: none;
}
.xw-avatar--circle { border-radius: var(--radius-full); }
.xw-avatar--rounded { border-radius: var(--radius-md); }
.xw-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
.xw-avatar__status {
  position: absolute; right: -1px; bottom: -1px;
  width: 30%; height: 30%; min-width: 8px; min-height: 8px; border-radius: 50%;
  border: 2px solid var(--surface); box-sizing: border-box;
}
.xw-avatar__status--online { background: var(--success); }
.xw-avatar__status--busy { background: var(--danger); }
.xw-avatar__status--away { background: var(--warning); }
.xw-avatar__status--offline { background: var(--fg-faint); }
`;
let _i = false;
function inject() { if (_i || typeof document === "undefined") return; _i = true; const s = document.createElement("style"); s.setAttribute("data-xw", "avatar"); s.textContent = CSS; document.head.appendChild(s); }

const SIZES = { xs: 22, sm: 28, md: 36, lg: 48, xl: 64 };

function initials(name = "") {
  const parts = name.trim().split(/\s+/);
  if (!parts[0]) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar({ src, name = "", size = "md", shape = "circle", status, className = "", style, ...rest }) {
  inject();
  const px = SIZES[size] || size;
  const cls = ["xw-avatar", `xw-avatar--${shape}`, className].filter(Boolean).join(" ");
  return (
    <span className={cls} style={{ "--_s": typeof px === "number" ? `${px}px` : px, ...style }} title={name || undefined} {...rest}>
      {src ? <img src={src} alt={name} /> : <span>{initials(name)}</span>}
      {status && <span className={`xw-avatar__status xw-avatar__status--${status}`} />}
    </span>
  );
}
