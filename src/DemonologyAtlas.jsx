import { useState, useMemo, useRef, useEffect } from 'react';
import { demons, DEMON_FILTERS } from './data/demonology';
import { SOURCE_LAYERS, TIMELINE_TRACKS } from './data/demonologyTaxonomy';
import { DEMONOLOGY_TIMELINE, COMPARISON_IDS } from './data/demonologyTimeline';
import { GOETIA_SPIRITS } from './data/goetia';
import { codexEntries } from './data/infernalCodex';
import { searchEntries, foldText } from './lib/demonologySearch';
import { nextSort, sortRows } from './lib/moralAtlas';
import './DemonologyAtlas.css';

// Quick lookup by id, for related-concept cross-links.
const BY_ID = Object.fromEntries(demons.map((d) => [d.id, d]));

// Atlas article id → the Codex card that points to it, for "Open in Codex".
const CODEX_BY_ARTICLE = {};
codexEntries.forEach((c) => {
  if (c.article && !CODEX_BY_ARTICLE[c.article]) CODEX_BY_ARTICLE[c.article] = c.id;
});

// Group entries by category for the sidebar (in filter order).
const BY_CATEGORY = DEMON_FILTERS.slice(1).map((cat) => ({
  label: cat,
  entries: demons.filter((d) => d.category === cat),
}));

// Fields the search box looks through. Names and aliases rank first.
const SEARCH_FIELDS = [
  'name', 'aliases', 'originalName', 'role', 'summary', 'overview', 'origins',
  'religious', 'symbolism', 'interpretations', 'category', 'traditions',
  'traditionGroups', 'classification', 'associations', 'attributes', 'period',
];

// Facet options, limited to values that actually occur in the data.
function facetValues(pick) {
  const seen = new Set();
  demons.forEach((d) => pick(d).forEach((v) => seen.add(v)));
  return [...seen].sort((a, b) => a.localeCompare(b));
}
const TRADITION_OPTIONS = facetValues((d) => d.traditionGroups || []);
const CLASS_OPTIONS = facetValues((d) => (d.classification ? [d.classification] : []));
const THEME_OPTIONS = facetValues((d) => (d.associations || []).map((a) => a.theme));

// Cross-tradition comparison of the demonic (concept level).
const COMPARISON = [
  { tradition: 'Mesopotamia', concept: 'Ambivalent spirits', nature: 'Amoral causes of disease & misfortune', response: 'Incantation, amulets, exorcist (āšipu)' },
  { tradition: 'Judaism', concept: 'Shedim / yetzer hara', nature: 'Diffuse spirits; inner evil inclination', response: 'Torah, repentance, ruling over the inclination' },
  { tradition: 'Christianity', concept: 'Fallen angels', nature: 'Created, fell by choice; tempt & accuse', response: 'Grace, virtue, exorcism; defeated in Christ' },
  { tradition: 'Islam', concept: 'Jinn / Iblis', nature: 'Free-willed beings of fire; some hostile', response: 'Quranic recitation, refuge, trust in God' },
  { tradition: 'Gnosticism', concept: 'Archons / Demiurge', nature: 'Jailers enforcing ignorance & confinement', response: 'Gnosis — awakening knowledge' },
  { tradition: 'Greece', concept: 'Daimon', nature: 'Neutral intermediary; can guide', response: 'Discernment; later moralized good/bad' },
  { tradition: 'Celtic', concept: 'Otherworld powers', nature: 'Sídhe, omens, mythic foes (not "demons")', response: 'Folk custom; later absorbed or demonized' },
  { tradition: 'Hinduism', concept: 'Asuras / rākṣasas', nature: 'Rivals of the gods; morally mixed, not eternally damned', response: 'Dharma restored by gods and avatāras' },
  { tradition: 'Buddhism', concept: 'Māra / pretas', nature: 'Death and craving personified; karmic rebirths', response: 'Insight, merit, offerings to the dead' },
  { tradition: 'Jainism', concept: 'No devil', nature: 'Bondage is karma; demigods within the cosmos', response: 'Ascetic shedding of karma' },
  { tradition: 'China', concept: 'Gui / yaoguai', nature: 'Neglected dead and uncanny creatures', response: 'Ancestor rites, Ghost Festival, Daoist exorcism' },
  { tradition: 'Japan', concept: 'Yōkai / oni', nature: 'Morally variable beings; some protective', response: 'Festivals (Setsubun), shrines, appeasement' },
  { tradition: 'Southeast Asia', concept: 'Phi / hantu', nature: 'Ancestral, territorial or dangerous spirits; ghosts of the dead', response: 'Spirit houses, healers, prayer' },
];

