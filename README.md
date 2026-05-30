# Portfolio Website — Andi Hisyam Helmi Faalih Fakhruddin

Dependency-free, recruiter-friendly portfolio website generated from `website.txt` and `cv.txt`.

## Quick Start (Local)

Option A — open directly:
- Open `index.html` in your browser.

Option B — run a local server (recommended for relative routes):
```bash
cd portfolio-website
python -m http.server 8080
```
Then open `http://localhost:8080`.

## Customize

- Profile image: `assets/img/profile.jpeg` (replace with your preferred photo)
- CV file: `CV_AndiHisyamHelmiFaalihFakhruddin.pdf`
- Project links: search for `TODO: Replace placeholder repository link`
- Project pages: `projects/<slug>/index.html`
- Colors/typography: `assets/css/styles.css` (light theme)

## Deploy

### GitHub Pages
1. Create a GitHub repo (e.g. `portfolio-website`).
2. Upload the contents of the `portfolio-website/` folder to the repo root.
3. In GitHub: **Settings → Pages** → **Build and deployment** → Source: **Deploy from a branch**
4. Choose branch `main` and folder `/ (root)` → Save.

### Vercel (Static)
1. Create a new Vercel project.
2. Import the GitHub repo.
3. Framework preset: **Other**
4. Build command: leave empty
5. Output directory: `/`
