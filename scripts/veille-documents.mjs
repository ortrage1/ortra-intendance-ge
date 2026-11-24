// Veille des documents officiels : signale chaque semaine les documents qui ont changé,
// disparu, ou les nouveaux documents publiés par Hotel & Gastro formation pour l'hôtellerie-intendance.
// Lancé par .github/workflows/veille-documents.yml. L'état précédent est gardé dans data/veille-documents.json.
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const ETAT = 'data/veille-documents.json';
const PAGE_EDITEUR = 'https://hotelgastro.ch/fr/ausbildung/hotellerie-intendance-afp-cfc/';
const AGENT = { 'User-Agent': 'Mozilla/5.0 (veille des documents, site OrTra intendance Geneve)' };

const lire = async (f, defaut) => { try { return JSON.parse(await readFile(f, 'utf8')); } catch { return defaut; } };
const etat = await lire(ETAT, { documents: {}, pdfEditeur: [] });
const premierPassage = Object.keys(etat.documents).length === 0;

// 1. Les adresses à surveiller : bibliothèque, sources des fiches, factsheets des repères.
const documents = await lire('src/content/documents.json', []);
const fiches = [];
for (const f of (await readdir('src/content/reponses')).filter((x) => x.endsWith('.md'))) {
  fiches.push({ id: f.slice(0, -3), texte: await readFile(`src/content/reponses/${f}`, 'utf8') });
}
const reperes = [];
for (const f of (await readdir('src/content/reperes')).filter((x) => x.endsWith('.json'))) {
  reperes.push({ id: f.slice(0, -5), ...(await lire(`src/content/reperes/${f}`, {})) });
}
const adresses = new Map(); // url -> libellé
for (const d of documents) if (/^https?:/.test(d.url)) adresses.set(d.url, d.titre);
for (const f of fiches) {
  const m = f.texte.match(/^\s+url:\s*"?([^"\n]+)"?/m);
  if (m && !adresses.has(m[1])) adresses.set(m[1], `Source de la fiche « ${f.id} »`);
}
for (const r of reperes) if (r.factsheet && !adresses.has(r.factsheet)) adresses.set(r.factsheet, `Factsheet ${r.sigle}`);

// Les pages du site qui s'appuient sur une adresse.
const concernees = (url) => [
  ...fiches.filter((f) => f.texte.includes(url)).map((f) => `/reponses/${f.id}/`),
  ...reperes.filter((r) => r.factsheet === url).map((r) => `/former/repere-${r.id}/`),
  ...(documents.some((d) => d.url === url) ? ['/documents/'] : []),
];

// 2. Une empreinte par adresse : le contenu pour un PDF, la date « Dernière mise à jour » pour une page web.
async function empreinte(url) {
  try {
    const r = await fetch(url, { headers: AGENT, redirect: 'follow', signal: AbortSignal.timeout(30000) });
    if (!r.ok) return { statut: r.status };
    const type = r.headers.get('content-type') ?? '';
    const corps = Buffer.from(await r.arrayBuffer());
    if (type.includes('pdf') || url.toLowerCase().endsWith('.pdf')) {
      return { statut: 200, empreinte: createHash('sha256').update(corps).digest('hex').slice(0, 16) };
    }
    const texte = corps.toString('utf8');
    const maj = texte.match(/Derni[eè]re mise [àa] jour\s*:?\s*(?:<[^>]+>\s*)*([0-9]{1,2}\.?\s*[a-zéû]+\.?\s*[0-9]{4}|[0-9]{2}\.[0-9]{2}\.[0-9]{4})/i);
    return { statut: 200, empreinte: maj ? `maj:${maj[1].trim()}` : null };
  } catch (e) {
    return { statut: 0, erreur: String(e.message ?? e).slice(0, 80) };
  }
}

const alertes = [];
const nouvelEtat = { documents: {}, pdfEditeur: etat.pdfEditeur, verifieLe: new Date().toISOString().slice(0, 10) };
for (const [url, titre] of adresses) {
  const avant = etat.documents[url];
  const maintenant = await empreinte(url);
  // Une erreur passagère ne fait pas perdre l'empreinte connue.
  nouvelEtat.documents[url] = maintenant.statut === 200 ? { titre, ...maintenant } : { ...(avant ?? { titre }), statut: maintenant.statut };
  if (premierPassage || !avant) continue;
  if (maintenant.statut !== 200 && avant.statut === 200) alertes.push({ type: 'introuvable', url, titre, detail: `erreur ${maintenant.statut || maintenant.erreur}` });
  else if (maintenant.statut === 200 && avant.empreinte && maintenant.empreinte && avant.empreinte !== maintenant.empreinte) alertes.push({ type: 'modifie', url, titre });
}

// 3. Les nouveaux PDF publiés sur la page hôtellerie-intendance de Hotel & Gastro formation.
try {
  const html = await (await fetch(PAGE_EDITEUR, { headers: AGENT, signal: AbortSignal.timeout(30000) })).text();
  const pdfs = [...new Set([...html.matchAll(/href="(https:\/\/hotelgastro\.ch\/wp-content\/uploads\/[^"]+\.(?:pdf|xlsx|docx))"/gi)].map((m) => m[1]))].sort();
  if (pdfs.length) {
    if (etat.pdfEditeur.length && !premierPassage) {
      for (const p of pdfs.filter((x) => !etat.pdfEditeur.includes(x))) alertes.push({ type: 'nouveau', url: p, titre: decodeURIComponent(p.split('/').pop()) });
    }
    nouvelEtat.pdfEditeur = pdfs;
  }
} catch { /* page indisponible : on réessaiera la semaine suivante */ }

await writeFile(ETAT, `${JSON.stringify(nouvelEtat, null, 2)}\n`);

// 4. Le rapport, en français, pour l'alerte GitHub.
const libelles = { modifie: 'Document modifié', introuvable: 'Document introuvable', nouveau: 'Nouveau document publié' };
const lignes = [];
if (premierPassage) lignes.push(`Premier passage : ${adresses.size} adresses enregistrées comme référence.`);
for (const a of alertes) {
  lignes.push(`### ${libelles[a.type]} : ${a.titre}`, '', `- Adresse : ${a.url}`);
  if (a.detail) lignes.push(`- Détail : ${a.detail}`);
  const pages = concernees(a.url);
  if (pages.length) lignes.push(`- Pages du site à relire : ${pages.join(', ')}`);
  if (a.type === 'nouveau') lignes.push('- À faire : vérifier s\'il remplace un document de la bibliothèque, une factsheet ou un plan de formation.');
  lignes.push('');
}
if (alertes.length) {
  lignes.push('**Que faire ?** Ouvrir le nouveau document, mettre à jour la bibliothèque dans l\'outil d\'édition, puis demander à l\'IA de relire les pages citées (voir le guide de transmission).');
}
await writeFile('veille-rapport.md', `${lignes.join('\n')}\n`);
console.log(`${adresses.size} adresses vérifiées, ${alertes.length} alerte(s).`);
console.log(lignes.join('\n'));
