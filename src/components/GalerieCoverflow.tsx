/* ════════════════════════════════════════════════════════════════════════
   GALERIE — CARROUSEL COVERFLOW (island React)
   ────────────────────────────────────────────────────────────────────────
   Basé sur le composant « CoverflowCarousel » fourni.

   La mécanique d'origine est conservée telle quelle : position fractionnaire
   unique comme source de vérité, repli de la distance sur le tour le plus
   court (d'où la boucle sans clonage de nœuds), peinture directe dans le DOM
   plutôt que par l'état React, inertie au lancer.

   Adapté au projet, qui n'est pas un projet shadcn :
   - `cn` et `@/lib/utils` n'existent pas ici → petite fonction locale
   - `lucide-react` n'est pas installé → chevrons en SVG en ligne, comme
     ailleurs sur le site
   - les jetons shadcn (`bg-muted`, `text-foreground`, `ring-ring`…) ne sont
     pas définis → remplacés par les couleurs du duo (ivoire, encre, or)
   - `animate-in fade-in` vient de tailwindcss-animate, absent → transition
     CSS classique
   - angles vifs au lieu de `rounded-2xl`, conformément au reste du site
   - LES PHOTOS NE SONT PAS ROGNÉES : `object-contain` dans un cadre de
     ratio fixe, l'image est seulement agrandie ou réduite pour tenir
   ════════════════════════════════════════════════════════════════════════ */

import * as React from 'react';

export type PhotoGalerie = { photo: string; legende: string };

const useIsoLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

/* Équivalent minimal de `cn` : ce composant n'a besoin que de concaténer
   des classes, pas de fusionner des conflits Tailwind. */
const cn = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(' ');

export interface GalerieCoverflowProps {
  photos: PhotoGalerie[];
  /** Degrés d'inclinaison de la première carte voisine. */
  rotate?: number;
  /** Recul de la première voisine, en fraction de la largeur de carte. */
  depth?: number;
  /** Distance de l'œil, en multiple de la largeur de carte. */
  perspective?: number;
  /** Exposant sur la distance : sous 1, l'inclinaison s'atténue en s'éloignant. */
  falloff?: number;
  /** Opacité perdue par cran d'éloignement. */
  fade?: number;
  /** Largeur de carte. Tout le reste en découle, l'effet s'adapte donc seul. */
  cardWidth?: string;
  /** Espace entre les cartes, en fraction de la largeur. */
  gap?: number;
  loop?: boolean;
  className?: string;
}

