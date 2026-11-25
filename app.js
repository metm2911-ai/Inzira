/* Inzira - offline driving-theory trainer (pilot build)
 * Vanilla JS, no build step. All progress stays on the device.
 */
(function () {
  "use strict";

  const BANK = (window.INZIRA_BANK && window.INZIRA_BANK.questions) || [];
  const SIGNS = window.SIGNS || {};
  const SCHOOLS = window.INZIRA_SCHOOLS || {};
  const STORE = "inzira.v1";
  const EXAM_SIZE = 20;
  const EXAM_MINUTES = 20;
  const PASS_MARK = 12;

  /* ------------------------------------------------------------------ i18n */
  const I18N = {
    rw: {
      tagline: "Menya amategeko. Tsinda ikizamini.",
      navHome: "Ahabanza", navPractice: "Kwiga", navSigns: "Ibimenyetso", navStats: "Imibare",
      greeting: "Muraho", heroTitle: "Witegure ikizamini cy'ubushoferi",
      readiness: "Ubushobozi bwo gutsinda", ready: "Witeguye",
      almost: "Hafi yo kwitegura", notReady: "Ugikeneye kwiga",
      startExam: "Tangira ikizamini", startExamSub: "Ibibazo 20 · iminota 20 · 12/20 ni byo bisabwa",
      practice: "Kwiga", practiceSub: "Ibibazo n'ibisobanuro",
      signsTitle: "Ibimenyetso", signsSub: "Menya ibyapa byose",
      weak: "Aho ntakomeye", weakSub: "Subiramo ibibazo bikugora",
      streak: "Iminsi ikurikiranye", answered: "Ibibazo byasubijwe", best: "Amanota meza",
      pilot: "Verisiyo y'igerageza",
      pilotNote: "Iri gerageza ni ubuntu. Kode y'ishuri irafungura ibintu byose.",
      continue: "Komeza",
      examTitle: "Ikizamini", question: "Ikibazo", of: "kuri", timeLeft: "Igihe gisigaye",
      questionCount: "Umubare w'ibibazo", passMark: "Amanota yo gutsinda",
      next: "Ibikurikira", submit: "Ohereza ikizamini", confirmSubmit: "Wemeza ko wohereje ikizamini?",
      quit: "Hagarika", quitConfirm: "Gusohoka bizakura amanota. Wemeza?",
      answeredCount: "Byasubijwe",
      pass: "Watsinze!", fail: "Ntibyagenze neza",
      passMsg: "Ufite amanota ahagije yo gutsinda ikizamini nyakuri.",
      failMsg: "Ukeneye 12/20. Subiramo ibibazo wacitse, hanyuma ugerageze ukundi.",
      yourScore: "Amanota yawe", correctAnswers: "Ibisubizo byiza",
      review: "Reba ibisubizo", retry: "Gerageza ukundi", backHome: "Subira ahabanza",
      breakdown: "Amanota ku ngingo",
      chooseTopic: "Hitamo ikiganiro", allTopics: "Ingingo zose",
      imageDrill: "Ibibazo bifite amafoto", imageDrillSub: "Ibibazo bikoresha ifoto y'ikimenyetso",
      contentInfo: "Uburyo bw'ibiri muri porogaramu", withImages: "bifite amafoto",
      checkUpdates: "Reba niba hari ibishya", updatesDone: "Byongeye kugaruka.",
      guide: "Icyo wakwiye kumenya", nextQ: "Ikibazo gikurikira",
      correct: "Ni byo!", wrong: "Si byo",
      signsHeading: "Ibimenyetso by'umuhanda", signsHeadingSub: "Kanda ku cyapa urebe ibisobanuro.",
      statsTitle: "Imibare yawe", attempts: "Ikizamini cyakozwe", average: "Impuzandengo",
      accuracy: "Umusaruro w'ibibazo", weakTopics: "Ingingo zigikeneye imbaraga",
      noData: "Nta makuru arahari. Tangira ikizamini.",
      settings: "Igenamiterere", language: "Ururimi", schoolCode: "Kode y'ishuri",
      reviewer: "Umwarimu (reviewer)", reviewerCode: "Kode y'umwarimu",
      reviewerNote: "Aha ni ho umwarimu yagenzura ibibazo: agakosora igisubizo, amagambo, cyangwa ifoto, akanongeraho ibibazo bishya.",
      openReviewer: "Fungura ikibaho cy'umwarimu", reviewerUnlocked: "Umwarimu yafunguwe", invalidCode: "Kode ntibyemewe",
      account: "Konti", signIn: "Injira", register: "Fungura konti", signOut: "Sohoka",
      name: "Amazina", email: "Imeyili", phone: "Telefone", password: "Ijambo ry'ibanga",
      accountSub: "Injira kugira ngo amanota yawe aboneke kuri telefone zose, kandi ufungure ikizamini cyose.",
      haveAccount: "Usanzwe ufite konti? Injira", noAccount: "Nta konti ufite? Fungura",
      saveProfile: "Bika", profileSaved: "Byabitswe.", planFree: "Ubuntu", planFull: "Byuzuye",
      upgrade: "Fungura byuzuye", paywallTitle: "Birenga ubuntu",
      paywallMock: "Konti y'ubuntu ifite ikizamini kimwe. Fungura byuzuye kugira ukore ibizamini byinshi.",
      paywallBank: "Konti y'ubuntu ibona ibibazo 60. Fungura byuzuye kugira ubone ibibazo 394 byose.",
      notSignedIn: "Ntiwinjiye", wrongCreds: "Imeyili/telefone cyangwa ijambo ry'ibanga sibyo.",
      acctExists: "Iyi konti isanzweho.", weakPassword: "Ijambo ry'ibanga rigomba nibura inyuguti 6.",
      needIdentity: "Shyiramo imeyili cyangwa telefone.", checkEmail: "Reba imeyili yawe wemeze konti.",
      unlock: "Fungura", unlocked: "Byafunguwe", schoolWelcome: "Wafunguriwe n'ishuri", reset: "Siba amakuru yose",
      resetConfirm: "Siba amanota n'amakuru yose? Ntibishobora gusubizwa.",
      about: "Ibyerekeye Inzira",
      disclaimer: "Inzira ni igikoresho cyo kwigisha. Ntabwo ihagarariye Polisi y'Igihugu (RNP). Ibibazo bigomba kugenzurwa n'umwarimu w'ubushoferi mbere yo gukoreshwa mu buryo bwemewe.",
      install: "Shyira kuri telefone",
      installed: "Inzira iri kuri telefone yawe.",
      ok: "Sawa", cancel: "Hagarika", back: "Subira",
      noQuestions: "Nta bibazo birahari.",
      examIntro: "Ikizamini kimeze nk'icy'ukuri: ibibazo 20, iminota 20, nta bisobanuro kugeza birangiye.",
      startNow: "Tangira", topicAll: "Byose",
      lastExam: "Ikizamini giheruka", noExam: "Nta kizamini kirakorwa",
      needMore: "Kora ibizamini byinshi kugira ngo ubone ishusho nyayo.",
      weekGoal: "Intego y'iki cyumweru"
    },
    en: {
      tagline: "Learn the rules. Pass the test.",
      navHome: "Home", navPractice: "Learn", navSigns: "Signs", navStats: "Stats",
      greeting: "Hello", heroTitle: "Get ready for your driving theory test",
      readiness: "Test readiness", ready: "Ready",
      almost: "Almost ready", notReady: "Keep studying",
      startExam: "Start a mock exam", startExamSub: "20 questions · 20 minutes · 12/20 to pass",
      practice: "Practice", practiceSub: "Questions with explanations",
      signsTitle: "Road signs", signsSub: "Learn every sign",
      weak: "Weak spots", weakSub: "Repeat what trips you up",
      streak: "Day streak", answered: "Questions answered", best: "Best score",
      pilot: "Pilot build",
      pilotNote: "Free during the pilot. A school code unlocks everything.",
      continue: "Continue",
      examTitle: "Mock exam", question: "Question", of: "of", timeLeft: "Time left",
      questionCount: "Questions", passMark: "Pass mark",
      next: "Next", submit: "Submit exam", confirmSubmit: "Submit your exam now?",
      quit: "Quit", quitConfirm: "Leaving will discard your score. Continue?",
      answeredCount: "Answered",
      pass: "You passed!", fail: "Not this time",
      passMsg: "Your score is in the passing range for the real test.",
      failMsg: "You need 12/20. Review the ones you missed, then try again.",
      yourScore: "Your score", correctAnswers: "Correct answers",
      review: "Review answers", retry: "Try again", backHome: "Back home",
      breakdown: "Score by topic",
      chooseTopic: "Choose a topic", allTopics: "All topics",
      imageDrill: "Questions with pictures", imageDrillSub: "Questions that use a sign photo",
      contentInfo: "Content in this app", withImages: "with pictures",
      checkUpdates: "Check for updates", updatesDone: "Reloaded.",
      guide: "Remember this", nextQ: "Next question",
      correct: "Correct", wrong: "Not quite",
      signsHeading: "Road signs", signsHeadingSub: "Tap a sign to see what it means.",
      statsTitle: "Your numbers", attempts: "Mock exams taken", average: "Average score",
      accuracy: "Question accuracy", weakTopics: "Topics that need work",
      noData: "No data yet. Take a mock exam.",
      settings: "Settings", language: "Language", schoolCode: "School code",
      reviewer: "Instructor (reviewer)", reviewerCode: "Reviewer code",
      reviewerNote: "Where an instructor fixes a question's answer, wording or picture, and adds new questions.",
      openReviewer: "Open the review page", reviewerUnlocked: "Reviewer unlocked", invalidCode: "Invalid code",
      account: "Account", signIn: "Sign in", register: "Create account", signOut: "Sign out",
      name: "Name", email: "Email", phone: "Phone", password: "Password",
      accountSub: "Sign in to keep your results on every phone, and to unlock the full exam.",
      haveAccount: "Already have an account? Sign in", noAccount: "No account? Create one",
      saveProfile: "Save", profileSaved: "Saved.", planFree: "Free", planFull: "Full",
      upgrade: "Unlock full", paywallTitle: "Free limit reached",
      paywallMock: "A free account gets one mock exam. Unlock full to practise without limits.",
      paywallBank: "A free account sees 60 questions. Unlock full to get all 394.",
      notSignedIn: "Not signed in", wrongCreds: "Wrong email/phone or password.",
      acctExists: "That account already exists.", weakPassword: "Password must be at least 6 characters.",
      needIdentity: "Add an email or a phone number.", checkEmail: "Check your email to confirm the account.",
      unlock: "Unlock", unlocked: "Unlocked", schoolWelcome: "Unlocked by your school", reset: "Erase all data",
      resetConfirm: "Erase all scores and data? This cannot be undone.",
      about: "About Inzira",
      disclaimer: "Inzira is a study aid. It is not endorsed by the Rwanda National Police (RNP). Questions must be reviewed by a qualified driving instructor before official use.",
      install: "Install on your phone",
      installed: "Inzira is installed on this device.",
      ok: "OK", cancel: "Cancel", back: "Back",
      noQuestions: "No questions available.",
      examIntro: "Same format as the real test: 20 questions, 20 minutes, no feedback until the end.",
      startNow: "Start", topicAll: "All",
      lastExam: "Last mock", noExam: "No mock yet",
      needMore: "Take a few more mocks to get a reliable picture.",
      weekGoal: "This week's goal"
    },
    fr: {
      tagline: "Apprenez le code. Réussissez l'examen.",
      navHome: "Accueil", navPractice: "Apprendre", navSigns: "Panneaux", navStats: "Stats",
      greeting: "Bonjour", heroTitle: "Préparez votre examen du code",
      readiness: "Préparation à l'examen", ready: "Prêt",
      almost: "Presque prêt", notReady: "Continuez à étudier",
      startExam: "Lancer un examen blanc", startExamSub: "20 questions · 20 minutes · 12/20 pour réussir",
      practice: "S'entraîner", practiceSub: "Questions avec explications",
      signsTitle: "Panneaux", signsSub: "Apprenez tous les panneaux",
      weak: "Points faibles", weakSub: "Révisez ce qui vous bloque",
      streak: "Jours d'affilée", answered: "Questions répondues", best: "Meilleur score",
      pilot: "Version pilote",
      pilotNote: "Gratuit pendant le pilote. Un code école débloque tout.",
      continue: "Continuer",
      examTitle: "Examen blanc", question: "Question", of: "sur", timeLeft: "Temps restant",
      questionCount: "Questions", passMark: "Note de réussite",
      next: "Suivant", submit: "Envoyer l'examen", confirmSubmit: "Envoyer l'examen maintenant ?",
      quit: "Quitter", quitConfirm: "Quitter effacera votre score. Continuer ?",
      answeredCount: "Répondues",
      pass: "Réussi !", fail: "Pas cette fois",
      passMsg: "Votre score est dans la zone de réussite de l'examen réel.",
      failMsg: "Il faut 12/20. Révisez vos erreurs puis réessayez.",
      yourScore: "Votre score", correctAnswers: "Bonnes réponses",
      review: "Voir les réponses", retry: "Réessayer", backHome: "Accueil",
      breakdown: "Score par thème",
      chooseTopic: "Choisir un thème", allTopics: "Tous les thèmes",
      imageDrill: "Questions avec images", imageDrillSub: "Questions qui utilisent une image de panneau",
      contentInfo: "Contenu de l'application", withImages: "avec images",
      checkUpdates: "Vérifier les mises à jour", updatesDone: "Rechargé.",
      guide: "À retenir", nextQ: "Question suivante",
      correct: "Correct", wrong: "Incorrect",
      signsHeading: "Panneaux routiers", signsHeadingSub: "Touchez un panneau pour voir sa signification.",
      statsTitle: "Vos chiffres", attempts: "Examens blancs", average: "Moyenne",
      accuracy: "Précision", weakTopics: "Thèmes à travailler",
      noData: "Pas encore de données. Faites un examen blanc.",
      settings: "Réglages", language: "Langue", schoolCode: "Code école",
      reviewer: "Moniteur (révision)", reviewerCode: "Code moniteur",
      reviewerNote: "Où un moniteur corrige la réponse, le texte ou l'image d'une question, et en ajoute de nouvelles.",
      openReviewer: "Ouvrir la page de révision", reviewerUnlocked: "Moniteur déverrouillé", invalidCode: "Code invalide",
      account: "Compte", signIn: "Se connecter", register: "Créer un compte", signOut: "Se déconnecter",
      name: "Nom", email: "E-mail", phone: "Téléphone", password: "Mot de passe",
      accountSub: "Connectez-vous pour garder vos résultats sur tous les téléphones, et débloquer l'examen complet.",
      haveAccount: "Déjà un compte ? Se connecter", noAccount: "Pas de compte ? Créer",
      saveProfile: "Enregistrer", profileSaved: "Enregistré.", planFree: "Gratuit", planFull: "Complet",
      upgrade: "Débloquer complet", paywallTitle: "Limite gratuite atteinte",
      paywallMock: "Un compte gratuit a un examen blanc. Débloquez le complet pour un accès illimité.",
      paywallBank: "Un compte gratuit voit 60 questions. Débloquez le complet pour les 394.",
      notSignedIn: "Non connecté", wrongCreds: "E-mail/téléphone ou mot de passe incorrect.",
      acctExists: "Ce compte existe déjà.", weakPassword: "Le mot de passe doit faire au moins 6 caractères.",
      needIdentity: "Ajoutez un e-mail ou un téléphone.", checkEmail: "Vérifiez votre e-mail pour confirmer le compte.",
      unlock: "Débloquer", unlocked: "Débloqué", schoolWelcome: "Débloqué par votre école", reset: "Effacer toutes les données",
      resetConfirm: "Effacer tous les scores et données ? Action irréversible.",
      about: "À propos d'Inzira",
      disclaimer: "Inzira est un outil d'étude. Il n'est pas approuvé par la Police Nationale (RNP). Les questions doivent être vérifiées par un moniteur qualifié avant tout usage officiel.",
      install: "Installer sur le téléphone",
      installed: "Inzira est installée sur cet appareil.",
      ok: "OK", cancel: "Annuler", back: "Retour",
      noQuestions: "Aucune question disponible.",
      examIntro: "Même format que l'examen réel : 20 questions, 20 minutes, pas de correction avant la fin.",
      startNow: "Commencer", topicAll: "Tout",
      lastExam: "Dernier examen", noExam: "Aucun examen",
      needMore: "Faites encore quelques examens pour une vision fiable.",
      weekGoal: "Objectif de la semaine"
    }
  };

  const TOPICS = {
    signs:    { rw: "Ibimenyetso", en: "Signs", fr: "Panneaux", icon: "sign" },
    priority: { rw: "Uburenganzira", en: "Priority", fr: "Priorité", icon: "merge" },
    speed:    { rw: "Umuvuduko", en: "Speed", fr: "Vitesse", icon: "speed" },
    lights:   { rw: "Amatara", en: "Lights", fr: "Feux", icon: "light" },
    safety:   { rw: "Umutekano", en: "Safety", fr: "Sécurité", icon: "shield" },
    docs:     { rw: "Inyandiko", en: "Documents", fr: "Documents", icon: "doc" }
  };

  const GUIDE = {
    signs: {
      rw: "Ibyapa bigenda mu nzego: mpandeshatu y'umuhondo = iburira; uruziga rutukura = kubuza; uruziga rw'ubururu = itegeko; mpandeshatu ihinduranyije = tanga inzira. Ibarwa ry'ibyapa ni ryo shingiro ry'ikizamini.",
      en: "Signs come in families: yellow triangle = warning; red circle = prohibition; blue circle = mandatory; inverted triangle = give way. Sign recognition is the backbone of the exam.",
      fr: "Les panneaux ont des familles : triangle jaune = danger ; cercle rouge = interdiction ; cercle bleu = obligation ; triangle inversé = cédez le passage."
    },
    priority: {
      rw: "Urukurikirane rw'uburenganzira: umukozi wa polisi > amatara > ibyapa > ibimenyetso byo mu muhanda. Ahatari ikimenyetso, tanga inzira iburyo. Mu nkomane izenguruka, tanga inzira abasanzwe bazenguruka.",
      en: "Priority order: police officer > traffic lights > signs > road markings. With no signs, give way to the right. At a roundabout, give way to traffic already circulating.",
      fr: "Ordre de priorité : agent > feux > panneaux > marquages. Sans signalisation, priorité à droite. Au rond-point, cédez le passage aux véhicules engagés."
    },
    speed: {
      rw: "Mu mujyi 60 km/h; hanze y'umujyi 80 km/h; ibinyabiziga bitwara abantu n'ibintu 60 km/h. Icyapa kigabanya umuvuduko kigomba kwubahirizwa kugeza aho kirangirira. Mu mvura, gabanya umuvuduko.",
      en: "Built-up areas 60 km/h; outside 80 km/h; public transport and goods vehicles 60 km/h. Obey lower posted limits until they end. Slow down in rain.",
      fr: "Agglomération 60 km/h ; hors agglomération 80 km/h ; transport public et marchandises 60 km/h. Respectez les limites plus basses. Ralentissez sous la pluie."
    },
    lights: {
      rw: "Mu mujyi no mu bantu koresha amatara y'amagufi (dipped). Amaremare (main beam) gusa ahatari abandi. Mu gihu cyangwa mvura ikaze, amagufi. Amatara y'urutoki (hazard) ni ayo kumenyesha panne gusa.",
      en: "Use dipped headlights in town and around other traffic. Main beam only when alone on the road. In fog or heavy rain, use dipped lights. Hazard lights are for breakdowns only.",
      fr: "Feux de croisement en ville et avec du trafic. Feux de route seulement seul sur la route. Brouillard ou forte pluie : feux de croisement. Feux de détresse : panne uniquement."
    },
    safety: {
      rw: "Umukandara kuri bose, nta telefone mu ntoki, nta alcohol mbere yo gutwara, hagarara uruhuke iyo unaniwe, tanga inzira ku banyamaguru n'ibinyabiziga by'ubutabazi. Intera y'umutekano: amasegonda 2.",
      en: "Seat belts for everyone, no hand-held phone, zero alcohol before driving, stop and rest when tired, give way to pedestrians and emergency vehicles. Following distance: 2 seconds.",
      fr: "Ceinture pour tous, pas de téléphone en main, zéro alcool, arrêtez-vous si fatigué, cédez aux piétons et véhicules d'urgence. Distance de sécurité : 2 secondes."
    },
    docs: {
      rw: "Ugomba kugira: uruhushya rw'ubushoferi rukora, ikarita y'ikinyabiziga, icyemezo cy'isuzuma (visite technique), n'ubwishingizi. Uruhushya provisoire rusaba umuherekeza n'ikimenyetso cy'auto-école.",
      en: "Carry: valid licence, vehicle registration, roadworthiness certificate and insurance. A provisional licence requires a supervisor and learner markings.",
      fr: "Ayez : permis valide, carte grise, certificat de visite technique et assurance. Le permis provisoire exige un accompagnateur et le signe auto-école."
    }
  };

  /* --------------------------------------------------------------- storage */
  function defaults() {
    return {
      lang: "rw",
      premium: false,
      school: null,
      reviewer: false,
      answered: 0,
      correct: 0,
      streak: 0,
      lastActive: null,
      topics: {},
      exams: [],
      seen: {}
    };
  }

  let state = defaults();

  function load() {
    try {
      const raw = localStorage.getItem(STORE);
      if (raw) state = Object.assign(defaults(), JSON.parse(raw));
    } catch (e) { /* ignore corrupt state */ }
    if (!I18N[state.lang]) state.lang = "rw";
  }

  function save() {
    try { localStorage.setItem(STORE, JSON.stringify(state)); } catch (e) { /* private mode */ }
    scheduleSync();
  }

  /* ------------------------------------------------------------ cloud sync */
  let syncTimer = null;
  function cloudReady() {
    return window.INZIRA_SYNC && window.INZIRA_SYNC.available();
  }
  function scheduleSync() {
    if (!cloudReady()) return;
    clearTimeout(syncTimer);
    syncTimer = setTimeout(pushSync, 1500);
  }
  async function pushSync() {
    if (!cloudReady()) return;
    try {
      const payload = Object.assign({}, state);
      await window.INZIRA_SYNC.push(payload);
    } catch (e) { /* offline or RLS error; try again on the next change */ }
  }
  // Pull the server copy, merge it with local, adopt it, and render.
  async function pullSync() {
    if (!cloudReady()) return false;
    try {
      const remote = await window.INZIRA_SYNC.pull();
      const merged = window.INZIRA_SYNC.merge(state, remote);
      state = Object.assign(defaults(), merged);
      if (!I18N[state.lang]) state.lang = "rw";
      save();
      const p = await window.INZIRA_SYNC.loadProfile();
      if (p) {
        if (p.plan) applyPlan(p.plan);
        // A school's unlock follows the account across devices.
        if (p.school_code && !state.premium) applySchool(p.school_code);
        else if (state.school && !p.school_code) pushSchoolToProfile();
      }
      const btn = document.getElementById("langBtn");
      if (btn) btn.textContent = state.lang.toUpperCase();
      render();
      updateAccountBtn();
      return true;
    } catch (e) { return false; }
  }
  // The plan lives in the server profile; cache it so the gate is right on reload.
  function applyPlan(plan) {
    try { plan ? localStorage.setItem("inzira.plan.v1", plan) : localStorage.removeItem("inzira.plan.v1"); } catch (e) {}
  }

  function today() {
    const d = new Date();
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  }

  function touchStreak() {
    const t = today();
    if (state.lastActive === t) return;
    const y = new Date();
    y.setDate(y.getDate() - 1);
    const yKey = y.getFullYear() + "-" + (y.getMonth() + 1) + "-" + y.getDate();
    state.streak = state.lastActive === yKey ? (state.streak || 0) + 1 : 1;
    state.lastActive = t;
  }

  function topicStat(key) {
    if (!state.topics[key]) state.topics[key] = { seen: 0, correct: 0 };
    return state.topics[key];
  }

  /* ----------------------------------------------------------------- utils */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const view = $("#view");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function t(key) {
    return (I18N[state.lang] && I18N[state.lang][key]) || I18N.rw[key] || key;
  }

  function topicName(key) {
    const t0 = TOPICS[key];
    return t0 ? (t0[state.lang] || t0.rw) : key;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("show"), 2200);
  }

  function fmtTime(ms) {
    const s = Math.max(0, Math.round(ms / 1000));
    return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
  }

  function readiness() {
    const exams = state.exams.slice(-5);
    const examPct = exams.length ? exams.reduce((s, e) => s + e.score / e.total, 0) / exams.length : 0;
    const practicePct = state.answered ? state.correct / state.answered : 0;
    const evidence = Math.min(1, exams.length / 4 * 0.6 + Math.min(state.answered, 120) / 120 * 0.4);
    const raw = exams.length ? examPct * 0.7 + practicePct * 0.3 : practicePct * 0.8;
    return Math.round(Math.max(0, Math.min(1, raw)) * evidence * 100);
  }

  function readinessLabel(v) {
    if (v >= 70) return t("ready");
    if (v >= 40) return t("almost");
    return t("notReady");
  }

  function weakTopics() {
    return Object.keys(state.topics)
      .map((k) => ({ key: k, ...state.topics[k], pct: state.topics[k].seen ? state.topics[k].correct / state.topics[k].seen : 0 }))
      .filter((x) => x.seen >= 3)
      .sort((a, b) => a.pct - b.pct)
      .slice(0, 3);
  }

  function prep(q) {
    const opts = q.o.map((text, i) => ({ text, correct: i === q.a }));
    return { id: q.id, q: q.q, img: q.img || null, e: q.e || null, t: q.t, options: shuffle(opts) };
  }

  /* ------------------------------------------------------------- accounts */
  const FREE_MOCKS = 1;    // mock exams a free account may sit
  const FREE_SAMPLE = 60;  // questions a free account may practise

  function authUser() {
    return window.INZIRA_AUTH && window.INZIRA_AUTH.current();
  }
  function isFull() {
    const u = authUser();
    return (u && u.plan === "full") || state.premium || cloudPlan() === "full";
  }
  function practicePool() {
    return isFull() ? BANK.slice() : freeSample();
  }
  // Evenly-spaced pick of n items across an array (deterministic).
  function even(arr, n) {
    if (arr.length <= n) return arr.slice();
    const step = arr.length / n;
    return Array.from({ length: n }, (_, i) => arr[Math.floor(i * step)]);
  }
  // The free tier's question set: a spread across every topic that ALSO contains
  // pictures, so a free learner always sees sign images (they are a key draw).
  function freeSample() {
    const withPic = BANK.filter((q) => q.img);
    const textOnly = BANK.filter((q) => !q.img);
    const picQuota = Math.min(24, withPic.length);
    return even(withPic, picQuota).concat(even(textOnly, FREE_SAMPLE - picQuota));
  }
  function authMode() {
    return window.INZIRA_AUTH ? window.INZIRA_AUTH.mode() : "local";
  }
  function cloudPlan() {
    try { return localStorage.getItem("inzira.plan.v1"); } catch (e) { return null; }
  }

  /* ------------------------------------------------------------- nav state */
  let current = "home";
  let exam = null;      // live exam
  let practice = null;  // live practice session
  let autoSchoolName = null; // set when ?school= unlock succeeds, for the welcome toast

  function nav(screen) {
    if (exam && screen !== "exam") {
      if (!confirm(t("quitConfirm"))) return;
      stopTimer();
      exam = null;
    }
    current = screen;
    document.querySelectorAll(".tab").forEach((b) => {
      b.classList.toggle("active", b.dataset.nav === screen);
    });
    render();
    view.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
  }

  function render() {
    if (current === "home") return renderHome();
    if (current === "practice") return practice ? renderPractice() : renderPracticePicker();
    if (current === "signs") return renderSigns();
    if (current === "stats") return renderStats();
    if (current === "settings") return renderSettings();
    if (current === "exam-intro") return renderExamIntro();
    if (current === "exam") return renderExam();
    if (current === "result") return renderResult();
    if (current === "sign") return renderSignDetail();
    if (current === "account") return renderAuth();
    renderHome();
  }

  /* ------------------------------------------------------------------ home */
  function renderHome() {
    const r = readiness();
    const last = state.exams[state.exams.length - 1];
    const weak = weakTopics();
    const circumference = 2 * Math.PI * 46;
    const dash = (r / 100) * circumference;

    view.innerHTML = `
      <div class="stack">
        <div class="card hero">
          <div class="label">${esc(t("pilot"))} · ${BANK.length} ${state.lang === "rw" ? "ibibazo" : "questions"}</div>
          <h2>${esc(t("heroTitle"))}</h2>
          <p>${esc(t("examIntro"))}</p>
          <button class="btn btn-accent" data-act="start-exam">
            <svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
            ${esc(t("startExam"))}
          </button>
        </div>

        <div class="card">
          <div class="readiness">
            <div class="ring" role="img" aria-label="${esc(t("readiness"))}: ${r}%">
              <svg viewBox="0 0 100 100">
                <circle class="track" cx="50" cy="50" r="46" fill="none" stroke-width="9"/>
                <circle class="bar" cx="50" cy="50" r="46" fill="none" stroke-width="9"
                  stroke-dasharray="${circumference.toFixed(1)}"
                  stroke-dashoffset="${(circumference - dash).toFixed(1)}"/>
              </svg>
              <div class="val"><strong>${r}%</strong><small>${esc(readinessLabel(r))}</small></div>
            </div>
            <div class="grow">
              <div class="tiny muted bold" style="text-transform:uppercase;letter-spacing:.08em">${esc(t("readiness"))}</div>
              <div class="bold" style="font-size:17px;margin-top:2px">${last ? esc(t("lastExam")) + ": " + last.score + "/" + last.total : esc(t("noExam"))}</div>
              <div class="small muted" style="margin-top:2px">${esc(t("startExamSub"))}</div>
            </div>
          </div>
        </div>

        <div class="kpis">
          <div class="kpi"><strong>${state.streak || 0}</strong><span>${esc(t("streak"))}</span></div>
          <div class="kpi"><strong>${state.answered || 0}</strong><span>${esc(t("answered"))}</span></div>
          <div class="kpi"><strong>${state.exams.length ? Math.max.apply(null, state.exams.map((e) => e.score)) : "—"}</strong><span>${esc(t("best"))}</span></div>
        </div>

        <div class="quick-grid">
          <button class="quick" data-act="go-practice">
            <span class="qico"><svg viewBox="0 0 24 24"><path d="M4 5h16v3H4zM4 11h16v3H4zM4 17h10v3H4z" fill="currentColor"/></svg></span>
            <strong>${esc(t("practice"))}</strong><span>${esc(t("practiceSub"))}</span>
          </button>
          <button class="quick" data-act="go-signs">
            <span class="qico"><svg viewBox="0 0 24 24"><path d="M12 2l9 4.5v6c0 5-3.8 8.6-9 9.5-5.2-.9-9-4.5-9-9.5v-6z" fill="currentColor"/></svg></span>
            <strong>${esc(t("signsTitle"))}</strong><span>${esc(t("signsSub"))}</span>
          </button>
          <button class="quick" data-act="go-weak" ${weak.length ? "" : "disabled style=opacity:.55"}>
            <span class="qico"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-2h2zm0-4h-2V7h2z" fill="currentColor"/></svg></span>
            <strong>${esc(t("weak"))}</strong><span>${weak.length ? esc(weak.map((w) => topicName(w.key)).join(", ")) : esc(t("weakSub"))}</span>
          </button>
          <button class="quick" data-act="go-settings">
            <span class="qico"><svg viewBox="0 0 24 24"><path d="M12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4zm8.9 4a7.9 7.9 0 0 1-.1 1.2l2 1.6-2 3.4-2.4-1a8 8 0 0 1-2 1.2l-.4 2.6h-4l-.4-2.6a8 8 0 0 1-2-1.2l-2.4 1-2-3.4 2-1.6A7.9 7.9 0 0 1 3.1 12a7.9 7.9 0 0 1 .1-1.2l-2-1.6 2-3.4 2.4 1a8 8 0 0 1 2-1.2L8.1 3h4l.4 2.6a8 8 0 0 1 2 1.2l2.4-1 2 3.4-2 1.6a7.9 7.9 0 0 1 .1 1.2z" fill="currentColor"/></svg></span>
            <strong>${esc(t("settings"))}</strong><span>${esc(t("language"))} · ${esc(t("schoolCode"))}</span>
          </button>
        </div>

        <div class="banner">
          <svg class="bico" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-6h2zm0-8h-2V7h2z" fill="currentColor"/></svg>
          <div>${esc(t("pilotNote"))}</div>
        </div>
      </div>`;
  }

  /* ------------------------------------------------------------------ exam */
  let timerId = null;

  function openExamIntro() {
    current = "exam-intro";
    document.querySelectorAll(".tab").forEach((b) => b.classList.remove("active"));
    render();
    window.scrollTo({ top: 0 });
  }

  function renderExamIntro() {
    view.innerHTML = `
      <div class="stack">
        <div class="screen-head">
          <h1>${esc(t("examTitle"))}</h1>
          <p>${esc(t("examIntro"))}</p>
        </div>
        <div class="card">
          <div class="stat-list">
            <div class="stat-line"><span>${esc(t("questionCount"))}</span><b>20</b></div>
            <div class="stat-line"><span>${esc(t("timeLeft"))}</span><b>20:00</b></div>
            <div class="stat-line"><span>${esc(t("passMark"))}</span><b>12/20</b></div>
          </div>
        </div>
        <div class="banner">
          <svg class="bico" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-6h2zm0-8h-2V7h2z" fill="currentColor"/></svg>
          <div>${esc(state.lang === "rw" ? "Igihe gitangira guhita ukanda 'Tangira'. Nta bisobanuro bizagaragara kugeza ikizamini kirangiye." : state.lang === "fr" ? "Le chrono démarre dès que vous appuyez sur Commencer. Aucune correction avant la fin." : "The timer starts the moment you tap Start. No feedback until you submit.")}</div>
        </div>
        <button class="btn btn-primary" data-act="begin-exam">${esc(t("startNow"))}</button>
        <button class="btn btn-ghost" data-act="go-home">${esc(t("cancel"))}</button>
      </div>`;
  }

  function startExam(topicFilter) {
    if (!isFull() && state.exams.length >= FREE_MOCKS) {
      paywall("paywallMock");
      return;
    }
    let pool = BANK.slice();
    if (topicFilter) pool = pool.filter((q) => q.t === topicFilter);
    if (pool.length < EXAM_SIZE) pool = BANK.slice();
    if (!pool.length) { toast(t("noQuestions")); return; }

    const picked = shuffle(pool).slice(0, EXAM_SIZE).map(prep);
    exam = {
      questions: picked,
      idx: 0,
      answers: new Array(picked.length).fill(null),
      startedAt: Date.now(),
      endsAt: Date.now() + EXAM_MINUTES * 60 * 1000,
      filter: topicFilter || null
    };
    current = "exam";
    document.querySelectorAll(".tab").forEach((b) => b.classList.remove("active"));
    render();
    startTimer();
    touchStreak();
    save();
  }

  function startTimer() {
    stopTimer();
    timerId = setInterval(() => {
      if (!exam) return stopTimer();
      const left = exam.endsAt - Date.now();
      const el = $("#timer");
      if (el) {
        el.textContent = fmtTime(left);
        el.classList.toggle("low", left < 2 * 60 * 1000);
      }
      if (left <= 0) {
        stopTimer();
        finishExam();
      }
    }, 500);
  }

  function stopTimer() {
    if (timerId) clearInterval(timerId);
    timerId = null;
  }

  function renderExam() {
    if (!exam) return nav("home");
    const q = exam.questions[exam.idx];
    const picked = exam.answers[exam.idx];
    const answered = exam.answers.filter((a) => a !== null).length;
    const pct = ((exam.idx + 1) / exam.questions.length) * 100;
    const left = exam.endsAt - Date.now();

    view.innerHTML = `
      <div class="exam-bar">
        <div>
          <div class="qcount">${esc(t("question"))} ${exam.idx + 1} ${esc(t("of"))} ${exam.questions.length}</div>
          <div class="tiny muted">${esc(t("answeredCount"))}: ${answered}/${exam.questions.length}</div>
        </div>
        <div class="row" style="gap:10px">
          <span class="timer ${left < 120000 ? "low" : ""}" id="timer">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 11h-5v-2h3V6h2z" fill="currentColor"/></svg>
            ${fmtTime(left)}
          </span>
          <button class="btn btn-sm btn-ghost" data-act="quit-exam" aria-label="${esc(t("quit"))}">✕</button>
        </div>
      </div>

      <div class="progress" style="margin-bottom:18px"><i style="width:${pct}%"></i></div>

      <div class="qtext">${esc(q.q)}</div>
      ${q.img ? `<div class="qimg"><img src="${esc(q.img)}" alt="" loading="lazy"></div>` : ""}

      <div class="options" id="options">
        ${q.options.map((o, i) => `
          <button class="option ${picked === i ? "selected" : ""}" data-opt="${i}" aria-pressed="${picked === i}">
            <span class="letter">${"abcd"[i]}</span>
            <span>${esc(o.text)}</span>
          </button>`).join("")}
      </div>

      <div class="exam-actions">
        ${exam.idx > 0 ? `<button class="btn btn-ghost" data-act="prev-q">${esc(t("back"))}</button>` : ""}
        <button class="btn btn-primary grow" data-act="next-q" ${picked === null ? "disabled" : ""}>
          ${exam.idx === exam.questions.length - 1 ? esc(t("submit")) : esc(t("next"))}
        </button>
      </div>`;
  }

  function selectOption(i) {
    if (!exam) return;
    exam.answers[exam.idx] = i;
    const opts = document.querySelectorAll("#options .option");
    opts.forEach((el, idx) => {
      el.classList.toggle("selected", idx === i);
      el.setAttribute("aria-pressed", String(idx === i));
    });
    const next = $('[data-act="next-q"]');
    if (next) next.disabled = false;
  }

  function nextQuestion() {
    if (!exam) return;
    if (exam.answers[exam.idx] === null) return;
    if (exam.idx === exam.questions.length - 1) {
      if (confirm(t("confirmSubmit"))) finishExam();
      return;
    }
    exam.idx++;
    render();
  }

  function finishExam() {
    if (!exam) return;
    stopTimer();
    const score = exam.questions.reduce((s, q, i) => {
      const chosen = exam.answers[i];
      return s + (chosen !== null && q.options[chosen].correct ? 1 : 0);
    }, 0);

    const byTopic = {};
    exam.questions.forEach((q, i) => {
      byTopic[q.t] = byTopic[q.t] || { total: 0, correct: 0 };
      byTopic[q.t].total++;
      const chosen = exam.answers[i];
      if (chosen !== null && q.options[chosen].correct) byTopic[q.t].correct++;
    });

    const record = {
      date: new Date().toISOString(),
      score,
      total: exam.questions.length,
      pass: score >= PASS_MARK,
      byTopic
    };
    state.exams.push(record);
    if (state.exams.length > 50) state.exams = state.exams.slice(-50);

    Object.keys(byTopic).forEach((k) => {
      const s = topicStat(k);
      s.seen += byTopic[k].total;
      s.correct += byTopic[k].correct;
    });

    exam.result = record;
    exam.review = exam.questions.map((q, i) => ({
      q: q.q,
      img: q.img || null,
      topic: q.t,
      chosen: exam.answers[i],
      correctIndex: q.options.findIndex((o) => o.correct),
      options: q.options
    }));
    save();
    current = "result";
    render();
    window.scrollTo({ top: 0 });
  }

  /* ---------------------------------------------------------------- result */
  function renderResult() {
    if (!exam || !exam.result) return nav("home");
    const r = exam.result;
    const pct = Math.round((r.score / r.total) * 100);
    const topics = Object.keys(r.byTopic).map((k) => ({
      key: k,
      ...r.byTopic[k],
      pct: Math.round((r.byTopic[k].correct / r.byTopic[k].total) * 100)
    })).sort((a, b) => a.pct - b.pct);

    view.innerHTML = `
      <div class="stack">
        <div class="card score-hero">
          <div class="grade ${r.pass ? "pass" : "fail"}">
            <strong>${r.score}<span style="font-size:18px;color:var(--muted)">/${r.total}</span></strong>
            <span>${pct}%</span>
          </div>
          <h2>${esc(r.pass ? t("pass") : t("fail"))}</h2>
          <p>${esc(r.pass ? t("passMsg") : t("failMsg"))}</p>
        </div>

        <div class="card">
          <div class="row-between" style="margin-bottom:12px">
            <strong>${esc(t("breakdown"))}</strong>
            <span class="small muted">${r.correctAnswers || ""}</span>
          </div>
          <div class="bars">
            ${topics.map((x) => `
              <div class="bar-row">
                <div class="bar-top"><span>${esc(topicName(x.key))}</span><span>${x.correct}/${x.total}</span></div>
                <div class="bar-track"><i class="${x.pct >= 60 ? "ok" : "bad"}" style="width:${x.pct}%"></i></div>
              </div>`).join("")}
          </div>
        </div>

        <div class="row" style="gap:10px">
          <button class="btn btn-primary" data-act="start-exam">${esc(t("retry"))}</button>
          <button class="btn btn-ghost" data-act="go-home">${esc(t("backHome"))}</button>
        </div>

        <div>
          <div class="row-between" style="margin:6px 2px 12px">
            <strong>${esc(t("review"))}</strong>
            <span class="small muted">${r.score}/${r.total}</span>
          </div>
          ${exam.review.map((item, i) => {
            const chosen = item.chosen;
            const ok = chosen !== null && chosen === item.correctIndex;
            return `
              <div class="review-item">
                <div class="row-between">
                  <span class="tiny muted bold">${i + 1}. ${esc(topicName(item.topic))}</span>
                  <span class="tiny bold" style="color:${ok ? "var(--ok)" : "var(--bad)"}">${ok ? "✓" : "✗"}</span>
                </div>
                <div class="rq">${esc(item.q)}</div>
                ${item.img ? `<div class="qimg small"><img src="${esc(item.img)}" alt="" loading="lazy"></div>` : ""}
                <div class="ra">
                  <div><b>✓ ${esc(item.options[item.correctIndex].text)}</b></div>
                  ${ok ? "" : `<div class="yours" style="margin-top:4px">✗ ${chosen === null ? "—" : esc(item.options[chosen].text)}</div>`}
                </div>
              </div>`;
          }).join("")}
        </div>
      </div>`;
  }

  /* -------------------------------------------------------------- practice */
  function renderPracticePicker() {
    const keys = Object.keys(TOPICS);
    const weak = weakTopics();
    const recommended = weak.length ? weak[0].key : null;
    const pool = practicePool();
    const ids = new Set(pool.map((q) => q.id));
    const poolCount = (k) => pool.filter((q) => q.t === k).length;

    view.innerHTML = `
      <div class="screen-head">
        <h1>${esc(t("practice"))}</h1>
        <p>${esc(t("practiceSub"))}</p>
      </div>

      ${recommended ? `
        <div class="card" style="margin-bottom:14px">
          <div class="row-between">
            <div class="grow">
              <div class="tiny muted bold" style="text-transform:uppercase;letter-spacing:.08em">${esc(t("weak"))}</div>
              <div class="bold" style="margin-top:2px">${esc(topicName(recommended))}</div>
            </div>
            <button class="btn btn-primary btn-sm" data-topic="${recommended}">${esc(t("startNow"))}</button>
          </div>
        </div>` : ""}

      <div class="topic-grid">
        ${keys.map((k) => {
          const s = state.topics[k] || { seen: 0, correct: 0 };
          const pct = s.seen ? Math.round((s.correct / s.seen) * 100) : 0;
          const count = poolCount(k);
          return `
            <button class="topic" data-topic="${k}">
              <strong>${esc(topicName(k))}</strong>
              <span>${count} ${state.lang === "rw" ? "ibibazo" : "questions"}${s.seen ? " · " + pct + "%" : ""}</span>
              <span class="tbar"><i style="width:${pct}%"></i></span>
            </button>`;
        }).join("")}
      </div>

      ${isFull() ? "" : `<div class="banner" style="margin-top:14px">
        <svg class="bico" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-6h2zm0-8h-2V7h2z" fill="currentColor"/></svg>
        <div>${esc(t("paywallBank"))}</div>
      </div>`}
      <button class="btn btn-soft" style="margin-top:14px" data-topic="__img">
        ${esc(t("imageDrill"))} (${pool.filter((q) => q.img).length})
      </button>
      <button class="btn btn-ghost" style="margin-top:10px" data-topic="all">${esc(t("allTopics"))} (${pool.length})</button>`;
  }

  function startPractice(topic) {
    const base = practicePool();
    const ids = new Set(base.map((q) => q.id));
    let pool;
    if (topic === "all") pool = base.slice();
    else if (topic === "__img") pool = BANK.filter((q) => q.img && ids.has(q.id));
    else pool = BANK.filter((q) => q.t === topic && ids.has(q.id));
    if (!pool.length) { toast(t("noQuestions")); return; }
    practice = { topic, pool: shuffle(pool), idx: 0, answered: false, correctCount: 0 };
    current = "practice";
    render();
  }

  function renderPractice() {
    if (!practice) return renderPracticePicker();
    const q = practice.pool[practice.idx % practice.pool.length];
    const prepared = practice.current && practice.current.id === q.id ? practice.current : (practice.current = prep(q));
    const picked = practice.picked;

    view.innerHTML = `
      <div class="exam-bar" style="top:62px">
        <div>
          <div class="qcount">${esc(t("question"))} ${practice.idx + 1}</div>
          <div class="tiny muted">${esc(topicName(q.t))}</div>
        </div>
        <button class="btn btn-sm btn-ghost" data-act="exit-practice">${esc(t("back"))}</button>
      </div>

      <div class="progress" style="margin-bottom:18px"><i style="width:${((practice.idx) % practice.pool.length) / practice.pool.length * 100}%"></i></div>

      <div class="qtext">${esc(prepared.q)}</div>
      ${prepared.img ? `<div class="qimg"><img src="${esc(prepared.img)}" alt="" loading="lazy"></div>` : ""}

      <div class="options" id="options">
        ${prepared.options.map((o, i) => {
          let cls = "";
          if (practice.answered) {
            if (o.correct) cls = "correct";
            else if (picked === i) cls = "wrong";
          }
          return `
            <button class="option ${cls}" data-popt="${i}" ${practice.answered ? "disabled" : ""}>
              <span class="letter">${"abcd"[i]}</span>
              <span>${esc(o.text)}</span>
            </button>`;
        }).join("")}
      </div>

      ${practice.answered ? `
        <div class="explain">
          <strong>${esc((picked !== null && prepared.options[picked].correct ? "✓ " + t("correct") : "✗ " + t("wrong")) + " · " + t("guide"))}</strong>
          ${esc(prepared.e || (GUIDE[q.t] ? GUIDE[q.t][state.lang] || GUIDE[q.t].rw : ""))}
        </div>
        <button class="btn btn-primary" style="margin-top:14px" data-act="next-practice">${esc(t("nextQ"))}</button>
      ` : ""}`;
  }

  function answerPractice(i) {
    if (!practice || practice.answered) return;
    practice.picked = i;
    practice.answered = true;
    const q = practice.current;
    const ok = q.options[i].correct;
    practice.correctCount += ok ? 1 : 0;
    const s = topicStat(q.t);
    s.seen++;
    s.correct += ok ? 1 : 0;
    state.answered++;
    state.correct += ok ? 1 : 0;
    state.seen[q.id] = (state.seen[q.id] || 0) + 1;
    touchStreak();
    save();
    renderPractice();
  }

  function nextPractice() {
    if (!practice) return;
    practice.idx++;
    practice.answered = false;
    practice.picked = null;
    practice.current = null;
    render();
  }

  /* ----------------------------------------------------------------- signs */
  function renderSigns() {
    const keys = Object.keys(SIGNS);
    view.innerHTML = `
      <div class="screen-head">
        <h1>${esc(t("signsHeading"))}</h1>
        <p>${esc(t("signsHeadingSub"))}</p>
      </div>
      <div class="sign-grid">
        ${keys.map((k) => {
          const s = SIGNS[k];
          return `
            <button class="sign-card" data-sign="${k}">
              <span class="sig">${s.svg}</span>
              <strong>${esc(s.name[state.lang] || s.name.rw)}</strong>
              <span>${esc(s.type[state.lang] || s.type.rw)}</span>
            </button>`;
        }).join("")}
      </div>`;
  }

  let activeSign = null;

  function renderSignDetail() {
    const s = SIGNS[activeSign];
    if (!s) return nav("signs");
    view.innerHTML = `
      <div class="stack">
        <button class="btn btn-sm btn-ghost" style="width:auto" data-act="go-signs">← ${esc(t("back"))}</button>
        <div class="card sign-detail">
          <div class="big">${s.svg}</div>
          <h2>${esc(s.name[state.lang] || s.name.rw)}</h2>
          <div class="type">${esc(s.type[state.lang] || s.type.rw)}</div>
          <div class="divider"></div>
          <p style="margin:0;font-size:15px">${esc(s.meaning[state.lang] || s.meaning.rw)}</p>
        </div>
      </div>`;
  }

  /* ----------------------------------------------------------------- stats */
  function renderStats() {
    const exams = state.exams;
    const avg = exams.length ? (exams.reduce((s, e) => s + e.score, 0) / exams.length).toFixed(1) : "—";
    const best = exams.length ? Math.max.apply(null, exams.map((e) => e.score)) : "—";
    const acc = state.answered ? Math.round((state.correct / state.answered) * 100) : 0;
    const weak = weakTopics();

    view.innerHTML = `
      <div class="screen-head">
        <h1>${esc(t("statsTitle"))}</h1>
        <p>${esc(readinessLabel(readiness()))} · ${readiness()}%</p>
      </div>

      ${exams.length ? "" : `<div class="card center" style="padding:30px 18px">
        <div class="muted" style="margin-bottom:14px">${esc(t("noData"))}</div>
        <button class="btn btn-primary" data-act="start-exam">${esc(t("startExam"))}</button>
      </div>`}

      ${exams.length ? `
      <div class="card stack" style="margin-bottom:14px">
        <div class="stat-list">
          <div class="stat-line"><span>${esc(t("attempts"))}</span><b>${exams.length}</b></div>
          <div class="stat-line"><span>${esc(t("average"))}</span><b>${avg}/20</b></div>
          <div class="stat-line"><span>${esc(t("best"))}</span><b>${best}/20</b></div>
          <div class="stat-line"><span>${esc(t("accuracy"))}</span><b>${acc}%</b></div>
          <div class="stat-line"><span>${esc(t("streak"))}</span><b>${state.streak || 0}</b></div>
        </div>
      </div>

      <div class="card" style="margin-bottom:14px">
        <div class="row-between" style="margin-bottom:12px"><strong>${esc(t("breakdown"))}</strong></div>
        <div class="bars">
          ${Object.keys(TOPICS).map((k) => {
            const s = state.topics[k] || { seen: 0, correct: 0 };
            const pct = s.seen ? Math.round((s.correct / s.seen) * 100) : 0;
            return `
              <div class="bar-row">
                <div class="bar-top"><span>${esc(topicName(k))}</span><span>${s.seen ? pct + "%" : "—"}</span></div>
                <div class="bar-track"><i class="${pct >= 60 ? "ok" : "bad"}" style="width:${pct}%"></i></div>
              </div>`;
          }).join("")}
        </div>
      </div>` : ""}

      ${weak.length ? `
        <div class="card">
          <div class="bold" style="margin-bottom:10px">${esc(t("weakTopics"))}</div>
          ${weak.map((w) => `
            <div class="row-between" style="padding:9px 0;border-bottom:1px solid var(--line)">
              <span>${esc(topicName(w.key))}</span>
              <span class="row" style="gap:10px">
                <span class="small muted">${Math.round(w.pct * 100)}%</span>
                <button class="btn btn-sm btn-soft" data-topic="${w.key}">${esc(t("practice"))}</button>
              </span>
            </div>`).join("")}
        </div>` : ""}

      ${exams.length < 3 ? `<div class="banner" style="margin-top:14px">
        <svg class="bico" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-6h2zm0-8h-2V7h2z" fill="currentColor"/></svg>
        <div>${esc(t("needMore"))}</div>
      </div>` : ""}`;
  }

  /* -------------------------------------------------------------- accounts */
  let authTab = "signin";   // "signin" | "register"
  let authBusy = false;

  function renderAuth() {
    const u = authUser();
    if (u) return renderProfile();

    const isRegister = authTab === "register";
    view.innerHTML = `
      <div class="screen-head">
        <h1>${esc(t("account"))}</h1>
        <p>${esc(t("accountSub"))}</p>
      </div>

      <div class="seg" id="authSeg" style="margin-bottom:14px">
        <button data-atab="signin" class="${!isRegister ? "active" : ""}">${esc(t("signIn"))}</button>
        <button data-atab="register" class="${isRegister ? "active" : ""}">${esc(t("register"))}</button>
      </div>

      <div class="card">
        ${isRegister ? `
          <div class="field-col"><label>${esc(t("name"))}</label><input id="a_name" autocomplete="name"></div>` : ""}
        <div class="field-col"><label>${esc(t("email"))}</label><input id="a_email" type="email" autocomplete="email" placeholder="you@example.com"></div>
        ${isRegister ? `
          <div class="field-col"><label>${esc(t("phone"))}</label><input id="a_phone" type="tel" autocomplete="tel" placeholder="+2507..."></div>` : `
          <div class="tiny muted" style="margin-bottom:10px">${esc(t("email"))} / ${esc(t("phone"))}</div>`}
        <div class="field-col"><label>${esc(t("password"))}</label><input id="a_pass" type="password" autocomplete="${isRegister ? "new-password" : "current-password"}"></div>
        <button class="btn btn-primary" data-act="auth-submit" style="margin-top:6px">${esc(isRegister ? t("register") : t("signIn"))}</button>
        <div class="tiny muted" style="margin-top:10px">${esc(authMode() === "cloud" ? "Cloud accounts (Supabase)" : "Local accounts (this device only)")}</div>
      </div>`;

    document.querySelectorAll("[data-atab]").forEach((b) => {
      b.onclick = () => { authTab = b.dataset.atab; renderAuth(); };
    });
  }

  function renderProfile() {
    const u = authUser();
    const full = isFull();
    view.innerHTML = `
      <div class="screen-head">
        <h1>${esc(t("account"))}</h1>
        <p>${esc(full ? t("planFull") : t("planFree"))} · ${BANK.length} ${esc(state.lang === "rw" ? "ibibazo" : "questions")}</p>
      </div>

      <div class="card">
        <div class="row-between" style="margin-bottom:12px">
          <div class="bold">${esc(u.name || u.email || u.phone || t("account"))}</div>
          <span class="tiny bold" style="color:${full ? "var(--ok)" : "var(--muted)"}">${esc(full ? t("planFull") : t("planFree"))}</span>
        </div>
        <div class="field-col"><label>${esc(t("name"))}</label><input id="p_name" value="${esc(u.name)}"></div>
        <div class="field-col"><label>${esc(t("email"))}</label><input id="p_email" type="email" value="${esc(u.email)}"></div>
        <div class="field-col"><label>${esc(t("phone"))}</label><input id="p_phone" type="tel" value="${esc(u.phone)}"></div>
        <button class="btn btn-primary" data-act="save-profile" style="margin-top:6px">${esc(t("saveProfile"))}</button>
      </div>

      ${full ? "" : `
        <div class="card">
          <div class="bold" style="margin-bottom:6px">${esc(t("upgrade"))}</div>
          <div class="tiny muted" style="margin-bottom:10px">${esc(t("paywallBank"))}</div>
          <button class="btn btn-accent" data-act="go-settings">${esc(t("upgrade"))}</button>
        </div>`}

      <button class="btn btn-ghost" data-act="sign-out" style="margin-top:14px">${esc(t("signOut"))}</button>`;
  }

  async function submitAuth() {
    if (authBusy) return;
    const A = window.INZIRA_AUTH;
    if (!A) { toast(t("notSignedIn")); return; }
    const email = ($("#a_email") && $("#a_email").value) || "";
    const phone = ($("#a_phone") && $("#a_phone").value) || "";
    const pass = ($("#a_pass") && $("#a_pass").value) || "";
    const name = ($("#a_name") && $("#a_name").value) || "";
    authBusy = true;
    const res = authTab === "register"
      ? await A.signUp({ name, email, phone, password: pass })
      : await A.signIn({ identifier: email || phone, password: pass });
    authBusy = false;
    if (!res.ok) {
      const map = { exists: "acctExists", weak_password: "weakPassword", no_identity: "needIdentity",
                    no_user: "wrongCreds", bad_password: "wrongCreds", missing: "wrongCreds" };
      toast(t(map[res.error] || "wrongCreds"));
      return;
    }
    if (res.pending) { toast(t("checkEmail")); return; }
    toast(t("profileSaved"));
    current = "account";
    render();
    updateAccountBtn();
    pullSync();
  }

  async function saveProfile() {
    const A = window.INZIRA_AUTH;
    if (!A) return;
    const res = await A.update({
      name: $("#p_name").value.trim(),
      email: $("#p_email").value.trim(),
      phone: $("#p_phone").value.trim()
    });
    if (res.ok) toast(t("profileSaved"));
  }

  function signOut() {
    if (window.INZIRA_AUTH) window.INZIRA_AUTH.signOut();
    applyPlan(null);
    toast(t("signOut"));
    current = "home";
    render();
    updateAccountBtn();
  }

  function updateAccountBtn() {
    const btn = document.getElementById("accountBtn");
    if (!btn) return;
    btn.classList.toggle("on", !!authUser());
  }

  // Shown when a free account hits a limit. Sends them to the account screen,
  // where the school code / future MoMo payment unlocks the full bank.
  function paywall(reasonKey) {
    view.innerHTML = `
      <div class="screen-head">
        <h1>${esc(t("paywallTitle"))}</h1>
        <p>${esc(t("upgrade"))}</p>
      </div>
      <div class="card">
        <div class="small" style="margin-bottom:14px">${esc(t(reasonKey))}</div>
        <button class="btn btn-accent" data-act="go-account" style="margin-bottom:10px">${esc(authUser() ? t("upgrade") : t("signIn"))}</button>
        <button class="btn btn-ghost" data-act="go-home">${esc(t("backHome"))}</button>
      </div>`;
    current = "paywall";
    document.querySelectorAll(".tab").forEach((b) => b.classList.remove("active"));
    window.scrollTo({ top: 0 });
  }

  /* --------------------------------------------------------------- schools */
  // Look up a code in data/schools.js. Returns null when it is unknown, switched
  // off, or past its expiry date — so a leaked/old code simply stops working.
  function schoolEntry(code) {
    const key = String(code || "").trim().toUpperCase();
    const s = SCHOOLS[key];
    if (!s || s.active === false) return null;
    if (s.expires) {
      const end = new Date(s.expires + "T23:59:59");
      if (!isNaN(end.getTime()) && end < new Date()) return null;
    }
    return { code: key, name: s.name || key, seats: s.seats, expires: s.expires };
  }
  function schoolName(code) {
    const e = schoolEntry(code);
    return e ? e.name : null;
  }
  // Give this device the full plan for a school code.
  function applySchool(code) {
    const e = schoolEntry(code);
    if (!e) return null;
    state.premium = true;
    state.school = e.code;
    save();
    pushSchoolToProfile();
    return e;
  }
  // Record the learner's school on their account (best effort; needs sign-in).
  function pushSchoolToProfile() {
    if (!state.school || !cloudReady()) return;
    try { window.INZIRA_SYNC.pushProfile({ school_code: state.school }); } catch (e) { /* offline */ }
  }

  /* -------------------------------------------------------------- settings */
  const REVIEWER_CODES = { "UMWARIMU": true, "REVIEW2026": true };

  function renderSettings() {
    const installed = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
    view.innerHTML = `
      <div class="screen-head">
        <h1>${esc(t("settings"))}</h1>
        <p>${esc(t("about"))}</p>
      </div>

      <div class="stack">
        <div class="card">
          <div class="row-between" style="margin-bottom:10px">
            <div class="bold">${esc(t("account"))}</div>
            <span class="tiny bold" style="color:${isFull() ? "var(--ok)" : "var(--muted)"}">${esc(isFull() ? t("planFull") : t("planFree"))}</span>
          </div>
          <div class="small muted" style="margin-bottom:10px">${esc(authUser() ? (authUser().name || authUser().email || authUser().phone) : t("notSignedIn"))}</div>
          <button class="btn btn-primary" data-act="go-account">${esc(authUser() ? t("account") : t("signIn"))}</button>
        </div>

        <div class="card">
          <div class="bold" style="margin-bottom:10px">${esc(t("language"))}</div>
          <div class="seg" id="langSeg">
            <button data-lang="rw" class="${state.lang === "rw" ? "active" : ""}">Kinyarwanda</button>
            <button data-lang="en" class="${state.lang === "en" ? "active" : ""}">English</button>
            <button data-lang="fr" class="${state.lang === "fr" ? "active" : ""}">Français</button>
          </div>
        </div>

        <div class="card">
          <div class="row-between" style="margin-bottom:10px">
            <div class="bold">${esc(t("schoolCode"))}</div>
            <span class="tiny ${state.premium ? "bold" : "muted"}" style="color:${state.premium ? "var(--ok)" : ""}">
              ${state.premium ? "✓ " + esc(t("unlocked")) : ""}
            </span>
          </div>
          ${state.school && schoolName(state.school) ? `<div class="small muted" style="margin-bottom:10px">${esc(schoolName(state.school))}</div>` : ""}
          <div class="field">
            <input id="codeInput" type="text" inputmode="text" autocapitalize="characters" placeholder="INZIRA2026" value="${state.school ? esc(state.school) : ""}" ${state.premium ? "disabled" : ""}>
            <button class="btn btn-primary" style="width:auto;min-width:110px" data-act="unlock" ${state.premium ? "disabled" : ""}>${esc(t("unlock"))}</button>
          </div>
          <div class="tiny muted" style="margin-top:8px">${esc(t("pilotNote"))}</div>
        </div>

        <div class="card">
          <div class="row-between" style="margin-bottom:10px">
            <div class="bold">${esc(t("reviewer"))}</div>
            <span class="tiny ${state.reviewer ? "bold" : "muted"}" style="color:${state.reviewer ? "var(--ok)" : ""}">
              ${state.reviewer ? "✓ " + esc(t("reviewerUnlocked")) : ""}
            </span>
          </div>
          ${state.reviewer ? `
            <a class="btn btn-primary" href="tools/review.html" target="_blank" rel="noopener">${esc(t("openReviewer"))}</a>
            <div class="tiny muted" style="margin-top:8px">${esc(t("reviewerNote"))}</div>` : `
            <div class="field">
              <input id="reviewerInput" type="text" inputmode="text" autocapitalize="characters" placeholder="${esc(t("reviewerCode"))}">
              <button class="btn btn-primary" style="width:auto;min-width:110px" data-act="unlock-reviewer">${esc(t("unlock"))}</button>
            </div>`}
        </div>

        <div class="card">
          <div class="bold" style="margin-bottom:6px">${esc(t("install"))}</div>
          <div class="small muted">${esc(installed ? t("installed") : (state.lang === "rw" ? "Koresha menu ya browser: 'Add to Home screen'." : "Use your browser menu: 'Add to Home screen'."))}</div>
        </div>

        <div class="card">
          <div class="bold" style="margin-bottom:8px">${esc(t("about"))}</div>
          <div class="disclaimer">${esc(t("disclaimer"))}</div>
          <div class="divider"></div>
          <div class="tiny muted">
            <b>${esc(window.INZIRA_BANK ? window.INZIRA_BANK.version : "")}</b> · ${BANK.length} ${esc(state.lang === "rw" ? "ibibazo" : "questions")} ·
            <b>${BANK.filter((q) => q.img).length}</b> ${esc(t("withImages"))} · ${Object.keys(SIGNS).length} ${esc(state.lang === "rw" ? "bimenyetso" : "signs")}<br>
            ${esc(window.INZIRA_BANK ? window.INZIRA_BANK.updated : "")}
          </div>
          <button class="btn btn-ghost btn-sm" style="margin-top:12px" data-act="check-updates">${esc(t("checkUpdates"))}</button>
        </div>

        <button class="btn btn-danger" data-act="reset">${esc(t("reset"))}</button>
      </div>`;
  }

  function unlock() {
    const input = $("#codeInput");
    const code = (input.value || "").trim().toUpperCase();
    if (applySchool(code)) {
      toast(t("unlocked"));
      renderSettings();
    } else {
      toast(t("invalidCode"));
    }
  }

  function unlockReviewer() {
    const input = $("#reviewerInput");
    const code = (input.value || "").trim().toUpperCase();
    if (REVIEWER_CODES[code]) {
      state.reviewer = true;
      save();
      toast(t("reviewerUnlocked"));
      renderSettings();
    } else {
      toast(t("invalidCode"));
    }
  }

  // Force the newest content: drop the offline cache and any installed worker,
  // then reload. This is the cure for a device stuck on an old bundle.
  async function checkUpdates() {
    try {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((r) => r.unregister()));
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    } catch (e) { /* ignore */ }
    toast(t("updatesDone"));
    setTimeout(() => location.reload(), 600);
  }

  /* ------------------------------------------------------------------ wire */
  document.querySelectorAll(".tab").forEach((btn) => {
    btn.addEventListener("click", () => nav(btn.dataset.nav));
  });

  $("#langBtn").addEventListener("click", () => {
    const order = ["rw", "en", "fr"];
    state.lang = order[(order.indexOf(state.lang) + 1) % order.length];
    save();
    $("#langBtn").textContent = state.lang.toUpperCase();
    $("#brandSub").textContent = t("tagline");
    render();
  });

  view.addEventListener("click", (e) => {
    const opt = e.target.closest("[data-opt]");
    if (opt) { selectOption(Number(opt.dataset.opt)); return; }

    const popt = e.target.closest("[data-popt]");
    if (popt) { answerPractice(Number(popt.dataset.popt)); return; }

    const sign = e.target.closest("[data-sign]");
    if (sign) { activeSign = sign.dataset.sign; current = "sign"; render(); window.scrollTo({ top: 0 }); return; }

    const topic = e.target.closest("[data-topic]");
    if (topic) { startPractice(topic.dataset.topic); return; }

    const lang = e.target.closest("[data-lang]");
    if (lang) {
      state.lang = lang.dataset.lang;
      save();
      $("#langBtn").textContent = state.lang.toUpperCase();
      $("#brandSub").textContent = t("tagline");
      render();
      return;
    }

    const act = e.target.closest("[data-act]");
    if (!act) return;

    switch (act.dataset.act) {
      case "start-exam": openExamIntro(); break;
      case "begin-exam": startExam(); break;
      case "go-practice": nav("practice"); break;
      case "go-signs": nav("signs"); break;
      case "go-weak": {
        const w = weakTopics();
        if (w.length) startPractice(w[0].key);
        break;
      }
      case "go-settings": nav("settings"); break;
      case "go-home": nav("home"); break;
      case "next-q": nextQuestion(); break;
      case "prev-q": if (exam && exam.idx > 0) { exam.idx--; render(); } break;
      case "quit-exam":
        if (confirm(t("quitConfirm"))) { stopTimer(); exam = null; nav("home"); }
        break;
      case "next-practice": nextPractice(); break;
      case "exit-practice": practice = null; nav("practice"); break;
      case "unlock": unlock(); break;
      case "unlock-reviewer": unlockReviewer(); break;
      case "check-updates": checkUpdates(); break;
      case "go-account": nav("account"); break;
      case "auth-submit": submitAuth(); break;
      case "save-profile": saveProfile(); break;
      case "sign-out": signOut(); break;
      case "reset":
        if (confirm(t("resetConfirm"))) {
          state = defaults();
          save();
          toast(t("ok"));
          nav("home");
        }
        break;
    }
  });

  window.addEventListener("scroll", () => {
    const bar = $(".topbar");
    if (bar) bar.classList.toggle("scrolled", window.scrollY > 6);
  }, { passive: true });

  /* --------------------------------------------------------------- startup */
  load();

  // School auto-unlock: a link like .../?school=KIGALI01 (from a school's QR or
  // enrolment form) unlocks the full app on this device. Works fully offline,
  // because the registry ships in data/schools.js.
  (function unlockFromUrl() {
    try {
      const params = new URLSearchParams(location.search);
      const code = params.get("school") || params.get("s");
      if (!code) return;
      if (state.premium && state.school) return; // already unlocked here
      const e = applySchool(code);
      if (e) autoSchoolName = e.name;
      else toast(t("invalidCode"));
    } catch (err) { /* malformed URL: ignore */ }
  })();
  $("#langBtn").textContent = state.lang.toUpperCase();
  $("#brandSub").textContent = t("tagline");
  if (state.lang !== "rw") document.documentElement.lang = state.lang;

  const acctBtn = document.getElementById("accountBtn");
  if (acctBtn) acctBtn.addEventListener("click", () => nav("account"));
  if (window.INZIRA_AUTH) {
    window.INZIRA_AUTH.onChange(() => {
      updateAccountBtn();
      if (authUser() && cloudReady()) pullSync();
      else if (current === "account") render();
    });
  }

  render();
  updateAccountBtn();
  if (autoSchoolName) toast(t("schoolWelcome") + ": " + autoSchoolName);

  // If a cloud account is already signed in on this device, pull progress.
  if (cloudReady()) pullSync();

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }
})();
