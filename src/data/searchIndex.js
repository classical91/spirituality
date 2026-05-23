// Curated cross-portal content index for Deep Search.
//
// Each entry surfaces a section *inside* a portal, so a query like
// "abandonment" can return Heart Chakra, Attachment Theory, and the
// Faith/Trust prayer theme — not just the portal cards.
//
// Shape:
//   id:        unique key
//   portalId:  matches src/data/portals.js
//   section:   optional ?section=… deep-link target the portal knows how to honor
//   title:     primary display label
//   summary:   one-line description
//   tags:      free-form keywords the search matches against
//   lens:      'Symbolic' | 'Psychological' | 'Historical' | 'Wellness' | 'Reflection'

export const searchIndex = [
  // ─── Chakra Visualizer ───────────────────────────────────────────────
  { id: 'chakra-root',        portalId: 'chakra', section: 'root',        title: 'Root Chakra (Muladhara)',     summary: 'Safety, survival, grounding, belonging to the body and the earth.',                          tags: ['safety','survival','grounding','fear','body','red','earth','tribe','home'],                lens: 'Symbolic' },
  { id: 'chakra-sacral',      portalId: 'chakra', section: 'sacral',      title: 'Sacral Chakra (Svadhisthana)',summary: 'Emotion, pleasure, creativity, sensuality, and healthy flow of feeling.',                    tags: ['emotion','sexuality','pleasure','creativity','flow','orange','water','desire'],            lens: 'Symbolic' },
  { id: 'chakra-solar',       portalId: 'chakra', section: 'solar',       title: 'Solar Plexus Chakra (Manipura)', summary: 'Personal power, agency, confidence, and the will to act.',                              tags: ['power','will','confidence','agency','self-esteem','yellow','fire','boundaries'],          lens: 'Symbolic' },
  { id: 'chakra-heart',       portalId: 'chakra', section: 'heart',       title: 'Heart Chakra (Anahata)',      summary: 'Love, compassion, grief, abandonment, and the capacity to give and receive connection.',     tags: ['love','heartbreak','grief','abandonment','compassion','green','air','connection','forgiveness'], lens: 'Symbolic' },
  { id: 'chakra-throat',      portalId: 'chakra', section: 'throat',      title: 'Throat Chakra (Vishuddha)',   summary: 'Voice, truth, expression, and the ability to say what is real.',                              tags: ['voice','truth','expression','communication','blue','speaking','silence'],                 lens: 'Symbolic' },
  { id: 'chakra-third-eye',   portalId: 'chakra', section: 'thirdeye',    title: 'Third Eye Chakra (Ajna)',     summary: 'Insight, intuition, vision, and inner knowing beyond the senses.',                            tags: ['intuition','vision','insight','imagination','indigo','clarity','perception'],             lens: 'Symbolic' },
  { id: 'chakra-crown',       portalId: 'chakra', section: 'crown',       title: 'Crown Chakra (Sahasrara)',    summary: 'Spiritual connection, meaning, surrender, and union beyond the self.',                        tags: ['spirit','meaning','surrender','union','violet','divine','transcendence'],                 lens: 'Symbolic' },

  // ─── Natal Chart Decoder (planets) ───────────────────────────────────
  { id: 'astro-sun',     portalId: 'astrology', title: 'Sun ☉',     summary: 'Core identity, vitality, and the part of you that wants to be seen.',                tags: ['identity','self','vitality','purpose','leo','gold'],            lens: 'Symbolic' },
  { id: 'astro-moon',    portalId: 'astrology', title: 'Moon ☽',    summary: 'Emotional needs, instincts, comfort, and how you self-soothe.',                       tags: ['emotion','needs','mother','comfort','cancer','silver','attachment'], lens: 'Symbolic' },
  { id: 'astro-mercury', portalId: 'astrology', title: 'Mercury ☿', summary: 'Mind, speech, learning, and how you process information.',                            tags: ['mind','communication','learning','speech','gemini','virgo','mercury'], lens: 'Symbolic' },
  { id: 'astro-venus',   portalId: 'astrology', title: 'Venus ♀',   summary: 'Love style, attraction, beauty, values, and pleasure.',                               tags: ['love','attraction','beauty','values','taurus','libra','copper'], lens: 'Symbolic' },
  { id: 'astro-mars',    portalId: 'astrology', title: 'Mars ♂',    summary: 'Drive, action, desire, anger, and the engine of pursuit.',                            tags: ['drive','anger','action','desire','aries','iron','assertion'],   lens: 'Symbolic' },
  { id: 'astro-jupiter', portalId: 'astrology', title: 'Jupiter ♃', summary: 'Growth, faith, expansion, philosophy, and generosity.',                               tags: ['growth','faith','luck','meaning','sagittarius','tin'],          lens: 'Symbolic' },
  { id: 'astro-saturn',  portalId: 'astrology', title: 'Saturn ♄',  summary: 'Discipline, limits, maturity, fear, and slowly earned mastery.',                       tags: ['discipline','limits','fear','responsibility','capricorn','lead'], lens: 'Symbolic' },
  { id: 'astro-uranus',  portalId: 'astrology', title: 'Uranus ♅',  summary: 'Originality, sudden change, freedom, and rebellion.',                                 tags: ['freedom','disruption','originality','rebellion','aquarius'],    lens: 'Symbolic' },
  { id: 'astro-neptune', portalId: 'astrology', title: 'Neptune ♆', summary: 'Imagination, spirituality, dreams, and dissolving boundaries.',                       tags: ['dreams','spirituality','illusion','pisces','imagination'],     lens: 'Symbolic' },
  { id: 'astro-pluto',   portalId: 'astrology', title: 'Pluto ♇',   summary: 'Transformation, power, shadow material, and rebirth.',                                tags: ['power','shadow','transformation','scorpio','rebirth','intensity'], lens: 'Symbolic' },
  { id: 'astro-alchemy', portalId: 'astrology', title: 'Planet–metal correspondences', summary: 'The seven classical metals as symbolic mirrors of the seven planets.', tags: ['alchemy','metals','gold','silver','correspondence','hermetic'], lens: 'Historical' },

  // ─── Biblical Concepts ───────────────────────────────────────────────
  { id: 'bible-commandments',  portalId: 'biblical', title: 'The Ten Commandments',           summary: 'Sacred boundaries on worship, speech, family, sex, property, and truth.',          tags: ['commandments','law','moses','sinai','boundaries','ethics'],                            lens: 'Historical' },
  { id: 'bible-virtues',       portalId: 'biblical', title: 'Seven Heavenly Virtues',         summary: 'Chastity, temperance, charity, diligence, patience, kindness, humility.',         tags: ['virtues','character','humility','patience','kindness','charity','antidote'],            lens: 'Historical' },
  { id: 'bible-sins',          portalId: 'biblical', title: 'Seven Deadly Sins',              summary: 'Pride, greed, lust, envy, gluttony, wrath, sloth — disordered loves.',             tags: ['sins','pride','greed','lust','envy','wrath','sloth','gluttony','shadow'],               lens: 'Historical' },
  { id: 'bible-dante',         portalId: 'biblical', title: "Dante's Inferno",                summary: 'Nine symbolic circles of disordered love descending through the underworld.',      tags: ['dante','inferno','hell','circles','medieval','allegory'],                              lens: 'Historical' },
  { id: 'bible-demonology',    portalId: 'biblical', title: 'Demonology (Binsfeld map)',      summary: 'Historical/literary association of seven princes with the seven deadly sins.',     tags: ['demonology','binsfeld','lucifer','asmodeus','symbolic'],                              lens: 'Historical' },
  { id: 'bible-prayer-faith',  portalId: 'biblical', title: 'Faith & Trust prayers',          summary: 'Prayer themes around trust, surrender, fear, and uncertainty.',                    tags: ['faith','trust','fear','abandonment','surrender','prayer'],                             lens: 'Reflection' },
  { id: 'bible-prayer-forgive',portalId: 'biblical', title: 'Forgiveness prayers',            summary: 'Releasing resentment, owning fault, asking and granting forgiveness.',             tags: ['forgiveness','resentment','grace','reconciliation','prayer'],                          lens: 'Reflection' },
  { id: 'bible-prayer-shadow', portalId: 'biblical', title: 'Shadow / temptation prayers',    summary: 'Prayer language for the parts that act against your stated values.',              tags: ['shadow','temptation','sin','integrity','prayer'],                                      lens: 'Reflection' },

  // ─── Psychology Portal ───────────────────────────────────────────────
  { id: 'psy-self-schema', portalId: 'psychology', section: 'frameworks', title: 'Self-Schema',          summary: 'The mental model you hold about who you are and what is true about you.', tags: ['identity','self','schema','beliefs','self-concept'],                         lens: 'Psychological' },
  { id: 'psy-attachment',  portalId: 'psychology', section: 'frameworks', title: 'Attachment Theory',    summary: 'Secure, anxious, avoidant, and disorganized patterns of bonding.',          tags: ['attachment','anxious','avoidant','secure','abandonment','bonding','relationships'], lens: 'Psychological' },
  { id: 'psy-cbt',         portalId: 'psychology', section: 'frameworks', title: 'CBT',                  summary: 'Thoughts shape feelings — name the distortion, test the belief.',           tags: ['cbt','cognitive','distortion','thoughts','reframe','anxiety','depression'],   lens: 'Psychological' },
  { id: 'psy-somatic',     portalId: 'psychology', section: 'frameworks', title: 'Somatic Work',         summary: 'Working with the body, breath, and nervous system, not just thoughts.',     tags: ['somatic','body','nervous system','trauma','breath','regulation'],            lens: 'Psychological' },
  { id: 'psy-stoicism',    portalId: 'psychology', section: 'frameworks', title: 'Stoicism',             summary: 'Sort what is in your control from what is not, then act on the first.',     tags: ['stoicism','control','virtue','epictetus','marcus aurelius','equanimity'],     lens: 'Psychological' },
  { id: 'psy-systems',     portalId: 'psychology', section: 'frameworks', title: 'Systems Thinking',     summary: 'See the feedback loops behind the pattern instead of blaming the symptom.', tags: ['systems','feedback','loops','dynamics','patterns'],                          lens: 'Psychological' },
  { id: 'psy-design',      portalId: 'psychology', section: 'frameworks', title: 'Design Thinking',      summary: 'Empathize, define, ideate, prototype, test — applied to a life decision.',  tags: ['design thinking','empathy','prototype','decision','iteration'],              lens: 'Psychological' },
  { id: 'psy-comm',        portalId: 'psychology', section: 'frameworks', title: 'Communication',        summary: 'Nonviolent and direct speech: observation, feeling, need, request.',        tags: ['communication','nvc','conflict','needs','listening','relationships'],        lens: 'Psychological' },
  { id: 'psy-values',      portalId: 'psychology', section: 'frameworks', title: 'Values Framework',     summary: 'Make decisions from chosen values instead of mood, fear, or peer pressure.',tags: ['values','meaning','priority','choice','integrity'],                          lens: 'Psychological' },
  { id: 'psy-identity',    portalId: 'psychology', section: 'frameworks', title: 'Identity-Based Habits',summary: 'Change happens by becoming the person who naturally does the behavior.',   tags: ['identity','habits','behavior','self-image','clear','atomic habits'],         lens: 'Psychological' },
  { id: 'psy-powerstack',  portalId: 'psychology', section: 'powerstack', title: 'Power Stack',         summary: 'Stacking practices that target self-schema, nervous system, and identity.', tags: ['routine','practice','stack','daily','identity'],                             lens: 'Reflection' },

  // ─── InnerBalance Atlas ──────────────────────────────────────────────
  { id: 'iba-dopamine',         portalId: 'innerbalance', section: 'neurotransmitters', title: 'Dopamine',         summary: 'Motivation, anticipation, reward, and the drive to pursue what matters.',   tags: ['dopamine','motivation','reward','focus','drive','adhd'],                lens: 'Wellness' },
  { id: 'iba-serotonin',        portalId: 'innerbalance', section: 'neurotransmitters', title: 'Serotonin',        summary: 'Mood stability, satiety, social rank, and a sense of "enough".',           tags: ['serotonin','mood','depression','sleep','gut','calm'],                   lens: 'Wellness' },
  { id: 'iba-oxytocin',         portalId: 'innerbalance', section: 'neurotransmitters', title: 'Oxytocin',         summary: 'Bonding, trust, safety in connection — supported by relationship, not pills.', tags: ['oxytocin','bonding','trust','touch','connection','safety','love'],     lens: 'Wellness' },
  { id: 'iba-cortisol',         portalId: 'innerbalance', section: 'stress',            title: 'Cortisol & stress',summary: 'The stress-response cycle and how it gets stuck open.',                    tags: ['cortisol','stress','hpa','burnout','anxiety','recovery'],              lens: 'Wellness' },
  { id: 'iba-gaba',             portalId: 'innerbalance', section: 'neurotransmitters', title: 'GABA',             summary: 'The inhibitory brake — calm, slowing down, and the off-switch.',           tags: ['gaba','calm','sleep','anxiety','magnesium','inhibition'],              lens: 'Wellness' },
  { id: 'iba-vagus',            portalId: 'innerbalance', section: 'psychophysiology',  title: 'Vagus nerve',      summary: 'Parasympathetic tone, breath, social engagement, and felt safety.',       tags: ['vagus','parasympathetic','breath','polyvagal','safety','regulation'], lens: 'Wellness' },
  { id: 'iba-sleep',            portalId: 'innerbalance', section: 'sleep',             title: 'Sleep',             summary: 'How sleep architecture supports mood, memory, and immune repair.',         tags: ['sleep','circadian','melatonin','insomnia','recovery'],                 lens: 'Wellness' },
  { id: 'iba-nutrition',        portalId: 'innerbalance', section: 'nutrition',         title: 'Nutrition & nutrients', summary: 'Vitamins, minerals, and foods that support mood and energy.',           tags: ['nutrition','vitamins','minerals','b12','magnesium','iron','vitamin d','zinc'], lens: 'Wellness' },
  { id: 'iba-mood',             portalId: 'innerbalance', section: 'mooduplift',        title: 'Mood uplift',      summary: 'Behavioral levers that raise mood: sun, movement, social, breath.',         tags: ['mood','depression','sunlight','movement','behavioral activation'],     lens: 'Wellness' },
  { id: 'iba-activity',         portalId: 'innerbalance', section: 'physicalactivity',  title: 'Physical activity',summary: 'How movement regulates mood, cognition, and nervous system tone.',        tags: ['exercise','movement','cardio','strength','walking'],                   lens: 'Wellness' },

  // ─── Framework Atlas ─────────────────────────────────────────────────
  { id: 'fw-maslow',         portalId: 'frameworks', title: "Maslow's Hierarchy",         summary: 'Physiological, safety, belonging, esteem, self-actualization.',            tags: ['maslow','needs','motivation','hierarchy','self-actualization'],         lens: 'Psychological' },
  { id: 'fw-archetypes',     portalId: 'frameworks', title: 'Jungian Archetypes',         summary: 'Recurring symbolic patterns: Hero, Caregiver, Sage, Lover, Shadow, Self.', tags: ['jung','archetype','hero','shadow','anima','myth'],                      lens: 'Psychological' },
  { id: 'fw-first-principles',portalId:'frameworks', title: 'First Principles',           summary: 'Strip a problem to the irreducible truths, then rebuild from there.',     tags: ['first principles','reasoning','reduction','feynman','musk'],            lens: 'Psychological' },
  { id: 'fw-systems',        portalId: 'frameworks', title: 'Systems Thinking',           summary: 'Stocks, flows, feedback, delay — patterns that produce outcomes.',         tags: ['systems','meadows','feedback','dynamics'],                              lens: 'Psychological' },
  { id: 'fw-eisenhower',     portalId: 'frameworks', title: 'Eisenhower Matrix',          summary: 'Urgent vs important — decide what to do, defer, delegate, delete.',        tags: ['eisenhower','priority','urgent','important','time management'],         lens: 'Psychological' },
  { id: 'fw-ikigai',         portalId: 'frameworks', title: 'Ikigai',                     summary: 'The overlap of love, skill, pay, and what the world needs.',               tags: ['ikigai','meaning','purpose','vocation','japanese'],                     lens: 'Psychological' },
  { id: 'fw-okr',            portalId: 'frameworks', title: 'OKRs',                       summary: 'Objectives + key results — direction with measurable signal.',             tags: ['okr','goals','objectives','key results','grove','andy'],                lens: 'Psychological' },
  { id: 'fw-shadow',         portalId: 'frameworks', title: 'Shadow Work',                summary: 'Integrating disowned material instead of projecting it outward.',          tags: ['shadow','jung','projection','integration','dark side','inner work'],   lens: 'Reflection' },
  { id: 'fw-second-order',   portalId: 'frameworks', title: 'Second-order thinking',      summary: 'Consider the consequences of the consequences, not just the first move.',   tags: ['second order','consequences','thinking','decisions','dalio'],          lens: 'Psychological' },
  { id: 'fw-circle',         portalId: 'frameworks', title: 'Circle of Competence',       summary: 'Know what you know — and the edge where you stop knowing.',                tags: ['competence','buffett','knowledge','epistemics','humility'],            lens: 'Psychological' },

  // ─── Neville Goddard Portal ──────────────────────────────────────────
  { id: 'nev-living-in-end', portalId: 'neville', title: 'Living in the End',           summary: 'Assume the feeling of the wish fulfilled and inhabit it now.',              tags: ['living in the end','assumption','feeling','wish fulfilled','manifestation'], lens: 'Symbolic' },
  { id: 'nev-sats',          portalId: 'neville', title: 'SATS (State Akin to Sleep)',  summary: 'Imaginal practice in the drowsy state right before sleep.',                tags: ['sats','sleep','imagination','practice','drowsy','meditation'],          lens: 'Symbolic' },
  { id: 'nev-revision',      portalId: 'neville', title: 'Revision',                    summary: 'Replay the day as you wish it had gone to revise the inner cause.',         tags: ['revision','rewriting','memory','imagination','past'],                   lens: 'Symbolic' },
  { id: 'nev-mental-diet',   portalId: 'neville', title: 'Mental Diet',                 summary: 'Watch and curate inner speech the way you would curate food.',              tags: ['mental diet','self-talk','inner speech','discipline','attention'],     lens: 'Symbolic' },
  { id: 'nev-imagination',   portalId: 'neville', title: 'Imagination as Cause',        summary: "Imagination is the operant power — what you imagine becomes the inner cause.", tags: ['imagination','cause','creation','consciousness'],                     lens: 'Symbolic' },
  { id: 'nev-assumption',    portalId: 'neville', title: 'Law of Assumption',           summary: 'Whatever is assumed and felt to be true tends to harden into fact.',         tags: ['assumption','law','belief','feeling','manifestation'],                  lens: 'Symbolic' },
  { id: 'nev-i-am',          portalId: 'neville', title: 'I AM',                         summary: 'The "I AM" as the operant identity behind every assumption.',              tags: ['i am','identity','self','assumption','god within'],                     lens: 'Symbolic' },
  { id: 'nev-states',        portalId: 'neville', title: 'States',                       summary: 'You move through states rather than being a fixed personality.',           tags: ['states','identity','shift','change','consciousness'],                   lens: 'Symbolic' },
  { id: 'nev-phrase',        portalId: 'neville', title: 'Phrase Analyzer',              summary: 'Tool to test whether an inner phrase points toward the wish fulfilled.',   tags: ['phrase','self-talk','tool','analyzer','affirmation'],                   lens: 'Symbolic' },
  { id: 'nev-state-builder', portalId: 'neville', title: 'State Builder',                summary: 'Practice tool that helps you assemble and rehearse a desired state.',      tags: ['state builder','practice','rehearsal','identity','tool'],               lens: 'Symbolic' },
];

// Search the index. Returns up to `limit` ranked results.
// Title hits score higher than tag hits; tag hits higher than summary.
export function searchSections(query, { limit = 12 } = {}) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const scored = [];
  for (const entry of searchIndex) {
    const title = entry.title.toLowerCase();
    const summary = entry.summary.toLowerCase();
    const tagText = entry.tags.join(' ').toLowerCase();

    let score = 0;
    if (title.includes(q)) score += 10;
    if (title.startsWith(q)) score += 5;
    if (tagText.includes(q)) score += 6;
    if (summary.includes(q)) score += 2;
    // Per-tag exact match bonus
    if (entry.tags.some((t) => t.toLowerCase() === q)) score += 8;

    if (score > 0) scored.push({ entry, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.entry);
}
