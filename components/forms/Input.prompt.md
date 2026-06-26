Text input. Pass `label`/`hint`/`error` to get the full field; omit all three and it renders just the bare `<input>`.

```jsx
<Input label="Email" type="email" placeholder="you@example.com" required />
<Input prefix={<SearchIcon />} placeholder="Search posts…" />
<Input label="Slug" error="Already taken" defaultValue="opendal" />
```

Sizes `sm`/`md`/`lg`. `prefix`/`suffix` take icon nodes. Focus shows an azure ring; `error` switches it to red.
