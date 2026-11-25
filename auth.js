/* Inzira accounts.
 *
 * One small module with two backends behind the same API:
 *   - local  : device-only accounts (default; offline; $0)
 *   - cloud  : Supabase GoTrue auth (switches on when data/cloud.config.js is filled)
 *
 * Identity can be an email OR a phone number, always paired with a password, so
 * there are no SMS costs. Phone is also kept as contact info for Mobile Money.
 *
 * Public API (window.INZIRA_AUTH):
 *   mode()                       -> "local" | "cloud"
 *   current()                    -> user object or null
 *   signUp({name,email,phone,password})  -> {ok, user?, error?}
 *   signIn({identifier,password})        -> {ok, user?, error?}
 *   signOut()
 *   update(patch)                -> {ok, user?, error?}
 *   onChange(fn)                 -> unsubscribe
 */
(function () {
  const USERS_KEY = "inzira.users.v1";
  const SESSION_KEY = "inzira.session.v1";

  const cfg = window.INZIRA_CLOUD || {};
  const cloudOn = !!(cfg.url && cfg.anonKey);
  const TABLE = cfg.profilesTable || "profiles";

  /* ------------------------------------------------------------- helpers */
  function readJSON(key, fallback) {
    try { const v = JSON.parse(localStorage.getItem(key)); return v == null ? fallback : v; }
    catch (e) { return fallback; }
  }
  function writeJSON(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* private mode */ }
  }
  function normalizeEmail(s) { return (s || "").trim().toLowerCase(); }
  function normalizePhone(s) { return (s || "").replace(/[^\d+]/g, ""); }
  function rid() {
    return (crypto.randomUUID && crypto.randomUUID()) || ("u_" + Math.random().toString(36).slice(2) + Date.now().toString(36));
  }
  async function hashPassword(password, salt) {
    const bytes = new TextEncoder().encode(salt + ":" + password);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  function publicUser(u) {
    if (!u) return null;
    return {
      id: u.id, name: u.name || "", email: u.email || "", phone: u.phone || "",
      plan: u.plan || "free", createdAt: u.createdAt || null
    };
  }

  /* --------------------------------------------------------- local store */
  function loadUsers() { return readJSON(USERS_KEY, []); }
  function saveUsers(list) { writeJSON(USERS_KEY, list); }
  function findUser(list, identifier) {
    const email = normalizeEmail(identifier);
    const phone = normalizePhone(identifier);
    return list.find((u) =>
      (email && u.email === email) || (phone && u.phone && u.phone === phone)
    );
  }
  function readSession() { return readJSON(SESSION_KEY, null); }
  function writeSession(s) { if (s) writeJSON(SESSION_KEY, s); else localStorage.removeItem(SESSION_KEY); }

  /* ------------------------------------------------------------ listeners */
  let listeners = [];
  function emit() { listeners.forEach((fn) => { try { fn(current()); } catch (e) {} }); }
  function onChange(fn) { listeners.push(fn); return () => { listeners = listeners.filter((x) => x !== fn); }; }

  /* --------------------------------------------------------- cloud (GoTrue) */
  function cloudHeaders(withAuth) {
    const h = { "apikey": cfg.anonKey, "Content-Type": "application/json" };
    const s = readSession();
    if (withAuth && s && s.accessToken) h["Authorization"] = "Bearer " + s.accessToken;
    return h;
  }
  async function cloudFetch(path, opts) {
    const res = await fetch(cfg.url.replace(/\/$/, "") + path, opts);
    const text = await res.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch (e) { data = { raw: text }; }
    if (!res.ok) {
      const msg = (data && (data.error_description || data.msg || data.message || data.error)) || ("HTTP " + res.status);
      throw new Error(msg);
    }
    return data;
  }
  async function cloudProfile(accessToken, user) {
    const meta = (user && user.user_metadata) || {};
    return {
      id: user.id,
      name: meta.name || (user.email || "").split("@")[0] || "",
      email: normalizeEmail(user.email),
      phone: normalizePhone(meta.phone || user.phone || ""),
      plan: meta.plan || "free",
      createdAt: user.created_at || null
    };
  }

  /* -------------------------------------------------------------- public */
  function mode() { return cloudOn ? "cloud" : "local"; }

  function current() {
    const s = readSession();
    if (!s) return null;
    if (cloudOn) return s.user ? publicUser(s.user) : null;
    const u = loadUsers().find((x) => x.id === s.userId);
    return publicUser(u);
  }

  async function signUp({ name, email, phone, password }) {
    email = normalizeEmail(email);
    phone = normalizePhone(phone);
    name = (name || "").trim();
    if (!email && !phone) return { ok: false, error: "no_identity" };
    if (!password || password.length < 6) return { ok: false, error: "weak_password" };

    if (cloudOn) {
      try {
        const data = await cloudFetch("/auth/v1/signup", {
          method: "POST", headers: cloudHeaders(false),
          body: JSON.stringify({ email, password, data: { name, phone } })
        });
        // Email confirmation may be on; if a session came back, use it.
        if (data && data.access_token) {
          writeSession({ accessToken: data.access_token, refreshToken: data.refresh_token, user: data.user });
          return { ok: true, user: current() };
        }
        return { ok: true, user: null, pending: true };
      } catch (e) { return { ok: false, error: String(e.message || e) }; }
    }

    // local
    const list = loadUsers();
    if (findUser(list, email || phone)) return { ok: false, error: "exists" };
    const salt = rid();
    const user = {
      id: rid(), name, email, phone, salt,
      hash: await hashPassword(password, salt),
      plan: "free", createdAt: new Date().toISOString()
    };
    list.push(user);
    saveUsers(list);
    writeSession({ userId: user.id });
    emit();
    return { ok: true, user: publicUser(user) };
  }

  async function signIn({ identifier, password }) {
    identifier = (identifier || "").trim();
    if (!identifier || !password) return { ok: false, error: "missing" };

    if (cloudOn) {
      // Supabase password grant is email-based; a phone identifier must be an email.
      const email = normalizeEmail(identifier);
      try {
        const data = await cloudFetch("/auth/v1/token?grant_type=password", {
          method: "POST", headers: cloudHeaders(false),
          body: JSON.stringify({ email, password })
        });
        const user = await cloudProfile(data.access_token, data.user);
        writeSession({ accessToken: data.access_token, refreshToken: data.refresh_token, user });
        emit();
        return { ok: true, user: publicUser(user) };
      } catch (e) { return { ok: false, error: String(e.message || e) }; }
    }

    // local
    const list = loadUsers();
    const u = findUser(list, identifier);
    if (!u) return { ok: false, error: "no_user" };
    const h = await hashPassword(password, u.salt);
    if (h !== u.hash) return { ok: false, error: "bad_password" };
    writeSession({ userId: u.id });
    emit();
    return { ok: true, user: publicUser(u) };
  }

  function signOut() { writeSession(null); emit(); }

  // Used by the sync engine to talk to PostgREST as the signed-in user.
  function session() {
    const s = readSession();
    if (!s) return null;
    return { accessToken: s.accessToken || null, userId: (s.user && s.user.id) || s.userId || null };
  }

  async function update(patch) {
    const s = readSession();
    if (!s) return { ok: false, error: "no_session" };
    if (cloudOn) {
      const merged = Object.assign({}, s.user, patch);
      return { ok: true, user: publicUser(merged) };
    }
    const list = loadUsers();
    const u = list.find((x) => x.id === s.userId);
    if (!u) return { ok: false, error: "no_user" };
    Object.assign(u, patch);
    saveUsers(list);
    emit();
    return { ok: true, user: publicUser(u) };
  }

  window.INZIRA_AUTH = { mode, current, signUp, signIn, signOut, update, onChange, session };
})();
