/* ════════════════════════════════════════════════════════════════════════
   ANIMATIONS GSAP
   ────────────────────────────────────────────────────────────────────────
   Toutes les animations du site sont regroupées ici.

   Principe : le HTML reste lisible sans JavaScript. Les états « cachés »
   (opacité 0, traits non tracés) ne sont appliqués que si la classe
   `gsap-ready` est présente sur <html> — voir le petit script en tête de
   BaseLayout.astro. Si GSAP ne se charge pas, tout reste visible.
   ════════════════════════════════════════════════════════════════════════ */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, CustomEase);

/* Reprend exactement la courbe utilisée partout dans le CSS du site
   (cubic-bezier(0.22, 1, 0.36, 1)) pour que GSAP et les transitions CSS
   existantes aient le même « toucher ». */
CustomEase.create('soft', 'M0,0 C0.22,1 0.36,1 1,1');

/* Réglages globaux : toutes les animations partent de cette base. */
gsap.defaults({ ease: 'soft', duration: 0.9 });

/* `matchMedia` gère automatiquement « animation réduite » : les tweens
   déclarés dans le bloc `(prefers-reduced-motion: no-preference)` sont
   annulés et nettoyés si l'utilisateur active l'option système. */
const mm = gsap.matchMedia();

mm.add(
  {
    animations: '(prefers-reduced-motion: no-preference)',
    reduit: '(prefers-reduced-motion: reduce)',
  },
  (context) => {
    const { animations, reduit } = context.conditions as {
      animations: boolean;
      reduit: boolean;
    };

    /* ── Mode « animation réduite » : on se contente d'afficher ────────── */
    if (reduit) {
      gsap.set('.reveal', { opacity: 1, y: 0 });
      gsap.set('.trait-anim :is(path, line, polyline, circle)', { drawSVG: '100%' });
      return;
    }
    if (!animations) return;

    /* ── 1. Entrée du hero ─────────────────────────────────────────────
       Le logo, l'accroche et les boutons apparaissent en cascade au
       chargement, sans attendre le scroll. */
    const hero = document.querySelector('#hero');
    if (hero) {
      const logo = hero.querySelector('h1');
      const accroche = hero.querySelector('p');
      const boutons = hero.querySelectorAll('a');

      /* `fromTo` plutôt que `from` : on fixe explicitement l'état d'arrivée.
         Avec `from`, GSAP déduit l'arrivée de l'état courant de l'élément —
         état qu'un rafraîchissement de ScrollTrigger peut relire alors que
         l'élément est déjà masqué, ce qui le fige à l'opacité 0. */
      gsap
        .timeline({ defaults: { duration: 1.1 } })
        .fromTo(
          logo,
          { opacity: 0, y: 28, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 1.3 }
        )
        .fromTo(accroche, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '-=0.9')
        .fromTo(
          boutons,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, stagger: 0.12 },
          '-=0.85'
        );
    }

    /* ── 2. Le contenu du hero s'efface au scroll ───────────────────────
       Effet de profondeur : le texte remonte et s'estompe pendant qu'on
       quitte la première section. */
    const heroContenu = document.querySelector('#hero .container-prose');
    if (heroContenu) {
      gsap.to(heroContenu, {
        opacity: 0,
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom 40%',
          scrub: true,
        },
      });
    }

    /* ── 3. Révélations au scroll ───────────────────────────────────────
       Remplace l'ancien IntersectionObserver. `batch` regroupe les
       éléments qui entrent ensemble dans l'écran et les décale
       légèrement — les grilles (partitions, avis…) se révèlent donc en
       cascade sans avoir à calculer un délai par carte. */
    const aReveler = gsap.utils.toArray<HTMLElement>('.reveal');
    if (aReveler.length) {
      gsap.set(aReveler, { opacity: 0, y: 24 });

      /* `amount` répartit un temps TOTAL sur le lot, là où `each` fixe un
         délai par élément. Avec `each`, un lot de 47 éléments — ce qui
         arrive quand ScrollTrigger recalcule toute la page d'un coup —
         mettrait plus de quatre secondes à se révéler. */
      const reveler = (lot: Element[], duree = 0.8, etalement = 0.45) =>
        gsap.to(lot, {
          opacity: 1,
          y: 0,
          duration: duree,
          stagger: { amount: etalement },
          overwrite: true,
        });

      ScrollTrigger.batch(aReveler, {
        start: 'top bottom-=60',
        once: true,
        onEnter: (lot) => reveler(lot),
      });

      /* Ouverture directe sur une ancre (`/#newsletter` partagé par
         quelqu'un) ou rechargement en cours de page : le navigateur saute
         à la section avant que ScrollTrigger n'ait mesuré la page. Ses
         positions sont alors périmées, `onEnter` ne se déclenche jamais et
         la section reste vide. On rattrape tout ce qui est déjà visible ou
         dépassé — uniquement si la page s'ouvre défilée, pour ne pas
         court-circuiter l'animation normale en haut de page. */
      const rattraperOuvertureDefilee = () => {
        if (window.scrollY <= 0) return;
        ScrollTrigger.refresh();
        /* Pas de test sur l'opacité : un élément déjà révélé est à 1, le
           réanimer vers 1 ne fait rien. */
        const aRattraper = aReveler.filter(
          (el) => el.getBoundingClientRect().top < window.innerHeight
        );
        /* Aucun décalage ici : on rattrape un état, on ne chorégraphie pas.
           Avec le décalage habituel de 0,09 s, 47 éléments mettraient plus
           de quatre secondes à réapparaître. */
        if (aRattraper.length) reveler(aRattraper, 0.4, 0);
      };
      /* Le saut vers l'ancre est animé (`scroll-behavior: smooth`) : au
         chargement, `scrollY` vaut encore 0 et il n'y a rien à rattraper.
         On attend donc que le défilement se pose, puis on rattrape. */
      let minuteur: number;
      const surDefilement = () => {
        clearTimeout(minuteur);
        minuteur = window.setTimeout(rattraperOuvertureDefilee, 150);
      };
      window.addEventListener('scroll', surDefilement, { passive: true });
      window.addEventListener('load', surDefilement);
      /* Filet de sécurité si aucun événement de défilement n'est émis
         (saut instantané, navigateur sans défilement animé). */
      setTimeout(rattraperOuvertureDefilee, 1200);
    }

    /* ── 4. Tracé des dessins au trait (line art) ───────────────────────
       DrawSVGPlugin dessine les traits progressivement, comme une plume
       sur le papier. */
    gsap.utils.toArray<SVGElement>('.trait-anim').forEach((svg) => {
      const traits = svg.querySelectorAll('path, line, polyline, circle');
      if (!traits.length) return;

      gsap.fromTo(
        traits,
        { drawSVG: '0%' },
        {
          drawSVG: '100%',
          duration: 1.8,
          stagger: 0.15,
          scrollTrigger: { trigger: svg, start: 'top bottom-=80', once: true },
        }
      );
    });

    /* ── 5. Barre de progression du défilement ──────────────────────────
       Pilotée par ScrollTrigger (scrub) plutôt que par un écouteur de
       scroll : le rendu est lissé par GSAP. */
    const progression = document.querySelector('#scroll-progress');
    if (progression) {
      gsap.fromTo(
        progression,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
        }
      );
    }

    /* ── 6. Bouton « retour en haut » ───────────────────────────────────
       Apparaît après 500 px de défilement. */
    const boutonHaut = document.querySelector('#back-to-top');
    if (boutonHaut) {
      gsap.set(boutonHaut, { opacity: 0, y: 12, pointerEvents: 'none' });

      const apparition = gsap.to(boutonHaut, {
        opacity: 1,
        y: 0,
        pointerEvents: 'auto',
        duration: 0.4,
        paused: true,
      });

      /* Sur une page trop courte pour défiler (la 404 par exemple),
         ScrollTrigger ramène le seuil de 500 px au maximum défilable — donc
         à 0 — et le bouton apparaîtrait à tort. On vérifie donc aussi que la
         page est réellement défilable. */
      const majBouton = () => {
        const defilable = ScrollTrigger.maxScroll(window) > 500;
        if (defilable && window.scrollY > 500) apparition.play();
        else apparition.reverse();
      };

      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top-=500',
        end: 'max',
        onEnter: majBouton,
        onLeaveBack: majBouton,
        onRefresh: majBouton,
      });
    }

    /* Nettoyage automatique si les conditions média changent. */
    return () => {
      gsap.set('.reveal', { clearProps: 'all' });
    };
  }
);

/* La page contient beaucoup d'images en `loading="lazy"` : sa hauteur change
   au fil du chargement. On recalcule alors la position des déclencheurs pour
   que la barre de progression et les révélations restent justes. */
window.addEventListener('load', () => ScrollTrigger.refresh());
