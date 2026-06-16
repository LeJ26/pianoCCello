// ════════════════════════════════════════════════════════════════════════════
//  GALERIE DE CONCERTS
//
//  Pour ajouter un concert à la galerie :
//  1. Mets ta photo dans le dossier `public/images/` (de préférence
//     en .jpg ou .webp, format paysage, large d'environ 1600 px).
//  2. Copie l'un des blocs ci-dessous.
//  3. Renseigne la date, le lieu et le chemin de la photo.
//
//  Les concerts sont affichés du plus récent au plus ancien
//  (l'ordre est calculé automatiquement à partir de la date).
// ════════════════════════════════════════════════════════════════════════════

export type Concert = {
  // Format ISO : "AAAA-MM-JJ" — utilisé pour trier et afficher la date
  date: string;
  lieu: string;
  // Description courte facultative — affichée dans la lightbox
  description?: string;
  // Chemin de la photo, depuis le dossier /public/
  photo: string;
};

export const concerts: Concert[] = [
  {
    date: '2026-03-06',
    lieu: 'Concert — Île-de-France',
    photo: '/images/concert-2026-03-06.jpg',
  },
  {
    date: '2025-12-20',
    lieu: 'Concert de fin d’année',
    photo: '/images/concert-2025-12-20.jpg',
  },
  {
    date: '2025-10-25',
    lieu: 'Concert d’automne',
    photo: '/images/concert-2025-10-25.jpg',
  },
  {
    date: '2025-09-13',
    lieu: 'Concert de rentrée',
    photo: '/images/concert-2025-09-13.jpg',
  },
  {
    date: '2025-08-29',
    lieu: 'Concert d’été',
    photo: '/images/concert-2025-08-29.jpg',
  },
  {
    date: '2023-12-07',
    lieu: 'Bistrot de la Lanterne',
    description: 'Soirée intime dans un bistrot rambolitain.',
    photo: '/images/concert-bistrot-lanterne-2023-12-07.jpg',
  },
];
