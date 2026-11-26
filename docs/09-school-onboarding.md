# Onboarding a driving school — operator's guide

This is the practical checklist for signing up a driving school and getting its
students onto Inzira. Everything here is already built into the app.

---

## 1. How a school uses Inzira

| Role | What they do |
|---|---|
| **Student** | Opens the school's link/QR at enrolment → installs to the home screen → studies by topic offline → takes mock exams → sees a readiness score. |
| **Instructor** | Uses the reviewer code (Settings → "Umwarimu") to review answer keys; runs theory classes from the weak-topic drill; tells students when they are ready to book. |
| **Owner** | Buys seats, hands out the link, and reads the monthly cohort report (pass readiness, activity, weak topics). |

The school's payoff is **a higher theory pass rate** (reputation → more enrolments)
and students reaching the practical stage faster.

---

## 2. Two ways a student gets full access

### A. The school link / QR (recommended)
Every school has a code. This URL unlocks the full app the moment it is opened:

```
https://menyamategeko.vercel.app/?school=KIGALI01
```

- Put it on the enrolment form, a WhatsApp message, or a QR code.
- It works **offline** (the registry ships inside the app).
- The unlock follows the student's phone; no typing, no login required.

### B. Manual code
The same code can be typed at **Settings → "Kode y'ishuri" → Fungura**.

---

## 3. Add a school (one file, no code surgery)

Open **`data/schools.js`** and add an entry:

```js
window.INZIRA_SCHOOLS = {
  "INZIRA2026": { name: "Inzira pilot", seats: 300, expires: "2027-06-30", active: true },
  "KIGALI01":   { name: "Kigali (pilot school)", seats: 100, expires: "2027-06-30", active: true },
  "GS0007":     { name: "Gasabo Driving School", seats: 60, expires: "2027-03-31", active: true }
};
```

- `name` — shown in the app and in the report.
- `seats` — allocation, tracked in the report (see the limit below).
- `expires` — `"YYYY-MM-DD"`; on/after this date the code stops working.
- `active: false` — disables a school instantly without deleting its data.

Both are **enforced on the device at every launch**: an expired or disabled code
loses the unlock on its next start (paid `full` accounts are never affected), and
a code that is no longer in the registry is dropped.

Then: bump `CACHE` in `sw.js`, commit, and deploy. The new link works
immediately: `?school=GS0007`.

### Generate that school's QR
The promo tools already produce a QR. To encode a school link, point the QR at
`https://menyamategeko.vercel.app/?school=GS0007` instead of the bare URL
(ask the developer, or edit the `URL` constant in the QR generator).

---

## 4. Database migration (already applied — 2026-11-25)

The per-school report needs a `school_code` column on `profiles`. **This is
already applied to the live database** (column + index verified). For a fresh
database, it lives in `supabase/schema.sql`, or run just this in
**Supabase → SQL Editor**:

```sql
alter table public.profiles add column if not exists school_code text;
create index if not exists profiles_school_code_idx on public.profiles (school_code);
```

Or from a terminal, without ever putting the password in a file:

```powershell
python tools/apply_sql.py --prompt supabase/migrations/2026-11-25-school-code.sql
```

The app works without it (the school code still unlocks locally); the column is
only needed so the **report** can group learners by school.

---

## 5. The monthly report (what the school pays for)

Run **`supabase/reports.sql`** in the Supabase SQL Editor. Export with the
**Download CSV** button. It returns:

1. **Summary per school** — seats used, mocks taken, students with 3+ mocks,
   average mock score, predicted-ready count, practice accuracy.
2. **Weak topics** — where each cohort is under 70%, for the next lesson.
3. **Roster** — who is enrolled under each school (for seat reconciliation).
4. **Seat quota check** — used vs allocated, with an `OVER` flag.

> **Seat limit note:** seats are **counted, not hard-blocked** (the gate is
> client-side). The quota query warns you when a school is over its allocation.
> Real enforcement is a Phase-2 item.

---

## 6. Pricing (summary)

| Phase | Price | Seats | Notes |
|---|---|---|---|
| **Pilot** | **RWF 0** — 8 weeks | up to 100 | In exchange for pass-rate data + a testimonial. Cap at 2 schools. |
| **Starter** | **RWF 50,000** / 90 days | 50 (RWF 1,000/seat) | Entry pack. |
| **Standard** ⭐ | **RWF 120,000** / 6 months | 100 (RWF 1,200/seat) | + cohort report + co-branded QR. |
| **Partner** | **RWF 250,000** / 12 months | 200 (RWF 1,250/seat) | + white-label option. |
| **White-label** | RWF 150,000 setup + RWF 300–500k/yr | — | Later. |

Anchor: *"One re-sit costs RWF 5,000. This is RWF 1,000 per student — a fifth of
one re-sit — and you get a report showing who is ready."* Keep the **25% revenue
share** to the school and **50% on signature**.

---

## 7. Onboarding checklist (per school)

- [ ] Sign the pilot agreement (`docs/03-school-pilot-agreement.md`).
- [ ] Add the school to `data/schools.js`; deploy.
- [ ] Send the school its **link + QR** (and a co-branded flyer from `assets/promo/`).
- [ ] Give the instructor the **reviewer code** and a 1–2 hour walkthrough.
- [ ] Have students install the app at enrolment ("Add to Home screen").
- [ ] After 4–6 weeks, run `supabase/reports.sql` → send the CSV summary.
- [ ] Collect real pass/fail numbers for the case study.

> **Before any rollout:** the answer keys should be reviewed by a qualified
> instructor (Settings → "Umwarimu" → review page). A school will test the content
> in the first hour.
