# Luc Dacquin — cabinet

Site vitrine de Luc Dacquin, énergéticien, rebouteux et coupeur de feu.
Cabinet à Saint-Julien-en-Genevois (France / Suisse romande), à environ 30 km de Genève.

Le ton est celui d’un cabinet de soin : calme, concret, lisible. Les pratiques sont décrites en complément du suivi médical, jamais à sa place.

## Tech

Site statique HTML, CSS et JavaScript. Aucune compilation.

- Typographies auto-hébergées (Cormorant Garamond, Outfit)
- Défilement doux avec Lenis, révélations au scroll avec GSAP — désactivés si `prefers-reduced-motion`
- Déployable tel quel sur GitHub Pages

## Pages

- `index.html` — page française
- `index-en.html` — version anglaise
- `pratique.html` — renvoie vers les tarifs (anciens liens conservés)
- `mentions-legales.html`, `confidentialite.html`

## Voir le site

[https://sylviogrande-maker.github.io/rebooteux-demo/](https://sylviogrande-maker.github.io/rebooteux-demo/)

## Contenus volontairement ouverts

Aucun témoignage, aucune adresse email, aucun horaire détaillé et aucun statut juridique ne sont inventés. Les éléments publics restent factuels (téléphones, tarifs publiés, « sur rendez-vous »).

## TODO

À réafficher en retirant l’attribut `hidden` (ou le commentaire HTML indiqué dans la page). Ne rien inventer.

- Témoignages, FR et EN (`#temoignages`) : masqués. Aucun avis n’est publié tant qu’un retour réel, avec accord, n’existe pas.
- Horaires détaillés, FR et EN : masqués. La ligne publique est « Le cabinet reçoit sur rendez-vous. » / « The practice receives by appointment. »
- Email du cabinet : masqué sur l’accueil (FR et EN), dans les mentions légales et dans la politique de confidentialité. Le contact public est le téléphone France `+33 6 85 75 78 63` et le téléphone Suisse `+41 79 595 09 38`.
- Mentions légales : statut juridique, numéro SIRET et code APE masqués tant qu’ils ne sont pas confirmés.
- Adresse de rue : non publiée. Le site dit déjà qu’elle est communiquée au moment du rendez-vous.
- Frais de déplacement au-delà de 30 km : le principe est public, le montant ne l’est pas.
- Tarif d’accompagnement : forfait hebdomadaire 50 €, le même au cabinet et à distance. Tarif étudiant sur demande. Aucun autre prix n’est ajouté.
