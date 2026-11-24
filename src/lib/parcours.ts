// Structure du parcours guidé de la page d'accueil : profils et thèmes.
// Les fiches s'y rangent elles-mêmes grâce à leur champ « parcours » (ex. « apprenti/aide »).
// Pour ajouter un thème : l'ajouter ici ET dans les options du champ « parcours » de public/admin/config.yml.

export interface LienFixe { href: string; label: string; resume: string }
export interface ThemeParcours { id: string; label: string; liens?: LienFixe[] }
export interface ProfilParcours { id: string; label: string; detail: string; rubrique: string; themes: ThemeParcours[] }

export const PROFILS: ProfilParcours[] = [
  { id: 'decouvrir', label: 'Je découvre le métier', detail: 'Jeune, parent, enseignant', rubrique: '/metiers/', themes: [
    { id: 'metier', label: 'Le métier et les diplômes', liens: [
      { href: '/metiers/cfc/', label: 'Gestionnaire en hôtellerie-intendance CFC', resume: "Le métier, la formation en 3 ans, ce qu'on apprend." },
      { href: '/metiers/afp/', label: 'Employé·e en hôtellerie-intendance AFP', resume: "Le métier, la formation en 2 ans, ce qu'on apprend." },
    ] },
    { id: 'essayer', label: 'Essayer et trouver une place' },
    { id: 'concret', label: "L'apprentissage, concrètement" },
  ] },
  { id: 'adulte', label: 'Je suis adulte et je veux me former', detail: "Reconversion, diplôme à l'âge adulte", rubrique: '/se-former/', themes: [
    { id: 'diplome', label: 'Obtenir le diplôme' },
    { id: 'commencer', label: 'Me préparer et commencer' },
  ] },
  { id: 'apprenti', label: 'Je suis en apprentissage', detail: 'Apprenti·e CFC ou AFP', rubrique: '/en-apprentissage/', themes: [
    { id: 'droits', label: 'Mon contrat et mes droits' },
    { id: 'horaires', label: 'Mes horaires et mes frais' },
    { id: 'cours', label: "Les cours et l'examen" },
    { id: 'aide', label: "J'ai besoin d'aide" },
  ] },
  { id: 'entreprise', label: 'Mon entreprise veut former', detail: 'Hôtel, EMS, hôpital, foyer, crèche', rubrique: '/former/', themes: [
    { id: 'commencer', label: 'Devenir entreprise formatrice' },
    { id: 'preparer', label: 'Préparer la formation' },
  ] },
  { id: 'formateur', label: 'Je forme déjà un apprenti', detail: 'Formatrice, formateur en entreprise', rubrique: '/former/', themes: [
    { id: 'suivi', label: 'Le suivi au quotidien' },
    { id: 'contrat', label: 'Contrat, horaires et frais' },
    { id: 'difficulte', label: 'Un apprenti en difficulté' },
    { id: 'examen', label: "L'examen final" },
  ] },
  { id: 'evaluer', label: 'Je suis expert·e ou commissaire', detail: 'Ou je souhaite le devenir', rubrique: '/evaluer/', themes: [
    { id: 'devenir', label: 'Devenir expert·e ou commissaire' },
    { id: 'mission', label: 'Ma mission' },
  ] },
];

/** Toutes les clés « profil/thème », dans l'ordre d'affichage. */
export const CLES_PARCOURS = PROFILS.flatMap((p) => p.themes.map((t) => `${p.id}/${t.id}`)) as [string, ...string[]];
