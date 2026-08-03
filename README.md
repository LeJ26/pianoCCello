# Site Duo pianCCello

Site vitrine + boutique de partitions pour le duo de musique de chambre
**Duo pianCCello** (Claire Bournonville & Clémentine Roques).

> Ce README est écrit pour quelqu'un qui n'est **pas développeur**.
> Tout est expliqué pas à pas, sans jargon.

---

## 📁 Ce qu'il y a dans ce dossier

| Dossier / fichier | À quoi ça sert |
|---|---|
| `src/contenu/site.ts` | Nom, baseline, contact, **bios**, **répertoire**, **mentions légales**, SEO |
| `src/contenu/partitions.ts` | La **boutique** : liste des partitions à vendre |
| `src/contenu/concerts.ts` | La **galerie** : liste des concerts (date, lieu, photo) |
| `src/contenu/formules.ts` | Les **formules / tarifs** de concert |
| `src/components/` | Les briques visuelles (à toucher seulement pour changer le design) |
| `public/images/` | Toutes les photos du site |
| `public/` | Favicon, icônes, carte de visite, fichiers publics |

> 👉 **L'essentiel de ce que tu modifieras est dans le dossier `src/contenu/`.**
> Tout y est commenté en français.

### Les sections du site (dans l'ordre)
Accueil (bannière 3D piano + violoncelle) · Qui sommes-nous · Notre répertoire ·
Partitions (boutique) · Galerie de concerts · Nos formules · Réserver. Plus une
page **Mentions légales** (lien en bas de page).

---

## ✏️ Modifier le contenu — l'essentiel

### Changer un texte, le téléphone, l'email, une bio

Ouvre **`src/contenu/site.ts`**. Tout y est commenté en français.
Modifie ce qu'il faut, sauvegarde — c'est tout.

### Ajouter une partition à vendre

1. Ouvre **`src/contenu/partitions.ts`**.
2. Copie un bloc existant (de `{` à `},`) et colle-le à la suite.
3. Remplace le titre, la description, le prix, etc.
4. Pour le `acheterUrl`, voir la section « Vendre tes PDF » plus bas.

### Ajouter un concert à la galerie

1. Mets ta photo dans **`public/images/`** (idéalement en `.jpg`, format paysage, environ 1600 px de large).
2. Ouvre **`src/contenu/concerts.ts`**.
3. Copie un bloc existant, change la date, le lieu et le nom du fichier photo.
   Les concerts se trient automatiquement par date (du plus récent au plus ancien).

### Modifier une formule / un tarif

Ouvre **`src/contenu/formules.ts`**. Tu peux changer le titre, la durée, le
prix (par défaut « Sur devis ») et la liste des prestations. Mets
`misEnAvant: true` sur **une seule** formule pour la mettre en valeur.

### Modifier le répertoire ou les bios

Tout est dans **`src/contenu/site.ts`** (sections `repertoire` et `artistes`).

### Compléter les mentions légales

Dans **`src/contenu/site.ts`**, section `legal` : remplace les champs marqués
« À COMPLÉTER » (statut, hébergeur…) avant la mise en ligne.

### Remplacer une photo existante

Garde le même nom de fichier dans `public/images/` et écrase l'ancienne photo
avec la nouvelle. C'est tout. (Format paysage recommandé, ~1600 px de large.)

### Changer la bannière 3D (piano + violoncelle)

Le piano et le violoncelle 3D sont dans **`src/components/ThreeScene.astro`**.
En haut du script, un bloc **REGLAGES** permet d'ajuster facilement la taille,
l'angle de vue, la vitesse et l'écartement. Pour mettre ton propre modèle 3D
(`.glb`), suis le commentaire **`REMPLACER LE MODÈLE 3D ICI`**.

---

## 💳 Vendre tes PDF — comment ça marche

