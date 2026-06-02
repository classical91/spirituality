import React, { useMemo, useState, useEffect, useRef } from "react";

const frameworks = [
  {
    id: "living-end",
    title: "Living in the End",
    tag: "Identity Framework",
    short: "Assume the wish fulfilled and let your inner state match the reality already accepted within.",
    explanation:
      "Neville's central move is not begging, chasing, hoping, or forcing. It is becoming the version of yourself for whom the desire is already natural. You do not wait for the world to prove it first; you occupy the state first.",
    steps: [
      "Name the fulfilled reality clearly.",
      "Ask: who am I if this is already true?",
      "Feel the naturalness of that identity.",
      "Return to the state when appearances contradict it.",
    ],
    example: "Instead of: 'I hope she chooses me.' Try: 'I am chosen, loved, and steady in love.'",
    color: "from-indigo-500 to-violet-500",
  },
  {
    id: "sats",
    title: "SATS",
    tag: "State Akin To Sleep",
    short: "Use the relaxed, drowsy threshold state to impress the subconscious with a short fulfilled scene.",
    explanation:
      "SATS is a quiet state where the mind is less argumentative. Neville used it to enter a short imaginal scene that implies the desire is already complete.",
    steps: [
      "Relax the body and slow the breath.",
      "Pick one short scene that would happen after fulfillment.",
      "Loop it gently until it feels real or natural.",
      "Fall asleep or end with calm certainty.",
    ],
    example: "A friend congratulates you. You hear it, feel it, and accept it as normal.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "feeling-secret",
    title: "Feeling Is the Secret",
    tag: "Emotional Assumption",
    short: "The feeling of reality gives an assumption its power.",
    explanation:
      "Feeling does not mean forcing high emotion all day. It means the inner sense that something is real, settled, natural, and already yours.",
    steps: [
      "Do not chase intensity.",
      "Look for the quiet feeling of 'of course.'",
      "Let the desired identity feel normal.",
      "Return to emotional ownership when doubt appears.",
    ],
    example: "The feeling is less 'I need this now' and more 'this is already my place.'",
    color: "from-rose-500 to-orange-500",
  },
  {
    id: "revision",
    title: "Revision",
    tag: "Memory Repatterning",
    short: "Rewrite the meaning of a past event so it no longer controls your present state.",
    explanation:
      "Revision is Neville's practice of changing your relationship to the past. You replay an unwanted scene as it should have gone, then accept the revised emotional meaning.",
    steps: [
      "Choose one painful or unwanted scene.",
      "Relax and replay it differently.",
      "Hear the words you wish had been said.",
      "Let the nervous system receive the new ending.",
    ],
    example: "Instead of replaying rejection, revise it as being understood, chosen, and respected.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "mental-diet",
    title: "Mental Diet",
    tag: "Attention Discipline",
    short: "Stop feeding thoughts that contradict the identity you are choosing.",
    explanation:
      "A mental diet is not thought suppression. It is refusing to rehearse the old story as your truth. You notice the contradiction and gently return to the fulfilled assumption.",
    steps: [
      "Catch the old story quickly.",
      "Do not argue with it for hours.",
      "Replace it with the fulfilled identity.",
      "Repeat until the new state becomes familiar.",
    ],
    example: "Old story: 'I am ignored.' New assumption: 'I am valued, seen, and chosen.'",
    color: "from-amber-500 to-yellow-500",
  },
  {
    id: "inner-conversation",
    title: "Inner Conversations",
    tag: "Internal Dialogue",
    short: "Your repeated inner conversations reveal the state you are occupying.",
    explanation:
      "Neville placed huge importance on the conversations we silently have with people. If you keep arguing inside, you rehearse separation. If you hear love, respect, and resolution, you practice the fulfilled state.",
    steps: [
      "Notice the silent conversation you keep replaying.",
      "Pause the argument version.",
      "Hear the person respond from the desired reality.",
      "Let that new conversation feel normal.",
    ],
    example: "Hear: 'I love you. I choose you. I am happy with you.' Then rest in it.",
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    id: "wish-fulfilled",
    title: "The Wish Fulfilled",
    tag: "The State Sought",
    short: "The end is the feeling of the wish already fulfilled — the satisfied state, not the getting.",
    explanation:
      "For Neville, the goal is never the external object. It is the inner state of satisfaction that comes after the wish is granted. You do not imagine wanting; you imagine from the place of already having. The wish fulfilled is a feeling you wear, not an event you wait for.",
    steps: [
      "Ask: what would I feel if this were already done?",
      "Find the relief, ease, or quiet satisfaction of completion.",
      "Drop the wanting — wanting confirms absence.",
      "Rest in the feeling of 'it is finished.'",
    ],
    example: "Not 'I want to be loved' but the settled feeling of one who is already loved and secure.",
    color: "from-violet-500 to-purple-500",
  },
  {
    id: "certainty",
    title: "Certainty",
    tag: "Faith in the Unseen",
    short: "Faith is loyalty to unseen reality — assuming with the same certainty you give a known fact.",
    explanation:
      "Neville defined faith not as hope but as certainty about what the senses cannot yet confirm. You treat the assumption as established truth, the way you are certain of your own name. Doubt is not the absence of proof — it is loyalty to appearances over the chosen state.",
    steps: [
      "Choose the assumption and treat it as settled fact.",
      "Stop requiring the outer world to confirm it first.",
      "When appearances contradict, stay loyal to the unseen.",
      "Let certainty feel quiet and matter-of-fact, not forced.",
    ],
    example: "You are as certain of the fulfilled state as you are that the sun will rise — no argument needed.",
    color: "from-sky-500 to-indigo-500",
  },
  {
    id: "persistence",
    title: "Persistence",
    tag: "Faithful Continuance",
    short: "An assumption, though false to the senses, hardens into fact if you persist in it.",
    explanation:
      "Neville taught that the state must be held faithfully over time. Manifestation rarely fails from a wrong technique; it fails from abandoning the state the moment appearances disagree. Persistence is the quiet refusal to return to the old assumption, day after day, until the new state becomes natural.",
    steps: [
      "Decide the state and commit to remaining in it.",
      "Expect contradiction and do not let it move you.",
      "Return gently each time you slip — without self-attack.",
      "Continue until the assumption feels like simple fact.",
    ],
    example: "You keep assuming the secure, chosen identity even on the days nothing has visibly changed.",
    color: "from-teal-500 to-emerald-500",
  },
  {
    id: "knowing-being",
    title: "Knowing by Being",
    tag: "To Be Is to Know",
    short: "You cannot know a state from the outside — you know it only by entering and being it.",
    explanation:
      "Neville's principle is that knowledge of a state comes through occupation, not observation. You do not study love, wealth, or security from a distance; you become the one who already has it, and from inside that identity you know its reality. Being precedes evidence — you are the state first, and knowing follows.",
    steps: [
      "Stop analysing the desire from the outside.",
      "Step into the identity for whom it is already true.",
      "Notice how the world looks and feels from inside that state.",
      "Let being the state replace trying to figure it out.",
    ],
    example: "You don't think about how to be chosen — you assume the self that already is, and know it from within.",
    color: "from-amber-500 to-rose-500",
  },
];

const keyParallels = [
  {
    modern: "Mental rehearsal",
    neville: "Imagination creates reality",
    description: "The mind rehearses reality into being by repeatedly occupying a scene, identity, or expectation.",
    use: "SATS, scene looping, inner conversations.",
  },
  {
    modern: "Visualization",
    neville: "Enter the scene and feel it real",
    description: "See and feel the event as already done instead of watching it like a distant movie.",
    use: "Sensory imaginal scenes and short fulfilled moments.",
  },
  {
    modern: "Embodiment",
    neville: "Live in the end",
    description: "Think and feel from the desired state, not of it. The identity comes first; behavior follows.",
    use: "Identity statements, relationship assumptions, self-concept work.",
  },
  {
    modern: "Emotional alignment",
    neville: "Feeling is the secret",
    description: "The emotional tone gives the imagined state the feeling of reality. Calm certainty beats forced intensity.",
    use: "Moving from anxiety into naturalness.",
  },
  {
    modern: "Cognitive reframing",
    neville: "Revision",
    description: "A past scene is rewritten internally so it no longer defines the present identity.",
    use: "Rejection, regret, arguments, and old emotional loops.",
  },
  {
    modern: "Attention training",
    neville: "Mental diet",
    description: "You stop feeding the old story and keep returning attention to the fulfilled assumption.",
    use: "Spiraling, checking, doubt, and repeated negative inner talk.",
  },
];

const corePrinciples = [
  {
    title: "Inner state drives manifestation",
    statement: "Manifestation is driven by your inner state — imagination, assumption, and feeling — not external images.",
    explanation:
      "Outer images can inspire you, but they are not the cause. Neville's work points back to the state you occupy within: what you assume, feel as real, and identify with.",
    reminder: "Do not worship the picture. Occupy the state the picture represents.",
  },
  {
    title: "Images are symbols, not the source",
    statement: "A vision board, photo, or symbol only helps when it moves you into the fulfilled state.",
    explanation:
      "The image is useful if it helps you feel natural ownership. It becomes weak when you stare at it from lack, longing, or comparison.",
    reminder: "Use images as reminders, not proof that something is missing.",
  },
  {
    title: "Feeling makes imagination alive",
    statement: "The imaginal act becomes powerful when it carries the feeling of reality.",
    explanation:
      "Feeling does not have to mean emotional intensity. It can be calm certainty, relief, normalness, or the quiet sense that it is already so.",
    reminder: "Reality-feeling matters more than visual detail.",
  },
];

const timeAnchors = [
  {
    word: "Present",
    anchor: "Brings attention back to what is here.",
    distortion: "Future simulation.",
    use: "I return to the present state where I am already secure.",
  },
  {
    word: "Now",
    anchor: "Collapses waiting and delay.",
    distortion: "Someday thinking.",
    use: "I am loved now. I am chosen now. I am steady now.",
  },
  {
    word: "Past",
    anchor: "Places the old story behind you.",
    distortion: "Rumination and replay.",
    use: "That was the past. It is no longer my state.",
  },
  {
    word: "Future",
    anchor: "Reveals when the mind is projecting.",
    distortion: "Anxiety and imagined outcomes.",
    use: "The future is not where I live. I occupy the fulfilled state now.",
  },
  {
    word: "Temporary",
    anchor: "Stops a passing mood from becoming identity.",
    distortion: "Making a moment permanent.",
    use: "This feeling is temporary. My identity remains chosen and secure.",
  },
  {
    word: "Permanent",
    anchor: "Separates true identity from passing events.",
    distortion: "Over-identifying with circumstances.",
    use: "My fulfilled state is more permanent than this passing circumstance.",
  },
  {
    word: "Event",
    anchor: "Shrinks a trigger back into one moment.",
    distortion: "Turning one event into a whole identity.",
    use: "This was an event, not the definition of who I am.",
  },
  {
    word: "Process",
    anchor: "Lets the bridge unfold without panic.",
    distortion: "Demanding instant proof.",
    use: "This is a process expressing my assumed state.",
  },
];

