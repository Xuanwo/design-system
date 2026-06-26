import React from "react";

const CSS = `
.xw-tt-wrap { position: relative; display: inline-flex; }
.xw-tt {
  position: absolute; z-index: var(--z-tooltip); pointer-events: none;
  background: var(--fg); color: var(--bg);
  font-family: var(--font-sans); font-size: var(--text-sm); font-weight: var(--weight-medium); line-height: 1.3;
  padding: 5px 9px; border-radius: var(--radius-sm); white-space: nowrap; max-width: 260px;
  opacity: 0; transform: translateY(2px); transition: opacity var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out);
}
.xw-tt-wrap[data-open="true"] .xw-tt { opacity: 1; transform: translateY(0); }
.xw-tt--top { bottom: 100%; left: 50%; translate: -50% 0; margin-bottom: 7px; }
.xw-tt--bottom { top: 100%; left: 50%; translate: -50% 0; margin-top: 7px; }
.xw-tt--left { right: 100%; top: 50%; translate: 0 -50%; margin-right: 7px; }
.xw-tt--right { left: 100%; top: 50%; translate: 0 -50%; margin-left: 7px; }
.xw-tt__kbd { margin-left: 6px; opacity: 0.7; font-family: var(--font-mono); font-size: 11px; }
`;
let _i = false;
function inject() { if (_i || typeof document === "undefined") return; _i = true; const s = document.createElement("style"); s.setAttribute("data-xw", "tooltip"); s.textContent = CSS; document.head.appendChild(s); }

export function Tooltip({ content, side = "top", kbd, delay = 250, className = "", children }) {
  inject();
  const [open, setOpen] = React.useState(false);
  const timer = React.useRef(null);
  const show = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(true), delay); };
  const hide = () => { clearTimeout(timer.current); setOpen(false); };
  return (
    <span
      className={["xw-tt-wrap", className].filter(Boolean).join(" ")}
      data-open={open}
      onMouseEnter={show} onMouseLeave={hide}
      onFocus={show} onBlur={hide}
    >
      {children}
      <span role="tooltip" className={`xw-tt xw-tt--${side}`}>
        {content}
        {kbd && <span className="xw-tt__kbd">{kbd}</span>}
      </span>
    </span>
  );
}
