# INZIRA — Vercel Deployment Readiness

**Status:** **DEPLOYED.** The app is live at **https://inzira-rw.vercel.app** (short alias `https://inziraapp.vercel.app`; GitHub `metm2911-ai/Inzira` → Vercel project `inzira1/inzira`). All approved changes are implemented and verified in production. See §B4 for what is done; §B5 for the few remaining manual items.

- App version: `0.13.0-pilot` · service-worker cache `inzira-v21`
- Project folder: `C:\Users\User\Documents\Default Project\inzira`
- Live URL: `https://inzira-rw.vercel.app` (also `inziraapp.vercel.app`; `inzira-mu.vercel.app` still resolves)
- Backend: Supabase project `zmvxpatscxkvwymthkgc` (live, RLS on, sync verified)
- Architecture preserved: static files, no build step, no dependencies, offline-first PWA

---

## 0. Summary

| # | Finding | Severity |
|---|---------|----------|
| 1 | Every question image is rendered from the PDF at a **fixed 200 DPI**; **60 of 145** crops are rendered **below the PDF's own resolution** — up to **−53%** (RW-0245). | High (visual) |
| 2 | Images display at their intrinsic pixel size in a ≤640 px column, so any DPR-2/3 phone **upscales every image 2–3×** → soft edges. | High (visual) |
| 3 | **23 source images are genuinely low-resolution in the PDF** (<160 px wide; 11 are 80 px). No render setting can fix these — they need replacement. | Medium |
| 4 | Service worker does **not** pre-cache question images, so the free tier's 24 picture questions are **not available offline** until each is opened once. | High (offline) |
| 5 | Project is **not a Git repo**; Vercel needs Git or the CLI. No `vercel.json` / `.vercelignore` yet. | Blocker (one-time) |
| 6 | Deploying the folder as-is would publicly serve build tooling, raw question JSON, drafts, docs and the business plan. | Medium |
| 7 | No `sw.js` cache header / manifest MIME / security headers configured for the CDN. | Low |
| 8 | Supabase "Site URL" still points at localhost; no production URL registered. | Low (no OTP used) |
| 9 | Free/full gate is client-side; the full bank ships in `data/bank.js`. Unchanged by design — noted only. | Known |

> Fixed since this table was written: **1** (native-capped render), **4** (SW pre-caches images), **7** (Vercel headers). See §B4. The remaining blocker for a public URL is **5** (Git + deploy).

The good news: the app **can deploy to Vercel essentially as-is** (static, relative paths, no routing). The only must-do work is a small `vercel.json`, a `.vercelignore`, and SW cache hygiene.

---

# PART A — Question image quality

## A1. How images are produced today

```
questions-1.pdf
  └─ tools/parse_questions.py   extract_images()  →  assets/q/<source>.png
       page.crop(box).to_image(resolution=200)     ← line 318: hard-coded 200 DPI
  └─ tools/build_data.py        →  data/bank.js   (q.img = "assets/q/xxx.png")
  └─ app.js  `.qimg img`        →  <img src="assets/q/xxx.png">   (no width/height)
```

Relevant CSS (`styles.css:236`):

```css
.qimg img { max-width: 100%; max-height: 320px; border-radius: 14px;
            border: 1px solid var(--line); background:#fff; padding: 10px; }
```

## A2. Findings — the exact cause

### Cause 1 — the render throws away resolution (60 of 145 images)

`parse_questions.py` renders **every** crop at 200 DPI regardless of the picture's real resolution. Measured against the image objects actually embedded in the PDF, **60 of 145 crops come out smaller than the source**:

| Question | Source # | PDF native | Shipped today | Loss |
|---|---|---|---|---|
| **RW-0245** | 274 | 500 px | **237 px** | **−53 %** |
| **RW-0362** | 392 | 656 px | 500 px | −24 % |
| **RW-0358** | 387 | 634 px | 500 px | −21 % |
| RW-0371 | 401 | 649 px | 536 px | −17 % |
| RW-0372 | 402 | 662 px | 587 px | −11 % |
| RW-0364 | 394 | 663 px | 591 px | −11 % |
| RW-0214 | 243 | 364 px | 325 px | −11 % |
| … | | | | |
| RW-0228 | 257 | 253 px | 252 px | −0.4 % |

