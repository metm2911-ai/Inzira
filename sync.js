/* Inzira sync.
 *
 * Moves the learner's progress between the device and Supabase, and reads the
 * plan (free/full) from the profiles table. Everything is optional: with no
 * cloud key, or signed out, every call is a no-op and the app stays offline.
 *
 * Uses the Supabase REST (PostgREST) endpoints directly, so there is no SDK.
 */
(function () {
  const cfg = window.INZIRA_CLOUD || {};
  const cloudOn = !!(cfg.url && cfg.anonKey);
  const base = (cfg.url || "").replace(/\/$/, "");
  const PROGRESS = cfg.progressTable || "progress";
  const PROFILES = cfg.profilesTable || "profiles";

  function auth() { return window.INZIRA_AUTH; }
  function available() { return cloudOn && !!(auth() && auth().current()); }

  function headers(withAuth) {
    const h = { "apikey": cfg.anonKey, "Content-Type": "application/json" };
    const s = auth() && auth().session && auth().session();
    if (withAuth && s && s.accessToken) h["Authorization"] = "Bearer " + s.accessToken;
    return h;
  }
  async function api(path, opts) {
    const res = await fetch(base + path, opts);
    const text = await res.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch (e) { data = null; }
    if (!res.ok) throw new Error((data && (data.message || data.hint || data.error)) || ("HTTP " + res.status));
    return data;
  }
  function userId() {
    const s = auth() && auth().session && auth().session();
    return s && s.userId;
  }

  /* --------------------------------------------------------------- plan */
  async function loadProfile() {
    if (!available()) return null;
    const id = userId();
    try {
      const rows = await api(`/rest/v1/${PROFILES}?id=eq.${id}&select=plan,name,phone,school_code`, { headers: headers(true) });
      return rows && rows[0] ? rows[0] : null;
    } catch (e) {
      // The school_code column may not exist yet on this database; fall back.
      const rows = await api(`/rest/v1/${PROFILES}?id=eq.${id}&select=plan,name,phone`, { headers: headers(true) });
      return rows && rows[0] ? rows[0] : null;
    }
  }

  // Merge fields onto the signed-in learner's own profile row (RLS: own row only).
  // Used to record which school the learner belongs to, for the cohort report.
  async function pushProfile(fields) {
    if (!available()) return false;
    const id = userId();
    await api(`/rest/v1/${PROFILES}?on_conflict=id`, {
      method: "POST",
      headers: Object.assign(headers(true), { "Prefer": "resolution=merge-duplicates,return=minimal" }),
      body: JSON.stringify(Object.assign({ id }, fields))
    });
    return true;
  }

  /* ----------------------------------------------------------- progress */
  function merge(local, remote) {
    if (!remote) return local;
    if (!local) return remote;
    const out = Object.assign({}, local);
    const maxNum = (a, b) => Math.max(Number(a) || 0, Number(b) || 0);

    out.answered = maxNum(local.answered, remote.answered);
    out.correct = maxNum(local.correct, remote.correct);
    out.streak = maxNum(local.streak, remote.streak);

    // topics: keep the best counts per topic
    out.topics = Object.assign({}, local.topics || {});
    Object.entries(remote.topics || {}).forEach(([k, v]) => {
      const cur = out.topics[k] || { seen: 0, correct: 0 };
      out.topics[k] = { seen: maxNum(cur.seen, v.seen), correct: maxNum(cur.correct, v.correct) };
    });

    // seen: union
    out.seen = Object.assign({}, remote.seen || {}, local.seen || {});

    // exams: union by date
    const byDate = {};
    [...(remote.exams || []), ...(local.exams || [])].forEach((e) => { if (e && e.date) byDate[e.date] = e; });
    out.exams = Object.values(byDate).sort((a, b) => String(a.date).localeCompare(String(b.date))).slice(-50);

    // device settings stay local: lang, premium, school, reviewer
    return out;
  }

  async function pull() {
    if (!available()) return null;
    const id = userId();
    const rows = await api(`/rest/v1/${PROGRESS}?user_id=eq.${id}&select=data,updated_at`, { headers: headers(true) });
    return rows && rows[0] ? rows[0].data : null;
  }

  async function push(data) {
    if (!available()) return false;
    const id = userId();
    await api(`/rest/v1/${PROGRESS}?on_conflict=user_id`, {
      method: "POST",
      headers: Object.assign(headers(true), { "Prefer": "resolution=merge-duplicates,return=minimal" }),
      body: JSON.stringify({ user_id: id, data, updated_at: new Date().toISOString() })
    });
    return true;
  }

  window.INZIRA_SYNC = { available, pull, push, loadProfile, pushProfile, merge };
})();
