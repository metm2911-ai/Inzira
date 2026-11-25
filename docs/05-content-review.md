# Content review guide

The question bank is the moat, so the review process matters more than the code.

## Where the content comes from

`C:\Users\User\Downloads\questions-1.pdf` — 113 pages, 433 numbered items, Kinyarwanda, with the correct option wrapped in parentheses, e.g. `(c)`.

The parser (`tools/parse_questions.py`) produced **407 records**. Their status:

| Status | Count | Meaning | Usable in the app? |
|---|---|---|---|
| `verified` | 257 | 4 options, exactly one marked answer, no picture needed | Yes |
| `needs_image` | 74 | Refers to a sign/picture that is not in the text | No (held back) |
| `needs_key` | 42 | No answer marked in the PDF (mostly items 324–386) | No |
| `bad_options` | 29 | Options merged by the PDF layout | No |
| `duplicate` | 5 | Same question appears twice | No |

Only `verified` records are shipped. The rest stay in `data/questions.rw.json` so nothing is lost.

## The three review passes

### Pass 1 — mechanical (no instructor needed)

Goal: recover as many `needs_key` and `bad_options` records as possible.

1. Open the PDF page for each record (the JSON keeps `source_number`).
2. For `needs_key`: find the correct option and add it to `data/overrides.json`.
3. For `bad_options`: retype the four options cleanly.
4. For `needs_image`: export the sign image, save it to `assets/signs/`, and set `image` in the override.

Override format:

```json
{
  "RW-0294": { "answer": "a" },
  "RW-0195": { "options": ["...", "...", "...", "..."], "answer": "b" },
  "RW-0229": { "image": "assets/signs/229.png", "answer": "c" }
}
```

Then rebuild:

```powershell
python tools\parse_questions.py
python tools\build_data.py
```

### Pass 2 — instructor review (the important one)

Sit with a licensed Rwandan driving instructor. For every question:

- Is the answer still correct under the current road code?
- Is the Kinyarwanda clear to a learner who left school early?
- Is any distractor ambiguous or arguably also correct?
- Does the question test a rule a driver actually needs, or trivia?

Record the decision in `data/overrides.json`:

```json
{ "RW-0031": { "review": "ok", "reviewer": "J. Mugisha", "date": "2026-11-24" } }
```

Anything not marked `ok` is excluded at build time. **Better to ship 180 solid questions than 257 shaky ones.**

### Pass 3 — exam-blueprint check

The real exam is 20 questions in 20 minutes. Confirm the bank can produce a realistic mix:

- signs and markings: 25–30%
- priority and junctions: 20%
- speed and distance: 15%
- lights and signals: 15%
- safety and behaviour: 20%
- documents and vehicle: 5–10%

Run:

```powershell
python tools\build_data.py
```

and check the topic counts it prints. If a topic is thin, the exam will feel wrong even when every question is correct.

## Acceptance criteria before a paid launch

- [ ] ≥ 200 questions with `review: "ok"`
- [ ] every topic has ≥ 15 reviewed questions
- [ ] no question has two defensible answers
- [ ] Kinyarwanda checked by a native speaker who is also a driver
- [ ] changelog entry with reviewer name and date
- [ ] disclaimer visible in Settings: independent, not RNP-endorsed

## Changelog

Keep `data/CHANGELOG.md`:

```
## 2026-11-24 — v0.9.1
- Reviewed 120 questions with J. Mugisha (Kigali)
- Fixed 6 answers, rewrote 11 confusing options
- Added 9 sign images
```

This is what you show a school when they ask "is this up to date?".

## Things that must never happen

- Copying another app's question bank (copyright + stale answers).
- Publishing a question you have not checked against the current booklet.
- Claiming the bank is "official" or "RNP-approved".
- Shipping a picture question without its picture.
