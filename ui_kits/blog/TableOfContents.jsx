function TableOfContents() {
  const items = [
    { id: "the-operator", label: "The Operator" },
    { id: "the-read-path", label: "The read path" },
    { id: "streaming", label: "Streaming, not slurping" },
    { id: "wrapping-up", label: "Wrapping up" },
  ];
  const [active, setActive] = React.useState(items[0].id);
  return (
    <nav style={{ position: "sticky", top: 92, alignSelf: "start" }}>
      <div style={{ fontSize: "var(--text-xs)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--fg-subtle)", fontWeight: 600, marginBottom: 12 }}>
        On this page
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 2, borderLeft: "1px solid var(--border)" }}>
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={"#" + it.id}
              onClick={() => setActive(it.id)}
              style={{
                display: "block", padding: "5px 0 5px 14px", marginLeft: "-1px",
                fontSize: "var(--text-sm)", textDecoration: "none",
                color: active === it.id ? "var(--accent-text)" : "var(--fg-subtle)",
                fontWeight: active === it.id ? 600 : 400,
                borderLeft: active === it.id ? "2px solid var(--accent)" : "2px solid transparent",
              }}
            >{it.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
window.TableOfContents = TableOfContents;
