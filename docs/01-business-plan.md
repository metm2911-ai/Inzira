# Inzira — Business Plan (pilot edition)

**One line:** Inzira is the Kinyarwanda-first, offline driving-theory coach that gets learners to 12/20 — sold through driving schools, not ads.

**Status:** working product (PWA) + 257-question bank parsed from the official-style booklet. Pilot-ready.

---

## 1. The problem

Every year tens of thousands of Rwandans sit the provisional driving theory exam: **20 questions, 20 minutes, 12/20 to pass, RWF 5,000 per attempt**. Most study on free quiz websites that are:

- English-first, with Kinyarwanda as an afterthought
- a flat list of questions with no diagnosis of what you keep getting wrong
- online-only, so expensive on data and useless in low-coverage areas
- disconnected from the driving school the learner actually attends
- unable to tell a learner, a school, or a parent **"this person is ready"**

The result is predictable: repeat attempts, wasted fees, and schools that cannot prove their teaching works.

## 2. The wedge

Do not compete on "more questions". Compete on **certainty**.

| What free tools sell | What Inzira sells |
|---|---|
| A question bank | **A readiness score tied to the real pass mark** |
| English-first content | **Kinyarwanda-first**, with English and French UI |
| Random quizzes | **Adaptive drills on your weak topics** |
| A website | **Installable app that works with no data** |
| B2C only | **A school dashboard that proves pass rates** |

The product promise, in one sentence a learner can repeat:

> *"Inzira tells you when you are ready, and your school can see it too."*

## 3. Market

Estimates, to be replaced with real numbers during the pilot:

| Segment | Estimated size / year | Why it matters |
|---|---|---|
| First-time theory candidates (B, A, C, D) | 40,000–70,000 | Core B2C market |
| Repeat candidates | 20–35% of the above | Highest intent, highest willingness to pay |
| Registered driving schools | Several hundred nationwide | Distribution and B2B revenue |
| Moto taxi / cooperative drivers | Large, organised | Category A, fleet licences |
| Licence renewals & category upgrades | Ongoing | Recurring revenue after the exam |

Revenue at maturity (illustrative, not a forecast):

- 30,000 paying learners × RWF 2,500 = **RWF 75M / year**
- 150 schools × 200 seats × RWF 1,200 = **RWF 36M / year**
- White-label + fleet = **RWF 10–20M / year**

That is a healthy lean business (roughly USD 85–100k/year), not a venture-scale one. The exam is the **entry point**, not the ceiling — see §8.

## 4. Product

**Shipped now (v0.9 pilot):**

- Installable PWA, offline after first load, ~300 KB total
- 257 exam-style questions in Kinyarwanda, parsed from the official-style bank
- Exact exam simulator: 20 questions, 20 minutes, 12/20, no feedback until submit
- Practice mode by topic with a rule card after every answer
- 20 illustrated road signs with meanings in RW / EN / FR
- Readiness score, streak, per-topic accuracy, weak-topic detection
- Local progress storage (no account, no server, no data risk)
- School unlock codes

**Next (only after pilot evidence):**

1. Instructor-reviewed answer explanations for every question
2. Sign images extracted and matched to the picture-based questions (~74 currently held back)
3. English and French question translations
4. School dashboard (web): cohort progress, predicted pass rate, weak topics
5. MoMo / Airtel paywall
6. USSD/SMS companion for feature phones

**Deliberately not built yet:** accounts, social feed, gamified leaderboards, ads. They add cost and risk before the core promise is proven.

## 5. Business model

Five streams, in the order they should be switched on.

| # | Stream | Price | Who pays | When |
|---|---|---|---|---|
| 1 | **School seat licence** | RWF 1,000–1,500 / student (packs of 50) | Driving school | Pilot → month 3 |
| 2 | **B2C premium** | RWF 2,500 / 60 days | Individual learner | Month 3 |
| 3 | **Pass-guarantee pack** | RWF 4,000 | Nervous first-timers | Month 4, after pass data |
| 4 | **White-label** | RWF 300k–500k / year | Large schools, associations | Month 6 |
| 5 | **Fleet / cooperative** | RWF 500 / driver / month | Moto & transport co-ops | Month 6 |

