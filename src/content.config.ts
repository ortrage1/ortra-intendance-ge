import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';
import { CLES_PARCOURS } from './lib/parcours';

const RUBRIQUES = ['metiers', 'se-former', 'apprentis', 'former', 'formateurs', 'evaluer'] as const;

const formation = z.enum(['cfc', 'afp', 'les-deux']);
const source = z.object({ libelle: z.string(), url: z.string().url().optional() });

// Réponses directes : affichées en tête de la recherche et dans les questions fréquentes.
const reponses = defineCollection({
  loader: glob({ base: './src/content/reponses', pattern: '*.md' }),
  schema: z.object({
    titre: z.string(),
    resume: z.string(),
    motsCles: z.array(z.string()).default([]),
    formation,
    public: z.array(z.enum(['decouvrir', 'reconversion', 'former', 'evaluer'])).default([]),
    // Rubrique du menu où la fiche apparaît (pages « Les métiers », « Se former »…).
    rubrique: z.enum(RUBRIQUES).optional(),
    aussiDans: z.array(z.enum(RUBRIQUES)).optional(),
    parcours: z.array(z.enum(CLES_PARCOURS)).default([]),
    ordre: z.number().default(99),
    source,
    verifieLe: z.coerce.date(),
    statut: z.enum(['verifie', 'a-confirmer']),
  }),
});

// Fiches métier.
const metiers = defineCollection({
  loader: glob({ base: './src/content/metiers', pattern: '*.md' }),
  schema: z.object({
    titre: z.string(),
    sigle: z.enum(['CFC', 'AFP']),
    formation,
    duree: z.string(),
    resume: z.string(),
    anciensNoms: z.array(z.string()).default([]),
    source,
    verifieLe: z.coerce.date(),
  }),
});

// Bibliothèque de documents.
const documents = defineCollection({
  loader: file('./src/content/documents.json'),
  schema: z.object({
    id: z.string(),
    titre: z.string(),
    url: z.string(),
    editeur: z.string(),
    formation,
    type: z.enum(['ordonnance', 'plan-de-formation', 'programme', 'examen', 'information', 'calendrier', 'formulaire']),
    lieu: z.enum(['entreprise', 'ecole', 'cours-interentreprises', 'examen', 'general']),
    date: z.string().optional(),
    verifieLe: z.coerce.date(),
    mode: z.enum(['lien', 'copie', 'heberge']).default('lien'),
    populaire: z.boolean().default(false),
    motsCles: z.array(z.string()).default([]),
  }),
});

// Repères pratiques pour les formateurs (un fichier par diplôme), modifiables dans l'outil d'édition.
const domaine = z.enum(['A', 'B', 'C', 'D', 'E']);
const semaines = z.number().int().min(0).max(26);
const reperes = defineCollection({
  loader: glob({ base: './src/content/reperes', pattern: '*.json' }),
  schema: z.object({
    sigle: z.enum(['CFC', 'AFP']),
    titre: z.string(),
    duree: z.string(),
    revision: z.string(),
    factsheet: z.string().url(),
    examen: z.string(),
    domaines: z.array(z.object({ code: domaine, nom: z.string(), ou: z.string(), exemples: z.string() })).length(5),
    semestres: z.array(z.object({
      numero: z.number().int().min(1).max(8),
      accueil: semaines, service: semaines, nettoyage: semaines, linge: semaines,
      mandats: z.array(z.object({ code: z.string(), texte: z.string(), domaines: z.array(domaine).min(1) })),
      aussi: z.array(z.string()).default([]),
    })).min(1),
    cie: z.array(z.object({ nom: z.string(), jours: z.number().min(0), contenu: z.array(z.string()) })),
  }),
});

export const collections = { reponses, metiers, documents, reperes };
