-- Inzira · per-school attribution (idempotent, additive, safe to re-run)
-- Adds the column + index the cohort report (supabase/reports.sql) needs.
-- Apply with:  python tools/apply_sql.py --prompt supabase/migrations/2026-11-25-school-code.sql
-- (paste the connection URI at the hidden prompt; or set $env:INZIRA_PG first)

alter table public.profiles add column if not exists school_code text;
create index if not exists profiles_school_code_idx on public.profiles (school_code);
