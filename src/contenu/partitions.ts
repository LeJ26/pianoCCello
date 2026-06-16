// ════════════════════════════════════════════════════════════════════════════
//  BOUTIQUE DE PARTITIONS
//
//  Pour ajouter une partition à vendre :
//  1. Copie l'un des blocs ci-dessous.
//  2. Change le titre, la description, le prix, l'instrument et le lien.
//  3. Le lien `acheterUrl` doit pointer vers ta page de vente Gumroad
//     ou Payhip (voir le README pour créer un produit en 5 minutes).
//
//  ⚠️ N'oublie pas la virgule à la fin de chaque bloc { ... },
//     sauf éventuellement le dernier.
// ════════════════════════════════════════════════════════════════════════════

export type Partition = {
  id: string;
  titre: string;
  description: string;
  // Prix affiché tel quel (ex. "12 €", "15,00 €")
  prix: string;
  // Instrument(s) — petit tag affiché sous le titre
  instrument: string;
  // Image de la couverture / vignette (chemin dans /public/images/partitions/)
  // Mets `null` si tu n'as pas encore d'image, un visuel par défaut s'affichera.
  image: string | null;
  // 👉 LIEN DE VENTE — colle ici l'URL Gumroad ou Payhip de la partition.
  // Tant que c'est `LIEN_PAIEMENT_A_REMPLIR`, le bouton sera désactivé.
  acheterUrl: string;
};

export const partitions: Partition[] = [
  {
    id: 'voyage-original',
    titre: 'Voyage',
    description:
      'Composition originale pour piano et violoncelle. Une rêverie en trois mouvements, intime et lumineuse.',
    prix: '12 €',
    instrument: 'Piano & violoncelle',
    image: null,
    acheterUrl: 'LIEN_PAIEMENT_A_REMPLIR',
  },
  {
    id: 'reverie-piano-seul',
    titre: 'Rêverie',
    description:
      'Pièce pour piano seul. Ambiance suspendue, idéale pour les pianistes amateurs confirmés.',
    prix: '8 €',
    instrument: 'Piano seul',
    image: null,
    acheterUrl: 'LIEN_PAIEMENT_A_REMPLIR',
  },
  {
    id: 'suite-poetique-trio',
    titre: 'Suite poétique',
    description:
      'Suite en quatre mouvements pour trio (piano, violoncelle, violon). Niveau intermédiaire.',
    prix: '18 €',
    instrument: 'Trio',
    image: null,
    acheterUrl: 'LIEN_PAIEMENT_A_REMPLIR',
  },
];
