# BARNMAP FOR ENFUSION — Site GitHub Pages

Le site reprend exactement le mockup validé comme visuel principal et ajoute deux zones HTML transparentes cliquables au-dessus des boutons PayPal.

## 1. Mettre les vrais liens PayPal

Ouvre `config.js` et remplace :

```js
paypalUrl: "#",
donationUrl: "#"
```

par tes vrais liens, par exemple :

```js
paypalUrl: "https://www.paypal.com/TON-LIEN-ACHAT",
donationUrl: "https://www.paypal.com/TON-LIEN-DON"
```

## 2. Fichiers à mettre sur GitHub

Envoie à la racine du dépôt :

- `index.html`
- `config.js`
- le dossier `assets/`

Le site est statique et ne demande aucun serveur PHP ou Node.js.

## 3. GitHub Pages

Active GitHub Pages sur la branche qui contient ces fichiers et utilise la racine du dépôt comme dossier publié.

## Structure

```text
BARNMAP_GITHUB_SITE/
├── index.html
├── config.js
└── assets/
    └── barnmap-site.png
```

## Important

Le bouton PayPal et le bouton de don sont de vrais liens HTML transparents superposés exactement sur les boutons dessinés dans le mockup. Leur position reste proportionnelle lorsque le site s'adapte à la largeur de l'écran.
