import { useState, useCallback, useMemo, useEffect } from 'react';
import './NatalChartDecoder.css';

const planets = [
  { name: "Sun", symbol: "☉", metal: "Gold", metalSymbol: "Au", metalMeaning: "Gold symbolizes vitality, royalty, incorruptibility, radiance, life force, and the centered self.", symbolicBridge: "Sun and gold both point to the center: the radiant, visible, life-giving principle.", keywords: "identity, vitality, confidence, purpose", meaning: "The Sun shows your core identity, life force, confidence, and the part of you that wants to become fully expressed.", beginner: "Think of the Sun as the center of the chart. It shows the main character energy.", deeper: "The Sun is not every part of your personality. It is the part that seeks coherence, direction, visibility, and conscious self-expression.", watch: "Do not reduce the whole chart to the Sun sign. It is important, but it is only one piece.", example: "Sun in Leo in the 10th House may seek recognition through creativity, leadership, or public achievement." },
  { name: "Moon", symbol: "☽", metal: "Silver", metalSymbol: "Ag", metalMeaning: "Silver symbolizes reflection, receptivity, intuition, emotional tides, memory, and lunar sensitivity.", symbolicBridge: "Moon and silver both reflect light rather than generate it. They symbolize feeling, memory, and emotional response.", keywords: "emotions, instincts, needs, comfort", meaning: "The Moon shows emotional needs, instinctive reactions, attachment patterns, memory, and what helps someone feel safe.", beginner: "The Moon is the private emotional self.", deeper: "It describes how someone self-soothes, bonds, protects themselves, and responds when they are vulnerable.", watch: "A person may not show their Moon immediately. It often appears in private, family, stress, and intimacy.", example: "Moon in Scorpio in the 7th House may need deep emotional bonding through partnership." },
  { name: "Mercury", symbol: "☿", metal: "Quicksilver / Mercury", metalSymbol: "Hg", metalMeaning: "Mercury symbolizes movement, exchange, transformation, language, cleverness, and fluid intelligence.", symbolicBridge: "Mercury as a metal is fluid and hard to pin down, matching Mercury as the planet of mind, speech, trade, and movement.", keywords: "mind, communication, learning, speech", meaning: "Mercury shows how someone thinks, speaks, learns, processes information, and makes connections.", beginner: "Mercury is the mental and communication style.", deeper: "It shows how the nervous system gathers data, names experiences, asks questions, and translates thoughts into words.", watch: "Mercury does not show intelligence level. It shows the style of thinking.", example: "Mercury in Gemini in the 3rd House may be quick, verbal, curious, and mentally restless." },
  { name: "Venus", symbol: "♀", metal: "Copper", metalSymbol: "Cu", metalMeaning: "Copper symbolizes beauty, attraction, conductivity, harmony, softness, sensuality, and bonding.", symbolicBridge: "Venus and copper both carry the theme of connection: attraction, beauty, magnetism, and relational warmth.", keywords: "love, attraction, beauty, values, pleasure", meaning: "Venus shows love style, affection, attraction, pleasure, harmony, taste, and what someone values.", beginner: "Venus is how someone gives and receives affection.", deeper: "It reveals relational preferences, aesthetic taste, sensual enjoyment, and what feels desirable or worth preserving.", watch: "Venus is not the whole relationship pattern. Also check Moon, Mars, 5th House, 7th House, and aspects.", example: "Venus in Cancer in the 5th House may love through tenderness, romance, nostalgia, and emotional care." },
  { name: "Mars", symbol: "♂", metal: "Iron", metalSymbol: "Fe", metalMeaning: "Iron symbolizes force, blood, weaponry, heat, conflict, courage, effort, and raw physical action.", symbolicBridge: "Mars and iron both carry the energy of strength, conflict, assertion, survival, and direct action.", keywords: "drive, action, desire, anger, pursuit", meaning: "Mars shows action, drive, courage, sexual energy, anger, conflict style, and how someone goes after what they want.", beginner: "Mars is the engine.", deeper: "It describes how someone asserts themselves, handles frustration, initiates, competes, protects, and moves toward desire.", watch: "Mars can be healthy assertion or reactive aggression depending on awareness and context.", example: "Mars in Aries in the 1st House may act quickly, directly, and independently." },
  { name: "Jupiter", symbol: "♃", metal: "Tin", metalSymbol: "Sn", metalMeaning: "Tin symbolizes expansion, generosity, protection, teaching, law, blessing, and the growth principle.", symbolicBridge: "Jupiter and tin share the image of expansion, benevolence, wisdom, increase, and social order.", keywords: "growth, faith, opportunity, wisdom", meaning: "Jupiter shows expansion, optimism, belief, wisdom, luck, teaching, and the areas where life wants to grow larger.", beginner: "Jupiter is where life expands.", deeper: "It can show faith, philosophy, education, generosity, confidence, and sometimes excess.", watch: "Jupiter can overdo things. Growth needs grounding.", example: "Jupiter in Sagittarius in the 9th House may grow through travel, learning, faith, and teaching." },
  { name: "Saturn", symbol: "♄", metal: "Lead", metalSymbol: "Pb", metalMeaning: "Lead symbolizes heaviness, time, weight, limitation, endurance, density, mortality, and slow transformation.", symbolicBridge: "Saturn and lead both describe what is heavy, slow, serious, binding, structured, and eventually mastered.", keywords: "discipline, limits, maturity, responsibility", meaning: "Saturn shows structure, responsibility, fear, discipline, delay, mastery, and long-term growth.", beginner: "Saturn is where life asks for maturity.", deeper: "It often points to pressure, insecurity, boundaries, and the area where effort eventually creates strength.", watch: "Saturn is not only restriction. It can become mastery and stability.", example: "Saturn in the 11th House may create lessons around friendships, belonging, and long-term goals." },
  { name: "Uranus", symbol: "♅", metal: "Modern / no classical metal", metalSymbol: "—", metalMeaning: "Uranus was not part of the traditional seven-planet metal system. It can be treated as an advanced modern layer.", symbolicBridge: "Uranus can be linked symbolically with electricity, rebellion, disruption, invention, and sudden awakening.", keywords: "freedom, disruption, originality, rebellion", meaning: "Uranus shows originality, sudden change, independence, innovation, rebellion, and the need for freedom.", beginner: "Uranus is the rule-breaker.", deeper: "It disrupts stale patterns and awakens individuality, but it can also create instability or emotional distance.", watch: "Uranus can confuse freedom with avoidance.", example: "Uranus in the 12th House may show hidden restlessness or sudden inner awakenings." },
  { name: "Neptune", symbol: "♆", metal: "Modern / no classical metal", metalSymbol: "—", metalMeaning: "Neptune was not part of the traditional seven-planet metal system. It belongs to the modern planetary layer.", symbolicBridge: "Neptune can be linked symbolically with mist, oceans, dreams, dissolution, spirituality, and illusion.", keywords: "dreams, spirituality, imagination, illusion", meaning: "Neptune shows imagination, spirituality, compassion, fantasy, idealization, confusion, and dissolving boundaries.", beginner: "Neptune is the dream world.", deeper: "It can show mystical sensitivity, artistic inspiration, escapism, longing, and places where reality can blur.", watch: "Neptune can idealize people or situations. Clarity matters.", example: "Neptune in the 1st House may make someone appear sensitive, mysterious, or hard to define." },
  { name: "Pluto", symbol: "♇", metal: "Modern / no classical metal", metalSymbol: "—", metalMeaning: "Pluto was not part of the traditional seven-planet metal system. It belongs to modern astrology.", symbolicBridge: "Pluto can be linked symbolically with underworld matter, pressure, decay, purification, power, and rebirth.", keywords: "power, shadow, transformation, obsession", meaning: "Pluto shows transformation, intensity, control, shadow material, psychological depth, and rebirth.", beginner: "Pluto is deep transformation.", deeper: "It exposes what is buried, compulsive, feared, or powerful so it can be faced and transformed.", watch: "Pluto can become obsession, power struggle, or emotional extremity when unconscious.", example: "Pluto in the 8th House may intensify intimacy, trust, secrets, and shared resources." },
];

