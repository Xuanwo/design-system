# UI Kit — Blog

A long-form article reading view — the core surface for Xuanwo's writing (technical posts and idea explanations, in English or 中文 — one language per article).

## Screens
- **`index.html`** — a full article page: sticky top bar with theme toggle, article header (title + dek + author meta), prose body with code, callouts and a blockquote, a sticky table of contents, and an article footer (reactions, author bio, prev/next).

## Composition
| File | Role |
|---|---|
| `ArticleHeader.jsx` | Back link, topic `Tag`s, serif display title + dek, `Avatar` + date + reading time. |
| `ArticleBody.jsx` | The `.prose` article — headings, paragraphs, lists, blockquote, plus `CodeBlock` and `Callout` from the system. |
| `TableOfContents.jsx` | Sticky right-rail TOC with an active-section indicator. |
| `ArticleFooter.jsx` | Like/share actions, author bio card, prev/next `Card`s. |
| `icons.jsx` | Shared inline icons (`window.Icon`). |

## Reading typography
The article body is **serif** (`--font-reading` / Source Serif 4 + Noto Serif SC) at `--text-lg` with `--leading-relaxed` on a ~700px measure — tuned for sustained reading in both English and 中文. The `.prose` styles live in `index.html`; lift them into a real stylesheet when productionizing.

## Notes
- Inline `<code>` gets a tinted chip; fenced code uses the `CodeBlock` component (mono, copy button) and is exempt from inline-code styling.
- Theme toggle persists to `localStorage` (`xw-theme`), shared with the personal-site kit.
