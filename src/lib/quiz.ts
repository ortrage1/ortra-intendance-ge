// Questionnaire « L'hôtellerie-intendance, c'est pour toi ? ».
// Chaque réponse donne des points d'adéquation (0 à 2) et, parfois, des points à un département :
// A accueil, B service, C nettoyage et aménagement, D linge.
export type Dep = 'A' | 'B' | 'C' | 'D';
export interface Reponse { texte: string; ok: 0 | 1 | 2; dep?: Dep[] }
export interface Question { texte: string; aide?: string; reponses: Reponse[] }

export const QUESTIONS: Question[] = [
  { texte: 'Parmi ces activités, laquelle te plairait le plus ?', reponses: [
    { texte: 'Accueillir des personnes et les renseigner', ok: 2, dep: ['A'] },
    { texte: 'Préparer un buffet et servir les boissons et les repas', ok: 2, dep: ['B'] },
    { texte: 'Remettre une chambre en ordre, propre et accueillante', ok: 2, dep: ['C'] },
    { texte: 'Laver, repasser et plier le linge avec soin', ok: 2, dep: ['D'] },
    { texte: 'Rester derrière un écran toute la journée', ok: 0 },
  ] },
  { texte: 'Tu entres dans une pièce en désordre. Ta réaction ?', reponses: [
    { texte: 'Je vois tout de suite par où commencer', ok: 2, dep: ['C'] },
    { texte: "Je m'y mets volontiers si on me montre comment faire", ok: 1, dep: ['C'] },
    { texte: 'Ça ne me dérange pas, je laisse comme ça', ok: 0 },
  ] },
  { texte: 'Être debout et bouger une bonne partie de la journée…', reponses: [
    { texte: "J'aime ça, je n'aime pas rester assis", ok: 2 },
    { texte: 'Ça me va', ok: 1 },
    { texte: 'Je préfère rester assis', ok: 0 },
  ] },
  { texte: 'Prendre soin de clients d’hôtel, de résidents d’un EMS ou de patients…', aide: "Le métier s'exerce dans les hôtels, les EMS, les hôpitaux, les foyers et les crèches.", reponses: [
    { texte: "J'aime l'idée que les gens se sentent bien grâce à moi", ok: 2, dep: ['A', 'B'] },
    { texte: 'Ça me va, si je ne suis pas seul au début', ok: 1, dep: ['A'] },
    { texte: 'Je préfère ne pas être en contact avec les gens', ok: 0 },
  ] },
  { texte: 'Une tache sur une nappe, un pli sur un drap…', reponses: [
    { texte: 'Je le remarque tout de suite et je veux que ce soit parfait', ok: 2, dep: ['C', 'D'] },
    { texte: 'Je le vois si je fais attention', ok: 1 },
    { texte: "Ce n'est pas important pour moi", ok: 0 },
  ] },
  { texte: 'Travailler parfois le soir ou le week-end, selon un planning…', aide: 'Avant 18 ans, les horaires sont limités et protégés par la loi.', reponses: [
    { texte: 'Pas de problème, ça fait partie du métier', ok: 2 },
    { texte: "D'accord, si ce n'est pas trop souvent", ok: 1 },
    { texte: 'Impossible pour moi', ok: 0 },
  ] },
  { texte: 'Utiliser des machines professionnelles : lave-linge industriel, lave-vaisselle, machine de nettoyage…', reponses: [
    { texte: "Ça m'intéresse d'apprendre à bien m'en servir", ok: 2, dep: ['D', 'B'] },
    { texte: 'Pourquoi pas', ok: 1 },
    { texte: 'Ça ne m’attire pas du tout', ok: 0 },
  ] },
  { texte: 'Un client ou un résident n’est pas content. Que fais-tu ?', reponses: [
    { texte: "Je l'écoute calmement et je cherche une solution", ok: 2, dep: ['A'] },
    { texte: "J'appelle une collègue ou mon responsable", ok: 1 },
    { texte: 'Ça me stresse beaucoup, je préfère éviter', ok: 0 },
  ] },
  { texte: 'Décorer une salle et dresser de belles tables pour une fête…', reponses: [
    { texte: "Oui ! J'adore que tout soit beau et bien présenté", ok: 2, dep: ['B', 'C'] },
    { texte: 'Ça peut être sympa', ok: 1, dep: ['B'] },
    { texte: 'Pas mon truc', ok: 0 },
  ] },
  { texte: 'Travailler en équipe et respecter un planning…', reponses: [
    { texte: "J'aime m'organiser avec les autres pour que tout soit prêt à temps", ok: 2 },
    { texte: 'Ça me va', ok: 1 },
    { texte: 'Je préfère faire comme je veux, quand je veux', ok: 0 },
  ] },
  { texte: 'Les règles d’hygiène et de sécurité (gants, produits, linge des malades)…', reponses: [
    { texte: 'Je les respecte, elles protègent tout le monde', ok: 2, dep: ['C', 'D'] },
    { texte: 'Je les suis si on me les explique', ok: 1 },
    { texte: 'Ça me semble compliqué et inutile', ok: 0 },
  ] },
  { texte: 'Tu préfères travailler…', reponses: [
    { texte: 'En contact direct avec les clients ou les résidents', ok: 2, dep: ['A', 'B'] },
    { texte: 'Un peu des deux', ok: 2 },
    { texte: 'Dans les coulisses, pour que tout soit prêt', ok: 2, dep: ['C', 'D'] },
    { texte: 'Seul, sans contact ni équipe', ok: 0 },
  ] },
];

export const DEPARTEMENTS: Record<Dep, { nom: string; detail: string }> = {
  A: { nom: "L'accueil", detail: 'recevoir les hôtes et les résidents, les renseigner, les conseiller' },
  B: { nom: 'Le service', detail: 'préparer les salles, servir les boissons et les repas, monter un buffet' },
  C: { nom: 'Les étages et le nettoyage', detail: 'rendre les chambres et les locaux propres, beaux et accueillants' },
  D: { nom: 'La lingerie', detail: 'laver, repasser, plier et distribuer le linge' },
};

export const MAX = QUESTIONS.length * 2;
/** Seuils du résultat, en points d'adéquation sur MAX. */
export const SEUILS = { oui: 17, peutEtre: 10 };
