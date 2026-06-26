Multi-line input. Same `label`/`hint`/`error` API as `Input`; vertically resizable.

```jsx
<Textarea label="Abstract" rows={4} placeholder="A short summary…" />
<Textarea label="Config" mono defaultValue={"[profile]\nname = \"xuanwo\""} />
```

Use `mono` for code/config so it picks up Fira Code.