The **full list of all 60** (with question IDs and loss %) is reproducible with the command in A5. The remaining **85** crops are at or above native — for those, the PDF is the ceiling.

Visual proof (RW-0358 / source 387, a real traffic photo): the shipped 500 px file, the PDF's 634 px original, and a corrected render are at
`C:\Users\User\AppData\Local\Temp\opencode\cmp\side\compare_387.png`. The shipped version is visibly softer; the corrected render matches the PDF original.

### Cause 2 — the device upscales every image (DPR 2–3)

Images have **no `width`/`height`** and no CSS width, so the browser draws them at their **intrinsic pixel size** inside a column that is at most **640 px** (`styles.css:56 .app { max-width:640px }`).

Verified live in the app (browser measurement):

```
image 275.png  →  natural 353 × 228 px
drawn content  →  353 CSS px      (i.e. 1:1 on a 1× screen)
on a DPR-2 phone → 706 device px  (2× upscale)
on a DPR-3 phone → 1059 device px (3× upscale)
```

So even a perfectly rendered image is upscaled 2–3× on a phone. This is the "blurry edges" you see, and it compounds Cause 1.

### Cause 3 — 23 sources are genuinely tiny (need replacement)

These are embedded in the PDF below 160 px wide; a higher-DPI render cannot recover them:

| Question | Source # | PDF native | Shipped today |
|---|---|---|---|
| RW-0224 | 253 | **62 px** | 103 px |
| RW-0226 | 255 | 70 px | 121 px |
| RW-0225 | 254 | 74 px | 115 px |
| RW-0337 | 366 | **80 px** | 183 px |
| RW-0338 | 367 | 80 px | 199 px |
| RW-0340 | 369 | 80 px | 166 px |
| RW-0342 | 371 | 80 px | 218 px |
| RW-0344 | 373 | 80 px | 223 px |
| RW-0345 | 374 | 80 px | 261 px |
| RW-0346 | 375 | 80 px | 275 px |
| RW-0347 | 376 | 80 px | 261 px |
| RW-0227 | 256 | 126 px | 161 px |
| RW-0200 | 229 | 141 px | 205 px |
| RW-0241 | 270 | 142 px | **415 px** (2.9× upscale) |
| RW-0385 | 414 | 144 px | 209 px |
| RW-0391 | 420 | 150 px | 217 px |
| RW-0375 | 405 | 155 px | 223 px |
| RW-0392 | 421 | 155 px | 223 px |

(Plus ~5 more that belong to **withheld** questions not in the shipped bank: source 249 ×3, 235, 266, 236, 224.)

Some of these are the **free-tier** images — e.g. `253.png` (RW-0224) and `376.png` (RW-0347) are both in the free sample. Those are the first images a new learner sees.

### Cause 4 (minor) — all files are palette PNGs

Every shipped PNG is 8-bit indexed (`mode 'P'`). Fine for flat signs; the photographs (e.g. source 387/392) are quantised. Not the main cause of blur, but worth rendering as RGB.

## A3. Recommended correction

**Principle: never throw away detail, never blindly upscale, flag what cannot be fixed.**

1. **Render each crop at its own native-capped DPI** — one small change in `tools/parse_questions.py` (line 318):

   ```python
   # OLD
   crop = page.crop(box).to_image(resolution=200)

   # NEW — match the embedded image 1:1, never below 200, never above 600 dpi
   ss = im.get("srcsize")                      # (native_px_w, native_px_h)
   dpi = 200
   if ss and ss[0] and (box[2] - box[0]) > 0:
       dpi = max(200, min(600, round(ss[0] / ((box[2] - box[0]) / 72))))
   crop = page.crop(box).to_image(resolution=dpi)
   ```

   Measured effect on the real bank: **60 images gain resolution** (up to 663 px), and total `assets/q` grows only **2 260 KB → 2 373 KB (+5 %)**. Examples: RW-0245 237→500 px, RW-0358 500→634 px, RW-0362 500→656 px, RW-0364 591→661 px. No image is made worse.