const signs = [
  { name: "Aries", symbol: "♈", element: "Fire", modality: "Cardinal", ruler: "Mars", keywords: "direct, bold, fast, instinctive", meaning: "Aries acts through directness, courage, speed, independence, and initiation.", beginner: "Aries starts things.", deeper: "It wants movement, assertion, challenge, and self-directed action.", watch: "Can become impatient, reactive, or overly forceful.", example: "Mars in Aries acts quickly and directly." },
  { name: "Taurus", symbol: "♉", element: "Earth", modality: "Fixed", ruler: "Venus", keywords: "steady, sensual, loyal, grounded", meaning: "Taurus acts through stability, pleasure, patience, loyalty, and material security.", beginner: "Taurus wants steadiness.", deeper: "It values embodiment, comfort, consistency, beauty, and preservation.", watch: "Can become stubborn, possessive, or resistant to change.", example: "Moon in Taurus may need comfort, routine, and physical calm." },
  { name: "Gemini", symbol: "♊", element: "Air", modality: "Mutable", ruler: "Mercury", keywords: "curious, verbal, adaptable, mental", meaning: "Gemini acts through curiosity, speech, variety, learning, and quick mental movement.", beginner: "Gemini asks questions.", deeper: "It gathers information, connects ideas, names things, and adapts socially.", watch: "Can become scattered, inconsistent, or overly mental.", example: "Mercury in Gemini may think and speak quickly." },
  { name: "Cancer", symbol: "♋", element: "Water", modality: "Cardinal", ruler: "Moon", keywords: "emotional, protective, nurturing, sensitive", meaning: "Cancer acts through care, memory, emotional protection, family, and belonging.", beginner: "Cancer protects what it loves.", deeper: "It responds through feeling, attachment, safety needs, and emotional memory.", watch: "Can become defensive, clingy, or ruled by mood.", example: "Venus in Cancer may love through tenderness and emotional care." },
  { name: "Leo", symbol: "♌", element: "Fire", modality: "Fixed", ruler: "Sun", keywords: "expressive, proud, creative, visible", meaning: "Leo acts through creativity, confidence, warmth, performance, and heart-led expression.", beginner: "Leo wants to shine.", deeper: "It seeks recognition, joy, loyalty, and the courage to be seen.", watch: "Can become prideful, dramatic, or approval-seeking.", example: "Sun in Leo may identify with creativity and visibility." },
  { name: "Virgo", symbol: "♍", element: "Earth", modality: "Mutable", ruler: "Mercury", keywords: "precise, helpful, analytical, practical", meaning: "Virgo acts through refinement, service, analysis, improvement, and practical care.", beginner: "Virgo improves things.", deeper: "It notices details, fixes systems, and turns chaos into usable order.", watch: "Can become critical, anxious, or perfectionistic.", example: "Mercury in Virgo may think carefully and precisely." },
  { name: "Libra", symbol: "♎", element: "Air", modality: "Cardinal", ruler: "Venus", keywords: "balanced, relational, aesthetic, diplomatic", meaning: "Libra acts through harmony, fairness, beauty, partnership, and social awareness.", beginner: "Libra seeks balance.", deeper: "It compares, relates, negotiates, and understands life through mirrors.", watch: "Can avoid conflict or over-adjust to others.", example: "Venus in Libra may value harmony, beauty, and mutuality." },
  { name: "Scorpio", symbol: "♏", element: "Water", modality: "Fixed", ruler: "Mars / Pluto", keywords: "intense, private, magnetic, transformative", meaning: "Scorpio acts through depth, intimacy, secrecy, emotional truth, and transformation.", beginner: "Scorpio goes deep.", deeper: "It seeks trust, psychological honesty, loyalty, and powerful emotional bonding.", watch: "Can become suspicious, controlling, or obsessive.", example: "Moon in Scorpio may feel emotions intensely and privately." },
  { name: "Sagittarius", symbol: "♐", element: "Fire", modality: "Mutable", ruler: "Jupiter", keywords: "expansive, honest, adventurous, philosophical", meaning: "Sagittarius acts through freedom, truth, exploration, wisdom, humor, and meaning.", beginner: "Sagittarius wants expansion.", deeper: "It searches for truth, faith, experience, and a bigger worldview.", watch: "Can become blunt, restless, or avoidant of details.", example: "Jupiter in Sagittarius may grow through travel, teaching, or belief." },
  { name: "Capricorn", symbol: "♑", element: "Earth", modality: "Cardinal", ruler: "Saturn", keywords: "disciplined, ambitious, serious, strategic", meaning: "Capricorn acts through structure, responsibility, patience, ambition, and long-term effort.", beginner: "Capricorn builds.", deeper: "It wants competence, achievement, respect, maturity, and real-world results.", watch: "Can become rigid, cold, or overly burdened.", example: "Saturn in Capricorn may create strong discipline and responsibility." },
  { name: "Aquarius", symbol: "♒", element: "Air", modality: "Fixed", ruler: "Saturn / Uranus", keywords: "independent, future-minded, unusual, intellectual", meaning: "Aquarius acts through originality, detachment, systems, innovation, and collective awareness.", beginner: "Aquarius thinks differently.", deeper: "It questions norms, sees patterns, and values freedom of thought.", watch: "Can become detached, rebellious for its own sake, or emotionally distant.", example: "Uranus in Aquarius may intensify originality and independence." },
  { name: "Pisces", symbol: "♓", element: "Water", modality: "Mutable", ruler: "Jupiter / Neptune", keywords: "dreamy, empathic, spiritual, imaginative", meaning: "Pisces acts through sensitivity, compassion, imagination, spirituality, and emotional merging.", beginner: "Pisces feels everything.", deeper: "It dissolves boundaries and opens the person to dreams, symbols, empathy, and transcendence.", watch: "Can become confused, escapist, or overly porous.", example: "Neptune in Pisces may intensify imagination and spiritual longing." },
];

