import InnerAtlasNav from './components/InnerAtlasNav';
import './innerAtlasTheme.css';
import { accentVars } from './innerAtlasTheme';

const colorMeanings = [
  {
    name: 'Red',
    hex: '#ef4444',
    energy: 'Activation · desire · urgency · courage',
    psychology: 'Red tends to feel stimulating because it is associated with heat, blood, danger, passion, and immediate action. It can sharpen attention, but too much can feel aggressive or anxious.',
    useFor: ['Motivation', 'Passion', 'Bold decisions', 'Physical energy'],
    shadow: 'Can become pressure, anger, overstimulation, or emotional intensity without grounding.',
  },
  {
    name: 'Orange',
    hex: '#f97316',
    energy: 'Warmth · appetite · creativity · social spark',
    psychology: 'Orange carries the warmth of red with more playfulness. It often feels approachable, expressive, and energizing without being as forceful as red.',
    useFor: ['Creativity', 'Play', 'Conversation', 'Emotional warmth'],
    shadow: 'Can feel restless, loud, impulsive, or scattered when overused.',
  },
  {
    name: 'Yellow',
    hex: '#facc15',
    energy: 'Optimism · clarity · alertness · confidence',
    psychology: 'Yellow is visually bright and attention-grabbing. It often connects to sunlight, learning, hope, and mental alertness, but very intense yellow can become irritating.',
    useFor: ['Learning', 'Mood lift', 'Confidence', 'Fresh ideas'],
    shadow: 'Can become mental overstimulation, impatience, or nervous brightness.',
  },
  {
    name: 'Green',
    hex: '#22c55e',
    energy: 'Balance · healing · nature · emotional steadiness',
    psychology: 'Green commonly feels restorative because it is linked with nature, growth, safety, and balance. It can soften emotional tension and create a sense of renewal.',
    useFor: ['Recovery', 'Heart-centered reflection', 'Calm routines', 'Grounded growth'],
    shadow: 'Can feel stagnant, passive, avoidant, or overly comfortable if it replaces action.',
  },
  {
    name: 'Blue',
    hex: '#3b82f6',
    energy: 'Calm · trust · depth · clear communication',
    psychology: 'Blue is often experienced as cooling, spacious, and stable. It can support focus, trust, and emotional regulation, especially in softer or darker tones.',
    useFor: ['Calm focus', 'Communication', 'Trust', 'Sleep-friendly spaces'],
    shadow: 'Can become emotional distance, coldness, sadness, or over-control.',
  },
  {
    name: 'Purple',
    hex: '#a855f7',
    energy: 'Mystery · imagination · spirituality · transformation',
    psychology: 'Purple blends red intensity with blue depth. It often feels symbolic, mystical, creative, and introspective, which makes it useful for spiritual or imaginative spaces.',
    useFor: ['Meditation', 'Dream work', 'Creative vision', 'Sacred atmosphere'],
    shadow: 'Can become fantasy, escapism, superiority, or being too abstract.',
  },
  {
    name: 'Pink',
    hex: '#ec4899',
    energy: 'Softness · affection · tenderness · receptivity',
    psychology: 'Pink often reads as softened red: love without the same level of threat or urgency. It can support tenderness, emotional safety, and self-compassion.',
    useFor: ['Self-love', 'Romance', 'Gentleness', 'Emotional repair'],
    shadow: 'Can become dependency, people-pleasing, emotional fragility, or idealization.',
  },
  {
    name: 'White',
    hex: '#f8fafc',
    energy: 'Purity · space · simplicity · reset',
    psychology: 'White creates a sense of openness, cleanliness, and possibility. It can feel peaceful and uncluttered, but too much can feel sterile or emotionally empty.',
    useFor: ['Reset rituals', 'Clarity', 'Minimalism', 'Fresh starts'],
    shadow: 'Can feel cold, blank, perfectionistic, or detached from warmth.',
  },
  {
    name: 'Black',
    hex: '#020617',
    energy: 'Depth · protection · power · mystery',
    psychology: 'Black can feel contained, elegant, serious, and protective. It creates contrast and intensity, but heavy use can feel isolating or emotionally dense.',
    useFor: ['Boundaries', 'Focus', 'Protection', 'Sacred depth'],
    shadow: 'Can become heaviness, secrecy, withdrawal, or emotional shutdown.',
  },
  {
    name: 'Gold',
    hex: '#f59e0b',
    energy: 'Worth · radiance · success · sacred value',
    psychology: 'Gold often signals value, achievement, warmth, and reverence. It can make a space feel meaningful, celebratory, and spiritually charged.',
    useFor: ['Self-worth', 'Celebration', 'Prosperity', 'Sacred emphasis'],
    shadow: 'Can become ego, excess, performance, or needing to appear valuable.',
  },
];

