"""Apply a .sql file to a Postgres database (e.g. Supabase).

The connection string is read from the environment so the password is never
stored in a file in this repo.

Usage (PowerShell):
    $env:INZIRA_PG = "postgresql://postgres.<ref>:<password>@<host>:5432/postgres"
    python tools/apply_sql.py supabase/schema.sql

Or paste it at a hidden prompt (nothing lands in the shell history):
    python tools/apply_sql.py --prompt supabase/schema.sql

The prompt also accepts just the database password; the rest of the Supabase
pooler URI is built from the public project details below.

Never put the database password in the app or commit it anywhere.
"""
import getpass
import os
import sys
from pathlib import Path
from urllib.parse import quote

import psycopg2

# Public project details (the project ref already ships in data/cloud.config.js).
POOLER_HOST = "aws-0-eu-central-1.pooler.supabase.com"
DB_USER = "postgres.zmvxpatscxkvwymthkgc"
DB_NAME = "postgres"
DB_PORT = "5432"


def build_dsn(text):
    """Accept a full URI, or a bare password, and return a usable DSN."""
    text = (text or "").strip()
    if not text:
        return ""
    if "://" in text:
        return text
    # Bare password: percent-encode it and fill in the pooler details.
    return (
        f"postgresql://{DB_USER}:{quote(text, safe='')}"
        f"@{POOLER_HOST}:{DB_PORT}/{DB_NAME}"
    )


def mask(dsn):
    if "@" not in dsn or "://" not in dsn:
        return dsn
    scheme, rest = dsn.split("://", 1)
    creds, host = rest.split("@", 1)
    user = creds.split(":", 1)[0]
    return f"{scheme}://{user}:***@{host}"


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    prompt = "--prompt" in sys.argv
    dry_run = "--dry-run" in sys.argv

    dsn = os.environ.get("INZIRA_PG")
    if prompt:
        entered = getpass.getpass(
            "Paste the Postgres URI, or just the database password (hidden): "
        )
        dsn = build_dsn(entered)
    if not dsn:
        print("error: set INZIRA_PG to your Postgres connection string first")
        return 2

    sql_path = Path(args[0] if args else "supabase/schema.sql")
    if not sql_path.exists():
        print(f"error: {sql_path} not found")
        return 2

    if dry_run:
        print(f"target : {mask(dsn)}")
        print(f"file   : {sql_path}")
        return 0

    sql = sql_path.read_text(encoding="utf-8")

    conn = psycopg2.connect(dsn, sslmode="require")
    conn.autocommit = True
    try:
        with conn.cursor() as cur:
            cur.execute(sql)  # simple query protocol: multi-statement is fine
        with conn.cursor() as cur:
            cur.execute(
                "select table_name from information_schema.tables "
                "where table_schema = 'public' order by 1"
            )
            tables = [r[0] for r in cur.fetchall()]
            cur.execute(
                "select policyname from pg_policies where schemaname = 'public' order by 1"
            )
            policies = [r[0] for r in cur.fetchall()]
            cur.execute(
                "select tgname from pg_trigger where tgname = 'on_auth_user_created'"
            )
            trigger = [r[0] for r in cur.fetchall()]
            cur.execute(
                "select column_name from information_schema.columns "
                "where table_schema = 'public' and table_name = 'profiles' "
                "order by ordinal_position"
            )
            profile_cols = [r[0] for r in cur.fetchall()]
            cur.execute(
                "select indexname from pg_indexes "
                "where schemaname = 'public' and tablename = 'profiles' order by 1"
            )
            profile_idx = [r[0] for r in cur.fetchall()]
    finally:
        conn.close()

    print(f"applied: {sql_path}")
    print(f"public tables   : {tables}")
    print(f"profiles columns: {profile_cols}")
    print(f"profiles indexes: {profile_idx}")
    print(f"rls policies    : {policies}")
    print(f"signup trigger  : {trigger or 'MISSING'}")
    if "school_code" not in profile_cols:
        print("warning: school_code column still missing")
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
