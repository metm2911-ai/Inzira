/* Inzira cloud config.
 *
 * Leave url / anonKey empty to run in LOCAL mode: accounts and progress are
 * kept on the device only (works offline, zero cost, nothing to sign up for).
 *
 * To switch on real accounts + cross-device sync, create a free Supabase
 * project (https://supabase.com, no card required) and paste:
 *   url     -> Project Settings > API > Project URL      (https://xxxx.supabase.co)
 *   anonKey -> Project Settings > API > anon public key
 *
 * The anon key is meant to be public; row-level security protects the data.
 * See docs/08-accounts-and-sync.md for the SQL to create the tables.
 */
window.INZIRA_CLOUD = {
  url: "https://zmvxpatscxkvwymthkgc.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptdnhwYXRzY3hrdnd5bXRoa2djIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTU0NjU3MDgsImV4cCI6MjExMTA0MTcwOH0.HxD27wVpuUvSrT-6ObObB2FWMcDplRX_v5-C6Btbp_4",
  profilesTable: "profiles",
  progressTable: "progress"
};
