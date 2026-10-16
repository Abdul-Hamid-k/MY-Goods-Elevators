# MY Goods Elevators and Machinery Work – project notes

Website for **M.Y. Goods Elevators & Machinery Works** (goods lift manufacturer, Indore, est. 1990 (owner confirmed; the old site's home page wrongly said 2017)). Reference content: https://www.mygoodselevator.com/

## Stack
React + Vite + Three.js (@react-three/fiber, drei). Light/dark theme via `data-theme` on `<html>` (set in index.html before paint). Run with `npm run dev` / `npm run build` / `npm run lint`.

## Layout
- `src/data.js` – all content (company, contact, services, 3D model specs, process steps)
- `src/three/` – `HeroScene.jsx` (animated elevator tower), `ModelViewer.jsx` (goods / passenger / scissor lifts), `Cabin.jsx`, `palette.js` (scene colours per theme; `bg` must match `--bg` in index.css)
- `src/components/` – Nav, Hero, Models, Work (auto-loads `src/work/*`), Sections (Services, Process, Contact, Footer)
- `src/work/` – gallery media; `sample-*.svg` are placeholders to delete when real photos/videos are added

## Status
- Website prototype done (hero 3D, 3D lift models, gallery, process, WhatsApp contact form, theme toggle, mobile layout).
- Added from old site: clients section, extra products, strengths/credentials. `TODO.md` lists data still needed from the owner.
- TODO from owner: real phone/WhatsApp/email in `src/data.js`, real photos/videos, confirm model spec text.
- NEXT: catalogue page (`/catalogue`, driven by a `catalogue.json`: product cards, specs, filter/search, WhatsApp enquiry per product, PDF brochure). Owner will provide the product list.

## Gotchas
- Don't publish GST number / turnover from the old site.
- Old folder `M.Y. Goods Elevators & Machinery Works` is a stale copy (the `&` breaks npm on Windows); this folder is the real one.
- A GitHub repo `Abdul-Hamid-k/MY-Goods-Elevators` (renamed from MY-Goods-and-Elevation-) exists with an earlier static prototype + `PROMPT.md` on branch `claude/my-goods-elevation-website-fxjmsw`; this React project is not pushed there yet.