const colorCombos = [
  {
    title: 'Grounded calm',
    colors: ['#22c55e', '#3b82f6', '#f8fafc'],
    meaning: 'Green, blue, and white create a clean regulation palette: nature, trust, and spaciousness.',
  },
  {
    title: 'Sacred transformation',
    colors: ['#a855f7', '#020617', '#f59e0b'],
    meaning: 'Purple, black, and gold create a mystical palette: depth, protection, value, and spiritual symbolism.',
  },
  {
    title: 'Creative confidence',
    colors: ['#f97316', '#facc15', '#ef4444'],
    meaning: 'Orange, yellow, and red create an activating palette: expression, optimism, and bold movement.',
  },
  {
    title: 'Tender repair',
    colors: ['#ec4899', '#22c55e', '#f8fafc'],
    meaning: 'Pink, green, and white create a soft emotional-reset palette: compassion, healing, and simplicity.',
  },
];

const applicationLayers = [
  {
    title: 'Room energy',
    body: 'Use color to cue the nervous system. Blue-green tones can make a space feel slower and safer, while red-orange tones can make it feel warmer and more active.',
  },
  {
    title: 'Meditation & ritual',
    body: 'Choose color intentionally: purple for contemplation, gold for reverence, green for heart repair, white for clearing, black for protection and containment.',
  },
  {
    title: 'Branding & design',
    body: 'Color sets the emotional promise of a page before the user reads a word. Soft colors invite trust; sharp contrast creates authority and intensity.',
  },
  {
    title: 'Self-concept work',
    body: 'Color can become an environmental affirmation. Wear or place colors around you that match the state you are practicing: calm, confidence, devotion, clarity, or worth.',
  },
];

const strategicColorCues = [
  {
    name: 'Red',
    hex: '#ef4444',
    cue: 'Energy, passion, urgency, attention.',
    use: 'Use for alerts, bold actions, physical drive, and high-emphasis moments. Keep it controlled so it does not create pressure.',
  },
  {
    name: 'Blue',
    hex: '#3b82f6',
    cue: 'Calmness, trust, stability, reliability.',
    use: 'Use in healthcare, corporate, education, and calming interfaces where steadiness matters.',
  },
  {
    name: 'Yellow',
    hex: '#facc15',
    cue: 'Happiness, optimism, warmth, mental brightness.',
    use: 'Use for highlights, learning, friendliness, and optimism. Avoid flooding a space with it because intense yellow can fatigue attention.',
  },
  {
    name: 'Green',
    hex: '#22c55e',
    cue: 'Nature, balance, renewal, relaxation.',
    use: 'Use for growth, recovery, environmental themes, wellness cues, and emotional reset.',
  },
  {
    name: 'Purple',
    hex: '#a855f7',
    cue: 'Creativity, luxury, spirituality, imagination.',
    use: 'Use for contemplative, artistic, premium, mystical, or visionary experiences.',
  },
  {
    name: 'Black',
    hex: '#020617',
    cue: 'Sophistication, power, authority, depth.',
    use: 'Use for contrast, focus, elegance, and seriousness. Balance it with air or warmth if the design starts to feel heavy.',
  },
  {
    name: 'White',
    hex: '#f8fafc',
    cue: 'Purity, simplicity, cleanliness, openness.',
    use: 'Use for clarity, spaciousness, reset, minimalism, and visual breathing room.',
  },
];

