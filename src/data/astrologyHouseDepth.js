// Deeper, house-specific material for the twelve astrological houses. The
// short one-line fields (meaning, beginner, deeper, watch, example) live in
// astrologyData.js; this file adds the structure and reflection layer the
// Sacred Systems house pages render as extra sections.
//
// Keyed by house number (1–12).

// Natural (zodiac-order) sign and ruler for each house. Modern co-rulers are
// listed after the traditional ruler.
export const HOUSE_NATURAL_SIGNS = {
  1: { sign: 'Aries', rulers: ['Mars'] },
  2: { sign: 'Taurus', rulers: ['Venus'] },
  3: { sign: 'Gemini', rulers: ['Mercury'] },
  4: { sign: 'Cancer', rulers: ['Moon'] },
  5: { sign: 'Leo', rulers: ['Sun'] },
  6: { sign: 'Virgo', rulers: ['Mercury'] },
  7: { sign: 'Libra', rulers: ['Venus'] },
  8: { sign: 'Scorpio', rulers: ['Mars', 'Pluto'] },
  9: { sign: 'Sagittarius', rulers: ['Jupiter'] },
  10: { sign: 'Capricorn', rulers: ['Saturn'] },
  11: { sign: 'Aquarius', rulers: ['Saturn', 'Uranus'] },
  12: { sign: 'Pisces', rulers: ['Jupiter', 'Neptune'] },
};

// The angle that opens each angular house.
export const HOUSE_CUSP_ANGLES = {
  1: 'Ascendant',
  4: 'Imum Coeli',
  7: 'Descendant',
  10: 'Midheaven',
};

// Traditional "joys": the house where each classical planet was said to be
// happiest and most at ease.
export const PLANETARY_JOYS = {
  1: 'Mercury',
  3: 'Moon',
  5: 'Venus',
  6: 'Mars',
  9: 'Sun',
  11: 'Jupiter',
  12: 'Saturn',
};

export const HOUSE_TYPES = {
  Angular: 'Angular houses (1, 4, 7, 10) begin at the four angles of the chart. They are the most active and visible: planets here tend to act outwardly and shape the main events of life.',
  Succedent: 'Succedent houses (2, 5, 8, 11) follow the angles. They stabilize and build on what the angular houses start: resources, attachments, and what we hold on to.',
  Cadent: 'Cadent houses (3, 6, 9, 12) fall away from the angles. They are about learning, adapting, and preparing: planets here often work through thought, skill, and inner process.',
};

export const HOUSE_ELEMENT_GROUPS = {
  Fire: { name: 'Houses of Life', houses: [1, 5, 9], text: 'The fire houses (1, 5, 9) are about identity, spirit, and what makes you feel alive: self, joy, and meaning.' },
  Earth: { name: 'Houses of Substance', houses: [2, 6, 10], text: 'The earth houses (2, 6, 10) are about material life: resources, daily work, and what you build in the world.' },
  Air: { name: 'Houses of Relationship', houses: [3, 7, 11], text: 'The air houses (3, 7, 11) are about connection and ideas: conversation, partnership, and community.' },
  Water: { name: 'Houses of Endings', houses: [4, 8, 12], text: 'The water houses (4, 8, 12) are about the soul and emotional depth: roots, merging, and what lies beneath the surface.' },
};

// Each house and its opposite form an axis: a polarity the chart asks you to
// balance rather than choose between.
export const HOUSE_AXES = {
  '1-7': { name: 'Self ↔ Other', text: 'The 1st–7th axis balances who you are on your own with who you become in partnership. Too much 1st House can feel self-focused; too much 7th can lose the self in others.' },
  '2-8': { name: 'Mine ↔ Ours', text: 'The 2nd–8th axis balances your own resources, values, and self-worth with what you share, merge, and owe in intimacy. Security comes from both self-reliance and trust.' },
  '3-9': { name: 'Local ↔ Far', text: 'The 3rd–9th axis balances everyday facts, conversation, and nearby learning with big-picture belief, travel, and meaning. Information becomes wisdom when both are honored.' },
  '4-10': { name: 'Private ↔ Public', text: 'The 4th–10th axis balances home, roots, and inner foundation with career, reputation, and public direction. A strong public life grows from a stable private base.' },
  '5-11': { name: 'Personal joy ↔ Collective hopes', text: 'The 5th–11th axis balances individual creativity, romance, and play with friendship, groups, and shared visions of the future.' },
  '6-12': { name: 'Order ↔ Surrender', text: 'The 6th–12th axis balances routines, service, and care of the body with retreat, rest, and spiritual surrender. Discipline and letting go support each other.' },
};

