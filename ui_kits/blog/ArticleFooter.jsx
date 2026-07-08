const { Avatar, Button, Card, IconButton } = window.XuanwoDesignSystem_8e9a9d;

function ArticleFooter() {
  const Icon = window.Icon;
  return (
    <footer style={{ maxWidth: 720, margin: "0 auto", padding: "var(--space-7) var(--space-5) var(--space-9)" }}>
      {/* reactions */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: "var(--space-6)", borderBottom: "1px solid var(--border)" }}>
        <Button variant="secondary" size="sm" iconLeft={Icon.star({ width: 14, height: 14 })}>Like · 128</Button>
        <Button variant="ghost" size="sm" iconLeft={Icon.arrowUpRight({ width: 14, height: 14 })}>Share</Button>
        <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
          <IconButton label="Twitter" size="sm">{Icon.twitter()}</IconButton>
          <IconButton label="Copy link" size="sm">{Icon.arrowUpRight()}</IconButton>
        </div>
      </div>

      {/* author bio */}
      <div style={{ display: "flex", gap: "var(--space-4)", padding: "var(--space-6) 0", alignItems: "flex-start" }}>
        <Avatar src="../../assets/logo/logo.jpeg" name="Xuanwo" size="lg" />
        <div>
          <div style={{ fontWeight: 600, color: "var(--fg)", fontSize: "var(--text-md)" }}>Xuanwo</div>
          <p style={{ fontSize: "var(--text-base)", color: "var(--fg-muted)", lineHeight: "var(--leading-relaxed)", margin: "4px 0 0", maxWidth: 480 }}>
            Open-source developer working on storage &amp; data systems. PMC Chair of Apache OpenDAL.
            Writes code, and writes about writing it.
          </p>
        </div>
        <Button variant="primary" size="sm" style={{ marginLeft: "auto", flex: "none" }}>Follow</Button>
      </div>

      {/* prev / next */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)", marginTop: "var(--space-4)" }}>
        <Card href="#" interactive>
          <div style={{ fontSize: "var(--text-xs)", color: "var(--fg-subtle)", marginBottom: 6 }}>← Previous</div>
          <div style={{ fontWeight: 600, color: "var(--fg)" }}>Async traits, two years later</div>
        </Card>
        <Card href="#" interactive style={{ textAlign: "right" }}>
          <div style={{ fontSize: "var(--text-xs)", color: "var(--fg-subtle)", marginBottom: 6 }}>Next →</div>
          <div style={{ fontWeight: 600, color: "var(--fg)" }}>The cost of a good abstraction</div>
        </Card>
      </div>
    </footer>
  );
}
window.ArticleFooter = ArticleFooter;
