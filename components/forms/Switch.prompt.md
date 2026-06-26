Toggle for settings that apply immediately. Prefer it over a checkbox when there's no Save button.

```jsx
<Switch label="Dark mode" onChange={e => setTheme(e.target.checked ? 'dark' : 'light')} />
<Switch label="Comments" description="Allow readers to comment." defaultChecked />
```
