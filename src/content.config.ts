import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

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
  }),
});

export const collections = { reponses, metiers, documents };
