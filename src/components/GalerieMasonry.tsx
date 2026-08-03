/* ════════════════════════════════════════════════════════════════════════
   GALERIE MASONRY — island React
   ────────────────────────────────────────────────────────────────────────
   Adapté du composant « Shared Element Gallery » de 21st.dev (@easemize).
   Le principe conservé est la transition d'élément partagé : la vignette
   cliquée grandit jusqu'à la vue plein écran sans coupure, grâce au
   `layoutId` de Framer Motion.

   Ce qui a été adapté à l'identité du duo :
   - angles vifs au lieu des coins arrondis (le site n'arrondit rien)
   - voile encre et accents or à la place du noir et blanc d'origine
   - légendes de concert, absentes du composant d'origine
   - ressort assoupli pour coller à la courbe utilisée partout sur le site
   - icône de fermeture en SVG en ligne, pour éviter une dépendance
     d'icônes entière au profit d'un seul glyphe
   ════════════════════════════════════════════════════════════════════════ */

import * as React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export type PhotoGalerie = { photo: string; legende: string };

/* Ressort assoupli : l'original est plus sec (stiffness 350). On se
   rapproche du cubic-bezier(0.22, 1, 0.36, 1) employé sur tout le site. */
const ressort = { type: 'spring' as const, stiffness: 260, damping: 32, mass: 1 };

type PhotoOuverte = { index: number; photo: string; legende: string } | null;

export default function GalerieMasonry({ photos }: { photos: PhotoGalerie[] }) {
  const [ouverte, setOuverte] = React.useState<PhotoOuverte>(null);
  const [animationsReduites, setAnimationsReduites] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setAnimationsReduites(mq.matches);
    const onChange = () => setAnimationsReduites(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  /* Navigation au clavier : Échap ferme, les flèches passent d'une photo
     à l'autre sans repasser par la grille. */
  React.useEffect(() => {
    if (!ouverte) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOuverte(null);
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const pas = e.key === 'ArrowRight' ? 1 : -1;
        const i = (ouverte.index + pas + photos.length) % photos.length;
        setOuverte({ index: i, photo: photos[i].photo, legende: photos[i].legende });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [ouverte, photos]);

  /* Blocage du défilement de la page pendant l'affichage plein écran. */
  React.useEffect(() => {
    document.body.style.overflow = ouverte ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [ouverte]);

  const transition = animationsReduites ? { duration: 0 } : ressort;

  /* Le portail n'est monté qu'après l'hydratation : `document` n'existe pas
     au rendu serveur. */
  const [monte, setMonte] = React.useState(false);
  React.useEffect(() => setMonte(true), []);

  return (
    <>
      {/* Masonry en colonnes CSS : les ratios d'origine sont préservés,
          sans calcul de position en JavaScript. */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6">
        {photos.map((p, i) => (
          <motion.button
            key={p.photo}
            type="button"
            whileHover="survol"
            whileTap="appui"
            onClick={() => setOuverte({ index: i, photo: p.photo, legende: p.legende })}
            className="group relative mb-4 sm:mb-6 block w-full break-inside-avoid cursor-zoom-in overflow-hidden shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-or"
            aria-label={`Agrandir la photo${p.legende ? ` : ${p.legende}` : ''}`}
          >
            <motion.img
              layoutId={`photo-${i}`}
              src={p.photo}
              alt={`Duo pianCCello — ${p.legende || 'en concert'}`}
              loading={i < 3 ? 'eager' : 'lazy'}
              className="w-full h-auto object-cover"
              variants={{ survol: { scale: 1.03 }, appui: { scale: 0.99 } }}
              transition={transition}
            />

            {/* Voile encre + légende, dans le style des vignettes actuelles */}
            {p.legende && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-encre/85 via-encre/40 to-transparent px-4 pt-12 pb-3">
                <p className="font-serif text-sm sm:text-base leading-tight text-ivoire text-center">
                  {p.legende}
                </p>
              </div>
            )}

            {/* Liseré or au survol — la signature du site */}
            <span className="pointer-events-none absolute inset-0 border border-or opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </motion.button>
        ))}
      </div>

      {/* Rendu dans un portail sur <body>, et non sur place : les blocs
          `.reveal` du site portent un `transform` posé par GSAP, or un
          ancêtre transformé transforme `position: fixed` en
          `position: absolute`. Sans portail, la vue plein écran reste
          enfermée dans le cadre de la galerie au lieu de couvrir l'écran.

          La `key` sur l'enfant direct est tout aussi indispensable : sans
          elle, AnimatePresence ne suit pas l'apparition/disparition. */}
      {monte &&
        createPortal(
          <AnimatePresence>
        {ouverte && (
          <div
            key="lightbox"
            className="fixed inset-0 z-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
          >
            {/* Voile dépoli, en encre plutôt qu'en noir */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: animationsReduites ? 0 : 0.3 }}
              className="absolute inset-0 bg-encre/90 backdrop-blur-xl"
              onClick={() => setOuverte(null)}
            />

            <motion.div
              className="relative z-10 flex h-full w-full cursor-zoom-out flex-col items-center justify-center gap-5 px-4"
              drag={animationsReduites ? false : 'y'}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.8}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.y) > 100 || Math.abs(info.velocity.y) > 300) {
                  setOuverte(null);
                }
              }}
              onClick={() => setOuverte(null)}
            >
              <motion.img
                layoutId={`photo-${ouverte.index}`}
                src={ouverte.photo}
                alt={`Duo pianCCello — ${ouverte.legende || 'en concert'}`}
                className="max-h-[82vh] max-w-[95vw] w-auto h-auto object-contain shadow-lift will-change-transform"
                draggable={false}
                transition={transition}
              />
              {ouverte.legende && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.15, duration: 0.25 }}
                  className="font-sans text-sm tracking-widest2 uppercase text-ivoire/80"
                >
                  {ouverte.legende}
                </motion.p>
              )}
            </motion.div>

            <motion.button
              type="button"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              onClick={() => setOuverte(null)}
              aria-label="Fermer la photo"
              className="absolute top-6 right-6 z-50 flex h-11 w-11 items-center justify-center bg-ivoire/10 text-ivoire backdrop-blur-md transition-colors hover:bg-or hover:text-ivoire focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </motion.button>
          </div>
        )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
