// ════════════════════════════════════════════════════════════════════════════
//  BOUTIQUE DE PARTITIONS
//
//  Pour ajouter une partition (ou une collection) à vendre :
//  1. Copie l'un des blocs ci-dessous.
//  2. Change le titre, la description, le prix, l'instrument et le lien.
//  3. Le lien `acheterUrl` doit pointer vers ta page Payhip (ou Gumroad).
//  4. `bouton` (facultatif) = le texte du bouton (ex. « Voir la collection »).
//     Si tu ne le mets pas, le bouton affiche « Acheter le PDF ».
//  5. `prix` peut être laissé vide ('') pour une collection (plusieurs prix).
//
//  ⚠️ N'oublie pas la virgule à la fin de chaque bloc { ... }.
// ════════════════════════════════════════════════════════════════════════════

export type Partition = {
  id: string;
  titre: string;
  description: string;
  // Prix affiché tel quel (ex. "12 €"). Laisse vide ('') pour une collection.
  prix: string;
  // Instrument(s) — petit tag affiché sur le visuel
  instrument: string;
  // Image de couverture (chemin dans /public/images/). `null` → visuel par défaut.
  image: string | null;
  // Texte du bouton (facultatif). Par défaut : « Acheter le PDF ».
  bouton?: string;
  // 👉 LIEN DE VENTE — l'URL Payhip (ou Gumroad).
  // Tant que c'est `LIEN_PAIEMENT_A_REMPLIR`, le bouton est désactivé.
  acheterUrl: string;
};

export const partitions: Partition[] = [
  {
    id: 'annee-de-clementine',
    titre: 'L’Année de Clémentine',
    description:
      'La collection des compositions originales de Clémentine, en partitions PDF pour piano et violoncelle. Certaines sont arrangées pour piano seul ou pour trio.',
    prix: '',
    instrument: 'Piano',
    image: '/images/recueil-annee.jpg',
    bouton: 'Voir la collection',
    acheterUrl: 'https://payhip.com/Clemsmusic/collection/l-annee-de-clementine',
  },
];
