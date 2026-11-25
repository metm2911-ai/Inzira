# Inzira

**Live app:** https://menyamategeko.vercel.app  ·  also `menyaamategeko.vercel.app`

Kinyarwanda-first, offline driving-theory trainer for Rwanda's provisional licence exam.

- **20 questions · 20 minutes · 12/20 to pass** — same shape as the real test
- 394 exam-style questions parsed from the official-style bank (397 numbered items;
  the other 3 are picture-answer questions and one item with no answer key in the source)
- 124 of those questions show the actual sign from the source PDF, plus a
  dedicated "Ibibazo bifite amafoto" picture drill
- 20 illustrated road signs with meanings in Kinyarwanda, English and French
- Readiness score, weak-topic drills, streaks, per-topic accuracy
- Installable PWA, works fully offline after install (~2.5 MB including every sign
  image; the app shell itself is ~300 KB)
- Optional accounts (email or phone + password, no SMS) — study offline for free,
  sign in to sync progress and unlock the full bank/mock exams
- No tracking third parties; progress stays on the device until you sign in

> Inzira is an independent study aid. It is **not** endorsed by the Rwanda National Police (RNP).

---

## Run it

No build step. Any static server works:

```powershell
cd inzira
python -m http.server 4173
```

Open http://127.0.0.1:4173.

> Opening `index.html` directly with `file://` works for a quick look, but the service worker and install prompt need `http://` or `https://`.

## Deploy it

The app is pure static files — no build step, no dependencies.

**Vercel (recommended)**

1. Push the `inzira` folder to a GitHub repo (`git init && git add -A && git commit -m "Inzira"`, then push).
   Or deploy straight from the CLI: `npx vercel --prod` inside `inzira/`.
2. On Vercel → **Add New → Project → Import** the repo, and set:
   - Framework Preset: **Other**
   - Root Directory: `.` (or `inzira` if you deployed the whole workspace)
   - Build Command: **empty** (no build), Output Directory: default
3. `vercel.json` (cache headers for `sw.js`, manifest MIME type) and
   `.vercelignore` (keeps `docs/`, build tools and raw JSON off the public site)
   are already in the folder and are picked up automatically.

Other static hosts (**Cloudflare Pages**, **Netlify**, **GitHub Pages**) also work
— no build command, output = the `inzira` folder.

After deploying, bump `CACHE` in `sw.js` (currently `inzira-v21`) whenever you
change files or the question bank, so installed users get the update. The in-app
Settings button **Reba niba hari ibishya** forces a refresh too.

## Accounts, plans and the database

The app runs **local-first**: no account is needed to study, and progress is
stored on the device. Signing in adds cross-device sync and the full unlock.

- **Local mode (default, $0):** accounts and progress live in `localStorage`.
  Nothing leaves the phone. Good for a single-device pilot.
- **Cloud mode (Supabase free tier, $0 to start):** paste your project URL and
  anon key into `data/cloud.config.js` to switch on real accounts + sync. No
  credit card required. Full setup and the SQL are in
  [docs/08-accounts-and-sync.md](docs/08-accounts-and-sync.md).

**Plans:** *free* = a 60-question spread that includes 24 picture questions, the
sign library and one mock exam. *full* = all 394 questions, the full picture
drill and unlimited mock exams. The **school code** (below) is the manual
unlock until Mobile Money is wired up.

Identity is email **or** phone plus a password — never SMS, so there is no
per-message cost.

## Editing or adding questions

Content is editable without touching the app code, and human edits survive
re-parsing the PDF.

**From the app:** open **Settings → Umwarimu (reviewer)**, enter a reviewer code
(`UMWARIMU` or `REVIEW2026`), then tap **Fungura ikibaho cy'umwarimu**. This
opens `tools/review.html` — locked behind the code so learners never see it.

**Directly:**

```powershell
python -m http.server 4173
# then open http://127.0.0.1:4173/tools/review.html
```

Pick a question, fix its text / options / correct answer, add or replace its
picture (upload from your computer — no folders needed), hide it, or add a new
one, then **download `overrides.json`** into `data/` and run:

```powershell
python tools/build_data.py
```

See [docs/07-content-editing.md](docs/07-content-editing.md) for the full
`overrides.json` format and the content pipeline.