const subconsciousStack = [
  {
    element: "Emotion",
    strength: "Fuel",
    principle: "Feeling is the secret",
    why: "Emotion gives the imaginal act life-force. The subconscious responds when the scene carries the feeling of reality, not when it is repeated mechanically.",
    optimized: "I feel deeply loved, chosen, and secure now.",
    avoid: "Repeating words while emotionally living in fear or lack.",
  },
  {
    element: "Identity",
    strength: "Embodiment",
    principle: "I AM is stronger than I am doing",
    why: "Identity tells the subconscious who you are being. 'I AM the man who…' lands deeper than trying to perform the right actions from insecurity.",
    optimized: "I am the man who is loved, chosen, respected, and wanted.",
    avoid: "Trying to earn the state through performance.",
  },
  {
    element: "Gratitude / Certainty",
    strength: "Already mine",
    principle: "Gratification over hoping",
    why: "Gratitude works best when it feels like possession, not begging. Certainty signals that the desire is already accepted within.",
    optimized: "I am grateful that love is natural, present, and already mine.",
    avoid: "Thanking from panic, lack, or trying to convince yourself.",
  },
  {
    element: "Vividness",
    strength: "Imprint",
    principle: "Enter the scene",
    why: "Vividness helps the scene sink in faster because the mind receives sensory detail as lived experience. It should feel immersive, not forced.",
    optimized: "I hear her voice, feel her warmth, and know I am home in this love.",
    avoid: "Watching the scene from outside like a distant movie.",
  },
];

const toneDistinctions = [
  {
    tone: "Excitement",
    state: "Wanting",
    note: "Excitement can be beautiful, but if it feels like chasing a future high, it may still point to not having it yet.",
    shift: "Let excitement settle into calm ownership.",
  },
  {
    tone: "Hope",
    state: "Waiting",
    note: "Hope can help you begin, but it often keeps the desire ahead of you instead of within you now.",
    shift: "Move from 'I hope it happens' to 'I know who I am now.'",
  },
  {
    tone: "Gratitude-as-thanks",
    state: "Acknowledging lack",
    note: "Thanking can accidentally imply distance when it feels like begging, relief-seeking, or trying to convince yourself.",
    shift: "Use gratitude as recognition, not pleading.",
  },
  {
    tone: "Gratification",
    state: "Having",
    note: "Gratification is the settled feeling of already having. It is less performance, more inner satisfaction.",
    shift: "Rest in the having-state: this is mine, this is normal, this is settled.",
  },
];

const bridgeWarnings = [
  {
    word: "Strive",
    energy: "effort, work, struggle",
    warning: "Not living in the end",
    signals: ["trying", "effort", "overcoming", "wanting improvement", "not there yet"],
    why: "Strive can keep the desire in the distance because it implies you are still working your way toward the end instead of occupying it now.",
    shift: "I am already the version of me who has this naturally.",
  },
  {
    word: "Trying",
    energy: "attempting, hoping, reaching",
    warning: "Can imply separation",
    signals: ["maybe", "hopefully", "one day", "if it works", "I need to make it happen"],
    why: "Trying is useful for action, but weak as an identity state. It can make the wish feel conditional or unfinished.",
    shift: "I move from the state of already being chosen, loved, and secure.",
  },
  {
    word: "Working on",
    energy: "fixing, improving, not complete",
    warning: "Self-improvement bridge",
    signals: ["I am fixing myself", "I need to become better first", "I am not ready yet", "I must earn it"],
    why: "Working on yourself can be healthy, but in Neville terms it should not become proof that you are currently incomplete.",
    shift: "I am whole now, and my actions express that wholeness.",
  },
  {
    word: "Attracting",
    energy: "pulling something from outside",
    warning: "May imply it is not here yet",
    signals: ["coming someday", "waiting", "chasing signs", "checking the 3D"],
    why: "Attracting can sound positive, but it may still place the desire outside you instead of making it your assumed reality.",
    shift: "I am in the state of already having and being loved now.",
  },
];

const stateBlockers = [
  {
    id: "lack",
    title: "Lack",
    subtitle: "Absence-consciousness",
    definition: "Feeling the absence of the desire more than the presence of the assumed state.",
    soundsLike: ["I don't have it yet", "Why is it not here?", "What am I missing?", "I need proof first"],
    why: "Lack keeps awareness fixed on non-possession. In Neville terms, it repeats the state of not having.",
    shift: "I return to the state of already having. I am no longer relating to this from absence.",
  },
  {
    id: "limiting-beliefs",
    title: "Limiting Beliefs",
    subtitle: "Old assumptions",
    definition: "Repeated assumptions that say the desire is hard, unsafe, unrealistic, or not meant for you.",
    soundsLike: ["This always happens to me", "Love is hard for me", "People don't choose me", "I need to fix myself first"],
    why: "Beliefs become the state you return to automatically unless you consciously choose a new assumption.",
    shift: "I no longer identify with that belief. My new assumption is the one I live from now.",
  },
  {
    id: "shadows",
    title: "Shadows",
    subtitle: "Hidden fears",
    definition: "Unseen fears, wounds, insecurities, and rejected feelings that quietly shape your assumptions.",
    soundsLike: ["Fear of rejection", "Fear of abandonment", "Fear of not being enough", "Fear of being unseen"],
    why: "Shadow material can make the fulfilled state feel unsafe, unstable, or hard to hold.",
    shift: "I see the fear without making it my identity. A triggered feeling is not the truth of who I am.",
  },
  {
    id: "pitfalls",
    title: "Pitfalls",
    subtitle: "Practice traps",
    definition: "Common mistakes that look like practice but pull awareness back into lack.",
    soundsLike: ["Checking the 3D constantly", "Looking for signs", "Over-affirming from panic", "Forcing emotion", "Obsessing over timing"],
    why: "Pitfalls keep you in reaction instead of assumption. They turn practice into evidence-hunting.",
    shift: "I stop measuring reality by appearances. I return to the state, not the evidence hunt.",
  },
  {
    id: "straining",
    title: "Straining / Trying",
    subtitle: "Inner over-effort",
    definition: "Pressure, forcing, pushing, gripping, or mentally working hard to make the desire happen.",
    soundsLike: ["I'm trying to believe", "I'm trying to feel it real", "I'm forcing myself to stay positive", "I need to make this work"],
    why: "Straining usually means the desire is still being treated as distant. It carries the energy of effort, tension, and not-there-yet.",
    shift: "I stop straining and return to naturalness. I do not force the state; I occupy it.",
  },
  {
    id: "unbelief",
    title: "Unbelief",
    subtitle: "Inner contradiction",
    definition: "Doubt, disbelief, or refusing to accept the reality of the assumption.",
    soundsLike: ["This isn't really true", "What if none of this works?", "I can't fully accept it", "I don't believe I'm chosen"],
    why: "Unbelief does not ruin the practice. It simply reveals that the old state is asking for attention.",
    shift: "I do not worship doubt. Unbelief is the old state speaking. I return to the assumption I choose.",
  },
];

const wordVerdicts = [
  {
    word: "Expect",
    verdict: "Avoid",
    symbol: "⚠️",
    why: "Keeps it future",
    explanation: "Expect can sound positive, but it often tempts the mind back into waiting. It implies the desire is still on the way instead of already accepted.",
    from: "I expect my desire.",
    to: "I have my desire.",
  },
  {
    word: "Assume",
    verdict: "Correct",
    symbol: "✅",
    why: "Present identity",
    explanation: "Assume is strong Neville language because it means you accept the identity or reality inwardly before outer proof appears.",
    from: "I am waiting for proof.",
    to: "I assume I am already the one who has it.",
  },
  {
    word: "Accept",
    verdict: "Correct",
    symbol: "✅",
    why: "Present fact",
    explanation: "Accept works when it feels like receiving the fact inwardly. It is less about hoping and more about letting the state be true now.",
    from: "I hope this becomes true.",
    to: "I accept this as true for me now.",
  },
  {
    word: "Know",
    verdict: "Correct",
    symbol: "✅",
    why: "Inner certainty",
    explanation: "Know is powerful when it feels calm and settled. It points to inner certainty rather than emotional performance.",
    from: "Maybe it will happen.",
    to: "I know this is already mine.",
  },
  {
    word: "It is done",
    verdict: "Ideal",
    symbol: "✅",
    why: "Final state",
    explanation: "This is the cleanest end-state phrase. It closes the loop and removes the need to keep checking, forcing, or waiting.",
    from: "I am waiting for it to happen.",
    to: "It is done.",
  },
];

const agreementPrinciples = [
  {
    title: "Stop arguing with the desire",
    body: "Agreement begins when the mind stops debating whether the desire is allowed, possible, or right for you.",
  },
  {
    title: "Drop the inner but",
    body: "The old state says, 'Yes, but…' Agreement says, 'Yes, this is mine to experience.'",
  },
  {
    title: "End the inner split",
    body: "You may not feel full conviction yet, but you are no longer divided against the desire.",
  },
  {
    title: "Stop negotiating with reality",
    body: "Agreement is not begging the 3D to change. It is inwardly consenting to the fulfilled assumption now.",
  },
];

const agreementLadder = ["Arguing", "Agreeing", "Accepting", "Knowing", "Having"];

const phraseRules = [
  { term: "attract", label: "Attracting", issue: "may place the desire outside you", shift: "Move from pulling it in to already being in the fulfilled state." },
  { term: "trying", label: "Trying", issue: "carries effort and not-there-yet energy", shift: "Move from effort into natural ownership." },
  { term: "strive", label: "Striving", issue: "suggests work, struggle, and overcoming", shift: "Move from strain into calm assumption." },
  { term: "hope", label: "Hope", issue: "can keep the desire in the future", shift: "Move from hoping into knowing." },
  { term: "want", label: "Wanting", issue: "often emphasizes absence", shift: "Move from wanting into having." },
  { term: "need", label: "Needing", issue: "can intensify lack or pressure", shift: "Move from need into sufficiency." },
  { term: "waiting", label: "Waiting", issue: "keeps awareness on delay", shift: "Move from waiting into now." },
  { term: "expect", label: "Expecting", issue: "can tempt the mind into future proof-checking", shift: "Move from expecting into accepting." },
];

