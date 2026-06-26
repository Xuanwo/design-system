const { Card, Badge, Tag } = window.XuanwoDesignSystem_8e9a9d;

const PROJECTS = [
  { name: "Apache OpenDAL", role: "PMC Chair", desc: "One unified data access layer — read & write to any storage service with a single API.", lang: "Rust", stars: "3.6k", color: "#dea584" },
  { name: "Databend", role: "Contributor", desc: "Cloud-native data warehouse built in Rust, designed for elasticity and low cost.", lang: "Rust", stars: "7.9k", color: "#dea584" },
  { name: "reqsign", role: "Author", desc: "Signing API requests without effort — AWS, Azure, Google, and more.", lang: "Rust", stars: "180", color: "#dea584" },
  { name: "BetterIME", role: "Maintainer", desc: "Notes, configs, and tooling that make a focused writing setup feel effortless.", lang: "TypeScript", stars: "420", color: "#3178c6" },
];

function ProjectCard({ p }) {
  const Icon = window.Icon;
  return (
    <Card href="#" interactive padding="md">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
        <div style={{ fontWeight: 600, fontSize: "var(--text-md)", color: "var(--fg)" }}>{p.name}</div>
        <span style={{ color: "var(--fg-faint)", display: "inline-flex" }}>{Icon.arrowUpRight({ width: 16, height: 16 })}</span>
      </div>
      <Badge color="accent" style={{ marginTop: 8 }}>{p.role}</Badge>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--fg-muted)", lineHeight: "var(--leading-normal)", margin: "10px 0 16px" }}>{p.desc}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: "var(--text-sm)", color: "var(--fg-subtle)" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 9, height: 9, borderRadius: "50%", background: p.color }} />{p.lang}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>{Icon.star({ width: 13, height: 13 })}{p.stars}</span>
      </div>
    </Card>
  );
}

function ProjectGrid() {
  return (
    <section style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "var(--space-6) var(--space-5)" }}>
      <SectionHead eyebrow="Open source" title="Projects I work on" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "var(--space-4)", marginTop: "var(--space-5)" }}>
        {PROJECTS.map((p) => <ProjectCard key={p.name} p={p} />)}
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, action }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
      <div>
        <div style={{ fontSize: "var(--text-sm)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--accent-text)", fontWeight: 600, marginBottom: 6 }}>{eyebrow}</div>
        <h2 style={{ fontSize: "var(--text-2xl)", fontWeight: 600, letterSpacing: "var(--tracking-snug)", margin: 0 }}>{title}</h2>
      </div>
      {action}
    </div>
  );
}
window.ProjectGrid = ProjectGrid;
window.SectionHead = SectionHead;
