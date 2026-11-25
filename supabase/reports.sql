-- Inzira · per-school cohort report
-- Run in: Supabase dashboard > SQL Editor > New query > Run.
-- (The SQL Editor runs as the table owner and bypasses RLS, so it can read every
--  learner's row. The app itself can never do this.)
--
-- This is the "monthly report" schools pay for. Export the result as CSV with the
-- "Download CSV" button in the results panel.
--
-- "Seats used" counts accounts that have been attributed to a school. Learners who
-- unlocked with a code but never made an account are NOT counted (they have no row).

-- ---------------------------------------------------------------- 1. Summary
with attributed as (
  select p.id,
         p.school_code,
         p.plan,
         coalesce(pr.data, '{}'::jsonb) as data
  from public.profiles p
  left join public.progress pr on pr.user_id = p.id
  where p.school_code is not null
),
per_student as (
  select school_code,
         id,
         jsonb_array_length(coalesce(data->'exams', '[]'::jsonb)) as mocks,
         coalesce((data->>'answered')::int, 0) as answered,
         coalesce((data->>'correct')::int, 0)  as correct,
         (select avg((e->>'score')::numeric / nullif((e->>'total')::numeric, 0))
            from jsonb_array_elements(coalesce(data->'exams', '[]'::jsonb)) e) as avg_pct
  from attributed
)
select school_code,
       count(*)                                              as seats_used,
       sum(mocks)                                            as mocks_taken,
       round(avg(mocks), 1)                                  as avg_mocks_per_student,
       count(*) filter (where mocks >= 3)                    as students_3plus_mocks,
       round(100 * avg(avg_pct))                             as avg_mock_score_pct,
       count(*) filter (where avg_pct >= 0.60)               as predicted_ready,
       round(100 * sum(correct) / nullif(sum(answered), 0))  as practice_accuracy_pct
from per_student
group by school_code
order by seats_used desc;

-- ---------------------------------------------------------------- 2. Weak topics
-- The topics each school's cohort is weakest at (accuracy < 70%), for teaching.
select p.school_code,
       kv.key                                            as topic,
       sum((kv.value->>'seen')::int)                     as seen,
       sum((kv.value->>'correct')::int)                  as correct,
       round(100.0 * sum((kv.value->>'correct')::int)
             / nullif(sum((kv.value->>'seen')::int), 0)) as accuracy_pct
from public.profiles p
join public.progress pr on pr.user_id = p.id
cross join lateral jsonb_each(coalesce(pr.data->'topics', '{}'::jsonb)) kv
where p.school_code is not null
group by p.school_code, kv.key
having sum((kv.value->>'seen')::int) >= 5
   and round(100.0 * sum((kv.value->>'correct')::int)
             / nullif(sum((kv.value->>'seen')::int), 0)) < 70
order by p.school_code, accuracy_pct asc;

-- ---------------------------------------------------------------- 3. Roster
-- Who is enrolled under each school (for seat reconciliation / contacting them).
select p.school_code,
       coalesce(nullif(p.name, ''), u.email, p.phone) as learner,
       p.plan,
       p.created_at
from public.profiles p
join auth.users u on u.id = p.id
where p.school_code is not null
order by p.school_code, p.created_at desc;

-- ---------------------------------------------------------------- 4. Seat quota check
-- Compare seats used against the allocation in data/schools.js (kept here as a
-- literal list so the query is self-contained; update when the registry changes).
with quota (school_code, school_name, seats) as (
  values ('INZIRA2026', 'Inzira pilot', 300),
         ('KIGALI01',   'Kigali (pilot school)', 100)
)
select q.school_code, q.school_name, q.seats,
       count(p.id)                                   as seats_used,
       greatest(q.seats - count(p.id), 0)            as seats_left,
       case when count(p.id) >= q.seats then 'OVER' else 'ok' end as status
from quota q
left join public.profiles p on p.school_code = q.school_code
group by q.school_code, q.school_name, q.seats
order by q.school_code;
