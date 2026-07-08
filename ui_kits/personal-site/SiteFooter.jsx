const { Logo, IconButton } = window.XuanwoDesignSystem_8e9a9d;

function SiteFooter() {
  const Icon = window.Icon;
  const cols = [
    { h: "Content", links: ["Writing", "Talks", "Notes", "RSS feed"] },
    { h: "Projects", links: ["OpenDAL", "Databend", "reqsign", "All on GitHub"] },
    { h: "Elsewhere", links: ["GitHub", "Twitter / X", "Email", "Mastodon"] },
  ];
  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
      <div style={{
        maxWidth: "var(--container)", margin: "0 auto", padding: "var(--space-7) var(--space-5)",
        display: "grid", gridTemplateColumns: "1.4fr repeat(3, 1fr)", gap: "var(--space-6)",
      }}>
        <div>
          <Logo height={28} src="../../assets/logo/wordmark.png" />
          <p style={{ fontSize: "var(--text-sm)", color: "var(--fg-subtle)", lineHeight: "var(--leading-relaxed)", maxWidth: 260, marginTop: 14 }}>
            Building reliable storage infrastructure, in the open.
          </p>
          <div style={{ display: "flex", gap: 4, marginTop: 16 }}>
            <IconButton label="GitHub" size="sm">{Icon.github()}</IconButton>
            <IconButton label="Twitter" size="sm">{Icon.twitter()}</IconButton>
            <IconButton label="Email" size="sm">{Icon.mail()}</IconButton>
            <IconButton label="RSS" size="sm">{Icon.rss()}</IconButton>
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <div style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--fg)", marginBottom: 12 }}>{c.h}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 9 }}>
              {c.links.map((l) => (
                <li key={l}><a href="#" style={{ fontSize: "var(--text-sm)", color: "var(--fg-subtle)", textDecoration: "none" }}>{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{
        maxWidth: "var(--container)", margin: "0 auto", padding: "var(--space-4) var(--space-5)",
        borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between",
        fontSize: "var(--text-sm)", color: "var(--fg-faint)",
      }}>
        <span>© 2026 Xuanwo</span>
        <span style={{ fontFamily: "var(--font-mono)" }}>Built with the Xuanwo Design System</span>
      </div>
    </footer>
  );
}
window.SiteFooter = SiteFooter;
