# M.Y. Goods Elevators & Machinery Works – website

React + Vite + Three.js (react-three-fiber). Light/dark theme, animated 3D goods-lift hero, interactive 3D lift models, proof-of-work gallery.

Live site: https://abdul-hamid-k.github.io/MY-Goods-Elevators/ (deployed automatically from `master` by GitHub Actions).

## Run
    npm install
    npm run dev        # http://localhost:5173
    npm run build      # production build in dist/

## Edit content
- `src/data.js` – company details, **phone / WhatsApp / email (placeholders – replace!)**, services, lift models, process steps.
- `src/work/` – drop your photos & videos here; they appear in the gallery automatically (delete the `sample-*.svg` placeholders first). Restart dev server after adding.
- `src/three/` – 3D scenes (`HeroScene.jsx` tower, `ModelViewer.jsx` goods / passenger / hydraulic lifts), colours in `palette.js`.
- `src/index.css` – theme colours (`--accent` etc.) and layout.

## Next: catalogue
Planned as a `/catalogue` page driven by a `catalogue.json` (see PROMPT.md in the GitHub repo).

## Deploy
Pushing to `master` runs `.github/workflows/deploy.yml` (lint, build, publish `dist/` to GitHub Pages). Repo setting: Settings > Pages > Source = GitHub Actions.
