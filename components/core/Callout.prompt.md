Admonition / note block for docs and long-form articles. Carries a default icon per variant.

```jsx
<Callout variant="note" title="Note">中文 and English both read cleanly here.</Callout>
<Callout variant="warning" title="Heads up">This API is unstable.</Callout>
<Callout variant="accent">A quiet aside that ties to the brand.</Callout>
```

Variants: `note` (neutral), `accent`, `info`, `success`, `warning`, `danger`. `title` is optional; pass `hideIcon` for a plain block.
