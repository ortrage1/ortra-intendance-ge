// Met à jour la liste des questions les plus consultées à partir des statistiques GoatCounter.
// Lancé chaque semaine par GitHub (.github/workflows/questions-populaires.yml).
// Il faut le secret GOATCOUNTER_TOKEN (clé en lecture seule) dans les réglages du dépôt.
import { readdir, readFile, writeFile, appendFile } from 'node:fs/promises';

const SITE = 'https://ortra-intendance-ge.goatcounter.com';
const FICHIER = 'src/content/populaires.json';
const NOMBRE = 8;          // questions affichées sur la page d'accueil
const JOURS = 90;          // période observée
const MINIMUM = 20;        // en dessous de ce nombre de visites au total, on garde la sélection manuelle

const token = process.env.GOATCOUNTER_TOKEN;
if (!token) { console.log('GOATCOUNTER_TOKEN absent : rien à faire.'); process.exit(0); }

const fin = new Date();
const debut = new Date(fin.getTime() - JOURS * 864e5);
const resume = [];

async function hits(limit = 100) {
  const url = `${SITE}/api/v0/stats/hits?start=${debut.toISOString()}&end=${fin.toISOString()}&limit=${limit}`;
  const r = await fetch(url, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });
  if (!r.ok) throw new Error(`GoatCounter a répondu ${r.status} : ${await r.text()}`);
  return (await r.json()).hits ?? [];
}

const fiches = new Set((await readdir('src/content/reponses')).filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3)));
const liste = await hits();

const pages = liste
  .filter((h) => !h.event)
  .map((h) => ({ id: (h.path.match(/^\/reponses\/([a-z0-9-]+)\/?$/) ?? [])[1], count: h.count }))
  .filter((h) => h.id && fiches.has(h.id))
  .sort((a, b) => b.count - a.count);
const total = pages.reduce((n, p) => n + p.count, 0);

const actuel = JSON.parse(await readFile(FICHIER, 'utf8'));
if (total < MINIMUM || pages.length < 4) {
  console.log(`Pas encore assez de visites (${total}) : la sélection manuelle est conservée.`);
} else {
  const suivant = {
    ...actuel,
    source: 'statistiques',
    misAJourLe: fin.toISOString().slice(0, 10),
    periode: `${JOURS} derniers jours`,
    // Les plus consultées d'abord, complétées si besoin par la sélection manuelle.
    questions: [...new Set([...pages.map((p) => p.id), ...(actuel.selection ?? [])])].slice(0, NOMBRE),
  };
  await writeFile(FICHIER, `${JSON.stringify(suivant, null, 2)}\n`);
  console.log('Questions les plus consultées :', suivant.questions.join(', '));
}

// Résumé lisible dans GitHub : questions, recherches, recherches sans résultat.
const evenements = (prefixe) => liste.filter((h) => h.event && h.path.startsWith(prefixe)).slice(0, 15);
resume.push(`## Statistiques des ${JOURS} derniers jours`, '', `Visites des fiches : ${total}`, '', '### Fiches les plus lues', ...pages.slice(0, 15).map((p) => `- ${p.id} : ${p.count}`));
resume.push('', '### Recherches les plus fréquentes', ...evenements('recherche/').map((h) => `- ${h.title} : ${h.count}`));
resume.push('', '### Recherches sans résultat (fiches à créer ?)', ...evenements('recherche-sans-resultat/').map((h) => `- ${h.title} : ${h.count}`));
resume.push('', '### Parcours guidé', ...evenements('parcours/').map((h) => `- ${h.path.replace('parcours/', '')} : ${h.count}`));
if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, `${resume.join('\n')}\n`);
else console.log(resume.join('\n'));
