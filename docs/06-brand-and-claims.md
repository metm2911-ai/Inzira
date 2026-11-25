# Brand, claims and compliance

This page exists to stop the two mistakes that kill edtech products in Rwanda: **overclaiming** and **ignoring data law**.

## 1. Name and mark

- Working name: **Inzira** (Kinyarwanda: "the road / the path").
- Before spending on brand: search the RDB business register and the Rwandan trademark register for conflicts.
- Register the business name and, once revenue starts, the trademark (Nice classes 9, 41, 42).
- The mark is a yellow rounded square with a blue upward arrow. Files: `assets/icon.svg`, PNG exports.

## 2. Claims you may make

| Safe | Unsafe |
|---|---|
| "Aligned with the official road code" | "Official" |
| "Exam-style questions" | "The real exam questions" |
| "Reviewed by a licensed driving instructor" | "Approved by RNP" |
| "Used by [school name] students" (with permission) | "Recommended by the Government" |
| "Our pilot students passed at X%" (with data) | "Guaranteed pass" (without terms) |

**Never** use the RNP name, logo, or colours in a way that suggests endorsement. If you want to say "endorsed", get it in writing first. Until then, put this line in the app and on every poster:

> *Inzira ni igikoresho cyigenga. Ntabwo yemewe na Polisi y'Igihugu (RNP).*
> *Inzira is an independent study aid. It is not endorsed by the Rwanda National Police.*

It is already in Settings → About. Keep it there.

## 3. The pass guarantee

A guarantee is a marketing asset **and** a legal obligation. Before selling one:

- Publish the full terms on the same page as the price.
- Make the conditions objective and checkable (number of mocks, minimum score, exam within 60 days, official result slip).
- Cap the payout at the re-sit fee (RWF 5,000).
- Keep a reserve equal to expected claims (at 15% claim rate, RWF 750 per sale).
- Honour every valid claim fast. One public refusal destroys the whole positioning.

## 4. Data protection (Law No. 058/2021)

The pilot is deliberately local-first: progress stays in the browser, no account, no names. Keep it that way as long as possible.

When you add accounts or a school dashboard:

- [ ] Register as a data controller with the National Cyber Security Authority (NCSA).
- [ ] Publish a privacy notice in Kinyarwanda and English: what you collect, why, how long, who sees it.
- [ ] Collect the minimum: no national ID numbers, no exact location, no contacts unless needed.
- [ ] Get explicit consent before sharing a student's results with a school.
- [ ] Store data in the region where possible; document any transfer outside Rwanda.
- [ ] Define a deletion path: a learner can ask for deletion and get it within 30 days.
- [ ] Appoint a contact person for data requests.

## 5. Business registration and tax

- [ ] Register with RDB (sole proprietorship or Ltd).
- [ ] Get a TIN and a tax account with RRA.
- [ ] Understand VAT: registration is required above the turnover threshold; prices in `02-pricing.md` are VAT-exclusive.
- [ ] Issue EBM receipts for school sales from day one. Schools will ask.
- [ ] Keep a simple ledger: seats sold, cash collected, revenue share owed.

## 6. Payments

- MTN MoMo and Airtel Money are the default. Card penetration is low.
- Use a licensed PSP (e.g. a bank or aggregator with a merchant API). Do not collect money into a personal wallet at scale.
- Reconcile daily; refunds must be possible.
- Airtime billing and USSD need a telco agreement — treat as a later phase.

## 7. App distribution

- **PWA first.** No store fees, instant updates, works on cheap Android.
- Google Play later if install friction shows up in the funnel. Budget the USD 25 fee and the data-safety declaration.
- iOS is a small share of the segment; do not optimise for it early.

## 8. Content copyright

- The PDF bank was supplied by the founder. Before commercial launch, confirm the right to republish it, or rewrite the questions in your own words with an instructor. A reworded, reviewed bank is safer and becomes your IP.
- Do not scrape competitor apps.
- Sign image SVGs in `data/signs.js` are original teaching illustrations, not reproductions of the official sign artwork.
