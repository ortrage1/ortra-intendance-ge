// Repères pratiques pour les formateurs, d'après les factsheets CFC et AFP
// (Hotel & Gastro formation Suisse et OrTra intendance Suisse, révisées en mai 2025).
// À mettre à jour si les factsheets changent.

export type Domaine = 'A' | 'B' | 'C' | 'D' | 'E';

export interface DomaineInfo { code: Domaine; nom: string; ou: string; exemples: string }
export interface Mandat { code: string; texte: string; domaines: Domaine[] }
export interface Semestre { numero: number; semaines: Partial<Record<Domaine, number>>; mandats: Mandat[]; aussi: string[] }
export interface ModuleCie { nom: string; jours: number; contenu: string[] }
export interface Repere {
  sigle: 'CFC' | 'AFP';
  titre: string;
  duree: string;
  domaines: DomaineInfo[];
  semestres: Semestre[];
  cie: ModuleCie[];
  examen: string;
  factsheet: string;
}

const LIEUX: Record<Domaine, { ou: string; exemples: string }> = {
  A: { ou: 'Accueil, réception', exemples: 'accueillir et renseigner les hôtes, résidents ou patients, conseiller, communiquer' },
  B: { ou: 'Restaurant, cafétéria, office', exemples: 'mettre en place, servir les boissons et les mets, buffet, vaisselle' },
  C: { ou: 'Étages, housekeeping, nettoyage', exemples: 'nettoyer et contrôler les chambres et les locaux, nettoyage à fond, plantes' },
  D: { ou: 'Lingerie, buanderie', exemples: 'trier, laver, repasser, distribuer le linge, linge infectieux' },
  E: { ou: 'Dans tous les services', exemples: 'organiser son travail, stocks, caisse, qualité, sécurité, instruire des collègues' },
};

const domaines = (noms: Record<Domaine, string>): DomaineInfo[] =>
  (Object.keys(noms) as Domaine[]).map((code) => ({ code, nom: noms[code], ...LIEUX[code] }));