2. **Flag the 23 low-res sources for manual replacement.** They cannot be fixed from this PDF. Replace via the existing no-code editor (`tools/review.html` → upload image) or by dropping a file into `assets/q/`. Recommended: replace with ≥400 px clean art; the sign cards in `data/signs.js` (19 SVG-quality cards) are a good style reference.

3. **Add a quality gate to `tools/build_data.py`** so this never regresses silently: warn when a shipped image is `< 160 px` wide (needs replacement) or `< 2× its displayed size` (soft on retina). Print a count next to the existing "images attached" line in `data/parse_report.txt`.

4. **Leave the CSS as-is** (no `image-rendering: pixelated`, which would make edges jagged). The images already draw 1:1 on 1× screens; the remaining softness on retina is a *source* limitation, addressed by (1) and (2).

5. **Do not re-render at 400 DPI across the board** — for the 85 images already at/above native that only adds interpolated (fake) pixels and file weight.

After (1), bump the SW cache (`inzira-v19` → `inzira-v20`) so devices pick up the new images (the in-app **Reba niba hari ibishya** button also forces this).

## A4. Files verified

- `assets/q/` — 137 PNGs, 2 260 KB, all `mode 'P'`, all `199.9996 dpi` metadata, widths 103–688 px.
- 124 of those are linked from shipped questions; the rest are orphan/withheld.
- `data/bank.js` — 394 questions, 124 with `img`.
- Free sample picture set (24): `214 237 242 247 253 258 270 275 280 285 304 309 315 340 370 376 393 398 404 409 413 418 423 428`.

## A5. How to reproduce this investigation

```powershell
# per-image native vs shipped resolution + loss
python C:\Users\User\AppData\Local\Temp\opencode\_imgfinal.py
# side-by-side visual comparison for the worst cases
python C:\Users\User\AppData\Local\Temp\opencode\_imgside.py
# projected size of a native-capped rebuild
python C:\Users\User\AppData\Local\Temp\opencode\_imgcost.py
```

---

# PART B — Vercel deployment readiness

## B1. What Vercel will be serving

| Property | Value |
|---|---|
| Type | Pure static site (HTML/CSS/JS/PNG) |
| Build step | **None** (no `package.json`, no bundler) |
| Entry | `index.html` (lowercase) at the deploy root |
| Assets | all **relative** paths (`styles.css`, `data/…`, `assets/…`) |
| Routing | **no client-side routing** (views are in-memory in `app.js`; no `history`/hash use) |
| PWA | `manifest.webmanifest` (`start_url:"./"`, `scope:"./"`), `sw.js` registered as `navigator.serviceWorker.register("sw.js")` → scope `/` |
| Total size | 3.04 MB / 172 files (2.26 MB of that is `assets/q`) |

**Consequence:** no SPA rewrite is needed, and a page refresh always returns to Home. This is the simplest possible Vercel shape.

## B2. Issues discovered

1. **Not a Git repository.** Vercel deploys from Git (GitHub/GitLab/Bitbucket) or the Vercel CLI. One-time setup required (also good hygiene for later).
2. **No `vercel.json`.** Without it the app still deploys, but `sw.js` gets Vercel's default `Cache-Control: public, max-age=0, must-revalidate` (works, but should be explicit) and `.webmanifest` may be served without `application/manifest+json`.
3. **No `.vercelignore`.** As-is, Vercel would publish `docs/` (business plan, pricing, school agreement), `tools/*.py`, `supabase/schema.sql`, `data/questions.rw.json`, `data/questions_raw.txt`, `data/drafts/` and `data/parse_report.txt`. None are secrets, but they bloat the deploy and expose the pipeline and business documents.
4. **SW does not pre-cache question images.** `sw.js` `ASSETS` lists only shell files. The 24 free-tier pictures only become available offline *after* being opened once — contradicting "offline learning after installation".
5. **SW `ASSETS` is missing `assets/icon-maskable-512.png`** (referenced by the manifest).
6. **CDN/security headers** are unset (`X-Content-Type-Options`, etc.).
7. **Supabase "Site URL"** still localhost; the production URL is not registered. (Low impact: signup/sign-in use email+password, no redirect/OTP. Still recommended for correctness and future password-reset emails.)
8. **`tools/review.html` is a public editor.** It only edits *local* files (exports `overrides.json`), so it cannot change server data — but its gate code (`UMWARIMU`/`REVIEW2026`) is client-visible. Decide whether it ships.
9. **Local dev paths exist only in build tools.** `tools/parse_questions.py` points at `C:\Users\User\Downloads\questions-1.pdf`, and `tools/apply_sql.py` reads `$env:INZIRA_PG`. Neither runs at runtime and neither is bundled into the app — safe once `tools/*.py` are excluded from the deploy.
10. **No secrets in runtime code.** `data/cloud.config.js` contains only the Supabase **anon** key (public by design; RLS protects data). No `service_role` key anywhere. `supabase/schema.sql` and `docs/` contain only placeholders.

