The base surface panel. Compose anything inside it; turn on `interactive` (or pass `href`) for clickable cards like blog post links.

```jsx
<Card>
  <h3>Reading list</h3>
  <p>Notes on storage, async Rust, and building in the open.</p>
</Card>

<Card href="/posts/opendal" interactive>
  <h3>Building OpenDAL</h3>
</Card>
```

Padding `none`/`sm`/`md`/`lg`. Depth comes from the border on `--surface` — never add a shadow. Use `padding="none"` when a child (image, list) should bleed to the edge.