export const REPERES: Record<'cfc' | 'afp', Repere> = {
  cfc: {
    sigle: 'CFC',
    titre: 'Gestionnaire en hôtellerie-intendance CFC',
    duree: '3 ans, 6 semestres',
    factsheet: 'https://hotelgastro.ch/wp-content/uploads/2026/02/02_Factsheet_Gestionnaire_en_hotellerie-intendance_CFC.pdf',
    examen: 'Travail pratique de 6 heures, dont un entretien professionnel de 30 minutes. Le dossier de formation peut servir d\'aide.',
    domaines: domaines({
      A: 'Présentation personnelle et communication',
      B: 'Service de boissons et de mets',
      C: 'Nettoyage et aménagement de locaux',
      D: 'Organisation du circuit du linge',
      E: 'Organisation et mise en œuvre de processus opérationnels',
    }),
    semestres: [
      { numero: 1, semaines: { A: 2, C: 11, D: 11 }, aussi: ['Entretien de fin de temps d\'essai', 'Rapport de formation'], mandats: [
        { code: 'MPE 101', texte: 'Nettoyage de contrôle et nettoyage courant', domaines: ['C', 'E'] },
        { code: 'MPE 102', texte: 'Circuit du linge, zone sale', domaines: ['A', 'D', 'E'] },
      ] },
      { numero: 2, semaines: { B: 13, C: 10 }, aussi: ['Rapport de formation'], mandats: [
        { code: 'MPE 201', texte: 'Machines et appareils, organisation de la vaisselle, élimination des déchets', domaines: ['B', 'E'] },
        { code: 'MPE 202', texte: 'Systèmes de caisse et modes de facturation', domaines: ['E'] },
        { code: 'MPE 203', texte: 'Nettoyage de contrôle et nettoyage courant', domaines: ['C', 'E'] },
        { code: 'MPE 204', texte: 'Nettoyage intermédiaire', domaines: ['C', 'E'] },
        { code: 'MPE 205', texte: 'Cycle des marchandises dans le nettoyage', domaines: ['E'] },
      ] },
      { numero: 3, semaines: { A: 3, B: 7, C: 6, D: 8 }, aussi: ['Rapport de formation'], mandats: [
        { code: 'MPE 301', texte: 'Buffet, y compris encadrer les hôtes', domaines: ['A', 'B', 'E'] },
        { code: 'MPE 302', texte: 'Aménagement des locaux et entretien des plantes', domaines: ['C', 'E'] },
        { code: 'MPE 303', texte: 'Nettoyage de contrôle et nettoyage courant', domaines: ['C', 'E'] },
        { code: 'MPE 304', texte: 'Circuit du linge, zone propre', domaines: ['A', 'D', 'E'] },
      ] },
      { numero: 4, semaines: { A: 5, B: 7, C: 5, D: 6 }, aussi: ['Rapport de formation', 'Premières discussions sur l\'avenir, par exemple les SwissSkills'], mandats: [
        { code: 'MPE 401', texte: 'Allergènes et intolérances', domaines: ['A', 'B', 'E'] },
        { code: 'MPE 402', texte: 'Nettoyage de contrôle et nettoyage courant', domaines: ['C', 'E'] },
        { code: 'MPE 403', texte: 'Instruire une autre personne sur le nettoyage', domaines: ['A', 'C', 'E'] },
        { code: 'MPE 404', texte: 'Nettoyage à fond', domaines: ['C', 'E'] },
        { code: 'MPE 405', texte: 'Organisation du circuit du linge', domaines: ['D', 'E'] },
        { code: 'MPE 406', texte: 'Aménagement des locaux et entretien des plantes', domaines: ['C', 'E'] },
      ] },
      { numero: 5, semaines: { A: 10, B: 3, C: 10, D: 1 }, aussi: ['Rapport de formation'], mandats: [
        { code: 'MPE 501', texte: 'Arrivée et départ des hôtes', domaines: ['A', 'E'] },
        { code: 'MPE 502', texte: 'Événements', domaines: ['A', 'B', 'E'] },
        { code: 'MPE 503', texte: 'Nettoyage de contrôle et nettoyage courant', domaines: ['C', 'E'] },
        { code: 'MPE 504', texte: 'Instruire une autre personne sur le circuit du linge', domaines: ['A', 'D', 'E'] },
      ] },
      { numero: 6, semaines: { A: 10, C: 8 }, aussi: ['Rapport de formation', 'Certificat de formation, avec le domaine spécifique'], mandats: [
        { code: 'MPE 601', texte: 'Conseiller et encadrer les hôtes et les clients', domaines: ['A', 'E'] },
        { code: 'MPE 602', texte: 'Nettoyage à fond', domaines: ['C', 'E'] },
        { code: 'MPE 603', texte: 'Linge infectieux', domaines: ['D', 'E'] },
      ] },
    ],
    cie: [
      { nom: 'CIE 1', jours: 3, contenu: ['Accueil et communication, 1 jour', 'Nettoyage, 1 jour', 'Circuit du linge, 1 jour'] },
      { nom: 'CIE 2', jours: 4, contenu: ['Accueil et communication, 1,5 jour', 'Service, 2,5 jours'] },
      { nom: 'CIE 3', jours: 4, contenu: ['Nettoyage, 2 jours', 'Circuit du linge, 2 jours'] },
      { nom: 'CIE 4', jours: 4, contenu: ['Accueil et communication, 1,5 jour', 'Service, 2,5 jours'] },
      { nom: 'CIE 5', jours: 4, contenu: ['Accueil, service, nettoyage et linge, 1 jour chacun'] },
    ],
  },
  afp: {
    sigle: 'AFP',
    titre: 'Employé·e en hôtellerie-intendance AFP',
    duree: '2 ans, 4 semestres',
    factsheet: 'https://hotelgastro.ch/wp-content/uploads/2026/02/02_Factsheet_Employee_en_hotellerie-intendance_AFP__Employe_en_hotellerie-intendance_AFP.pdf',
    examen: 'Travail pratique de 4 h 30, dont un entretien professionnel de 30 minutes.',
    domaines: domaines({
      A: 'Présentation personnelle et communication',
      B: 'Service de boissons et de mets',
      C: 'Nettoyage et aménagement de locaux',
      D: 'Mise en œuvre des tâches du circuit du linge',
      E: 'Mise en œuvre de processus opérationnels',
    }),
    semestres: [
      { numero: 1, semaines: { A: 1, C: 11, D: 11 }, aussi: ['Entretien de fin de temps d\'essai', 'Rapport de formation'], mandats: [
        { code: 'MPE 101', texte: 'Nettoyage de contrôle et nettoyage courant', domaines: ['C', 'E'] },
        { code: 'MPE 102', texte: 'Circuit du linge, zone sale', domaines: ['A', 'D', 'E'] },
        { code: 'MPE 103', texte: 'Aménagement des locaux et entretien des plantes', domaines: ['C', 'E'] },
      ] },
      { numero: 2, semaines: { A: 2, B: 4, C: 9, D: 8 }, aussi: ['Rapport de formation'], mandats: [
        { code: 'MPE 201', texte: 'Machines et appareils, organisation de la vaisselle, élimination des déchets', domaines: ['B', 'E'] },
        { code: 'MPE 202', texte: 'Aménagement des locaux et entretien des plantes', domaines: ['C', 'E'] },
        { code: 'MPE 203', texte: 'Nettoyage de contrôle et nettoyage courant', domaines: ['C', 'E'] },
        { code: 'MPE 204', texte: 'Nettoyage intermédiaire', domaines: ['C', 'E'] },
        { code: 'MPE 205', texte: 'Circuit du linge, zone propre', domaines: ['A', 'D', 'E'] },
      ] },
      { numero: 3, semaines: { A: 6, B: 11, C: 3, D: 3 }, aussi: ['Rapport de formation'], mandats: [
        { code: 'MPE 301', texte: 'Buffet, y compris encadrer les hôtes', domaines: ['A', 'B', 'E'] },
        { code: 'MPE 302', texte: 'Nettoyage à fond', domaines: ['C', 'E'] },
        { code: 'MPE 303', texte: 'Circuit des marchandises dans le nettoyage', domaines: ['A', 'E'] },
        { code: 'MPE 304', texte: 'Organisation du circuit du linge', domaines: ['A', 'D'] },
      ] },
      { numero: 4, semaines: { A: 3, B: 11, C: 7, D: 2 }, aussi: ['Rapport de formation', 'Certificat de formation'], mandats: [
        { code: 'MPE 401', texte: 'Accueil des hôtes', domaines: ['A', 'B', 'E'] },
        { code: 'MPE 402', texte: 'Nettoyage de contrôle et nettoyage courant', domaines: ['C', 'E'] },
        { code: 'MPE 403', texte: 'Linge infectieux', domaines: ['D', 'E'] },
      ] },
    ],
    cie: [
      { nom: 'CIE 1', jours: 2, contenu: ['Nettoyage, 1 jour', 'Circuit du linge, 1 jour'] },
      { nom: 'CIE 2', jours: 4, contenu: ['Accueil et communication, 1,5 jour', 'Service, 2,5 jours'] },
      { nom: 'CIE 3', jours: 4, contenu: ['Nettoyage, 2 jours', 'Circuit du linge, 2 jours'] },
      { nom: 'CIE 4', jours: 4, contenu: ['Accueil, service, nettoyage et linge, 1 jour chacun'] },
    ],
  },
};

/** Total des semaines en entreprise par domaine, sur toute la formation. */
export const totaux = (r: Repere) =>
  (['A', 'B', 'C', 'D'] as Domaine[]).map((d) => ({ d, semaines: r.semestres.reduce((n, s) => n + (s.semaines[d] ?? 0), 0) }));
