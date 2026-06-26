Modal for focused tasks and confirmations. Controlled via `open` / `onClose`. The only place a shadow is used (`--shadow-popover`).

```jsx
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Delete post?"
  description="This can't be undone."
  footer={<>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="danger" onClick={confirm}>Delete</Button>
  </>}
/>
```

Closes on Esc or backdrop click. Sizes `sm`/`md`/`lg`. Pair footer with `Button`s.
