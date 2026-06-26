const { Logo, IconButton, Button } = window.XuanwoDesignSystem_8e9a9d;

function ThemeToggle() {
  const [theme, setTheme] = React.useState(() => document.documentElement.dataset.theme || "light");
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("xw-theme", next); } catch (e) {}
    setTheme(next);
  };
  return (
    <IconButton label="Toggle theme" onClick={toggle}>
      {theme === "dark" ? window.Icon.sun() : window.Icon.moon()}
    </IconButton>
  );
}

function SiteHeader() {
  const Icon = window.Icon;
  const nav = ["Writing", "Projects", "Talks", "About"];
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "color-mix(in srgb, var(--bg) 82%, transparent)",
      backdropFilter: "blur(10px)", borderBottom: "1px solid var(--border)",
    }}>
      <div style={{
        maxWidth: "var(--container)", margin: "0 auto", padding: "0 var(--space-5)",
        height: 60, display: "flex", alignItems: "center", gap: "var(--space-5)",
      }}>
        <a href="#" style={{ display: "inline-flex" }}><Logo height={28} src="../../assets/logo/wordmark.png" /></a>
        <nav style={{ display: "flex", gap: 4, marginLeft: "var(--space-4)" }}>
          {nav.map((n, i) => (
            <a key={n} href="#" style={{
              fontSize: "var(--text-base)", fontWeight: 500,
              color: i === 0 ? "var(--fg)" : "var(--fg-subtle)",
              padding: "6px 10px", borderRadius: "var(--radius-sm)", textDecoration: "none",
            }}>{n}</a>
          ))}
        </nav>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
          <IconButton label="Search">{Icon.search()}</IconButton>
          <IconButton label="GitHub">{Icon.github()}</IconButton>
          <IconButton label="RSS">{Icon.rss()}</IconButton>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
window.SiteHeader = SiteHeader;
