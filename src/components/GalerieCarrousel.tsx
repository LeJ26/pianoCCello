/* ════════════════════════════════════════════════════════════════════════
   GALERIE — CARROUSEL ÉDITORIAL (island React)
   ────────────────────────────────────────────────────────────────────────
   Adapté du composant « Elegant Carousel » de 21st.dev (@dev.yadhakim).

   Repris de l'original : la mise en page en deux panneaux (texte à gauche,
   image pleine hauteur à droite), le fondu croisé, l'effet Ken Burns, les
   coins de cadre décoratifs, les flèches et le balayage tactile.

   Adapté à l'identité et au contenu du duo :
   - l'original fournit ses styles via un `index.css` absent du paquet :
     toutes les classes ont été réécrites en Tailwind
   - couleur d'accent unique (l'or du site) au lieu d'une teinte par
     diapositive
   - sa barre de progression affiche un libellé par diapositive, ce qui est
     inutilisable avec une cinquantaine de photos : remplacée par un
     compteur et une piste unique
   - le texte devient la légende du concert, et non un descriptif de
     collection
   ════════════════════════════════════════════════════════════════════════ */

import React, { useState, useEffect, useRef, useCallback } from 'react';

export type PhotoGalerie = { photo: string; legende: string };

const DUREE_DIAPO = 6000;
const DUREE_TRANSITION = 800;

export default function GalerieCarrousel({ photos }: { photos: PhotoGalerie[] }) {
  const [index, setIndex] = useState(0);
  const [enTransition, setEnTransition] = useState(false);
  const [progression, setProgression] = useState(0);
  const [enPause, setEnPause] = useState(false);
  const [animationsReduites, setAnimationsReduites] = useState(false);

  const minuteur = useRef<ReturnType<typeof setInterval> | null>(null);
  const minuteurProgression = useRef<ReturnType<typeof setInterval> | null>(null);
  const departX = useRef(0);
  const finX = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const maj = () => setAnimationsReduites(mq.matches);
    maj();
    mq.addEventListener('change', maj);
    return () => mq.removeEventListener('change', maj);
  }, []);

  const allerA = useCallback(
    (cible: number) => {
      if (enTransition || cible === index) return;
      setEnTransition(true);
      setProgression(0);
      setTimeout(() => {
        setIndex(cible);
        setTimeout(() => setEnTransition(false), 50);
      }, DUREE_TRANSITION / 2);
    },
    [enTransition, index]
  );

  const suivante = useCallback(
    () => allerA((index + 1) % photos.length),
    [index, photos.length, allerA]
  );
  const precedente = useCallback(
    () => allerA((index - 1 + photos.length) % photos.length),
    [index, photos.length, allerA]
  );

  /* Défilement automatique — désactivé au survol, au focus clavier et si
     l'utilisateur a demandé des animations réduites. */
  useEffect(() => {
    if (enPause || animationsReduites) return;

    minuteurProgression.current = setInterval(() => {
      setProgression((p) => (p >= 100 ? 100 : p + 100 / (DUREE_DIAPO / 50)));
    }, 50);
    minuteur.current = setInterval(suivante, DUREE_DIAPO);

    return () => {
      if (minuteur.current) clearInterval(minuteur.current);
      if (minuteurProgression.current) clearInterval(minuteurProgression.current);
    };
  }, [index, enPause, animationsReduites, suivante]);

  const surTouche = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); suivante(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); precedente(); }
  };

  const photo = photos[index];
  const masque = enTransition ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0';

  return (
    <div
      className="relative"
      onMouseEnter={() => setEnPause(true)}
      onMouseLeave={() => setEnPause(false)}
      onFocusCapture={() => setEnPause(true)}
      onBlurCapture={() => setEnPause(false)}
      onTouchStart={(e) => { departX.current = e.targetTouches[0].clientX; }}
      onTouchMove={(e) => { finX.current = e.targetTouches[0].clientX; }}
      onTouchEnd={() => {
        const ecart = departX.current - finX.current;
        if (Math.abs(ecart) > 60) (ecart > 0 ? suivante : precedente)();
      }}
      onKeyDown={surTouche}
      role="region"
      aria-roledescription="carrousel"
      aria-label="Photos de concerts"
      tabIndex={0}
    >
      <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-10 lg:gap-16 items-center">
        {/* ── Panneau texte ─────────────────────────────────────────── */}
        <div className="order-2 lg:order-1">
          {/* Compteur : remplace les libellés par diapositive de l'original,
              inutilisables au-delà de quelques images. */}
          <div className={`flex items-center gap-4 transition-all duration-500 ease-soft ${masque}`}>
            <span className="h-px w-12 bg-or" />
            <span className="font-sans text-xs tracking-widest2 text-or">
              {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
            </span>
          </div>

          <p
            className={`mt-6 font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight text-encre transition-all duration-500 ease-soft ${masque}`}
            aria-live="polite"
          >
            {photo.legende || 'En concert'}
          </p>

          <p className={`mt-6 prose-serif transition-all duration-500 ease-soft ${masque}`}>
            Duo pianCCello — violoncelle et piano.
          </p>

          {/* Flèches */}
          <div className="mt-10 flex items-center gap-3">
            <button
              type="button"
              onClick={precedente}
              aria-label="Photo précédente"
              className="flex h-12 w-12 items-center justify-center border border-encre/20 text-encre transition-colors duration-300 hover:border-or hover:bg-or hover:text-ivoire focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={suivante}
              aria-label="Photo suivante"
              className="flex h-12 w-12 items-center justify-center border border-encre/20 text-encre transition-colors duration-300 hover:border-or hover:bg-or hover:text-ivoire focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Piste de progression unique */}
          <div className="mt-8 h-px w-full max-w-xs bg-encre/15">
            <div
              className="h-px bg-or"
              style={{
                width: `${progression}%`,
                transition: animationsReduites ? 'none' : 'width 50ms linear',
              }}
            />
          </div>
        </div>

        {/* ── Panneau image ─────────────────────────────────────────── */}
        <div className="order-1 lg:order-2 relative">
          <div
            className={`relative overflow-hidden shadow-lift transition-all duration-500 ease-soft ${
              enTransition ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
            }`}
          >
            <img
              key={photo.photo}
              src={photo.photo}
              alt={`Duo pianCCello — ${photo.legende || 'en concert'}`}
              loading={index === 0 ? 'eager' : 'lazy'}
              className={`aspect-[4/3] sm:aspect-[3/2] w-full object-cover ${
                animationsReduites ? '' : 'ken-burns'
              }`}
            />
            {/* Voile or très léger, dans l'esprit de l'original */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-or/10 to-transparent" />
          </div>

          {/* Coins de cadre décoratifs — repris de l'original, en or */}
          <span className="pointer-events-none absolute -top-3 -left-3 h-12 w-12 border-t border-l border-or" />
          <span className="pointer-events-none absolute -bottom-3 -right-3 h-12 w-12 border-b border-r border-or" />
        </div>
      </div>
    </div>
  );
}
