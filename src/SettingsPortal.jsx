import { useMemo, useState, useSyncExternalStore } from 'react';

import {
  AFFIRMATION_INTERVALS,
  affirmationLibrary,
  affirmationThemes,
  getAffirmationSettings,
  getRevision,
  prayerLibrary,
  prayerTypes,
  resetAffirmationSettings,
  rotatingAffirmations,
  subscribe,
  updateAffirmationSettings,
} from './lib/library.js';

// Settings: the prayers and affirmations, and everything you can do to them.
//
// Both lists are the same screen twice — a searchable list, an add form, and
// per-row edit/delete/restore — so the list, the row, and the editor are each
// written once and told which collection they are for. What differs is only the
// shape of one entry (a prayer has a type and a body; an affirmation is a theme
// and a line), and that lives in the two configs below.

const TABS = [
  { id: 'prayers', label: 'Prayers', icon: '✦', accent: '#fbbf24' },
  { id: 'affirmations', label: 'Affirmations', icon: '❋', accent: '#a78bfa' },
];

const COLLECTIONS = {
  prayers: {
    library: prayerLibrary,
    noun: 'prayer',
    plural: 'prayers',
    accent: '#fbbf24',
    groupLabel: 'Type',
    groupOptions: prayerTypes,
    // The grouping field, and the field a row shows underneath it.
    groupOf: (entry) => entry.type,
    bodyOf: (entry) => entry.prayer,
    headingOf: (entry) => entry.title,
    blank: { title: '', type: '', prayer: '' },
    fields: [
      { name: 'title', label: 'Title', placeholder: 'Evening gratitude', kind: 'text' },
      { name: 'type', label: 'Type', placeholder: 'Personal', kind: 'group' },
      { name: 'prayer', label: 'Prayer', placeholder: 'Lord, teach me…', kind: 'textarea' },
    ],
    searchOf: (entry) => `${entry.title} ${entry.type} ${entry.prayer}`,
  },
  affirmations: {
    library: affirmationLibrary,
    noun: 'affirmation',
    plural: 'affirmations',
    accent: '#a78bfa',
    groupLabel: 'Theme',
    groupOptions: affirmationThemes,
    groupOf: (entry) => entry.title,
    bodyOf: (entry) => entry.line,
    headingOf: (entry) => entry.line,
    blank: { title: '', line: '' },
    fields: [
      { name: 'title', label: 'Theme', placeholder: 'Clarity', kind: 'group' },
      { name: 'line', label: 'Affirmation', placeholder: 'I see clearly and think clearly.', kind: 'textarea' },
    ],
    searchOf: (entry) => `${entry.title} ${entry.line}`,
  },
};

// The library lives in localStorage, not in React state: Settings writes it and
// the home screen reads it. useSyncExternalStore is how this screen re-renders
// after a write here — or after one in another tab.
function useLibraryEntries(collection) {
  return useSyncExternalStore(subscribe, collection.library.all, collection.library.all);
}

function intervalLabel(seconds) {
  return seconds < 60 ? `${seconds}s` : `${seconds / 60} min`;
}