Le site **ne gère pas le paiement lui-même** (c'est plus sûr et plus simple).
On utilise une plateforme externe qui :
- héberge ton PDF ;
- encaisse le paiement ;
- envoie automatiquement le fichier à l'acheteur après l'achat.

### Plateforme recommandée : **Gumroad** (ou **Payhip**)

Pourquoi : ce sont les deux plus simples pour vendre un PDF avec **livraison
automatique**. Tu uploades ton fichier, tu mets un prix, tu récupères un lien.
C'est tout.

> ⚠️ **Évite Stripe Payment Link seul** : Stripe encaisse, mais ne livre pas
> automatiquement le fichier à l'acheteur.

### Étapes (Gumroad, ~10 minutes par partition)

1. Va sur [gumroad.com](https://gumroad.com) et crée un compte gratuit.
2. Clique sur **« New Product »** → **« Digital Product »**.
3. Uploade ton PDF, mets un titre, un prix, une description, une image de couverture.
4. **Publie** le produit.
5. Copie le lien public du produit (par exemple `https://duopianccello.gumroad.com/l/voyage`).
6. Reviens dans `src/contenu/partitions.ts`, et **remplace** `LIEN_PAIEMENT_A_REMPLIR` par ce lien pour la partition correspondante.
7. Sauvegarde. Le bouton « Acheter le PDF » devient actif.

Gumroad envoie automatiquement le PDF à l'acheteur après le paiement. Tu n'as rien d'autre à faire.

---

## 📨 Le formulaire de réservation

Par défaut, le formulaire ouvre le client mail de la personne (mailto:).
Pour recevoir les messages directement dans ta boîte sans dépendre du client
mail du visiteur, utilise **Formspree** (gratuit pour un usage modéré) :

1. Va sur [formspree.io](https://formspree.io), crée un compte gratuit.
2. Crée un nouveau formulaire, mets ton email (`duopianccello@gmail.com`).
3. Copie l'URL que Formspree te donne (ex. `https://formspree.io/f/abc123xyz`).
4. Dans **`src/contenu/site.ts`**, remplace `FORMULAIRE_A_REMPLIR` par cette URL.

---

## 🖥️ Lancer le site en local (pour le voir sur ton ordi)

> Tu as besoin d'installer **Node.js** une seule fois : [nodejs.org](https://nodejs.org) — prends la version « LTS ».

Ouvre un terminal dans ce dossier puis tape :

```bash
npm install        # première fois seulement — installe les dépendances
npm run dev        # lance le site en mode développement
```

Ouvre ensuite [http://localhost:4321](http://localhost:4321) dans ton navigateur.
Chaque modification que tu fais s'affiche en direct.

Pour arrêter le serveur : `Ctrl + C` dans le terminal.

---

## 🌍 Mettre le site en ligne

Le site est hébergé sur **Cloudflare Workers**. La configuration est déjà
faite, dans le fichier `wrangler.jsonc` à la racine :

```jsonc
{
  "name": "pianoccello",        // nom du projet côté Cloudflare
  "assets": { "directory": "./dist" }  // dossier produit par "npm run build"
}
```

Cloudflare est branché au dépôt GitHub : **chaque modification poussée sur
GitHub redéclenche le build et met le site à jour automatiquement**. Tu n'as
donc rien à faire de particulier pour publier — il suffit de pousser.

Pour suivre un déploiement (ou consulter les journaux en cas d'erreur), va
dans le tableau de bord Cloudflare, rubrique **Workers & Pages → pianoccello
→ Builds**.

### Déployer à la main (rarement utile)

Si tu veux publier sans passer par GitHub :

```bash
npm run build              # génère le dossier dist/
npx wrangler deploy        # envoie dist/ sur Cloudflare
```

### Nom de domaine

Pour brancher ton propre domaine (par ex. `duopianccello.fr`), ça se passe
dans Cloudflare, rubrique **Workers & Pages → pianoccello → Settings →
Domains & Routes**.

---

## ✅ Récapitulatif — ce qu'il te reste à faire

- [ ] Créer un compte **Gumroad** (ou Payhip) et y mettre tes partitions ; coller les liens dans `src/contenu/partitions.ts`.
- [ ] (Optionnel mais recommandé) Créer un compte **Formspree** et coller l'URL du formulaire dans `src/contenu/site.ts`.
- [ ] Remplacer / ajouter tes photos de concerts dans `public/images/` et compléter `src/contenu/concerts.ts`.
- [ ] (Plus tard) Acheter un nom de domaine (par ex. `duopianccello.fr`, ~12 €/an) et le brancher dans Cloudflare.

---

## 🛠️ Sous le capot (pour info)

- **Astro 4** — générateur de site rapide (HTML/CSS/JS produit, pas de serveur requis).
- **Tailwind CSS** — pour les styles.
- **Three.js** — pour la petite scène 3D du hero.
- **GSAP** — bibliothèque d'animations, installée directement depuis le dépôt GitHub officiel
  (`git+https://github.com/greensock/GSAP.git`). Tous les plugins (ScrollTrigger, SplitText,
  MorphSVG, DrawSVG, Flip…) sont inclus et gratuits.
- Aucun backend, aucune base de données : tout est statique → rapide, sécurisé, et gratuit à héberger.

Pour remplacer le modèle 3D du hero par le tien, ouvre `src/components/ThreeScene.astro`
et suis le commentaire `REMPLACER LE MODÈLE 3D ICI`.

---

Bon site, et bonne musique 🎵