const COMPARE_ROWS = COMPARISON_IDS.map((id) => BY_ID[id]).filter(Boolean);
const COMPARE_COLUMNS = [
  { key: 'name', label: 'Entity', value: (d) => d.name },
  { key: 'tradition', label: 'Tradition', value: (d) => d.traditionGroups || [] },
  { key: 'classification', label: 'Classification', value: (d) => d.classification },
  { key: 'associations', label: 'Traditional associations', value: (d) => (d.associations || []).map((a) => a.theme) },
];

const GOETIA_COLUMNS = [
  { key: 'n', label: 'No.', value: (s) => s.n },
  { key: 'name', label: 'Spirit', value: (s) => s.name },
  { key: 'rank', label: 'Rank', value: (s) => s.rank },
  { key: 'offices', label: 'Attributed offices (grimoire claim)', value: (s) => s.offices },
];

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function SortableHeader({ column, sort, onSort }) {
  const active = sort?.key === column.key;
  const ariaSort = active ? (sort.direction === 'asc' ? 'ascending' : 'descending') : 'none';
  return (
    <th scope="col" aria-sort={ariaSort}>
      <button type="button" className="dm-sort-btn" onClick={() => onSort(column.key)}>
        {column.label}
        <span className="dm-sort-arrow" aria-hidden="true">
          {active ? (sort.direction === 'asc' ? '▲' : '▼') : '↕'}
        </span>
      </button>
    </th>
  );
}

function useSortedRows(rows, columns) {
  const [sort, setSort] = useState(null);
  const sorted = useMemo(() => {
    if (!sort) return rows;
    const column = columns.find((c) => c.key === sort.key);
    return sortRows(rows, column.value, sort.direction);
  }, [rows, columns, sort]);
  return [sorted, sort, (key) => setSort((prev) => nextSort(prev, key))];
}

function EntryCard({ entry, isActive, onClick }) {
  return (
    <div
      className={`dm-card ${isActive ? 'active' : ''}`}
      onClick={() => onClick(entry.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(entry.id);
        }
      }}
    >
      <div className="dm-card-head">
        <span className="dm-card-icon" aria-hidden="true">{entry.icon}</span>
        <div className="dm-card-meta">
          <div className="dm-card-name">{entry.name}</div>
          <div className="dm-card-role">{entry.role}</div>
        </div>
      </div>
      <p className="dm-card-summary">{entry.summary}</p>
      <div className="dm-card-footer">
        <span className="dm-card-cat">{entry.classification || entry.category}</span>
        <span className="dm-card-trad">{(entry.traditionGroups || entry.traditions || []).slice(0, 2).join(' · ')}</span>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  if (!children) return null;
  return (
    <section>
      <h3 className="dm-section-title">{title}</h3>
      {children}
    </section>
  );
}

function Associations({ items }) {
  return (
    <ul className="dm-assoc-list">
      {items.map((a) => (
        <li key={`${a.theme}-${a.layer}`} className="dm-assoc-row">
          <div className="dm-assoc-row-head">
            <span className="dm-assoc-theme">{a.theme}</span>
            <span className={`dm-layer dm-layer-${a.layer}`}>{SOURCE_LAYERS[a.layer]}</span>
          </div>
          <p className="dm-assoc-basis">{a.basis}</p>
        </li>
      ))}
    </ul>
  );
}

