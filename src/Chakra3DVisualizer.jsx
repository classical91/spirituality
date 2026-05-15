import { useMemo, useState, useEffect, useCallback } from "react";
import { hinduChakras } from "./data/hinduChakras";
import { raChakras } from "./data/raChakras";
import { baileyChakras } from "./data/baileyChakras";

const SYSTEMS = [
  { id: "hindu", label: "Hindu", fullLabel: "Hindu / Traditional", data: hinduChakras, aspectLabel: "Element" },
  { id: "ra", label: "Ra", fullLabel: "Ra / Law of One", data: raChakras, aspectLabel: "Aspect" },
  { id: "bailey", label: "Bailey", fullLabel: "Alice Bailey", data: baileyChakras, aspectLabel: "Ray" },
];

function googleImageUrl(query) {
  return "https://www.google.com/search?tbm=isch&q=" + encodeURIComponent(query);
}

function youtubeSearchUrl(query) {
  return "https://www.youtube.com/results?search_query=" + encodeURIComponent(query);
}

function openExternalUrl(url) {
  const openedWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (openedWindow) openedWindow.focus();
  else window.location.href = url;
}

function IconBadge({ label, className = "" }) {
  return (
    <span className={`inline-grid h-9 w-9 place-items-center rounded-2xl border border-white/15 bg-white/10 text-lg shadow-lg ${className}`}>
      {label}
    </span>
  );
}

function ChakraOrb({ chakra, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full outline-none transition duration-300 hover:scale-110 active:scale-95"
      style={{ top: chakra.y, left: chakra.x }}
      aria-label={`Select ${chakra.name}`}
    >
      <span
        className={`absolute inset-0 rounded-full ${selected ? "animate-ping" : "animate-pulse"}`}
        style={{ background: chakra.color, boxShadow: `0 0 42px ${chakra.glow}` }}
      />
      <span
        className={`relative grid h-8 w-8 place-items-center rounded-full border border-white/70 shadow-lg md:h-10 md:w-10 ${selected ? "ring-4 ring-white/30" : ""}`}
        style={{ background: chakra.color, boxShadow: `0 0 30px ${chakra.glow}` }}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-white/90" />
      </span>
    </button>
  );
}

