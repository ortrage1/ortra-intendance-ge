# Site OrTra intendance Genève — règles pour l'assistant IA

Site public d'information sur les formations en hôtellerie-intendance à Genève (CFC et AFP).
Les demandes viennent d'une personne bénévole non technicienne. Elle valide chaque changement sur un aperçu.

## Structure

- `src/content/reponses/*.md` : questions fréquentes et réponses directes de la recherche.
- `src/content/metiers/*.md` : fiches métier CFC et AFP.
- `src/content/documents.json` : bibliothèque de documents (un objet par document).
- `src/pages/` : pages ; `src/components/Search.astro` : recherche ; `src/styles/global.css` : couleurs et typographie.
- `public/admin/config.yml` : outil d'édition (Sveltia CMS). Tout nouveau champ de contenu doit y être ajouté.

## Règles

1. Langue : français de Suisse, phrases courtes, sans jargon. Dénominations officielles :
   « Gestionnaire en hôtellerie-intendance CFC » et « Employé·e en hôtellerie-intendance AFP ».
2. Ne jamais inventer une information réglementaire (durée, condition, date, montant). Toute information
   ajoutée cite sa source officielle (`source`) et sa date (`verifieLe`). En cas de doute, `statut: a-confirmer`.
3. Modifier le moins de fichiers possible. Ne pas changer le design ni la structure sans demande explicite.
4. Couleurs et tailles : uniquement via les variables de `src/styles/global.css`.
5. Accessibilité : contraste WCAG 2.2 AA, textes alternatifs, navigation au clavier, respect de « réduire les animations ».
6. Avant de proposer un changement : `npm run build` doit réussir.
7. Ne jamais ajouter de script de suivi, de service tiers ou de collecte de données personnelles. Seule exception, décidée par OrTra :
   GoatCounter (sans cookie), qui ne reçoit que des événements prédéfinis, jamais un texte saisi par un visiteur.
8. Expliquer chaque changement en une ou deux phrases simples, compréhensibles par une personne non technicienne.
9. Tout ce que la personne lit est en français : titres et descriptions des propositions de modification (pull requests),
   messages d'enregistrement (commits), questions posées pendant le travail.
10. Avant d'ajouter une phrase, relire la page : ne pas répéter une information déjà présente, la compléter ou la remplacer.

## Quand un document officiel change

La veille hebdomadaire (`.github/workflows/veille-documents.yml`) ouvre une alerte GitHub qui liste les pages à relire.
Pour traiter une alerte :
1. Lire le nouveau document en entier.
2. Bibliothèque : mettre à jour l'entrée dans `src/content/documents.json` (adresse, date, « Vérifié le »).
3. Factsheet : mettre à jour `src/content/reperes/cfc.json` ou `afp.json` (semaines, mandats, cours interentreprises, révision).
4. Relire chaque page citée dans l'alerte et corriger les chiffres ou les noms qui ont changé ; mettre à jour « verifieLe ».
5. Proposer les changements dans une PR en français, avec aperçu, puis fermer l'alerte.