function GoetiaTable({ onSelect, onOpenCodex }) {
  const [filter, setFilter] = useState('');
  const rows = useMemo(() => {
    const q = foldText(filter);
    if (!q) return GOETIA_SPIRITS;
    return GOETIA_SPIRITS.filter((s) =>
      foldText([s.n, s.name, ...s.aliases, ...s.rank, s.offices].join(' ')).includes(q)
    );
  }, [filter]);
  const [sorted, sort, onSort] = useSortedRows(rows, GOETIA_COLUMNS);

  return (
    <div>
      <p className="dm-prose dm-goetia-lead">
        All 72 spirits, in the numbering, spelling and ranks of the Mathers–Crowley edition (1904).
        The "offices" column summarizes what the 17th-century grimoire claims — it is a historical
        record of the text, not a statement about any real being. Names with a full article open it;
        the rest open their Codex card.
      </p>
      <label className="dm-goetia-filter">
        <span className="dm-visually-hidden">Filter the 72 spirits</span>
        <input
          type="search"
          className="dm-search dm-search-small"
          placeholder="Filter by name, rank or office…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </label>
      <div className="dm-table-wrap" tabIndex={0} role="region" aria-label="The 72 spirits of the Ars Goetia — scroll sideways for more">
        <table className="dm-table dm-table-goetia">
          <caption className="dm-visually-hidden">The 72 spirits of the Ars Goetia ({rows.length} shown)</caption>
          <thead>
            <tr>
              {GOETIA_COLUMNS.map((c) => <SortableHeader key={c.key} column={c} sort={sort} onSort={onSort} />)}
            </tr>
          </thead>
          <tbody>
            {sorted.map((s) => (
              <tr key={s.n}>
                <td>{s.n}</td>
                <td>
                  <button
                    type="button"
                    className="dm-table-link"
                    onClick={() => (BY_ID[s.id] ? onSelect(s.id) : onOpenCodex?.(s.id))}
                    disabled={!BY_ID[s.id] && !onOpenCodex}
                  >
                    {s.name}
                  </button>
                  {s.aliases.length > 0 && <div className="dm-table-sub">{s.aliases.join(', ')}</div>}
                </td>
                <td>{s.rank.join(' & ')}</td>
                <td>{s.offices}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DetailPanel({ entry, onSelect, onOpenCodex }) {
  const attrs = entry.attributes || {};
  const attrKeys = Object.keys(attrs);
  const related = (entry.related || [])
    .map((id) => BY_ID[id])
    .filter(Boolean);
  const codexId = CODEX_BY_ARTICLE[entry.id];
  const facts = [
    entry.classification && { label: 'Classification', value: entry.classification },
    entry.traditionGroups?.length && { label: 'Tradition', value: entry.traditionGroups.join(' · ') },
    entry.period && { label: 'Sources date from', value: entry.period },
  ].filter(Boolean);

  return (
    <article className="dm-detail" aria-labelledby={`dm-title-${entry.id}`}>
      <div className="dm-detail-header">
        <div className="dm-detail-hero">
          <span className="dm-detail-icon" aria-hidden="true">{entry.icon}</span>
          <div className="dm-detail-title-wrap">
            <h2 id={`dm-title-${entry.id}`} className="dm-detail-name">{entry.name}</h2>
            {entry.originalName && (
              <div className="dm-detail-original">{entry.originalName}</div>
            )}
            <div className="dm-detail-role">{entry.role}</div>
            {entry.aliases?.length > 0 && (
              <div className="dm-detail-aliases">Also: {entry.aliases.join(' · ')}</div>
            )}
          </div>
        </div>
        <p className="dm-detail-summary">{entry.summary}</p>
        {facts.length > 0 && (
          <dl className="dm-facts">
            {facts.map((f) => (
              <div key={f.label} className="dm-fact">
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {codexId && onOpenCodex && (
          <button type="button" className="dm-codex-link dm-detail-codex" onClick={() => onOpenCodex(codexId)}>
            Open the Codex card →
          </button>
        )}
      </div>

      <div className="dm-detail-body">
        {entry.traditions && entry.traditions.length > 0 && (
          <Section title="Traditions & Sources">
            <div className="dm-traditions">
              {entry.traditions.map((t) => (
                <span key={t} className="dm-trad-chip">{t}</span>
              ))}
            </div>
          </Section>
        )}

        <Section title="Overview">
          <p className="dm-prose">{entry.overview}</p>
        </Section>

        {entry.origins && (
          <Section title="Historical Origins">
            <p className="dm-prose">{entry.origins}</p>
          </Section>
        )}

        {entry.religious && (
          <Section title="Religious Context">
            <p className="dm-prose">{entry.religious}</p>
          </Section>
        )}

        {entry.associations?.length > 0 && (
          <Section title="Traditional Associations">
            <p className="dm-assoc-lead">
              What this figure has been associated with, and on whose authority. These describe
              beliefs and texts, not established supernatural causes.
            </p>
            <Associations items={entry.associations} />
          </Section>
        )}

        {(entry.symbolism || attrKeys.length > 0) && (
          <Section title="Symbolism & Attributes">
            {entry.symbolism && <p className="dm-prose" style={{ marginBottom: attrKeys.length ? '0.8rem' : 0 }}>{entry.symbolism}</p>}
            {attrKeys.length > 0 && (
              <div className="dm-assoc-grid">
                {attrKeys.map((k) => (
                  <div key={k} className="dm-assoc-item">
                    <div className="dm-assoc-key">{k}</div>
                    <div className="dm-assoc-val">{attrs[k]}</div>
                  </div>
                ))}
              </div>
            )}
          </Section>
        )}

        {entry.id === 'ars-goetia' && (
          <Section title="The 72 Spirits">
            <GoetiaTable onSelect={onSelect} onOpenCodex={onOpenCodex} />
          </Section>
        )}

        {entry.interpretations && (
          <Section title="Major Interpretations">
            <p className="dm-prose">{entry.interpretations}</p>
          </Section>
        )}

        {related.length > 0 && (
          <Section title="Related Concepts">
            <div className="dm-related">
              {related.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  className="dm-related-link"
                  onClick={() => onSelect(r.id)}
                >
                  <span aria-hidden="true">{r.icon}</span> {r.name}
                </button>
              ))}
            </div>
          </Section>
        )}

        {entry.reading && entry.reading.length > 0 && (
          <Section title="Sources & Further Reading">
            <ul className="dm-texts">
              {entry.reading.map((t) => (
                <li key={t} className="dm-text-chip">{t}</li>
              ))}
            </ul>
          </Section>
        )}

        {entry.note && (
          <div>
            <div className="dm-note-label">Educational Note</div>
            <div className="dm-note">{entry.note}</div>
          </div>
        )}
      </div>
    </article>
  );
}

function TimelineLanes({ onSelect }) {
  const lanes = TIMELINE_TRACKS.map((track) => ({
    track,
    items: DEMONOLOGY_TIMELINE.filter((t) => t.track === track).sort((a, b) => a.start - b.start),
  })).filter((l) => l.items.length > 0);
  return (
    <div className="dm-lanes">
      {lanes.map(({ track, items }) => (
        <section key={track} className="dm-lane" aria-label={`${track} timeline`}>
          <h3 className="dm-lane-title">{track}</h3>
          <ol className="dm-timeline">
            {items.map((t) => (
              <li key={`${t.era}-${t.text.slice(0, 20)}`} className="dm-tl-item">
                <div className="dm-tl-era">{t.era}</div>
                <div className="dm-tl-text">{t.text}</div>
                {t.links?.length > 0 && (
                  <div className="dm-tl-links">
                    {t.links.filter((id) => BY_ID[id]).map((id) => (
                      <button key={id} type="button" className="dm-tl-link" onClick={() => onSelect(id)}>
                        {BY_ID[id].name}
                      </button>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}

function EntityComparison({ onSelect }) {
  const [sorted, sort, onSort] = useSortedRows(COMPARE_ROWS, COMPARE_COLUMNS);
  return (
    <div className="dm-table-wrap" tabIndex={0} role="region" aria-label="Entity comparison table — scroll sideways for more">
      <table className="dm-table">
        <caption className="dm-visually-hidden">Entities compared by tradition, classification and traditional associations</caption>
        <thead>
          <tr>
            {COMPARE_COLUMNS.map((c) => <SortableHeader key={c.key} column={c} sort={sort} onSort={onSort} />)}
          </tr>
        </thead>
        <tbody>
          {sorted.map((d) => (
            <tr key={d.id}>
              <td>
                <button type="button" className="dm-table-link" onClick={() => onSelect(d.id)}>{d.name}</button>
              </td>
              <td>{(d.traditionGroups || []).join(', ')}</td>
              <td>{d.classification}</td>
              <td>{(d.associations || []).map((a) => a.theme).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function IntroPanel({ onSelect }) {
  return (
    <div className="dm-intro">
      <div className="dm-intro-card">
        <h2 className="dm-intro-title">A Comparative Reference Library</h2>
        <p className="dm-intro-lead">
          This atlas explores demons, spiritual adversaries, spirits, ghosts, evil, temptation, sin,
          mythology, folklore, occult traditions, and psychological interpretations — neutrally and
          historically, from Mesopotamia and the Bible to Islam, South Asia, China, Japan and Southeast
          Asia. Select any entry to read a structured article, or use the search and filters to explore
          by tradition, classification or traditional association. It is a study resource only: it
          documents what traditions have believed, never how to practice anything.
        </p>
      </div>

      <div className="dm-intro-card">
        <h2 className="dm-intro-title">Timeline — Parallel Traditions</h2>
        <p className="dm-intro-lead">
          Each lane is a separate tradition running side by side. Dates are approximate, and nothing
          here implies that one tradition descends from another — Japanese yōkai or Buddhist Māra did not
          grow out of European demonology.
        </p>
        <TimelineLanes onSelect={onSelect} />
      </div>

      <div className="dm-intro-card">
        <h2 className="dm-intro-title">Comparison — The Demonic Across Traditions</h2>
        <p className="dm-intro-lead">
          "Demon" means very different things in different worlds. The English word flattens these
          distinctions; comparison restores them.
        </p>
        <div className="dm-table-wrap" tabIndex={0} role="region" aria-label="Tradition comparison table — scroll sideways for more">
          <table className="dm-table">
            <caption className="dm-visually-hidden">How traditions conceive of hostile or ambivalent spirits</caption>
            <thead>
              <tr>
                <th scope="col">Tradition</th>
                <th scope="col">Core concept</th>
                <th scope="col">Nature of the demonic</th>
                <th scope="col">Response</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.tradition}>
                  <td>{row.tradition}</td>
                  <td>{row.concept}</td>
                  <td>{row.nature}</td>
                  <td>{row.response}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dm-intro-card">
        <h2 className="dm-intro-title">Comparison — Individual Figures</h2>
        <p className="dm-intro-lead">
          Each row is read from its article. Classifications use the figure&apos;s own tradition — an
          oni is not filed as a fallen angel, nor Māra as Satan. Select a column to sort; select a name
          to open the article.
        </p>
        <EntityComparison onSelect={onSelect} />
      </div>
    </div>
  );
}

function FacetSelect({ id, label, value, options, onChange }) {
  return (
    <label className="dm-facet" htmlFor={id}>
      <span className="dm-facet-label">{label}</span>
      <select id={id} className="dm-facet-select" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Any</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

export default function DemonologyAtlas({ onBack, onNavigate, initialSection, embedded = false }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [tradition, setTradition] = useState('');
  const [classification, setClassification] = useState('');
  const [theme, setTheme] = useState('');
  // Mobile-only: the topic index is collapsed behind a toggle so readers
  // don't have to scroll past ~100 links to reach the content.
  const [navOpen, setNavOpen] = useState(false);
  const contentRef = useRef(null);
  // Honor a ?section= deep-link if it matches an entry id.
  const [activeId, setActiveId] = useState(() =>
    initialSection && BY_ID[initialSection] ? initialSection : null
  );
  // A deep link scrolls to its article on arrival (on mobile the hero and
  // filters would otherwise hide it below the fold).
  const pendingScroll = useRef(Boolean(initialSection && BY_ID[initialSection]));

  // Follow later changes to the deep-link target (e.g. cross-portal navigation).
  const [lastSection, setLastSection] = useState(initialSection);
  if (initialSection !== lastSection) {
    setLastSection(initialSection);
    if (initialSection && BY_ID[initialSection]) {
      setActiveId(initialSection);
    }
  }

  const facetsActive = Boolean(tradition || classification || theme);

  const visible = useMemo(() => {
    const byFacet = demons.filter((d) => {
      if (activeFilter !== 'All' && d.category !== activeFilter) return false;
      if (tradition && !(d.traditionGroups || []).includes(tradition)) return false;
      if (classification && d.classification !== classification) return false;
      if (theme && !(d.associations || []).some((a) => a.theme === theme)) return false;
      return true;
    });
    return searchEntries(byFacet, search, SEARCH_FIELDS);
  }, [activeFilter, search, tradition, classification, theme]);

  const visibleIds = useMemo(() => new Set(visible.map((v) => v.id)), [visible]);

  const activeEntry = activeId ? BY_ID[activeId] : null;

  const handleSelect = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
    setNavOpen(false);
    pendingScroll.current = true;
  };

  // From an intro table or timeline: always open (never toggle closed).
  const openEntry = (id) => {
    setActiveId(id);
    setNavOpen(false);
    pendingScroll.current = true;
  };

  const openCodex = onNavigate ? (codexId) => onNavigate('infernalcodex', { entry: codexId }) : undefined;

  const clearFacets = () => {
    setTradition('');
    setClassification('');
    setTheme('');
    setActiveId(null);
  };

  // Scroll after the re-render so the collapsed index doesn't throw off the
  // measured position.
  useEffect(() => {
    if (!pendingScroll.current) return;
    pendingScroll.current = false;
    if (typeof window === 'undefined') return;
    // Wait a frame: the host atlas resets the scroll position when its
    // section changes, and that must not cancel this jump.
    const frame = window.requestAnimationFrame(() => {
      if (window.innerWidth <= 900 && contentRef.current) {
        // On mobile the hero + index sit above the article; jump straight to it.
        contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeId]);

  const showIntro = !activeEntry && !search.trim() && activeFilter === 'All' && !facetsActive;
  const resultLabel = `${visible.length} ${visible.length === 1 ? 'entry' : 'entries'}`;

  return (
    <div className={`dm-root ${embedded ? 'dm-root-embedded' : ''}`}>
      {/* Hero */}
      <div className="dm-hero">
        {onBack && (
          <button className="dm-back" onClick={onBack}>
            ← Back
          </button>
        )}
        <div className="dm-orb-wrap" aria-hidden="true">
          <div className="dm-orb" />
          <div className="dm-ring dm-ring-1" />
          <div className="dm-ring dm-ring-2" />
          <div className="dm-ring dm-ring-3" />
        </div>
        <h1 className="dm-hero-title">Demonology &amp; Spiritual Adversaries</h1>
        <p className="dm-hero-subtitle">
          A comparative, academic reference to demons, spiritual adversaries, spirits and ghosts, evil,
          sin, mythology, folklore, occult traditions, and their psychological interpretations.
        </p>
        <div className="dm-disclaimer">
          <strong>Educational use only.</strong> This atlas studies what traditions have believed about
          demons and spirits across history, theology, mythology, and psychology. It contains no
          instructions for summoning, invoking, worshipping, or contacting any entity.
          {onNavigate && (
            <>
              {' '}For the broader A-Z database, open the{' '}
              <button className="dm-codex-link" onClick={() => onNavigate('infernalcodex')}>
                Infernal &amp; Mythic Codex
              </button>.
            </>
          )}
        </div>
        <div className="dm-search-wrap">
          <span className="dm-search-icon"><SearchIcon /></span>
          <input
            className="dm-search"
            type="search"
            aria-label="Search the Demonology Atlas"
            placeholder="Search names, alternate spellings, traditions…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setActiveId(null);
            }}
          />
        </div>
      </div>

      {/* Category chips */}
      <div className="dm-filters" role="group" aria-label="Filter by category">
        {DEMON_FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={`dm-chip ${activeFilter === f ? 'active' : ''}`}
            aria-pressed={activeFilter === f}
            onClick={() => {
              setActiveFilter(f);
              setActiveId(null);
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Facet refinements */}
      <div className="dm-facets" role="group" aria-label="Refine by tradition, classification or association">
        <FacetSelect id="dm-facet-tradition" label="Tradition" value={tradition} options={TRADITION_OPTIONS} onChange={(v) => { setTradition(v); setActiveId(null); }} />
        <FacetSelect id="dm-facet-class" label="Classification" value={classification} options={CLASS_OPTIONS} onChange={(v) => { setClassification(v); setActiveId(null); }} />
        <FacetSelect id="dm-facet-theme" label="Association" value={theme} options={THEME_OPTIONS} onChange={(v) => { setTheme(v); setActiveId(null); }} />
        {facetsActive && (
          <button type="button" className="dm-chip dm-facet-clear" onClick={clearFacets}>Clear</button>
        )}
      </div>
      <p className="dm-visually-hidden" aria-live="polite">{resultLabel}</p>

      {/* Main layout */}
      <div className="dm-layout">
        {/* Mobile-only toggle for the topic index */}
        <button
          type="button"
          className="dm-sidebar-toggle"
          onClick={() => setNavOpen((o) => !o)}
          aria-expanded={navOpen}
          aria-controls="dm-topic-index"
        >
          <span>☰ Browse all topics ({visible.length})</span>
          <span className={`dm-sidebar-toggle-arrow ${navOpen ? 'open' : ''}`} aria-hidden="true">▾</span>
        </button>

        {/* Sidebar */}
        <nav id="dm-topic-index" className={`dm-sidebar ${navOpen ? 'dm-sidebar-open' : ''}`} aria-label="Demonology topics">
          {BY_CATEGORY.map(({ label, entries }) => {
            const filtered = entries.filter((d) => visibleIds.has(d.id));
            if (filtered.length === 0) return null;
            return (
              <div key={label}>
                <div className="dm-sidebar-label">{label}</div>
                {filtered.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    className={`dm-sidebar-item ${activeId === d.id ? 'active' : ''}`}
                    aria-current={activeId === d.id ? 'true' : undefined}
                    onClick={() => handleSelect(d.id)}
                  >
                    <span className="dm-sidebar-icon" aria-hidden="true">{d.icon}</span>
                    <span className="dm-sidebar-name">{d.name}</span>
                  </button>
                ))}
              </div>
            );
          })}
        </nav>

        {/* Content */}
        <div ref={contentRef} className="dm-content">
          {activeEntry ? (
            <DetailPanel entry={activeEntry} onSelect={handleSelect} onOpenCodex={openCodex} />
          ) : (
            <>
              {showIntro && <IntroPanel onSelect={openEntry} />}
              <div className="dm-grid">
                {visible.length === 0 ? (
                  <div className="dm-empty">
                    <div className="dm-empty-icon" aria-hidden="true">🜏</div>
                    <div className="dm-empty-text">No entries found for that search.</div>
                  </div>
                ) : (
                  visible.map((d) => (
                    <EntryCard
                      key={d.id}
                      entry={d}
                      isActive={activeId === d.id}
                      onClick={handleSelect}
                    />
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