// How the home screen's Refreshing Affirmation behaves — on/off, speed, and
// which themes it draws from. The list below this edits the lines themselves.
function AffirmationDisplayPanel({ accent, onChanged }) {
  useSyncExternalStore(subscribe, getRevision, getRevision);
  const settings = getAffirmationSettings();
  const themes = affirmationThemes().filter((theme) =>
    affirmationLibrary.active().some((entry) => entry.title === theme)
  );
  const chosen = new Set(settings.themes);
  const inRotation = rotatingAffirmations().length;
  const filterFellBack =
    settings.themes.length > 0 && !affirmationLibrary.active().some((entry) => chosen.has(entry.title));

  const toggleTheme = (theme) => {
    const next = chosen.has(theme)
      ? settings.themes.filter((item) => item !== theme)
      : [...settings.themes, theme];
    updateAffirmationSettings({ themes: next });
    onChanged(next.length === 0 ? 'showing every theme' : 'themes updated');
  };

  const pill = (active) => ({
    borderColor: active ? `${accent}80` : 'rgba(255,255,255,0.10)',
    background: active ? `${accent}26` : 'rgba(255,255,255,0.03)',
    color: active ? accent : '#94a3b8',
  });

  return (
    <section
      aria-label="Affirmation display"
      className="mb-6 space-y-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-black text-white">On the home screen</h2>
          <p className="mt-1 text-xs text-slate-400">
            How the Refreshing Affirmation card behaves. {inRotation} affirmation{inRotation === 1 ? '' : 's'} in rotation.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            resetAffirmationSettings();
            onChanged('display settings reset');
          }}
          className="shrink-0 text-xs text-slate-400 transition-colors hover:text-slate-200"
        >
          Reset
        </button>
      </div>

      <label className="flex items-center justify-between gap-3">
        <span>
          <span className="block text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: accent }}>
            Auto-rotate
          </span>
          <span className="text-xs text-slate-400">
            {settings.autoRotate ? 'Changes on its own.' : 'Stays put until you tap ⟳.'}
          </span>
        </span>
        <input
          type="checkbox"
          checked={settings.autoRotate}
          onChange={(event) => {
            updateAffirmationSettings({ autoRotate: event.target.checked });
            onChanged(event.target.checked ? 'auto-rotate on' : 'auto-rotate off');
          }}
          className="h-5 w-5 cursor-pointer"
          style={{ accentColor: accent }}
        />
      </label>

      <div>
        <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: accent }}>
          Change every
        </span>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Rotation speed">
          {AFFIRMATION_INTERVALS.map((seconds) => {
            const active = settings.intervalSeconds === seconds;
            return (
              <button
                key={seconds}
                type="button"
                role="radio"
                aria-checked={active}
                disabled={!settings.autoRotate}
                onClick={() => {
                  updateAffirmationSettings({ intervalSeconds: seconds });
                  onChanged(`rotating every ${intervalLabel(seconds)}`);
                }}
                className="rounded-full border px-3 py-1.5 text-xs font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                style={pill(active)}
              >
                {intervalLabel(seconds)}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: accent }}>
            Themes
          </span>
          {settings.themes.length > 0 && (
            <button
              type="button"
              onClick={() => {
                updateAffirmationSettings({ themes: [] });
                onChanged('showing every theme');
              }}
              className="text-xs text-slate-400 transition-colors hover:text-slate-200"
            >
              Show all
            </button>
          )}
        </div>
        <p className="mb-2 text-xs text-slate-400">
          {settings.themes.length === 0
            ? 'Drawing from every theme. Pick some to focus on just those.'
            : `Focused on ${settings.themes.length} theme${settings.themes.length === 1 ? '' : 's'}.`}
        </p>
        {filterFellBack && (
          <p className="mb-2 text-xs font-semibold text-amber-300">
            None of the chosen themes have affirmations left, so every theme is showing.
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          {themes.map((theme) => {
            const active = chosen.has(theme);
            return (
              <button
                key={theme}
                type="button"
                aria-pressed={active}
                onClick={() => toggleTheme(theme)}
                className="rounded-full border px-3 py-1.5 text-xs font-bold transition-colors"
                style={pill(active)}
              >
                {theme}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Field({ field, value, onChange, groupOptions, accent }) {
  const shared = {
    value,
    onChange: (event) => onChange(field.name, event.target.value),
    placeholder: field.placeholder,
    className:
      'w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-600 focus:border-white/30',
  };
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: accent }}>
        {field.label}
      </span>
      {field.kind === 'textarea' ? (
        <textarea {...shared} rows={4} />
      ) : field.kind === 'group' ? (
        <>
          {/* A free-text box with suggestions rather than a fixed dropdown: the
              shipped types are a starting point, not the only ones allowed. */}
          <input {...shared} list={`${field.name}-options`} />
          <datalist id={`${field.name}-options`}>
            {groupOptions.map((option) => (
              <option key={option} value={option} />
            ))}
          </datalist>
        </>
      ) : (
        <input {...shared} />
      )}
    </label>
  );
}

function Editor({ collection, draft, setDraft, onSubmit, onCancel, error, submitLabel }) {
  const groupOptions = useMemo(() => collection.groupOptions(), [collection]);
  const setField = (name, value) => setDraft((current) => ({ ...current, [name]: value }));

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
    >
      {collection.fields.map((field) => (
        <Field
          key={field.name}
          field={field}
          value={draft[field.name] ?? ''}
          onChange={setField}
          groupOptions={groupOptions}
          accent={collection.accent}
        />
      ))}
      {error && <p className="text-xs font-semibold text-rose-300">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-full px-4 py-2 text-xs font-black text-black transition-opacity hover:opacity-90"
          style={{ background: collection.accent }}
        >
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-400 transition-colors hover:text-slate-200"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

function EntryRow({ collection, entry, isEditing, onEdit, onCancelEdit, onChanged }) {
  const [draft, setDraft] = useState(entry);
  const [error, setError] = useState(null);

  const startEditing = () => {
    setDraft(entry);
    setError(null);
    onEdit(entry.id);
  };

  const save = () => {
    const result = collection.library.update(entry.id, draft);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError(null);
    onChanged(`${collection.noun} updated`);
    onCancelEdit();
  };

  if (isEditing) {
    return (
      <li className="list-none">
        <Editor
          collection={collection}
          draft={draft}
          setDraft={setDraft}
          onSubmit={save}
          onCancel={onCancelEdit}
          error={error}
          submitLabel="Save changes"
        />
      </li>
    );
  }

  const group = collection.groupOf(entry);
  const heading = collection.headingOf(entry);
  const body = collection.bodyOf(entry);
  const showBody = body && body !== heading;

  return (
    <li
      className="rounded-2xl border p-4 transition-colors"
      style={{
        borderColor: entry.hidden ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.10)',
        background: entry.hidden ? 'rgba(255,255,255,0.015)' : 'rgba(255,255,255,0.03)',
        opacity: entry.hidden ? 0.55 : 1,
      }}
    >
      <div className="flex flex-wrap items-center gap-2">
        {group && (
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
            {group}
          </span>
        )}
        {entry.source === 'custom' && (
          <span className="rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.12em] text-black" style={{ background: collection.accent }}>
            Yours
          </span>
        )}
        {entry.edited && (
          <span className="rounded-full border border-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-300">
            Edited
          </span>
        )}
        {entry.hidden && (
          <span className="rounded-full border border-rose-400/30 bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-rose-300">
            Removed
          </span>
        )}
      </div>

      <p className="mt-2 text-sm font-bold text-slate-200">{heading}</p>
      {showBody && <p className="mt-1 text-xs leading-relaxed text-slate-400">{body}</p>}

      <div className="mt-3 flex flex-wrap gap-2">
        {entry.hidden ? (
          <button
            type="button"
            onClick={() => {
              collection.library.restore(entry.id);
              onChanged(`${collection.noun} restored`);
            }}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:text-white"
          >
            Restore
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={startEditing}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:text-white"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => {
                const result = collection.library.remove(entry.id);
                if (!result.ok) return;
                onChanged(
                  result.restorable
                    ? `${collection.noun} removed — restore it below`
                    : `${collection.noun} deleted`
                );
              }}
              className="rounded-full border border-rose-400/25 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-300 transition-colors hover:bg-rose-500/20"
            >
              Delete
            </button>
            {entry.edited && (
              <button
                type="button"
                onClick={() => {
                  collection.library.restore(entry.id);
                  onChanged('original wording restored');
                }}
                className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-400 transition-colors hover:text-slate-300"
              >
                Undo edits
              </button>
            )}
          </>
        )}
      </div>
    </li>
  );
}

function CollectionPanel({ collection, onChanged }) {
  const entries = useLibraryEntries(collection);
  const [query, setQuery] = useState('');
  const [showRemoved, setShowRemoved] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState(collection.blank);
  const [addError, setAddError] = useState(null);

  const counts = collection.library.counts();

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return entries
      .filter((entry) => (showRemoved ? true : !entry.hidden))
      .filter((entry) => !needle || collection.searchOf(entry).toLowerCase().includes(needle));
  }, [entries, query, showRemoved, collection]);

  const submitAdd = () => {
    const result = collection.library.add(draft);
    if (!result.ok) {
      setAddError(result.error);
      return;
    }
    setAddError(null);
    setDraft(collection.blank);
    setAdding(false);
    onChanged(`${collection.noun} added`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
        <span>
          <strong className="text-slate-300">{counts.total}</strong> in rotation
        </span>
        <span>· {counts.custom} yours</span>
        <span>· {counts.edited} edited</span>
        <span>· {counts.hidden} removed</span>
        <button
          type="button"
          onClick={() => {
            if (typeof window !== 'undefined' && !window.confirm(`Reset the ${collection.plural} to the ones the app ships with? Your own ${collection.plural} and edits will be lost.`)) return;
            collection.library.reset();
            onChanged(`${collection.plural} reset to defaults`);
          }}
          className="ml-auto text-xs text-slate-400 transition-colors hover:text-slate-400"
        >
          Reset to defaults
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={`Search ${collection.plural}…`}
          aria-label={`Search ${collection.plural}`}
          className="min-w-[200px] flex-1 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-600 focus:border-white/30"
        />
        <button
          type="button"
          onClick={() => {
            setAdding((current) => !current);
            setAddError(null);
          }}
          className="rounded-xl px-4 py-2 text-xs font-black text-black transition-opacity hover:opacity-90"
          style={{ background: collection.accent }}
        >
          {adding ? 'Close' : `+ Add ${collection.noun}`}
        </button>
        <button
          type="button"
          onClick={() => setShowRemoved((current) => !current)}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-400 transition-colors hover:text-slate-200"
        >
          {showRemoved ? 'Hide removed' : `Show removed (${counts.hidden})`}
        </button>
      </div>

      {adding && (
        <Editor
          collection={collection}
          draft={draft}
          setDraft={setDraft}
          onSubmit={submitAdd}
          onCancel={() => {
            setAdding(false);
            setAddError(null);
          }}
          error={addError}
          submitLabel={`Add ${collection.noun}`}
        />
      )}

      {visible.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6 text-center text-sm text-slate-400">
          {query ? `Nothing matched "${query}".` : `No ${collection.plural} yet — add one above.`}
        </p>
      ) : (
        <ul className="space-y-3">
          {visible.map((entry) => (
            <EntryRow
              key={entry.id}
              collection={collection}
              entry={entry}
              isEditing={editingId === entry.id}
              onEdit={setEditingId}
              onCancelEdit={() => setEditingId(null)}
              onChanged={onChanged}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default function SettingsPortal({ onBack, initialSection }) {
  const [tab, setTab] = useState(() => (initialSection === 'affirmations' ? 'affirmations' : 'prayers'));
  const [notice, setNotice] = useState(null);
  const collection = COLLECTIONS[tab];

  const announce = (message) => {
    setNotice(message);
    // The banner is a receipt, not a state: it should read as the result of the
    // click that just happened, so a new message replaces the old one outright.
    if (typeof window !== 'undefined') {
      window.clearTimeout(announce.timer);
      announce.timer = window.setTimeout(() => setNotice(null), 3000);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#070914] text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[440px] w-[440px] rounded-full bg-violet-600/15 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 pb-24 pt-10">
        <div className="mb-8 flex items-start gap-4">
          <button
            onClick={onBack}
            className="mt-1 shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-400 transition-colors hover:border-violet-400/40 hover:text-violet-300"
          >
            ← Back
          </button>
          <div className="flex-1">
            <span className="mb-2 inline-block rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-violet-300">
              Settings
            </span>
            <h1 className="text-3xl font-black tracking-tight text-white">Your Library</h1>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-400">
              Every prayer and affirmation the app draws from. Add your own, edit the wording,
              or remove the ones that are not yours — the home screen's Daily Prayer and
              Refreshing Affirmation rotate through whatever is left here. The Affirmations
              tab also sets how often the affirmation changes and which themes it shows.
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Saved in this browser only. Clearing site data resets the library to the defaults.
            </p>
          </div>
        </div>

        <div className="mb-6 flex gap-2">
          {TABS.map((item) => {
            const active = item.id === tab;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className="rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.12em] transition-colors"
                style={{
                  borderColor: active ? `${item.accent}59` : 'rgba(255,255,255,0.10)',
                  background: active ? `${item.accent}1a` : 'rgba(255,255,255,0.03)',
                  color: active ? item.accent : '#94a3b8',
                }}
              >
                <span aria-hidden="true" className="mr-1.5">{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </div>

        <div aria-live="polite" className="min-h-[24px]">
          {notice && (
            <p className="mb-3 rounded-xl border border-emerald-400/25 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-300">
              ✓ {notice}
            </p>
          )}
        </div>

        {tab === 'affirmations' && <AffirmationDisplayPanel accent={collection.accent} onChanged={announce} />}

        <CollectionPanel key={tab} collection={collection} onChanged={announce} />
      </div>
    </main>
  );
}
