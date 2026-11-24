// Outils pour les repères pratiques. Les données sont dans src/content/reperes/*.json,
// modifiables dans l'outil d'édition (« Repères pratiques »).
import type { CollectionEntry } from 'astro:content';

export type Domaine = 'A' | 'B' | 'C' | 'D' | 'E';
export type Repere = CollectionEntry<'reperes'>['data'];
type Semestre = Repere['semestres'][number];

/** Semaines d'un semestre, par domaine (seuls les domaines présents). */
export const semainesDu = (s: Semestre): [Domaine, number][] =>
  ([['A', s.accueil], ['B', s.service], ['C', s.nettoyage], ['D', s.linge]] as [Domaine, number][]).filter(([, n]) => n > 0);

/** Total des semaines en entreprise par domaine, sur toute la formation. */
export const totaux = (r: Repere) =>
  (['A', 'B', 'C', 'D'] as Domaine[]).map((d) => ({
    d,
    semaines: r.semestres.reduce((n, s) => n + (semainesDu(s).find(([x]) => x === d)?.[1] ?? 0), 0),
  }));