const houses = [
  { name: "1st House", symbol: "1", latin: "Vita", latinMeaning: "Life", modernTitle: "House of Self", keywords: "identity, body, first impression", meaning: "The 1st House shows identity, body, appearance, first impressions, and how someone approaches life.", beginner: "This is the doorway of the chart.", deeper: "Planets here are visible and strongly tied to self-expression, instinct, and embodiment.", watch: "Do not confuse the 1st House with the entire personality. It is the entry point.", example: "Mars in the 1st House may make someone direct, active, and physically expressive." },
  { name: "2nd House", symbol: "2", latin: "Lucrum", latinMeaning: "Gain", modernTitle: "House of Value", keywords: "money, values, self-worth", meaning: "The 2nd House shows money, possessions, values, stability, resources, and self-worth.", beginner: "This is the house of what you value.", deeper: "It reveals how someone builds security and relates to material and emotional worth.", watch: "It is not only money. It also shows inner value.", example: "Venus in the 2nd House may value comfort, beauty, and financial steadiness." },
  { name: "3rd House", symbol: "3", latin: "Fratres", latinMeaning: "Siblings", modernTitle: "House of Sharing", keywords: "communication, learning, siblings", meaning: "The 3rd House shows communication, thinking, siblings, local environment, learning, and everyday movement.", beginner: "This is the house of the mind in daily life.", deeper: "It shows how someone speaks, learns, observes, and interacts with nearby surroundings.", watch: "It is more practical and local than the 9th House.", example: "Mercury in the 3rd House may make communication central." },
  { name: "4th House", symbol: "4", latin: "Genitor", latinMeaning: "Parent", modernTitle: "House of Home and Family", keywords: "home, family, roots", meaning: "The 4th House shows home, family, emotional roots, ancestry, private life, and inner foundation.", beginner: "This is the emotional base.", deeper: "It shows what someone comes from and what they need to feel internally rooted.", watch: "This house may be private and not obvious to others.", example: "Moon in the 4th House may strongly need home and emotional safety." },
  { name: "5th House", symbol: "5", latin: "Nati", latinMeaning: "Children", modernTitle: "House of Pleasure", keywords: "romance, creativity, pleasure", meaning: "The 5th House shows romance, creativity, play, self-expression, children, joy, and pleasure.", beginner: "This is the house of creative life.", deeper: "It reveals how someone expresses joy, desire, playfulness, and personal artistry.", watch: "It is romance and pleasure, but not necessarily long-term partnership. That is more 7th House.", example: "Venus in the 5th House may love romance, beauty, and playful affection." },
  { name: "6th House", symbol: "6", latin: "Valetudo", latinMeaning: "Health", modernTitle: "House of Health", keywords: "work, health, routines", meaning: "The 6th House shows daily work, habits, service, health routines, skill-building, and maintenance.", beginner: "This is the house of daily systems.", deeper: "It shows how someone manages life through routines, improvement, and practical responsibility.", watch: "It can become overwork or self-criticism if imbalanced.", example: "Saturn in the 6th House may need disciplined routines." },
  { name: "7th House", symbol: "7", latin: "Uxor", latinMeaning: "Spouse", modernTitle: "House of Balance", keywords: "partnership, marriage, mirrors", meaning: "The 7th House shows one-to-one relationships, marriage, contracts, projection, and partnership dynamics.", beginner: "This is the house of partnership.", deeper: "It shows what someone seeks, meets, or learns through important others.", watch: "Planets here can be projected onto partners until owned consciously.", example: "Moon in the 7th House may need emotional connection through partnership." },
  { name: "8th House", symbol: "8", latin: "Mors", latinMeaning: "Death", modernTitle: "House of Transformation", keywords: "intimacy, transformation, shared resources", meaning: "The 8th House shows intimacy, trust, shared resources, secrets, psychology, death/rebirth, and transformation.", beginner: "This is the house of deep bonding and transformation.", deeper: "It reveals vulnerability, merging, emotional risk, and what changes someone from the inside.", watch: "It can feel intense, private, or hard to control.", example: "Pluto in the 8th House may intensify intimacy and psychological transformation." },
  { name: "9th House", symbol: "9", latin: "Iter", latinMeaning: "Passage", modernTitle: "House of Purpose", keywords: "beliefs, travel, higher learning", meaning: "The 9th House shows beliefs, philosophy, religion, higher education, travel, law, and meaning.", beginner: "This is the house of worldview.", deeper: "It shows how someone searches for truth, wisdom, and broader perspective.", watch: "Belief can become dogma if not questioned.", example: "Jupiter in the 9th House may love travel, teaching, and spiritual learning." },
  { name: "10th House", symbol: "10", latin: "Regnum", latinMeaning: "Kingdom", modernTitle: "House of Enterprise", keywords: "career, reputation, public life", meaning: "The 10th House shows career, public image, reputation, achievement, authority, and visible direction.", beginner: "This is the house of public life.", deeper: "It shows how someone is seen, what they build, and the role they may grow into.", watch: "It is not only a job. It can show vocation, reputation, and responsibility.", example: "Sun in the 10th House may seek recognition through achievement." },
  { name: "11th House", symbol: "11", latin: "Benefacta", latinMeaning: "Benefits", modernTitle: "House of Blessings", keywords: "friends, networks, future vision", meaning: "The 11th House shows friendships, groups, communities, networks, hopes, and future-oriented goals.", beginner: "This is the house of community.", deeper: "It shows belonging, collective vision, social ideals, and long-range dreams.", watch: "It can become detached from personal intimacy if overemphasized.", example: "Saturn in the 11th House may take friendship and community seriously." },
  { name: "12th House", symbol: "12", latin: "Carcer", latinMeaning: "Prison / Liberation", modernTitle: "House of Sacrifice", keywords: "subconscious, solitude, hidden patterns", meaning: "The 12th House shows the subconscious, solitude, dreams, endings, hidden enemies, spirituality, and unseen patterns.", beginner: "This is the hidden house.", deeper: "It reveals what operates behind the scenes: dreams, fears, spiritual sensitivity, and unconscious material.", watch: "It can feel vague until reflected through solitude, therapy, dreams, or spiritual practice.", example: "Neptune in the 12th House may heighten dreams and spiritual sensitivity." },
];

