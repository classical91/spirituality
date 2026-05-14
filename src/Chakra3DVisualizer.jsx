import React, { useMemo, useState } from "react";
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

function openExternalUrl(url) {
  const openedWindow = window.open(url, "_blank");
  if (openedWindow) {
    openedWindow.opener = null;
    openedWindow.focus();
    return;
  }
  window.location.href = url;
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

  return (
    <div className="relative mx-auto flex min-h-[560px] w-full max-w-[430px] items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/45 p-8 shadow-2xl backdrop-blur-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.16),transparent_34%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.12),transparent_38%)]" />
      <div className="absolute left-8 top-8 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">3D Aura Field</div>

      <div className={`absolute h-[470px] w-[270px] rounded-full border border-cyan-200/20 ${rotate ? "animate-[spin_12s_linear_infinite]" : ""}`} />
      <div className={`absolute h-[430px] w-[230px] rounded-full border border-fuchsia-200/10 ${rotate ? "animate-[spin_16s_linear_infinite]" : ""}`} />
      <div className="absolute h-[500px] w-[40px] rounded-full bg-cyan-300/5 blur-2xl" />

      <div className={`relative h-[500px] w-[220px] ${rotate ? "animate-[chakraSway_7s_ease-in-out_infinite]" : ""}`}>
        <div className="absolute left-1/2 top-0 h-[82px] w-[82px] -translate-x-1/2 rounded-full border border-white/20 bg-gradient-to-b from-white/25 to-white/5 shadow-[inset_0_0_35px_rgba(255,255,255,0.12)]" />
        <div className="absolute left-1/2 top-[82px] h-[245px] w-[126px] -translate-x-1/2 rounded-[48%_48%_38%_38%] border border-white/20 bg-gradient-to-b from-white/20 to-white/5 shadow-[inset_0_0_45px_rgba(255,255,255,0.08)]" />
        <div className="absolute left-[18px] top-[115px] h-[185px] w-[30px] rotate-6 rounded-full border border-white/15 bg-white/5" />
        <div className="absolute right-[18px] top-[115px] h-[185px] w-[30px] -rotate-6 rounded-full border border-white/15 bg-white/5" />
        <div className="absolute left-[62px] top-[314px] h-[176px] w-[34px] rounded-full border border-white/15 bg-white/5" />
        <div className="absolute right-[62px] top-[314px] h-[176px] w-[34px] rounded-full border border-white/15 bg-white/5" />

        <div className="absolute left-1/2 top-[24px] h-[405px] w-px -translate-x-1/2 bg-gradient-to-b from-purple-400 via-cyan-300 to-red-400 opacity-70" />

        {chakras.map((chakra) => (
          <ChakraOrb key={chakra.id} chakra={chakra} selected={selectedId === chakra.id} onClick={() => onOrbClick(chakra.id)} />
        ))}
      </div>

      <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/10 bg-slate-950/75 p-4 text-white shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="h-4 w-4 shrink-0 rounded-full" style={{ background: selected.color, boxShadow: `0 0 24px ${selected.glow}` }} />
            <div>
              <p className="text-sm font-semibold leading-none">{selected.name}</p>
              <p className="mt-1 text-xs text-slate-300">{selected.location}</p>
            </div>
          </div>
          {selected.mantra && (
            <span className="shrink-0 rounded-xl border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold italic text-white/80">
              {selected.mantra}
            </span>
          )}
        </div>
      </div>

      <style>{`
        @keyframes chakraSway {
          0%, 100% { transform: perspective(900px) rotateY(0deg); }
          50% { transform: perspective(900px) rotateY(9deg); }
        }
      `}</style>
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

function AffirmationWindow({ chakra, onClose }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/90 px-4 py-6 text-white backdrop-blur-xl">
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
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/90 px-4 py-6 text-white backdrop-blur-xl">
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

function DetailPanel({ chakra, system, onOpenExpanded, onOpenAffirmations, onOpenBlockage }) {
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
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            {chakra.planet ? (
              <>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Planet</p>
                <p className="mt-2 font-medium">{chakra.planetGlyph} {chakra.planet}</p>
              </>
            ) : (
              <>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">State</p>
                <p className="mt-2 font-medium">Balanced</p>
              </>
            )}
          </div>
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

function ExpandedChakraPage({ chakra, chakras, system, onClose, onSelect, onOpenAffirmations, onOpenBlockage }) {
  const currentIndex = chakras.findIndex((c) => c.id === chakra.id);
  const prevChakra = chakras[(currentIndex - 1 + chakras.length) % chakras.length];
  const nextChakra = chakras[(currentIndex + 1) % chakras.length];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 px-4 py-5 text-white backdrop-blur-xl sm:px-6 lg:px-10">
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
                  <div className="rounded-2xl border border-white/15 bg-slate-950/30 p-4">
                    {chakra.planet ? (
                      <>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/55">Planet</p>
                        <p className="mt-2 font-semibold">{chakra.planetGlyph} {chakra.planet}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/55">System</p>
                        <p className="mt-2 font-semibold">{system.fullLabel}</p>
                      </>
                    )}
                  </div>
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

export default function Chakra3DVisualizer() {
  const [systemId, setSystemId] = useState("hindu");
  const [selectedId, setSelectedId] = useState("heart");
  const [rotate, setRotate] = useState(true);
  const [expandedOpen, setExpandedOpen] = useState(false);
  const [affirmationOpen, setAffirmationOpen] = useState(false);
  const [blockageOpen, setBlockageOpen] = useState(false);

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
              Explore the seven energy centers through three distinct spiritual frameworks. This is a reflection tool, not medical advice.
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
        />
      )}

      {blockageOpen && (
        <BlockageWindow chakra={selectedChakra} onClose={() => setBlockageOpen(false)} />
      )}
    </main>
  );
}
