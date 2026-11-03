// Spiritual Topics & Dictionary — a plain content-data module.
//
// This is the single source of truth for the /topics portal. It intentionally
// imports NOTHING (no portal components, no portal catalog, no search index) so
// it can be spread into searchIndex.js without a circular dependency.
//
// A "topic" is a concept guide, not a full portal section. Where the site
// already covers something in depth (Neville, Relationship Hub, InnerAtlas,
// Chakra Visualizer, Sacred Systems, …) the topic links out to it via
// `portalLinks` rather than duplicating the content.
//
// ── Schema ───────────────────────────────────────────────────────────────
//   id                unique kebab-case slug; also the ?section= deep link
//   title             display name
//   category          one of CATEGORIES below
//   type              'concept' | 'comparison'
//   summary           one sentence, shown on the card and in global search
//   definition        1–2 short paragraphs (array of paragraph strings)
//   keyIdea           one paragraph — the single thing to remember
//   distinctions      [{ label, explanation }] — comparisons / "X vs Y"
//   signs             { balanced: [...], imbalanced: [...] }
//   practices         [string] — small, concrete things to try
//   reflectionQuestions [string]
//   relatedTopicIds   [id] — other topics in this file
//   portalLinks       [{ portalId, section, label }] — links into existing portals
//   tags              [string] — free-form keywords for search
//   lens              'Symbolic' | 'Psychological' | 'Historical' | 'Wellness' | 'Reflection'
//   note              optional grounding / safety / interpretation note
//
// To add a topic: append an object to `spiritualTopics`. Search entries and the
// deep link are generated automatically — no routing or component changes.

// Ordered inner → outer: the foundation you stand on, the feelings that move
// through you, the awareness that holds them, then how it all shows up with
// other people. The browse view groups topics in this order.
export const TOPIC_CATEGORIES = [
  'Inner Foundation',
  'Emotional Life',
  'Awareness & Spirit',
  'Love & Relationships',
];

export const TOPIC_CATEGORY_DESCRIPTIONS = {
  'Inner Foundation': 'The ground you stand on — wholeness, self-trust, and authorship of your own life.',
  'Emotional Life': 'Telling apart the feelings that look alike — desire and desperation, longing and knowing.',
  'Awareness & Spirit': 'Attention, presence, intuition, and surrender — the quieter side of the inner life.',
  'Love & Relationships': 'How love works in practice — receiving, choosing, communicating, repairing, and letting go.',
};