const aspects = [
  { name: "Conjunction", symbol: "☌", keywords: "fusion, intensity, blending", meaning: "A conjunction blends two planets together so their meanings operate as one combined force.", beginner: "The planets are fused.", deeper: "This can create strength, intensity, focus, and difficulty separating the two energies.", watch: "It is powerful, but not automatically easy.", example: "Mercury conjunct Venus may blend communication with charm, beauty, and affection." },
  { name: "Opposition", symbol: "☍", keywords: "polarity, mirroring, balance", meaning: "An opposition places two planets across from each other, creating polarity and awareness through contrast.", beginner: "The planets face each other.", deeper: "Oppositions often show relationship themes, projection, and the need to integrate two sides.", watch: "It can feel like the other person carries the energy until it is owned.", example: "Venus opposite Pluto may create intense attraction, power themes, and transformation through love." },
  { name: "Square", symbol: "□", keywords: "tension, pressure, challenge", meaning: "A square creates friction between two planets, pushing growth through effort and conflict.", beginner: "The planets challenge each other.", deeper: "Squares create movement, pressure, and development. They can be frustrating but productive.", watch: "Do not read squares as only bad. They often create strength.", example: "Moon square Saturn may show emotional restraint, fear of vulnerability, or maturity through emotional discipline." },
  { name: "Trine", symbol: "△", keywords: "ease, talent, flow", meaning: "A trine shows natural harmony between planets, creating flow, talent, and ease.", beginner: "The planets support each other.", deeper: "Trines can feel natural and effortless, but sometimes they are underused because they do not create pressure.", watch: "Ease does not always mean growth. Sometimes comfort stays passive.", example: "Sun trine Jupiter may bring confidence, optimism, and growth." },
  { name: "Sextile", symbol: "✶", keywords: "opportunity, cooperation, activation", meaning: "A sextile shows supportive potential between planets that works best when consciously activated.", beginner: "The planets can cooperate.", deeper: "It is helpful, creative, and promising, but it usually needs action to become obvious.", watch: "A sextile can stay dormant if the person does not use it.", example: "Mars sextile Mercury may support quick decisions and direct speech." },
  { name: "Quincunx", symbol: "⚻", keywords: "adjustment, awkward fit, recalibration", meaning: "A quincunx shows two planets that do not naturally understand each other and require adjustment.", beginner: "The planets feel awkward together.", deeper: "It often creates a need to adapt, refine, and make two very different needs coexist.", watch: "It can feel confusing because the tension is subtle rather than direct.", example: "Moon quincunx Mars may need adjustment between emotional needs and instinctive action." },
];

const formulas = [
  { name: "Chart Formula", title: "Planet + Sign + House + Aspect + Correspondence", subtitle: "The basic structure for understanding any natal chart placement.", sections: [["Planet = What", "The planet tells you which part of life or psyche is being described. Venus is love and values. Mars is drive and action. Moon is emotions and needs."], ["Sign = How", "The sign tells you the style. Aries acts directly. Cancer acts emotionally. Virgo acts analytically. Scorpio acts intensely."], ["House = Where", "The house tells you the life area. 7th House is partnership. 10th House is career. 4th House is home. 8th House is intimacy and transformation."], ["Aspect = Modification", "The aspect tells you how another planet affects the placement. A trine supports, a square pressures, an opposition mirrors, and a conjunction fuses."], ["Metal = Symbolic Deepening", "The metal layer adds imagery and symbolic meaning. Saturn with lead suggests heaviness and endurance. Venus with copper suggests attraction and connection. Sun with gold suggests radiance and centered identity."], ["Example", "Moon in Scorpio in the 7th House square Saturn means emotional needs are deep and bonded, expressed through partnership, but shaped by lessons around trust, vulnerability, and emotional restraint."]] },
  { name: "Big Three", title: "The Big Three", subtitle: "Sun, Moon, and Rising are the first layer of the natal chart.", sections: [["Sun", "Your core identity, vitality, confidence, and conscious direction."], ["Moon", "Your emotional nature, instinctive needs, comfort patterns, and private self."], ["Rising", "Your outer expression, first impression, body language, and how the chart begins."], ["How to read them together", "The Sun shows who you are becoming. The Moon shows what you need emotionally. The Rising shows how you instinctively move through life."]] },
  { name: "Alchemy Layer", title: "The Alchemy Layer", subtitle: "A symbolic system connecting the seven classical planets with seven metals.", sections: [["Sun → Gold", "Radiance, royalty, life force, centeredness, incorruptibility, and conscious identity."], ["Moon → Silver", "Reflection, intuition, emotion, cycles, memory, receptivity, and inner life."], ["Mercury → Quicksilver", "Movement, language, exchange, intelligence, adaptability, and transformation."], ["Venus → Copper", "Attraction, beauty, sensuality, connection, harmony, and relational magnetism."], ["Mars → Iron", "Force, action, blood, weapons, assertion, courage, conflict, and effort."], ["Jupiter → Tin", "Expansion, blessing, law, wisdom, abundance, generosity, and growth."], ["Saturn → Lead", "Weight, time, mortality, limitation, endurance, discipline, and slow mastery."], ["How to use it", "Do not make this the first layer. Use it after the normal chart meaning to deepen the symbolism, imagery, and spiritual interpretation."]] },
];

