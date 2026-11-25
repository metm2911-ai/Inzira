# Accounts, database and sync

Inzira runs in one of two modes, chosen by `data/cloud.config.js`.

## Local mode (default, $0)

`url` and `anonKey` are empty. Accounts and sessions are kept **on the device
only** in `localStorage`:

- `inzira.users.v1` — the accounts (name, email, phone, salted SHA-256 password)
- `inzira.session.v1` — who is signed in on this device
- `inzira.v1` — study progress and settings

Nothing leaves the phone. Works offline. This is what ships today, and it is
enough to demo the flow and run a single-device pilot.

Limits: progress does not follow the learner to another phone, and a wiped
browser loses the account. That is why cloud mode exists.

## Cloud mode (Supabase free tier, $0 to start)

No credit card is required for the free tier: 500 MB Postgres, 50,000 monthly
active users, auth included.

1. Create a project at https://supabase.com.
2. **Project Settings → API** and copy the **Project URL** and the **anon
   public** key.
3. Paste them into `data/cloud.config.js`:

   ```js
   window.INZIRA_CLOUD = {
     url: "https://YOURPROJECT.supabase.co",
     anonKey: "eyJhbGciOi...",
     profilesTable: "profiles",
     progressTable: "progress"
   };
   ```

4. Run the SQL below in **SQL Editor**. Row-level security means the anon key is
   safe to ship publicly — each row is readable only by its owner.

   The SQL also lives in [`supabase/schema.sql`](../supabase/schema.sql) — paste
   the whole thing into the SQL editor and Run. Or apply it from your machine:

   ```powershell
   $env:INZIRA_PG = "postgresql://...:5432/postgres"   # from Project Settings > Database
   python tools/apply_sql.py supabase/schema.sql
   ```

   The connection string is a **master credential** — keep it out of the app and
   the repo, and rotate the database password if it is ever shared.

5. **Turn off email confirmation for the pilot.** Authentication → Sign In /
   Providers → Email → uncheck **"Confirm email"**. Without this a new account
   must click an email link before it can sign in, and you have no mail server.

   > Grants matter too: creating tables with SQL does **not** give the API roles
   > access. `schema.sql` ends with `grant ... to authenticated`, and RLS then
   > decides which rows. Without those grants every request fails with
   > `permission denied for table`.

### Identity: email or phone + password, never SMS

SMS one-time codes cost money per message (and Firebase charges for them), so
Inzira does **not** use them. A learner signs up with an email **and** a phone
number, and signs in with **either** plus a password. The phone is kept as
contact info so Mobile Money (MTN MoMo / Airtel Money) can be attached later.

> Supabase's built-in password grant is email-based. In cloud mode the email is
> the credential and the phone is stored in `user_metadata` / the `profiles`
> row. To also allow phone-as-credential you would either (a) add a mapping from
> phone → email at signup, or (b) turn on phone auth later once you have an SMS
> provider funded. Local mode already accepts either.

### SQL

```sql
-- One profile row per auth user.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  phone text,
  plan text not null default 'free',   -- 'free' | 'full'
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;

create policy "own profile read"   on public.profiles for select using (auth.uid() = id);
create policy "own profile write"  on public.profiles for insert with check (auth.uid() = id);
create policy "own profile update" on public.profiles for update using (auth.uid() = id);

-- One progress row per user (mirrors localStorage state).
create table if not exists public.progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);
alter table public.progress enable row level security;

create policy "own progress read"  on public.progress for select using (auth.uid() = user_id);
create policy "own progress write" on public.progress for all    using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Grant the "full" plan to a user after payment (run by you, by email):
-- update public.profiles set plan = 'full'
--   where id = (select id from auth.users where email = 'learner@example.com');
```

### Turning on the full plan

Today the **school code** in Settings is the manual unlock (`state.premium`).
With Supabase you flip a learner to `plan = 'full'` in the `profiles` row after
they pay. The app treats "full" as: all 394 questions, unlimited mock exams,
and cross-device sync.

## What is and is not gated

- **Free (no account needed):** study a 60-question spread that *includes 24
  picture questions*, the sign library, and one mock exam.
- **Full (account + payment / school code):** all 394 questions, the full
  124-question picture drill, and unlimited mock exams.
- **Soft gate warning:** in a static build the full bank is downloaded to the
  device, so a determined user can read it. Real content gating needs the
  question bank served from the server per entitlement — a later step, and the
  main reason to move content into the database.

## Verified

The pilot project was exercised end to end:

- password sign-in returns a session token
- the signup trigger auto-creates the matching `profiles` row
- a signed-in user reads only their own `profiles` / `progress` rows
- progress pushes on change and pulls on sign-in (round-trip confirmed in the
  Table Editor)
- a cross-user write was rejected by RLS (`new row violates row-level security policy`)

## The database also unlocks server-side editing

Once Supabase is on, `tools/review.html` can save edits to a `questions` table
instead of exporting `overrides.json` and rebuilding, and every app pulls the
current bank. That removes the export → drop-in → `build_data.py` loop and lets
several instructors review at once.