**Why schools first:** they already own the students, they pay in bulk, and a higher pass rate is directly valuable to their reputation. One school deal = 50–300 users at once, at near-zero acquisition cost.

**Why the guarantee works later:** at an 85% pass rate, the guarantee costs about RWF 750 per claimant (15% × RWF 5,000 re-sit). At RWF 4,000 it is still profitable — and it converts a free-content market into a paid-outcome market. Terms must be tight: complete the course, sit within 60 days, show the result, one claim.

**Keep ads out of the core product.** They pay little in Rwanda and destroy the "trusted coach" positioning.

## 6. Unit economics (target)

| Metric | Target | Note |
|---|---|---|
| CAC via school | RWF 300–800 | Revenue share + onboarding time |
| CAC via WhatsApp/TikTok | RWF 1,500–3,000 | Content-led, slower |
| Blended ARPU | RWF 1,800 | Mix of seats and B2C |
| Gross margin | 85–90% | Content + hosting only |
| Payback | < 1 month | Seat licences are prepaid |
| School revenue share | 25–30% | Paid quarterly |

## 7. Go-to-market

**Phase 0 — validate (weeks 1–2).** 20 learner interviews, 5 schools, 2 instructors. Confirm price, language, and the exact moment they decide to book the exam.

**Phase 1 — pilot (weeks 3–8).** 2 schools, ~100 students. Half use Inzira, half do not. Measure pass rate, not satisfaction.

**Phase 2 — prove (weeks 9–12).** Publish the result. Sign 10 schools. Launch referral and the crash pack.

**Phase 3 — monetise (months 4–6).** Turn on B2C premium, then the guarantee, then white-label.

**Channels, in priority order:**

1. **Driving schools** — revenue share + co-branded QR code on the enrolment form
2. **Irembo / booking agents** — commission per activation; they meet learners at the highest-intent moment
3. **WhatsApp** — one free question a day, streaks, "tag a friend sitting the test"
4. **TikTok / Facebook** — 30-second sign and priority puzzles
5. **Moto cooperatives** — category A, organised, reachable through leaders
6. **Test-date crash pack** — RWF 1,000 for 48 hours, sold the day a slot is booked
7. **Telco USSD** — only after proof; slow to sign, huge reach

**Do not out-SEO the incumbents.** Out-distribute them through schools and WhatsApp, and out-promise them with readiness + guarantee.

## 8. Beyond the exam

The exam is a one-off purchase. The driver is a lifetime customer:

- Licence renewal and expiry reminders
- Vehicle inspection reminders
- Fine checks and payments
- Driving-school booking
- Defensive driving and fleet safety training
- Category upgrades (C, D, E)
- Expansion to Burundi, DRC and Uganda — same problem, same playbook

## 9. Moat

1. **Reviewed content** with a public changelog and a named instructor
2. **School relationships** that competitors cannot copy overnight
3. **Pass-rate data** — the only credible marketing asset in this market
4. **Offline performance** on cheap Android phones
5. **Kinyarwanda depth**, not translation as an afterthought

Code is not the moat. Content, trust and distribution are.

## 10. Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Free competitors copy features | High | Compete on trust, guarantee and school contracts, not features |
| Learners will not pay | Medium | Sell through schools; price below one re-sit |
| Schools demand exclusivity | Medium | Refuse exclusivity; offer co-branding instead |
| Content goes stale when rules change | Medium | Versioned content, instructor review, changelog |
| Claiming "official" status | High impact | Say "aligned with the official road code"; never "endorsed by RNP" without written permission |
| Data protection | Medium | Minimal data, local-first storage, register with RDB, follow Law No. 058/2021 |
| Founder bandwidth | High | Automate content pipeline; hire a part-time instructor reviewer |

## 11. What must be true to continue

Kill or pivot the plan if, after the pilot:

- Fewer than 50% of students complete 3+ mock exams, **or**
- The Inzira group's pass rate is not at least 10 points above control, **or**
- No school will sign a paid seat licence at RWF 1,000.

Those three numbers decide everything. Everything else is noise.