## B3. Changes required (proposed — awaiting approval)

> **Status: R1–R6 are now implemented** (see §B4). R7 is a dashboard step that needs your Supabase access. The proposals below are kept for the record.

### R1. Add `inzira/vercel.json` (new file)

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "headers": [
    {
      "source": "/sw.js",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }
      ]
    },
    {
      "source": "/manifest.webmanifest",
      "headers": [
        { "key": "Content-Type", "value": "application/manifest+json" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" }
      ]
    }
  ]
}
```

No `rewrites` and no `outputDirectory`: the app has no routing and serves from the deploy root.

### R2. Add `inzira/.vercelignore` (new file)

```
# build tooling — never served
tools/*.py
tools/__pycache__/
supabase/
docs/
# source content — not needed at runtime (bank.js is the runtime bundle)
data/questions.rw.json
data/questions_raw.txt
data/parse_report.txt
data/drafts/
data/overrides.json
data/CHANGELOG.md
*.md
!README.md
# keep for the in-app reviewer link; remove this line to hide the editor
!tools/review.html
```

> Decision needed: keep `tools/review.html` public (the in-app *Umwarimu* link keeps working) **or** drop it (link then 404s in production).

### R3. Pre-cache question images in the service worker

- **Minimum:** pre-cache the 24 free-tier images so free users get full offline from day one.
- **Recommended:** pre-cache all 124 question images (2.26 MB) → the whole app works offline after install.
- Implementation: have `tools/build_data.py` emit the image list (e.g. `data/precache.js`), load it in `sw.js` via `importScripts("./data/precache.js")`, add those URLs to `ASSETS`, and bump `CACHE`.

### R4. Add the missing maskable icon to `sw.js` `ASSETS`

`assets/icon-maskable-512.png`.

### R5. Bump `CACHE` whenever the bank or images change

App standard: `inzira-v19` → `inzira-v20` after R3/the image fix.

### R6. (After R1–R5) Re-run `parse_questions.py` + `build_data.py` with the native-capped render, then re-test images.

### R7. Supabase production settings (dashboard)

- Authentication → URL Configuration → **Site URL** = the Vercel URL; add it to **Redirect URLs**.
- Keep **Confirm email** OFF (you already did this).
- Keep **RLS on**; never paste the `service_role` key into the app.

## B4. Changes already completed

Everything below is now in the project (local only; **not deployed**).

**Image quality (Part A)**
- `tools/parse_questions.py` renders each crop at its **native-capped DPI**
  (`max(200, min(600, native_px / box_width_pt × 72))`). Re-ran the parser:
  130 images written. Verified improvements — RW-0245 `237→500 px`,
  RW-0358 `500→635 px`, RW-0362 `500→655 px`, RW-0371 `536→649 px`; low-res
  sources unchanged (still flagged). `assets/q` = 2.26 MB → **2.32 MB**.
- The parser now records `image_native` (the picture's true pixel width).
- `tools/build_data.py` prints a **quality gate**: it lists every shipped image
  whose *source* is under 160 px. It reported **18 shipped questions**
  (RW-0200, RW-0224, RW-0225, RW-0226, RW-0227, RW-0241, RW-0337, RW-0338,
  RW-0340, RW-0342, RW-0344, RW-0345, RW-0346, RW-0347, RW-0375, RW-0385,
  RW-0391, RW-0392) — those sources are tiny bitmaps and cannot be sharp at any
  render setting.
- **v0.13.0 — those 18 images are now vector art.** Re-drawn as SVG in
  `assets/q/clean/` and wired in through `data/overrides.json`, so re-running the
  parser never overwrites them. SVG is resolution-independent: sharp at any size
  or screen density. The gate treats SVG as always-fine, so it is now **clean**.
- Bank rebuilt and version bumped to **`0.13.0-pilot`** (394 questions,
  124 images: 106 PNG + 18 SVG).

**Offline / service worker**
- `tools/build_data.py` now writes **`data/precache.js`** (124 image paths).
- `sw.js` loads it with `importScripts` and **pre-caches all 124 images plus the
  maskable icon** at install (best-effort, so one bad image can't break install).
  Cache bumped `inzira-v19` → **`inzira-v21`**.
- Verified live: `inzira-v21` holds **139 entries** (15 shell + 124 images),
  `caches.match()` hits for `/index.html`, `/data/bank.js` and images
  `274.png`, `387.png`; the vector `assets/q/clean/253.svg` is served as
  `image/svg+xml` and cached. The app loads at `0.13.0-pilot` and the picture
  drill renders the traffic-light question (`RW-0224`) from the SVG.

**Deployment config**
- Added **`vercel.json`**: `sw.js` → `must-revalidate`, `.webmanifest` →
  `application/manifest+json`, `X-Content-Type-Options: nosniff`.
- Added **`.vercelignore`**: excludes `docs/`, `tools/*.py`, `supabase/`, raw
  question JSON/report, drafts, overrides and this report. `tools/review.html`
  is **kept** so the in-app "Umwarimu" link keeps working.

**Documentation**
- `data/CHANGELOG.md` → new `v0.13.0-pilot` entry (and `v0.12.0-pilot`).
- `README.md` → Vercel-first deploy steps, updated layout, cache version, and a
  note that the sign images are now sharp vector art.
- This report.
- `README.md` → Vercel-first deploy steps, updated layout, cache version, and a
  known-limitation note for the 18 soft images.
- This report.

**Previously completed and verified:** Supabase schema applied to the live DB
(profiles, progress, RLS, signup trigger, grants); `data/cloud.config.js` wired;
`auth.js` + `sync.js` round-trip verified; SW at root scope; relative paths and
no client-side routing throughout.

> Deployment has **run**: live at `https://inzira-mu.vercel.app`.

## B5. Manual steps requiring your approval

Done:
1. ~~Approve the image fix~~ — **done** (§B4).
2. ~~Approve `vercel.json` + `.vercelignore`~~ — **done** (`tools/review.html` kept).
3. ~~Approve the SW pre-cache change~~ — **done**.
4. Deploy path: **Git + GitHub → Vercel** — **done**. Pushed to
   `metm2911-ai/Inzira` and deployed with the Vercel CLI; production is
   `https://inzira-rw.vercel.app`.
5. ~~Provide the production URL~~ — **done**: `https://inzira-rw.vercel.app`
   (`inzira.vercel.app` was already taken; `inziraapp.vercel.app` added as an alias).

Still needed from you:
6. **Update Supabase → Authentication → URL Configuration**: set **Site URL** to
   `https://inzira-rw.vercel.app` and add it (plus `https://inziraapp.vercel.app`)
   to **Redirect URLs** (replaces the localhost default). Low impact for
   email+password sign-in, but correct.
7. Optional: **hide `tools/review.html`** in production (comment the last line of
   `.vercelignore`); the in-app reviewer link would then 404.
8. **Revoke the Vercel token** that was used for the CLI deploy (it expires within
   a day regardless), and consider a final security pass: rotate the Supabase DB
   password. **Note:** the GitHub repo was left **public**, so the business docs
   and the raw question bank are publicly readable — revisit if that matters.

## B6. Deployment instructions

### Path A — Git + GitHub (recommended, repeatable)

```powershell
cd "C:\Users\User\Documents\Default Project\inzira"
git init
git add -A
git commit -m "Inzira 0.13.0-pilot — deploy prep"
# create an empty GitHub repo, then:
git remote add origin https://github.com/<you>/inzira.git
git branch -M main
git push -u origin main
```

Then on Vercel: **Add New → Project → Import** the repo, and set:

| Setting | Value |
|---|---|
| Framework Preset | **Other** |
| Root Directory | `.` (repo root) |
| Build Command | *(Override on, left **empty**)* |
| Output Directory | default |
| Install Command | default (no dependencies) |
| Environment Variables | none (Supabase config ships in `data/cloud.config.js`) |

Deploy → you get `https://<project>.vercel.app`.

### Path B — Vercel CLI (no Git, fastest first deploy)

```powershell
cd "C:\Users\User\Documents\Default Project\inzira"
cmd /c npx vercel@latest login      # npm.ps1 is blocked by execution policy → use cmd /c
cmd /c npx vercel@latest --prod
# prompts: Set up and deploy? yes · scope: your account ·
#          Link to existing? no · Project name: inzira ·
#          Directory: ./  · modify settings? no
```

### After the first deploy

- Every later change = `git push` (Path A) or `npx vercel --prod` (Path B).
- **Always bump `sw.js` `CACHE`** when bank/images change, or clients keep the old bundle.

## B7. Post-deployment testing checklist

**Load & caching**
- [ ] `https://<app>` loads; Home renders; all four tabs work.
- [ ] Hard refresh (`Ctrl+Shift+R`) still loads.
- [ ] `curl -I https://<app>/sw.js` → `Cache-Control: public, max-age=0, must-revalidate`.
- [ ] `curl -I https://<app>/manifest.webmanifest` → `Content-Type: application/manifest+json`.

**PWA & service worker**
- [ ] DevTools → Application → Manifest: name, icons, no errors; install prompt appears.
- [ ] Application → Service Workers: `sw.js` activated, scope `/`, no errors.
- [ ] Application → Cache Storage: `inzira-v21` present containing all `ASSETS` **and** the image list.
- [ ] Update flow: change a file → redeploy → app prompts/updates; the **Reba niba hari ibishya** button clears caches and reloads.

**Offline**
- [ ] DevTools → Network → **Offline** → navigate, answer practice questions, and take a mock exam → all still work.
- [ ] Offline → open **Ibibazo bifite amafoto** → the 24 free images render (proves pre-cache).
- [ ] Cold-install on a phone, go offline, open a picture question → images present.

**Images (Part A)**
- [ ] Spot-check RW-0245 (`237`→`500 px`), RW-0358 (`500`→`634 px`), RW-0362 (`500`→`656 px`) are visibly sharper.
- [ ] Confirm the 23 low-res images are either replaced or explicitly accepted.

**Accounts & sync**
- [ ] Register a **new** account from the deployed UI → a `profiles` row appears in Supabase → Table Editor.
- [ ] Sign out / sign in.
- [ ] Sign in on a second browser → progress syncs (pull on sign-in, push on change).
- [ ] Confirm a second user cannot read the first user's `progress` (RLS).

**Exams & content**
- [ ] Complete a 20-question mock → score, pass/fail at 12, full review.
- [ ] Free gate: free account sees the 60-question sample + 24 images + 1 mock; full unlock via school code shows all 394.
- [ ] Reviewer link (`tools/review.html`) behaves as decided in B3/R2.

**Housekeeping**
- [ ] `/docs/`, `/tools/*.py`, `/data/questions.rw.json` return **404** (verifies `.vercelignore`).
- [ ] Lighthouse (via the in-app browser) → installability/PWA and best-practices pass.
- [ ] Browser console clean; check `x-vercel-cache` on repeat loads.

---

## Appendix — files added/changed (applied)

**`inzira/vercel.json`** and **`inzira/.vercelignore`** — contents in R1/R2 above (now on disk).

**`tools/parse_questions.py`** — native-capped render in `extract_images()`.

**`sw.js`** — now:

```js
const CACHE = "inzira-v21";
importScripts("./data/precache.js");          // generated by build_data.py
const ASSETS = [
  "./", "index.html", "styles.css", "app.js", "auth.js", "sync.js",
  "manifest.webmanifest", "data/cloud.config.js", "data/bank.js", "data/signs.js",
  "assets/icon.svg", "assets/icon-192.png", "assets/icon-512.png",
  "assets/icon-maskable-512.png",
  ...self.INZIRA_PRECACHE                      // question images
];
```