function SwatchRow({ colors }) {
  return (
    <div className="flex overflow-hidden rounded-full border border-white/10">
      {colors.map((color) => (
        <span key={color} className="h-3 flex-1" style={{ backgroundColor: color }} />
      ))}
    </div>
  );
}

export default function ColorPsychologyAtlas({ onBack, onSelectSection }) {
  return (
    <div className="ia-root text-slate-100" style={accentVars('colorpsychology')}>
      <InnerAtlasNav activeId="colorpsychology" onBack={onBack} onSelectSection={onSelectSection} title="Psychology of Colors" />

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8">
        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/25 p-6 shadow-2xl backdrop-blur-xl md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                {['Mood', 'Symbolism', 'Environment', 'Design'].map((tag) => (
                  <span key={tag} className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">Psychology of Colors</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
                Color influences attention, emotion, atmosphere, and symbolic meaning. This atlas maps colors as psychological cues, spiritual symbols, and practical tools for rooms, rituals, branding, and self-concept work.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
              <div className="grid grid-cols-5 gap-2">
                {colorMeanings.map((color) => (
                  <div key={color.name} className="aspect-square rounded-2xl border border-white/10 shadow-lg" style={{ backgroundColor: color.hex }} title={color.name} />
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                Use color as a cue, not a rigid rule. Personal memory, culture, lighting, saturation, and context can change how a color feels.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {colorMeanings.map((color) => (
            <article key={color.name} className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/20">
              <div className="mb-4 flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl border border-white/15 shadow-lg" style={{ backgroundColor: color.hex }} />
                <div>
                  <h2 className="text-xl font-black text-white">{color.name}</h2>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{color.energy}</p>
                </div>
              </div>
              <p className="text-sm leading-7 text-slate-300">{color.psychology}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {color.useFor.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold text-slate-200">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border border-amber-300/15 bg-amber-300/5 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200/80">Shadow side</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{color.shadow}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/5 p-6 shadow-2xl shadow-black/20">
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-200/80">Strategic Color Cues</div>
          <div className="mt-2 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <h2 className="text-3xl font-black text-white">Color changes the first read of a space</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Designers, marketers, and psychologists use color because it can shape mood, perceived trust, urgency, openness, and decision-making before words are processed. These cues are context-sensitive, not universal laws.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {strategicColorCues.map((color) => (
                <article key={color.name} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="h-8 w-8 rounded-xl border border-white/15" style={{ backgroundColor: color.hex }} />
                    <div>
                      <h3 className="text-sm font-black text-white">{color.name}</h3>
                      <p className="text-xs font-semibold text-slate-400">{color.cue}</p>
                    </div>
                  </div>
                  <p className="text-xs leading-5 text-slate-300">{color.use}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-black/25 p-6 shadow-2xl backdrop-blur-xl">
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300/80">Color Combinations</div>
            <h2 className="mt-2 text-3xl font-black text-white">Palettes create emotional sentences</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              A single color has meaning, but a palette creates a full emotional message. These combinations can guide rooms, rituals, app themes, content design, or mood boards.
            </p>
            <div className="mt-6 space-y-4">
              {colorCombos.map((combo) => (
                <div key={combo.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                  <SwatchRow colors={combo.colors} />
                  <h3 className="mt-4 text-lg font-bold text-white">{combo.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{combo.meaning}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-black/25 p-6 shadow-2xl backdrop-blur-xl">
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-300/80">Practical Use</div>
            <h2 className="mt-2 text-3xl font-black text-white">Where color psychology belongs</h2>
            <div className="mt-6 grid gap-4">
              {applicationLayers.map((layer) => (
                <div key={layer.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <h3 className="text-lg font-bold text-white">{layer.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{layer.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-violet-300/20 bg-violet-300/5 p-6 shadow-2xl shadow-black/20">
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-violet-200/80">Integration Prompt</div>
          <h2 className="mt-2 text-3xl font-black text-white">Ask what state the color is asking you to enter</h2>
          <p className="mt-4 max-w-4xl text-sm leading-8 text-slate-300">
            Instead of asking “what does this color mean?” ask: “What does this color invite my body, attention, and identity to feel?” That keeps color psychology grounded, personal, and useful.
          </p>
        </section>
      </main>
    </div>
  );
}
