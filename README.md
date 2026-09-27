# hfoky web

Personal website for projects, tutorials and things I am working on.

The site is a small, responsive static website with a calm glass-inspired interface, light and dark themes, and navigation designed to feel natural on both desktop and mobile.

## Features

- Responsive layout for phones, tablets and desktop screens
- Light mode, dark mode and system theme detection
- Theme preference saved between visits
- Frosted glass navigation with a smooth active-section indicator
- Mobile bottom navigation and desktop header navigation
- Smooth page entrance animations
- Article cards with dedicated detail pages
- Scroll position restoration when returning to the homepage
- Social links for Discord, Telegram and TikTok

## Pages

| Page | Description |
| --- | --- |
| [`index.html`](index.html) | Homepage with articles and social links |
| [`HarmonyOS-convert.html`](HarmonyOS-convert.html) | EMUI to HarmonyOS conversion tutorial |
| [`MetroLink.html`](MetroLink.html) | MetroLink, an old Windows Phone app |
| [`New-website.html`](New-website.html) | Article about the new hfoky website |

## Run locally

No build tools or dependencies are required.

1. Clone or download the repository.
2. Open [`index.html`](index.html) in a browser.

For a local server, run:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Project structure
├── index.css            # Homepage-specific layout and components

```text
├── shared.css           # Shared visual system and responsive UI
├── shared.js            # Shared theme and navigation behavior
.
├── index.html
├── HarmonyOS-convert.html
├── MetroLink.html
├── New-website.html
├── pliki/              # Images and other site assets
└── README.md
```

## Built with

- HTML5
- CSS3
- Vanilla JavaScript
- CSS backdrop filters for the glass effect

The website is intentionally dependency-free and can be hosted as a static site, including on GitHub Pages or a similar platform.