## Project layout

```
inzira/
├─ index.html            app shell
├─ styles.css            design system, light + dark
├─ app.js                all app logic (vanilla JS, no dependencies)
├─ auth.js               accounts: local + Supabase behind one API
├─ sync.js               progress pull/push/merge
├─ manifest.webmanifest  PWA metadata
├─ sw.js                 offline cache (pre-caches all 124 question images)
├─ vercel.json           Vercel headers (sw.js cache, manifest MIME type)
├─ .vercelignore         keeps docs/, build tools and raw JSON off the public site
├─ assets/               icons
├─ data/
│  ├─ cloud.config.js    add Supabase url + anon key to switch on cloud accounts
│  ├─ bank.js            generated question bundle (do not edit)
│  ├─ precache.js        generated image list for the service worker (do not edit)
│  ├─ overrides.json     human edits: patch / hide / add (see docs/07)
│  ├─ signs.js           sign library (SVG + RW/EN/FR text)
│  ├─ questions.rw.json  full parsed bank with review status
│  ├─ questions_raw.txt  raw PDF text (reference)
│  └─ parse_report.txt   parser summary
├─ assets/q/             sign images extracted from the PDF
├─ tools/
│  ├─ parse_questions.py PDF → JSON (font + colour aware, native-resolution images)
│  ├─ build_data.py      JSON + overrides.json → bank.js + precache.js
│  ├─ review.html        point-and-click reviewer for teachers
│  └─ make_icons.py      PWA icons
└─ docs/
   ├─ 01-business-plan.md
   ├─ 02-pricing.md
   ├─ 03-school-pilot-agreement.md
   ├─ 04-launch-checklist.md
   ├─ 05-content-review.md
   ├─ 06-brand-and-claims.md
   ├─ 07-content-editing.md
   └─ 08-accounts-and-sync.md
```

## Update the question bank

1. Edit `data/questions.rw.json` (or add `data/overrides.json` — see `docs/05-content-review.md`).
2. Rebuild:

```powershell
python tools\parse_questions.py   # only if the source PDF changed (re-extracts images)
python tools\build_data.py        # regenerate data/bank.js + data/precache.js
```

The build prints a **quality gate**: any picture whose source is under 160 px
(too small to ever look sharp) is listed for replacement.

3. Bump the service-worker cache version (`inzira-v21` → `inzira-v22`) and reload twice.

Only records with `status: "verified"` reach the app. Everything else stays in the JSON for review.

## How scoring works

- Exam: 20 random questions, 20-minute timer, no feedback until submit, pass at 12/20.
- Readiness (0–100): weighted mix of your last five mock scores and overall practice accuracy, scaled by how much evidence exists. It is deliberately conservative — a new user starts at 0.
- Weak topics: topics with 3+ answers, sorted by accuracy.

## School codes (pilot)

Codes are in `app.js`:

```js
const SCHOOL_CODES = { "INZIRA2026": "Pilot", "KIGALI01": "Pilot" };
```

This is a pilot mechanism, not security. Replace it with server-side licence checks before you sell seats at scale.

## Known limitations

- Questions are Kinyarwanda only; English/French UI exists but question text does not.
- 6 records are held back: 5 picture-answer questions (their choices are images)
  and 1 with no answer key in the source — 394 of 397 ship.
- **Sign images are sharp.** The 18 study images that came from tiny bitmaps in
  the PDF (a 62 px traffic light, 80 px narrow-road signs, a 142 px warning
  triangle) are replaced with hand-drawn vector art in `assets/q/clean/`, wired in
  through `data/overrides.json`. They stay sharp at any size or screen density.
  Vector art is editable without code - see `docs/07-content-editing.md`.
- Explanations are topic-level rule cards, not per-question reasoning.
- The free/full split is enforced **client-side** in a static build, so a
  determined user can read the full bank. Real content gating needs the bank
  served from the server per entitlement.
- No Mobile Money yet — the school code is the manual unlock.
- Cloud sync needs a Supabase key in `data/cloud.config.js`; until then accounts
  and progress are device-only.

Each of these is a deliberate pilot trade-off, documented in `docs/05-content-review.md`
and `docs/08-accounts-and-sync.md`.

## License

Proprietary. All rights reserved until a licence is chosen.
