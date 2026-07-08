const { Button, Avatar, Tag } = window.XuanwoDesignSystem_8e9a9d;

function Hero() {
  const Icon = window.Icon;
  return (
    <section style={{
      maxWidth: "var(--container)", margin: "0 auto",
      padding: "var(--space-9) var(--space-5) var(--space-7)",
      display: "grid", gridTemplateColumns: "1fr auto", gap: "var(--space-7)", alignItems: "center",
    }}>
      <div>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8, marginBottom: "var(--space-4)",
          fontSize: "var(--text-sm)", color: "var(--success-text)", fontWeight: 600,
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--success)" }} />
          Open to collaborating on storage &amp; data systems
        </div>
        <h1 style={{
          fontFamily: "var(--font-display)", fontSize: "var(--text-5xl)", fontWeight: 600,
          lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-tight)", margin: 0,
          textWrap: "balance",
        }}>
          Hi, I&rsquo;m Xuanwo.<br />
          I build the plumbing<br />beneath your data.
        </h1>
        <p style={{
          fontSize: "var(--text-lg)", color: "var(--fg-muted)", lineHeight: "var(--leading-relaxed)",
          maxWidth: 540, margin: "var(--space-5) 0 0",
        }}>
          Open-source developer focused on storage and data systems. I maintain <strong style={{ color: "var(--fg)", fontWeight: 600 }}>Apache OpenDAL</strong> and
          write about async Rust, distributed storage, and the craft of building reliable infrastructure.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: "var(--space-6)", flexWrap: "wrap" }}>
          <Button variant="primary" iconRight={Icon.arrow()}>Read the writing</Button>
          <Button variant="secondary" iconLeft={Icon.github()}>GitHub</Button>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: "var(--space-6)", flexWrap: "wrap" }}>
          {["rust", "storage", "async", "databases", "open-source"].map((t) => <Tag key={t} hash>{t}</Tag>)}
        </div>
      </div>
      <div style={{ justifySelf: "end" }}>
        <Avatar src="../../assets/logo/logo.jpeg" name="Xuanwo" size={132} shape="rounded" />
      </div>
    </section>
  );
}
window.Hero = Hero;
