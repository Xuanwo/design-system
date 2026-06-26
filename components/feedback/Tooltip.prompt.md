Hover/focus hint for icon buttons and truncated text. Keep it to a few words.

```jsx
<Tooltip content="Copy link" kbd="⌘C">
  <IconButton label="Copy"><LinkIcon /></IconButton>
</Tooltip>

<Tooltip content="Search posts" side="bottom">
  <IconButton label="Search"><SearchIcon /></IconButton>
</Tooltip>
```

Wrap one focusable child. Don't put essential actions only in a tooltip.
