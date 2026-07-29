// ════════════════════════════════════════════════════════════════════════════
//  CONTENU DU SITE — INFORMATIONS GÉNÉRALES
//  Modifie ce fichier pour changer le nom, la baseline, les coordonnées,
//  les bios des artistes, ou le texte du formulaire de réservation.
//  Pas besoin de toucher au code des composants.
// ════════════════════════════════════════════════════════════════════════════

export const site = {
  // Nom affiché partout (header, titre, footer, balises SEO)
  nom: 'Duo pianCCello',

  // Petite phrase sous le nom (hero, footer)
  baseline: 'Compositions originales',

  // Phrase d'accroche du hero, juste au-dessus des boutons
  accroche:
    'Évadez-vous le temps d’un doux voyage plein d’émotions et de rêves.',

  // Ville / région — utilisée pour le SEO local
  lieu: 'Rambouillet, Île-de-France',

  // ═════ COORDONNÉES DE CONTACT ═════
  contact: {
    email: 'duopianccello@gmail.com',
    telephone: '06 09 96 77 22',
    // Variante pour le lien `tel:` (sans espaces, format international si possible)
    telephoneLien: '+33609967722',
    instagram: 'duopianccello',
    instagramUrl: 'https://www.instagram.com/duopianccello/',
  },

  // ═════ LIEN DU FORMULAIRE DE RÉSERVATION ═════
  // 👉 REMPLACE par ton lien Formspree (formspree.io) quand tu en auras créé un.
  // Tant que c'est `FORMULAIRE_A_REMPLIR`, le formulaire ouvrira simplement
  // le client mail de l'utilisateur (mailto:).
  formulaireUrl: 'FORMULAIRE_A_REMPLIR',

  // ═════ SEO ═════
  seo: {
    titre: 'Duo pianCCello — Violoncelle & piano · Compositions originales',
    description:
      'Duo de musique de chambre basé à Rambouillet (Île-de-France). Compositions originales pour violoncelle et piano, et grand répertoire (Schumann, Schubert, Beethoven, Mozart). Concerts et réservations.',
    motsCles: [
      'duo musique chambre',
      'violoncelle piano',
      'concert classique Rambouillet',
      'compositions originales',
      'Île-de-France',
    ],
    imageOpenGraph: '/images/duo-portrait-2025-10-11.jpg',
  },
};

// ═════ MENTIONS LÉGALES (page /mentions-legales) ═════
// 👉 Complète les champs marqués « À COMPLÉTER » avant la mise en ligne.
// Si tu n'es pas une société (simple particulier / association), tu peux
// laisser le SIRET vide — il sera alors masqué sur la page.
export const legal = {
  // Qui édite le site (toi / le duo)
  editeur: {
    nom: 'Duo pianCCello',
    statut: 'À COMPLÉTER (ex. association, micro-entreprise, particulier)',
    adresse: 'À COMPLÉTER (adresse postale, facultatif)',
    siret: '', // laisse vide si non applicable
    email: 'duopianccello@gmail.com',
    telephone: '06 09 96 77 22',
    // Personne responsable du contenu du site
    directeurPublication: 'À COMPLÉTER (nom du responsable)',
  },
  // Qui héberge le site (à remplir selon ton choix de mise en ligne)
  hebergeur: {
    nom: 'À COMPLÉTER (ex. Netlify, Inc. ou Vercel Inc.)',
    adresse: 'À COMPLÉTER (adresse de l’hébergeur)',
    site: 'À COMPLÉTER (ex. https://www.netlify.com)',
  },
};

// ═════ RÉPERTOIRE (section « Notre répertoire ») ═════
// Deux colonnes : les créations du duo, et le grand répertoire interprété.
// Ajoute ou retire simplement une ligne dans les listes.
export const repertoire = {
  creations: {
    titre: 'Créations originales',
    texte:
      'Des compositions signées Clémentine Roques, écrites en dialogue pour le piano et le violoncelle,\nun univers poétique, intime et chaleureux.',
    pieces: ['Voyage', 'Rêverie', 'Suite poétique', '… et bien d’autres en concert'],
  },
  grandRepertoire: {
    titre: 'Grand répertoire',
    texte:
      'Le duo revisite aussi les grandes pages de la musique de chambre, choisies pour leur émotion et leur lyrisme.',
    compositeurs: ['Robert Schumann', 'Franz Schubert', 'Ludwig van Beethoven', 'Wolfgang A. Mozart'],
  },
};

// ═════ BIOS DES ARTISTES (section « Qui sommes-nous ») ═════
export const artistes = [
  {
    prenom: 'Claire',
    nom: 'Bournonville',
    role: 'Violoncelle',
    photo: '/images/claire.jpg',
    bio:
      'Claire effectue ses études musicales au Conservatoire de Nice et à l’Académie de Musique de Monaco et n’aura de cesse de jouer de son instrument en parallèle de sa vie professionnelle dans le domaine médical (masseur-kinésithérapeute). Elle est très active au sein de diverses formations du Conservatoire de Rambouillet : trio, quatuor, orchestre…',
  },
  {
    prenom: 'Clémentine',
    nom: 'Roques',
    role: 'Piano & composition',
    photo: '/images/clementine.jpg',
    bio:
      'Après des études musicales au Conservatoire et à l’Université de Montpellier, elle crée sa propre école de musique dans l’Hérault puis devient professeur des écoles à l’occasion de son déménagement dans les Yvelines. Elle intègre alors la classe de musique de chambre du Conservatoire de Rambouillet. Passionnée par la composition, elle écrit des pièces pour piano seul d’abord puis pour trio et enfin pour piano et violoncelle.',
  },
];
