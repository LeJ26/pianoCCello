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
    youtubeUrl: 'https://youtube.com/@duopianccello',
    facebookUrl: 'https://www.facebook.com/profile.php?id=61582509853319',
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
  // Qui héberge le site — le site tourne sur Cloudflare Workers (voir
  // wrangler.jsonc). À vérifier si tu changes un jour d'hébergeur.
  hebergeur: {
    nom: 'Cloudflare, Inc.',
    adresse: '101 Townsend Street, San Francisco, CA 94107, États-Unis',
    site: 'https://www.cloudflare.com',
  },
};

// ═════ RÉPERTOIRE (section « Notre répertoire ») ═════
// Le texte d'introduction + les 6 recueils de compositions.
// Pour modifier un recueil : change son titre ou sa liste de morceaux.
// Pour ajouter un morceau : ajoute une ligne dans `pieces`.
export const repertoire = {
  creations: {
    titre: 'Créations originales',
    texte:
      'Des compositions signées Clémentine Roques, écrites en dialogue pour le piano et le violoncelle,\nun univers poétique, intime et chaleureux.\nLes miniatures existent aussi sous la forme d’un conte musical nommé « À la poursuite de nos rêves », interactif et adapté à un jeune public.\nNous vous proposons également quelques arrangements libres autour des chants de Noël.',
  },
  // Les 6 recueils (chaque recueil = un titre + la liste de ses morceaux)
  recueils: [
    {
      titre: 'L’année de Clémentine',
      // Image de fond de la carte (facultatif). Fichier dans public/images/.
      fond: '/images/recueil-annee.jpg',
      pieces: [
        'Septembre', 'Octobre', 'Novembre', 'Décembre', 'Janvier', 'Février',
        'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', '13e mois',
      ],
    },
    {
      titre: 'Miniatures',
      fond: '/images/recueil-miniatures.jpg',
      pieces: [
        'Doux souvenirs de l’enfance',
        'Ronde malicieuse des gens contents',
        'Au galop à travers plaines et forêts d’Yvelines',
        'L’impossible choix',
        'Insouciante valse d’été',
        'Nostalgie d’un rêve inachevé',
        'En toute confiance vers l’inconnu',
        'Une vie bien remplie',
        'Danse gracieuse d’une maman à plein temps',
        'À l’abri dans mon jardin sous la pluie',
        'Prêt pour la grande traversée',
        'Genèse d’une merveilleuse aventure',
      ],
    },
    {
      titre: 'Inspirations',
      fond: '/images/recueil-inspirations.jpg',
      pieces: [
        'Forest', 'Résilience', 'Eveil', 'Time', 'À vélo', 'Valse des pensées',
        'Ondée', 'Solitude', 'Danse', 'La Promesse', 'Influx', 'Hope',
      ],
    },
    {
      titre: 'Mirror',
      fond: '/images/recueil-mirror.jpg',
      pieces: ['Life', 'Earth', 'Sky', 'Waiting for you', 'Tears', 'Home'],
    },
    {
      titre: 'Flowers',
      fond: '/images/recueil-flowers.jpg',
      pieces: ['Bruyère', 'Le Coquelicot', 'Fleur d’oranger', 'Rose des vents', 'Butterfly', 'Sunflower'],
    },
    {
      titre: 'Noël',
      fond: '/images/recueil-noel.jpg',
      pieces: [
        'Entre le bœuf et l’âne gris',
        'Vive le vent',
        'Les anges dans nos campagnes',
        'Minuit Chrétien',
        'Étoile des neiges',
        'Petit Papa Noël',
        'Douce nuit',
        'We wish you a Merry Christmas',
      ],
    },
  ],
  // Vidéos YouTube incrustées dans la section « Notre répertoire ».
  // `id` = l'identifiant de la vidéo (dans l'URL après youtu.be/ ou watch?v=).
  videos: [
    { titre: 'Forest', id: 'pic4IY6xBaM' },
    { titre: 'Résilience', id: 'boXu2-5aNEE' },
  ],
  // Extraits audio (fichiers dans public/audio/). Pour en ajouter un :
  // mets le .mp3 dans public/audio/ puis ajoute une ligne ici.
  audios: [
    { titre: 'Fleur d’oranger', fichier: '/audio/fleur-oranger.mp3' },
    { titre: 'Life', fichier: '/audio/life.mp3' },
    { titre: 'Tears', fichier: '/audio/tears.mp3' },
  ],
};

// ═════ AVIS (section « Ils en parlent ») ═════
// Ajoute ou retire simplement un avis dans la liste.
export const avis: string[] = [
  'Beaucoup de plaisir à vous entendre',
  'Super moment pour les patients et les soignants',
  'Un moment magique',
  'Merci pour ce merveilleux moment qui nous a permis de rêver',
  'Grand plaisir musical, soleil dans l’automne de sa vie',
  'Votre musique m’a enveloppée dans un doux instant de sérénité',
  'Merci pour ce partage et votre talent',
  'Bravo pour ce superbe concert',
  'Que d’inspiration ! Les citations aident à bien entrer dans la musique et ajoutent une touche de poésie.',
  'Un moment musical apaisant et inspiré, qui fait du bien',
  'Un duo merveilleux',
  'C’était magnifique ! Vous nous avez fait rêver',
  'Beau moment de poésie',
  'J’ai eu l’impression d’être au Paradis !',
  'Un grand merci pour le concert proposé à toutes les classes de l’école. Une très belle façon de donner goût à la musique et d’inviter les élèves à ressentir des émotions à travers différentes mélodies.',
];

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