const angles = [
  { name: "Ascendant", abbr: "AC / ASC", symbol: "↑", keywords: "first impression, outer self, chart doorway", sections: [["What it is", "The sign rising on the eastern horizon at the moment of birth. It marks the 1st House cusp and sets the entire house structure."], ["Beginner meaning", "The outer doorway. How you instinctively enter the world and how others first perceive you."], ["Deeper layer", "It shapes the habitual orientation to life: body language, first reactions, and the lens filtering all other planets. Because it determines house positions, birth time accuracy matters — the Ascendant shifts every two hours."], ["Watch for", "Do not reduce it to a mask or performance. The Ascendant is instinctive and embodied — a real part of the self, not a facade."], ["Also called", "Rising Sign. Abbreviated AC or ASC."], ["Example", "Sagittarius Rising may approach life with openness and forward motion, even when the Sun sign is more reserved."]] },
  { name: "Descendant", abbr: "DC / DSC", symbol: "↓", keywords: "partnership, projection, what we seek in others", sections: [["What it is", "Always directly opposite the Ascendant. If the Ascendant is Aries, the Descendant is Libra. It marks the cusp of the 7th House."], ["Beginner meaning", "The partnership doorway. What you are drawn to in others, what you attract, and what you may project outward."], ["Deeper layer", "The Descendant often describes qualities less developed in the self. We seek them in partners before recognizing them within. Integrating the Descendant means owning those qualities rather than always looking for them externally."], ["Watch for", "Planets near the Descendant can show both what we want in close relationships and what we habitually project onto others."], ["Also called", "DC, DSC. The opposition point of the Ascendant."], ["Example", "Libra Descendant (Aries Rising) may seek balance and diplomacy in others — or come to discover those qualities need development within."]] },
  { name: "Midheaven", abbr: "MC", symbol: "⬆", keywords: "career, vocation, public reputation, life direction", sections: [["What it is", "The highest point in the natal chart. It marks the cusp of the 10th House and is the most publicly visible part of the chart."], ["Beginner meaning", "Career, achievement, and public image. What you are known for and what you are building toward in the world."], ["Deeper layer", "The MC shows vocation (not just job title), authority and father patterns shaping life direction, and the reputation that grows over time. It is a direction of development, not a fixed career outcome."], ["Watch for", "Do not reduce it to a job title. The MC also speaks to calling, contribution, and how someone is seen at their most visible."], ["Also called", "MC, Medium Coeli (Latin: middle of the sky)."], ["Example", "Capricorn MC may develop earned authority, long-term structure, and respected achievement as a life direction."]] },
  { name: "Imum Coeli", abbr: "IC", symbol: "⬇", keywords: "roots, private foundation, ancestry, inner home", sections: [["What it is", "Always directly opposite the Midheaven. It marks the cusp of the 4th House and is the lowest, most private point of the chart."], ["Beginner meaning", "The private root. Emotional foundation, family of origin, ancestry, and the inner home carried within."], ["Deeper layer", "The IC shows what you come from — conditioning, family patterns, early environment. It is the foundation from which the Midheaven rises. Planets near the IC are deeply personal and often invisible to others until close intimacy is established."], ["Watch for", "The IC is interior. It tends to be felt privately rather than seen by others, and becomes most visible in close relationships or periods of deep introspection."], ["Also called", "IC, Imum Coeli (Latin: bottom of the sky), Nadir."], ["Example", "Cancer IC may carry deep emotional roots, strong ancestral sensitivity, and a need for private sanctuary."]] },
];

const dignityTerms = [
  { name: "Domicile", symbol: "♾", keywords: "planet at home, full strength, natural expression", sections: [["What it means", "A planet is in domicile when it occupies a sign it naturally rules. Here the planet operates freely and at full strength. There is a natural alignment between how the planet wants to function and what the sign provides."], ["Traditional term", "Also called rulership. A planet rules its domicile sign."], ["How to read it", "Domicile does not guarantee ease. It means the planet has full resources available and the energy is unfiltered and direct."], ["Example", "Venus in Taurus (its domicile) expresses love, beauty, and pleasure with ease, stability, and sensual richness."]] },
  { name: "Detriment", symbol: "⊖", keywords: "opposite domicile, awkward expression, growth through challenge", sections: [["What it means", "A planet is in detriment when it occupies the sign opposite its domicile. The sign's energy can work against the planet's natural mode of expression."], ["How to read it", "Detriment is not simply weakness. It creates tension, challenge, and the need for conscious development. The planet must work harder to express itself authentically."], ["Watch for", "Many placements in detriment produce unusual depth, compensatory strengths, or a distinct style precisely because the energy is not effortless."], ["Example", "Mars in Libra (detriment — Libra opposes Aries) may struggle with direct assertion, but can develop refined, diplomatic courage and thoughtful action."]] },
  { name: "Exaltation", symbol: "△", keywords: "honored, elevated expression, heightened quality", sections: [["What it means", "A planet is exalted when it occupies a specific sign where it is honored and operates at an elevated, refined level. Each planet has one traditional exaltation sign."], ["How to read it", "Exaltation shows a heightened, sometimes idealized expression of the planet's energy. The quality is rarefied or elevated above the everyday."], ["Watch for", "Exaltation can tip toward excess — too elevated or disconnected from grounded reality. It is strength with a note of caution about over-refinement."], ["Example", "Moon exalted in Taurus expresses emotional sensitivity with stability, patience, and sensory richness."]] },
  { name: "Fall", symbol: "▽", keywords: "opposite exaltation, diminished expression, requires extra effort", sections: [["What it means", "A planet is in fall when it occupies the sign opposite its exaltation. The planet operates in diminished or challenged conditions — the environment does not honor its natural expression."], ["How to read it", "Fall does not mean broken. It means the planet works with less support. Its expression may be subdued, redirected, or refined through difficulty."], ["Watch for", "Fall placements can produce depth and unusual skill. The planet is not absent — it is working harder in less favorable conditions."], ["Example", "Moon in fall in Scorpio must navigate emotional intensity and depth — challenging, but capable of profound emotional intelligence and resilience."]] },
];

