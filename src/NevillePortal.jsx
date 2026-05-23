import { useState } from 'react';

export default function NevillePortal({ onBack }) {
  const [todayCard, setTodayCard] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem('neville-today-card') || 'null');
    } catch {
      return null;
    }
  });

  const [checkins, setCheckins] = useState(() => {
    const date = new Date().toISOString().slice(0, 10);
    try {
      const parsed = JSON.parse(window.localStorage.getItem('neville-checkins') || 'null');
      if (parsed?.date === date) return parsed;
    } catch {
      // Ignore corrupt check-in storage and start fresh for today.
    }
    return { date, morning: false, midday: false, night: false };
  });

  const generateTodayCard = () => {
    const card = {
      createdAt: new Date().toLocaleString(),
      identity: 'I am loved, chosen, secure, and fulfilled now.',
      sats: 'I hear: “I choose you. I love being with you.” It feels natural and done.',
      revision: 'I remember when I doubted. Now I rest in certainty.',
      mentalDiet: 'That is the old state. I return to the fulfilled one.',
    };
    setTodayCard(card);
    window.localStorage.setItem('neville-today-card', JSON.stringify(card));
  };

  const toggleCheckin = (slot) => {
    setCheckins((current) => {
      const next = { ...current, [slot]: !current[slot] };
      window.localStorage.setItem('neville-checkins', JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#070713] text-white">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <button onClick={onBack} className="mb-4 rounded-xl border border-white/20 px-4 py-2">← Back</button>
        <header className="mb-6 rounded-3xl border border-white/10 bg-white/[0.05] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-300/70">Neville Goddard Portal</p>
          <h1 className="mt-2 text-4xl font-black">Living in Alignment</h1>
          <p className="mt-3 text-white/70">A dedicated space for daily identity practice, SATS, revision, and mental diet.</p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-emerald-300/20 bg-emerald-400/5 p-6">
            <h2 className="text-2xl font-black">Start Here (5 minutes)</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-white/80">
              <li>Choose one fulfilled desire sentence.</li>
              <li>Choose your “I AM” identity.</li>
              <li>Loop one short SATS scene for 60–90 seconds.</li>
              <li>Carry one mental diet line through the day.</li>
            </ol>
            <button onClick={generateTodayCard} className="mt-5 rounded-xl bg-white px-4 py-2 font-bold text-slate-900">Generate Today Card</button>
          </div>

          <div className="rounded-3xl border border-violet-300/20 bg-violet-400/5 p-6">
            <h2 className="text-2xl font-black">Today Card</h2>
            {!todayCard ? (
              <p className="mt-3 text-white/70">Generate your card to pin today’s identity practice.</p>
            ) : (
              <div className="mt-4 space-y-2 text-sm text-white/90">
                <p><strong>Identity:</strong> {todayCard.identity}</p>
                <p><strong>SATS:</strong> {todayCard.sats}</p>
                <p><strong>Revision:</strong> {todayCard.revision}</p>
                <p><strong>Mental Diet:</strong> {todayCard.mentalDiet}</p>
              </div>
            )}
          </div>
        </section>

        <section className="mt-4 rounded-3xl border border-cyan-300/20 bg-cyan-400/5 p-6">
          <h2 className="text-2xl font-black">Daily Check-in</h2>
          <div className="mt-4 grid gap-2 md:grid-cols-3">
            {[
              ['morning', 'Morning state set'],
              ['midday', 'Midday reset done'],
              ['night', 'Night SATS done'],
            ].map(([key, label]) => (
              <button key={key} onClick={() => toggleCheckin(key)} className="rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-left">
                <span>{label}</span>
                <span className="ml-2">{checkins[key] ? '✅' : '◻'}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
