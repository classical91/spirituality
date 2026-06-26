// Raw numerology data extracted from the former NumerologyPortal.jsx, kept
// as plain data so sacredSystemsCards.js can build Sacred Systems Library
// cards from it.

export const NUMBER_MEANINGS = {
  1: { title: "The Initiator", text: "Independence, initiative, leadership, fresh starts. The invitation: stand on your own and begin." },
  2: { title: "The Peacemaker", text: "Partnership, sensitivity, diplomacy, balance. The invitation: cooperate, listen, and be patient." },
  3: { title: "The Expressive", text: "Creativity, communication, joy, self-expression. The invitation: share your voice without scattering it." },
  4: { title: "The Builder", text: "Structure, discipline, stability, honest work. The invitation: lay steady, lasting foundations." },
  5: { title: "The Explorer", text: "Freedom, change, curiosity, adventure. The invitation: embrace change without losing your center." },
  6: { title: "The Nurturer", text: "Care, responsibility, home, service, love. The invitation: nurture others without over-giving." },
  7: { title: "The Seeker", text: "Reflection, analysis, spirituality, inner truth. The invitation: trust inner knowing without isolating." },
  8: { title: "The Achiever", text: "Ambition, authority, material mastery, resilience. The invitation: pair drive with integrity." },
  9: { title: "The Humanitarian", text: "Compassion, completion, wisdom, release. The invitation: give generously and learn to let go." },
  11: { title: "Master 11 · The Visionary", text: "Heightened intuition, inspiration, and spiritual insight. Sensitive and idealistic — a channel for vision (reduces to 2)." },
  22: { title: "Master 22 · The Master Builder", text: "Turning large visions into tangible reality. Practical idealism on a wide scale (reduces to 4)." },
  33: { title: "Master 33 · The Master Teacher", text: "Compassionate service and uplifting others through nurturing wisdom (reduces to 6)." },
};

export const MASTER_NUMBERS = new Set([11, 22, 33]);

export function reduceNumber(n) {
  let value = Math.abs(Math.trunc(n));
  while (value > 9 && !MASTER_NUMBERS.has(value)) {
    value = String(value)
      .split("")
      .reduce((sum, d) => sum + Number(d), 0);
  }
  return value;
}

export const LETTER_VALUES = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9,
};

export const LETTER_CHART_ROWS = [
  [1, "A J S"],
  [2, "B K T"],
  [3, "C L U"],
  [4, "D M V"],
  [5, "E N W"],
  [6, "F O X"],
  [7, "G P Y"],
  [8, "H Q Z"],
  [9, "I R"],
];

export const VOWELS = new Set(["A", "E", "I", "O", "U"]);

export function sumLetters(name, filter) {
  const letters = name.toUpperCase().replace(/[^A-Z]/g, "").split("");
  const total = letters
    .filter((ch) => (filter ? filter(ch) : true))
    .reduce((sum, ch) => sum + (LETTER_VALUES[ch] || 0), 0);
  return total;
}