const dignityTable = [
  { planet: "Sun", symbol: "☉", domicile: "Leo", detriment: "Aquarius", exaltation: "Aries", fall: "Libra" },
  { planet: "Moon", symbol: "☽", domicile: "Cancer", detriment: "Capricorn", exaltation: "Taurus", fall: "Scorpio" },
  { planet: "Mercury", symbol: "☿", domicile: "Gemini, Virgo", detriment: "Sagittarius, Pisces", exaltation: "Virgo", fall: "Pisces" },
  { planet: "Venus", symbol: "♀", domicile: "Taurus, Libra", detriment: "Scorpio, Aries", exaltation: "Pisces", fall: "Virgo" },
  { planet: "Mars", symbol: "♂", domicile: "Aries, Scorpio", detriment: "Libra, Taurus", exaltation: "Capricorn", fall: "Cancer" },
  { planet: "Jupiter", symbol: "♃", domicile: "Sagittarius, Pisces", detriment: "Gemini, Virgo", exaltation: "Cancer", fall: "Capricorn" },
  { planet: "Saturn", symbol: "♄", domicile: "Capricorn, Aquarius", detriment: "Cancer, Leo", exaltation: "Libra", fall: "Aries" },
  { planet: "Uranus", symbol: "♅", domicile: "Aquarius", detriment: "Leo", exaltation: "—", fall: "—" },
  { planet: "Neptune", symbol: "♆", domicile: "Pisces", detriment: "Virgo", exaltation: "—", fall: "—" },
  { planet: "Pluto", symbol: "♇", domicile: "Scorpio", detriment: "Taurus", exaltation: "—", fall: "—" },
];

const configurations = [
  { name: "Stellium", symbol: "⊞", keywords: "concentration, dominant theme, focused emphasis", sections: [["What it is", "Three or more planets grouped in the same sign or house, creating a concentration of energy in one area of the chart."], ["Beginner meaning", "When several planets cluster together, that sign or house becomes a dominant theme in the personality and life."], ["Deeper layer", "A stellium in a sign intensifies the qualities of that sign across multiple planets. A stellium in a house makes that life area a central, often complex focus. The planets interact closely and reinforce each other — they are difficult to separate."], ["Watch for", "Concentration can mean imbalance as well as strength. One area of life dominates while others may be quieter. The sign or house with a stellium often requires the most conscious attention."], ["Example", "Sun, Mercury, and Venus in Scorpio creates intense, private, psychologically deep energy across identity, thinking, and love. Three planets in the 7th House makes relationships a central and complex life theme."]] },
];

const glossary = [
  ["Planet", "The part of the psyche or life function being described."],
  ["Sign", "The style or behavior of a planet."],
  ["House", "The life area where a planet expresses itself."],
  ["Aspect", "The relationship between two planets."],
  ["Alchemy", "A symbolic tradition of transformation, often connecting planets, metals, colors, and inner development."],
  ["Gold", "The Sun's metal; symbolic of radiance, life force, centered identity, and incorruptible value."],
  ["Silver", "The Moon's metal; symbolic of reflection, intuition, emotion, cycles, and receptivity."],
  ["Lead", "Saturn's metal; symbolic of heaviness, time, limitation, endurance, and slow mastery."],
  ["Copper", "Venus's metal; symbolic of beauty, attraction, harmony, and connection."],
  ["Iron", "Mars's metal; symbolic of force, courage, blood, tools, weapons, and direct action."],
  ["Tin", "Jupiter's metal; symbolic of expansion, blessing, wisdom, and abundance."],
  ["Quicksilver", "Mercury's metal; symbolic of movement, exchange, speech, intelligence, and transformation."],
  ["Ascendant", "Also called the Rising sign. It describes first impressions and the chart doorway."],
  ["Midheaven", "The top of the chart, connected with career and public image."],
  ["Stellium", "Three or more planets grouped in one sign or house."],
  ["Retrograde", "A planet appearing to move backward from Earth's view. Often read as internalized or revised expression."],
  ["Element", "Fire, Earth, Air, or Water. The energetic type of a sign."],
  ["Modality", "Cardinal, Fixed, or Mutable. The movement style of a sign."],
];

function findByName(list, name) {
  return list.find(item => item.name === name);
}

function getData(type, name) {
  if (type === 'planet') return findByName(planets, name);
  if (type === 'sign') return findByName(signs, name);
  if (type === 'house') return findByName(houses, name);
  if (type === 'aspect') return findByName(aspects, name);
  if (type === 'formula') {
    const formula = formulas.find(item => item.name === name);
    return { name: formula.title, symbol: '✦', keywords: 'learning system', meaning: formula.subtitle, sections: formula.sections };
  }
  if (type === 'angle') return findByName(angles, name);
  if (type === 'dignity') return findByName(dignityTerms, name);
  if (type === 'configuration') return findByName(configurations, name);
  return null;
}

