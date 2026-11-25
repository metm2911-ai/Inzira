/* Inzira question bank — v0.9 (pilot)
 * Source: Rwanda road code / RNP public guidance.
 * EN + FR reviewed. Kinyarwanda translations are pending a native driving-instructor review.
 * Every item must be re-checked against the current official booklet before launch.
 */
window.QUESTION_BANK = [
  /* ---------------- SIGNS ---------------- */
  {
    id: "S01", topic: "signs", sign: "stop",
    q: { en: "What must you do when you see this sign?", fr: "Que devez-vous faire lorsque vous voyez ce panneau ?" },
    o: [
      { en: "Stop completely before the line", fr: "S'arrêter complètement avant la ligne" },
      { en: "Slow down only if traffic is coming", fr: "Ralentir seulement si un véhicule arrive" },
      { en: "Sound your horn and continue", fr: "Klaxonner et continuer" },
      { en: "Stop only at night", fr: "S'arrêter seulement la nuit" }
    ],
    a: 0,
    e: { en: "A stop sign requires a complete stop, even when the road looks clear.", fr: "Un panneau STOP exige un arrêt complet, même si la route semble libre." }
  },
  {
    id: "S02", topic: "signs", sign: "giveway",
    q: { en: "What does this sign mean?", fr: "Que signifie ce panneau ?" },
    o: [
      { en: "You have priority", fr: "Vous avez la priorité" },
      { en: "Give way to traffic on the road you are joining", fr: "Cédez le passage aux véhicules sur la route que vous rejoignez" },
      { en: "No entry", fr: "Sens interdit" },
      { en: "Pedestrian crossing", fr: "Passage piétons" }
    ],
    a: 1,
    e: { en: "The inverted triangle means give way.", fr: "Le triangle inversé signifie cédez le passage." }
  },
  {
    id: "S03", topic: "signs", sign: "noentry",
    q: { en: "What does this sign mean?", fr: "Que signifie ce panneau ?" },
    o: [
      { en: "No entry for any vehicle", fr: "Sens interdit à tous les véhicules" },
      { en: "One-way road", fr: "Sens unique" },
      { en: "No parking", fr: "Stationnement interdit" },
      { en: "End of speed limit", fr: "Fin de limitation de vitesse" }
    ],
    a: 0,
    e: { en: "The red disc with a white bar means no entry.", fr: "Le disque rouge avec une barre blanche interdit l'entrée." }
  },
  {
    id: "S04", topic: "signs", sign: "speed60",
    q: { en: "What does this sign mean?", fr: "Que signifie ce panneau ?" },
    o: [
      { en: "Minimum speed 60 km/h", fr: "Vitesse minimale 60 km/h" },
      { en: "Maximum speed 60 km/h", fr: "Vitesse maximale 60 km/h" },
      { en: "Road 60 metres ahead", fr: "Route à 60 mètres" },
      { en: "60 km to the next town", fr: "60 km jusqu'à la prochaine ville" }
    ],
    a: 1,
    e: { en: "The number inside a red circle is the maximum permitted speed.", fr: "Le chiffre dans le disque rouge indique la vitesse maximale autorisée." }
  },
  {
    id: "S05", topic: "signs", sign: "pedestrian",
    q: { en: "You see this sign and a pedestrian is waiting at the crossing. What should you do?", fr: "Vous voyez ce panneau et un piéton attend au passage. Que faites-vous ?" },
    o: [
      { en: "Speed up", fr: "Accélérer" },
      { en: "Stop and give way", fr: "S'arrêter et lui céder le passage" },
      { en: "Sound your horn", fr: "Klaxonner" },
      { en: "Pass on the left", fr: "Le dépasser par la gauche" }
    ],
    a: 1,
    e: { en: "At a marked crossing you must give way to pedestrians.", fr: "Au passage piéton, vous devez céder le passage." }
  },
  {
    id: "S06", topic: "signs", sign: "noparking",
    q: { en: "What does this sign mean?", fr: "Que signifie ce panneau ?" },
    o: [
      { en: "No stopping at any time", fr: "Arrêt interdit à tout moment" },
      { en: "No parking", fr: "Stationnement interdit" },
      { en: "Parking for residents only", fr: "Stationnement réservé aux riverains" },
      { en: "End of parking area", fr: "Fin de zone de stationnement" }
    ],
    a: 1,
    e: { en: "The blue disc with a red border and slash means no parking.", fr: "Le disque bleu barré de rouge interdit le stationnement." }
  },
  {
    id: "S07", topic: "signs", sign: "noovertaking",
    q: { en: "What does this sign mean?", fr: "Que signifie ce panneau ?" },
    o: [
      { en: "No overtaking", fr: "Dépassement interdit" },
      { en: "Overtaking allowed on the left", fr: "Dépassement autorisé par la gauche" },
      { en: "Two-way traffic", fr: "Circulation à double sens" },
      { en: "No entry for cars", fr: "Entrée interdite aux voitures" }
    ],
    a: 0,
    e: { en: "The two cars in a red circle mean overtaking is prohibited.", fr: "Les deux voitures dans le disque rouge signalent l'interdiction de dépasser." }
  },
  {
    id: "S08", topic: "signs", sign: "children",
    q: { en: "What does this sign warn you about?", fr: "Que signale ce panneau ?" },
    o: [
      { en: "Road works", fr: "Travaux" },
      { en: "Children / school zone", fr: "Zone scolaire / enfants" },
      { en: "Pedestrian crossing", fr: "Passage piétons" },
      { en: "School parking", fr: "Parking de l'école" }
    ],
    a: 1,
    e: { en: "The yellow triangle with children warns of a school zone.", fr: "Le triangle jaune avec des enfants annonce une zone scolaire." }
  },
  {
    id: "S09", topic: "signs", sign: "slippery",
    q: { en: "What does this sign warn you about?", fr: "Que signale ce panneau ?" },
    o: [
      { en: "Slippery road", fr: "Route glissante" },
      { en: "Steep hill", fr: "Descente raide" },
      { en: "Loose gravel", fr: "Gravillons" },
      { en: "Flood", fr: "Inondation" }
    ],
    a: 0,
    e: { en: "The skidding car warns of a slippery road.", fr: "La voiture qui glisse signale une chaussée glissante." }
  },
  {
    id: "S10", topic: "signs", sign: "roadworks",
    q: { en: "What does this sign mean?", fr: "Que signifie ce panneau ?" },
    o: [
      { en: "Road works ahead", fr: "Travaux routiers devant" },
      { en: "Factory ahead", fr: "Usine devant" },
      { en: "No pedestrians", fr: "Piétons interdits" },
      { en: "End of road", fr: "Fin de route" }
    ],
    a: 0,
    e: { en: "The worker sign warns of road works.", fr: "L'ouvrier signale des travaux sur la route." }
  },
  {
    id: "S11", topic: "signs", sign: "mandatory",
    q: { en: "What does a blue circular sign with a white arrow mean?", fr: "Que signifie un panneau rond bleu avec une flèche blanche ?" },
    o: [
      { en: "You must go in the direction shown", fr: "Vous devez aller dans la direction indiquée" },
      { en: "You may go in any direction", fr: "Vous pouvez aller dans toutes les directions" },
      { en: "No entry", fr: "Sens interdit" },
      { en: "Parking allowed", fr: "Stationnement autorisé" }
    ],
    a: 0,
    e: { en: "Blue circular signs are mandatory instructions.", fr: "Les panneaux ronds bleus sont des obligations." }
  },
  {
    id: "S12", topic: "signs", sign: "trafficlight",
    q: { en: "The traffic light is red. What must you do?", fr: "Le feu est rouge. Que devez-vous faire ?" },
    o: [
      { en: "Stop before the stop line", fr: "S'arrêter avant la ligne d'arrêt" },
      { en: "Slow down and continue", fr: "Ralentir et continuer" },
      { en: "Turn left only", fr: "Tourner à gauche uniquement" },
      { en: "Sound your horn", fr: "Klaxonner" }
    ],
    a: 0,
    e: { en: "A red light means stop before the line.", fr: "Le feu rouge impose l'arrêt avant la ligne." }
  },
  {
    id: "S13", topic: "signs", sign: "trafficlight",
    q: { en: "The light turns amber as you approach. What should you do?", fr: "Le feu passe à l'orange alors que vous approchez. Que faites-vous ?" },
    o: [
      { en: "Always accelerate", fr: "Toujours accélérer" },
      { en: "Stop if you can do so safely", fr: "S'arrêter si vous pouvez le faire en sécurité" },
      { en: "Reverse", fr: "Reculer" },
      { en: "Continue at the same speed regardless", fr: "Continuer à la même vitesse" }
    ],
    a: 1,
    e: { en: "Amber warns that red is coming: stop if it is safe.", fr: "L'orange annonce le rouge : arrêtez-vous si c'est sûr." }
  },
  {
    id: "S14", topic: "signs", sign: "brokenline",
    q: { en: "What does a broken white centre line mean?", fr: "Que signifie une ligne blanche discontinue au centre ?" },
    o: [
      { en: "You may cross it to overtake when it is safe", fr: "Vous pouvez la franchir pour dépasser si c'est sûr" },
      { en: "Never cross it", fr: "Ne jamais la franchir" },
      { en: "Parking is allowed", fr: "Stationnement autorisé" },
      { en: "One-way road", fr: "Route à sens unique" }
    ],
    a: 0,
    e: { en: "A broken line may be crossed to overtake safely.", fr: "Une ligne discontinue peut être franchie pour dépasser en sécurité." }
  },
  {
    id: "S15", topic: "signs", sign: "solidline",
    q: { en: "What does a solid white centre line mean?", fr: "Que signifie une ligne blanche continue au centre ?" },
    o: [
      { en: "Do not cross it or overtake", fr: "Ne pas la franchir ni dépasser" },
      { en: "Overtaking is allowed", fr: "Dépassement autorisé" },
      { en: "Edge of the road", fr: "Bord de la route" },
      { en: "Bus lane", fr: "Voie de bus" }
    ],
    a: 0,
    e: { en: "A solid line must not be crossed.", fr: "Une ligne continue ne doit pas être franchie." }
  },

  /* ---------------- PRIORITY ---------------- */
  {
    id: "P01", topic: "priority",
    q: { en: "At a junction with no signs or lights, who has priority?", fr: "À une intersection sans panneau ni feu, qui a la priorité ?" },
    o: [
      { en: "You always", fr: "Vous toujours" },
      { en: "Traffic coming from your right", fr: "Les véhicules venant de votre droite" },
      { en: "Traffic coming from your left", fr: "Les véhicules venant de votre gauche" },
      { en: "The biggest vehicle", fr: "Le plus gros véhicule" }
    ],
    a: 1,
    e: { en: "Without signs, priority goes to the right.", fr: "Sans signalisation, la priorité est à droite." }
  },
  {
    id: "P02", topic: "priority",
    q: { en: "When entering a roundabout, what should you do?", fr: "En entrant dans un rond-point, que devez-vous faire ?" },
    o: [
      { en: "Give way to traffic already on the roundabout", fr: "Céder le passage aux véhicules déjà engagés" },
      { en: "You always have priority", fr: "Vous avez toujours la priorité" },
      { en: "Stop in the middle", fr: "Vous arrêter au milieu" },
      { en: "Drive clockwise", fr: "Tourner dans le sens des aiguilles d'une montre" }
    ],
    a: 0,
    e: { en: "Give way to vehicles already circulating.", fr: "Cédez le passage aux véhicules déjà sur l'anneau." }
  },
  {
    id: "P03", topic: "priority",
    q: { en: "A police officer is directing traffic at a junction with working lights. Whose instructions do you follow?", fr: "Un agent de police dirige la circulation à une intersection avec des feux en fonctionnement. Quelles instructions suivez-vous ?" },
    o: [
      { en: "The lights", fr: "Les feux" },
      { en: "The road signs", fr: "Les panneaux" },
      { en: "The police officer", fr: "L'agent de police" },
      { en: "The vehicle in front", fr: "Le véhicule devant" }
    ],
    a: 2,
    e: { en: "A police officer overrides lights and signs.", fr: "L'agent prime sur les feux et les panneaux." }
  },
  {
    id: "P04", topic: "priority",
    q: { en: "Traffic lights and road signs give different instructions. Which one do you obey?", fr: "Les feux et les panneaux donnent des instructions différentes. Lequel obéissez-vous ?" },
    o: [
      { en: "The road sign", fr: "Le panneau" },
      { en: "The traffic light", fr: "Le feu" },
      { en: "Neither", fr: "Aucun" },
      { en: "The one you saw first", fr: "Celui vu en premier" }
    ],
    a: 1,
    e: { en: "Priority order: officer, then lights, then signs, then markings.", fr: "Ordre : agent, feu, panneau, marquage." }
  },
  {
    id: "P05", topic: "priority",
    q: { en: "A road sign and a road marking conflict. Which one do you obey?", fr: "Un panneau et un marquage au sol se contredisent. Lequel obéissez-vous ?" },
    o: [
      { en: "The road marking", fr: "Le marquage" },
      { en: "The road sign", fr: "Le panneau" },
      { en: "The vehicle ahead", fr: "Le véhicule devant" },
      { en: "Your GPS", fr: "Le GPS" }
    ],
    a: 1,
    e: { en: "Signs override road markings.", fr: "Le panneau prime sur le marquage." }
  },
  {
    id: "P06", topic: "priority",
    q: { en: "You reach a STOP sign but the road is clear. What must you do?", fr: "Vous arrivez à un panneau STOP mais la route est libre. Que faites-vous ?" },
    o: [
      { en: "Continue without stopping", fr: "Continuer sans vous arrêter" },
      { en: "Come to a complete stop, then proceed", fr: "S'arrêter complètement, puis repartir" },
      { en: "Slow down only", fr: "Ralentir seulement" },
      { en: "Sound your horn", fr: "Klaxonner" }
    ],
    a: 1,
    e: { en: "A complete stop is required even when the road is clear.", fr: "L'arrêt complet est obligatoire même si la route est libre." }
  },
  {
    id: "P07", topic: "priority",
    q: { en: "You are leaving a private driveway onto a public road. Who has priority?", fr: "Vous quittez une propriété privée pour rejoindre la route. Qui a la priorité ?" },
    o: [
      { en: "You", fr: "Vous" },
      { en: "Traffic already on the road", fr: "Les véhicules déjà sur la route" },
      { en: "Pedestrians only", fr: "Les piétons seulement" },
      { en: "No one", fr: "Personne" }
    ],
    a: 1,
    e: { en: "When leaving a private property, give way to all road users.", fr: "En quittant une propriété, vous cédez le passage à tous." }
  },
  {
    id: "P08", topic: "priority",
    q: { en: "An obstruction is on your side of a narrow road. Who should give way?", fr: "Un obstacle se trouve de votre côté sur une route étroite. Qui doit céder le passage ?" },
    o: [
      { en: "The oncoming vehicle", fr: "Le véhicule venant en sens inverse" },
      { en: "You", fr: "Vous" },
      { en: "The smaller vehicle", fr: "Le plus petit véhicule" },
      { en: "The faster vehicle", fr: "Le plus rapide" }
    ],
    a: 1,
    e: { en: "The side that is obstructed gives way.", fr: "Celui dont le côté est obstrué cède le passage." }
  },
  {
    id: "P09", topic: "priority",
    q: { en: "May you overtake another vehicle at a pedestrian crossing?", fr: "Pouvez-vous dépasser à un passage piéton ?" },
    o: [
      { en: "Yes, if the road is clear", fr: "Oui, si la route est libre" },
      { en: "No", fr: "Non" },
      { en: "Only at night", fr: "Seulement la nuit" },
      { en: "Only if the other vehicle signals", fr: "Si l'autre véhicule le signale" }
    ],
    a: 1,
    e: { en: "Overtaking at a pedestrian crossing is prohibited.", fr: "Le dépassement est interdit au passage piéton." }
  },
  {
    id: "P10", topic: "priority",
    q: { en: "May you overtake on a bend where you cannot see ahead?", fr: "Pouvez-vous dépasser dans un virage sans visibilité ?" },
    o: [
      { en: "Yes, if you are in a hurry", fr: "Oui, si vous êtes pressé" },
      { en: "No", fr: "Non" },
      { en: "Only if you sound your horn", fr: "Oui, en klaxonnant" },
      { en: "Only if the road is wide", fr: "Oui, si la route est large" }
    ],
    a: 1,
    e: { en: "Never overtake without clear visibility.", fr: "On ne dépasse jamais sans visibilité." }
  },
  {
    id: "P11", topic: "priority",
    q: { en: "Overtaking at a junction is...", fr: "Dépasser à une intersection est..." },
    o: [
      { en: "Always allowed", fr: "Toujours autorisé" },
      { en: "Dangerous and prohibited", fr: "Dangereux et interdit" },
      { en: "Allowed if you signal", fr: "Autorisé avec un clignotant" },
      { en: "Required", fr: "Obligatoire" }
    ],
    a: 1,
    e: { en: "Overtaking at a junction is prohibited.", fr: "Le dépassement à une intersection est interdit." }
  },

  /* ---------------- SPEED ---------------- */
  {
    id: "V01", topic: "speed",
    q: { en: "Unless a sign says otherwise, what is the general speed limit in a built-up area?", fr: "Sauf indication contraire, quelle est la limitation générale en agglomération ?" },
    o: [
      { en: "40 km/h", fr: "40 km/h" },
      { en: "60 km/h", fr: "60 km/h" },
      { en: "80 km/h", fr: "80 km/h" },
      { en: "100 km/h", fr: "100 km/h" }
    ],
    a: 1,
    e: { en: "The general limit in built-up areas is 60 km/h; always obey a lower posted sign.", fr: "En agglomération, la limitation générale est de 60 km/h ; obéissez toujours au panneau." }
  },
  {
    id: "V02", topic: "speed",
    q: { en: "Unless a sign says otherwise, what is the general speed limit outside built-up areas?", fr: "Sauf indication contraire, quelle est la limitation générale hors agglomération ?" },
    o: [
      { en: "40 km/h", fr: "40 km/h" },
      { en: "60 km/h", fr: "60 km/h" },
      { en: "80 km/h", fr: "80 km/h" },
      { en: "120 km/h", fr: "120 km/h" }
    ],
    a: 2,
    e: { en: "The general limit outside built-up areas is 80 km/h.", fr: "Hors agglomération, la limitation générale est de 80 km/h." }
  },
  {
    id: "V03", topic: "speed",
    q: { en: "What is the maximum speed for public transport and goods vehicles?", fr: "Quelle est la vitesse maximale des transports publics et des véhicules de marchandises ?" },
    o: [
      { en: "60 km/h", fr: "60 km/h" },
      { en: "80 km/h", fr: "80 km/h" },
      { en: "100 km/h", fr: "100 km/h" },
      { en: "120 km/h", fr: "120 km/h" }
    ],
    a: 0,
    e: { en: "Public transport and goods vehicles are capped at 60 km/h.", fr: "Les transports publics et de marchandises sont limités à 60 km/h." }
  },
  {
    id: "V04", topic: "speed",
    q: { en: "You are passing a school where children are near the road. What should you do?", fr: "Vous passez devant une école avec des enfants près de la route. Que faites-vous ?" },
    o: [
      { en: "Keep your speed", fr: "Garder votre vitesse" },
      { en: "Slow down and be ready to stop", fr: "Ralentir et être prêt à vous arrêter" },
      { en: "Sound your horn continuously", fr: "Klaxonner sans arrêt" },
      { en: "Overtake quickly", fr: "Dépasser rapidement" }
    ],
    a: 1,
    e: { en: "Always slow down near schools.", fr: "Ralentissez toujours près des écoles." }
  },
  {
    id: "V05", topic: "speed",
    q: { en: "It starts to rain heavily. How should you adjust your driving?", fr: "Il commence à pleuvoir fort. Comment adaptez-vous votre conduite ?" },
    o: [
      { en: "Increase speed to leave the rain", fr: "Accélérer" },
      { en: "Reduce speed and increase following distance", fr: "Réduire la vitesse et augmenter la distance de sécurité" },
      { en: "Use main beam", fr: "Utiliser les feux de route" },
      { en: "Drive in the middle of the road", fr: "Rouler au milieu" }
    ],
    a: 1,
    e: { en: "In rain, slow down and keep more distance.", fr: "Sous la pluie, ralentissez et gardez plus de distance." }
  },
  {
    id: "V06", topic: "speed",
    q: { en: "Why should you obey the speed limit even when no police officer is visible?", fr: "Pourquoi respecter la limitation même sans agent visible ?" },
    o: [
      { en: "Cameras may detect speeding and fines are sent by SMS", fr: "Des caméras peuvent détecter l'excès et envoyer une amende par SMS" },
      { en: "Police never check", fr: "La police ne contrôle jamais" },
      { en: "Only trucks are checked", fr: "Seuls les camions sont contrôlés" },
      { en: "Fines do not apply at night", fr: "Les amendes ne s'appliquent pas la nuit" }
    ],
    a: 0,
    e: { en: "Speed cameras operate day and night.", fr: "Les radars automatiques fonctionnent jour et nuit." }
  },
  {
    id: "V07", topic: "speed",
    q: { en: "What is a safe following distance in good, dry conditions?", fr: "Quelle est une distance de sécurité suffisante par temps sec ?" },
    o: [
      { en: "At least 2 seconds", fr: "Au moins 2 secondes" },
      { en: "Half a second", fr: "Une demi-seconde" },
      { en: "1 metre", fr: "1 mètre" },
      { en: "As close as possible", fr: "Le plus près possible" }
    ],
    a: 0,
    e: { en: "Use the 2-second rule in normal conditions.", fr: "La règle des 2 secondes s'applique par conditions normales." }
  },
  {
    id: "V08", topic: "speed",
    q: { en: "A speed limit sign applies...", fr: "Un panneau de limitation de vitesse s'applique..." },
    o: [
      { en: "Only until the next junction", fr: "Jusqu'à la prochaine intersection" },
      { en: "From the sign until it is cancelled or another limit is posted", fr: "Depuis le panneau jusqu'à son annulation ou un autre panneau" },
      { en: "Only during the day", fr: "Seulement le jour" },
      { en: "Only to trucks", fr: "Seulement aux camions" }
    ],
    a: 1,
    e: { en: "The limit stays valid until it ends.", fr: "La limitation reste valable jusqu'à sa fin." }
  },

  /* ---------------- LIGHTS ---------------- */
  {
    id: "L01", topic: "lights",
    q: { en: "What lights should you use when driving at night on a road with traffic?", fr: "Quels feux utiliser la nuit sur une route fréquentée ?" },
    o: [
      { en: "Dipped headlights", fr: "Feux de croisement" },
      { en: "Main beam all the time", fr: "Feux de route en permanence" },
      { en: "Hazard lights", fr: "Feux de détresse" },
      { en: "Parking lights only", fr: "Feux de position seuls" }
    ],
    a: 0,
    e: { en: "Dipped headlights avoid dazzling other drivers.", fr: "Les feux de croisement évitent d'éblouir." }
  },
  {
    id: "L02", topic: "lights",
    q: { en: "An oncoming vehicle approaches at night. What should you do with your main beam?", fr: "Un véhicule arrive en sens inverse la nuit. Que faites-vous de vos feux de route ?" },
    o: [
      { en: "Keep it on", fr: "Les garder" },
      { en: "Switch to dipped headlights", fr: "Passer aux feux de croisement" },
      { en: "Turn all lights off", fr: "Tout éteindre" },
      { en: "Flash continuously", fr: "Faire des appels répétés" }
    ],
    a: 1,
    e: { en: "Dip your lights so you do not dazzle the other driver.", fr: "Passez en feux de croisement pour ne pas éblouir." }
  },
  {
    id: "L03", topic: "lights",
    q: { en: "What should you use in fog or heavy rain?", fr: "Que faut-il utiliser dans le brouillard ou sous une forte pluie ?" },
    o: [
      { en: "Main beam", fr: "Feux de route" },
      { en: "Dipped headlights (and fog lights if fitted)", fr: "Feux de croisement (et antibrouillard si équipé)" },
      { en: "Hazard lights while moving fast", fr: "Feux de détresse en roulant vite" },
      { en: "No lights", fr: "Aucun feu" }
    ],
    a: 1,
    e: { en: "Main beam reflects off fog and makes visibility worse.", fr: "Les feux de route éblouissent dans le brouillard." }
  },
  {
    id: "L04", topic: "lights",
    q: { en: "When may you use main beam?", fr: "Quand pouvez-vous utiliser les feux de route ?" },
    o: [
      { en: "When there is no oncoming traffic and you are not close behind another vehicle", fr: "Sans véhicule en face et sans suivre de près" },
      { en: "In town", fr: "En ville" },
      { en: "When following a car closely", fr: "En suivant une voiture de près" },
      { en: "In fog", fr: "Dans le brouillard" }
    ],
    a: 0,
    e: { en: "Main beam is for clear roads with no other traffic nearby.", fr: "Les feux de route sont réservés aux routes dégagées." }
  },
  {
    id: "L05", topic: "lights",
    q: { en: "When should you use hazard lights?", fr: "Quand utiliser les feux de détresse ?" },
    o: [
      { en: "To warn others that you are broken down or in danger", fr: "Pour signaler une panne ou un danger" },
      { en: "To park anywhere", fr: "Pour stationner n'importe où" },
      { en: "To overtake", fr: "Pour dépasser" },
      { en: "To drive faster", fr: "Pour rouler plus vite" }
    ],
    a: 0,
    e: { en: "Hazard lights warn of a breakdown or danger.", fr: "Les feux de détresse signalent un danger." }
  },
  {
    id: "L06", topic: "lights",
    q: { en: "Before turning or changing lane, you must...", fr: "Avant de tourner ou de changer de voie, vous devez..." },
    o: [
      { en: "Signal in good time", fr: "Mettre votre clignotant à temps" },
      { en: "Sound your horn", fr: "Klaxonner" },
      { en: "Flash your lights", fr: "Faire des appels de phares" },
      { en: "Speed up", fr: "Accélérer" }
    ],
    a: 0,
    e: { en: "Signal early to warn other road users.", fr: "Le clignotant prévient les autres usagers." }
  },
  {
    id: "L07", topic: "lights",
    q: { en: "What do your brake lights tell the drivers behind you?", fr: "Que signalent vos feux stop aux véhicules derrière ?" },
    o: [
      { en: "You are slowing down or stopping", fr: "Vous ralentissez ou vous arrêtez" },
      { en: "You are turning", fr: "Vous tournez" },
      { en: "You are reversing", fr: "Vous reculez" },
      { en: "You are parking", fr: "Vous stationnez" }
    ],
    a: 0,
    e: { en: "Brake lights warn following drivers that you are slowing.", fr: "Les feux stop avertissent d'un ralentissement." }
  },

  /* ---------------- SAFETY ---------------- */
  {
    id: "F01", topic: "safety",
    q: { en: "Who must wear a seat belt in a car?", fr: "Qui doit porter la ceinture de sécurité ?" },
    o: [
      { en: "Only the driver", fr: "Seulement le conducteur" },
      { en: "The driver and all passengers", fr: "Le conducteur et tous les passagers" },
      { en: "Only front passengers", fr: "Seulement les passagers avant" },
      { en: "Only on highways", fr: "Seulement sur autoroute" }
    ],
    a: 1,
    e: { en: "Seat belts are mandatory for everyone in the vehicle.", fr: "La ceinture est obligatoire pour tous." }
  },
  {
    id: "F02", topic: "safety",
    q: { en: "May you use a hand-held mobile phone while driving?", fr: "Pouvez-vous utiliser un téléphone tenu en main en conduisant ?" },
    o: [
      { en: "Yes, at low speed", fr: "Oui, à faible vitesse" },
      { en: "No", fr: "Non" },
      { en: "Only in traffic jams", fr: "Oui, dans les embouteillages" },
      { en: "Only for short calls", fr: "Oui, pour les appels courts" }
    ],
    a: 1,
    e: { en: "Hand-held phone use while driving is prohibited.", fr: "L'usage du téléphone tenu en main est interdit." }
  },
  {
    id: "F03", topic: "safety",
    q: { en: "What is the safest amount of alcohol before driving?", fr: "Quelle est la quantité d'alcool la plus sûre avant de conduire ?" },
    o: [
      { en: "One beer", fr: "Une bière" },
      { en: "None", fr: "Aucune" },
      { en: "Two glasses of wine", fr: "Deux verres de vin" },
      { en: "Only at night", fr: "Seulement la nuit" }
    ],
    a: 1,
    e: { en: "The legal limit is 0.08% BAC, but the only safe amount is zero.", fr: "La limite légale est de 0,08 %, mais la seule quantité sûre est zéro." }
  },
  {
    id: "F04", topic: "safety",
    q: { en: "A pedestrian is waiting at a marked crossing. What should you do?", fr: "Un piéton attend à un passage marqué. Que faites-vous ?" },
    o: [
      { en: "Stop and let them cross", fr: "S'arrêter et le laisser traverser" },
      { en: "Pass quickly", fr: "Passer vite" },
      { en: "Sound your horn", fr: "Klaxonner" },
      { en: "Drive around them", fr: "Le contourner" }
    ],
    a: 0,
    e: { en: "You must give way to pedestrians at a marked crossing.", fr: "Vous devez céder le passage au piéton." }
  },
  {
    id: "F05", topic: "safety",
    q: { en: "Where should a small child travel in a car?", fr: "Où doit voyager un jeune enfant en voiture ?" },
    o: [
      { en: "On an adult's lap", fr: "Sur les genoux d'un adulte" },
      { en: "Properly restrained in the back seat", fr: "Correctement attaché à l'arrière" },
      { en: "Standing between the seats", fr: "Debout entre les sièges" },
      { en: "In the front seat only", fr: "Toujours à l'avant" }
    ],
    a: 1,
    e: { en: "A child must be properly restrained, preferably in the back.", fr: "Un enfant doit être attaché à l'arrière." }
  },
  {
    id: "F06", topic: "safety",
    q: { en: "Who must wear a helmet on a motorcycle?", fr: "Qui doit porter un casque à moto ?" },
    o: [
      { en: "Only the rider", fr: "Seulement le conducteur" },
      { en: "The rider and the passenger", fr: "Le conducteur et le passager" },
      { en: "Only the passenger", fr: "Seulement le passager" },
      { en: "No one in town", fr: "Personne en ville" }
    ],
    a: 1,
    e: { en: "Helmets are mandatory for rider and passenger.", fr: "Le casque est obligatoire pour les deux." }
  },
  {
    id: "F07", topic: "safety",
    q: { en: "You feel very tired while driving. What should you do?", fr: "Vous êtes très fatigué en conduisant. Que faites-vous ?" },
    o: [
      { en: "Stop in a safe place and rest", fr: "S'arrêter dans un endroit sûr et se reposer" },
      { en: "Drink alcohol", fr: "Boire de l'alcool" },
      { en: "Speed up to arrive sooner", fr: "Accélérer" },
      { en: "Open the window and continue for hours", fr: "Ouvrir la fenêtre et continuer" }
    ],
    a: 0,
    e: { en: "Fatigue slows your reactions: stop and rest.", fr: "La fatigue diminue les réflexes : arrêtez-vous." }
  },
  {
    id: "F08", topic: "safety",
    q: { en: "When overtaking a cyclist, you should...", fr: "En dépassant un cycliste, vous devez..." },
    o: [
      { en: "Pass close to save space", fr: "Passer très près" },
      { en: "Leave a safe distance", fr: "Laisser une distance de sécurité" },
      { en: "Sound your horn and speed past", fr: "Klaxonner et accélérer" },
      { en: "Force them off the road", fr: "Le pousser sur le côté" }
    ],
    a: 1,
    e: { en: "Leave enough space for the cyclist's safety.", fr: "Laissez un espace suffisant au cycliste." }
  },
  {
    id: "F09", topic: "safety",
    q: { en: "An ambulance approaches with its siren on. What should you do?", fr: "Une ambulance arrive avec sa sirène. Que faites-vous ?" },
    o: [
      { en: "Race ahead", fr: "La dépasser" },
      { en: "Give way and let it pass", fr: "Lui céder le passage" },
      { en: "Stop in the middle of the road", fr: "Vous arrêter au milieu" },
      { en: "Follow it closely", fr: "La suivre de près" }
    ],
    a: 1,
    e: { en: "Give way to emergency vehicles.", fr: "Cédez le passage aux véhicules d'urgence." }
  },
  {
    id: "F10", topic: "safety",
    q: { en: "You are involved in an accident with injuries. What should you do first?", fr: "Vous êtes impliqué dans un accident avec des blessés. Que faites-vous d'abord ?" },
    o: [
      { en: "Drive away", fr: "Partir" },
      { en: "Stop, help if safe, and call the police or emergency services", fr: "S'arrêter, aider si possible et appeler la police ou les secours" },
      { en: "Take photos and leave", fr: "Prendre des photos et partir" },
      { en: "Argue with the other driver", fr: "Discuter avec l'autre conducteur" }
    ],
    a: 1,
    e: { en: "Stop, give first aid if safe, and alert the authorities.", fr: "Portez secours et alertez les secours." }
  },

  /* ---------------- DOCUMENTS / VEHICLE ---------------- */
  {
    id: "D01", topic: "docs",
    q: { en: "Which documents should you be able to show when driving?", fr: "Quels documents devez-vous pouvoir présenter en conduisant ?" },
    o: [
      { en: "Valid licence, vehicle registration, inspection certificate and insurance", fr: "Permis valide, carte grise, certificat de visite technique et assurance" },
      { en: "Only your national ID", fr: "Seulement la carte d'identité" },
      { en: "Only the licence", fr: "Seulement le permis" },
      { en: "A letter from your employer", fr: "Une lettre de l'employeur" }
    ],
    a: 0,
    e: { en: "These four documents are required.", fr: "Ces quatre documents sont exigés." }
  },
  {
    id: "D02", topic: "docs",
    q: { en: "What is a key condition of a provisional driving licence?", fr: "Quelle est une condition clé du permis provisoire ?" },
    o: [
      { en: "You may drive alone anywhere", fr: "Conduire seul partout" },
      { en: "You must drive with a qualified supervisor beside you and display learner markings", fr: "Conduire avec un accompagnateur qualifié à côté et afficher le signe auto-école" },
      { en: "You may drive at night only", fr: "Conduire seulement la nuit" },
      { en: "You may carry paying passengers", fr: "Transporter des passagers payants" }
    ],
    a: 1,
    e: { en: "The provisional licence requires a supervisor and learner markings.", fr: "Le permis provisoire impose un accompagnateur et le signe auto-école." }
  },
  {
    id: "D03", topic: "docs",
    q: { en: "How long is a provisional driving licence valid?", fr: "Combien de temps un permis provisoire est-il valable ?" },
    o: [
      { en: "6 months", fr: "6 mois" },
      { en: "1 year, renewable once", fr: "1 an, renouvelable une fois" },
      { en: "5 years", fr: "5 ans" },
      { en: "It never expires", fr: "Il n'expire jamais" }
    ],
    a: 1,
    e: { en: "A provisional licence lasts one year and can be renewed once.", fr: "Le permis provisoire dure un an et se renouvelle une fois." }
  },
  {
    id: "D04", topic: "docs",
    q: { en: "What is the minimum age for a definitive driving licence?", fr: "Quel est l'âge minimum pour un permis définitif ?" },
    o: [
      { en: "16", fr: "16 ans" },
      { en: "17", fr: "17 ans" },
      { en: "18", fr: "18 ans" },
      { en: "21", fr: "21 ans" }
    ],
    a: 2,
    e: { en: "You must be at least 18 for a definitive licence.", fr: "Le permis définitif exige 18 ans." }
  },
  {
    id: "D05", topic: "docs",
    q: { en: "What score do you need to pass the provisional theory test?", fr: "Quel score faut-il pour réussir l'examen théorique provisoire ?" },
    o: [
      { en: "10/20", fr: "10/20" },
      { en: "12/20", fr: "12/20" },
      { en: "16/20", fr: "16/20" },
      { en: "20/20", fr: "20/20" }
    ],
    a: 1,
    e: { en: "You need at least 12/20, which is 60%.", fr: "Il faut au moins 12/20, soit 60 %." }
  },
  {
    id: "D06", topic: "docs",
    q: { en: "According to RNP, what mark do you need in the practical driving test?", fr: "Selon la PNR, quelle note faut-il à l'examen pratique ?" },
    o: [
      { en: "50%", fr: "50 %" },
      { en: "60%", fr: "60 %" },
      { en: "80%", fr: "80 %" },
      { en: "100%", fr: "100 %" }
    ],
    a: 3,
    e: { en: "RNP states that the practical test requires 100%.", fr: "La PNR indique 100 % pour l'examen pratique." }
  },
  {
    id: "D07", topic: "docs",
    q: { en: "What must be valid before your vehicle can be used in the practical test?", fr: "Que doit avoir votre véhicule avant l'examen pratique ?" },
    o: [
      { en: "A motor-vehicle inspection certificate and no unpaid fines", fr: "Un certificat de visite technique valide et aucune amende impayée" },
      { en: "Only a full tank", fr: "Le plein d'essence" },
      { en: "A new paint job", fr: "Une nouvelle peinture" },
      { en: "A car wash receipt", fr: "Un lavage" }
    ],
    a: 0,
    e: { en: "The vehicle must be roadworthy and in order.", fr: "Le véhicule doit être en règle et en bon état." }
  },
  {
    id: "D08", topic: "docs",
    q: { en: "What should you check about your tyres before driving?", fr: "Que vérifier sur vos pneus avant de conduire ?" },
    o: [
      { en: "Tread depth, pressure and damage", fr: "Usure, pression et dommages" },
      { en: "Only the brand", fr: "Seulement la marque" },
      { en: "Only the colour", fr: "Seulement la couleur" },
      { en: "Nothing", fr: "Rien" }
    ],
    a: 0,
    e: { en: "Worn or under-inflated tyres are dangerous.", fr: "Des pneus usés ou sous-gonflés sont dangereux." }
  },
  {
    id: "D09", topic: "docs",
    q: { en: "You have unpaid traffic fines. What can happen at the practical test?", fr: "Vous avez des amendes impayées. Que peut-il se passer à l'examen pratique ?" },
    o: [
      { en: "Nothing", fr: "Rien" },
      { en: "Your vehicle may be refused", fr: "Votre véhicule peut être refusé" },
      { en: "You get extra marks", fr: "Vous gagnez des points" },
      { en: "The test is free", fr: "L'examen est gratuit" }
    ],
    a: 1,
    e: { en: "Unpaid fines can stop your vehicle being accepted.", fr: "Les amendes impayées peuvent bloquer le véhicule." }
  },
  {
    id: "D10", topic: "docs",
    q: { en: "May you add decorations that stick out from your vehicle?", fr: "Pouvez-vous ajouter des décorations qui dépassent du véhicule ?" },
    o: [
      { en: "Yes, any decoration", fr: "Oui, toutes" },
      { en: "No, if they could endanger other road users", fr: "Non, si elles peuvent mettre les autres en danger" },
      { en: "Only on the roof", fr: "Seulement sur le toit" },
      { en: "Only at night", fr: "Seulement la nuit" }
    ],
    a: 1,
    e: { en: "Dangerous ornaments are prohibited.", fr: "Les accessoires dangereux sont interdits." }
  },
  {
    id: "D11", topic: "docs",
    q: { en: "What can happen if you drive after drinking alcohol?", fr: "Que risque-t-on en conduisant après avoir bu de l'alcool ?" },
    o: [
      { en: "Nothing if you drive slowly", fr: "Rien si on roule lentement" },
      { en: "Fines, licence suspension and possibly imprisonment", fr: "Des amendes, la suspension du permis et parfois la prison" },
      { en: "Only a warning", fr: "Un simple avertissement" },
      { en: "A free re-test", fr: "Un examen gratuit" }
    ],
    a: 1,
    e: { en: "Drink-driving is severely punished.", fr: "L'alcool au volant est sévèrement puni." }
  }
];
