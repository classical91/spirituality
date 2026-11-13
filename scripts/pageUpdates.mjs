// When each page last changed — the "Last updated" line under every page.
//
// A page is its entry component plus every local module it imports, followed
// to the bottom: the data files, the CSS, the shared pieces. Hash those files
// and the hash moves whenever anything a visitor reads on that page moves.
//
// The dates live in src/data/pageUpdates.json, committed, rather than being read
// from git at build time, because the production build does not have the
// history to read: Railway builds from a snapshot with no .git, and CI checks
// out a single commit, so git would date every page to the latest deploy.
//
//   node scripts/pageUpdates.mjs           restamp changed pages with today's date
//   node scripts/pageUpdates.mjs --check   exit 1 if any page is out of date
//   node scripts/pageUpdates.mjs --from-git  date every page from git history
//
// The test suite runs the check, so a change to a page cannot merge green until
// `npm run stamp-pages` has given that page today's date.

import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const MANIFEST = path.join(ROOT, 'src/data/pageUpdates.json');

// The pages App.jsx renders, keyed the way it finds them: portal ids for the
// portals, plus the two pages that are not portals.
export const PAGES = {
  home: 'src/HomePage.jsx',
  settings: 'src/SettingsPortal.jsx',
  chakra: 'src/Chakra3DVisualizer.jsx',
  biblical: 'src/BibleConceptAtlas.jsx',
  inneratlas: 'src/InnerAtlas.jsx',
  wisdom: 'src/WisdomHub.jsx',
  wisdomteachers: 'src/WisdomAtlas.jsx',
  ascended: 'src/AscendedMastersAtlas.jsx',
  neville: 'src/NevillePortal.jsx',
  sacredsystems: 'src/SacredSystemsAtlas.jsx',
  sexualenergy: 'src/SexualEnergyDashboard.jsx',
  dailypractice: 'src/DailyPracticePortal.jsx',
  relationshiphub: 'src/RelationshipHub.jsx',
  topics: 'src/TopicsPortal.jsx',
};

// The owner's calendar day — the same zone Main Hub asks /api/daily in — so a
// change made in the evening is not dated tomorrow.
const TIME_ZONE = 'America/Vancouver';

const IMPORT_PATTERN =
  /(?:import|export)\s[^'"]*?from\s*['"](\.{1,2}\/[^'"]+)['"]|import\s*\(\s*['"](\.{1,2}\/[^'"]+)['"]\s*\)|import\s+['"](\.{1,2}\/[^'"]+)['"]/g;

function resolveImport(fromFile, specifier) {
  const base = path.resolve(path.dirname(fromFile), specifier);
  const candidates = [base, `${base}.jsx`, `${base}.js`, path.join(base, 'index.jsx'), path.join(base, 'index.js')];
  return candidates.find((file) => fs.existsSync(file) && fs.statSync(file).isFile()) ?? null;
}

// Every local file a page pulls in, as sorted repository-relative paths.
export function pageSources(entry) {
  const seen = new Set();
  const visit = (file) => {
    if (seen.has(file)) return;
    seen.add(file);
    if (!/\.(jsx?|mjs)$/.test(file)) return;
    const source = fs.readFileSync(file, 'utf8');
    for (const match of source.matchAll(IMPORT_PATTERN)) {
      const resolved = resolveImport(file, match[1] ?? match[2] ?? match[3]);
      if (resolved) visit(resolved);
    }
  };
  visit(path.join(ROOT, entry));
  return [...seen].map((file) => path.relative(ROOT, file).split(path.sep).join('/')).sort();
}

export function pageHash(entry) {
  const hash = createHash('sha256');
  for (const file of pageSources(entry)) {
    // Line endings normalized, so a Windows checkout does not restamp everything.
    const content = fs.readFileSync(path.join(ROOT, file), 'utf8').replace(/\r\n/g, '\n');
    hash.update(`${file}\0${content}\0`);
  }
  return hash.digest('hex').slice(0, 16);
}

export function today(now = new Date()) {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE }).format(now);
}

export function readManifest() {
  try {
    return JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  } catch {
    return {};
  }
}

// Pages whose recorded hash no longer matches their sources, or that have no
// entry yet.
export function stalePages(manifest = readManifest()) {
  return Object.keys(PAGES).filter((id) => manifest[id]?.hash !== pageHash(PAGES[id]));
}

function writeManifest(manifest) {
  const ordered = Object.fromEntries(Object.keys(PAGES).map((id) => [id, manifest[id]]));
  fs.writeFileSync(MANIFEST, `${JSON.stringify(ordered, null, 2)}\n`);
}

// The newest commit date across a page's files, in the owner's zone.
function gitDate(entry) {
  const sources = pageSources(entry);
  const iso = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...sources], { cwd: ROOT, encoding: 'utf8' }).trim();
  return iso ? today(new Date(iso)) : today();
}

function main(args) {
  const manifest = readManifest();
  if (args.includes('--check')) {
    const stale = stalePages(manifest);
    if (stale.length) {
      console.error(`Out of date: ${stale.join(', ')}. Run \`npm run stamp-pages\` and commit src/data/pageUpdates.json.`);
      process.exit(1);
    }
    console.log('Every page date is current.');
    return;
  }
  const fromGit = args.includes('--from-git');
  const ids = fromGit ? Object.keys(PAGES) : stalePages(manifest);
  for (const id of ids) {
    manifest[id] = { updated: fromGit ? gitDate(PAGES[id]) : today(), hash: pageHash(PAGES[id]) };
    console.log(`${id}: ${manifest[id].updated}`);
  }
  writeManifest(manifest);
  if (!ids.length) console.log('Nothing changed; every page date is current.');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2));
}
