/* Inzira sign library - offline SVG teaching cards.
 * These are teaching illustrations, not official reproductions.
 * Every entry carries rw / en / fr so the language switch works everywhere.
 */
window.SIGNS = {
  stop: {
    name: { rw: "Hagarara (STOP)", en: "Stop", fr: "Arrêt" },
    type: { rw: "Itegeko", en: "Mandatory", fr: "Obligation" },
    svg: `<svg viewBox="0 0 100 100" role="img" aria-label="Icyapa STOP"><polygon points="31,4 69,4 96,31 96,69 69,96 31,96 4,69 4,31" fill="#c8102e" stroke="#fff" stroke-width="5"/><text x="50" y="58" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="25" font-weight="700" fill="#fff">STOP</text></svg>`,
    meaning: { rw: "Hagarara burundu mbere y'umurongo, hanyuma ukomeze gusa iyo bibaye ngombwa kandi bitekanye.", en: "Come to a complete stop before the line, then proceed only when safe.", fr: "Arrêtez-vous complètement avant la ligne, puis repartez seulement si c'est sûr." }
  },
  giveway: {
    name: { rw: "Tanga inzira", en: "Give way", fr: "Cédez le passage" },
    type: { rw: "Uburenganzira", en: "Priority", fr: "Priorité" },
    svg: `<svg viewBox="0 0 100 100" role="img" aria-label="Icyapa tanga inzira"><polygon points="50,94 3,12 97,12" fill="#c8102e" stroke="#fff" stroke-width="4"/><polygon points="50,76 22,24 78,24" fill="#fff"/></svg>`,
    meaning: { rw: "Tanga inzira ku binyabiziga biri ku muhanda winjiramo.", en: "Give way to traffic on the road you are joining.", fr: "Cédez le passage aux véhicules sur la route que vous rejoignez." }
  },
  noentry: {
    name: { rw: "Ntihanyurwa", en: "No entry", fr: "Sens interdit" },
    type: { rw: "Kubuza", en: "Prohibitory", fr: "Interdiction" },
    svg: `<svg viewBox="0 0 100 100" role="img" aria-label="Icyapa ntihanyurwa"><circle cx="50" cy="50" r="45" fill="#c8102e"/><rect x="20" y="41" width="60" height="18" rx="3" fill="#fff"/></svg>`,
    meaning: { rw: "Ntukinjire muri uyu muhanda uva mu cyerekezo ukiramo.", en: "Do not enter this road from this direction.", fr: "N'entrez pas dans cette route depuis cette direction." }
  },
  speed60: {
    name: { rw: "Umuvuduko ntarengwa 60", en: "Maximum 60 km/h", fr: "Maximum 60 km/h" },
    type: { rw: "Kubuza", en: "Prohibitory", fr: "Interdiction" },
    svg: `<svg viewBox="0 0 100 100" role="img" aria-label="Icyapa umuvuduko 60"><circle cx="50" cy="50" r="45" fill="#fff" stroke="#c8102e" stroke-width="10"/><text x="50" y="62" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="36" font-weight="700" fill="#111">60</text></svg>`,
    meaning: { rw: "Nturenze 60 km/h kugeza aho umuvuduko urangirira cyangwa ikindi cyapa ukawuhindura.", en: "Do not exceed 60 km/h until the limit ends or another sign changes it.", fr: "Ne dépassez pas 60 km/h jusqu'à la fin de la limitation ou un autre panneau." }
  },
  pedestrian: {
    name: { rw: "Ahanyura abanyamaguru", en: "Pedestrian crossing", fr: "Passage piétons" },
    type: { rw: "Uburenganzira", en: "Priority", fr: "Priorité" },
    svg: `<svg viewBox="0 0 100 100" role="img" aria-label="Icyapa abanyamaguru"><rect x="5" y="5" width="90" height="90" rx="8" fill="#0057b8"/><polygon points="50,16 88,80 12,80" fill="#fff"/><circle cx="50" cy="38" r="7" fill="#111"/><path d="M50 46 L50 64 M50 50 L40 58 M50 50 L61 57 M50 64 L41 76 M50 64 L59 76" stroke="#111" stroke-width="5" stroke-linecap="round" fill="none"/><g fill="#111"><rect x="24" y="80" width="10" height="4"/><rect x="39" y="80" width="10" height="4"/><rect x="54" y="80" width="10" height="4"/><rect x="69" y="80" width="10" height="4"/></g></svg>`,
    meaning: { rw: "Ahanyura abanyamaguru: gabanya umuvuduko kandi utange inzira ku bambuka.", en: "Pedestrian crossing: slow down and give way to people crossing.", fr: "Passage piétons : ralentissez et cédez le passage." }
  },
  noparking: {
    name: { rw: "Ntihahagararwa", en: "No parking", fr: "Stationnement interdit" },
    type: { rw: "Kubuza", en: "Prohibitory", fr: "Interdiction" },
    svg: `<svg viewBox="0 0 100 100" role="img" aria-label="Icyapa ntihahagararwa"><circle cx="50" cy="50" r="45" fill="#0057b8" stroke="#c8102e" stroke-width="9"/><line x1="23" y1="23" x2="77" y2="77" stroke="#c8102e" stroke-width="10" stroke-linecap="round"/></svg>`,
    meaning: { rw: "Ntushobora guhagarika ikinyabiziga aha.", en: "You may not park here.", fr: "Vous ne pouvez pas stationner ici." }
  },
  noovertaking: {
    name: { rw: "Ntukunyuranaho", en: "No overtaking", fr: "Dépassement interdit" },
    type: { rw: "Kubuza", en: "Prohibitory", fr: "Interdiction" },
    svg: `<svg viewBox="0 0 100 100" role="img" aria-label="Icyapa ntukunyuranaho"><circle cx="50" cy="50" r="45" fill="#fff" stroke="#c8102e" stroke-width="9"/><g><rect x="22" y="42" width="20" height="26" rx="4" fill="#111"/><rect x="26" y="34" width="12" height="10" rx="3" fill="#111"/></g><g><rect x="58" y="42" width="20" height="26" rx="4" fill="#c8102e"/><rect x="62" y="34" width="12" height="10" rx="3" fill="#c8102e"/></g></svg>`,
    meaning: { rw: "Gukunyuraho birabujijwe kugeza icyapa kirangiye.", en: "Overtaking is prohibited until the sign ends.", fr: "Le dépassement est interdit jusqu'à la fin du panneau." }
  },
  children: {
    name: { rw: "Abana / ishuri", en: "Children / school", fr: "Enfants / école" },
    type: { rw: "Iburira", en: "Warning", fr: "Danger" },
    svg: `<svg viewBox="0 0 100 100" role="img" aria-label="Icyapa abana"><polygon points="50,6 96,88 4,88" fill="#f7c600" stroke="#c8102e" stroke-width="7"/><circle cx="40" cy="46" r="6" fill="#111"/><path d="M40 53 L40 68 M40 57 L32 64 M40 57 L48 63 M40 68 L34 80 M40 68 L46 80" stroke="#111" stroke-width="4" stroke-linecap="round" fill="none"/><circle cx="62" cy="50" r="5" fill="#111"/><path d="M62 56 L62 69 M62 59 L55 65 M62 59 L69 64 M62 69 L57 80 M62 69 L67 80" stroke="#111" stroke-width="4" stroke-linecap="round" fill="none"/></svg>`,
    meaning: { rw: "Ishuri cyangwa abana bari hafi: gabanya umuvuduko kandi witegure guhagarara.", en: "School or children nearby: slow down and be ready to stop.", fr: "École ou enfants à proximité : ralentissez et soyez prêt à vous arrêter." }
  },
  slippery: {
    name: { rw: "Umuhanda unyerera", en: "Slippery road", fr: "Route glissante" },
    type: { rw: "Iburira", en: "Warning", fr: "Danger" },
    svg: `<svg viewBox="0 0 100 100" role="img" aria-label="Icyapa umuhanda unyerera"><polygon points="50,6 96,88 4,88" fill="#f7c600" stroke="#c8102e" stroke-width="7"/><rect x="34" y="55" width="30" height="14" rx="4" fill="#111"/><rect x="40" y="48" width="18" height="9" rx="3" fill="#111"/><path d="M26 76 q8 -6 16 0 t16 0 t16 0" stroke="#111" stroke-width="3" fill="none"/><path d="M30 68 q6 -4 12 0" stroke="#111" stroke-width="3" fill="none"/></svg>`,
    meaning: { rw: "Umuhanda ushobora kuba unyerera: gabanya umuvuduko kandi wirinde gufata feri mu buryo bukaze.", en: "The road may be slippery: reduce speed and avoid sudden braking.", fr: "La chaussée peut être glissante : ralentissez et évitez les freinages brusques." }
  },
  roadworks: {
    name: { rw: "Ibikorwa byo mu muhanda", en: "Road works", fr: "Travaux" },
    type: { rw: "Iburira", en: "Warning", fr: "Danger" },
    svg: `<svg viewBox="0 0 100 100" role="img" aria-label="Icyapa ibikorwa byo mu muhanda"><polygon points="50,6 96,88 4,88" fill="#f7c600" stroke="#c8102e" stroke-width="7"/><circle cx="50" cy="40" r="6" fill="#111"/><path d="M50 47 L50 68 M50 52 L40 60 M50 52 L61 62 M50 68 L42 80 M50 68 L58 80" stroke="#111" stroke-width="4" stroke-linecap="round" fill="none"/><path d="M64 44 L76 70" stroke="#111" stroke-width="4" stroke-linecap="round"/><path d="M70 66 L80 66" stroke="#111" stroke-width="4" stroke-linecap="round"/></svg>`,
    meaning: { rw: "Hari ibikorwa imbere: gabanya umuvuduko kandi ukurikire ibimenyetso by'agateganyo.", en: "Road works ahead: slow down and follow temporary signs.", fr: "Travaux devant : ralentissez et suivez la signalisation temporaire." }
  },
  mandatory: {
    name: { rw: "Icyerekezo gitegetswe", en: "Mandatory direction", fr: "Direction obligatoire" },
    type: { rw: "Itegeko", en: "Mandatory", fr: "Obligation" },
    svg: `<svg viewBox="0 0 100 100" role="img" aria-label="Icyapa icyerekezo gitegetswe"><circle cx="50" cy="50" r="45" fill="#0057b8"/><path d="M50 78 L50 30" stroke="#fff" stroke-width="12" stroke-linecap="round"/><path d="M32 46 L50 26 L68 46" stroke="#fff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
    meaning: { rw: "Ugomba kugenda mu cyerekezo kigaragazwa.", en: "You must travel in the direction shown.", fr: "Vous devez circuler dans la direction indiquée." }
  },
  trafficlight: {
    name: { rw: "Amatara y'isangano", en: "Traffic light", fr: "Feu de circulation" },
    type: { rw: "Ikimenyetso", en: "Signal", fr: "Signal" },
    svg: `<svg viewBox="0 0 100 100" role="img" aria-label="Amatara y'isangano"><rect x="34" y="6" width="32" height="88" rx="10" fill="#1b1b1b"/><circle cx="50" cy="28" r="11" fill="#e53935"/><circle cx="50" cy="52" r="11" fill="#f7c600" opacity="0.35"/><circle cx="50" cy="76" r="11" fill="#2e7d32" opacity="0.35"/></svg>`,
    meaning: { rw: "Umutuku = hagarara; umuhondo = witegure guhagarara; icyatsi = komeza gusa iyo inzira iriho.", en: "Red = stop; amber = prepare to stop; green = go only if the way is clear.", fr: "Rouge = arrêt ; orange = préparez-vous à arrêter ; vert = passez si la voie est libre." }
  },
  brokenline: {
    name: { rw: "Umurongo ucagaguye", en: "Broken centre line", fr: "Ligne discontinue" },
    type: { rw: "Ikimenyetso cyo mu muhanda", en: "Road marking", fr: "Marquage" },
    svg: `<svg viewBox="0 0 100 100" role="img" aria-label="Umurongo wera ucagaguye"><rect width="100" height="100" fill="#4a4a4a"/><g fill="#fff"><rect x="44" y="4" width="12" height="22"/><rect x="44" y="38" width="12" height="22"/><rect x="44" y="72" width="12" height="22"/></g></svg>`,
    meaning: { rw: "Ushobora kwambuka umurongo ucagaguye niba ushaka kunyuranaho kandi bitekanye.", en: "You may cross a broken line to overtake when it is safe.", fr: "Vous pouvez franchir une ligne discontinue pour dépasser si c'est sûr." }
  },
  solidline: {
    name: { rw: "Umurongo ukomeye", en: "Solid centre line", fr: "Ligne continue" },
    type: { rw: "Ikimenyetso cyo mu muhanda", en: "Road marking", fr: "Marquage" },
    svg: `<svg viewBox="0 0 100 100" role="img" aria-label="Umurongo wera ukomeye"><rect width="100" height="100" fill="#4a4a4a"/><rect x="44" y="4" width="12" height="92" fill="#fff"/></svg>`,
    meaning: { rw: "Nturenge umurongo ukomeye kandi ntukunyuranaho.", en: "Do not cross or overtake on a solid line.", fr: "Ne franchissez pas une ligne continue et ne dépassez pas." }
  },
  roundabout: {
    name: { rw: "Inkomane izenguruka", en: "Roundabout", fr: "Rond-point" },
    type: { rw: "Iburira", en: "Warning", fr: "Danger" },
    svg: `<svg viewBox="0 0 100 100" role="img" aria-label="Icyapa inkomane izenguruka"><polygon points="50,6 96,88 4,88" fill="#f7c600" stroke="#c8102e" stroke-width="7"/><circle cx="50" cy="62" r="14" fill="none" stroke="#111" stroke-width="5"/><path d="M50 44 L50 36" stroke="#111" stroke-width="5"/><path d="M44 42 L50 34 L56 42" stroke="#111" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M64 62 L72 62" stroke="#111" stroke-width="5"/><path d="M69 56 L77 62 L69 68" stroke="#111" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M36 62 L28 62" stroke="#111" stroke-width="5"/><path d="M31 56 L23 62 L31 68" stroke="#111" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`,
    meaning: { rw: "Inkomane izenguruka imbere: gabanya umuvuduko kandi utange inzira ku binyabiziga bisanzwe bizenguruka.", en: "Roundabout ahead: slow down and give way to traffic already circulating.", fr: "Rond-point devant : ralentissez et cédez le passage aux véhicules engagés." }
  },
  narrow: {
    name: { rw: "Umuhanda muto", en: "Road narrows", fr: "Chaussée rétrécie" },
    type: { rw: "Iburira", en: "Warning", fr: "Danger" },
    svg: `<svg viewBox="0 0 100 100" role="img" aria-label="Icyapa umuhanda muto"><polygon points="50,6 96,88 4,88" fill="#f7c600" stroke="#c8102e" stroke-width="7"/><path d="M32 80 L40 40 L60 40 L68 80" stroke="#111" stroke-width="6" fill="none" stroke-linejoin="round"/></svg>`,
    meaning: { rw: "Umuhanda ugenda uto: gabanya umuvuduko kandi witegure guhura n'ibinyabiziga bindi.", en: "The road narrows ahead: slow down and expect oncoming traffic.", fr: "La chaussée se rétrécit : ralentissez et attendez-vous à du trafic." }
  },
  steep: {
    name: { rw: "Akazamuko gashinze", en: "Steep hill", fr: "Forte pente" },
    type: { rw: "Iburira", en: "Warning", fr: "Danger" },
    svg: `<svg viewBox="0 0 100 100" role="img" aria-label="Icyapa akazamuko"><polygon points="50,6 96,88 4,88" fill="#f7c600" stroke="#c8102e" stroke-width="7"/><path d="M18 82 L82 42" stroke="#111" stroke-width="7" stroke-linecap="round"/><path d="M18 82 L82 82" stroke="#111" stroke-width="5"/></svg>`,
    meaning: { rw: "Akazamuko gashinze: koresha umwanya muto (low gear) kandi wirinde guhagarara ku muvuduko.", en: "Steep hill: use a low gear and avoid stopping on the slope.", fr: "Forte pente : utilisez un rapport court et évitez de vous arrêter." }
  },
  crossroad: {
    name: { rw: "Inkomane", en: "Crossroads", fr: "Intersection" },
    type: { rw: "Iburira", en: "Warning", fr: "Danger" },
    svg: `<svg viewBox="0 0 100 100" role="img" aria-label="Icyapa inkomane"><polygon points="50,6 96,88 4,88" fill="#f7c600" stroke="#c8102e" stroke-width="7"/><path d="M50 82 L50 42" stroke="#111" stroke-width="7"/><path d="M50 62 L28 46" stroke="#111" stroke-width="7"/><path d="M50 62 L72 46" stroke="#111" stroke-width="7"/></svg>`,
    meaning: { rw: "Inkomane imbere: gabanya umuvuduko kandi witegure gutanga inzira.", en: "Crossroads ahead: slow down and be ready to give way.", fr: "Intersection devant : ralentissez et préparez-vous à céder le passage." }
  },
  oncoming: {
    name: { rw: "Ibinyabiziga biva imbere", en: "Two-way traffic", fr: "Circulation à double sens" },
    type: { rw: "Iburira", en: "Warning", fr: "Danger" },
    svg: `<svg viewBox="0 0 100 100" role="img" aria-label="Icyapa ibinyabiziga biva imbere"><polygon points="50,6 96,88 4,88" fill="#f7c600" stroke="#c8102e" stroke-width="7"/><path d="M40 80 L40 30" stroke="#111" stroke-width="6"/><path d="M33 40 L40 28 L47 40" stroke="#111" stroke-width="6" fill="none"/><path d="M60 20 L60 70" stroke="#111" stroke-width="6"/><path d="M53 60 L60 72 L67 60" stroke="#111" stroke-width="6" fill="none"/></svg>`,
    meaning: { rw: "Hari ibinyabiziga biva mu cyerekezo gitandukanye: komeza mu ruhande rwawe rw'iburyo.", en: "Oncoming traffic: keep to your side of the road.", fr: "Trafic en sens inverse : restez de votre côté de la route." }
  },
  nocycle: {
    name: { rw: "Nta magare", en: "No bicycles", fr: "Vélos interdits" },
    type: { rw: "Kubuza", en: "Prohibitory", fr: "Interdiction" },
    svg: `<svg viewBox="0 0 100 100" role="img" aria-label="Icyapa nta magare"><circle cx="50" cy="50" r="45" fill="#fff" stroke="#c8102e" stroke-width="9"/><circle cx="34" cy="62" r="13" fill="none" stroke="#111" stroke-width="4"/><circle cx="66" cy="62" r="13" fill="none" stroke="#111" stroke-width="4"/><path d="M34 62 L46 40 L60 40 L66 62 M46 40 L50 62 L34 62" stroke="#111" stroke-width="4" fill="none"/><line x1="22" y1="22" x2="78" y2="78" stroke="#c8102e" stroke-width="9" stroke-linecap="round"/></svg>`,
    meaning: { rw: "Amagare ntayemerewe kunyura aha.", en: "Bicycles are not allowed here.", fr: "Les vélos ne sont pas autorisés ici." }
  }
};
