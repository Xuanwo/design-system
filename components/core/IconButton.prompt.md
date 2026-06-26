Icon-only button — toolbars, card actions, close buttons. Always give it a `label` (becomes aria-label + tooltip).

```jsx
<IconButton label="Search"><SearchIcon /></IconButton>
<IconButton variant="secondary" label="Settings"><GearIcon /></IconButton>
<IconButton size="sm" label="Dismiss"><XIcon /></IconButton>
```

Variants: `ghost` (default), `secondary`, `primary`. Sizes `sm` (28) / `md` (36) / `lg` (44 — meets touch target).