export const spiritualTopics = [
  // ── Love & Relationships ────────────────────────────────────────────────
  {
    id: 'receptivity',
    title: 'Receptivity',
    category: 'Love & Relationships',
    type: 'concept',
    summary:
      'The capacity to receive love, support, attention, and opportunity without chasing or resisting them.',
    definition: [
      'Receptivity is the open, allowing side of relationship — the ability to let care, attention, and good things actually land instead of deflecting, minimizing, or grabbing at them.',
      'It is not passivity. A receptive person still has preferences, standards, and a voice; they simply stop trying to force outcomes and let connection meet them halfway.',
    ],
    keyIdea:
      'Chasing signals that you expect love to be scarce; receiving signals that you expect it to be mutual. The nervous system learns which one is true from how you respond to being offered something.',
    distinctions: [
      {
        label: 'Receptivity vs passivity',
        explanation:
          'Passivity waits and hopes with no preferences. Receptivity has clear desires and standards but stops chasing — it lets the right things arrive rather than forcing any thing to.',
      },
      {
        label: 'Receiving vs deflecting',
        explanation:
          'Deflecting a compliment or offer of help protects you from the vulnerability of mattering. Receiving simply says "thank you" and lets it in.',
      },
    ],
    signs: {
      balanced: [
        'You can accept a compliment without rushing to return or dismiss it.',
        'You let people help you and do not treat it as a debt.',
        'You state what you want, then let the other person choose freely.',
      ],
      imbalanced: [
        'You over-give to feel safe, then quietly resent the imbalance.',
        'Attention makes you anxious, so you test, chase, or push it away.',
        'You struggle to rest until you have "earned" care.',
      ],
    },
    practices: [
      'When offered a compliment or help, pause and say only "thank you."',
      'Name one thing you want from a relationship, then practice waiting without chasing.',
      'Notice the urge to over-explain or over-give and let it pass once.',
    ],
    reflectionQuestions: [
      'Where do I chase because waiting feels unsafe?',
      'What would I let in today if I trusted it would not be taken away?',
    ],
    relatedTopicIds: ['emotional-availability', 'self-trust', 'being-chosen-vs-neediness'],
    portalLinks: [
      { portalId: 'relationshiphub', section: 'chasing-vs-receiving', label: 'Chasing vs receiving' },
      { portalId: 'relationshiphub', section: 'foundations', label: 'Receiving & mutuality (Foundations)' },
      { portalId: 'chakra', section: 'heart', label: 'Heart Chakra — giving and receiving' },
    ],
    tags: ['receiving', 'love', 'openness', 'trust', 'chasing', 'allowing', 'mutuality'],
    lens: 'Reflection',
  },
  {
    id: 'love-without-possession',
    title: 'Love Without Possession',
    category: 'Love & Relationships',
    type: 'concept',
    summary:
      'Loving someone while leaving them free — care that does not depend on controlling, owning, or keeping them.',
    definition: [
      'Love without possession is the practice of wanting someone’s wellbeing more than you want to control their choices. You can have preferences and boundaries and still not treat a partner as property.',
      'Possessiveness tends to grow from fear of loss. The antidote is not indifference but security — a felt sense that you are okay whether or not you can control the outcome.',
    ],
    keyIdea:
      'A relationship is a series of free choices, made again and again. Trying to remove the other person’s freedom removes the very thing that makes being chosen meaningful.',
    distinctions: [
      {
        label: 'Love vs ownership',
        explanation:
          'Love wants the person to flourish, including in ways you do not control. Ownership wants guarantees, access, and compliance.',
      },
      {
        label: 'Boundaries vs control',
        explanation:
          'A boundary is what you will do to take care of yourself. Control is an attempt to manage what the other person does. One protects the relationship; the other erodes it.',
      },
    ],
    signs: {
      balanced: [
        'You can feel jealousy without acting on it as surveillance or demands.',
        'You trust the relationship without needing constant proof.',
        'You want your partner to have a full life beyond you.',
      ],
      imbalanced: [
        'You monitor, test, or need reassurance to feel calm.',
        'Their independence reads to you as rejection.',
        'You confuse intensity of need with depth of love.',
      ],
    },
    practices: [
      'When jealousy arises, name the fear underneath before deciding anything.',
      'Notice one place you are seeking control and replace it with a request.',
      'Let your partner make a plan without you and practice being okay.',
    ],
    reflectionQuestions: [
      'Do I want this person’s happiness, or their guarantee?',
      'What am I afraid would happen if I let go of controlling the outcome?',
    ],
    relatedTopicIds: ['devotion-vs-attachment', 'sovereignty', 'wholeness'],
    portalLinks: [
      { portalId: 'relationshiphub', section: 'jealousy-and-possessiveness', label: 'Jealousy & possessiveness' },
      { portalId: 'relationshiphub', section: 'boundaries', label: 'Boundaries (not walls)' },
      { portalId: 'relationshiphub', section: 'devotion', label: 'Devotion' },
    ],
    tags: ['love', 'possession', 'jealousy', 'control', 'freedom', 'boundaries', 'trust'],
    lens: 'Reflection',
    note: 'Framed around mutual choice and consent. Love does not entitle anyone to control, monitor, or restrict another person.',
  },
  {
    id: 'being-chosen-vs-neediness',
    title: 'Being Chosen vs Neediness',
    category: 'Love & Relationships',
    type: 'comparison',
    summary:
      'The difference between wanting connection from wholeness and needing it to feel okay about yourself.',
    definition: [
      'Wanting to be chosen is healthy: humans are wired for belonging. Neediness is different — it is when your sense of worth depends on someone selecting you, so their attention becomes a way to regulate your own self-image.',
      'The felt experience is nearly opposite. From wholeness, being chosen is a welcome addition. From neediness, not being chosen feels like proof of a verdict about you.',
    ],
    keyIdea:
      'The goal is not to stop wanting love. It is to want it from a self that is already whole, so that a "no" is disappointing rather than annihilating.',
    distinctions: [
      {
        label: 'Being chosen vs being prioritized',
        explanation:
          'Being chosen is a one-time selection; being prioritized is the ongoing pattern of someone actually making room for you. Prioritization is the more reliable signal.',
      },
      {
        label: 'Desire vs desperation',
        explanation:
          'Desire says "I would love this." Desperation says "I need this or I am not okay." The second tends to repel the very thing it reaches for.',
      },
    ],
    signs: {
      balanced: [
        'A rejection stings but does not rewrite your worth.',
        'You can leave a dynamic that is not mutual.',
        'You notice whether someone prioritizes you, not just whether they want you.',
      ],
      imbalanced: [
        'You audition for love and abandon your standards to be picked.',
        'One person’s approval sets your whole mood.',
        'You stay because being wanted feels too scarce to walk away from.',
      ],
    },
    practices: [
      'List the ways you already belong that do not depend on one person.',
      'Before seeking reassurance, name the feeling you are trying to soothe.',
      'Track prioritization over time, not intensity in a single moment.',
    ],
    reflectionQuestions: [
      'Am I trying to be chosen, or trying to prove something about myself?',
      'Would I accept from a friend the treatment I accept while waiting to be chosen?',
    ],
    relatedTopicIds: ['self-trust', 'wholeness', 'desire-vs-desperation', 'receptivity'],
    portalLinks: [
      { portalId: 'relationshiphub', section: 'chosen-and-wanted', label: 'Chosen & wanted' },
      { portalId: 'relationshiphub', section: 'being-a-priority', label: 'Being a priority' },
      { portalId: 'inneratlas', section: 'frameworks', label: 'Attachment theory (psychology)' },
      { portalId: 'neville', section: 'self-concept', label: 'Self-concept language' },
    ],
    tags: ['chosen', 'neediness', 'worth', 'validation', 'priority', 'belonging', 'approval'],
    lens: 'Reflection',
  },
  {
    id: 'emotional-availability',
    title: 'Emotional Availability',
    category: 'Love & Relationships',
    type: 'concept',
    summary:
      'The capacity and willingness to be present, honest, and reachable in an emotional connection.',
    definition: [
      'Emotional availability is the degree to which someone can show up for closeness — noticing their own feelings, sharing them, and staying present when a partner shares theirs.',
      'It is a state as much as a trait. Stress, unhealed loss, or a nervous system braced for danger can make even a caring person temporarily unavailable.',
    ],
    keyIdea:
      'Attraction tells you that you want someone; availability tells you whether a relationship is actually possible with them right now. The two are easy to confuse.',
    distinctions: [
      {
        label: 'Availability vs attraction',
        explanation:
          'Attraction is pull. Availability is whether the person can meet you in a real, consistent, emotionally present way. Intense attraction to an unavailable person is common and painful.',
      },
      {
        label: 'Unavailable vs not-yet-ready',
        explanation:
          'Some unavailability is a stable pattern; some is a season (grief, burnout, healing). It matters whether you are reading a character trait or a temporary state — and whether they are working on it.',
      },
    ],
    signs: {
      balanced: [
        'You can name a feeling as it happens and share it.',
        'You stay present when someone else is upset instead of shutting down.',
        'You follow through between conversations, not just in the moment.',
      ],
      imbalanced: [
        'Closeness triggers withdrawal, distraction, or sudden criticism.',
        'You keep partners at a fixed distance without naming why.',
        'You are drawn mostly to people who cannot fully show up.',
      ],
    },
    practices: [
      'Once a day, name one feeling out loud or in writing without fixing it.',
      'When you notice yourself pulling away, say "I’m going quiet, give me a minute" instead of vanishing.',
      'Ask whether a person’s actions, not just their words, are consistently present.',
    ],
    reflectionQuestions: [
      'Am I available right now, or bracing against closeness?',
      'Do I keep choosing people who confirm that love is out of reach?',
    ],
    relatedTopicIds: ['receptivity', 'anxiety-and-receiving', 'emotional-safety'],
    portalLinks: [
      { portalId: 'relationshiphub', section: 'foundations', label: 'Emotional safety & support' },
      { portalId: 'relationshiphub', section: 'mixed-signals', label: 'Reading mixed signals' },
      { portalId: 'inneratlas', section: 'emotional-awareness', label: 'Emotional awareness' },
    ],
    tags: ['emotional availability', 'presence', 'attraction', 'intimacy', 'connection', 'withdrawal'],
    lens: 'Reflection',
  },
  {
    id: 'emotional-safety',
    title: 'Emotional Safety',
    category: 'Love & Relationships',
    type: 'concept',
    summary:
      'Feeling safe enough to be honest, make mistakes, and be your real self without fear of punishment.',
    definition: [
      'Emotional safety is the felt sense that you can be seen — including your flaws and needs — without being mocked, punished, or abandoned for it.',
      'It is built through many small moments of being met with respect, and eroded by contempt, unpredictability, or having your vulnerability used against you.',
    ],
    keyIdea:
      'People cannot be intimate and defended at the same time. Safety is what lets the guard come down, which is the precondition for real closeness.',
    distinctions: [
      {
        label: 'Safety vs comfort',
        explanation:
          'Comfort is the absence of friction; safety is trust that friction can be repaired. A safe relationship can still have hard conversations.',
      },
    ],
    signs: {
      balanced: [
        'You can admit a mistake without expecting punishment.',
        'Disagreements end in repair rather than lasting cold distance.',
        'You do not rehearse your words to avoid setting the other person off.',
      ],
      imbalanced: [
        'You walk on eggshells or self-edit constantly.',
        'Vulnerability tends to be met with contempt or later used against you.',
        'You feel more relaxed when the other person is away.',
      ],
    },
    practices: [
      'Notice whether you can name a small unmet need without dread.',
      'After conflict, name one repair attempt you could make or receive.',
    ],
    reflectionQuestions: [
      'Where do I edit myself to stay safe, and is that wisdom or a warning?',
      'Do I offer others the safety I want to receive?',
    ],
    relatedTopicIds: ['emotional-availability', 'self-trust', 'love-without-possession'],
    portalLinks: [
      { portalId: 'relationshiphub', section: 'foundations', label: 'Emotional safety (Foundations)' },
      { portalId: 'relationshiphub', section: 'contempt-and-criticism', label: 'Contempt & criticism' },
    ],
    tags: ['emotional safety', 'safety', 'trust', 'eggshells', 'repair', 'vulnerability'],
    lens: 'Reflection',
    note: 'Persistent fear, contempt, or having your words used against you can indicate an unhealthy or unsafe dynamic. If you feel unsafe, consider talking with a trusted person or a qualified professional.',
  },
  {
    id: 'devotion-vs-attachment',
    title: 'Devotion vs Attachment',
    category: 'Love & Relationships',
    type: 'comparison',
    summary:
      'Steady, chosen commitment versus anxious clinging that grips tighter the more it fears loss.',
    definition: [
      'Devotion is a decision, renewed over time, to show up for someone or something. Anxious attachment is a fear-driven grip — it feels like love but is organized around avoiding loss.',
      'They can look similar from outside. The difference is felt on the inside: devotion is calm and giving; anxious attachment is restless and self-protective.',
    ],
    keyIdea:
      'Devotion can let go and still choose to stay. Anxious attachment cannot let go, because the holding on is doing a job — regulating fear.',
    distinctions: [
      {
        label: 'Devotion vs attachment',
        explanation:
          'Devotion gives from fullness and survives distance. Attachment takes from fear and panics at distance. One expands the person; the other shrinks them.',
      },
      {
        label: 'Attachment (bond) vs anxious attachment (style)',
        explanation:
          'Healthy attachment — the human bond — is good and necessary. "Attachment" here means the anxious, clinging pattern, not the secure bond itself.',
      },
    ],
    signs: {
      balanced: [
        'You stay because you choose to, not because you are afraid to leave.',
        'Time apart does not threaten your sense of the bond.',
        'You can give without keeping score.',
      ],
      imbalanced: [
        'Distance feels like danger and triggers pursuit.',
        'Your calm depends on constant contact or reassurance.',
        'You cling hardest exactly when you feel least secure.',
      ],
    },
    practices: [
      'When you feel the grip tighten, name the fear before the reach for contact.',
      'Practice one act of devotion that expects nothing back.',
      'Sit with a small amount of distance and let it be survivable.',
    ],
    reflectionQuestions: [
      'Am I holding on out of love or out of fear of loss?',
      'What would devotion look like if I were not afraid?',
    ],
    relatedTopicIds: ['love-without-possession', 'longing-vs-inner-knowing', 'sovereignty'],
    portalLinks: [
      { portalId: 'relationshiphub', section: 'devotion', label: 'Devotion' },
      { portalId: 'inneratlas', section: 'frameworks', label: 'Attachment theory (psychology)' },
      { portalId: 'relationshiphub', section: 'security-vs-fear', label: 'Security vs fear' },
    ],
    tags: ['devotion', 'attachment', 'anxious attachment', 'commitment', 'clinging', 'fear', 'love'],
    lens: 'Psychological',
  },
  {
    id: 'forms-of-love',
    title: 'Forms of Love',
    category: 'Love & Relationships',
    type: 'concept',
    summary:
      'Love is not one thing — romantic, companionate, compassionate, platonic, familial, and self-love are distinct forms.',
    definition: [
      'Love takes many forms, each with its own shape and place: romantic and passionate love, the steady companionate love of a shared life, compassionate love oriented toward another’s wellbeing, platonic and friendship love, familial and parental love, and self-love.',
      'Naming the forms keeps a genuine form of love from being confused with a psychological state (limerence), an unhealthy pattern (obsessive love), or a passing physical response (lovesickness).',
    ],
    keyIdea:
      'Love does not remove consent, boundaries, compatibility, or mutual choice. Strong feeling for someone is never, by itself, a claim on them.',
    relatedTopicIds: ['love-without-possession', 'compatibility'],
    portalLinks: [
      { portalId: 'relationshiphub', section: 'forms-of-love', label: 'Forms of Love' },
    ],
    tags: ['forms of love', 'romantic love', 'platonic love', 'companionate love', 'compassionate love', 'familial love', 'self-love', 'unconditional love'],
    lens: 'Reflection',
  },
  {
    id: 'compatibility',
    title: 'Compatibility',
    category: 'Love & Relationships',
    type: 'concept',
    summary:
      'How well two people can actually build a life together — across values, lifestyle, communication, sex, money, and long-term goals.',
    definition: [
      'Compatibility is the degree to which two people fit for a shared life: core values, lifestyle, emotional availability, communication and conflict styles, sexual and financial expectations, and long-term goals.',
      'It is different from attraction and chemistry, which tell you who you want — not who you can build with.',
    ],
    keyIdea:
      'A preference is something you’d like; a deal-breaker is something you can’t build a life around. Two good people can simply be incompatible.',
    distinctions: [
      { label: 'Attraction vs compatibility', explanation: 'Attraction is a pull; compatibility is fit. You can feel one without the other.' },
      { label: 'Potential vs present reality', explanation: 'Compatibility is measured by who someone actually is now, not who they might become.' },
    ],
    relatedTopicIds: ['forms-of-love'],
    portalLinks: [
      { portalId: 'relationshiphub', section: 'compatibility-and-choosing', label: 'Compatibility and Choosing' },
    ],
    tags: ['compatibility', 'deal-breakers', 'partner selection', 'choosing a partner', 'values', 'long-term fit'],
    lens: 'Reflection',
  },
  {
    id: 'communication',
    title: 'Communication',
    category: 'Love & Relationships',
    type: 'concept',
    summary:
      'Naming feelings and needs clearly, making requests rather than demands, and listening to understand.',
    definition: [
      'Healthy relationship communication means expressing what is true — feelings, needs, requests — directly, and listening well enough to reflect back what you heard.',
      'A request leaves room for a no; a demand punishes it. Asking beats assuming.',
    ],
    keyIdea:
      'Most conflict is not about the topic but about how it is raised and received. “When X happened, I felt Y; what I need is Z” carries more than any accusation.',
    relatedTopicIds: ['conflict-repair', 'consent'],
    portalLinks: [
      { portalId: 'relationshiphub', section: 'skills', label: 'Relationship Skills — Communication' },
      { portalId: 'relationshiphub', section: 'honest-direct', label: 'Honest, calm, direct' },
    ],
    tags: ['communication', 'expressing needs', 'requests vs demands', 'active listening', 'emotional validation'],
    lens: 'Reflection',
  },
  {
    id: 'conflict-repair',
    title: 'Conflict Repair',
    category: 'Love & Relationships',
    type: 'concept',
    summary:
      'Fighting fair and reconnecting afterward — staying on one issue, taking responsibility, and making repair attempts.',
    definition: [
      'Conflict repair is the set of moves that keep disagreement from eroding a relationship: regulating before responding, staying on one issue, replacing criticism and contempt with specific complaints and respect, and reconnecting afterward.',
      'Repair attempts — a joke, a hand, “let’s slow down” — are what separate couples who recover from those who spiral.',
    ],
    keyIdea:
      'It is not whether you fight but how you repair. A complete apology names what happened, owns the impact without excuses, and is backed by changed behavior.',
    relatedTopicIds: ['communication', 'reconciliation'],
    portalLinks: [
      { portalId: 'relationshiphub', section: 'conflict-patterns', label: 'Conflict Patterns' },
      { portalId: 'relationshiphub', section: 'skills', label: 'Relationship Skills — Conflict and Repair' },
    ],
    tags: ['conflict repair', 'conflict', 'apology', 'repair attempts', 'criticism', 'contempt', 'defensiveness'],
    lens: 'Reflection',
    note: 'Ordinary conflict is not abuse. Contempt, threats, or punishment that leave you afraid or controlled are a different category — prioritize safety.',
  },
  {
    id: 'consent',
    title: 'Consent',
    category: 'Love & Relationships',
    type: 'concept',
    summary:
      'Agreement that is freely given, specific, ongoing, and revocable — and never assumed from silence, pressure, or a relationship.',
    definition: [
      'Consent is a clear, freely given yes. It is specific to what is agreed, ongoing rather than granted once, and can be withdrawn at any time.',
      'Silence is not consent, pressure is not consent, and past consent does not guarantee present consent. A relationship or marriage creates no sexual entitlement.',
    ],
    keyIdea:
      'The only reliable consent is an enthusiastic, present yes that either person is free to change. Anything won by pressure is not consent.',
    relatedTopicIds: ['communication'],
    portalLinks: [
      { portalId: 'relationshiphub', section: 'skills', label: 'Relationship Skills — Consent' },
    ],
    tags: ['consent', 'ongoing consent', 'sexual boundaries', 'sexual communication', 'autonomy'],
    lens: 'Reflection',
    note: 'Pressuring, coercing, or ignoring a no is a violation, and sharing intimate images without consent is abuse. If this is happening to you, support is available.',
  },
  {
    id: 'codependency-vs-interdependence',
    title: 'Codependency vs Interdependence',
    category: 'Love & Relationships',
    type: 'comparison',
    summary:
      'Losing yourself to be needed, versus two whole people who rely on each other by choice.',
    definition: [
      'Codependency ties self-worth to being needed — rescuing, caretaking, enabling, and self-abandonment. Healthy interdependence lets two capable people lean on one another without either losing identity, agency, or responsibility.',
      'Independence is part of the picture, but the goal is not never needing anyone; it is needing without self-erasure.',
    ],
    keyIdea:
      'Codependence asks “who am I if they don’t need me?” Interdependence can say “I choose you” and still stand on its own.',
    distinctions: [
      { label: 'Rescuing vs supporting', explanation: 'Rescuing removes another’s responsibility; support respects it.' },
      { label: 'Self-abandonment vs mutuality', explanation: 'Self-abandonment erases you to keep the peace; mutuality keeps both people intact.' },
    ],
    relatedTopicIds: ['love-without-possession'],
    portalLinks: [
      { portalId: 'relationshiphub', section: 'codependency-vs-interdependence', label: 'Codependency vs Interdependence' },
    ],
    tags: ['codependency', 'interdependence', 'healthy interdependence', 'rescuing', 'enabling', 'self-abandonment', 'emotional boundaries'],
    lens: 'Psychological',
  },
  {
    id: 'relationship-grief',
    title: 'Relationship Grief',
    category: 'Love & Relationships',
    type: 'concept',
    summary:
      'The real loss felt at the end of a relationship — grief that comes in waves, not tidy stages.',
    definition: [
      'The end of a relationship is a genuine loss, and grief is the honest response to it. It moves in waves and loops rather than fixed, linear stages.',
      'Ambiguous loss — a ghosting or a fade with no explanation — is harder because the mind has no clear ending to hold onto.',
    ],
    keyIdea:
      'You can grieve a relationship, honor that the love was real, and still let it go. Grieving is not proof you chose wrong.',
    relatedTopicIds: ['closure', 'reconciliation'],
    portalLinks: [
      { portalId: 'relationshiphub', section: 'breakups-grief-and-closure', label: 'Breakups, Grief, and Closure' },
    ],
    tags: ['relationship grief', 'grief', 'breakup', 'ambiguous loss', 'ghosting', 'loss'],
    lens: 'Reflection',
    note: 'If loss brings thoughts of self-harm, or an ex is stalking or threatening you, reach out to a trusted person or crisis line right away.',
  },
  {
    id: 'closure',
    title: 'Closure',
    category: 'Love & Relationships',
    type: 'concept',
    summary:
      'The internal sense of completion after a loss — built by you, not owed by the other person.',
    definition: [
      'Closure is the settled sense that a chapter is complete. It is not something the other person is obligated to provide, and waiting for it can keep a wound open.',
      'It is built internally: an honest accounting of what was real, what was lost, and what you now choose.',
    ],
    keyIdea:
      'Closure is an act you perform for yourself. It does not require the other person’s apology, explanation, or participation.',
    relatedTopicIds: ['relationship-grief'],
    portalLinks: [
      { portalId: 'relationshiphub', section: 'breakups-grief-and-closure', label: 'Breakups, Grief, and Closure' },
    ],
    tags: ['closure', 'grief', 'no contact', 'letting go', 'acceptance', 'healing'],
    lens: 'Reflection',
  },
  {
    id: 'trust-repair',
    title: 'Trust Repair',
    category: 'Love & Relationships',
    type: 'concept',
    summary:
      'Rebuilding trust through changed behavior over time — not demanded back, and not owed.',
    definition: [
      'Trust is rebuilt slowly, through consistency and changed behavior — never restored by a single apology or granted on a timeline.',
      'An apology is words; accountability is owning the impact without excuses; changed behavior is the proof.',
    ],
    keyIdea:
      'Trust cannot be demanded. You are always free to decide it has not been re-earned, even when the other person wants it to be.',
    distinctions: [
      { label: 'Apology vs accountability', explanation: 'An apology says sorry; accountability owns the impact and changes.' },
      { label: 'Rebuilding trust vs demanding trust', explanation: 'One earns it over time; the other insists on it now.' },
    ],
    relatedTopicIds: ['reconciliation', 'conflict-repair'],
    portalLinks: [
      { portalId: 'relationshiphub', section: 'reconciliation-and-trust-repair', label: 'Reconciliation and Trust Repair' },
    ],
    tags: ['trust repair', 'rebuilding trust', 'accountability', 'consistency', 'changed behavior'],
    lens: 'Reflection',
  },
  {
    id: 'reconciliation',
    title: 'Reconciliation',
    category: 'Love & Relationships',
    type: 'concept',
    summary:
      'Coming back together after a rupture — possible under real conditions, and distinct from forgiveness.',
    definition: [
      'Reconciliation is the mutual rebuilding of a relationship after a breach. It requires clear accountability, changed behavior, consistency over time, and a shared, realistic desire to repair.',
      'Forgiveness is something you can do alone for your own peace; reconciliation takes two people and real conditions — and is not the same as returning to the old relationship.',
    ],
    keyIdea:
      'You can forgive without reconciling, and you are free to decide against reconciliation even if the other person wants it.',
    distinctions: [
      { label: 'Forgiveness vs reconciliation', explanation: 'Forgiveness is internal and solo; reconciliation is mutual and conditional.' },
      { label: 'Reconciliation vs returning to the old relationship', explanation: 'Genuine repair builds something healthier, not a restored old dynamic.' },
    ],
    relatedTopicIds: ['trust-repair', 'relationship-grief'],
    portalLinks: [
      { portalId: 'relationshiphub', section: 'reconciliation-and-trust-repair', label: 'Reconciliation and Trust Repair' },
    ],
    tags: ['reconciliation', 'getting back together', 'forgiveness', 'repair', 'accountability'],
    lens: 'Reflection',
    note: 'If a relationship involved abuse, coercion, or threats, an apology is not a reason to return — safety comes first.',
  },

  // ── Emotional Life ──────────────────────────────────────────────────────
  {
    id: 'desire-vs-desperation',
    title: 'Desire vs Desperation',
    category: 'Emotional Life',
    type: 'comparison',
    summary:
      'Clean wanting that comes from fullness versus anxious grasping that comes from a felt lack.',
    definition: [
      'Desire is a natural pull toward something you value. Desperation is desire distorted by fear — the sense that you must have it or you will not be okay.',
      'The object can be identical; the inner posture is opposite. Desire can act with patience. Desperation cannot wait, because the wanting has become a way to escape an unbearable lack.',
    ],
    keyIdea:
      'Desire says "this would be wonderful." Desperation says "I am not okay without this." Restoring your baseline okay-ness is what turns desperation back into clean desire.',
    distinctions: [
      {
        label: 'Desire vs desperation',
        explanation:
          'Desire is open-handed and can accept a no. Desperation is clenched and reads a no as catastrophe, which often produces the very outcome it fears.',
      },
      {
        label: 'Wanting vs neediness',
        explanation:
          'Wanting is a preference held by a whole person. Neediness is a preference that has been promoted to a survival requirement.',
      },
    ],
    signs: {
      balanced: [
        'You can pursue something wholeheartedly and still let it go.',
        'A setback is disappointing, not destabilizing.',
        'You act from "I would love this," not "I cannot bear to be without this."',
      ],
      imbalanced: [
        'You over-function, over-text, or over-give to force an outcome.',
        'A single no collapses your sense of okay-ness.',
        'Urgency drives choices you later regret.',
      ],
    },
    practices: [
      'Before acting on a want, restore your baseline: breath, ground, name the feeling.',
      'Ask, "Would I still want this if I already felt whole?"',
      'Introduce one small pause between the urge and the action.',
    ],
    reflectionQuestions: [
      'What am I afraid will be true about me if I do not get this?',
      'Where can I meet the underlying need directly instead of through this one outcome?',
    ],
    relatedTopicIds: ['being-chosen-vs-neediness', 'wholeness', 'longing-vs-inner-knowing', 'contentment-vs-fulfillment'],
    portalLinks: [
      { portalId: 'relationshiphub', section: 'texting-urges', label: 'Working with texting urges' },
      { portalId: 'neville', section: 'feeling-secret', label: 'Feeling from fullness (Neville)' },
      { portalId: 'inneratlas', section: 'regulation', label: 'Nervous-system regulation' },
    ],
    tags: ['desire', 'desperation', 'grasping', 'urgency', 'lack', 'wanting', 'neediness'],
    lens: 'Reflection',
  },
  {
    id: 'contentment-vs-fulfillment',
    title: 'Contentment vs Fulfillment',
    category: 'Emotional Life',
    type: 'comparison',
    summary:
      'Peace with what already is versus the deeper meaning that comes from growth and contribution.',
    definition: [
      'Contentment is a settled peace with the present — an inner "enough" that does not depend on getting more. Fulfillment is the sense of a life well spent, usually built through meaning, growth, and contribution over time.',
      'They are not rivals. Contentment is a state you can return to now; fulfillment is a longer arc. A good life tends to weave both — at ease with the present while moving toward what matters.',
    ],
    keyIdea:
      'Contentment answers "can I be at peace right now?" Fulfillment answers "is my life adding up to something that matters?" Chasing only one at the expense of the other leaves a gap.',
    distinctions: [
      {
        label: 'Contentment vs satisfaction',
        explanation:
          'Satisfaction is the pleasant closing of a specific want ("that was good"). Contentment is a broader, steadier okay-ness that does not need a want to be closed.',
      },
      {
        label: 'Contentment vs complacency',
        explanation:
          'Complacency is settling out of avoidance. Contentment is peace that still allows honest ambition — you can be at peace and still grow.',
      },
    ],
    signs: {
      balanced: [
        'You can enjoy the present without needing the next thing.',
        'You pursue goals without treating your peace as hostage to them.',
        'Rest does not feel like failure.',
      ],
      imbalanced: [
        'You postpone peace until an endlessly moving finish line.',
        'Stillness feels like emptiness, so you stay busy to avoid it.',
        'Achievements bring a brief high and then the same restlessness.',
      ],
    },
    practices: [
      'Name three things that are already enough right now.',
      'Separate a "contentment" practice (presence) from a "fulfillment" practice (meaningful action).',
      'Notice when "I’ll be happy when…" is running, and question it once.',
    ],
    reflectionQuestions: [
      'Can I be content now and ambitious for later at the same time?',
      'What would a fulfilling year look like, distinct from a busy one?',
    ],
    relatedTopicIds: ['wholeness', 'sovereignty', 'desire-vs-desperation'],
    portalLinks: [
      { portalId: 'inneratlas', section: 'purpose', label: 'Purpose & meaning' },
      { portalId: 'inneratlas', section: 'gratitude', label: 'Gratitude practice' },
      { portalId: 'inneratlas', section: 'mycore', label: 'My core — values & centre' },
    ],
    tags: ['contentment', 'fulfillment', 'satisfaction', 'meaning', 'peace', 'enough', 'purpose'],
    lens: 'Reflection',
  },
  {
    id: 'anxiety-and-receiving',
    title: 'Anxiety and Receiving',
    category: 'Emotional Life',
    type: 'concept',
    summary:
      'Why a nervous system braced for threat can make good things — love, rest, praise — feel unsafe to take in.',
    definition: [
      'When the body is in a stress state, it is scanning for danger, not savoring safety. In that mode, being loved, praised, or cared for can register as exposure rather than comfort, so the reflex is to deflect or brace.',
      'This is not a character flaw. It is physiology: a protective system doing its job at the wrong moment. Receiving becomes easier as the nervous system learns it is safe to soften.',
    ],
    keyIdea:
      'You cannot fully receive in a body that is bracing. Regulation comes first; openness follows. Softening the nervous system is often more effective than trying to "just accept" the good thing.',
    distinctions: [
      {
        label: 'Can’t receive vs won’t receive',
        explanation:
          'It rarely feels like a choice. A guarded nervous system is not refusing love; it is unable, in that moment, to feel it as safe. The work is safety, not willpower.',
      },
    ],
    signs: {
      balanced: [
        'You can let praise or affection land without immediately deflecting.',
        'Rest feels allowed, not like something to earn.',
        'You notice when you are calm enough to take good things in.',
      ],
      imbalanced: [
        'Compliments make you tense or suspicious.',
        'You feel most "on" and least able to relax when things are going well.',
        'Being cared for triggers an urge to do something in return immediately.',
      ],
    },
    practices: [
      'Before receiving, do one slow exhale that is longer than the inhale.',
      'Feel your feet or the chair — orient to the present as safe.',
      'Let a compliment sit for three seconds before responding.',
    ],
    reflectionQuestions: [
      'Is my body calm enough right now to actually take this in?',
      'What helps me feel safe enough to soften?',
    ],
    relatedTopicIds: ['receptivity', 'emotional-availability', 'self-trust'],
    portalLinks: [
      { portalId: 'inneratlas', section: 'psychophysiology', label: 'Vagus nerve & felt safety' },
      { portalId: 'inneratlas', section: 'regulation', label: 'Nervous-system regulation' },
      { portalId: 'relationshiphub', section: 'texting-urges', label: 'Urges & the anxious loop' },
      { portalId: 'neville', section: 'mental-diet', label: 'Mental diet' },
    ],
    tags: ['anxiety', 'receiving', 'nervous system', 'regulation', 'safety', 'vagus', 'stress'],
    lens: 'Wellness',
    note: 'This describes ordinary nervous-system patterns, not a diagnosis. Persistent anxiety that disrupts daily life is worth discussing with a qualified health professional.',
  },
  {
    id: 'longing-vs-inner-knowing',
    title: 'Longing vs Inner Knowing',
    category: 'Emotional Life',
    type: 'comparison',
    summary:
      'The ache of reaching for what feels absent versus the quiet certainty that needs no chasing.',
    definition: [
      'Longing is the felt distance between you and something you want — a reaching that can be beautiful but is organized around lack. Inner knowing is a settled sense of what is true or right for you that does not depend on the outcome being visible yet.',
      'Longing pulls you toward the future; inner knowing lets you act from the present. Mature desire often begins as longing and matures into knowing.',
    ],
    keyIdea:
      'Longing keeps its eyes on the gap. Inner knowing rests in the sense that the thing is already yours to move toward calmly. The shift from one to the other loosens the grip without giving up the desire.',
    distinctions: [
      {
        label: 'Longing vs inner knowing',
        explanation:
          'Longing is restless and future-tense; it aches. Inner knowing is quiet and present-tense; it trusts. Both can point at the same want.',
      },
      {
        label: 'Wanting vs knowing',
        explanation:
          'Wanting reaches outward for what is missing. Knowing acts from an inner certainty, so the same desire feels less like grasping and more like direction.',
      },
    ],
    signs: {
      balanced: [
        'You can want something and still feel settled about yourself.',
        'You act from quiet certainty rather than anxious reaching.',
        'Longing informs your direction without running your mood.',
      ],
      imbalanced: [
        'The ache of absence dominates your attention.',
        'You confuse the intensity of longing with proof it is right.',
        'You cannot rest until the wanted thing is secured.',
      ],
    },
    practices: [
      'When longing spikes, name what it is pointing you toward, then set it down.',
      'Practice feeling the wish as already true for a few breaths (living in the end).',
      'Ask what your calmest, most grounded self already knows here.',
    ],
    reflectionQuestions: [
      'Is this longing pointing me somewhere, or just keeping me in the gap?',
      'What do I already know, underneath the ache?',
    ],
    relatedTopicIds: ['desire-vs-desperation', 'devotion-vs-attachment', 'self-trust'],
    portalLinks: [
      { portalId: 'neville', section: 'living-end', label: 'Living in the end' },
      { portalId: 'neville', section: 'feeling-secret', label: 'The feeling is the secret' },
      { portalId: 'inneratlas', section: 'presence', label: 'Presence' },
    ],
    tags: ['longing', 'yearning', 'inner knowing', 'certainty', 'wanting', 'desire', 'presence'],
    lens: 'Reflection',
  },

  // ── Inner Foundation ────────────────────────────────────────────────────
  {
    id: 'wholeness',
    title: 'Wholeness',
    category: 'Inner Foundation',
    type: 'concept',
    summary:
      'The sense of being complete in yourself — not perfect, but not fundamentally missing a piece.',
    definition: [
      'Wholeness is the felt experience that you are already a full person, so relationships and achievements add to a complete life rather than complete an incomplete one.',
      'It does not mean self-sufficiency or needing no one. It means your baseline worth is not on loan from other people’s approval or from the next accomplishment.',
    ],
    keyIdea:
      'From wholeness, you can want things without needing them to rescue you. The same relationship feels entirely different depending on whether you enter it to complete yourself or to share an already-full life.',
    distinctions: [
      {
        label: 'Wholeness vs self-sufficiency',
        explanation:
          'Self-sufficiency can be a defended "I need no one." Wholeness can need people and receive them, because it is not using them to plug a hole.',
      },
      {
        label: 'Wholeness vs perfection',
        explanation:
          'Wholeness includes your flaws and unfinished parts. It is integration, not flawlessness.',
      },
    ],
    signs: {
      balanced: [
        'You enjoy connection without outsourcing your worth to it.',
        'A rejection or failure dents your day, not your identity.',
        'You can be alone without feeling like something is missing.',
      ],
      imbalanced: [
        'You feel like a partner or win would finally make you complete.',
        'Time alone reads as emptiness rather than rest.',
        'Your mood tracks tightly to others’ approval.',
      ],
    },
    practices: [
      'Name what is already whole in you today, independent of anyone.',
      'Do one thing purely because it is yours, not for approval.',
      'Notice the story "I’ll be complete when…" and gently question it.',
    ],
    reflectionQuestions: [
      'Where am I trying to be completed instead of shared with?',
      'What in me is already whole that I keep overlooking?',
    ],
    relatedTopicIds: ['self-trust', 'sovereignty', 'contentment-vs-fulfillment', 'being-chosen-vs-neediness'],
    portalLinks: [
      { portalId: 'inneratlas', section: 'integration', label: 'Integration & wholeness' },
      { portalId: 'inneratlas', section: 'mycore', label: 'My core' },
      { portalId: 'neville', section: 'self-concept', label: 'Self-concept language' },
    ],
    tags: ['wholeness', 'complete', 'self-worth', 'integration', 'enough', 'identity'],
    lens: 'Reflection',
  },
  {
    id: 'self-trust',
    title: 'Self-Trust',
    category: 'Inner Foundation',
    type: 'concept',
    summary:
      'The capacity to rely on your own perception, judgment, and sense of what is right for you.',
    definition: [
      'Self-trust is the accumulated confidence that you will perceive honestly, decide reasonably, and have your own back — even when you get it wrong. Like trust with another person, it is built through consistency over time.',
      'It grows every time you keep a promise to yourself, honor your own no, or act on your read of a situation and survive being mistaken.',
    ],
    keyIdea:
      'Self-trust is not certainty that you will always be right. It is the reliable expectation that you will handle whatever happens — which is what makes it safe to trust your own judgment at all.',
    distinctions: [
      {
        label: 'Self-belief vs self-trust',
        explanation:
          'Self-belief is a claim about your ability ("I can do this"). Self-trust is a track record of following through and self-honesty ("I will do what I said, and tell myself the truth").',
      },
      {
        label: 'Self-trust vs self-reliance',
        explanation:
          'Self-reliance can mean doing everything alone. Self-trust can still ask for help — it just trusts your own discernment about when and whom.',
      },
    ],
    signs: {
      balanced: [
        'You can make a decision without needing everyone to agree.',
        'You keep small promises to yourself.',
        'You notice a red flag and act on it rather than overriding your read.',
      ],
      imbalanced: [
        'You outsource every decision for reassurance.',
        'You override your own perception to keep the peace.',
        'You abandon promises to yourself first when things get busy.',
      ],
    },
    practices: [
      'Keep one small promise to yourself today, exactly as stated.',
      'When you sense something is off, write it down before talking yourself out of it.',
      'Make one low-stakes decision without seeking outside approval.',
    ],
    reflectionQuestions: [
      'Where do I already trust myself, and where do I hand that away?',
      'What would I do here if I trusted my own read?',
    ],
    relatedTopicIds: ['sovereignty', 'wholeness', 'receptivity'],
    portalLinks: [
      { portalId: 'inneratlas', section: 'self-trust', label: 'Self-trust (InnerAtlas)' },
      { portalId: 'inneratlas', section: 'discernment', label: 'Discernment' },
      { portalId: 'inneratlas', section: 'frameworks', label: 'Values framework' },
    ],
    tags: ['self-trust', 'trust yourself', 'judgment', 'intuition', 'discernment', 'confidence'],
    lens: 'Psychological',
  },
  {
    id: 'sovereignty',
    title: 'Sovereignty',
    category: 'Inner Foundation',
    type: 'concept',
    summary:
      'Being the author of your own life — grounded in your values, responsible for your choices, and not ruled by others’ approval.',
    definition: [
      'Sovereignty is inner self-governance: you know your values, you own your choices, and you do not hand the steering of your life to other people’s reactions.',
      'It is not domination or isolation. A sovereign person cooperates, loves, and compromises — from choice rather than from fear of disapproval.',
    ],
    keyIdea:
      'Sovereignty is the difference between being moved by your values and being moved by whoever you are most afraid of disappointing. It is freedom with responsibility, not freedom from other people.',
    distinctions: [
      {
        label: 'Sovereignty vs control',
        explanation:
          'Control tries to govern other people and outcomes. Sovereignty governs your own choices and leaves others theirs.',
      },
      {
        label: 'Sovereignty vs independence',
        explanation:
          'Independence can be a wall against needing anyone. Sovereignty can be deeply connected — it just keeps authorship of its own life.',
      },
    ],
    signs: {
      balanced: [
        'You can say no without a lengthy defense.',
        'You make decisions from values, not from fear of disapproval.',
        'You take responsibility for your choices without blaming or collapsing.',
      ],
      imbalanced: [
        'Your choices are shaped mainly by avoiding others’ reactions.',
        'You feel resentful because you keep abandoning yourself to keep the peace.',
        'You confuse rigidity or defiance with strength.',
      ],
    },
    practices: [
      'Make one choice today explicitly from your values, and name the value.',
      'Say a clear no without over-explaining.',
      'Notice where you are living by someone else’s expectations and choose consciously.',
    ],
    reflectionQuestions: [
      'Whose approval is steering this decision?',
      'What would I choose if I fully trusted my right to choose?',
    ],
    relatedTopicIds: ['self-trust', 'wholeness', 'love-without-possession'],
    portalLinks: [
      { portalId: 'chakra', section: 'solar', label: 'Solar Plexus Chakra — personal power' },
      { portalId: 'inneratlas', section: 'frameworks', label: 'Values framework' },
      { portalId: 'inneratlas', section: 'frameworks', label: 'Identity-based habits' },
    ],
    tags: ['sovereignty', 'self-governance', 'agency', 'power', 'values', 'autonomy', 'boundaries'],
    lens: 'Reflection',
  },
  // ── Awareness & Spirit ──────────────────────────────────────────────────
  {
    id: 'presence',
    title: 'Presence',
    category: 'Awareness & Spirit',
    type: 'concept',
    summary:
      'Being fully here — attention resting in this moment rather than replaying the past or rehearsing the future.',
    definition: [
      'Presence is attention that is available to what is actually happening: the body you are in, the person in front of you, the task at hand. It is less a special state than the absence of being elsewhere.',
      'It is not a feeling of calm you have to manufacture. You can be present with restlessness, grief, or boredom; presence is the willingness to be with whatever is here.',
    ],
    keyIdea:
      'You cannot force presence, but you can return to it. Every time you notice you have drifted and come back, that noticing is the practice — not a failure of it.',
    distinctions: [
      {
        label: 'Presence vs relaxation',
        explanation:
          'Relaxation lowers arousal. Presence is about where attention is, and can happen while alert, active, or uncomfortable.',
      },
      {
        label: 'Presence vs zoning out',
        explanation:
          'Zoning out is attention gone missing. Presence is attention fully arrived, even if the mind is quiet.',
      },
    ],
    signs: {
      balanced: [
        'You notice sensations, sounds, and people around you without straining.',
        'Conversations feel like listening rather than waiting to speak.',
        'You come back from distraction quickly and without self-criticism.',
      ],
      imbalanced: [
        'You live mostly in planning, replaying, or imagined conversations.',
        'Meals, walks, and time with people pass without registering.',
        'Stillness feels unbearable, so you fill every gap with input.',
      ],
    },
    practices: [
      'Three times today, stop and name three things you can hear.',
      'Eat the first three bites of a meal without screens or conversation.',
      'When you notice you have drifted, say “here” silently and return.',
    ],
    reflectionQuestions: [
      'Where does my attention go when nothing is demanding it?',
      'What am I avoiding by being somewhere other than here?',
    ],
    relatedTopicIds: ['awareness-vs-rumination', 'contentment-vs-fulfillment', 'gratitude'],
    portalLinks: [
      { portalId: 'inneratlas', section: 'presence', label: 'Presence (Awareness)' },
      { portalId: 'inneratlas', section: 'returning-attention', label: 'Returning attention' },
      { portalId: 'inneratlas', section: 'stillness-spaciousness-silence', label: 'Stillness, spaciousness, silence' },
    ],
    tags: ['presence', 'mindfulness', 'attention', 'here and now', 'meditation', 'being', 'now'],
    lens: 'Reflection',
  },
  {
    id: 'awareness-vs-rumination',
    title: 'Awareness vs Rumination',
    category: 'Awareness & Spirit',
    type: 'comparison',
    summary:
      'The difference between noticing a thought and getting caught in it — observing the loop versus living inside it.',
    definition: [
      'Awareness notices what the mind is doing: “there is worry,” “there is a replay of that conversation.” Rumination is being inside the content — going over it again and again as though thinking harder will resolve it.',
      'Both can involve the same thoughts. The difference is your relationship to them: one has a little space around it, the other has none.',
    ],
    keyIdea:
      'Rumination feels like problem-solving but rarely produces a decision. A useful test: if the last ten minutes of thinking did not change anything you will do, you were ruminating.',
    distinctions: [
      {
        label: 'Reflection vs rumination',
        explanation:
          'Reflection asks a question, reaches an insight, and stops. Rumination circles the same question without landing.',
      },
      {
        label: 'Noticing vs suppressing',
        explanation:
          'Awareness does not push thoughts away. It names them and lets them be there without following every one.',
      },
    ],
    signs: {
      balanced: [
        'You can say “I am worrying again” and feel a little space open.',
        'Thinking about a problem leads to a next step or a decision to let it rest.',
        'Painful thoughts come and go rather than taking over the day.',
      ],
      imbalanced: [
        'You replay the same conversation or mistake for hours.',
        'Going over it feels necessary, as though stopping would be careless.',
        'Sleep is delayed by loops that never resolve.',
      ],
    },
    practices: [
      'When a loop starts, label it in one word — “replaying,” “worrying,” “rehearsing.”',
      'Ask: is there one action I can take? If yes, write it down. If no, return to the breath.',
      'Set a fifteen-minute “worry window” and postpone loops to it.',
    ],
    reflectionQuestions: [
      'What am I hoping rumination will protect me from?',
      'Which thought, if I simply noticed it, would lose most of its grip?',
    ],
    relatedTopicIds: ['presence', 'anxiety-and-receiving', 'longing-vs-inner-knowing'],
    portalLinks: [
      { portalId: 'inneratlas', section: 'awareness-vs-rumination', label: 'Awareness vs rumination' },
      { portalId: 'inneratlas', section: 'returning-attention', label: 'Returning attention' },
    ],
    tags: ['rumination', 'overthinking', 'awareness', 'worry', 'thought loops', 'mindfulness', 'observer'],
    lens: 'Psychological',
    note: 'Persistent rumination that disrupts sleep, work, or mood can be part of anxiety or depression. A therapist can help; it is not a failure of willpower.',
  },
  {
    id: 'intuition-vs-fear',
    title: 'Intuition vs Fear',
    category: 'Awareness & Spirit',
    type: 'comparison',
    summary:
      'Telling a quiet inner knowing apart from the loud urgency of anxiety — both can feel like a “gut feeling.”',
    definition: [
      'Intuition is fast, pattern-based knowing that tends to arrive calmly and stay steady. Fear is a protective alarm that tends to arrive with urgency, catastrophic stories, and a push to act right now.',
      'Both are real signals worth listening to. The skill is not ignoring either one but knowing which one is speaking.',
    ],
    keyIdea:
      'Intuition usually informs; fear usually insists. Intuition is often quiet and neutral in tone. Fear escalates, repeats itself, and demands certainty.',
    distinctions: [
      {
        label: 'Calm knowing vs urgent alarm',
        explanation:
          'A clear “no” that does not need to argue is often intuition. A racing, looping “what if” is more often fear.',
      },
      {
        label: 'Intuition vs wishful thinking',
        explanation:
          'Intuition can tell you things you do not want to hear. Wishful thinking only ever agrees with what you already want.',
      },
    ],
    signs: {
      balanced: [
        'Your inner sense stays the same when you revisit it on a calmer day.',
        'You can hold a hunch lightly and check it against the facts.',
        'You notice red flags early without spiraling into worst-case stories.',
      ],
      imbalanced: [
        'Every anxious feeling gets treated as a prophetic warning.',
        'You override a steady inner “no” because it is inconvenient.',
        'You need certainty before acting and never feel you have enough.',
      ],
    },
    practices: [
      'Before a decision, ask: does this feeling get louder or quieter as I breathe slowly?',
      'Revisit a strong hunch after sleep and see if it is still there.',
      'Write the fear story and the quiet sense side by side, and notice the tone of each.',
    ],
    reflectionQuestions: [
      'When has my intuition been right, and how did it feel at the time?',
      'Is this sense asking me to look closer, or demanding that I act now?',
    ],
    relatedTopicIds: ['self-trust', 'longing-vs-inner-knowing', 'anxiety-and-receiving'],
    portalLinks: [
      { portalId: 'chakra', section: 'third-eye', label: 'Third Eye Chakra — intuition and insight' },
      { portalId: 'inneratlas', section: 'discernment', label: 'Discernment (psychology)' },
      { portalId: 'inneratlas', section: 'emotional-awareness', label: 'Emotional awareness' },
    ],
    tags: ['intuition', 'gut feeling', 'fear', 'anxiety', 'discernment', 'inner knowing', 'third eye'],
    lens: 'Reflection',
    note: 'If a situation feels unsafe, act on safety first and sort out whether it was fear or intuition afterward.',
  },
  {
    id: 'surrender-vs-resignation',
    title: 'Surrender vs Resignation',
    category: 'Awareness & Spirit',
    type: 'comparison',
    summary:
      'Letting go of control while staying engaged, versus giving up because you believe nothing will change.',
    definition: [
      'Surrender is releasing the need to control outcomes you cannot control, while still doing your part with care. It tends to bring relief and openness.',
      'Resignation looks similar from the outside — you stop pushing — but it is driven by hopelessness. It tends to bring heaviness, withdrawal, and a quiet “why bother.”',
    ],
    keyIdea:
      'Surrender lets go of the outcome but keeps the heart open. Resignation lets go of the heart and calls it acceptance.',
    distinctions: [
      {
        label: 'Acceptance vs approval',
        explanation:
          'Accepting what is happening does not mean you like it or agree with it. It means you stop arguing with reality so you can respond to it.',
      },
      {
        label: 'Letting go vs giving up',
        explanation:
          'Letting go loosens your grip and frees energy. Giving up withdraws effort and leaves you smaller.',
      },
    ],
    signs: {
      balanced: [
        'You act on what is yours to do, then rest about the rest.',
        'Releasing control brings relief rather than despair.',
        'You stay open to good things arriving in forms you did not plan.',
      ],
      imbalanced: [
        'You call it “letting go” but feel numb and defeated.',
        'You use surrender to avoid a hard conversation or action.',
        'You cannot rest until every outcome is guaranteed.',
      ],
    },
    practices: [
      'Divide a worry into two lists: what is mine to do, and what is not.',
      'Do one thing on the first list, then say “the rest is not mine to carry.”',
      'Notice whether letting go feels lighter or heavier. Lighter is surrender.',
    ],
    reflectionQuestions: [
      'What am I still trying to control that was never mine to control?',
      'Am I letting go from trust, or from exhaustion?',
    ],
    relatedTopicIds: ['devotion-vs-attachment', 'contentment-vs-fulfillment', 'presence'],
    portalLinks: [
      { portalId: 'chakra', section: 'crown', label: 'Crown Chakra — surrender and meaning' },
      { portalId: 'inneratlas', section: 'acceptance', label: 'Acceptance (Map of Consciousness)' },
    ],
    tags: ['surrender', 'resignation', 'letting go', 'acceptance', 'control', 'trust', 'faith'],
    lens: 'Reflection',
  },
  {
    id: 'gratitude',
    title: 'Gratitude',
    category: 'Awareness & Spirit',
    type: 'concept',
    summary:
      'Noticing and receiving what is already good — a practice of attention, not a demand to feel positive.',
    definition: [
      'Gratitude is the act of noticing what is already supporting you — people, moments, the body, small comforts — and letting that register. It trains attention toward what is present rather than only what is missing.',
      'It is not forced positivity. Real gratitude can sit beside grief, frustration, or want; it simply refuses to let those be the whole picture.',
    ],
    keyIdea:
      'Specific beats general. “I am grateful for my friend” fades quickly; “I am grateful she texted to check on me this morning” actually lands.',
    distinctions: [
      {
        label: 'Gratitude vs toxic positivity',
        explanation:
          'Gratitude adds to the picture without denying pain. Toxic positivity tells you that you should not feel what you feel.',
      },
      {
        label: 'Gratitude vs indebtedness',
        explanation:
          'Gratitude receives freely. Indebtedness turns every gift into something you owe back.',
      },
    ],
    signs: {
      balanced: [
        'You notice small good things without needing them to be big.',
        'You can thank people without immediately repaying them.',
        'Gratitude sits alongside hard feelings without cancelling them.',
      ],
      imbalanced: [
        'You use gratitude to shame yourself for feeling bad.',
        'Only what is missing feels real.',
        'Receiving kindness makes you uneasy until you have returned it.',
      ],
    },
    practices: [
      'Each evening, write three specific things from today — one sentence each.',
      'Thank one person directly for something small and concrete.',
      'When you notice a good moment, pause for one breath to let it land.',
    ],
    reflectionQuestions: [
      'What good thing in my life have I stopped noticing?',
      'Where am I waiting for “enough” before letting myself appreciate what is here?',
    ],
    relatedTopicIds: ['contentment-vs-fulfillment', 'receptivity', 'presence'],
    portalLinks: [
      { portalId: 'inneratlas', section: 'gratitude', label: 'Gratitude (Mood & neurochemistry)' },
      { portalId: 'chakra', section: 'heart', label: 'Heart Chakra — giving and receiving' },
    ],
    tags: ['gratitude', 'appreciation', 'thankfulness', 'contentment', 'noticing', 'receiving', 'journaling'],
    lens: 'Wellness',
  },
];

// ── Generated exports ──────────────────────────────────────────────────────
// Kept in this module so searchIndex.js can import ready-made entries without
// importing the portal catalog (which would create a cycle).

export const spiritualTopicsById = Object.fromEntries(
  spiritualTopics.map((t) => [t.id, t])
);

// Search entries for the global Deep Search index. Shape matches searchIndex.js.
export const spiritualTopicSearchEntries = spiritualTopics.map((topic) => ({
  id: `topic-${topic.id}`,
  portalId: 'topics',
  section: topic.id,
  title: topic.title,
  summary: topic.summary,
  tags: [
    ...topic.tags,
    topic.category.toLowerCase(),
    ...(topic.type === 'comparison' ? ['comparison', 'vs'] : []),
    'dictionary',
    'concept',
  ],
  lens: topic.lens,
}));
