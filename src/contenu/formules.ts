// ════════════════════════════════════════════════════════════════════════════
//  FORMULES / TARIFS — section « Nous engager »
//
//  Pour modifier une formule : change le titre, la durée, le prix et la liste
//  des prestations incluses. Pour ajouter une formule, copie un bloc { ... }.
//
//  💶 PRIX : par défaut « Sur devis » (recommandé au début). Quand tu connais
//     tes tarifs, remplace simplement par ex. "À partir de 450 €".
//
//  ⭐ Mets `misEnAvant: true` sur UNE seule formule pour la mettre en valeur
//     (carte dorée, badge « Le plus demandé »).
// ════════════════════════════════════════════════════════════════════════════

export type Formule = {
  titre: string;
  description: string;
  duree: string;
  prix: string;
  inclus: string[];
  misEnAvant?: boolean;
};

export const formules: Formule[] = [
  {
    titre: 'Concert intime',
    description:
      'Un moment musical chez vous ou dans un petit lieu, en toute proximité avec le public.',
    duree: '≈ 45 min',
    prix: 'Sur devis',
    inclus: [
      'Programme adapté à votre soirée',
      'Violoncelle & piano acoustiques',
      'Échange avec le public',
    ],
  },
  {
    titre: 'Cérémonie & mariage',
    description:
      'Accompagnement musical de votre cérémonie : entrée, temps forts, sortie.',
    duree: 'Sur mesure',
    prix: 'Sur devis',
    misEnAvant: true,
    inclus: [
      'Choix des morceaux avec vous',
      'Répétition / calage des entrées',
      'Déplacement en Île-de-France',
    ],
  },
  {
    titre: 'Salle & médiathèque',
    description:
      'Concert complet pour une salle, une saison culturelle ou une médiathèque.',
    duree: '≈ 1 h 15',
    prix: 'Sur devis',
    inclus: [
      'Programme créations + grand répertoire',
      'Présentation des œuvres',
      'Fiche technique fournie',
    ],
  },
];

// Petit texte rassurant affiché sous les formules
export const formulesNote =
  'Tarifs ajustés selon le lieu, la durée et le programme. Contactez-nous pour un devis personnalisé et sans engagement.';
