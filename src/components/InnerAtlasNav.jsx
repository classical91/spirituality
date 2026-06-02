const innerAtlasSections = [
  { id: 'nervous-system', label: 'Nervous System' },
  { id: 'psychology', label: 'Psychology' },
  { id: 'mood-neurochemistry', label: 'Mood' },
  { id: 'lifestyle', label: 'Lifestyle' },
  { id: 'colorpsychology', label: 'Colors' },
  { id: 'regulation', label: 'Regulation' },
  { id: 'emotions', label: 'Emotions' },
];

export default function InnerAtlasNav({ activeId, onBack, onSelectSection, title, backLabel = 'InnerAtlas' }) {
  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-[#080b14]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
        >
          ← {backLabel}
        </button>

        <div className="mr-1 min-w-0">
          <div className="text-sm font-black" style={{ color: 'var(--ia-accent, #86efac)' }}>InnerAtlas</div>
          {title && <div className="text-xs font-semibold text-slate-500">{title}</div>}
        </div>

        <nav className="flex min-w-0 flex-1 flex-wrap gap-2" aria-label="InnerAtlas sections">
          {innerAtlasSections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => onSelectSection?.(section.id)}
                className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                  isActive
                    ? ''
                    : 'border-white/10 bg-white/[0.04] text-slate-400 hover:border-white/20 hover:text-white'
                }`}
                style={
                  isActive
                    ? {
                        borderColor: 'var(--ia-accent-line, rgba(134,239,172,0.5))',
                        background: 'var(--ia-accent-chip, rgba(134,239,172,0.15))',
                        color: 'var(--ia-accent, #d1fae5)',
                      }
                    : undefined
                }
              >
                {section.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
