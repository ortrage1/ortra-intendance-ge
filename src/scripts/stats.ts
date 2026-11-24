// Statistiques de fréquentation avec GoatCounter : sans cookie, sans donnée personnelle.
// Le comptage n'a lieu que sur le site public, jamais sur les aperçus ni en local.
// Quand le site aura son nom de domaine définitif, l'ajouter à cette liste.
export const DOMAINES_PUBLICS = ['ortra-intendance-ge.netlify.app'];
export const GOATCOUNTER = 'https://ortra-intendance-ge.goatcounter.com/count';

export const statsActives = () => DOMAINES_PUBLICS.includes(location.hostname);

interface GoatCounter { count?: (v: { path: string; title?: string; event?: boolean }) => void }

/** Compte un événement (recherche, clic dans le parcours). Ne fait rien hors du site public. */
export function compterEvenement(chemin: string, titre: string) {
  if (!statsActives()) return;
  const gc = (window as unknown as { goatcounter?: GoatCounter }).goatcounter;
  gc?.count?.({ path: chemin.slice(0, 120), title: titre.slice(0, 120), event: true });
}