export default function GalerieCoverflow({
  photos,
  rotate = 44,
  depth = 0.6,
  perspective = 3,
  falloff = 0.56,
  fade = 0.1,
  cardWidth = 'clamp(200px, 30vw, 420px)',
  gap = 0.06,
  loop = true,
  className,
}: GalerieCoverflowProps) {
  const count = photos.length;

  const frameRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  /** Index fractionnaire de la carte au centre. Seule source de vérité. */
  const posRef = React.useRef(0);
  /** Cible de l'amortissement en cours. Repartir de `pos` avalerait une
      touche pressée en plein vol, avant que l'arrondi n'ait bougé. */
  const targetRef = React.useRef(0);
  const widthRef = React.useRef(0);
  const rafRef = React.useRef<number | null>(null);
  const dragRef = React.useRef<{
    id: number; x: number; pos: number; v: number; t: number;
  } | null>(null);

  const [selected, setSelected] = React.useState(0);

  /** Carte entière la plus proche, ramenée dans 0..count-1. */
  const indexAt = React.useCallback(
    (pos: number) => ((Math.round(pos) % count) + count) % count,
    [count]
  );

  /* Peinture directe dans le DOM : soixante mises à jour d'état par seconde
     re-rendraient chaque carte pour des nombres que React n'a pas à voir. */
  const paint = React.useCallback(() => {
    const width = widthRef.current;
    if (!width) return;
    const pitch = width * (1 + gap);
    const pos = posRef.current;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      /* Repli de la distance sur le tour le plus court : c'est tout le
         mécanisme de boucle — aucun nœud cloné, aucun remaniement du DOM. */
      let offset = index - pos;
      if (loop) {
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;
      }

      const distance = Math.abs(offset);
      /* Inclinaison et recul s'atténuent avec l'éloignement : doubler la
         distance n'ajoute qu'environ la moitié de chaque. Une rampe linéaire
         refermerait la deuxième carte ; ainsi elle reste lisible. */
      const ramp = Math.pow(distance, falloff);
      /* Plafonné avant l'angle rasant, pour qu'une carte lointaine ne
         tourne jamais complètement le dos. */
      const tilt = Math.min(rotate * ramp, 82) * Math.sign(offset);

      card.style.transform =
        `translate(calc(-50% + ${offset * pitch}px), -50%) ` +
        `translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`;

      /* Une carte est téléportée de l'autre côté de l'anneau à exactement un
         demi-tour : elle doit donc avoir disparu avant, sinon le saut se voit. */
      const edge = loop ? Math.min(1, Math.max(0, count / 2 - distance)) : 1;
      card.style.opacity = String(Math.max(0, 1 - fade * distance) * edge);
      card.style.zIndex = String(100 - Math.round(distance));
    });
  }, [count, depth, fade, falloff, gap, loop, rotate]);

  const settle = React.useCallback(
    (target: number) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      targetRef.current = target;
      setSelected(indexAt(target));

      const step = () => {
        const remaining = target - posRef.current;
        if (Math.abs(remaining) < 0.0004) {
          posRef.current = target;
          paint();
          rafRef.current = null;
          return;
        }
        posRef.current += remaining * 0.16;
        paint();
        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [indexAt, paint]
  );

  const clamp = React.useCallback(
    (pos: number) => (loop ? pos : Math.max(0, Math.min(count - 1, pos))),
    [count, loop]
  );

  const goTo = React.useCallback(
    (index: number) => {
      // Prendre le chemin le plus court plutôt que dérouler tout l'anneau.
      const target = loop
        ? index + Math.round((targetRef.current - index) / count) * count
        : index;
      settle(clamp(target));
    },
    [clamp, count, loop, settle]
  );

  const nudge = React.useCallback(
    (by: number) => settle(clamp(Math.round(targetRef.current) + by)),
    [clamp, settle]
  );

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    targetRef.current = posRef.current;
    dragRef.current = {
      id: event.pointerId, x: event.clientX, pos: posRef.current,
      v: 0, t: performance.now(),
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;

    const pitch = widthRef.current * (1 + gap);
    if (!pitch) return;

    const now = performance.now();
    const previous = posRef.current;
    posRef.current = clamp(drag.pos - (event.clientX - drag.x) / pitch);
    // Cartes par seconde, pour le lancer.
    drag.v = ((posRef.current - previous) / Math.max(now - drag.t, 1)) * 1000;
    drag.t = now;

    const index = indexAt(posRef.current);
    if (index !== selected) setSelected(index);
    paint();
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    dragRef.current = null;
    // Laisser filer un lancer, mais jamais au-delà de deux cartes.
    const carried = Math.max(-2, Math.min(2, drag.v * 0.18));
    settle(clamp(Math.round(posRef.current + carried)));
  };

  /* La largeur de carte commande le pas, le recul et la perspective : c'est
     la seule chose à mesurer, et seulement quand la boîte change. */
  useIsoLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const measure = () => {
      const card = cardRefs.current[0];
      if (!card) return;
      widthRef.current = card.offsetWidth;
      paint();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [paint]);

  React.useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  const active = photos[selected];

  return (
    <div
      className={cn('w-full', className)}
      style={{ ['--cf-card' as string]: cardWidth }}
      role="region"
      aria-roledescription="carrousel"
      aria-label="Photos de concerts"
    >
      <div className="relative">
        <div
          ref={frameRef}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') { event.preventDefault(); nudge(-1); }
            else if (event.key === 'ArrowRight') { event.preventDefault(); nudge(1); }
          }}
          /* Le rembourrage vertical garde les ombres portées hors du rognage. */
          className="cursor-grab overflow-hidden py-10 outline-none focus-visible:ring-2 focus-visible:ring-or active:cursor-grabbing"
          style={{
            perspective: `calc(var(--cf-card) * ${perspective})`,
            // Le glissement horizontal est à nous ; la page garde le vertical.
            touchAction: 'pan-y',
          }}
        >
          <div
            className="relative select-none"
            /* Hauteur = largeur × 3/4, le cadre étant en 4/3. */
            style={{ height: 'calc(var(--cf-card) * 0.75)', transformStyle: 'preserve-3d' }}
          >
            {photos.map((p, index) => (
              <div
                key={p.photo}
                ref={(node) => { cardRefs.current[index] = node; }}
                role="group"
                aria-roledescription="diapositive"
                aria-label={`${index + 1} sur ${count}`}
                className="absolute left-1/2 top-1/2 aspect-[4/3] overflow-hidden bg-ivoire-200 shadow-lift will-change-transform"
                style={{ width: 'var(--cf-card)' }}
              >
                {/* `object-contain` : la photo est mise à l'échelle pour tenir
                    dans le cadre, jamais recadrée. */}
                <img
                  src={p.photo}
                  alt={`Duo pianCCello — ${p.legende || 'en concert'}`}
                  draggable={false}
                  loading={index < 3 ? 'eager' : 'lazy'}
                  className="h-full w-full select-none object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Flèches — chevrons en SVG en ligne, lucide-react n'étant pas installé */}
        <button
          type="button"
          aria-label="Photo précédente"
          onClick={() => nudge(-1)}
          className="absolute left-2 sm:left-4 top-1/2 z-[200] flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-encre/15 bg-ivoire/85 text-encre backdrop-blur transition-colors duration-300 hover:border-or hover:bg-or hover:text-ivoire focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Photo suivante"
          onClick={() => nudge(1)}
          className="absolute right-2 sm:right-4 top-1/2 z-[200] flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-encre/15 bg-ivoire/85 text-encre backdrop-blur transition-colors duration-300 hover:border-or hover:bg-or hover:text-ivoire focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Légende de la photo centrale — le texte d'origine de chaque concert.
          `key` force le remontage, ce qui rejoue la transition d'apparition
          (l'original s'appuyait sur tailwindcss-animate, absent ici). */}
      <div key={selected} className="mt-6 min-h-[3.5rem] text-center animation-legende">
        <p className="font-serif text-2xl sm:text-3xl text-encre" aria-live="polite">
          {active?.legende || 'En concert'}
        </p>
        <p className="mt-2 font-sans text-xs tracking-widest2 uppercase text-or">
          {String(selected + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </p>
      </div>
    </div>
  );
}
