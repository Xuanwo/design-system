Action trigger — use `variant="primary"` for the single main action on a view, `secondary`/`ghost` for everything else, `danger` for destructive.

```jsx
<Button variant="primary" iconRight={<ArrowRight />}>开始 Get started</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost" size="sm">Skip</Button>
<Button variant="danger" loading>Deleting…</Button>
```

Variants: `primary` (filled azure), `secondary` (bordered), `ghost` (quiet), `danger`. Sizes: `sm` / `md` / `lg`. Pass `iconLeft` / `iconRight` as SVG nodes, `loading` for a spinner, `href` or `as` to render an anchor. One primary per view — keep the rest quiet.
