Interactive chip for topics, tags, and filters. Unlike `Badge`, it can be selected or removed.

```jsx
<Tag hash>rust</Tag>
<Tag hash selected onClick={toggle}>opendal</Tag>
<Tag onRemove={() => drop(id)}>storage</Tag>
```

Use `hash` for blog/topic tags, `selected` + `onClick` for filter toggles, `onRemove` for editable token lists.
