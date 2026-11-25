# Editing and adding questions

Two ways to change content, both of which keep the app and the source PDF
untouched.

## 0. Opening the review page

**From inside the app** (what a school will do):

1. Open Inzira → **Igenamiterere** (Settings).
2. Find the **Umwarimu (reviewer)** card.
3. Type the reviewer code and tap **Fungura**. The default codes are
   `UMWARIMU` and `REVIEW2026` (change them in `app.js` → `REVIEWER_CODES`
   before any public launch).
4. The card then shows **Fungura ikibaho cy'umwarimu** — tap it to open the
   review page in a new tab. The unlock is remembered on that device.

The reviewer card is only an entry point; it never exposes learner data. If you
would rather the tool not ship publicly at all, delete the `tools/` folder from
the deployed copy — the app keeps working without it.

**Directly**, for a developer:

```powershell
cd inzira
python -m http.server 4173
# open http://127.0.0.1:4173/tools/review.html
```

## 1. For a teacher / non-technical reviewer — `tools/review.html`

With the page open, pick a question on the left. You can:

   - fix the question text or any option;
   - choose the correct answer (the radio button next to the option);
   - set the topic and an explanation;
   - **add or replace the picture**: click *Choose file* and pick an image
     from your computer. It is embedded in `overrides.json` and written into
     `assets/q/` when you rebuild, so you never touch folders;
   - **hide** a question you do not trust;
   - **add** a brand-new question.
4. Click **Pakurura overrides.json** when done and save the downloaded file to
   `inzira/data/overrides.json` (replace the existing one).
5. Rebuild the app bundle:
   ```powershell
   python tools/build_data.py
   ```

The filter **"Bikeneye kwitabwaho" (attention)** lists exactly the items that
need a human: the 1 question without an answer key, the 5 whose answer choices
are pictures, and any duplicates.

## 2. For a developer — `data/overrides.json` by hand

`data/overrides.json` is applied *after* the PDF is parsed, so re-running
`tools/parse_questions.py` never wipes human edits.

```jsonc
{
  "patch": {
    "RW-0360": { "answer": "b", "explanation": "mutagenzura…" },
    "RW-0196": {
      "question": "corrected wording",
      "options": ["a", "b", "c", "d"],
      "answer": "a",
      "topic": "signs",
      "image": "assets/q/224.png"
    }
  },
  "hide": ["RW-0237"],
  "add": [
    {
      "id": "NEW-001",
      "topic": "signs",
      "question": "…",
      "options": ["…", "…", "…", "…"],
      "answer": 0,
      "image": "assets/q/900.png",
      "explanation": "…"
    }
  ]
}
```

- `patch` — edit an existing question by its id (`RW-####`). Any subset of
  `question`, `options`, `answer`, `topic`, `image`, `imageData`, `explanation`.
  `answer` is the correct option letter.
- `hide` — ids to drop from the app.
- `add` — new questions. `answer` is a 0-based index (or a letter).

### Images

- `image` is a path (e.g. `assets/q/224.png`); `""` removes the picture.
- `imageData` is an uploaded image as a data URL. On build it is decoded and
  written to `assets/q/<id>.<ext>`, and the path is filled in automatically.
  The review page produces this for you when you use *Choose file*.

## Pipeline overview

```
questions-1.pdf
   │  tools/parse_questions.py     (font + colour aware, extracts sign images)
   ▼
data/questions.rw.json             (machined bank + status + images)
   │  tools/build_data.py          (applies data/overrides.json)
   ▼
data/bank.js                       (what app.js reads: window.INZIRA_BANK)
```

To add questions from a **new PDF** instead of by hand:

1. Point `tools/parse_questions.py` at the new file.
2. Also save any new sign images into `assets/q/` (named `<source_number>.png`).
3. Run both scripts. New records appear in `questions.rw.json`; anything a
   reviewer already fixed via `overrides.json` stays fixed.

## A note on ids

Ids follow the source numbering (`RW-0001`…). Because the PDF prints a few
numbers twice, a handful of records share a `source_number` but still have
unique ids. Always key overrides on the id, never the number.
