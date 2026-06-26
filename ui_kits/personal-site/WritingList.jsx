const { Tag, Button } = window.XuanwoDesignSystem_8e9a9d;

const POSTS = [
  { date: "2026-06-12", title: "How OpenDAL reads a file", cn: "OpenDAL 是如何读取文件的", read: "11 min", tags: ["rust", "storage"] },
  { date: "2026-05-28", title: "Async traits, two years later", cn: "异步 trait,两年之后", read: "8 min", tags: ["rust", "async"] },
  { date: "2026-04-30", title: "The cost of a good abstraction", cn: "一个好抽象的代价", read: "6 min", tags: ["design"] },
  { date: "2026-03-15", title: "Notes on building in the open", cn: "关于开放式开发的笔记", read: "5 min", tags: ["open-source"] },
];

function PostRow({ p }) {
  const Icon = window.Icon;
  const d = new Date(p.date);
  const date = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  return (
    <a href="#" style={{
      display: "grid", gridTemplateColumns: "120px 1fr auto", gap: "var(--space-5)", alignItems: "baseline",
      padding: "var(--space-4) var(--space-3)", borderRadius: "var(--radius-md)", textDecoration: "none",
      borderBottom: "1px solid var(--border)", transition: "background-color var(--duration-fast) var(--ease-out)",
    }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-2)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
      <time style={{ fontSize: "var(--text-sm)", color: "var(--fg-subtle)", fontFamily: "var(--font-mono)" }}>{date}</time>
      <div>
        <div style={{ fontSize: "var(--text-lg)", fontWeight: 600, color: "var(--fg)", letterSpacing: "var(--tracking-snug)" }}>{p.title}</div>
        <div style={{ fontSize: "var(--text-base)", color: "var(--fg-subtle)", marginTop: 2 }}>{p.cn}</div>
        <div style={{ display: "flex", gap: 6, marginTop: 10 }}>{p.tags.map((t) => <Tag key={t} hash>{t}</Tag>)}</div>
      </div>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: "var(--text-sm)", color: "var(--fg-faint)", whiteSpace: "nowrap" }}>
        {Icon.clock({ width: 13, height: 13 })}{p.read}
      </span>
    </a>
  );
}

function WritingList() {
  const Icon = window.Icon;
  return (
    <section style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "var(--space-6) var(--space-5) var(--space-8)" }}>
      <SectionHead eyebrow="Writing" title="Recent posts"
        action={<Button variant="ghost" size="sm" iconRight={Icon.arrow()}>All posts</Button>} />
      <div style={{ marginTop: "var(--space-4)" }}>
        {POSTS.map((p) => <PostRow key={p.title} p={p} />)}
      </div>
    </section>
  );
}
window.WritingList = WritingList;
