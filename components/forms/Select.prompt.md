Restyled native `<select>` with a custom chevron — keyboard and mobile behaviour come for free.

```jsx
<Select label="Theme" options={["System", "Light", "Dark"]} />
<Select placeholder="Pick a language" options={[
  { value: "rust", label: "Rust" },
  { value: "go", label: "Go" },
]} />
```

Use `options` for simple lists or pass `<option>` children for groups. Same label/hint/error pattern as Input.
