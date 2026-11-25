/* Inzira — school registry (edit THIS file to add or remove a school).
 *
 * Two ways a school uses it:
 *   1. AUTO-UNLOCK LINK:  https://menyamategeko.vercel.app/?school=KIGALI01
 *      Put that link (or its QR code) on the enrolment form. Tapping it unlocks
 *      the full app for that student — no typing.
 *   2. MANUAL CODE: the same code can be typed in Settings → "Kode y'ishuri".
 *
 * Fields:
 *   name    - shown in the app and used in the cohort report (supabase/reports.sql)
 *   seats   - allocated seats; tracked in the report (not hard-enforced yet)
 *   expires - "YYYY-MM-DD"; on/after this date the code stops unlocking
 *   active  - false disables a school instantly without deleting its history
 *
 * The code is the KEY, upper-case, no spaces. Keep it short and hard to guess.
 * Clear a school out by setting active:false (history in the DB is kept).
 */
window.INZIRA_SCHOOLS = {
  // Pilot / internal codes (match the original hard-coded ones).
  "INZIRA2026": { name: "Inzira pilot", seats: 300, expires: "2027-06-30", active: true },
  "KIGALI01":   { name: "Kigali (pilot school)", seats: 100, expires: "2027-06-30", active: true }

  // Add a real school like this (note the comma after the line above):
  // , "GS0007": { name: "Gasabo Driving School", seats: 60, expires: "2027-03-31", active: true }
};
