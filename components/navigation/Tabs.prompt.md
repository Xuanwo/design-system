Section/segment switcher. `underline` for page-level navigation, `pill` for compact in-panel toggles.

```jsx
<Tabs items={[
  { value: "readme",  label: "README" },
  { value: "issues",  label: "Issues", count: 12 },
  { value: "actions", label: "Actions", content: <ActionsPanel/> },
]} defaultValue="readme" />

{/* render-prop form */}
<Tabs items={tabs} variant="pill">{active => <Panel id={active} />}</Tabs>
```

Provide panels per item via `content`, or use the child function for custom rendering.
