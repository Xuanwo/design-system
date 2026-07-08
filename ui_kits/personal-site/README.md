# UI Kit — Personal Site

A high-fidelity recreation of Xuanwo's personal site landing page, built entirely from the design system primitives.

## Screens
- **`index.html`** — the landing page: sticky header with theme toggle, hero intro, open-source project grid, recent writing list (posts in English or 中文, one language each), and footer.

## Composition
| File | Role |
|---|---|
| `SiteHeader.jsx` | Sticky blurred header — `Logo`, nav, `IconButton` actions, light/dark `ThemeToggle` (persists to `localStorage`). |
| `Hero.jsx` | Intro headline (serif display), bilingual bio, CTA `Button`s, topic `Tag`s, `Avatar`. |
| `ProjectGrid.jsx` | Interactive `Card`s for open-source projects with `Badge` role + language/star meta. |
| `WritingList.jsx` | Recent posts as a hairline-divided list with date, bilingual title, `Tag`s, reading time. |
| `SiteFooter.jsx` | Link columns + social `IconButton`s + `Logo`. |
| `icons.jsx` | Shared Lucide-style inline icons (`window.Icon`). |

## Notes
- Theme: toggling sets `document.documentElement.dataset.theme` and persists it. The page reads it back on load.
- All color, type, spacing come from `styles.css` tokens — no hard-coded values.
- Content (projects, posts) is illustrative, reflecting Xuanwo's real focus areas (OpenDAL, Databend, Rust storage). Swap in real data when wiring up.
