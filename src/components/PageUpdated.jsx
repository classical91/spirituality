import pageUpdates from '../data/pageUpdates.json';

// "Last updated 13 November 2026" at the foot of a page. The dates come from
// scripts/pageUpdates.mjs, which restamps a page whenever any file it is built
// from changes.

function formatDate(isoDay) {
  const [year, month, day] = isoDay.split('-').map(Number);
  // Built from parts, not parsed: `new Date('2026-11-13')` is UTC midnight,
  // which is the 12th everywhere west of Greenwich.
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function PageUpdated({ pageId }) {
  const updated = pageUpdates[pageId]?.updated;
  if (!updated) return null;
  return (
    <footer className="page-updated">
      Last updated <time dateTime={updated}>{formatDate(updated)}</time>
    </footer>
  );
}