function BodyModel({ chakras, selectedId, onOrbClick, rotate }) {
  const selected = chakras.find((item) => item.id === selectedId) || chakras[3];

  const rings = [
    { r: 130, color: 'rgba(168,85,247,0.30)', blur: 8 },
    { r: 195, color: 'rgba(99,102,241,0.22)', blur: 10 },
    { r: 265, color: 'rgba(6,182,212,0.20)', blur: 12 },
    { r: 340, color: 'rgba(34,197,94,0.16)', blur: 14 },
    { r: 420, color: 'rgba(250,204,21,0.12)', blur: 16 },
    { r: 505, color: 'rgba(239,68,68,0.09)', blur: 18 },
  ];

  return (
    <div
      className="relative mx-auto flex min-h-[560px] w-full max-w-[430px] items-center justify-center overflow-hidden rounded-[2rem] shadow-2xl"
      style={{ background: '#030510', border: '1px solid rgba(168,85,247,0.15)' }}
    >
      {/* Energy field background image */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'url("/assets/chakra-body-energy-field.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.55,
        filter: 'saturate(1.3) contrast(1.05)',
      }} />

      {/* Dark overlay so the SVG figure stays legible */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 160% 140% at 50% 42%, rgba(9,5,62,0.55) 0%, rgba(3,5,16,0.72) 65%)',
      }} />

      {/* Selected-chakra ambient aura */}
      <div className="absolute inset-0 transition-all duration-700" style={{
        background: `radial-gradient(ellipse 50% 65% at 50% 40%, ${selected.color}22 0%, ${selected.color}0c 55%, transparent 78%)`,
        filter: 'blur(18px)',
      }} />

      {/* Concentric rings centered at heart level */}
      {rings.map((ring, i) => (
        <div key={i} className="absolute pointer-events-none" style={{
          top: '38%', left: '50%',
          width: `${ring.r * 2}px`, height: `${ring.r * 2}px`,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          border: `1px solid ${ring.color}`,
          boxShadow: `0 0 ${ring.blur}px ${ring.color}, inset 0 0 ${ring.blur}px ${ring.color}`,
        }} />
      ))}

      {/* Label */}
      <div className="absolute left-5 top-5 z-10 rounded-full px-3 py-1 text-xs font-medium text-white/40"
           style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}>
        Energy Body
      </div>

      {/* Figure container — seated lotus pose */}
      <div className={`relative h-[500px] w-[240px] ${rotate ? "animate-[chakraSway_7s_ease-in-out_infinite]" : ""}`}>

        {/* Photo body */}
        <img
          src="/assets/chakra-body-photo.jpg"
          alt="Chakra energy body"
          className="absolute inset-0 h-full w-full object-contain pointer-events-none"
          style={{ filter: 'drop-shadow(0 0 8px rgba(180,215,255,0.5))' }}
        />

        {/* Chakra orbs */}
        {chakras.map((chakra) => (
          <ChakraOrb key={chakra.id} chakra={chakra} selected={selectedId === chakra.id} onClick={() => onOrbClick(chakra.id)} />
        ))}
      </div>

      {/* Bottom info bar */}
      <div className="absolute bottom-5 left-5 right-5 z-10 rounded-3xl p-4 text-white shadow-xl backdrop-blur-md"
           style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(3,5,16,0.90)' }}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="h-4 w-4 shrink-0 rounded-full" style={{ background: selected.color, boxShadow: `0 0 24px ${selected.glow}` }} />
            <div>
              <p className="text-sm font-semibold leading-none">{selected.name}</p>
              <p className="mt-1 text-xs text-slate-400">{selected.location}</p>
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            {selected.colorMeaning && (
              <span className="rounded-xl px-3 py-1 text-xs font-bold" style={{ background: `${selected.color}33`, color: selected.color }}>
                {selected.colorMeaning}
              </span>
            )}
            {selected.mantra && (
              <span className="rounded-xl border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold italic text-white/80">
                {selected.mantra}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniList({ title, items, tone = "white" }) {
  const toneClasses = {
    white: "border-white/10 bg-white/5",
    green: "border-emerald-300/15 bg-emerald-300/10",
    amber: "border-amber-300/15 bg-amber-300/10",
    blue: "border-cyan-300/15 bg-cyan-300/10",
    violet: "border-violet-300/15 bg-violet-300/10",
  };

  return (
    <section className={`rounded-[1.5rem] border p-5 text-white backdrop-blur-xl ${toneClasses[tone] || toneClasses.white}`}>
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="rounded-2xl border border-white/10 bg-slate-950/25 p-3 text-sm leading-relaxed text-slate-100">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function StretchImageLinks({ chakra, compact = false }) {
  const searches = chakra.stretchLinks || [chakra.name + " stretches"];

  return (
    <section className={`${compact ? "mt-4" : "mt-6"} rounded-[1.75rem] border border-cyan-300/15 bg-cyan-300/10 p-6 backdrop-blur-xl`}>
      <div className="mb-4 flex items-center gap-3">
        <IconBadge label="↗" className="h-8 w-8 text-cyan-100" />
        <div>
          <h3 className="text-xl font-bold">Stretch image references</h3>
          <p className="mt-1 text-sm text-slate-300">External Google Images searches for visual stretch ideas.</p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {searches.map((query) => (
          <button
            key={query}
            type="button"
            onClick={() => openExternalUrl(googleImageUrl(query))}
            className="group rounded-2xl border border-white/10 bg-slate-950/30 p-4 text-left text-sm leading-relaxed text-slate-100 transition hover:border-cyan-200/40 hover:bg-cyan-200/10 active:scale-[0.98]"
          >
            <span className="block font-semibold capitalize">{query}</span>
            <span className="mt-2 block text-xs text-cyan-100/80 group-hover:text-cyan-50">Open Google Images →</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function PlanetInfoModal({ chakra, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={`${chakra.planet} planet information`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/15 bg-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6" style={{ background: `linear-gradient(135deg, ${chakra.glow}, rgba(15,23,42,0.85))` }}>
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/20 bg-white/10 text-3xl">
              {chakra.planetGlyph}
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/55">Vedic planet</p>
              <h3 className="text-2xl font-black">{chakra.planet}</h3>
              <p className="text-sm text-white/65">{chakra.name}</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <p className="leading-relaxed text-slate-200">{chakra.planetInfo}</p>
          <button
            type="button"
            onClick={onClose}
            className="mt-6 w-full rounded-2xl border border-white/10 bg-white/10 py-3 font-semibold text-white transition hover:bg-white/20 active:scale-95"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function AffirmationWindow({ chakra, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/90 px-4 py-6 text-white backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label={`${chakra.name} affirmations`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_70%_90%,rgba(59,130,246,0.12),transparent_30%)]" />

      <section className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl">
        <div className="p-6 sm:p-8" style={{ background: `linear-gradient(135deg, ${chakra.glow}, rgba(15,23,42,0.68))` }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/60">Affirmation window</p>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{chakra.name}</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75">
                Use these as calm identity statements. Read them slowly, breathe, and let the words feel steady instead of forced.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-white/15 bg-slate-950/30 px-4 py-3 font-semibold text-white transition hover:bg-slate-950/50 active:scale-95"
            >
              Close
            </button>
          </div>
        </div>

        <div className="grid gap-3 p-5 sm:p-6">
          {chakra.affirmations.map((affirmation, index) => (
            <div key={affirmation} className="rounded-[1.5rem] border border-white/10 bg-slate-950/35 p-5 shadow-lg">
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-500">Affirmation {index + 1}</p>
              <p className="text-lg font-semibold leading-relaxed text-slate-50">{affirmation}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function BlockageWindow({ chakra, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/90 px-4 py-6 text-white backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label={`${chakra.name} blockage explorer`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(239,68,68,0.14),transparent_28%),radial-gradient(circle_at_75%_85%,rgba(168,85,247,0.12),transparent_30%)]" />

      <section className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl">
        <div className="p-6 sm:p-8" style={{ background: `linear-gradient(135deg, rgba(239,68,68,0.25), rgba(15,23,42,0.75))` }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/60">Blockage explorer</p>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{chakra.name}</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75">
                Understanding what creates a blockage can help you meet it with clarity rather than force.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-white/15 bg-slate-950/30 px-4 py-3 font-semibold text-white transition hover:bg-slate-950/50 active:scale-95"
            >
              Close
            </button>
          </div>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          {chakra.gland && (
            <div className="flex items-center gap-4 rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/10 p-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/10 text-lg">⚕</div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">Associated endocrine gland</p>
                <p className="mt-0.5 font-semibold text-white">{chakra.gland}</p>
              </div>
            </div>
          )}

          {chakra.blockageCauses && (
            <div className="rounded-[1.5rem] border border-rose-300/20 bg-rose-300/10 p-5">
              <h3 className="mb-4 text-lg font-bold text-rose-100">What typically causes this blockage</h3>
              <ul className="space-y-3">
                {chakra.blockageCauses.map((cause) => (
                  <li key={cause} className="rounded-2xl border border-white/10 bg-slate-950/25 p-3 text-sm leading-relaxed text-slate-100">
                    {cause}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {chakra.physicalSigns && (
            <div className="rounded-[1.5rem] border border-amber-300/20 bg-amber-300/10 p-5">
              <h3 className="mb-4 text-lg font-bold text-amber-100">Physical signs in the body</h3>
              <ul className="space-y-3">
                {chakra.physicalSigns.map((sign) => (
                  <li key={sign} className="rounded-2xl border border-white/10 bg-slate-950/25 p-3 text-sm leading-relaxed text-slate-100">
                    {sign}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {chakra.rootQuestions && (
            <div className="rounded-[1.5rem] border border-violet-300/20 bg-violet-300/10 p-5">
              <h3 className="mb-4 text-lg font-bold text-violet-100">Root questions to sit with</h3>
              <ul className="space-y-3">
                {chakra.rootQuestions.map((q) => (
                  <li key={q} className="rounded-2xl border border-white/10 bg-slate-950/25 p-3 text-sm italic leading-relaxed text-slate-100">
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function DetailPanel({ chakra, system, onOpenExpanded, onOpenAffirmations, onOpenBlockage, onOpenPlanet }) {
  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            {chakra.subtitle && <p className="mb-2 text-sm font-medium text-slate-300">{chakra.subtitle}</p>}
            <h2 className="text-3xl font-bold tracking-tight">{chakra.name}</h2>
            {chakra.mantra && (
              <p className="mt-1 text-lg font-semibold italic" style={{ color: chakra.color }}>{chakra.mantra}</p>
            )}
            {chakra.colorMeaning && (
              <p className="mt-1 text-sm font-semibold uppercase tracking-widest" style={{ color: chakra.color, opacity: 0.75 }}>{chakra.colorMeaning}</p>
            )}
            <p className="mt-2 text-slate-300">{chakra.theme}</p>
          </div>
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/20 text-2xl" style={{ background: chakra.color, boxShadow: `0 0 38px ${chakra.glow}` }}>
            ✦
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Location</p>
            <p className="mt-2 font-medium">{chakra.location}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{system.aspectLabel}</p>
            <p className="mt-2 font-medium">{chakra.aspect}</p>
          </div>
          {chakra.planet ? (
            <button
              type="button"
              onClick={chakra.planetInfo ? onOpenPlanet : undefined}
              className={`rounded-2xl border border-white/10 bg-white/5 p-4 text-left w-full transition ${chakra.planetInfo ? "hover:bg-white/10 active:scale-[0.98] cursor-pointer" : ""}`}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Planet {chakra.planetInfo && <span className="ml-1 text-white/30">↗</span>}</p>
              <p className="mt-2 font-medium">{chakra.planetGlyph} {chakra.planet}</p>
            </button>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">State</p>
              <p className="mt-2 font-medium">Balanced</p>
            </div>
          )}
          {chakra.gland && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Gland</p>
              <p className="mt-2 font-medium">{chakra.gland}</p>
            </div>
          )}
        </div>

        <div className="mt-5 rounded-3xl border border-white/10 bg-slate-950/40 p-5">
          <div className="mb-2 flex items-center gap-2 text-slate-200">
            <IconBadge label="i" className="h-7 w-7 rounded-xl text-sm" />
            <p className="font-semibold">What it represents</p>
          </div>
          <p className="leading-relaxed text-slate-300">{chakra.balanced}</p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={onOpenAffirmations}
            className="rounded-2xl border border-white/15 px-5 py-4 font-semibold text-white shadow-xl transition hover:brightness-110 active:scale-[0.99]"
            style={{ background: chakra.color, boxShadow: `0 0 26px ${chakra.glow}` }}
          >
            Open affirmations
          </button>
          <button
            type="button"
            onClick={onOpenExpanded}
            className="rounded-2xl border border-white/15 bg-white px-5 py-4 font-semibold text-slate-950 shadow-xl transition hover:bg-slate-200 active:scale-[0.99]"
          >
            Full explanation page
          </button>
          {chakra.blockageCauses && (
            <button
              type="button"
              onClick={onOpenBlockage}
              className="rounded-2xl border border-rose-300/30 bg-rose-300/10 px-5 py-4 font-semibold text-white shadow-xl transition hover:bg-rose-300/20 active:scale-[0.99] sm:col-span-2"
            >
              Explore blockages
            </button>
          )}
        </div>

        <StretchImageLinks chakra={chakra} compact />
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <MiniList title="Pros" items={chakra.pros} tone="green" />
        <MiniList title="Cons / Watch-outs" items={chakra.cons} tone="amber" />
      </div>
    </div>
  );
}

function BalanceIndicator({ chakra }) {
  const [checked, setChecked] = useState({});

  const toggle = useCallback((i) => {
    setChecked((prev) => ({ ...prev, [i]: !prev[i] }));
  }, []);

  const score = chakra.selfAssessment.filter((_, i) => checked[i]).length;
  const total = chakra.selfAssessment.length;
  const pct = Math.round((score / total) * 100);

  const signal =
    score === total ? { label: "Well balanced", color: "#22c55e" } :
    score >= total * 0.6 ? { label: "Mostly balanced", color: "#86efac" } :
    score >= total * 0.3 ? { label: "Needs attention", color: "#fbbf24" } :
    { label: "Blocked or underactive", color: "#f87171" };

  return (
    <section className="mt-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold">Balance Indicator</h3>
          <p className="mt-1 text-sm text-slate-400">Check each statement that feels true for you right now.</p>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-2xl font-black" style={{ color: signal.color }}>{score}/{total}</div>
          <div className="text-xs font-semibold" style={{ color: signal.color }}>{signal.label}</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-5 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: signal.color, boxShadow: `0 0 10px ${signal.color}66` }}
        />
      </div>

      <div className="flex flex-col gap-3">
        {chakra.selfAssessment.map((q, i) => (
          <button
            key={i}
            type="button"
            onClick={() => toggle(i)}
            className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/30 p-4 text-left transition hover:bg-white/10 active:scale-[0.99]"
          >
            <span
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs font-bold transition"
              style={{
                borderColor: checked[i] ? chakra.color : "rgba(255,255,255,0.25)",
                background: checked[i] ? chakra.color : "transparent",
                boxShadow: checked[i] ? `0 0 10px ${chakra.glow}` : "none",
              }}
            >
              {checked[i] ? "✓" : ""}
            </span>
            <span className="text-sm leading-relaxed text-slate-200">{q}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function ExpandedChakraPage({ chakra, chakras, system, onClose, onSelect, onOpenAffirmations, onOpenBlockage, onOpenPlanet }) {
  const currentIndex = chakras.findIndex((c) => c.id === chakra.id);
  const prevChakra = chakras[(currentIndex - 1 + chakras.length) % chakras.length];
  const nextChakra = chakras[(currentIndex + 1) % chakras.length];

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 px-4 py-5 text-white backdrop-blur-xl sm:px-6 lg:px-10"
      role="dialog"
      aria-modal="true"
      aria-label={`${chakra.name} expanded explanation`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(168,85,247,0.18),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(6,182,212,0.14),transparent_26%),radial-gradient(circle_at_50%_95%,rgba(239,68,68,0.12),transparent_32%)]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="sticky top-0 z-20 -mx-4 mb-6 border-b border-white/10 bg-slate-950/75 px-4 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelect(prevChakra.id)}
                aria-label={`Previous: ${prevChakra.name}`}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/10 text-lg font-bold transition hover:bg-white/20 active:scale-95"
              >
                ‹
              </button>
              <div className="flex items-center gap-2 px-1">
                <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: chakra.color, boxShadow: `0 0 14px ${chakra.glow}` }} />
                <h2 className="text-base font-bold sm:text-xl">{chakra.name}</h2>
              </div>
              <button
                type="button"
                onClick={() => onSelect(nextChakra.id)}
                aria-label={`Next: ${nextChakra.name}`}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/10 text-lg font-bold transition hover:bg-white/20 active:scale-95"
              >
                ›
              </button>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={onOpenAffirmations}
                className="hidden rounded-2xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 active:scale-95 sm:block"
                style={{ borderColor: `${chakra.color}55` }}
              >
                Affirmations
              </button>
              {chakra.blockageCauses && (
                <button
                  type="button"
                  onClick={onOpenBlockage}
                  className="hidden rounded-2xl border border-rose-300/30 bg-rose-300/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-300/20 active:scale-95 sm:block"
                >
                  Blockages
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20 active:scale-95"
              >
                Close
              </button>
            </div>
          </div>
        </div>

        <section className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[360px] overflow-hidden p-8" style={{ background: `linear-gradient(145deg, ${chakra.glow}, rgba(15,23,42,0.6))` }}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.22),transparent_28%)]" />
              <div className="relative z-10 flex h-full min-h-[300px] flex-col justify-between">
                <div>
                  {chakra.subtitle && <p className="mb-2 text-sm font-medium text-white/75">{chakra.subtitle}</p>}
                  <h1 className="text-4xl font-black tracking-tight sm:text-5xl">{chakra.name}</h1>
                  {chakra.mantra && (
                    <p className="mt-2 text-2xl font-bold italic text-white/90 sm:text-3xl">{chakra.mantra}</p>
                  )}
                  {chakra.colorMeaning && (
                    <p className="mt-1 text-sm font-bold uppercase tracking-widest text-white/60">{chakra.colorMeaning}</p>
                  )}
                  <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80">{chakra.theme}</p>
                </div>
                <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <div className="rounded-2xl border border-white/15 bg-slate-950/30 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/55">Location</p>
                    <p className="mt-2 font-semibold">{chakra.location}</p>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-slate-950/30 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/55">{system.aspectLabel}</p>
                    <p className="mt-2 font-semibold">{chakra.aspect}</p>
                  </div>
                  {chakra.planet ? (
                    <button
                      type="button"
                      onClick={chakra.planetInfo ? onOpenPlanet : undefined}
                      className={`rounded-2xl border border-white/15 bg-slate-950/30 p-4 text-left w-full transition ${chakra.planetInfo ? "hover:bg-white/10 active:scale-[0.98] cursor-pointer" : ""}`}
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-white/55">Planet {chakra.planetInfo && <span className="ml-1 text-white/30">↗</span>}</p>
                      <p className="mt-2 font-semibold">{chakra.planetGlyph} {chakra.planet}</p>
                    </button>
                  ) : (
                    <div className="rounded-2xl border border-white/15 bg-slate-950/30 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/55">System</p>
                      <p className="mt-2 font-semibold">{system.fullLabel}</p>
                    </div>
                  )}
                  {chakra.gland && (
                    <div className="rounded-2xl border border-white/15 bg-slate-950/30 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/55">Gland</p>
                      <p className="mt-2 font-semibold">{chakra.gland}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-6">
                <h3 className="mb-3 text-2xl font-bold">Full explanation</h3>
                <p className="text-base leading-relaxed text-slate-300">{chakra.overview}</p>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-emerald-300/15 bg-emerald-300/10 p-5">
                  <h4 className="mb-2 font-semibold text-emerald-100">When balanced</h4>
                  <p className="text-sm leading-relaxed text-slate-200">{chakra.balancedState}</p>
                </div>
                <div className="rounded-[1.5rem] border border-cyan-300/15 bg-cyan-300/10 p-5">
                  <h4 className="mb-2 font-semibold text-cyan-100">Body / mind reflection</h4>
                  <p className="text-sm leading-relaxed text-slate-200">{chakra.bodyMind}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-rose-300/15 bg-rose-300/10 p-6 backdrop-blur-xl">
            <h3 className="mb-3 text-xl font-bold">Underactive / blocked pattern</h3>
            <p className="leading-relaxed text-slate-200">{chakra.underactive}</p>
          </div>
          <div className="rounded-[1.75rem] border border-amber-300/15 bg-amber-300/10 p-6 backdrop-blur-xl">
            <h3 className="mb-3 text-xl font-bold">Overactive pattern</h3>
            <p className="leading-relaxed text-slate-200">{chakra.overactive}</p>
          </div>
        </section>

        {chakra.frequencies && (
          <section className="mt-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="border-b border-white/10 px-6 py-4">
              <h3 className="text-xl font-bold">432 Hz Alchemical &amp; Cosmic</h3>
              <p className="mt-1 text-sm text-slate-400">Sound frequencies, alchemical process, and classical correspondences.</p>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Harmonic frequencies (432 Hz tuning)</p>
                  {chakra.frequencyVideoQuery && (
                    <button
                      type="button"
                      onClick={() => openExternalUrl(youtubeSearchUrl(chakra.frequencyVideoQuery))}
                      className="flex shrink-0 items-center gap-1.5 rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-200 transition hover:bg-red-500/20 active:scale-95"
                    >
                      ▶ Watch on YouTube
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {chakra.frequencies.map((f) => (
                    <div key={f} className="rounded-2xl border border-white/10 bg-slate-950/40 p-3 text-center">
                      <p className="text-xs text-slate-400">♩</p>
                      <p className="mt-1 text-sm font-semibold text-white">{f}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl border border-indigo-300/15 bg-indigo-300/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/70">Alchemical process</p>
                  <p className="mt-2 font-semibold">{chakra.alchemical}</p>
                </div>
                <div className="rounded-2xl border border-indigo-300/15 bg-indigo-300/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/70">Sense</p>
                  <p className="mt-2 font-semibold">{chakra.sense}</p>
                </div>
                <div className="rounded-2xl border border-indigo-300/15 bg-indigo-300/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/70">Quality</p>
                  <p className="mt-2 font-semibold">{chakra.quality}</p>
                </div>
                <div className="rounded-2xl border border-violet-300/15 bg-violet-300/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-violet-200/70">Day of the week</p>
                  <p className="mt-2 font-semibold">{chakra.dayOfWeek}</p>
                </div>
                <div className="rounded-2xl border border-violet-300/15 bg-violet-300/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-violet-200/70">Archangel</p>
                  <p className="mt-2 font-semibold">{chakra.archangel}</p>
                </div>
                <div className="rounded-2xl border border-violet-300/15 bg-violet-300/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-violet-200/70">Zodiac</p>
                  <p className="mt-2 font-semibold">{chakra.zodiacGlyph} {chakra.zodiac}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="mt-6 grid gap-4 lg:grid-cols-3">
          <MiniList title="Pros" items={chakra.pros} tone="green" />
          <MiniList title="Watch-outs" items={chakra.cons} tone="amber" />
          <MiniList title="Practices" items={chakra.practices} tone="blue" />
        </section>

        <StretchImageLinks chakra={chakra} />

        <section className="mt-6 rounded-[1.75rem] border border-violet-300/15 bg-violet-300/10 p-6 backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-3">
            <IconBadge label="?" className="h-8 w-8 text-violet-100" />
            <h3 className="text-xl font-bold">Journal prompts</h3>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {chakra.prompts.map((prompt) => (
              <div key={prompt} className="rounded-2xl border border-white/10 bg-slate-950/30 p-4 text-sm leading-relaxed text-slate-100">
                {prompt}
              </div>
            ))}
          </div>
        </section>

        {/* Crystals & Stones */}
        {chakra.crystals && (
          <section className="mt-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h3 className="mb-4 text-xl font-bold">Crystals &amp; Stones</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {chakra.crystals.map((c) => (
                <div key={c.name} className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: chakra.color, boxShadow: `0 0 8px ${chakra.glow}` }} />
                    <p className="text-sm font-bold text-white">{c.name}</p>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-300">{c.property}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Healing Foods & Essential Oils */}
        {(chakra.foods || chakra.essentialOils) && (
          <section className="mt-6 grid gap-4 lg:grid-cols-2">
            {chakra.foods && (
              <div className="rounded-[1.75rem] border border-emerald-300/15 bg-emerald-300/10 p-6 backdrop-blur-xl">
                <h3 className="mb-4 text-xl font-bold">Healing Foods</h3>
                <div className="flex flex-wrap gap-2">
                  {chakra.foods.map((f) => (
                    <span key={f} className="rounded-xl border border-white/15 bg-slate-950/30 px-3 py-1.5 text-sm font-medium text-slate-100">{f}</span>
                  ))}
                </div>
              </div>
            )}
            {chakra.essentialOils && (
              <div className="rounded-[1.75rem] border border-amber-300/15 bg-amber-300/10 p-6 backdrop-blur-xl">
                <h3 className="mb-4 text-xl font-bold">Essential Oils</h3>
                <div className="flex flex-col gap-3">
                  {chakra.essentialOils.map((o) => (
                    <div key={o.name} className="flex gap-3">
                      <span className="mt-0.5 shrink-0 text-amber-200 text-sm">◆</span>
                      <div>
                        <span className="text-sm font-bold text-white">{o.name} </span>
                        <span className="text-sm text-slate-300">{o.use}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Balance Indicator */}
        {chakra.selfAssessment && (
          <BalanceIndicator chakra={chakra} />
        )}

        <section className="mt-6 rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-bold">Jump to another center</h3>
            <p className="text-sm text-slate-400">Switch without closing the expanded view.</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
            {chakras.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                className={`rounded-2xl border p-3 text-left text-sm transition ${
                  chakra.id === item.id ? "border-white/40 bg-white/20 shadow-lg" : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <span className="mb-2 block h-3 w-3 rounded-full" style={{ background: item.color, boxShadow: `0 0 18px ${item.glow}` }} />
                <span className="block font-semibold leading-tight">{item.name.replace(" Chakra", "").replace(" Center", "").replace(" Ray", "")}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onOpenAffirmations}
            className="w-full rounded-2xl border border-white/15 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/10 active:scale-95 sm:hidden"
            style={{ borderColor: `${chakra.color}66`, background: `${chakra.color}18` }}
          >
            Open affirmations
          </button>
          {chakra.blockageCauses && (
            <button
              type="button"
              onClick={onOpenBlockage}
              className="w-full rounded-2xl border border-rose-300/30 bg-rose-300/10 px-6 py-4 text-base font-semibold text-white transition hover:bg-rose-300/20 active:scale-95 sm:hidden"
            >
              Explore blockages
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-2xl border border-white/15 bg-white/10 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/20 active:scale-95"
          >
            ← Back to body map
          </button>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-slate-400">
          These frameworks are used here as symbolic tools for reflection and self-awareness — not as medical diagnosis or treatment.
        </p>
      </div>
    </div>
  );
}

export default function Chakra3DVisualizer({ onBack }) {
  const [systemId, setSystemId] = useState("hindu");
  const [selectedId, setSelectedId] = useState("heart");
  const [rotate, setRotate] = useState(true);
  const [expandedOpen, setExpandedOpen] = useState(false);
  const [affirmationOpen, setAffirmationOpen] = useState(false);
  const [blockageOpen, setBlockageOpen] = useState(false);
  const [planetOpen, setPlanetOpen] = useState(false);

  const system = SYSTEMS.find((s) => s.id === systemId);
  const chakras = system.data;
  const selectedChakra = useMemo(
    () => chakras.find((item) => item.id === selectedId) || chakras[3],
    [chakras, selectedId]
  );

  function handleSystemChange(id) {
    setSystemId(id);
    setSelectedId("heart");
    setExpandedOpen(false);
    setAffirmationOpen(false);
    setBlockageOpen(false);
    setPlanetOpen(false);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-6 text-white sm:px-6 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(168,85,247,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.16),transparent_26%),radial-gradient(circle_at_50%_95%,rgba(239,68,68,0.14),transparent_32%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:42px_42px] opacity-25" />

      <section className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <h1 className="max-w-3xl text-2xl font-black tracking-tight sm:text-4xl lg:text-5xl">Chakra Visualizer</h1>
            <p className="mt-2 hidden max-w-2xl text-base leading-relaxed text-slate-300 sm:block sm:text-lg">
              Explore the seven energy centers through three distinct spiritual frameworks.
            </p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-400">
              ⚠ Educational tool only — not medical advice. Consult a healthcare professional for any health concerns.
            </p>

            <div className="mt-4 flex items-center gap-1 rounded-2xl border border-white/10 bg-white/5 p-1 w-fit">
              {SYSTEMS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSystemChange(s.id)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    systemId === s.id
                      ? "bg-white text-slate-950 shadow"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 font-semibold text-white shadow-xl backdrop-blur-md transition hover:bg-white/20 active:scale-95"
              >
                ← Home
              </button>
            )}
            <button
              type="button"
              onClick={() => setRotate((v) => !v)}
              className="rounded-2xl bg-white px-5 py-4 font-semibold text-slate-950 shadow-xl transition hover:bg-slate-200 active:scale-95"
            >
              {rotate ? "Pause 3D" : "Rotate 3D"}
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="space-y-4">
            <BodyModel
              chakras={chakras}
              selectedId={selectedId}
              onOrbClick={(id) => { setSelectedId(id); setExpandedOpen(true); }}
              rotate={rotate}
            />

            <section className="hidden rounded-[1.75rem] border border-white/10 bg-white/10 p-4 text-white backdrop-blur-xl lg:block">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
                <IconBadge label="☼" className="h-7 w-7 rounded-xl text-sm" />
                Center Selector
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {chakras.map((chakra) => (
                  <button
                    key={chakra.id}
                    type="button"
                    onClick={() => setSelectedId(chakra.id)}
                    className={`rounded-2xl border p-3 text-left text-sm transition ${
                      selectedId === chakra.id ? "border-white/40 bg-white/20 shadow-lg" : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <span className="mb-2 block h-3 w-3 rounded-full" style={{ background: chakra.color, boxShadow: `0 0 18px ${chakra.glow}` }} />
                    <span className="block font-semibold leading-tight">
                      {chakra.name.replace(" Chakra", "").replace(" Center", "").replace(" Ray", "")}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <div className="hidden lg:block">
            <DetailPanel
              chakra={selectedChakra}
              system={system}
              onOpenAffirmations={() => setAffirmationOpen(true)}
              onOpenExpanded={() => setExpandedOpen(true)}
              onOpenBlockage={() => setBlockageOpen(true)}
              onOpenPlanet={() => setPlanetOpen(true)}
            />
          </div>
        </div>

      </section>

      {affirmationOpen && (
        <AffirmationWindow chakra={selectedChakra} onClose={() => setAffirmationOpen(false)} />
      )}

      {expandedOpen && (
        <ExpandedChakraPage
          chakra={selectedChakra}
          chakras={chakras}
          system={system}
          onClose={() => setExpandedOpen(false)}
          onSelect={(id) => setSelectedId(id)}
          onOpenAffirmations={() => setAffirmationOpen(true)}
          onOpenBlockage={() => setBlockageOpen(true)}
          onOpenPlanet={() => setPlanetOpen(true)}
        />
      )}

      {blockageOpen && (
        <BlockageWindow chakra={selectedChakra} onClose={() => setBlockageOpen(false)} />
      )}

      {planetOpen && (
        <PlanetInfoModal chakra={selectedChakra} onClose={() => setPlanetOpen(false)} />
      )}
    </main>
  );
}
