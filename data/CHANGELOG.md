# Content changelog

## 2026-11-25 — v0.12.0-pilot
- **Sharper question images.** `tools/parse_questions.py` no longer renders every
  picture at a fixed 200 dpi — it now matches each image's own resolution
  (clamped to 200–600 dpi). 60 of 145 crops were previously *below* the PDF's
  resolution (up to −53 %, e.g. RW-0245 237 px → 500 px, RW-0358 500 → 635 px);
  total image size grew only 2.26 MB → 2.32 MB. Nothing was degraded.
- The parser now records each picture's native width (`image_native`), and
  `tools/build_data.py` prints a **quality gate** listing images whose source is
  under 160 px — these cannot be sharp and should be replaced (18 shipped
  questions, e.g. RW-0224/0225/0226 and the RW-0337…0347 set at 80 px).
- `tools/build_data.py` now also writes **`data/precache.js`** (the image list).
- **`sw.js` pre-caches all 124 question images** (and the maskable icon), so the
  whole bank works offline right after installation. Cache bumped to
  `inzira-v20`.
- Added **`vercel.json`** (service-worker cache header, manifest MIME type,
  `nosniff`) and **`.vercelignore`** (keeps `docs/`, build tools, raw JSON and
  drafts out of the public deployment) for the public launch.

## 2026-11-24 — v0.11.0-pilot
- **Live cloud backend.** The pilot Supabase project is wired up in
  `data/cloud.config.js`; accounts and progress now sync for real.
- Added `sync.js`: pulls progress on sign-in, merges it with local state
  (best-count per topic, union of seen/exams) and pushes changes (debounced).
- Added `supabase/schema.sql` (profiles, progress, RLS, signup trigger, and the
  role grants) and `tools/apply_sql.py` to apply SQL from the command line.
- Verified end to end against the real project: password sign-in, auto-created
  profile, progress push/pull round-trip, and RLS rejecting a cross-user write.
- Reminder for the pilot: **turn off "Confirm email"** in Auth settings so new
  sign-ups work without a mail server.

## 2026-11-23 — v0.10.0-pilot
- Added **accounts**: register / sign in / sign out / edit profile, with an
  account button in the top bar and a card in Settings. Identity is email **or**
  phone plus a password — no SMS, so no per-message cost.
- Two backends behind one API (`auth.js`): **local** (device-only, default, $0)
  and **cloud** (Supabase free tier), switched by `data/cloud.config.js`.
- Added a **free / full** plan: free = a 60-question spread that *includes 24
  picture questions* + the sign library + 1 mock exam; full = all 394 questions,
  full 124-question picture drill, unlimited mock exams. The school code remains
  the manual unlock.
- New **"Ibibazo bifite amafoto"** practice drill, and Settings now shows the
  content version, image count, and a **"Reba niba hari ibishya"** button that
  clears the offline cache — the cure for a device stuck on an old bundle.
- Fixed the practice picker showing full-bank counts to free users, and made the
  free sample carry pictures (the first 60 by number had none).
- Wrote `docs/08-accounts-and-sync.md` (Supabase setup + SQL).

## 2026-11-23 — v0.9.4-pilot
- Added an in-app entry point for the review page: **Settings → Umwarimu
  (reviewer)**, unlocked with a reviewer code (`UMWARIMU` / `REVIEW2026`), which
  then links to `tools/review.html`. Locked by default, so learners never see it.
- Fixed a JavaScript syntax error in the practice screen that a stale service
  worker cache had been hiding.
- Documented the in-app path and the reviewer codes in `docs/07`.

## 2026-11-23 — v0.9.3-pilot
- The review page can now **upload a sign picture** (max 3 MB) with a live
  preview. The image is embedded in `overrides.json` as a data URL.
- `tools/build_data.py` decodes embedded images and writes them to
  `assets/q/<id>.<ext>`, filling in the path automatically — so a reviewer
  never touches folders.
- Images can also be cleared from the review page.

## 2026-11-23 — v0.9.2-pilot
- Added an editing layer: `data/overrides.json` is applied after parsing, so
  human edits survive re-running the PDF parser.
- `tools/build_data.py` now supports patch / hide / add and per-question
  explanations (`e`), and can promote a previously unusable record once it is
  patched.
- Added `tools/review.html`, a point-and-click reviewer: pick a question, fix
  text/options/answer, hide it, or add new ones, then export `overrides.json`.
- Wrote `docs/07-content-editing.md`.
- Fixed the service worker so it only serves the app shell for the app's own
  navigations (it was swallowing `tools/review.html`).
- App now renders per-question explanations when present, else the topic guide.

## 2026-11-23 — v0.9.1-pilot
- Rewrote the PDF parser to read character font **and colour** through pdfplumber.
  The source marks the correct answer in red, in bold, and/or with parentheses;
  the earlier text-only pass saw only the parentheses and so missed most keys.
- Fixed page-break handling (questions are parsed as one continuous stream) and
  rebuilt spaces that pdfplumber drops between glyphs.
- Option letters in the source are unreliable (a repeated, b skipped). Options are
  now taken in document order and re-lettered a–d.
- Extracted 130 sign images from the PDF and attached them to their questions.
- Runtime bank now includes the image for picture questions and the app renders it.
- Result: **394 verified questions, 124 with sign images**, up from 257.
- Coverage: the PDF holds 397 numbered items, so 394/397 (99.2 %) are usable.

### Still open
- 5 questions (224, 235, 236, 249, 266): the answer choices are pictures, not text.
  They need an "image answer" feature to ship.
- 1 question (390): the source prints no answer key; needs an instructor decision.
- Instructor review of answer keys and Kinyarwanda wording not yet done.

## 2026-11-21 — v0.9.0-pilot
- Parsed `questions-1.pdf` (113 pages, 433 numbered items) into 407 records.
- Status: 257 verified, 74 needs image, 42 needs answer key, 29 bad options, 5 duplicates.
- Built the runtime bundle (`data/bank.js`) from verified records only.
- Wrote 20 original SVG teaching signs with RW/EN/FR text.
- Shipped exam simulator, topic practice, readiness score, school codes.

### Open items
- Items 324–386: no answer key in the source; needs manual keying.
- 74 picture questions: extract and match sign images.
- 29 records with merged options: retype from the PDF.
- Full instructor review not yet done.
