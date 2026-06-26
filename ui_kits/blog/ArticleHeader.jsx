const { Avatar, Tag, Badge } = window.XuanwoDesignSystem_8e9a9d;

function ArticleHeader() {
  const Icon = window.Icon;
  return (
    <header style={{ maxWidth: 720, margin: "0 auto", padding: "var(--space-8) var(--space-5) 0" }}>
      <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "var(--text-sm)", color: "var(--fg-subtle)", textDecoration: "none", marginBottom: "var(--space-5)" }}>
        <span style={{ transform: "rotate(180deg)", display: "inline-flex" }}>{Icon.arrow({ width: 14, height: 14 })}</span>
        Writing
      </a>
      <div style={{ display: "flex", gap: 8, marginBottom: "var(--space-4)" }}>
        <Tag hash>rust</Tag><Tag hash>storage</Tag><Tag hash>opendal</Tag>
      </div>
      <h1 style={{
        fontFamily: "var(--font-display)", fontSize: "var(--text-4xl)", fontWeight: 600,
        lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-tight)", margin: 0, textWrap: "balance",
      }}>How OpenDAL reads a file</h1>
      <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", color: "var(--fg-subtle)", margin: "var(--space-3) 0 0", fontWeight: 400 }}>
        OpenDAL 是如何读取文件的
      </p>
      <div style={{
        display: "flex", alignItems: "center", gap: "var(--space-4)", marginTop: "var(--space-6)",
        paddingBottom: "var(--space-6)", borderBottom: "1px solid var(--border)",
        fontSize: "var(--text-sm)", color: "var(--fg-subtle)",
      }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
          <Avatar src="../../assets/logo/logo.jpeg" name="Xuanwo" size="sm" />
          <span style={{ color: "var(--fg)", fontWeight: 600 }}>Xuanwo</span>
        </span>
        <span style={{ fontFamily: "var(--font-mono)" }}>Jun 12, 2026</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>{Icon.clock({ width: 13, height: 13 })}11 min read</span>
      </div>
    </header>
  );
}
window.ArticleHeader = ArticleHeader;
