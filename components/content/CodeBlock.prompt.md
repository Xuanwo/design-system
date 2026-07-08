Code sample for posts, docs, and slides. Renders plain text in Fira Code with a copy button; add a filename header or line numbers as needed.

```jsx
<CodeBlock language="rust" filename="src/main.rs" lineNumbers highlight={[2]} code={`fn main() {
    println!("hello");
}`} />

<CodeBlock language="bash" code="cargo add opendal" />
```

Highlighting is structural only (no token colors) — wrap a real highlighter's output if you need syntax colors. Ligatures are on.