function ModalContent({ type, data }) {
  if (data.sections) {
    return data.sections.map((section, i) => (
      <div key={i} className="modal-section">
        <h4>{section[0]}</h4>
        <p>{section[1]}</p>
      </div>
    ));
  }
  if (type === 'planet') {
    return (
      <>
        <div className="modal-section"><h4>Core chart meaning</h4><p>{data.meaning}</p></div>
        <div className="modal-section">
          <h4>Traditional metal correspondence</h4>
          <p><strong>{data.metal}</strong> {data.metalSymbol !== '—' ? `(${data.metalSymbol})` : ''}</p>
          <p>{data.metalMeaning}</p>
        </div>
        <div className="modal-section"><h4>Symbolic bridge</h4><p>{data.symbolicBridge}</p></div>
        <div className="modal-section"><h4>Beginner meaning</h4><p>{data.beginner}</p></div>
        <div className="modal-section"><h4>Deeper layer</h4><p>{data.deeper}</p></div>
        <div className="modal-section"><h4>Watch for</h4><p>{data.watch}</p></div>
        <div className="modal-section"><h4>Example</h4><p>{data.example}</p></div>
      </>
    );
  }
  if (type === 'sign') {
    return (
      <>
        <div className="modal-section"><h4>Core meaning</h4><p>{data.meaning}</p></div>
        <div className="modal-section">
          <h4>Element, modality, ruler</h4>
          <ul>
            <li><strong>Element:</strong> {data.element}</li>
            <li><strong>Modality:</strong> {data.modality}</li>
            <li><strong>Ruler:</strong> {data.ruler}</li>
          </ul>
        </div>
        <div className="modal-section"><h4>Beginner meaning</h4><p>{data.beginner}</p></div>
        <div className="modal-section"><h4>Deeper layer</h4><p>{data.deeper}</p></div>
        <div className="modal-section"><h4>Watch for</h4><p>{data.watch}</p></div>
        <div className="modal-section"><h4>Example</h4><p>{data.example}</p></div>
      </>
    );
  }
  return (
    <>
      <div className="modal-section"><h4>Core meaning</h4><p>{data.meaning}</p></div>
      <div className="modal-section"><h4>Beginner meaning</h4><p>{data.beginner}</p></div>
      <div className="modal-section"><h4>Deeper layer</h4><p>{data.deeper}</p></div>
      <div className="modal-section"><h4>Watch for</h4><p>{data.watch}</p></div>
      <div className="modal-section"><h4>Example</h4><p>{data.example}</p></div>
    </>
  );
}