function getPhraseAnalysis(phrase) {
  const clean = phrase.trim();
  const lower = clean.toLowerCase();
  const hits = phraseRules.filter((rule) => lower.includes(rule.term));
  const hasIdentity = lower.startsWith("i am ") || lower === "i am" || lower.startsWith("i'm ") || lower === "i'm";
  const hasOwnership = lower.startsWith("i have ") || lower === "i have";
  const hasKnowing = lower.startsWith("i know ") || lower === "i know" || lower.includes("it is done");
  const hasRevision = lower.includes("i remember when");
  const hasNow = lower.includes("now") || lower.includes("already") || lower.includes("natural");
  const hasFuture = lower.includes("will") || lower.includes("soon") || lower.includes("one day") || lower.includes("someday");

  let score = 45;
  if (hasIdentity) score += 25;
  if (hasOwnership) score += 20;
  if (hasKnowing) score += 22;
  if (hasRevision) score += 18;
  if (hasNow) score += 14;
  if (hasFuture) score -= 18;
  score -= hits.length * 12;
  score = Math.max(5, Math.min(100, score));

  const power = score >= 82 ? "Strong end-state" : score >= 62 ? "Good bridge" : score >= 42 ? "Mixed state" : "Old-state warning";
  const verdict = score >= 82 ? "Aligned" : score >= 62 ? "Mostly aligned" : score >= 42 ? "Needs refinement" : "Rewrite recommended";

  let rewrite = "I am already the person for whom this is natural, secure, and done.";
  if (lower.includes("woman") || lower.includes("love") || lower.includes("relationship")) {
    rewrite = "I am already loved, chosen, secure, and fulfilled in my relationship.";
  }
  if (lower.includes("money") || lower.includes("wealth") || lower.includes("rich")) {
    rewrite = "I am already prosperous, secure, and naturally supported by wealth.";
  }
  if (hasRevision) {
    rewrite = "I remember when that old story felt real. Now I live from the fulfilled state.";
  }
  if (hasOwnership && clean) {
    rewrite = clean;
  }

  return {
    score,
    power,
    verdict,
    hits,
    hasIdentity,
    hasOwnership,
    hasKnowing,
    hasRevision,
    hasNow,
    hasFuture,
    rewrite,
  };
}

// ─── Phrase Analyzer helpers (Self-Concept Language Studio) ───────────────
// Pronoun-aware starters and phrase banks for the analyzer below.
const PRONOUN_PRESETS = [
  { id: "neutral",  label: "Neutral",  partner: "the person I love",  possessive: "" },
  { id: "her",      label: "Her",      partner: "the woman I love",   possessive: "her" },
  { id: "him",      label: "Him",      partner: "the man I love",     possessive: "his" },
  { id: "them",     label: "Them",     partner: "the one I love",     possessive: "their" },
  { id: "partner",  label: "Partner",  partner: "my partner",         possessive: "" },
];

function starterPhrasesFor(pronoun) {
  const base = [
    "I am chosen in love",
    "I am loved",
    "I am secure in love",
    "It feels natural to be loved",
    "Being loved feels normal to me",
    "I have a loving relationship",
  ];
  if (pronoun.id === "neutral") return base;
  if (pronoun.id === "her")     return [...base, "I am the man she loves", "I am her man", `${pronoun.possessive ? "Her" : "She"} loves me deeply`];
  if (pronoun.id === "him")     return [...base, "I am the man he loves", "I am his man", "He loves me deeply"];
  if (pronoun.id === "them")    return [...base, `I am loved by ${pronoun.partner}`, `${pronoun.partner} loves me deeply`];
  if (pronoun.id === "partner") return [...base, "My partner loves me deeply", "I am loved by my partner"];
  return base;
}

function phraseBanksFor(pronoun) {
  const partnerPhrase = pronoun.partner;
  return [
    {
      title: "I am statements",
      tag: "Identity",
      desc: "Use when the sentence should define who you are, not what you are chasing.",
      examples: [
        "I am chosen in love.",
        "I am loved, valued, and secure.",
        "I am the kind of person who is cherished.",
        pronoun.id === "her"     ? "I am the man she loves." :
        pronoun.id === "him"     ? "I am the man he loves." :
        pronoun.id === "partner" ? "I am my partner's person." :
                                   `I am loved by ${partnerPhrase}.`,
      ],
    },
    {
      title: "I have statements",
      tag: "Possession / reality",
      desc: "Use when you want the feeling or relationship to sound already present.",
      examples: [
        "I have a loving relationship that feels natural and secure.",
        "I have love that is steady, warm, and mutual.",
        `I have ${partnerPhrase} in my life.`,
        "I have affection, closeness, and loyalty.",
      ],
    },
    {
      title: "Being statements",
      tag: "Embodied state",
      desc: "Use when the phrase should feel lived-in, natural, and emotionally familiar.",
      examples: [
        "Being loved feels natural to me.",
        "Being chosen in love feels normal now.",
        `Being with ${partnerPhrase} feels steady and real.`,
        "Being emotionally secure is who I am now.",
      ],
    },
  ];
}

const TRANSFORMATIONS = [
  { before: "I want them to choose me.", after: "I am chosen in love.",                  note: "Moves from wanting to identity." },
  { before: "I hope they love me.",      after: "I am the kind of person who is loved.", note: "Removes uncertainty and makes the role clear." },
  { before: "I need to feel loved.",     after: "Being loved feels natural to me.",      note: "Softens neediness into embodied normalcy." },
  { before: "Love is coming to me.",     after: "I have love that feels steady and mutual.", note: "Present possession beats future arrival." },
];

const ANALYZER_MODES = [
  { id: "native",     label: "Native",     hint: "Most natural rewrite for what you typed." },
  { id: "identity",   label: "Identity",   hint: "Force the sentence into 'I am' form." },
  { id: "experience", label: "Experience", hint: "Phrase it as an embodied feeling, not a fact about you." },
  { id: "repair",     label: "Repair",     hint: "Detect wanting / needing / hoping and rewrite from the end." },
];

function normalizePhrase(text) {
  return text.trim().replace(/\s+/g, " ");
}