export function houseType(n) {
  if ([1, 4, 7, 10].includes(n)) return 'Angular';
  if ([2, 5, 8, 11].includes(n)) return 'Succedent';
  return 'Cadent';
}

export function houseElement(n) {
  return ['Fire', 'Earth', 'Air', 'Water'][(n - 1) % 4];
}

export function oppositeHouse(n) {
  return ((n + 5) % 12) + 1;
}

export function houseAxis(n) {
  const a = Math.min(n, oppositeHouse(n));
  return HOUSE_AXES[`${a}-${a + 6}`];
}

// Houses 1–6 sit below the horizon (personal, private development); 7–12 sit
// above it (relational, public, collective).
export function houseHemisphere(n) {
  return n <= 6
    ? 'Below the horizon: personal, private, and inward-developing.'
    : 'Above the horizon: relational, public, and outward-facing.';
}

export function houseQuadrant(n) {
  if (n <= 3) return 'First quadrant (1–3): building the self.';
  if (n <= 6) return 'Second quadrant (4–6): personal foundations and expression.';
  if (n <= 9) return 'Third quadrant (7–9): meeting others and widening the world.';
  return 'Fourth quadrant (10–12): society, legacy, and transcendence.';
}

export const HOUSE_DEPTH = {
  1: {
    lifeAreas: [
      'Identity and sense of self',
      'The physical body, vitality, and appearance',
      'First impressions and personal style',
      'How you start things and meet new situations',
      'Instinctive reactions and temperament',
      'Personal independence and self-direction',
    ],
    innerTheme: 'The 1st House is the lens the whole chart looks through. It describes the persona that develops early to meet the world, and over time it becomes the vehicle the deeper self travels in. Working with it consciously means owning your presence, your body, and your right to take up space, without mistaking the mask for the whole person.',
    healthy: [
      'A clear, embodied sense of who you are',
      'Confidence to begin, lead, and show up',
      'Taking care of the body as the home of the self',
    ],
    shadow: [
      'Self-absorption or needing to be seen first',
      'Defining yourself only by appearance or reaction',
      'Impulsiveness, or hiding behind a protective persona',
    ],
    transits: 'Planets moving over the Ascendant and through the 1st House tend to mark fresh starts, changes in appearance or health habits, and periods where you feel more visible and self-directed.',
    questions: [
      'What do people usually notice about me first, and does it match how I feel inside?',
      'How do I instinctively react when something new begins?',
      'Where am I waiting for permission to simply be myself?',
      'How do I treat my body when I am stressed?',
    ],
    practice: [
      'Stand in front of a mirror for one minute and notice your posture, expression, and breath without judging them.',
      'Write three words you want your presence to carry, then one small way to embody each today.',
      'Start one small thing you have been putting off, purely to practice initiating.',
      'At day’s end, note one moment you felt fully like yourself.',
    ],
  },
  2: {
    lifeAreas: [
      'Money, income, and earning ability',
      'Possessions and material security',
      'Personal values and priorities',
      'Self-worth and self-esteem',
      'Natural talents and resources',
      'The senses, comfort, and pleasure in the physical world',
    ],
    innerTheme: 'The 2nd House asks what you truly value and whether you believe you are worth it. Outer resources often mirror inner worth: how you earn, spend, save, and receive reflects how you value your own time, gifts, and body. Real security is built slowly, from aligning what you own with what you actually care about.',
    healthy: [
      'Steady, self-respecting relationship with money',
      'Knowing your talents and charging fairly for them',
      'Enjoying simple pleasures without guilt or excess',
    ],
    shadow: [
      'Measuring your worth by your bank balance or possessions',
      'Scarcity thinking, hoarding, or overspending to soothe',
      'Clinging to comfort and resisting needed change',
    ],
    transits: 'Planets moving through the 2nd House often bring attention to income, spending, possessions, and confidence: a time to revisit budgets, pricing, and what you are really investing in.',
    questions: [
      'What do I value most, and does my spending reflect it?',
      'What talents do I undervalue or give away for free?',
      'When do I feel “enough,” and when do I feel scarcity?',
      'What is one belief about money I inherited rather than chose?',
    ],
    practice: [
      'List five things you value most, then compare them to where your money and time went this week.',
      'Name one talent you have and one way it could be valued more fully.',
      'Do one slow sensory practice: a meal, a walk, or a bath with full attention.',
      'Write a short statement of worth that is not tied to money or productivity.',
    ],
  },
  3: {
    lifeAreas: [
      'Communication, speaking, and writing',
      'Everyday thinking and learning style',
      'Siblings, cousins, and neighbors',
      'Short trips and the local environment',
      'Early education and basic skills',
      'Information, news, messages, and daily exchanges',
    ],
    innerTheme: 'The 3rd House is the mind at street level: the running commentary, the conversations, the facts you pick up as you move through your day. It shapes the stories you tell yourself about what is happening. Becoming conscious here means noticing your self-talk, choosing your words, and staying curious instead of reactive.',
    healthy: [
      'Clear, curious, and honest communication',
      'Enjoying learning for its own sake',
      'Warm connection with siblings, neighbors, and community',
    ],
    shadow: [
      'Scattered attention or mental restlessness',
      'Gossip, overthinking, or talking without listening',
      'Old sibling patterns replaying in adult relationships',
    ],
    transits: 'Planets moving through the 3rd House often bring busy communication, paperwork, short trips, study, and news, along with conversations that shift your perspective.',
    questions: [
      'What is the tone of my inner voice on an ordinary day?',
      'How do I learn best: reading, talking, doing, or listening?',
      'What did I learn about speaking up from my siblings or early school life?',
      'Which conversation have I been avoiding?',
    ],
    practice: [
      'Write your thoughts freely for ten minutes, then underline any sentence that sounds like an old script.',
      'Have one conversation today where you listen fully before responding.',
      'Learn one small new thing and explain it to someone else.',
      'Walk your neighborhood without your phone and notice three things you never saw before.',
    ],
  },
  4: {
    lifeAreas: [
      'Home, living space, and domestic life',
      'Family, parents, and childhood environment',
      'Ancestry, heritage, and lineage',
      'Emotional foundations and inner security',
      'Private life and what you need to feel safe',
      'Endings of matters and later life',
    ],
    innerTheme: 'The 4th House sits at the bottom of the chart: the roots beneath the visible tree. It holds the emotional imprint of where you came from and the inner home you carry with you. Healing work here often means reparenting yourself, honoring what your lineage gave you, and consciously building the sense of belonging you need.',
    healthy: [
      'A home, inner or outer, that truly restores you',
      'Understanding your family story with compassion',
      'Feeling rooted enough to grow outward',
    ],
    shadow: [
      'Repeating family patterns without noticing',
      'Withdrawing into the private world to avoid life',
      'Never feeling at home anywhere',
    ],
    transits: 'Planets moving through the 4th House often stir family matters, moves, renovations, and emotional memories: times to tend roots and inner foundations.',
    questions: [
      'What did “home” feel like when I was a child?',
      'What do I need to feel emotionally safe today?',
      'Which family pattern am I ready to keep, and which to release?',
      'What gifts did my ancestors give me?',
    ],
    practice: [
      'Make one corner of your home feel like a sanctuary, even if it is small.',
      'Write a letter (not to send) to a parent or ancestor naming one thing you received and one thing you are releasing.',
      'Cook or eat something connected to your heritage, slowly and with gratitude.',
      'Place a hand on your heart and ask, “What do I need to feel safe right now?”',
    ],
  },
  5: {
    lifeAreas: [
      'Creativity, art, and self-expression',
      'Romance, dating, and flirtation',
      'Play, fun, hobbies, and games',
      'Children and the inner child',
      'Pleasure, joy, and celebration',
      'Risk-taking, performance, and being seen',
    ],
    innerTheme: 'The 5th House is where the heart wants to shine. It asks what you create purely because it delights you, and how freely you let yourself play, love, and be seen. Spiritually it is the house of joy as a form of devotion: expressing your unique light is not vanity, it is participation in creation.',
    healthy: [
      'Making things for the joy of it',
      'Romance that feels playful and alive',
      'A healthy relationship with your inner child',
    ],
    shadow: [
      'Needing applause to feel worthy',
      'Chasing drama or pleasure to avoid depth',
      'Blocking creativity out of fear of judgment',
    ],
    transits: 'Planets moving through the 5th House often bring romance, creative projects, matters involving children, and a stronger desire for fun and recognition.',
    questions: [
      'What did I love to do as a child before anyone graded it?',
      'When do I feel most playful and alive?',
      'What creative project keeps calling me?',
      'How do I flirt with life, not only with people?',
    ],
    practice: [
      'Spend twenty minutes creating something with no goal: draw, dance, sing, or write.',
      'Do one thing today purely for fun and notice any guilt that comes up.',
      'Share something you made with one person.',
      'Ask your inner child what it wants, and give it one small yes.',
    ],
  },
  6: {
    lifeAreas: [
      'Daily routines, habits, and schedules',
      'Health, diet, exercise, and the body’s maintenance',
      'Work environment, tasks, and coworkers',
      'Service, usefulness, and helping others',
      'Skill-building, craft, and improvement',
      'Pets and small animals',
    ],
    innerTheme: 'The 6th House is the sacredness of the ordinary. It shows how you tend the daily systems that keep life and body working, and how you serve. Growth here is incremental: small habits repeated with care. The spiritual lesson is that devotion lives in details, and that serving well includes serving your own health.',
    healthy: [
      'Supportive routines that leave room to breathe',
      'Pride in doing good work',
      'Listening to the body’s signals early',
    ],
    shadow: [
      'Perfectionism, overwork, or chronic self-criticism',
      'Martyrdom: serving others while neglecting yourself',
      'Anxiety channeled into control of small details',
    ],
    transits: 'Planets moving through the 6th House often highlight workload, health routines, coworkers, and the need to reorganize daily life.',
    questions: [
      'Which daily habit supports me most, and which drains me?',
      'How does my body tell me I am overdoing it?',
      'Where do I serve from love, and where from obligation?',
      'What skill do I want to keep refining?',
    ],
    practice: [
      'Choose one tiny habit (two minutes or less) and do it at the same time every day this week.',
      'Do a body scan and note where you hold tension during work.',
      'Clean or organize one small space slowly, treating it as a meditation.',
      'Offer one act of service today, then one act of care to yourself.',
    ],
  },
  7: {
    lifeAreas: [
      'Marriage and committed partnership',
      'Close one-to-one relationships',
      'Business partners and contracts',
      'Open enemies, rivals, and negotiations',
      'What you seek or project onto others',
      'Cooperation, fairness, and balance',
    ],
    innerTheme: 'The 7th House starts at the Descendant, the point where the Sun sets: the part of yourself you often meet first in someone else. It shows the qualities you are drawn to, and sometimes disown and project. Partnership becomes a mirror: as you recognize and integrate what you seek in others, relationships become more conscious and less fated.',
    healthy: [
      'Mutual, balanced relationships',
      'Owning what you project onto partners',
      'Fair agreements and honest negotiation',
    ],
    shadow: [
      'Losing yourself in a partner or needing one to feel whole',
      'Repeatedly attracting the same difficult type',
      'People-pleasing, or avoiding conflict until it explodes',
    ],
    transits: 'Planets moving through the 7th House often bring new partnerships, relationship turning points, contracts, and important encounters with others.',
    questions: [
      'What qualities do I consistently look for in a partner?',
      'Which of those qualities might also be in me, waiting to be owned?',
      'What pattern keeps repeating in my close relationships?',
      'Where do I give up my own needs to keep the peace?',
    ],
    practice: [
      'List the three traits you admire most in a partner or close friend, then write one way each lives in you.',
      'Name one relationship pattern and one small boundary that would change it.',
      'Have a conversation where you state your need clearly and ask for theirs.',
      'Reflect on one “difficult” person as a teacher: what are they showing you?',
    ],
  },
  8: {
    lifeAreas: [
      'Deep intimacy, sexuality, and emotional merging',
      'Shared resources: debt, loans, inheritance, taxes',
      'Trust, vulnerability, and power dynamics',
      'Death, endings, grief, and rebirth',
      'Psychology, secrets, and the occult',
      'Crisis and profound transformation',
    ],
    innerTheme: 'The 8th House is the underworld of the chart: the place of what we share, risk, and surrender when we truly let someone in. It holds the fears around loss and control that surface in intimacy. Its gift is transformation: by facing what feels too intense, we shed old skins and come back renewed. This is the alchemist’s house.',
    healthy: [
      'Deep trust and emotional honesty in intimacy',
      'Healthy handling of shared money and power',
      'Using crisis as a doorway to renewal',
    ],
    shadow: [
      'Control, jealousy, or power struggles',
      'Fear of vulnerability, or merging too fast',
      'Obsession, secrecy, or avoiding grief',
    ],
    transits: 'Planets moving through the 8th House often bring intimacy, shared finances, inheritances or debts, endings, and deep psychological change.',
    questions: [
      'What do I fear losing if I truly let someone in?',
      'How do I respond when I am not in control?',
      'What ending in my life ultimately made room for something new?',
      'How do I handle money or resources I share with others?',
    ],
    practice: [
      'Write about one ending or loss and what was reborn after it.',
      'Name one place you hold on tightly, and practice loosening your grip on it for one day.',
      'Review one shared financial agreement and make sure it is clear and fair.',
      'Sit quietly with one uncomfortable emotion for five minutes without fixing it.',
    ],
  },
  9: {
    lifeAreas: [
      'Beliefs, philosophy, religion, and spirituality',
      'Higher education and advanced study',
      'Long-distance travel and other cultures',
      'Publishing, teaching, and broadcasting',
      'Law, ethics, and justice',
      'Your search for meaning and truth',
    ],
    innerTheme: 'The 9th House is the quest. It shows how you make sense of life and where you go, physically or mentally, to find a bigger picture. Its growth comes through exposure to the unfamiliar. Spiritually it asks you to hold your beliefs as living, questionable maps rather than final answers, and to share what you learn.',
    healthy: [
      'A worldview that stays open and curious',
      'Learning through travel, study, and other cultures',
      'Teaching or sharing wisdom generously',
    ],
    shadow: [
      'Dogmatism, preachiness, or moral superiority',
      'Always seeking elsewhere instead of living here',
      'Big ideas with no grounding in action',
    ],
    transits: 'Planets moving through the 9th House often bring travel, study, publishing, legal matters, and shifts in belief or life philosophy.',
    questions: [
      'Which belief has guided my life the most, and where did it come from?',
      'When did travel or another culture change how I see things?',
      'What would I love to study deeply?',
      'What wisdom do I have that is worth sharing?',
    ],
    practice: [
      'Write your personal philosophy of life in five sentences.',
      'Read or listen to a perspective very different from yours with genuine curiosity.',
      'Plan one small “pilgrimage”: a new place, class, or tradition to explore.',
      'Teach one thing you know to someone who wants to learn it.',
    ],
  },
  10: {
    lifeAreas: [
      'Career, vocation, and calling',
      'Public reputation and status',
      'Achievements and long-term goals',
      'Authority figures, bosses, and leadership',
      'Responsibility and contribution to society',
      'Legacy and how you want to be remembered',
    ],
    innerTheme: 'The 10th House begins at the Midheaven, the highest point of the chart, where your life is most visible. It is less about any one job and more about the role you grow into and the mark you leave. Its spiritual work is integrity: building something real over time, and making sure the public self is an honest expression of the private one.',
    healthy: [
      'Meaningful work aligned with your values',
      'Owning your authority and responsibility',
      'Patient, steady progress toward long-term goals',
    ],
    shadow: [
      'Identifying entirely with status or achievement',
      'Living out others’ expectations instead of your calling',
      'Fear of failure or of being seen',
    ],
    transits: 'Planets moving through the 10th House often bring career developments, promotions or changes, public attention, and questions of direction and responsibility.',
    questions: [
      'What do I want to be known for?',
      'Whose expectations am I still trying to meet in my work?',
      'What would a meaningful legacy look like for me?',
      'Where am I ready to step into more authority?',
    ],
    practice: [
      'Write a one-paragraph description of the work you would do if no one were watching or judging.',
      'Set one long-term goal and one concrete step toward it this week.',
      'Notice one place where you shrink in public, and practice standing a little taller there.',
      'Reflect on a mentor or authority figure and what you learned from them.',
    ],
  },
  11: {
    lifeAreas: [
      'Friendships and social circles',
      'Groups, communities, and networks',
      'Hopes, wishes, and long-range dreams',
      'Social causes and humanitarian ideals',
      'Technology, innovation, and the future',
      'Benefits and support from others',
    ],
    innerTheme: 'The 11th House is the house of the “we”: where your individual light joins a larger circle. It shows the friends and communities that help you become who you are meant to be, and the future you hope to help create. Its lesson is belonging without losing yourself, and turning private wishes into shared vision.',
    healthy: [
      'Supportive friendships that grow with you',
      'Finding your tribe or community',
      'Working toward a better future with others',
    ],
    shadow: [
      'Conforming to fit in or fearing exclusion',
      'Feeling like an outsider everywhere',
      'Using causes or groups to avoid intimacy',
    ],
    transits: 'Planets moving through the 11th House often bring new friends, group involvement, networking, and renewed hopes or goals for the future.',
    questions: [
      'Which friendships help me grow, and which keep me small?',
      'What community do I feel I truly belong to?',
      'What is one dream for the future that I rarely say out loud?',
      'How do I want to contribute to something larger than myself?',
    ],
    practice: [
      'Reach out to one friend who supports your growth and tell them what they mean to you.',
      'Write down three hopes for the next five years.',
      'Join, attend, or explore one group connected to something you care about.',
      'Reflect on one way you can give back to a community this month.',
    ],
  },
  12: {
    lifeAreas: [
      'The subconscious and unconscious patterns',
      'Solitude, rest, retreat, and sleep',
      'Dreams, intuition, and spiritual life',
      'Hidden fears, self-undoing, and secrets',
      'Hospitals, monasteries, and places of seclusion',
      'Compassion, service, and karma',
    ],
    innerTheme: 'The 12th House is the last house, where the cycle dissolves before beginning again at the Ascendant. It holds what is hidden: forgotten memories, inherited patterns, and the quiet longing for something beyond the self. Traditionally called the house of sorrow and self-undoing, it is also the house of liberation. What we face here in solitude, prayer, dreams, or therapy stops running us from behind the scenes and becomes compassion and spiritual depth.',
    healthy: [
      'A regular practice of solitude, rest, or meditation',
      'Trusting intuition and working with dreams',
      'Quiet, selfless service and deep compassion',
    ],
    shadow: [
      'Escapism, avoidance, or addictive patterns',
      'Self-sabotage driven by unseen fears',
      'Isolation, or feeling like a victim of hidden forces',
    ],
    transits: 'Planets moving through the 12th House often bring a need for rest, retreat, and reflection, plus endings, stronger dreams and intuition, and the quiet preparation before a new cycle begins at the Ascendant.',
    questions: [
      'What pattern keeps repeating in my life that I do not fully understand?',
      'How do I feel about being alone, and what comes up in silence?',
      'What have my dreams been showing me lately?',
      'Where do I quietly undermine myself, and what fear might be underneath?',
    ],
    practice: [
      'Keep a dream journal by your bed for one week and write anything you remember on waking.',
      'Spend fifteen minutes in complete silence with no input, and notice what surfaces.',
      'Name one self-sabotaging habit and gently ask what it is trying to protect you from.',
      'Do one act of anonymous kindness or service without telling anyone.',
    ],
  },
};