export default function NatalChartDecoder({ onBack }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [modal, setModal] = useState(null);
  const [glossaryQuery, setGlossaryQuery] = useState('');

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [modal]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setModal(null); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const openInfo = useCallback((type, name) => setModal({ type, name }), []);
  const closeModal = useCallback(() => setModal(null), []);

  const modalData = useMemo(() => modal ? getData(modal.type, modal.name) : null, [modal]);

  const filteredGlossary = useMemo(() => {
    if (!glossaryQuery.trim()) return glossary;
    const q = glossaryQuery.toLowerCase();
    return glossary.filter(([term, def]) => term.toLowerCase().includes(q) || def.toLowerCase().includes(q));
  }, [glossaryQuery]);

  const tabs = ['overview', 'planets', 'correspondences', 'houses', 'signs', 'aspects', 'concepts', 'glossary'];

  return (
    <div className="natal-decoder-body">
      <div className="app">
        <header className="topbar">
          <div className="brand">
            <div className="logo">✦</div>
            <div>
              <h1>Natal Chart Decoder</h1>
              <p>Astrology, signs, houses, aspects, and alchemical correspondences.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            {onBack && (
              <button
                onClick={onBack}
                style={{ border: '1px solid rgba(255,255,255,.22)', background: 'rgba(255,255,255,.07)', color: '#fff', padding: '10px 16px', borderRadius: '999px', backdropFilter: 'blur(16px)', fontSize: '.9rem', cursor: 'pointer' }}
              >
                ← Home
              </button>
            )}
            <div className="status-pill">Preview Mode · Correspondences added</div>
          </div>
        </header>

        <section className="hero">
          <div className="hero-inner">
            <div>
              <div className="eyebrow">✧ Astrology + alchemy learning interface</div>
              <h2>Decode the chart through <span>meaning layers.</span></h2>
              <p>This version keeps the natal chart formula simple, then adds the older symbolic layer: planets, metals, signs, houses, aspects, and popup explanations for each one.</p>
            </div>
            <div className="formula-card">
              <h3>The main formula</h3>
              <div className="formula-item"><strong>Planet</strong><span>What energy?</span></div>
              <div className="formula-item"><strong>Sign</strong><span>How does it behave?</span></div>
              <div className="formula-item"><strong>House</strong><span>Where does it show up?</span></div>
              <div className="formula-item"><strong>Aspect</strong><span>How is it modified?</span></div>
              <div className="formula-item"><strong>Metal</strong><span>What symbol deepens it?</span></div>
              <button className="learn-btn" onClick={() => openInfo('formula', 'Chart Formula')}>Open formula window</button>
            </div>
          </div>
        </section>

        <nav className="tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`tab-btn${activeTab === tab ? ' active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>

        <main>
          {activeTab === 'overview' && (
            <div className="grid grid-3">
              <article className="card">
                <div className="symbol">☉</div>
                <span className="tag">Core</span>
                <h3>Start with the Big Three</h3>
                <p>Sun, Moon, and Rising give the first layer of identity, emotional nature, and outer expression.</p>
                <button className="learn-btn" onClick={() => openInfo('formula', 'Big Three')}>Explain Big Three</button>
              </article>
              <article className="card">
                <div className="symbol">△</div>
                <span className="tag">Method</span>
                <h3>Use the formula</h3>
                <p>A placement makes more sense when it is broken into planet, sign, house, aspect, and symbolic correspondences.</p>
                <button className="learn-btn" onClick={() => openInfo('formula', 'Chart Formula')}>Explain formula</button>
              </article>
              <article className="card">
                <div className="symbol">♄</div>
                <span className="tag">Alchemy</span>
                <h3>Add correspondences</h3>
                <p>The old planet-metal system adds symbolic depth: Saturn with lead, Sun with gold, Moon with silver, and so on.</p>
                <button className="learn-btn" onClick={() => openInfo('formula', 'Alchemy Layer')}>Explain alchemy layer</button>
              </article>
            </div>
          )}


          {activeTab === 'planets' && (
            <div className="grid grid-4">
              {planets.map(item => (
                <article key={item.name} className="card library-card">
                  <div className="symbol">{item.symbol}</div>
                  <span className="tag">planet</span>
                  <h3>{item.name}</h3>
                  <p>{item.keywords}</p>
                  <button className="learn-btn" onClick={() => openInfo('planet', item.name)}>Open explanation</button>
                </article>
              ))}
            </div>
          )}

          {activeTab === 'correspondences' && (
            <>
              <div className="notice">These are symbolic astrology/alchemy correspondences, not health or nutrition advice. The metal layer is useful for meaning, mythology, color, imagery, and spiritual symbolism.</div>
              <div className="grid grid-3">
                {planets.filter(p => p.metalSymbol !== '—').map(planet => (
                  <article key={planet.name} className="card library-card">
                    <div className="metal-symbol">{planet.symbol}</div>
                    <span className="tag">{planet.name} → {planet.metal}</span>
                    <h3>{planet.metal} <span style={{ color: 'var(--muted)', fontSize: '.9rem' }}>{planet.metalSymbol}</span></h3>
                    <p>{planet.metalMeaning}</p>
                    <button className="learn-btn" onClick={() => openInfo('planet', planet.name)}>Open {planet.name} window</button>
                  </article>
                ))}
              </div>
            </>
          )}

          {activeTab === 'houses' && (
            <div className="grid grid-4">
              {houses.map(item => (
                <article key={item.name} className="card library-card">
                  <div className="symbol">{item.symbol}</div>
                  <span className="tag">house</span>
                  <h3>{item.name}</h3>
                  <p style={{ fontSize: '.8rem', color: 'var(--gold)', fontStyle: 'italic', marginBottom: '6px' }}>{item.latin} · {item.latinMeaning} · {item.modernTitle}</p>
                  <p>{item.keywords}</p>
                  <button className="learn-btn" onClick={() => openInfo('house', item.name)}>Open explanation</button>
                </article>
              ))}
            </div>
          )}

          {activeTab === 'signs' && (
            <div className="grid grid-4">
              {signs.map(item => (
                <article key={item.name} className="card library-card">
                  <div className="symbol">{item.symbol}</div>
                  <span className="tag">sign</span>
                  <h3>{item.name}</h3>
                  <p>{item.keywords}</p>
                  <button className="learn-btn" onClick={() => openInfo('sign', item.name)}>Open explanation</button>
                </article>
              ))}
            </div>
          )}

          {activeTab === 'aspects' && (
            <div className="grid grid-3">
              {aspects.map(item => (
                <article key={item.name} className="card library-card">
                  <div className="symbol">{item.symbol}</div>
                  <span className="tag">aspect</span>
                  <h3>{item.name}</h3>
                  <p>{item.keywords}</p>
                  <button className="learn-btn" onClick={() => openInfo('aspect', item.name)}>Open explanation</button>
                </article>
              ))}
            </div>
          )}

          {activeTab === 'concepts' && (
            <>
              <div className="notice">
                These are structural concepts that sit above the basic planet/sign/house formula. The four angles anchor the chart spatially. Dignities show where each planet is most and least at home. Patterns like stelliums show concentrated emphasis in one area.
              </div>

              <div className="section-label">The Four Angles</div>
              <div className="grid grid-4">
                {angles.map(item => (
                  <article key={item.name} className="card library-card">
                    <div className="symbol">{item.symbol}</div>
                    <span className="tag">{item.abbr}</span>
                    <h3>{item.name}</h3>
                    <p>{item.keywords}</p>
                    <button className="learn-btn" onClick={() => openInfo('angle', item.name)}>Open explanation</button>
                  </article>
                ))}
              </div>

              <div className="section-label" style={{ marginTop: '28px' }}>Planetary Dignities</div>
              <div className="grid grid-4">
                {dignityTerms.map(item => (
                  <article key={item.name} className="card library-card">
                    <div className="symbol">{item.symbol}</div>
                    <span className="tag">dignity</span>
                    <h3>{item.name}</h3>
                    <p>{item.keywords}</p>
                    <button className="learn-btn" onClick={() => openInfo('dignity', item.name)}>Open explanation</button>
                  </article>
                ))}
              </div>

              <div className="dignity-table-wrap">
                <h4>Dignity reference table</h4>
                <table className="dignity-table">
                  <thead>
                    <tr>
                      <th>Planet</th>
                      <th>Domicile</th>
                      <th>Detriment</th>
                      <th>Exaltation</th>
                      <th>Fall</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dignityTable.map(row => (
                      <tr key={row.planet}>
                        <td>{row.symbol} {row.planet}</td>
                        <td>{row.domicile}</td>
                        <td>{row.detriment}</td>
                        <td>{row.exaltation}</td>
                        <td>{row.fall}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="section-label" style={{ marginTop: '28px' }}>Chart Patterns</div>
              <div className="grid grid-3">
                {configurations.map(item => (
                  <article key={item.name} className="card library-card">
                    <div className="symbol">{item.symbol}</div>
                    <span className="tag">pattern</span>
                    <h3>{item.name}</h3>
                    <p>{item.keywords}</p>
                    <button className="learn-btn" onClick={() => openInfo('configuration', item.name)}>Open explanation</button>
                  </article>
                ))}
              </div>
            </>
          )}

          {activeTab === 'glossary' && (
            <>
              <div className="search-row">
                <input
                  type="text"
                  placeholder="Search terms: stellium, retrograde, square, gold, Saturn..."
                  value={glossaryQuery}
                  onChange={e => setGlossaryQuery(e.target.value)}
                />
              </div>
              <div className="grid grid-3">
                {filteredGlossary.map(item => (
                  <article key={item[0]} className="card">
                    <span className="tag">Glossary</span>
                    <h3>{item[0]}</h3>
                    <p>{item[1]}</p>
                  </article>
                ))}
              </div>
            </>
          )}
        </main>

        <p className="footer-note">Preview build · No external libraries · Popup windows for astrology and alchemy learning.</p>
      </div>

      {modal && modalData && (
        <div
          className="modal-backdrop"
          onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="modal-window" role="dialog" aria-modal="true">
            <div className="modal-top">
              <div>
                <div className="modal-kicker">{modal.type.toUpperCase()}</div>
                <h2 className="modal-title">{modalData.symbol || '✦'} {modalData.name}</h2>
                <p className="modal-subtitle">{modalData.keywords || modalData.meaning}</p>
              </div>
              <button className="modal-close" onClick={closeModal} aria-label="Close popup">×</button>
            </div>
            <div className="modal-body">
              <ModalContent type={modal.type} data={modalData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
