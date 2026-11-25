-- Inzira · Supabase schema
-- Paste this whole file into: Supabase dashboard > SQL Editor > New query > Run.
-- Safe to run more than once.

-- ---------------------------------------------------------------- profiles
-- One row per account. `plan` is the entitlement the app reads.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  phone text,
  plan text not null default 'free',        -- 'free' | 'full'
  school_code text,                         -- key from data/schools.js (nullable)
  created_at timestamptz default now()
);

-- Add the column on databases created before it existed (safe to re-run).
alter table public.profiles add column if not exists school_code text;

-- Speeds up the per-school cohort report (see supabase/reports.sql).
create index if not exists profiles_school_code_idx on public.profiles (school_code);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

-- Auto-create the profile row whenever someone signs up.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'phone', '')
  )
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------- progress
-- One row per account, holding a JSON copy of the learner's progress.
create table if not exists public.progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);
alter table public.progress enable row level security;

drop policy if exists "progress_select_own" on public.progress;
create policy "progress_select_own" on public.progress
  for select using (auth.uid() = user_id);

drop policy if exists "progress_write_own" on public.progress;
create policy "progress_write_own" on public.progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------- grants
-- Creating tables via SQL does not grant access to the API roles. RLS decides
-- *which rows*; these grants decide *whether the role may touch the table*.
-- Only "authenticated" is granted — anon (signed out) gets nothing.
grant usage on schema public to anon, authenticated;

grant select, insert, update on public.profiles to authenticated;
grant select, insert, update, delete on public.progress to authenticated;

-- Cover any future tables created in this schema.
alter default privileges in schema public
  grant select, insert, update, delete on tables to authenticated;

-- ---------------------------------------------------------------- helpers
-- Give a learner the full plan after they pay (run by you, by email):
--   update public.profiles set plan = 'full'
--   where id = (select id from auth.users where email = 'learner@example.com');
--
-- Inspect who is on what plan:
--   select p.plan, u.email, p.phone, p.created_at
--   from public.profiles p join auth.users u on u.id = p.id
--   order by p.created_at desc;