export const concepts = [
  {
    id: "life-path",
    label: "Life Path Number",
    kicker: "Core Number",
    group: "Core Numbers",
    type: "meaning",
    short: "Your core path, lesson, and direction based on your birth date.",
    intro: "What is the central theme my life keeps asking me to learn?",
    explanation:
      "The Life Path is the most-discussed number in numerology. It is drawn from your full date of birth and is treated as a symbol of the central themes, lessons, and tendencies you tend to return to. Read it as a mirror for reflection — a lens on patterns you may already recognize — not as a fixed script for your future.",
    howTo: [
      "Write your full birth date as numbers, e.g. 14 February 1990 → 14 / 2 / 1990.",
      "Add every digit together: 1 + 4 + 2 + 1 + 9 + 9 + 0 = 26.",
      "Reduce to a single digit by adding again: 2 + 6 = 8.",
      "Stop early only if you reach a master number — 11, 22, or 33 — which are left unreduced.",
    ],
    meanings: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33],
    prompts: [
      "Where in my life does this number's theme already show up?",
      "Which part of this meaning feels true — and which part feels like a stretch?",
      "What is one small, grounded action this theme invites this week?",
    ],
  },
  {
    id: "expression",
    label: "Expression / Destiny Number",
    kicker: "Core Number",
    group: "Core Numbers",
    type: "meaning",
    short: "The symbolic pattern of your full birth name.",
    intro: "What are the talents and tendencies my name seems to point toward?",
    explanation:
      "The Expression Number (also called the Destiny Number) is built from every letter of your full birth name. In numerology it is read as a symbol of your natural talents, abilities, and the way you tend to move through the world. Treat it as a prompt for noticing your own gifts — not as a ceiling or a promise.",
    howTo: [
      "Use your full name as written on your birth certificate.",
      "Convert each letter to a number using the chart below.",
      "Add all of the values together.",
      "Reduce the total to a single digit, keeping master numbers 11, 22, or 33.",
    ],
    letterChart: true,
    meanings: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    prompts: [
      "Which of these talents do I already lean on — and which do I underuse?",
      "Does this number describe how others tend to experience me?",
    ],
  },
  {
    id: "soul-urge",
    label: "Soul Urge Number",
    kicker: "Core Number",
    group: "Core Numbers",
    type: "meaning",
    short: "Inner desire, emotional motivation, and what the heart seeks.",
    intro: "Underneath the surface, what does my heart actually want?",
    explanation:
      "The Soul Urge Number (sometimes called the Heart's Desire) is calculated from the vowels in your full name. It is used as a symbol of inner motivation — the quieter wants, values, and emotional needs that drive you beneath everyday choices. It is a reflection tool for getting honest with yourself, not a diagnosis.",
    howTo: [
      "Take your full birth name and keep only the vowels (A, E, I, O, U).",
      "Note: Y is treated as a vowel only when it carries a vowel sound — use your judgment.",
      "Convert each vowel to a number and add them together.",
      "Reduce to a single digit, keeping master numbers.",
    ],
    meanings: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    prompts: [
      "When was the last time I honored this inner desire?",
      "Where might I be ignoring this need to keep others comfortable?",
    ],
  },
  {
    id: "personality",
    label: "Personality Number",
    kicker: "Core Number",
    group: "Core Numbers",
    type: "meaning",
    short: "How your energy may appear outwardly to others.",
    intro: "What is the first impression I tend to give before people truly know me?",
    explanation:
      "The Personality Number is calculated from the consonants in your full name. It is read as the 'outer layer' — the social mask, the first impression, the part of you others meet before they meet the rest. Use it to reflect on the gap (or alignment) between how you feel inside and how you come across.",
    howTo: [
      "Take your full birth name and keep only the consonants.",
      "Convert each consonant to a number and add them together.",
      "Reduce to a single digit, keeping master numbers.",
    ],
    meanings: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    prompts: [
      "Does the impression I give match how I actually feel inside?",
      "Is there a first-impression pattern I'd like to soften or strengthen?",
    ],
  },
  {
    id: "birthday",
    label: "Birthday Number",
    kicker: "Core Number",
    group: "Core Numbers",
    type: "meaning",
    short: "The symbolic meaning of the day you were born.",
    intro: "What gift or tendency does the day of my birth point to?",
    explanation:
      "The Birthday Number is simply the day of the month you were born, reduced to a single digit (master numbers kept). It is the most lightweight of the core numbers — read as a small, specific talent or flavor you carry, a supporting note rather than the whole song.",
    howTo: [
      "Take the day of the month you were born — for example, the 23rd.",
      "Reduce it to a single digit: 2 + 3 = 5.",
      "If the day is 11 or 22, it is kept as a master number.",
    ],
    meanings: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22],
    prompts: [
      "What small, specific strength does this number name in me?",
      "How could I lean on this gift in an ordinary week?",
    ],
  },
  {
    id: "angel-numbers",
    label: "Angel Numbers / Repeating Numbers",
    kicker: "Patterns",
    group: "Patterns & Timing",
    type: "angel",
    short: "Repeated number patterns used for reflection and meaning-making.",
    intro: "When the same number keeps showing up, what am I being invited to notice?",
    explanation:
      "Repeating numbers — 111, 222, and so on — are often called 'angel numbers.' People notice them on clocks, receipts, and license plates. Here they are framed honestly: a repeated number is a prompt for reflection and meaning-making, not a guarantee from the universe. The value is in the pause it creates — a moment to ask what is on your mind right now.",
    items: [
      { num: "111", title: "New beginnings", note: "A doorway feeling — fresh starts, alignment, and watching the thoughts you're planting." },
      { num: "222", title: "Balance & patience", note: "Cooperation, trust, and giving a situation time to find its footing." },
      { num: "333", title: "Expression & support", note: "Creativity, communication, and a sense of being encouraged to show up." },
      { num: "444", title: "Stability & grounding", note: "Structure, protection, and a reminder that steady foundations matter." },
      { num: "555", title: "Change & movement", note: "Transition is near — stay flexible and keep your center through the shift." },
      { num: "666", title: "Recalibration", note: "A nudge toward balance between material concerns and inner life — not an omen." },
      { num: "777", title: "Reflection & insight", note: "Inner work, learning, and trust in your own quiet knowing." },
      { num: "888", title: "Flow & reciprocity", note: "Cycles, abundance, and the give-and-take of effort and reward." },
      { num: "999", title: "Completion", note: "A chapter closing — release what's finished to make room for what's next." },
      { num: "000", title: "Openness & potential", note: "A clean slate; spaciousness and connection to something larger." },
    ],
    prompts: [
      "What was I thinking or feeling the moment I noticed this number?",
      "What meaning am I projecting onto it — and is that meaning useful to me?",
    ],
  },
  {
    id: "personal-year",
    label: "Personal Year Number",
    kicker: "Patterns",
    group: "Patterns & Timing",
    type: "meaning",
    short: "A symbolic yearly theme based on your birth date and the current year.",
    intro: "What theme might this particular year be inviting me to work with?",
    explanation:
      "The Personal Year Number tracks a symbolic nine-year cycle. It is read as a seasonal theme — a backdrop for the year — rather than a forecast of events. Many people find it a helpful frame for setting intentions and noticing where their energy naturally wants to go.",
    howTo: [
      "Add your birth month + your birth day + the current year.",
      "Example: born May 14, in 2026 → 5 + 14 + 2026.",
      "Reduce each part first if you like: 5 + 5 + 1 = 11 → 2.",
      "Reduce the total to a single digit to find this year's theme (1–9).",
    ],
    meanings: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    yearThemes: {
      1: "Beginnings — plant seeds, start fresh, take initiative.",
      2: "Patience — partnerships, slowing down, letting things develop.",
      3: "Expression — creativity, social connection, lightness.",
      4: "Foundations — work, structure, building the practical base.",
      5: "Change — movement, freedom, saying yes to the new.",
      6: "Responsibility — home, relationships, care and service.",
      7: "Reflection — study, solitude, inner work and rest.",
      8: "Momentum — ambition, results, material and personal power.",
      9: "Completion — release, closure, clearing space for the next cycle.",
    },
    prompts: [
      "Does this year's theme match where my energy already wants to go?",
      "What is one intention that fits this theme without forcing it?",
    ],
  },
  {
    id: "calculator",
    label: "Numerology Calculator",
    kicker: "Tool",
    group: "Tools",
    type: "calculator",
    short: "Calculate core numerology numbers from birth date and name.",
  },
  {
    id: "journal",
    label: "Numerology Journal",
    kicker: "Tool",
    group: "Tools",
    type: "journal",
    short: "Track repeated numbers, context, feelings, and grounded actions.",
  },
];

export const conceptsById = Object.fromEntries(concepts.map((c) => [c.id, c]));
export const CONCEPT_GROUPS = ["Core Numbers", "Patterns & Timing", "Tools"];
