# Touba Automobile — site React

Site vitrine (garage, lavage et detailing, vente, location, pièces, assurance) à Thiès.
React 18 + Tailwind CSS 3 + Framer Motion + Lucide React, construit avec Vite.

## Lancer

```bash
npm install
npm run dev            # développement
npm run build          # site à mettre en ligne -> dist/
npm run build:single   # un seul fichier HTML autonome -> dist-single/index.html
```

## À modifier avant la mise en ligne

- `src/config.js` : numéro WhatsApp / appel (un seul endroit pour tout le site), horaires, lien d'avis Google.
- `src/data/content.js` : prix, contenu des formules de lavage, voitures à vendre et à louer, FAQ.
  Tout ce qui est entre [crochets] est à compléter.
- `src/assets/img/` : photos libres de droits (Unsplash) à remplacer par de vraies photos du garage.
- `index.html` : URL et image de partage (Open Graph), téléphone et horaires du JSON-LD.

## Structure

- `src/App.jsx` : navigation instantanée entre les pages (pas de rechargement), fenêtres de formulaires.
- `src/components/Layout.jsx` : en-tête fixe, menu mobile, barre mobile Appeler / WhatsApp, pied de page.
- `src/components/Sections.jsx` : hero, univers, cartes de service, formules lavage, avant / après, étapes.
- `src/components/Forms.jsx` : rendez-vous (plusieurs prestations), achat / location, estimation.
- `src/pages/Pages.jsx` : Accueil, Garage, Lavage, Voitures, Pièces & assurance, Contact.

Les formulaires n'enregistrent rien : ils ouvrent WhatsApp avec le message pré-rempli.
Aucun cookie de suivi ni outil d'analyse. La carte Google ne se charge qu'au clic.
