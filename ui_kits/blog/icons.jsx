/* Shared inline icons for the UI kits. Lucide-style: 24px grid,
   1.6 stroke, round caps. Inherit currentColor. Registered on window
   so sibling babel scripts can use them. */
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
const S = (props, children) => <svg viewBox="0 0 24 24" {...stroke} {...props}>{children}</svg>;

const Icon = {
  github: (p) => S(p, <><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></>),
  rss: (p) => S(p, <><path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></>),
  sun: (p) => S(p, <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/></>),
  moon: (p) => S(p, <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>),
  arrow: (p) => S(p, <path d="M5 12h14M13 6l6 6-6 6"/>),
  arrowUpRight: (p) => S(p, <path d="M7 17 17 7M8 7h9v9"/>),
  star: (p) => S(p, <path d="m12 3 2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.8 6.7 19.2l1-5.8-4.2-4.1 5.9-.9z"/>),
  search: (p) => S(p, <><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></>),
  menu: (p) => S(p, <path d="M3 6h18M3 12h18M3 18h18"/>),
  twitter: (p) => S(p, <path d="M21 5.5a8 8 0 0 1-2.4.7 4 4 0 0 0 1.8-2.2 8 8 0 0 1-2.6 1A4 4 0 0 0 11 8.5a11 11 0 0 1-8-4s-2 4.5 2 7a4 4 0 0 1-2-.5c0 2 1.5 3.8 3.5 4.2a4 4 0 0 1-2 0a4 4 0 0 0 3.7 2.8A8 8 0 0 1 3 19.5a11 11 0 0 0 6 1.8c7.2 0 11.2-6.1 11-11.6A8 8 0 0 0 21 5.5z"/>),
  mail: (p) => S(p, <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>),
  clock: (p) => S(p, <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>),
  hash: (p) => S(p, <path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/>),
  list: (p) => S(p, <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>),
};
window.Icon = Icon;
