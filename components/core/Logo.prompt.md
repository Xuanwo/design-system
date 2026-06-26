Brand identity — the pixel-art **Xuanwo** logo. Use the full wordmark in headers/footers; the **X** monogram where space is tight (compact bars, favicons, avatars).

```jsx
<Logo height={26} src="assets/logo/wordmark.png" />      {/* full wordmark */}
<Logo variant="mark" height={32} src="assets/logo/monogram.png" />
<LogoMark size={28} src="assets/logo/monogram.png" />     {/* same, shorthand */}
```

`src` is relative to the consuming page — pass the correct path from subdirectories (e.g. `../../assets/logo/wordmark.png`). The art sits on white; keep it on light surfaces or give the monogram a rounded crop. There is no longer a vortex glyph.