function detectCategory(text) {
  const t = text.toLowerCase();
  if (/^i\s+am\b|^i'm\b/.test(t))               return "I am statement";
  if (/^i\s+have\b|^i've\b/.test(t))            return "I have statement";
  if (/^being\b/.test(t))                       return "Being statement";
  if (/^it\s+feels\b|^i\s+feel\b/.test(t))      return "Feeling statement";
  return "Open phrase";
}

function checkPresentTense(text) {
  const t = text.toLowerCase();
  const future = /\b(will|going to|soon|someday|one day|eventually|about to|trying to|hoping to|waiting for|want to|need to)\b/.test(t);
  const past   = /\b(was|were|had been|used to)\b/.test(t);
  if (future) return { status: "Watch", label: "Future leaning", detail: "This points toward waiting instead of already being." };
  if (past)   return { status: "Watch", label: "Past leaning",   detail: "This describes what happened, not what is true now." };
  return        { status: "Good",  label: "Present tense",   detail: "This reads as happening now — clean self-concept wording." };
}

function checkPassiveVoice(text) {
  const t = text.toLowerCase();
  const passive   = /\b(am|is|are|was|were|be|being|been)\s+\w+(ed|en)\b/.test(t);
  const lovedBy   = /\b(am|is|are|being)\s+loved\s+by\b/.test(t);
  const chosenBy  = /\b(am|is|are|being)\s+chosen\s+by\b/.test(t);

  if (lovedBy || chosenBy) {
    return { status: "Okay", label: "Passive but usable", detail: "Receiving love is the point. For stronger identity, make the role direct (\"I am loved\")." };
  }
  if (passive) {
    return { status: "Watch", label: "Possible passive voice", detail: "Sounds less direct. Try making yourself the clear subject." };
  }
  return { status: "Good", label: "Active and direct", detail: "The sentence feels clear and self-led." };
}

function detectMisalignment(text) {
  const t = text.toLowerCase();
  const notes = [];
  if (/\b(want|need|hope|trying|waiting|chasing|manifesting|desperate|why won't|when will)\b/.test(t)) {
    notes.push("Desire/absence signal detected. Try phrasing this as already natural, present, or part of your identity.");
  }
  if (/\b(make\s+(her|him|them)|force|control|get\s+(her|him|them)\s+to|convince\s+(her|him|them))\b/.test(t)) {
    notes.push("Leans toward control. A cleaner phrase centers your identity, not someone else's choice.");
  }
  if (/\b(not\s+rejected|not\s+abandoned|not\s+ignored|no longer|stop)\b/.test(t)) {
    notes.push("Focused on avoiding pain. Name the positive state directly — chosen, secure, loved, prioritized.");
  }
  return notes;
}

function nativeSuggestion(text, mode) {
  const t = normalizePhrase(text);
  if (!t) return "Type a sentence to get a native-sounding version.";
  const low = t.toLowerCase();

  // Repair mode: aggressively rewrite desire-based phrases.
  if (mode === "repair") {
    if (/\b(want|hope|trying|waiting)\b/.test(low)) {
      if (low.includes("love")) return "I am chosen in love.";
      if (low.includes("rich") || low.includes("money") || low.includes("wealth")) return "I am prosperous and supported by wealth.";
      return "I am already the person for whom this is natural.";
    }
    if (/\bneed\b/.test(low)) return "Being this is already natural to me.";
  }

  // Identity mode: force I-am form.
  if (mode === "identity") {
    if (low.startsWith("i am ") || low.startsWith("i'm ")) return t.replace(/\.$/, "") + ".";
    if (low.startsWith("being ")) return t.replace(/^being\s+/i, "I am ").replace(/\.$/, "") + ".";
    if (low.startsWith("it feels ")) return t.replace(/^it feels\s+/i, "I am ").replace(/\.$/, "") + ".";
    if (low.includes("love")) return "I am chosen in love.";
    return "I am the kind of person for whom this is true.";
  }

  // Experience mode: embodied feeling.
  if (mode === "experience") {
    if (low.startsWith("being ")) return t.replace(/\.$/, "") + ".";
    if (low.startsWith("i am ") || low.startsWith("i'm ")) {
      return t.replace(/^i\s*am\s*/i, "Being ").replace(/^i'm\s+/i, "Being ").replace(/\.$/, "") + " feels natural to me.";
    }
    return "Being this feels natural to me.";
  }

  // Native (default): light-touch polishing.
  if (low === "i am her man")            return "I am the man she loves.";
  if (low === "i am his man")            return "I am the man he loves.";
  if (low === "i am loved by my woman")  return "My woman loves me deeply.";
  if (low === "it feels great having love") return "It feels great to have love in my life.";
  if (low.includes("want")  && low.includes("choose")) return "I am chosen in love.";
  if (low.includes("hope")  && low.includes("love"))   return "I am the kind of person who is loved.";
  if (low.includes("need")  && low.includes("feel"))   return "Being loved feels natural to me.";
  if (low.startsWith("i feel ")) return t.replace(/^i feel/i, "I am").replace(/\.$/, "") + ".";
  return t.endsWith(".") ? t : t + ".";
}

function identityScore(text) {
  const t = text.toLowerCase();
  let score = 52;
  if (/^i\s+am\b|^i'm\b/.test(t)) score += 22;
  if (/^being\b/.test(t)) score += 18;
  if (/^i\s+have\b|^i've\b/.test(t)) score += 14;
  if (/\b(chosen|loved|valued|secure|cherished|wanted|prioritized|devoted|faithful)\b/.test(t)) score += 16;
  if (/\b(want|need|hope|trying|waiting|soon|someday|one day|will|manifesting)\b/.test(t)) score -= 25;
  if (/\bnot|never|no longer|stop\b/.test(t)) score -= 10;
  if (t.length < 8) score -= 8;
  return Math.max(0, Math.min(100, score));
}

const SAVED_PHRASES_KEY = "neville-saved-phrases";

function readSavedPhrases() {
  if (typeof window === "undefined") return [];
  try {
    const raw = JSON.parse(window.localStorage.getItem(SAVED_PHRASES_KEY) || "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function writeSavedPhrases(list) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SAVED_PHRASES_KEY, JSON.stringify(list));
  } catch {
    // storage may be disabled — ignore
  }
}

const simpleFormula = [
  {
    step: "1",
    title: "Imagine",
    subtitle: "Choose the fulfilled scene",
    detail: "See the desire from the end, not from wanting. The scene should imply it already happened.",
    prompt: "What would I experience after this is already true?",
  },
  {
    step: "2",
    title: "Feel",
    subtitle: "Give it the tone of reality",
    detail: "Let the scene feel natural, accepted, and emotionally real. It does not need to be dramatic.",
    prompt: "What does it feel like now that this is normal for me?",
  },
  {
    step: "3",
    title: "Rest",
    subtitle: "Stop forcing the bridge",
    detail: "Drop the anxious effort. Rest in the assumption instead of checking the outer world every minute.",
    prompt: "Can I let this be done without micromanaging how?",
  },
  {
    step: "4",
    title: "Receive",
    subtitle: "Allow the state to express",
    detail: "Move through life as the person who has it. Receive the bridge of incidents without fighting the process.",
    prompt: "How would I act if I trusted this state?",
  },
];

const powerLadder = [
  {
    rank: "01",
    phrase: "I am",
    level: "Max Power",
    symbol: "🔥",
    note: "Full embodiment",
    meaning: "Pure identity. You are not trying to get the desire; you are being the person for whom it is already true.",
    example: "I am chosen. I am loved. I am her man.",
  },
  {
    rank: "02",
    phrase: "I have",
    level: "Ownership",
    symbol: "💎",
    note: "You possess it now",
    meaning: "Present possession. This works well when you want ownership without overthinking identity.",
    example: "I have a loving relationship. I have peace. I have what I desire.",
  },
  {
    rank: "03",
    phrase: "I know",
    level: "Certainty",
    symbol: "💥",
    note: "Unshakable belief",
    meaning: "Inner knowing that does not need constant proof. Strongest when it feels calm, not forced.",
    example: "I know I am loved. I know it is working. I know who I am.",
  },
  {
    rank: "04",
    phrase: "It is done",
    level: "Completion",
    symbol: "🔮",
    note: "Final state",
    meaning: "The end result is already complete. This quiets the mind when it wants to micromanage the bridge.",
    example: "It is done. The relationship is already mine. The answer is already here.",
  },
  {
    rank: "05",
    phrase: "It is natural",
    level: "Normalization",
    symbol: "🌱",
    note: "Of course I have it",
    meaning: "Very Neville-aligned. The wish feels ordinary and expected instead of magical, distant, or desperate.",
    example: "It is natural for me to be loved. It is natural for me to be chosen.",
  },
  {
    rank: "06",
    phrase: "I'm aware",
    level: "Medium-High",
    symbol: "✅",
    note: "Consciousness of truth",
    meaning: "A bridge into acceptance. You recognize the fulfilled truth, though it may still feel like awareness rather than full embodiment.",
    example: "I'm aware that I am valued. I'm aware that love is present now.",
  },
  {
    rank: "07",
    phrase: "I remember when",
    level: "Revision Key",
    symbol: "🕰️",
    note: "Old story transformed",
    meaning: "One of the most Neville-specific phrases. It places the old state behind you and makes the new state feel present.",
    example: "I remember when I used to doubt love. Now I feel secure and chosen.",
  },
  {
    rank: "08",
    phrase: "I am realizing",
    level: "Medium",
    symbol: "⚠️",
    note: "Transitional awareness",
    meaning: "Useful while moving out of the old story, but not the strongest end-state phrase because it can imply you are still becoming.",
    example: "I am realizing that I have always been worthy of deep love.",
  },
];

const demos = [
  {
    title: "Imaginal Scene Builder",
    icon: "🎬",
    purpose: "Create one short scene that implies the wish is fulfilled.",
    before: "I want to be chosen.",
    after: "I hear her say, 'I choose you. I love being with you.' I feel calm because this is already my reality.",
    micro: ["Keep it short", "Use senses", "Make it after the wish", "Repeat until natural"],
  },
  {
    title: "Old Story → New State",
    icon: "🔁",
    purpose: "Catch a painful assumption and move into the fulfilled identity.",
    before: "She is distant, so maybe I am not enough.",
    after: "I am enough. I am loved. I do not measure my worth by a temporary mood.",
    micro: ["Name the fear", "Do not worship it", "Return to identity", "Act from steadiness"],
  },
  {
    title: "Revision Demonstration",
    icon: "🧠",
    purpose: "Change the emotional charge of an unwanted memory.",
    before: "I replay the moment where I felt rejected.",
    after: "I revise it: I was heard, respected, and chosen. The scene now ends with warmth and certainty.",
    micro: ["Relax", "Replay gently", "Change the ending", "Accept the new feeling"],
  },
  {
    title: "Inner Conversation Shift",
    icon: "💬",
    purpose: "Replace mental arguments with fulfilled dialogue.",
    before: "Why are you doing this to me? Why am I not chosen?",
    after: "I hear her speak lovingly. I respond calmly. The relationship feels settled and mutual.",
    micro: ["Stop arguing inside", "Hear the desired words", "Feel resolved", "Let it be normal"],
  },
];

const practices = [
  {
    title: "Morning State Check",
    time: "3 minutes",
    body: "Ask: 'Who am I being today?' Then choose one identity sentence and feel it as true before reacting to the day.",
  },
  {
    title: "Midday Mental Diet Reset",
    time: "60 seconds",
    body: "When the old story appears, say: 'That is the old state. I return to the fulfilled one.' Then breathe and choose the new sentence.",
  },
  {
    title: "Night SATS Scene",
    time: "5–10 minutes",
    body: "Relax, loop one scene that implies completion, and let it become ordinary before sleep.",
  },
  {
    title: "Revision Before Sleep",
    time: "5 minutes",
    body: "Take one moment from the day that felt off. Replay it as it should have gone. End with relief.",
  },
];

const glossary = [
  ["State", "The inner identity or position you are occupying."],
  ["Assumption", "Something accepted inwardly as true before outer proof appears."],
  ["Naturalness", "The feeling that your desire is normal, not far away or impossible."],
  ["Fulfilled Scene", "A short imaginal moment that would happen after the desire is complete."],
  ["Bridge of Incidents", "The chain of events that may unfold after an assumption is impressed."],
  ["Self-Concept", "The repeated inner belief of who you are in relation to life, love, money, and others."],
  ["Revision", "Re-imagining a past event to change its inner meaning and emotional hold."],
  ["Mental Diet", "Choosing not to keep feeding thoughts that contradict your desired state."],
  ["Gratification", "The settled satisfaction of already having, not hoping to receive."],
  ["Bridge State", "A transitional state that may move you forward but is not the fulfilled end."],
];

function SectionShell({ id, kicker, title, description, children, className = "" }) {
  return (
    <section id={id} className={`scroll-mt-8 mb-8 rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/20 md:p-8 ${className}`}>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-white/40">{kicker}</p>
          <h2 className="mt-2 text-3xl font-black text-white">{title}</h2>
        </div>
        {description && <p className="max-w-xl text-sm leading-6 text-white/55">{description}</p>}
      </div>
      {children}
    </section>
  );
}

function Pill({ children, active = false, onClick }) {
  const Component = onClick ? "button" : "span";
  return (
    <Component
      onClick={onClick}
      className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${
        active ? "border-white/35 bg-white text-slate-950" : "border-white/10 bg-black/20 text-white/65 hover:bg-white/[0.08]"
      }`}
    >
      {children}
    </Component>
  );
}

function InfoBox({ label, children, tone = "white" }) {
  const tones = {
    white: "border-white/10 bg-white/[0.05] text-white/68",
    green: "border-emerald-300/10 bg-emerald-500/10 text-white/78",
    red: "border-red-300/10 bg-red-500/10 text-white/70",
    cyan: "border-cyan-300/10 bg-cyan-500/10 text-white/78",
    violet: "border-violet-300/10 bg-violet-500/10 text-white/72",
    amber: "border-amber-300/15 bg-amber-500/10 text-white/72",
  };

  return (
    <div className={`rounded-2xl border p-4 ${tones[tone] || tones.white}`}>
      <p className="text-xs font-bold uppercase tracking-[0.22em] opacity-60">{label}</p>
      <div className="mt-2 text-sm leading-7">{children}</div>
    </div>
  );
}

function SceneCanvas({ selected }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 p-6 shadow-2xl">
      <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${selected.color} opacity-25 blur-3xl`} />
      <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="relative z-10">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-white/40">Selected Framework</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-white">{selected.title}</h2>
          </div>
          <div className="hidden rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-right sm:block">
            <p className="text-xs text-white/45">Mode</p>
            <p className="font-bold text-white">Practice View</p>
          </div>
        </div>

        <p className="max-w-3xl text-lg leading-8 text-white/72">{selected.explanation}</p>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
            <h4 className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-white/45">How to use it</h4>
            <div className="space-y-3">
              {selected.steps.map((step, index) => (
                <div key={step} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-slate-950">{index + 1}</span>
                  <p className="pt-1 text-sm leading-6 text-white/72">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
            <h4 className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-white/45">Demonstration</h4>
            <div className="rounded-2xl bg-black/25 p-5">
              <p className="text-sm leading-7 text-white/75">{selected.example}</p>
            </div>
            <div className="mt-4 rounded-2xl border border-dashed border-white/20 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/35">Core instruction</p>
              <p className="mt-2 text-lg font-black text-white">Do not stare at lack. Practice being the fulfilled self.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModernParallels() {
  return (
    <SectionShell
      id="key-parallels"
      kicker="Key Parallels"
      title="Modern terms translated into Neville's language"
      description="Connect modern self-development language with Neville's original style so the ideas feel easier to use."
    >
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/20">
        <div className="hidden grid-cols-[1fr_1.2fr_1.6fr_1.1fr] border-b border-white/10 bg-white/[0.05] px-5 py-4 text-xs font-black uppercase tracking-[0.22em] text-white/40 md:grid">
          <span>Modern Term</span>
          <span>Neville's Language</span>
          <span>Description</span>
          <span>Use Case</span>
        </div>
        {keyParallels.map((item) => (
          <div key={item.modern} className="grid gap-3 border-b border-white/10 p-5 last:border-b-0 md:grid-cols-[1fr_1.2fr_1.6fr_1.1fr] md:items-start">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-white/30 md:hidden">Modern Term</p>
              <p className="font-black text-white">{item.modern}</p>
            </div>
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-white/30 md:hidden">Neville's Language</p>
              <p className="text-white/78">"{item.neville}"</p>
            </div>
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-white/30 md:hidden">Description</p>
              <p className="text-sm leading-7 text-white/62">{item.description}</p>
            </div>
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-white/30 md:hidden">Use Case</p>
              <p className="text-sm leading-7 text-white/55">{item.use}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function CorePrinciples() {
  return (
    <SectionShell
      id="inner-state"
      kicker="Core Principle"
      title="Inner state over external images"
      description="Tools, screenshots, and visuals are helpful only when they return the user to the assumed state."
      className="bg-gradient-to-br from-violet-500/15 via-white/[0.06] to-cyan-500/10"
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {corePrinciples.map((principle) => (
          <div key={principle.title} className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
            <h3 className="text-xl font-black text-white">{principle.title}</h3>
            <p className="mt-4 text-sm font-semibold leading-7 text-white/78">{principle.statement}</p>
            <p className="mt-4 text-sm leading-7 text-white/58">{principle.explanation}</p>
            <InfoBox label="Practice Reminder">{principle.reminder}</InfoBox>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function TimeDistortionAnchors() {
  const [activeWord, setActiveWord] = useState("Now");
  const selected = timeAnchors.find((item) => item.word === activeWord) || timeAnchors[1];

  return (
    <SectionShell
      id="time-anchors"
      kicker="Time Distortion"
      title="Words that collapse imagined timelines"
      description="Anxiety often lives in future simulation. Rumination often lives in past replay. These words re-anchor awareness to what exists right now."
      className="bg-gradient-to-br from-blue-500/10 via-white/[0.05] to-violet-500/10"
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {timeAnchors.map((item) => (
            <Pill key={item.word} onClick={() => setActiveWord(item.word)} active={selected.word === item.word}>
              {item.word}
            </Pill>
          ))}
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
          <h3 className="text-4xl font-black text-white">{selected.word}</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <InfoBox label="What it anchors">{selected.anchor}</InfoBox>
            <InfoBox label="Distortion it interrupts" tone="red">{selected.distortion}</InfoBox>
          </div>
          <div className="mt-4">
            <InfoBox label="Neville-style use" tone="green">"{selected.use}"</InfoBox>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function SubconsciousResponseStack() {
  const [active, setActive] = useState("Emotion");
  const selected = subconsciousStack.find((item) => item.element === active) || subconsciousStack[0];

  return (
    <SectionShell
      id="subconscious-stack"
      kicker="Subconscious Response Stack"
      title="What the subconscious responds to strongest"
      description="The subconscious is impressed less by external images and more by the inner combination of feeling, identity, certainty, and vividness."
      className="bg-gradient-to-br from-cyan-500/10 via-white/[0.05] to-violet-500/10"
    >
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/20">
          <div className="hidden grid-cols-[0.9fr_1fr_1.5fr] border-b border-white/10 bg-white/[0.05] px-5 py-4 text-xs font-black uppercase tracking-[0.22em] text-white/40 md:grid">
            <span>Element</span>
            <span>Strength</span>
            <span>Neville Meaning</span>
          </div>
          {subconsciousStack.map((item) => (
            <button
              key={item.element}
              onClick={() => setActive(item.element)}
              className={`grid w-full gap-3 border-b border-white/10 p-5 text-left transition last:border-b-0 md:grid-cols-[0.9fr_1fr_1.5fr] ${selected.element === item.element ? "bg-white/[0.12]" : "hover:bg-white/[0.06]"}`}
            >
              <p className="font-black text-white">{item.element}</p>
              <p className="text-sm font-bold text-white/72">{item.strength}</p>
              <p className="text-sm leading-6 text-white/62">{item.principle}</p>
            </button>
          ))}
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
          <h3 className="text-3xl font-black text-white">{selected.element}</h3>
          <div className="mt-5 space-y-4">
            <InfoBox label="Why it matters">{selected.why}</InfoBox>
            <InfoBox label="Optimized phrasing" tone="green">"{selected.optimized}"</InfoBox>
            <InfoBox label="Avoid" tone="red">{selected.avoid}</InfoBox>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function EmotionalToneDistinction() {
  const [activeTone, setActiveTone] = useState("Gratification");
  const selected = toneDistinctions.find((item) => item.tone === activeTone) || toneDistinctions[3];

  return (
    <SectionShell
      id="tone-vs-state"
      kicker="Key Distinction"
      title="Emotional tone versus state"
      description="Neville points toward the having-state, not the wanting-state. The same emotion can either support the end or secretly keep you waiting."
    >
      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/20">
          <div className="grid grid-cols-2 border-b border-white/10 bg-white/[0.05] px-5 py-4 text-xs font-black uppercase tracking-[0.22em] text-white/40">
            <span>Emotional Tone</span>
            <span>State</span>
          </div>
          {toneDistinctions.map((item) => (
            <button
              key={item.tone}
              onClick={() => setActiveTone(item.tone)}
              className={`grid w-full grid-cols-2 border-b border-white/10 px-5 py-4 text-left transition last:border-b-0 ${selected.tone === item.tone ? "bg-white/[0.12]" : "hover:bg-white/[0.06]"}`}
            >
              <span className={`text-base text-white/78 ${item.tone === "Gratification" ? "font-black text-white" : ""}`}>{item.tone}</span>
              <span className={`text-base text-white/78 ${item.state === "Having" ? "font-black text-white" : ""}`}>{item.state}</span>
            </button>
          ))}
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
          <h3 className="text-3xl font-black text-white">{selected.tone}</h3>
          <div className="mt-5 space-y-4">
            <InfoBox label="What it usually means">{selected.note}</InfoBox>
            <InfoBox label="Neville-aligned shift" tone="green">{selected.shift}</InfoBox>
            <InfoBox label="Core Reminder" tone="violet">The goal is not bigger emotion. The goal is to feel the desire as possessed, natural, and already part of who you are.</InfoBox>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function BridgeStateDetector() {
  const [activeWord, setActiveWord] = useState("Strive");
  const selected = bridgeWarnings.find((item) => item.word === activeWord) || bridgeWarnings[0];

  return (
    <SectionShell
      id="bridge-states"
      kicker="Bridge State Detector"
      title="Strive is not the fulfilled end"
      description="Some words sound productive but secretly carry effort, lack, or becoming. They are usually bridge states, not the final state."
      className="bg-gradient-to-br from-amber-500/10 via-white/[0.05] to-red-500/10"
    >
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-3">
          {bridgeWarnings.map((item) => (
            <button
              key={item.word}
              onClick={() => setActiveWord(item.word)}
              className={`rounded-2xl border p-4 text-left transition ${selected.word === item.word ? "border-amber-200/35 bg-amber-300/10" : "border-white/10 bg-black/20 hover:bg-white/[0.07]"}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-lg font-black text-white">⚠️ {item.word}</span>
                <span className="rounded-full bg-black/25 px-3 py-1 text-xs text-white/45">{item.warning}</span>
              </div>
              <p className="mt-2 text-sm text-white/55">{item.energy}</p>
            </button>
          ))}
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
          <h3 className="text-3xl font-black text-white">{selected.word}</h3>
          <p className="mt-2 text-sm text-white/55">{selected.energy}</p>
          <div className="mt-5">
            <InfoBox label="Carries the energy of" tone="red">
              <div className="flex flex-wrap gap-2">
                {selected.signals.map((signal) => <span key={signal} className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-sm text-white/70">{signal}</span>)}
              </div>
            </InfoBox>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <InfoBox label="Why it matters">{selected.why}</InfoBox>
            <InfoBox label="Fulfilled-state shift" tone="green">{selected.shift}</InfoBox>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function StateBlockersSection() {
  const [activeId, setActiveId] = useState("straining");
  const selected = stateBlockers.find((item) => item.id === activeId) || stateBlockers[4];

  return (
    <SectionShell
      id="state-blockers"
      kicker="State Blockers"
      title="What pulls you out of the fulfilled state"
      description="These are not failures. They are patterns that reveal where the old state is still active."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-3">
          {stateBlockers.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`rounded-2xl border p-4 text-left transition ${selected.id === item.id ? "border-white/35 bg-white/[0.12]" : "border-white/10 bg-black/20 hover:bg-white/[0.08]"}`}
            >
              <p className="text-lg font-black text-white">{item.title}</p>
              <p className="mt-1 text-sm text-white/50">{item.subtitle}</p>
            </button>
          ))}
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
          <h3 className="text-3xl font-black text-white">{selected.title}</h3>
          <p className="mt-2 text-sm leading-7 text-white/65">{selected.definition}</p>
          <div className="mt-5 space-y-4">
            <InfoBox label="How it sounds">
              <div className="flex flex-wrap gap-2">
                {selected.soundsLike.map((line) => <span key={line} className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-sm text-white/70">{line}</span>)}
              </div>
            </InfoBox>
            <InfoBox label="Why it matters" tone="red">{selected.why}</InfoBox>
            <InfoBox label="Neville shift" tone="green">{selected.shift}</InfoBox>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function WordVerdictMapper() {
  const [activeWord, setActiveWord] = useState("Expect");
  const selected = wordVerdicts.find((item) => item.word === activeWord) || wordVerdicts[0];

  return (
    <SectionShell
      id="word-verdicts"
      kicker="Clean Mapping"
      title="Words that keep you waiting vs words that close the loop"
      description="Why use a word that tempts the mind back into waiting? This table separates future-leaning language from present assumption."
      className="bg-gradient-to-br from-white/[0.08] via-cyan-500/10 to-violet-500/10"
    >
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/20">
          <div className="grid grid-cols-[1fr_1fr_1.2fr] border-b border-white/10 bg-white/[0.05] px-5 py-4 text-xs font-black uppercase tracking-[0.22em] text-white/40">
            <span>Word</span>
            <span>Verdict</span>
            <span>Why</span>
          </div>
          {wordVerdicts.map((item) => (
            <button
              key={item.word}
              onClick={() => setActiveWord(item.word)}
              className={`grid w-full grid-cols-[1fr_1fr_1.2fr] gap-3 border-b border-white/10 px-5 py-4 text-left transition last:border-b-0 ${selected.word === item.word ? "bg-white/[0.12]" : "hover:bg-white/[0.06]"}`}
            >
              <span className="font-black text-white">{item.word}</span>
              <span className="text-white/78">{item.symbol} {item.verdict}</span>
              <span className="text-sm leading-6 text-white/60">{item.why}</span>
            </button>
          ))}
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
          <h3 className="text-3xl font-black text-white">{selected.word}</h3>
          <div className="mt-5 space-y-4">
            <InfoBox label="Verdict">{selected.explanation}</InfoBox>
            <InfoBox label="Instead of" tone="red">"{selected.from}"</InfoBox>
            <InfoBox label="Neville-style rewrite" tone="green">"{selected.to}"</InfoBox>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function AgreeingConsentSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  const active = agreementLadder[activeIndex];

  const activeText = {
    Arguing: "The mind is still debating, resisting, or asking whether the desire is allowed.",
    Agreeing: "The mind stops fighting the desire. This is the first clean yes.",
    Accepting: "The desire begins to feel like a present fact instead of a future request.",
    Knowing: "The inner state becomes calmer, steadier, and less dependent on proof.",
    Having: "The end state feels possessed, natural, and no longer separate from who you are.",
  };

  return (
    <SectionShell
      id="agreeing"
      kicker="Agreement Phase"
      title="Agreeing is inner consent"
      description="In Neville language, agreeing is the moment you stop arguing with the desire. It is not full conviction yet — it is alignment."
      className="bg-gradient-to-br from-violet-500/12 via-white/[0.05] to-fuchsia-500/10"
    >
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/35">Agreement Ladder</p>
          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
            {agreementLadder.map((step, index) => (
              <React.Fragment key={step}>
                <Pill onClick={() => setActiveIndex(index)} active={activeIndex === index}>{step}</Pill>
                {index < agreementLadder.length - 1 && <span className="hidden text-white/25 md:block">→</span>}
              </React.Fragment>
            ))}
          </div>
          <div className="mt-5">
            <InfoBox label="Mental sentence" tone="green">"Yes, this is mine to experience."</InfoBox>
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
          <h3 className="text-3xl font-black text-white">{active}</h3>
          <p className="mt-3 text-sm leading-7 text-white/62">{activeText[active]}</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {agreementPrinciples.map((item) => (
              <InfoBox key={item.title} label={item.title}>{item.body}</InfoBox>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function CopyTextButton({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      onClick={copy}
      className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-black text-white/60 transition hover:bg-white/[0.1] hover:text-white"
    >
      {copied ? "Copied" : label}
    </button>
  );
}

function PhraseAnalyzer() {
  const [phrase, setPhrase] = useState("I am chosen in love");
  const [pronounId, setPronounId] = useState("neutral");
  const [mode, setMode] = useState("native");
  const [saved, setSaved] = useState(() => readSavedPhrases());

  const pronoun = PRONOUN_PRESETS.find((p) => p.id === pronounId) || PRONOUN_PRESETS[0];
  const starters = useMemo(() => starterPhrasesFor(pronoun), [pronoun]);
  const banks = useMemo(() => phraseBanksFor(pronoun), [pronoun]);

  const analysis = useMemo(() => {
    const cleaned = normalizePhrase(phrase);
    return {
      ...getPhraseAnalysis(cleaned),
      cleaned,
      category: detectCategory(cleaned),
      tense: checkPresentTense(cleaned),
      passive: checkPassiveVoice(cleaned),
      misalign: detectMisalignment(cleaned),
      native: nativeSuggestion(cleaned, mode),
      identityScore: identityScore(cleaned),
    };
  }, [phrase, mode]);

  const checks = [
    { label: "Identity",   active: analysis.hasIdentity,  good: "Starts from I AM",     bad: "Not identity-based yet" },
    { label: "Ownership",  active: analysis.hasOwnership, good: "Uses possession",      bad: "No direct ownership" },
    { label: "Certainty",  active: analysis.hasKnowing,   good: "Carries knowing",      bad: "Could use more certainty" },
    { label: "Now",        active: analysis.hasNow,       good: "Anchored now",         bad: "Could anchor in now" },
    { label: "Future leak",active: analysis.hasFuture,    good: "Future language detected", bad: "No obvious future leak" },
  ];

  const statusStyles = {
    Good:  "border-emerald-300/25 bg-emerald-400/15 text-emerald-100",
    Okay:  "border-sky-300/25 bg-sky-400/15 text-sky-100",
    Watch: "border-amber-300/25 bg-amber-400/15 text-amber-100",
  };

  const savePhrase = () => {
    const text = analysis.native;
    if (!text || saved.some((s) => s.text === text)) return;
    const next = [{ text, savedAt: Date.now() }, ...saved].slice(0, 12);
    setSaved(next);
    writeSavedPhrases(next);
  };

  const removeSaved = (text) => {
    const next = saved.filter((s) => s.text !== text);
    setSaved(next);
    writeSavedPhrases(next);
  };

  return (
    <SectionShell
      id="phrase-analyzer"
      kicker="Self-Concept Language Studio"
      title="Turn messy inner wording into clean identity language"
      description="Type a phrase. The studio checks present tense, passive voice, identity strength, and rewrites desire into 'I am' language."
      className="bg-gradient-to-br from-emerald-500/10 via-white/[0.05] to-cyan-500/10"
    >
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">Pronoun presets</span>
        <div className="flex flex-wrap gap-1 rounded-full border border-white/10 bg-white/5 p-1">
          {PRONOUN_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => setPronounId(p.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                pronounId === p.id ? "bg-white text-slate-950" : "text-white/55 hover:text-white"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
          <label className="text-xs font-bold uppercase tracking-[0.25em] text-white/35">Your phrase</label>
          <textarea
            value={phrase}
            onChange={(event) => setPhrase(event.target.value)}
            className="mt-3 min-h-32 w-full rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm leading-7 text-white outline-none placeholder:text-white/30 focus:border-white/30"
            placeholder="Example: I am chosen in love"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {starters.map((sample) => (
              <button
                key={sample}
                onClick={() => setPhrase(sample)}
                className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs font-bold text-white/55 transition hover:bg-white/[0.08] hover:text-white"
              >
                {sample}
              </button>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">Rewrite mode</span>
            <div className="flex flex-wrap gap-1 rounded-full border border-white/10 bg-white/5 p-1">
              {ANALYZER_MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  title={m.hint}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                    mode === m.id ? "bg-white text-slate-950" : "text-white/55 hover:text-white"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">Native-sounding version</p>
                <p className="mt-2 text-lg font-black leading-snug text-white">{analysis.native}</p>
              </div>
              <div className="flex gap-2">
                <CopyTextButton text={analysis.native} />
                <button
                  onClick={savePhrase}
                  className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-black text-white/60 transition hover:bg-white/[0.1] hover:text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          {saved.length > 0 && (
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/45">Saved phrases ({saved.length})</p>
              <ul className="mt-2 space-y-2">
                {saved.map((s) => (
                  <li key={s.text} className="flex items-start justify-between gap-3 text-sm text-white/80">
                    <span className="leading-6">{s.text}</span>
                    <button
                      onClick={() => removeSaved(s.text)}
                      className="rounded-md px-2 py-1 text-xs text-white/35 transition hover:text-white"
                      aria-label="Remove saved phrase"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/35">Verdict · {analysis.category}</p>
              <h3 className="mt-2 text-3xl font-black text-white">{analysis.verdict}</h3>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-right">
              <p className="text-xs text-white/40">Identity</p>
              <p className="text-xl font-black text-white">{analysis.identityScore}/100</p>
            </div>
          </div>

          <div className="mb-4 h-3 overflow-hidden rounded-full bg-black/30">
            <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 transition-all" style={{ width: `${analysis.identityScore}%` }} />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {[analysis.tense, analysis.passive].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-black text-white">{item.label}</p>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${statusStyles[item.status]}`}>{item.status}</span>
                </div>
                <p className="mt-2 text-xs leading-5 text-white/65">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <InfoBox label="Power level" tone="cyan">{analysis.power}</InfoBox>
            <InfoBox label="End-state rewrite" tone="green">
              <div className="flex items-start justify-between gap-3">
                <span>"{analysis.rewrite}"</span>
                <CopyTextButton text={analysis.rewrite} />
              </div>
            </InfoBox>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {checks.map((check) => (
              <div key={check.label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/35">{check.label}</p>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  {check.active ? check.good : check.bad}
                </p>
              </div>
            ))}
          </div>

          {(analysis.misalign.length > 0 || analysis.hits.length > 0) && (
            <div className="mt-4">
              <InfoBox label="Misalignment notes" tone="red">
                <div className="space-y-3">
                  {analysis.misalign.map((note, i) => (
                    <p key={`m-${i}`} className="text-white/70">{note}</p>
                  ))}
                  {analysis.hits.map((hit) => (
                    <div key={hit.label}>
                      <p className="font-black text-white">{hit.label}: {hit.issue}</p>
                      <p className="text-white/65">{hit.shift}</p>
                    </div>
                  ))}
                </div>
              </InfoBox>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {banks.map((card) => (
          <article key={card.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-lg font-black text-white">{card.title}</h4>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-100">{card.tag}</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-white/50">{card.desc}</p>
            <div className="mt-4 space-y-2">
              {card.examples.map((example) => (
                <div key={example} className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-black/25 p-3">
                  <button
                    onClick={() => setPhrase(example.replace(/\.$/, ""))}
                    className="min-w-0 flex-1 text-left text-sm font-semibold leading-6 text-white/85 transition hover:text-white"
                  >
                    {example}
                  </button>
                  <CopyTextButton text={example} />
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-white/10">
        <div className="grid grid-cols-2 border-b border-white/10 bg-white/5 text-xs font-black uppercase tracking-[0.2em] text-white/45">
          <div className="p-3">From wanting</div>
          <div className="border-l border-white/10 p-3">To being</div>
        </div>
        {TRANSFORMATIONS.map((row) => (
          <div key={row.before} className="grid grid-cols-1 border-b border-white/10 last:border-b-0 sm:grid-cols-2">
            <div className="bg-slate-950/50 p-3">
              <p className="text-sm font-bold text-white/75">{row.before}</p>
              <p className="mt-1 text-[11px] leading-4 text-white/40">{row.note}</p>
            </div>
            <div className="flex items-start justify-between gap-3 border-white/10 bg-cyan-300/5 p-3 sm:border-l">
              <button
                onClick={() => setPhrase(row.after.replace(/\.$/, ""))}
                className="text-left text-sm font-black text-white transition hover:text-cyan-100"
              >
                {row.after}
              </button>
              <CopyTextButton text={row.after} />
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function StateBuilder() {
  const [form, setForm] = useState({
    desire: "",
    oldStory: "",
    identity: "I am chosen, loved, secure, and fulfilled.",
    sats: "",
    revision: "",
    mentalDiet: "That is the old state. I return to the fulfilled one.",
  });
  const [saved, setSaved] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(window.localStorage.getItem("neville-state-builder") || "[]");
    } catch {
      return [];
    }
  });

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const generated = {
    assumption: form.identity || "I am already the person for whom this is natural and done.",
    sats:
      form.sats ||
      `I experience a short scene after ${form.desire || "my desire"} is fulfilled, and I feel it as normal, warm, and already mine.`,
    revision:
      form.revision ||
      `I remember when ${form.oldStory || "the old story"} felt real. Now it is behind me, and I live from the fulfilled state.`,
    mentalDiet: form.mentalDiet || "That is the old state. I return to the fulfilled one.",
  };

  const saveEntry = () => {
    const entry = { id: Date.now(), created: new Date().toLocaleString(), form, generated };
    const next = [entry, ...saved].slice(0, 5);
    setSaved(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("neville-state-builder", JSON.stringify(next));
    }
  };

  const clearSaved = () => {
    setSaved([]);
    if (typeof window !== "undefined") window.localStorage.removeItem("neville-state-builder");
  };

  const fields = [
    { key: "desire", label: "Desire", placeholder: "Example: a loving relationship with my woman" },
    { key: "oldStory", label: "Old story", placeholder: "Example: I used to think I was not chosen" },
    { key: "identity", label: "New I AM identity", placeholder: "Example: I am her man. I am chosen in love." },
    { key: "sats", label: "SATS scene", placeholder: "Example: I hear her say she loves being with me" },
    { key: "revision", label: "Revision scene", placeholder: "Example: I revise the old moment as loving and secure" },
    { key: "mentalDiet", label: "Mental diet sentence", placeholder: "Example: I return to being loved, chosen, and secure" },
  ];

  return (
    <SectionShell
      id="state-builder"
      kicker="Tool Mode"
      title="Personal State Builder"
      description="Turn a desire, old story, identity, SATS scene, revision, and mental diet into one clean Neville practice card."
      className="bg-gradient-to-br from-fuchsia-500/10 via-white/[0.05] to-violet-500/10"
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map((field) => (
              <label key={field.key} className={field.key === "sats" || field.key === "revision" || field.key === "mentalDiet" ? "md:col-span-2" : ""}>
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/35">{field.label}</span>
                <textarea
                  value={form[field.key]}
                  onChange={(event) => updateField(field.key, event.target.value)}
                  placeholder={field.placeholder}
                  className="mt-2 min-h-24 w-full rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm leading-7 text-white outline-none placeholder:text-white/25 focus:border-white/30"
                />
              </label>
            ))}
          </div>
          <button onClick={saveEntry} className="mt-5 w-full rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:scale-[1.01]">
            Save practice card
          </button>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/35">Generated Practice</p>
              <h3 className="mt-2 text-3xl font-black text-white">Your fulfilled-state card</h3>
            </div>
            <CopyTextButton
              label="Copy card"
              text={`Assumption: ${generated.assumption}\nSATS: ${generated.sats}\nRevision: ${generated.revision}\nMental diet: ${generated.mentalDiet}`}
            />
          </div>
          <div className="space-y-4">
            <InfoBox label="Assumption" tone="green">{generated.assumption}</InfoBox>
            <InfoBox label="SATS scene" tone="cyan">{generated.sats}</InfoBox>
            <InfoBox label="Revision" tone="violet">{generated.revision}</InfoBox>
            <InfoBox label="Mental diet" tone="amber">{generated.mentalDiet}</InfoBox>
          </div>

          {saved.length > 0 && (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/35">Saved locally</p>
                <button onClick={clearSaved} className="text-xs font-bold text-white/40 hover:text-white">Clear</button>
              </div>
              <div className="space-y-3">
                {saved.map((entry) => (
                  <div key={entry.id} className="rounded-xl border border-white/10 bg-black/20 p-3">
                    <p className="text-xs text-white/35">{entry.created}</p>
                    <p className="mt-1 text-sm font-bold text-white/75">{entry.generated.assumption}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </SectionShell>
  );
}

function SimpleFormula() {
  const [activeStep, setActiveStep] = useState("1");
  const selected = simpleFormula.find((item) => item.step === activeStep) || simpleFormula[0];

  return (
    <SectionShell
      id="simple-formula"
      kicker="Practice"
      title="Simple formula"
      description="The quick Neville flow: imagine the end, feel it real, rest from forcing, and receive from the assumed state."
      className="bg-slate-950/70"
    >
      <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr] lg:items-stretch">
        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {simpleFormula.map((item, index) => (
              <React.Fragment key={item.step}>
                <button
                  onClick={() => setActiveStep(item.step)}
                  className={`group flex items-center gap-3 rounded-2xl border px-4 py-4 text-left transition ${selected.step === item.step ? "border-white/35 bg-white/[0.14] shadow-xl" : "border-white/10 bg-black/20 hover:bg-white/[0.08]"}`}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-lg font-black text-slate-950 shadow-lg">{item.step}</span>
                  <span>
                    <span className="block text-xl font-black text-white">{item.title}</span>
                    <span className="mt-1 block text-xs text-white/45">{item.subtitle}</span>
                  </span>
                </button>
                {index < simpleFormula.length - 1 && <span className="hidden text-3xl font-light text-white/30 md:block">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/[0.1] to-white/[0.03] p-5">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl font-black text-slate-950">{selected.step}</span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/35">Current Step</p>
              <h3 className="text-2xl font-black text-white">{selected.title}</h3>
            </div>
          </div>
          <p className="text-sm leading-7 text-white/68">{selected.detail}</p>
          <div className="mt-5">
            <InfoBox label="Ask Yourself" tone="cyan">{selected.prompt}</InfoBox>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function PowerLadder() {
  const [selectedRank, setSelectedRank] = useState("01");
  const selected = powerLadder.find((item) => item.rank === selectedRank) || powerLadder[0];

  return (
    <SectionShell
      id="power-ladder"
      kicker="Power Ladder"
      title="Where phrases fit in the assumption ladder"
      description="Use this as a practice guide, not a rigid law. The strongest phrase is the one you can actually occupy with naturalness."
    >
      <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/20">
          <div className="grid grid-cols-[0.55fr_1fr_1.15fr_1.25fr] border-b border-white/10 bg-white/[0.05] px-4 py-3 text-xs font-black uppercase tracking-[0.22em] text-white/40">
            <span>Rank</span>
            <span>Phrase</span>
            <span>Power Level</span>
            <span>Notes</span>
          </div>
          {powerLadder.map((item) => (
            <button
              key={item.rank}
              onClick={() => setSelectedRank(item.rank)}
              className={`grid w-full grid-cols-[0.55fr_1fr_1.15fr_1.25fr] items-center gap-3 border-b border-white/10 px-4 py-4 text-left transition last:border-b-0 ${selected.rank === item.rank ? "bg-white/[0.12]" : "hover:bg-white/[0.06]"}`}
            >
              <span className="text-sm font-black text-white/40">{item.rank}</span>
              <span className="text-base font-black text-white md:text-lg">{item.phrase}</span>
              <span className="text-sm text-white/75 md:text-base"><span className="mr-2">{item.symbol}</span>{item.level}</span>
              <span className="text-sm leading-5 text-white/58 md:text-base">{item.note}</span>
            </button>
          ))}
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/35">Selected Phrase</p>
              <h3 className="mt-2 text-3xl font-black text-white">{selected.phrase}</h3>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl">{selected.symbol}</div>
          </div>
          <div className="space-y-4">
            <InfoBox label="Meaning">{selected.meaning}</InfoBox>
            <InfoBox label="Example" tone="green">{selected.example}</InfoBox>
            <InfoBox label="Neville Note" tone="violet">The goal is not to collect perfect words. The goal is to let the phrase move you into the fulfilled state.</InfoBox>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function DemoCard({ demo }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 transition hover:-translate-y-1 hover:bg-white/[0.09]">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl">{demo.icon}</span>
        <div>
          <h3 className="font-black text-white">{demo.title}</h3>
          <p className="text-sm text-white/50">{demo.purpose}</p>
        </div>
      </div>
      <div className="grid gap-3">
        <InfoBox label="Before" tone="red">{demo.before}</InfoBox>
        <InfoBox label="After" tone="green">{demo.after}</InfoBox>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {demo.micro.map((item) => <span key={item} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/55">{item}</span>)}
      </div>
    </div>
  );
}

function PracticeTimeline() {
  return (
    <SectionShell
      id="daily-practice"
      kicker="Daily Practice"
      title="A simple Neville routine"
      description="Built for consistency, not obsession. The point is to return to the state, not force yourself into performance mode."
    >
      <div className="grid gap-4 md:grid-cols-4">
        {practices.map((practice, index) => (
          <div key={practice.title} className="rounded-3xl border border-white/10 bg-black/20 p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-black text-slate-950">{index + 1}</span>
              <span className="rounded-full bg-white/[0.08] px-3 py-1 text-xs text-white/50">{practice.time}</span>
            </div>
            <h3 className="font-black text-white">{practice.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/58">{practice.body}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function Glossary() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const clean = query.toLowerCase().trim();
    if (!clean) return glossary;
    return glossary.filter(([term, definition]) => `${term} ${definition}`.toLowerCase().includes(clean));
  }, [query]);

  return (
    <SectionShell id="glossary" kicker="Glossary" title="Neville terms, translated plainly" description="Search the language of the frontend and keep the meanings grounded.">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search terms..."
        className="mb-5 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/30 md:max-w-md"
      />
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
        {filtered.map(([term, definition]) => (
          <div key={term} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
            <h3 className="font-black text-white">{term}</h3>
            <p className="mt-2 text-sm leading-6 text-white/58">{definition}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function FrameworkPage({ frameworkId }) {
  const selected = frameworks.find((item) => item.id === frameworkId) || frameworks[0];
  return <SceneCanvas selected={selected} />;
}

function DemosSection() {
  return (
    <section className="mb-8">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-white/40">Demonstrations</p>
          <h2 className="mt-2 text-3xl font-black text-white">Before and after inner-state examples</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-white/55">Each demo shows the shift from wanting, fearing, or replaying lack into a clean fulfilled-state practice.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {demos.map((demo) => <DemoCard key={demo.title} demo={demo} />)}
      </div>
    </section>
  );
}

const SECTIONS = [
  { id: "living-end", label: "Living in the End", kicker: "Framework", group: "Frameworks", short: "Assume the wish fulfilled and let your inner state match the reality already accepted within." },
  { id: "sats", label: "SATS", kicker: "Framework", group: "Frameworks", short: "State Akin To Sleep — the drowsy threshold for impressing the subconscious." },
  { id: "feeling-secret", label: "Feeling Is the Secret", kicker: "Framework", group: "Frameworks", short: "The feeling of reality gives an assumption its power." },
  { id: "revision", label: "Revision", kicker: "Framework", group: "Frameworks", short: "Rewrite the meaning of a past event so it no longer controls your present state." },
  { id: "mental-diet", label: "Mental Diet", kicker: "Framework", group: "Frameworks", short: "Stop feeding thoughts that contradict the identity you are choosing." },
  { id: "inner-conversation", label: "Inner Conversations", kicker: "Framework", group: "Frameworks", short: "Your repeated inner conversations reveal the state you are occupying." },
  { id: "wish-fulfilled", label: "The Wish Fulfilled", kicker: "Framework", group: "Frameworks", short: "The end is the feeling of the wish already fulfilled — the satisfied state, not the getting." },
  { id: "certainty", label: "Certainty", kicker: "Framework", group: "Frameworks", short: "Faith is loyalty to unseen reality — assuming with the certainty you give a known fact." },
  { id: "persistence", label: "Persistence", kicker: "Framework", group: "Frameworks", short: "An assumption, though false to the senses, hardens into fact if you persist in it." },
  { id: "knowing-being", label: "Knowing by Being", kicker: "Framework", group: "Frameworks", short: "You know a state only by entering and being it — being precedes evidence." },

  { id: "key-parallels", label: "Key Parallels", kicker: "Map", group: "Maps & Distinctions", short: "Modern self-development language translated into Neville's vocabulary." },
  { id: "inner-state", label: "Inner State", kicker: "Principle", group: "Maps & Distinctions", short: "Inner state over external images — the core principle behind every framework." },
  { id: "tone-vs-state", label: "Tone vs State", kicker: "Distinction", group: "Maps & Distinctions", short: "How the same emotion can either support the end or secretly keep you waiting." },
  { id: "state-blockers", label: "State Blockers", kicker: "Diagnostic", group: "Maps & Distinctions", short: "The patterns that pull you out of the fulfilled state — and how to spot them." },
  { id: "agreeing", label: "Agreeing", kicker: "Principle", group: "Maps & Distinctions", short: "Why what you agree with becomes the state you occupy." },
  { id: "simple-formula", label: "Simple Formula", kicker: "Method", group: "Maps & Distinctions", short: "A clean step-by-step formula for applying Neville's work." },
  { id: "power-ladder", label: "Power Ladder", kicker: "Method", group: "Maps & Distinctions", short: "A ladder from wishing to fulfilled certainty." },

  { id: "time-anchors", label: "Time Anchors", kicker: "Tool", group: "Tools", short: "Words that collapse imagined timelines back to present-state ownership." },
  { id: "subconscious-stack", label: "Subconscious Stack", kicker: "Tool", group: "Tools", short: "What the subconscious responds to strongest — and how to optimize for it." },
  { id: "bridge-states", label: "Bridge States", kicker: "Detector", group: "Tools", short: "Spot the words that sound productive but secretly carry effort or lack." },
  { id: "word-verdicts", label: "Word Verdicts", kicker: "Tool", group: "Tools", short: "A verdict-by-verdict map of which words help, hurt, or stay neutral." },
  { id: "phrase-analyzer", label: "Phrase Analyzer", kicker: "Interactive", group: "Tools", short: "Test any phrase against identity, ownership, and certainty checks." },
  { id: "state-builder", label: "State Builder", kicker: "Interactive", group: "Tools", short: "Build a complete fulfilled-state plan: identity, scene, revision, and mental diet." },

  { id: "demos", label: "Demonstrations", kicker: "Study", group: "Study", short: "Before-and-after examples showing the shift into fulfilled-state practice." },
  { id: "practice", label: "Practice Timeline", kicker: "Study", group: "Study", short: "A simple, consistent daily Neville routine." },
  { id: "glossary", label: "Glossary", kicker: "Study", group: "Study", short: "Searchable glossary of Neville's terms, translated plainly." },
];

const SECTION_GROUPS = ["Frameworks", "Maps & Distinctions", "Tools", "Study"];

function renderSection(id) {
  switch (id) {
    case "living-end":
    case "sats":
    case "feeling-secret":
    case "revision":
    case "mental-diet":
    case "inner-conversation":
    case "wish-fulfilled":
    case "certainty":
    case "persistence":
    case "knowing-being":
      return <FrameworkPage frameworkId={id} />;
    case "key-parallels": return <ModernParallels />;
    case "inner-state": return <CorePrinciples />;
    case "tone-vs-state": return <EmotionalToneDistinction />;
    case "state-blockers": return <StateBlockersSection />;
    case "agreeing": return <AgreeingConsentSection />;
    case "simple-formula": return <SimpleFormula />;
    case "power-ladder": return <PowerLadder />;
    case "time-anchors": return <TimeDistortionAnchors />;
    case "subconscious-stack": return <SubconsciousResponseStack />;
    case "bridge-states": return <BridgeStateDetector />;
    case "word-verdicts": return <WordVerdictMapper />;
    case "phrase-analyzer": return <PhraseAnalyzer />;
    case "state-builder": return <StateBuilder />;
    case "demos": return <DemosSection />;
    case "practice": return <PracticeTimeline />;
    case "glossary": return <Glossary />;
    default: return null;
  }
}

function NavDropdown({ items, onSelect, currentId }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };
    const handleKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.08] px-4 py-2 text-sm font-bold text-white backdrop-blur transition hover:bg-white/[0.14]"
      >
        <span>Browse concepts</span>
        <span className={`text-xs transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 max-h-96 w-80 overflow-y-auto rounded-2xl border border-white/15 bg-[#0b0d18]/95 p-2 shadow-2xl shadow-black/60 backdrop-blur"
        >
          {SECTION_GROUPS.map((group) => {
            const groupItems = items.filter((item) => item.group === group);
            if (!groupItems.length) return null;
            return (
              <div key={group} className="mb-2 last:mb-0">
                <p className="px-3 pb-1 pt-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/35">{group}</p>
                {groupItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      onSelect(item);
                      setOpen(false);
                    }}
                    className={`block w-full rounded-xl px-3 py-2 text-left text-sm font-semibold transition hover:bg-white/[0.08] hover:text-white ${
                      currentId === item.id ? "bg-white/[0.1] text-white" : "text-white/75"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SectionCard({ section, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(section.id)}
      className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.06] p-5 text-left transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.09]"
    >
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-white/40">{section.kicker}</p>
      <h3 className="text-xl font-black text-white">{section.label}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-white/65">{section.short}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-white/70 transition group-hover:text-white">
        Open <span aria-hidden>→</span>
      </span>
    </button>
  );
}

export default function NevilleGoddardPortal({ onBack, onNavigate, initialSection }) {
  const currentSection = initialSection ? SECTIONS.find((s) => s.id === initialSection) : null;
  const currentIndex = currentSection ? SECTIONS.findIndex((s) => s.id === currentSection.id) : -1;
  const prevSection = currentIndex > 0 ? SECTIONS[currentIndex - 1] : null;
  const nextSection = currentIndex >= 0 && currentIndex < SECTIONS.length - 1 ? SECTIONS[currentIndex + 1] : null;

  const goToSection = (id) => {
    if (onNavigate) onNavigate("neville", { section: id });
  };

  const goToOverview = () => {
    if (onNavigate) onNavigate("neville");
  };

  return (
    <div className="min-h-screen bg-[#070713] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[32rem] w-[32rem] rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute right-[-12%] top-[18%] h-[30rem] w-[30rem] rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[20%] h-[28rem] w-[28rem] rounded-full bg-rose-500/10 blur-3xl" />
      </div>

      {onBack && (
        <button
          onClick={onBack}
          className="fixed left-4 top-4 z-50 rounded-2xl border border-white/15 bg-white/[0.08] px-4 py-2 text-sm font-bold text-white backdrop-blur transition hover:bg-white/[0.14]"
        >
          ← Back
        </button>
      )}

      <main className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <header className="mb-8 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur md:p-10">
          <nav className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <button
              type="button"
              onClick={goToOverview}
              className="flex items-center gap-3 text-left"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl">✦</div>
              <div>
                <p className="text-sm font-black tracking-wide text-white">Neville Goddard Portal</p>
                <p className="text-xs text-white/45">Frameworks • Tools • Inner Practice</p>
              </div>
            </button>
            <NavDropdown items={SECTIONS} onSelect={(item) => goToSection(item.id)} currentId={currentSection?.id} />
          </nav>

          {currentSection ? (
            <div>
              <button
                type="button"
                onClick={goToOverview}
                className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-white/45 transition hover:text-white"
              >
                <span aria-hidden>←</span> All concepts
              </button>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.45em] text-violet-200/60">{currentSection.group} · {currentSection.kicker}</p>
              <h1 className="text-4xl font-black leading-[0.98] tracking-[-0.045em] text-white md:text-6xl">{currentSection.label}</h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-white/65 md:text-lg md:leading-8">{currentSection.short}</p>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="mb-4 text-xs font-black uppercase tracking-[0.45em] text-violet-200/60">Imagination Creates Reality</p>
                <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.05em] text-white md:text-7xl">
                  A visual operating system for Neville's work.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
                  Each concept is its own focused page. Pick a framework to study, a tool to practice with, or a map that translates Neville's language into something usable.
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-black/25 p-5">
                <div className="rounded-[1.5rem] bg-gradient-to-br from-white/14 to-white/[0.03] p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">Core Map</p>
                    <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-100/80">Active</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      ["Assume", "Choose the fulfilled identity."],
                      ["Feel", "Let it feel real and natural."],
                      ["Become", "Move as the person who has it."],
                      ["Persist", "Return when the old story appears."],
                    ].map(([word, desc], index) => (
                      <div key={word} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-sm font-black text-slate-950">{index + 1}</div>
                        <div>
                          <p className="font-black text-white">{word}</p>
                          <p className="text-sm text-white/45">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </header>

        {currentSection ? (
          <>
            <div className="mb-8">{renderSection(currentSection.id)}</div>

            <nav className="grid gap-3 md:grid-cols-2">
              {prevSection ? (
                <button
                  type="button"
                  onClick={() => goToSection(prevSection.id)}
                  className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 text-left transition hover:border-white/25 hover:bg-white/[0.09]"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/40">← Previous</p>
                  <p className="mt-2 text-lg font-black text-white">{prevSection.label}</p>
                </button>
              ) : <div />}
              {nextSection ? (
                <button
                  type="button"
                  onClick={() => goToSection(nextSection.id)}
                  className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 text-right transition hover:border-white/25 hover:bg-white/[0.09]"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/40">Next →</p>
                  <p className="mt-2 text-lg font-black text-white">{nextSection.label}</p>
                </button>
              ) : <div />}
            </nav>
          </>
        ) : (
          <>
            {SECTION_GROUPS.map((group) => {
              const groupSections = SECTIONS.filter((s) => s.group === group);
              if (!groupSections.length) return null;
              return (
                <section key={group} className="mb-10">
                  <div className="mb-5 flex items-baseline justify-between">
                    <h2 className="text-2xl font-black text-white">{group}</h2>
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/35">{groupSections.length} {groupSections.length === 1 ? "concept" : "concepts"}</p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {groupSections.map((section) => (
                      <SectionCard key={section.id} section={section} onSelect={goToSection} />
                    ))}
                  </div>
                </section>
              );
            })}

            <section className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 lg:col-span-2">
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-white/40">Study Notes</p>
                <h2 className="mt-2 text-3xl font-black text-white">How to read Neville without getting lost</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <div className="rounded-3xl bg-black/20 p-5">
                    <h3 className="font-black text-white">1. State over sentence</h3>
                    <p className="mt-2 text-sm leading-6 text-white/58">The words matter, but the state behind the words matters more. A sentence is a doorway, not the whole house.</p>
                  </div>
                  <div className="rounded-3xl bg-black/20 p-5">
                    <h3 className="font-black text-white">2. Natural over desperate</h3>
                    <p className="mt-2 text-sm leading-6 text-white/58">A fulfilled state usually feels calm, steady, and ordinary. Desperation is often the old story wearing a costume.</p>
                  </div>
                  <div className="rounded-3xl bg-black/20 p-5">
                    <h3 className="font-black text-white">3. Persist over force</h3>
                    <p className="mt-2 text-sm leading-6 text-white/58">Persistence means returning to the chosen state. It does not mean obsessing, spiraling, or micromanaging the outer world.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-500/20 to-cyan-500/10 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-white/45">Start Here</p>
                <h2 className="mt-2 text-2xl font-black text-white">New to Neville?</h2>
                <p className="mt-4 text-sm leading-7 text-white/65">
                  Begin with <strong className="text-white">Living in the End</strong> — the central framework — then move into <strong className="text-white">Feeling Is the Secret</strong> and <strong className="text-white">SATS</strong> to practice it.
                </p>
                <button
                  onClick={() => goToSection("living-end")}
                  className="mt-6 w-full rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:scale-[1.02]"
                >
                  Open Living in the End
                </button>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
