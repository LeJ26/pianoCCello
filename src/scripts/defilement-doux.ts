// Défilement doux (smooth scroll) propulsé par Lenis.
// https://github.com/darkroomengineering/lenis
//
// Ce module s'occupe de trois choses :
//   1. démarrer / arrêter Lenis selon la préférence « animations réduites » ;
//   2. exposer `window.defilementDoux` (l'instance) + deux aides
//      (`defilerVers`, `verrouillerDefilement`) utilisées par le layout,
//      l'en-tête et le formulaire de réservation ;
//   3. gérer les liens d'ancre (#qui, #reserver…) en tenant compte de
//      l'en-tête fixe (décalage lu dans `scroll-padding-top`).

import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

type CibleDefilement = Parameters<Lenis['scrollTo']>[0];
type OptionsDefilement = Parameters<Lenis['scrollTo']>[1];

declare global {
  interface Window {
    // NB : `window.lenis` est réservé par la bibliothèque (métadonnées de
    // version), d'où un nom distinct pour l'instance.
    defilementDoux?: Lenis;
    defilerVers?: (cible: CibleDefilement, options?: OptionsDefilement) => void;
    verrouillerDefilement?: (verrouille: boolean) => void;
  }
}

const animationsReduites = window.matchMedia('(prefers-reduced-motion: reduce)');

let lenis: Lenis | null = null;
let raf = 0;

function nombre(valeur: string): number {
  const n = parseFloat(valeur);
  return Number.isFinite(n) ? n : 0;
}

function demarrer() {
  if (lenis) return;

  lenis = new Lenis({
    duration: 1.05,
    // Les carrousels horizontaux (galerie, presse) gardent le défilement natif.
    allowNestedScroll: true,
    // Les ancres sont gérées plus bas (URL mise à jour + focus déplacé).
    anchors: false,
  });
  window.defilementDoux = lenis;

  const boucle = (temps: number) => {
    lenis?.raf(temps);
    raf = requestAnimationFrame(boucle);
  };
  raf = requestAnimationFrame(boucle);
}

function arreter() {
  if (!lenis) return;
  cancelAnimationFrame(raf);
  lenis.destroy();
  lenis = null;
  window.defilementDoux = undefined;
}

/**
 * Défile vers une cible (nombre, sélecteur ou élément) avec Lenis si actif,
 * sinon en natif. Dans les deux cas la cible est placée sous l'en-tête fixe :
 * Lenis retranche lui-même `scroll-padding-top`, la solution de repli le fait
 * à la main.
 */
window.defilerVers = (cible, options) => {
  if (lenis) {
    lenis.scrollTo(cible, options);
    return;
  }

  const decalage = options?.offset ?? 0;

  if (typeof cible === 'number') {
    window.scrollTo({ top: cible + decalage, behavior: 'smooth' });
    return;
  }

  const element = typeof cible === 'string' ? document.querySelector<HTMLElement>(cible) : cible;
  if (!(element instanceof HTMLElement)) return;

  const remplissage = nombre(getComputedStyle(document.documentElement).scrollPaddingTop);
  const marge = nombre(getComputedStyle(element).scrollMarginTop);
  const haut = element.getBoundingClientRect().top + window.scrollY - remplissage - marge + decalage;
  window.scrollTo({ top: haut, behavior: 'smooth' });
};

/** Bloque / débloque le défilement (lightbox, menu mobile). */
window.verrouillerDefilement = (verrouille) => {
  if (verrouille) lenis?.stop();
  else lenis?.start();
  document.body.style.overflow = verrouille ? 'hidden' : '';
};

// — Liens d'ancre —
document.addEventListener('click', (evenement) => {
  if (evenement.defaultPrevented || evenement.button !== 0) return;
  if (evenement.metaKey || evenement.ctrlKey || evenement.shiftKey || evenement.altKey) return;

  const lien = (evenement.target as Element | null)?.closest?.('a[href]') as
    | HTMLAnchorElement
    | null;
  if (!lien || lien.target === '_blank' || lien.hasAttribute('download')) return;

  const url = new URL(lien.href, window.location.href);
  if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
  if (!url.hash || url.hash === '#') return;

  const cible = document.querySelector<HTMLElement>(url.hash);
  if (!cible) return;

  evenement.preventDefault();
  window.defilerVers?.(cible);
  history.pushState(null, '', url.hash);

  // Accessibilité : le focus suit le défilement (lien d'évitement, clavier).
  if (!cible.hasAttribute('tabindex')) cible.setAttribute('tabindex', '-1');
  cible.focus({ preventScroll: true });
});

// Boutons précédent / suivant du navigateur : on rejoue le défilement vers
// l'ancre (sans hash, le navigateur restaure lui-même la position).
window.addEventListener('popstate', () => {
  if (!window.location.hash) return;
  const cible = document.querySelector<HTMLElement>(window.location.hash);
  if (cible) window.defilerVers?.(cible);
});

// — Respect de « animations réduites » (y compris si l'utilisateur change d'avis) —
const appliquerPreference = () => {
  if (animationsReduites.matches) arreter();
  else demarrer();
};
appliquerPreference();
animationsReduites.addEventListener('change', appliquerPreference);
