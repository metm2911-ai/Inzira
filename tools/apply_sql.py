"""Apply a .sql file to a Postgres database (e.g. Supabase).

The connection string is read from the environment so the password is never
stored in a file in this repo.

Usage (PowerShell):
    $env:INZIRA_PG = "postgresql://postgres.<ref>:<password>@<host>:5432/postgres"
    python tools/apply_sql.py supabase/schema.sql

Never put the database password in the app or commit it anywhere.
"""
import os
import sys
from pathlib import Path

import psycopg2


def main():
    dsn = os.environ.get("INZIRA_PG")
    if not dsn:
        print("error: set INZIRA_PG to your Postgres connection string first")
        return 2

    sql_path = Path(sys.argv[1] if len(sys.argv) > 1 else "supabase/schema.sql")
    if not sql_path.exists():
        print(f"error: {sql_path} not found")
        return 2
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
    finally:
        conn.close()

    print(f"applied: {sql_path}")
    print(f"public tables : {tables}")
    print(f"rls policies  : {policies}")
    print(f"signup trigger: {trigger or 'MISSING'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
