# Website Prompt – MY Goods and Elevation

Copy everything below into Claude (or any AI builder) to generate or extend the site.

---

You are a senior front-end designer/developer. Build a website for **MY Goods and Elevation**, a company that supplies, installs and services **goods lifts, passenger elevators and lifting equipment**.

## Phase 1 – Prototype (now)
Single-page, static site (HTML + CSS + vanilla JS, no build step, deployable to GitHub Pages).

**Sections:** Header/nav → Hero → Services → Proof of Work (gallery of my real photos + videos) → Why Us → About → Contact (WhatsApp / call / email form) → Footer.

**Requirements**
- **Light and dark theme** with a toggle; default to the OS preference (`prefers-color-scheme`), remember the choice in `localStorage`. Use CSS variables for all colors.
- Proof of Work: responsive grid reading from `assets/images/` and `assets/videos/`; lightbox on click; lazy-loaded images, videos with `preload="metadata"` and a poster. Use placeholders until real files are added.
- Mobile-first, accessible (semantic HTML, alt text, keyboard focus, AA contrast), fast (no heavy frameworks, compressed media).
- Sticky "Call / WhatsApp" button on mobile. Basic SEO meta tags and `LocalBusiness` JSON-LD.
- Tone: trustworthy, industrial, premium. Palette: steel/graphite with a single warm accent (amber/gold); big confident typography; plenty of whitespace.

**Design references (study layout/structure, don't copy assets or branding):**
- Otis (otis.com) – clean hero, service-first navigation
- KONE (kone.com) – bold imagery, product storytelling
- Schindler (schindler.com) – minimal, strong typographic hierarchy
- TK Elevator (tkelevator.com) – modern product/solutions grid
- Local lift/elevator contractor sites – for contact-first, proof-of-work layouts

## Phase 2 – Catalogue (later)
Add a `/catalogue` page: product cards (goods lift, passenger lift, hydraulic lift, dumbwaiter, car lift, platform lift…) with image, key specs (capacity, speed, stops, cabin size), filter/search, product detail view, and an "Enquire on WhatsApp" button prefilled with the product name. Drive it from a single `catalogue.json` so products can be added without touching code. Include a downloadable PDF brochure.

## Deliverables
Clean file structure, comments only where non-obvious, README with how to add photos/videos and edit content.
