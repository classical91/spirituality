import { lazy, Suspense, useEffect, useId, useMemo, useRef, useState } from "react";
import { prayerThemesCategories, prayerTextByTitle } from "./data/prayerThemes";
import { angels, ANGEL_FILTERS } from "./data/angels";
import { demonologyArticleIds } from "./data/demonologyIds";
import { readJSON, writeJSON } from "./lib/storage";
import { filterByQuery, nextSort, normalizeInitialSection, sortRows } from "./lib/moralAtlas";

// The two embedded atlases (and the 180 KB demonology article set behind the
// first) load only when their section is opened.
const DemonologyAtlas = lazy(() => import("./DemonologyAtlas"));
const InfernalCodex = lazy(() => import("./InfernalCodex"));

const tabs = [
  { id: "overview", label: "Overview", icon: "✦" },
  { id: "commandments", label: "10 Commandments", icon: "✥" },
  { id: "virtues", label: "Virtues", icon: "✧" },
  { id: "sins", label: "7 Deadly Sins", icon: "☿" },
  { id: "inferno", label: "Dante Inferno", icon: "◉" },
  { id: "demons", label: "Demon Princes", icon: "♆" },
  { id: "angels", label: "Angelology", icon: "✸" },
  { id: "demonology-atlas", label: "Demonology Atlas", icon: "♆" },
  { id: "infernal-codex", label: "Infernal Codex", icon: "✦" },
  { id: "prayers", label: "Prayer Themes", icon: "✿" },
  { id: "map", label: "Sin Map", icon: "⌁" },
  { id: "wheel", label: "Soul · Spirit · Body", icon: "◈" },
  { id: "love-deities", label: "Love Deities", icon: "♀" },
];

const embeddedAtlasTabs = new Set(["demonology-atlas", "infernal-codex"]);
const SECTION_LINKS = {
  tabIds: new Set(tabs.map((tab) => tab.id)),
  articleIds: new Set(demonologyArticleIds),
};

const commandments = [
  {
    id: 1,
    title: "No other gods before God",
    short: "Worship and allegiance",
    scripture: "Exodus 20:3",
    focus: "Loyalty of the heart. What has ultimate authority over desire, fear, and identity?",
    reflection: "Where do I give something created the power that belongs only to God?",
    virtue: "Faithfulness",
    linkedSin: "Pride / Idolatry",
    plain: "Do not make a created thing your final source of meaning.",
  },
  {
    id: 2,
    title: "Do not make idols",
    short: "Images, substitutes, false devotion",
    scripture: "Exodus 20:4–6",
    focus: "The danger of replacing living devotion with a controllable image, ritual, object, or obsession.",
    reflection: "Am I relating to truth directly, or worshiping a symbol of it?",
    virtue: "Reverence",
    linkedSin: "Pride / Greed",
    plain: "Do not shrink the divine into something you can own, control, or manipulate.",
  },
  {
    id: 3,
    title: "Do not misuse God's name",
    short: "Speech, vows, sacred language",
    scripture: "Exodus 20:7",
    focus: "Integrity between sacred words and actual character.",
    reflection: "Do my words carry truth, or am I using holy language to cover ego?",
    virtue: "Truthfulness",
    linkedSin: "Pride / False witness",
    plain: "Do not use sacred language carelessly, manipulatively, or falsely.",
  },
  {
    id: 4,
    title: "Remember the Sabbath",
    short: "Rest, rhythm, worship",
    scripture: "Exodus 20:8–11",
    focus: "A boundary against endless productivity, anxiety, and self-importance.",
    reflection: "Do I live like everything depends on my striving?",
    virtue: "Trust / Temperance",
    linkedSin: "Greed / Sloth distortion",
    plain: "Keep a sacred rhythm of rest, worship, and restoration.",
  },
  {
    id: 5,
    title: "Honor your father and mother",
    short: "Lineage, gratitude, order",
    scripture: "Exodus 20:12",
    focus: "Respect for origin, family responsibility, and generational order without excusing harm.",
    reflection: "Can I honor what gave me life while still keeping wise boundaries?",
    virtue: "Gratitude / Justice",
    linkedSin: "Pride / Wrath",
    plain: "Respect the people and structures that carried life to you, while acting with wisdom.",
  },
  {
    id: 6,
    title: "Do not murder",
    short: "Life, hatred, violence",
    scripture: "Exodus 20:13",
    focus: "Protection of life, and the inner roots of contempt, cruelty, and rage.",
    reflection: "Where do I dehumanize someone in my thoughts, words, or actions?",
    virtue: "Patience / Mercy",
    linkedSin: "Wrath",
    plain: "Do not destroy innocent life; guard against hatred that moves toward harm.",
  },
  {
    id: 7,
    title: "Do not commit adultery",
    short: "Covenant, fidelity, desire",
    scripture: "Exodus 20:14",
    focus: "The protection of trust, intimacy, promise, and relational holiness.",
    reflection: "Is my desire serving covenant, or consuming another person?",
    virtue: "Chastity / Faithfulness",
    linkedSin: "Lust",
    plain: "Do not violate committed love through betrayal or possessive desire.",
  },
  {
    id: 8,
    title: "Do not steal",
    short: "Property, dignity, fairness",
    scripture: "Exodus 20:15",
    focus: "Respect for what belongs to another: possessions, labor, time, trust, and dignity.",
    reflection: "Where do I take what is not freely given?",
    virtue: "Justice / Charity",
    linkedSin: "Greed",
    plain: "Do not take what belongs to another person.",
  },
  {
    id: 9,
    title: "Do not bear false witness",
    short: "Truth, testimony, reputation",
    scripture: "Exodus 20:16",
    focus: "Truthfulness in speech, especially when another person's reputation or justice is at stake.",
    reflection: "Do my words reveal reality or reshape it for advantage?",
    virtue: "Honesty / Integrity",
    linkedSin: "Envy / Pride",
    plain: "Do not lie against your neighbor or distort truth for gain.",
  },
  {
    id: 10,
    title: "Do not covet",
    short: "Desire, comparison, craving",
    scripture: "Exodus 20:17",
    focus: "The hidden interior commandment: the heart's relationship to desire, comparison, and entitlement.",
    reflection: "Can I desire good things without resenting another person's good?",
    virtue: "Contentment / Gratitude",
    linkedSin: "Envy / Greed",
    plain: "Do not let comparison turn desire into resentment or grasping.",
  },
];

const virtues = [
  {
    title: "Humility",
    family: "Heavenly virtue",
    opposite: "Pride",
    summary: "Seeing yourself truthfully without self-erasure or self-exaltation.",
    practice: "Receive correction without collapse. Give credit without needing to be center-stage.",
    shadow: "Fake humility can become another form of pride.",
  },
  {
    title: "Charity",
    family: "Heavenly / theological virtue",
    opposite: "Greed",
    summary: "Love that gives, protects, and seeks the good of another.",
    practice: "Ask: what is the loving action, not just the emotionally intense action?",
    shadow: "Giving without wisdom can become self-abandonment.",
  },
  {
    title: "Chastity",
    family: "Heavenly virtue",
    opposite: "Lust",
    summary: "Integrated desire. Sexual energy ordered by love, dignity, and truth.",
    practice: "Notice whether desire is honoring a person or reducing them to a feeling.",
    shadow: "Chastity is not hatred of the body; it is reverence for the person.",
  },
  {
    title: "Gratitude",
    family: "Heavenly virtue",
    opposite: "Envy",
    summary: "The ability to recognize received good without comparison poisoning it.",
    practice: "Name what is already present before chasing what is absent.",
    shadow: "Gratitude should not be used to deny real grief or injustice.",
  },
  {
    title: "Temperance",
    family: "Heavenly / cardinal virtue",
    opposite: "Gluttony",
    summary: "Healthy measure. The power to enjoy without being ruled by appetite.",
    practice: "Pause before excess and ask: is this nourishing me or numbing me?",
    shadow: "Over-control can become fear disguised as discipline.",
  },
  {
    title: "Patience",
    family: "Heavenly virtue",
    opposite: "Wrath",
    summary: "Strength that does not need immediate revenge, discharge, or domination.",
    practice: "Create space between the trigger and the response.",
    shadow: "Patience does not mean tolerating abuse or avoiding necessary action.",
  },
  {
    title: "Diligence",
    family: "Heavenly virtue",
    opposite: "Sloth",
    summary: "Faithful effort toward what is good, even when motivation is low.",
    practice: "Do the next honest action instead of waiting for perfect inspiration.",
    shadow: "Diligence can become burnout when it loses rest and love.",
  },
  {
    title: "Prudence",
    family: "Cardinal virtue",
    opposite: "Foolishness",
    summary: "Clear judgment about what is good and how to act in the real situation.",
    practice: "Slow down enough to see consequences, context, and timing.",
    shadow: "Overthinking can impersonate prudence.",
  },
  {
    title: "Justice",
    family: "Cardinal virtue",
    opposite: "Injustice",
    summary: "Giving God, others, and yourself what is rightly due.",
    practice: "Ask what is fair, truthful, and owed here.",
    shadow: "Justice without mercy can become cold punishment.",
  },
  {
    title: "Fortitude",
    family: "Cardinal virtue",
    opposite: "Cowardice",
    summary: "Courage to remain faithful to the good under pressure.",
    practice: "Choose the right action even when fear is present.",
    shadow: "Recklessness is not courage; it is impulse wearing armor.",
  },
  {
    title: "Faith",
    family: "Theological virtue",
    opposite: "Unbelief / despair distortion",
    summary: "Trustful orientation toward God beyond what you can fully control.",
    practice: "Act from trust, not just from proof-seeking.",
    shadow: "Faith should not become denial of reality or responsibility.",
  },
  {
    title: "Hope",
    family: "Theological virtue",
    opposite: "Despair",
    summary: "Confidence that goodness and redemption remain possible.",
    practice: "Keep moving toward the good without demanding instant evidence.",
    shadow: "Hope is not passive fantasy; it needs faithful movement.",
  },
];

const sins = [
  {
    title: "Pride",
    latin: "Superbia",
    desire: "To be supreme, untouchable, or self-created.",
    distortion: "Identity becomes inflated. Correction feels like death. God and neighbor become rivals.",
    antidote: "Humility",
    watch: "Needing to be right, seen, superior, or immune to accountability.",
    commandment: "No other gods / No idols",
    dante: "Often reflected through Lucifer's fall and the deeper logic of rebellion.",
    demon: "Lucifer",
  },
  {
    title: "Greed",
    latin: "Avaritia",
    desire: "To possess, accumulate, and secure the self through having.",
    distortion: "Good things become substitutes for trust. People become resources.",
    antidote: "Charity",
    watch: "Fear of enough, hoarding, using others, worshiping gain.",
    commandment: "Do not steal / Do not covet",
    dante: "Circle 4: Avarice and prodigality.",
    demon: "Mammon",
  },
  {
    title: "Lust",
    latin: "Luxuria",
    desire: "To consume beauty, pleasure, or intimacy without covenantal love.",
    distortion: "The person becomes an object for feeling, fantasy, power, or escape.",
    antidote: "Chastity",
    watch: "Intensity without responsibility; desire without dignity.",
    commandment: "Do not commit adultery / Do not covet",
    dante: "Circle 2: Lust, blown by restless winds.",
    demon: "Asmodeus",
  },
  {
    title: "Envy",
    latin: "Invidia",
    desire: "To have another person's good or to resent that they have it.",
    distortion: "Another person's blessing feels like your diminishment.",
    antidote: "Gratitude",
    watch: "Comparison, resentment, secret pleasure when someone falls.",
    commandment: "Do not covet / Do not bear false witness",
    dante: "More central in Purgatorio than Inferno, but the logic overlaps with coveting.",
    demon: "Leviathan",
  },
  {
    title: "Gluttony",
    latin: "Gula",
    desire: "To over-consume comfort, sensation, food, drink, or stimulation.",
    distortion: "Appetite becomes a master instead of a servant.",
    antidote: "Temperance",
    watch: "Numbing, excess, compulsive consumption, inability to stop.",
    commandment: "Sabbath rhythm / No idols",
    dante: "Circle 3: Gluttony, cold filthy rain and mire.",
    demon: "Beelzebub",
  },
  {
    title: "Wrath",
    latin: "Ira",
    desire: "To punish, dominate, retaliate, or discharge pain as destruction.",
    distortion: "Justice becomes revenge; pain becomes permission to harm.",
    antidote: "Patience",
    watch: "Contempt, revenge fantasies, explosive reaction, cold resentment.",
    commandment: "Do not murder / Honor father and mother",
    dante: "Circle 5: Wrath and sullenness in the Styx.",
    demon: "Satan",
  },
  {
    title: "Sloth",
    latin: "Acedia",
    desire: "To avoid the weight of love, responsibility, effort, or spiritual growth.",
    distortion: "The soul grows passive toward its own good.",
    antidote: "Diligence",
    watch: "Avoidance, numbness, procrastination, spiritual heaviness, wasted gifts.",
    commandment: "Remember the Sabbath, properly understood as holy rest not avoidance.",
    dante: "Not one simple Inferno circle; acedia is developed strongly in medieval moral theology.",
    demon: "Belphegor",
  },
];

const inferno = [
  {
    circle: 1,
    title: "Limbo",
    category: "Virtuous pagans / unbaptized",
    meaning: "A realm of natural virtue without the fullness of divine vision.",
    imagery: "A noble castle and sorrow without torment.",
    link: "Human goodness without salvation, in Dante's medieval Christian imagination.",
  },
  {
    circle: 2,
    title: "Lust",
    category: "Incontinence",
    meaning: "Desire that overpowers reason and covenant.",
    imagery: "Souls blown by violent winds, mirroring restless passion.",
    link: "Connects directly with the deadly sin of lust.",
  },
  {
    circle: 3,
    title: "Gluttony",
    category: "Incontinence",
    meaning: "Appetite without measure, pleasure turned into degradation.",
    imagery: "Cold rain, mud, filth, and Cerberus.",
    link: "Connects directly with the deadly sin of gluttony.",
  },
  {
    circle: 4,
    title: "Greed",
    category: "Incontinence",
    meaning: "Disordered relationship to wealth: hoarding and wasting.",
    imagery: "Souls pushing heavy weights against each other.",
    link: "Connects directly with avarice/greed.",
  },
  {
    circle: 5,
    title: "Wrath",
    category: "Incontinence",
    meaning: "Anger expressed as violence or buried as sullen resentment.",
    imagery: "The river Styx, fighting above the swamp and choking below it.",
    link: "Connects directly with wrath.",
  },
  {
    circle: 6,
    title: "Heresy",
    category: "Lower Hell begins",
    meaning: "A false doctrine about ultimate reality, especially the soul and resurrection in Dante's context.",
    imagery: "Fiery tombs holding heretics.",
    link: "More doctrinal than one-to-one with the seven deadly sins.",
  },
  {
    circle: 7,
    title: "Violence",
    category: "Malice",
    meaning: "Violence against neighbor, self, God, nature, and art/order.",
    imagery: "Boiling blood, the wood of suicides, and burning sand.",
    link: "Often overlaps with wrath, despair, and rebellion.",
  },
  {
    circle: 8,
    title: "Fraud",
    category: "Malice through deception",
    meaning: "The abuse of reason, speech, office, trust, and influence.",
    imagery: "Malebolge: ten ditches of corrupt social exchange.",
    link: "Connects with lying, manipulation, hypocrisy, and corrupt ambition.",
  },
  {
    circle: 9,
    title: "Treachery",
    category: "Deepest malice",
    meaning: "Betrayal of special trust: family, community, guests, benefactors, and God.",
    imagery: "Cocytus, a frozen lake; Satan trapped in ice at the center.",
    link: "Dante places betrayal below passion because it corrupts love and trust deliberately.",
  },
];

const demons = [
  {
    name: "Lucifer",
    sin: "Pride",
    tradition: "Binsfeld / Dante / Christian literary demonology",
    association: "Pride as self-exaltation, rebellion, and the refusal to receive being as gift.",
    note: "Often treated as the archetype of pride because of the fall-from-heaven motif.",
    clarity: "This is a theological-literary association, not a simple Bible verse equation.",
  },
  {
    name: "Mammon",
    sin: "Greed",
    tradition: "New Testament language + later demonology",
    association: "Wealth, avarice, and the spiritual danger of serving gain as master.",
    note: "In Matthew 6:24, Mammon represents wealth as a rival master; later demonology personifies it.",
    clarity: "Best shown as 'wealth personified' rather than just a monster character.",
  },
  {
    name: "Asmodeus",
    sin: "Lust",
    tradition: "Tobit / Binsfeld demonology",
    association: "Disordered sexual desire, possessiveness, and destructive passion.",
    note: "Asmodeus appears in Tobit and later becomes strongly connected with lust in demonological lists.",
    clarity: "Great card for explaining how desire becomes domination.",
  },
  {
    name: "Leviathan",
    sin: "Envy",
    tradition: "Biblical sea monster imagery + Binsfeld demonology",
    association: "Envy, twisting, rivalry, chaos, and resentment of another's good.",
    note: "Biblically, Leviathan is a chaos-beast image; demonology later maps it to envy.",
    clarity: "Use as symbolic theology/mythic imagery, not a neat doctrine box.",
  },
  {
    name: "Beelzebub / Beelzebul",
    sin: "Gluttony",
    tradition: "Gospels + Binsfeld demonology",
    association: "Corruption of appetite, filth, decay, and consuming excess.",
    note: "In the Gospels, Beelzebul is called a ruler of demons by Jesus' opponents; later lists connect Beelzebub with gluttony.",
    clarity: "The Gospel reference and the deadly-sin pairing come from different layers of tradition.",
  },
  {
    name: "Satan",
    sin: "Wrath",
    tradition: "Biblical adversary + Binsfeld demonology",
    association: "Accusation, opposition, hatred, rage, and spiritual adversarial force.",
    note: "In Binsfeld's seven-princes list, Satan is mapped to wrath.",
    clarity: "Biblically, Satan is broader than wrath alone: adversary, tempter, accuser.",
  },
  {
    name: "Belphegor",
    sin: "Sloth",
    tradition: "Binsfeld demonology / later occult literature",
    association: "Acedia, spiritual laziness, avoidance, clever excuses, and wasted gifts.",
    note: "Useful as the 'comfort trap' card: ease that drains purpose.",
    clarity: "More demonological folklore than central biblical figure.",
  },
  {
    name: "Abaddon / Apollyon",
    sin: "Destruction",
    tradition: "Revelation imagery",
    association: "The abyss, destruction, and apocalyptic judgment imagery.",
    note: "Good for a separate 'biblical names' section because it is not one of Binsfeld's seven sin princes.",
    clarity: "Do not force it into the seven deadly sins; treat it as apocalyptic symbolism.",
  },
  {
    name: "Legion",
    sin: "Fragmentation / possession motif",
    tradition: "Gospel narrative",
    association: "A many-voiced condition of disorder, bondage, and loss of self-command.",
    note: "Works well as a narrative case study, not a formal demonology rank.",
    clarity: "Use carefully: it is a Gospel episode, not a moral category by itself.",
  },
  {
    name: "Azazel",
    sin: "Scapegoat / wilderness motif",
    tradition: "Leviticus imagery + later interpretation",
    association: "Removal of sin, wilderness, impurity, and later demonological speculation.",
    note: "Could be a symbolic card for projection, exile, and carried guilt.",
    clarity: "There are different interpretations; label it as debated.",
  },
];

// Comprehensive comparative classification of the seven deadly sins and the
// demon "princes" assigned to each by the two main historical schemes. The two
// schemes disagree on several pairings — the table makes those divergences
// visible rather than presenting one list as definitive doctrine.
const demonClassification = [
  {
    sin: "Pride",
    latin: "Superbia",
    binsfeld: "Lucifer",
    lanterne: "Lucifer",
    virtue: "Humility",
    dante: "Logic of the fall; Satan frozen at the center (Circle 9)",
    agree: true,
    note: "Both schemes agree: pride is the root rebellion, archetypally Lucifer's refusal to receive being as gift.",
  },
  {
    sin: "Greed",
    latin: "Avaritia",
    binsfeld: "Mammon",
    lanterne: "Mammon",
    virtue: "Charity",
    dante: "Circle 4 — hoarders and wasters",
    agree: true,
    note: "Both schemes agree: Mammon personifies wealth set up as a rival master (Matthew 6:24).",
  },
  {
    sin: "Lust",
    latin: "Luxuria",
    binsfeld: "Asmodeus",
    lanterne: "Asmodeus",
    virtue: "Chastity",
    dante: "Circle 2 — souls blown by restless winds",
    agree: true,
    note: "Both schemes agree: Asmodeus (from the Book of Tobit) governs disordered desire.",
  },
  {
    sin: "Wrath",
    latin: "Ira",
    binsfeld: "Satan (Amon)",
    lanterne: "Satan",
    virtue: "Patience",
    dante: "Circle 5 — the wrathful and sullen in the Styx",
    agree: true,
    note: "Both schemes agree: Satan, the adversary, maps to wrath — though biblically Satan is far broader than a single sin.",
  },
  {
    sin: "Envy",
    latin: "Invidia",
    binsfeld: "Leviathan",
    lanterne: "Beelzebub",
    virtue: "Kindness / Gratitude",
    dante: "Developed in Purgatorio; overlaps with coveting",
    agree: false,
    note: "The schemes diverge: Binsfeld assigns the chaos-beast Leviathan to envy, while the Lanterne of Light assigns Beelzebub.",
  },
  {
    sin: "Gluttony",
    latin: "Gula",
    binsfeld: "Beelzebub",
    lanterne: "Belphegor",
    virtue: "Temperance",
    dante: "Circle 3 — cold filthy rain and mire, guarded by Cerberus",
    agree: false,
    note: "The schemes diverge: Binsfeld names Beelzebub for gluttony, but the Lanterne of Light names Belphegor.",
  },
  {
    sin: "Sloth",
    latin: "Acedia",
    binsfeld: "Belphegor",
    lanterne: "Abaddon",
    virtue: "Diligence",
    dante: "Not a single circle; developed in medieval moral theology",
    agree: false,
    note: "The schemes diverge: Binsfeld assigns Belphegor to sloth, while the Lanterne of Light assigns Abaddon (Apollyon).",
  },
];

const wheelSoulIssues = [
  {
    id: 1,
    title: "Inferiority",
    family: "Soul · Personality",
    scripture: "Romans 15:7",
    summary: "A deep-seated sense of being less than others, fundamentally defective, or unworthy of love and belonging.",
    root: "Identity anchored in performance, comparison, or wounds received — rather than in being received by God.",
    spiritAnswer: "Acceptance: God receives us as we are in Christ, not on the basis of merit (Romans 15:7; Ephesians 1:6).",
    soulEffect: "Projects outward as people-pleasing, withdrawal, or chronic comparison with others.",
  },
  {
    id: 2,
    title: "Insecurity",
    family: "Soul · Personality",
    scripture: "Romans 8:38–39",
    summary: "Chronic anxiety about one's standing, relationships, or future — a restless inability to feel safe.",
    root: "Trust anchored in changeable things — approval, achievement, health — rather than in God's unchanging character.",
    spiritAnswer: "Security: nothing in all creation can separate us from the love of God in Christ Jesus (Romans 8:38–39).",
    soulEffect: "Drives controlling behavior, fear of abandonment, and constant reassurance-seeking.",
  },
  {
    id: 3,
    title: "Inadequacy",
    family: "Soul · Personality",
    scripture: "2 Corinthians 3:5",
    summary: "A felt inability to meet the demands of life, God, or others — a sense that one does not have what it takes.",
    root: "Living under law (self-effort) rather than grace. Trying to generate strength from within rather than receiving it from God.",
    spiritAnswer: "Assurance: our adequacy comes from God, not from ourselves (2 Corinthians 3:5; Philippians 4:13).",
    soulEffect: "Produces avoidance, perfectionism, and paralysis in the face of responsibility.",
  },
  {
    id: 4,
    title: "Guilt",
    family: "Soul · Personality",
    scripture: "1 John 1:9",
    summary: "Real guilt arises from actual sin and needs confession and forgiveness. Imaginary guilt arises from false accusation or perfectionism and needs truth, not penance.",
    root: "Real guilt: unconfessed sin. Imaginary guilt: a false standard replacing God's actual word about the person.",
    spiritAnswer: "Salvation: real sin is fully forgiven through Christ's atoning work. Truth from Scripture displaces false guilt.",
    note: "The diagram distinguishes Real (Sin) guilt from Imaginary guilt — a critical pastoral and psychological distinction.",
  },
  {
    id: 5,
    title: "Worry, Doubts, and Fears",
    family: "Soul · Personality",
    scripture: "Philippians 4:6–7",
    summary: "Persistent cognitive and emotional distress about self, God, others, or the future — including anxious questioning of salvation, God's love, or one's own worth.",
    root: "A spirit not yet resting in God's sovereign care continually generates anxious soul patterns. Doubts flourish where assurance is absent.",
    spiritAnswer: "Assurance and Security together: 'be anxious for nothing; the peace of God guards heart and mind' (Philippians 4:6–7).",
    soulEffect: "Manifests in the mind as fantasy or paranoia and in the body as tension, insomnia, and hypertension.",
  },
];

const wheelMindPatterns = [
  {
    title: "Fantasy",
    tag: "Mind",
    family: "Soul · Mind Pattern",
    summary: "Habitual escape from present reality through imagination — often a response to unbearable pain, boredom, or lack of identity.",
    connection: "Rooted in inadequacy and insecurity; the mind constructs a world where those wounds do not exist.",
  },
  {
    title: "Paranoia",
    tag: "Mind",
    family: "Soul · Mind Pattern",
    summary: "Disordered suspicion; perceiving threat and ill intent where little or none exists.",
    connection: "Rooted in insecurity and fear; the threat-detection system remains chronically activated.",
  },
  {
    title: "Obsessive Thoughts",
    tag: "Mind",
    family: "Soul · Mind Pattern",
    summary: "Intrusive, recurring thought patterns that cannot be dismissed by willpower alone.",
    connection: "Often rooted in guilt, inadequacy, or fear. The mind loops around what remains unresolved.",
  },
  {
    title: "Psychoses",
    tag: "Mind",
    family: "Soul · Mind Pattern",
    summary: "Severe disconnection from shared reality; may include hallucinations or profound disorganization.",
    connection: "The most extreme expression of a mind unable to integrate interior experience. Requires clinical care alongside spiritual support.",
  },
];

const wheelEmotions = [
  {
    title: "Depression",
    tag: "Emotion",
    family: "Soul · Emotional Pattern",
    summary: "Collapsed emotional energy, pervasive hopelessness, and inability to feel pleasure or purpose.",
    connection: "Often rooted in guilt, inferiority, and a sense of being cut off from God's love or forgiveness.",
  },
  {
    title: "Anxiety",
    tag: "Emotion",
    family: "Soul · Emotional Pattern",
    summary: "Anticipatory dread and hyper-vigilant threat response — the emotional experience of insecurity and fear.",
    connection: "Directly connected to worry and doubts at the soul level; expressed in the body as tension, palpitations, and insomnia.",
  },
];

const wheelSpiritRealities = [
  {
    id: 1,
    title: "Salvation",
    family: "Spirit · Foundation",
    scripture: "Romans 10:9–10; Ephesians 2:8–9",
    summary: "The foundational reality: sin forgiven, spiritual death reversed, new life in Christ begun. Salvation is the entry point of all spiritual renewal.",
    soulEffect: "Directly addresses real guilt. The atonement is God's answer to actual sin — not performance, not self-punishment.",
    bodyEffect: "Removes the chronic burden of unresolved guilt that drives psychosomatic stress.",
  },
  {
    id: 2,
    title: "Assurance",
    family: "Spirit · Confidence",
    scripture: "1 John 5:13; Romans 8:16",
    summary: "The settled confidence that salvation is secure, that God's word about you is true, and that the Spirit himself bears witness with your spirit.",
    soulEffect: "Counters doubt, fear, inadequacy, and the recurring question 'Am I really saved / loved / enough?'",
    bodyEffect: "Reduces the chronic activation of doubt-driven anxiety that produces physical stress symptoms.",
  },
  {
    id: 3,
    title: "Security",
    family: "Spirit · Stability",
    scripture: "Romans 8:38–39; John 10:28–29",
    summary: "The unshakeable knowledge that nothing — death, life, angels, powers, present, or future — can separate us from God's love in Christ.",
    soulEffect: "Directly displaces insecurity, chronic worry, and fear at the soul level.",
    bodyEffect: "The body can release its vigilance posture when the spirit rests in unbreakable security.",
  },
  {
    id: 4,
    title: "Acceptance",
    family: "Spirit · Identity",
    scripture: "Romans 15:7; Ephesians 1:6",
    summary: "God has received and welcomed us fully in Christ — not on the basis of performance, appearance, or comparison with others.",
    soulEffect: "Speaks directly to inferiority and the false self built on approval-seeking.",
    bodyEffect: "Relieves the physiological toll of chronic striving for acceptance.",
  },
  {
    id: 5,
    title: "Total Commitment",
    family: "Spirit · Integration",
    scripture: "Romans 12:1",
    summary: "Offering the whole self — body, soul, and spirit — as a living sacrifice to God. This is the integrating act that aligns all three dimensions of the person.",
    soulEffect: "When the will yields fully to God, the soul's disordered patterns lose their governing power.",
    bodyEffect: "The body offered to God as a living sacrifice becomes a vessel for life rather than a container of unresolved stress.",
    note: "Romans 12:1 is the scripture cited on the original wheel diagram at the peak of the Spirit dimension.",
  },
];

const wheelBodySymptoms = [
  { title: "Tension Headache / Migraine", category: "Neurological", family: "Body · Psychosomatic", summary: "Chronic muscle tension in the scalp, neck, and shoulders from sustained stress posture produces headaches and migraines.", soulLink: "Most commonly linked to worry, fear, and inadequacy." },
  { title: "Nervous Stomach / Peptic Ulcer", category: "Gastrointestinal", family: "Body · Psychosomatic", summary: "The enteric nervous system is highly stress-sensitive. Anxiety and unresolved guilt produce excess acid and gastrointestinal distress.", soulLink: "Linked to anxiety, guilt, and chronic worry." },
  { title: "Hives, Skin Rashes, Allergies", category: "Dermatological / Immune", family: "Body · Psychosomatic", summary: "Stress hormones suppress immune regulation; inflammatory skin conditions often spike during periods of emotional distress.", soulLink: "Linked to anxiety, fear, and insecurity." },
  { title: "Asthma", category: "Respiratory", family: "Body · Psychosomatic", summary: "Emotional distress is a recognized trigger for asthma attacks, particularly in those with underlying airway sensitivity.", soulLink: "Fear and anxiety constrict breathing — both physiologically and symbolically." },
  { title: "Some Arthritis", category: "Musculoskeletal", family: "Body · Psychosomatic", summary: "Some forms of arthritis have significant stress-mediated inflammatory components. The body holds tension in joints and connective tissue.", soulLink: "Hostility, suppressed anger, and chronic frustration can contribute." },
  { title: "Spastic Colon / IBS", category: "Gastrointestinal", family: "Body · Psychosomatic", summary: "Irritable bowel syndrome is strongly correlated with anxiety and emotional dysregulation. The gut-brain axis is highly sensitive to psychological state.", soulLink: "Linked to worry, anxiety, and unresolved emotional conflict." },
  { title: "Heart Palpitations", category: "Cardiovascular", family: "Body · Psychosomatic", summary: "Stress hormones (cortisol, adrenaline) increase heart rate and can produce the subjective sensation of pounding or irregular heartbeat.", soulLink: "Fear and anxiety directly activate the autonomic cardiovascular stress response." },
  { title: "Respiratory Ailments", category: "Respiratory", family: "Body · Psychosomatic", summary: "Shallow, rapid breathing from chronic anxiety reduces oxygen exchange and can lead to repeated respiratory infections.", soulLink: "Linked to chronic worry and fear." },
  { title: "Compulsive Eating", category: "Behavioral", family: "Body · Psychosomatic", summary: "Food used as comfort, numbing, or self-punishment — a behavioral manifestation of soul pain seeking relief through the body.", soulLink: "Linked to inadequacy, inferiority, guilt, and depression." },
  { title: "Fatigue", category: "Systemic", family: "Body · Psychosomatic", summary: "Chronic psychological burden produces cortisol dysregulation and systemic exhaustion — even without physical overexertion.", soulLink: "The body tires of carrying what the soul has not been able to release." },
  { title: "Insomnia", category: "Sleep", family: "Body · Psychosomatic", summary: "Racing thoughts, guilt, and fear prevent the nervous system from downshifting into restorative sleep.", soulLink: "Worry, guilt, and anxiety keep the mind activated at night." },
  { title: "Escape in Sleep (Hypersomnia)", category: "Sleep", family: "Body · Psychosomatic", summary: "Excessive sleep as withdrawal from pain — using unconsciousness to avoid the unbearable weight of soul distress.", soulLink: "Often linked to depression, inferiority, and a sense of hopelessness." },
  { title: "Hypertension", category: "Cardiovascular", family: "Body · Psychosomatic", summary: "Chronic activation of the stress response sustains elevated blood pressure, increasing cardiovascular risk over time.", soulLink: "Sustained insecurity, fear, and hostility maintain the body in a high-alert state." },
];

const wheelConnectionMap = [
  { soul: "Inferiority", spirit: "Acceptance", scripture: "Romans 15:7; Ephesians 1:6" },
  { soul: "Insecurity", spirit: "Security", scripture: "Romans 8:38–39; John 10:28–29" },
  { soul: "Inadequacy", spirit: "Assurance", scripture: "2 Corinthians 3:5; Philippians 4:13" },
  { soul: "Guilt (Real & Imaginary)", spirit: "Salvation", scripture: "1 John 1:9; Romans 8:1" },
  { soul: "Worry, Doubts & Fears", spirit: "Assurance + Security", scripture: "Philippians 4:6–7; Romans 8:16" },
];

const sinMap = sins.map((sin) => ({
  sin: sin.title,
  antidote: sin.antidote,
  commandment: sin.commandment,
  dante: sin.dante,
  demon: sin.demon,
  watch: sin.watch,
}));

const prayerData = {
  commandments: {
    "No other gods before God": [
      "Lord, reveal where I have placed something created above you in my heart. Be the center from which all my other loyalties flow. You alone are worthy of my ultimate trust.",
      "Father, when lesser things compete for my devotion, remind me of your faithfulness. Free me from giving to any created thing the authority that belongs to you alone.",
      "Holy God, root me in love for you so deep that nothing else can claim the throne of my life. Let my devotion be sincere, not performed.",
    ],
    "Do not make idols": [
      "Lord, show me where I have reduced you to something manageable—a formula, tradition, or image I can control. Lead me back to living encounter with the God who cannot be contained.",
      "Father, forgive me for creating idols out of productivity, image, security, or approval. Let nothing I build or possess become my substitute for you.",
      "Holy God, I want to relate to truth directly, not worship a symbol of it. Free me from the comfort of a God I have made in my own image.",
    ],
    "Do not misuse God's name": [
      "Lord, give me integrity between what I confess and how I live. Let me not use sacred words to cover selfish motives or impress others. May my speech flow from genuine encounter with you.",
      "Father, forgive my careless, manipulative, or false use of holy language. Teach me to hold sacred words with reverence and to speak truth even when it costs me.",
      "Holy God, let my vows be few and faithful. Give me the wisdom to speak carefully and the courage to mean what I say.",
    ],
    "Remember the Sabbath": [
      "Lord, teach me to stop striving and trust that your work continues when mine pauses. Restore the sacred rhythm of ceasing and beginning.",
      "Father, in my Sabbath rest, meet me. Let rest be not just absence of work but presence with you, with those I love, and with the beauty of what you have made.",
      "God of rest, forgive the pride that says everything depends on my effort. I return to you as a child returns home. You are enough; I am enough in you.",
    ],
    "Honor your father and mother": [
      "Lord, give me a generous heart toward those who carried life to me. Where there is gratitude, let me express it. Where there is wound, give me wisdom to hold honor and healthy boundaries together.",
      "Father, I lift to you the complexity of family. Help me respect what is worthy, protect what is sacred, and grow into the person you are calling me to be.",
      "God of generations, thank you for the people who shaped me. Help me honor what gave me life while keeping wise discernment about harm.",
    ],
    "Do not murder": [
      "Lord, guard my heart against the roots of contempt. Show me where hatred is forming and bring conviction before it becomes destruction. Make me a carrier of mercy.",
      "Father, teach me to see every person as bearing your image. When I am tempted to cruelty, remind me that the one before me is someone you love.",
      "Holy God, where anger burns in me, teach me the difference between righteous action and destructive rage. Let my anger serve justice, not violence.",
    ],
    "Do not commit adultery": [
      "Lord, guard my eyes, imagination, and desire from turning another person into an object. Help me to be fully present to the commitments I have made.",
      "Father, in a world of constant temptation, give me the grace to see beauty without consuming it, and to desire without betraying trust.",
      "God of faithfulness, help me treat intimacy as sacred and protect the trust that was given to me. Let my desire serve covenant.",
    ],
    "Do not steal": [
      "Lord, give me respect for what belongs to others—their possessions, labor, time, and dignity. Forgive the subtle thefts I have committed in thought, word, and action.",
      "Father, where I have taken what was not given, give me the courage to make it right and to hold generosity above accumulation.",
      "God of justice, heal me from the anxious need to take. Teach me to receive my portion with gratitude and trust you as my provision.",
    ],
    "Do not bear false witness": [
      "Lord, make me a truthful person. Where I have distorted reality to protect myself or harm another, convict me. Let my words serve truth even when honesty is costly.",
      "Father, give me the courage to speak honestly. Help me not reshape events for my advantage or stay silent when my silence allows injustice.",
      "Holy God, guard my speech from gossip, spin, and selective truth. Let my words reveal reality rather than manipulate it.",
    ],
    "Do not covet": [
      "Lord, heal the comparison that poisons my joy. When I see another's blessing and feel diminished, remind me of your specific provision for my life.",
      "Father, teach me to desire good things without resenting the person who has them. Free me from the lie that their gain is my loss.",
      "God of abundance, root me in contentment without killing holy desire. Teach me to rejoice in another's flourishing as a sign that goodness is real and available.",
    ],
  },
  virtues: {
    "Humility": [
      "Lord, give me the grace to see myself truthfully: loved, finite, and dependent. Where I have exaggerated my worth, correct me; where I have dismissed it, restore me.",
      "Father, free me from the exhausting need to be seen as great. Let me receive my limits without shame, give my gifts without pride, and secure my identity in you.",
      "Holy God, teach me to receive correction without collapse, give credit without needing the stage, and learn from those who seem lesser than me.",
    ],
    "Charity": [
      "Lord, fill me with love that gives without calculating. Purify my generosity from performance and use, and let it become a genuine gift to the people before me.",
      "Father, guard my giving from self-abandonment. Teach me to give freely from what I have and sacrificially when the moment demands. Let love guide my hands.",
      "God of love, you gave everything when we were still far from you. May that same love move through me—not because it earns approval, but because it is my true nature in you.",
    ],
    "Chastity": [
      "Lord, teach me to hold desire with reverence. Where I have reduced a person to an object of feeling or fantasy, restore in me the sight that sees each person as wholly sacred.",
      "Father, integrate my desire with love and truth. Teach me that ordered love is not restriction but a fullness that honors the person before me.",
      "Holy God, give me eyes to see beauty without grasping it, hands to love without possessing, and a heart to remain faithful to what I have promised.",
    ],
    "Gratitude": [
      "Lord, open my eyes to the gifts I walk past daily. Teach me to name what I have received before reaching for what I do not yet have.",
      "Father, where envy has poisoned my ability to enjoy my own life, heal me. Let someone else's blessing become a reason for my joy rather than my resentment.",
      "God of all good gifts, every breath, every beauty, every relationship is yours on loan to me. Teach me to receive life with open hands and hold it with gratitude.",
    ],
    "Temperance": [
      "Lord, give me the ability to enjoy without being ruled by what I enjoy. Teach me the pause before excess and the awareness of what is nourishing versus what is numbing.",
      "Father, free me from appetite that has become master. Where consumption has become compulsion, bring healing and restore my ability to stop and to say no.",
      "Holy God, in a world of endless more, give me the courage of enough. Let me enjoy good things as gifts rather than as escapes.",
    ],
    "Patience": [
      "Lord, teach me the strength that does not need to discharge instantly. When I am wronged or frustrated, give me space between the trigger and the response.",
      "Father, where I have caused harm through impatient words, show me and give me courage to repair it. Slow me down enough to listen before I respond.",
      "Holy God, you are patient with me beyond all reason. Let me carry that patience toward others. Let mercy not be weakness but the deepest form of strength.",
    ],
    "Diligence": [
      "Lord, give me faithful effort toward what is good. On days when motivation is absent, help me act from commitment rather than from feeling alone.",
      "Father, guard my work from burnout and from valuing productivity above people. Teach me to work as worship, rest as trust, and serve without needing recognition.",
      "Holy God, you have given me gifts meant to be used for your kingdom. Give me courage to be faithful with what I have been given and not to bury it out of fear.",
    ],
    "Prudence": [
      "Lord, give me clear judgment. Before I act, help me see consequences, consider context, and check my timing. Protect me from impulsive decisions and paralysing overthinking.",
      "Father, let wisdom govern my choices. Teach me to seek counsel, pray before acting, and trust the slow discernment you often speak through.",
      "Holy God, you know the end from the beginning. Give me wisdom—not just cleverness, but true judgment about what is good, right, and serves the people before me.",
    ],
    "Justice": [
      "Lord, give me the courage to act with justice. Teach me to give God, others, and myself what is rightly due. Where I have withheld what was owed, show me and help me make it right.",
      "Father, justice and mercy belong together. Guard me from cold correctness that forgets the person, and from warm sympathy that refuses to name wrong.",
      "God of justice, you are the standard by which all justice is measured. Make me an instrument of your righteousness in the places where I have influence.",
    ],
    "Fortitude": [
      "Lord, give me the courage to remain faithful to the good under pressure. When the right action is costly or lonely, strengthen my resolve. Let fear be present without being in charge.",
      "Father, teach me the difference between courage and recklessness. Help me act from love and principle, not from impulse or pride.",
      "Holy God, you have not given me a spirit of fear, but of power, love, and sound judgment. Let that spirit be active in me when the moment calls for more than I have alone.",
    ],
    "Faith": [
      "Lord, increase my faith. Where I cling to certainty and resist trust, open my hands. Let me act from faith rather than only from proof.",
      "Father, faith is not the absence of doubt but the choice to keep facing you through the questions. Meet me in the fog where I cannot yet see clearly.",
      "Holy God, you are trustworthy beyond all the evidence I can gather. Teach me to rest in your faithfulness rather than in my own understanding.",
    ],
    "Hope": [
      "Lord, restore hope where despair has taken hold. Remind me that goodness and redemption remain possible—for me, for others, for this world.",
      "Father, hope is not passive fantasy; it requires faithful movement. Give me the grace to act as though what you have promised is real, even when circumstances say otherwise.",
      "God of all hope, ground my hope in the resurrection—not in outcomes I control, but in the One who transforms death into life. That is the hope I need.",
    ],
  },
  sins: {
    "Pride": [
      "Lord, I confess the places in me that need to be seen, admired, and unchallenged. Humble me not by destruction but by love. Show me how beautiful dependence on you truly is.",
      "Father, where my identity has inflated beyond truth, gently restore perspective. Teach me that I am beloved without being supreme. Let me receive correction without feeling erased.",
      "Holy God, pride at its root is fear that I am not enough without being extraordinary. Heal that fear. Let your love be the ground of my worth so I do not need to earn it through superiority.",
    ],
    "Greed": [
      "Lord, heal me from the anxiety that drives accumulation. Where I trust my security more in what I have than in who you are, reveal my idolatry. Teach me the freedom of holding things lightly.",
      "Father, forgive me for treating people as resources. Open my eyes to see their dignity and need. Teach me generosity that flows from trust, not hoarding that flows from fear.",
      "God of abundance, you have promised to provide. Teach me to receive my portion with gratitude, give freely beyond comfort, and trust that enough is genuinely enough.",
    ],
    "Lust": [
      "Lord, purify my desire. Where I have turned a person into an object of fantasy or pleasure, forgive me. Restore in me the sight that sees each person as wholly sacred.",
      "Father, teach me that integrated desire is not shame but wholeness. Let intimacy remain sacred, covenant remain central, and the dignity of the person before me be protected by love.",
      "Holy God, free me from desire that has become compulsion. Where lust has taken root, bring healing and teach me reverence for the body—mine and others'—as your temple.",
    ],
    "Envy": [
      "Lord, heal the comparison that poisons my joy. When I see another's blessing and feel diminished, restore my own sense of calling. Their good is not my loss.",
      "Father, envy can hide beneath critique or concern. Show me where resentment lurks, and teach me to genuinely rejoice when someone I envy flourishes.",
      "God of every good gift, help me trust your specific provision for my life without needing to compare it to another's. Let gratitude displace the resentment that has grown.",
    ],
    "Gluttony": [
      "Lord, teach me to receive pleasure as gift without becoming its servant. Where appetite has become master, restore healthy measure and the ability to stop.",
      "Father, I confess using consumption to numb discomfort rather than face it. Teach me to seek comfort in relationship and prayer rather than in excess.",
      "Holy God, you created the body for good. Restore in me a healthy relationship with appetite. Let enjoyment remain joy, not compulsion, and let my body serve your purposes well.",
    ],
    "Wrath": [
      "Lord, heal the places where pain has become permission to harm. Teach me to feel anger honestly without letting it become contempt or cruelty.",
      "Father, teach me to grieve without revenge, confront without contempt, and act without hatred. Show me where cold resentment has settled in my heart.",
      "Holy God, you are slow to anger and abounding in love. Teach me that same quality. Let my anger serve justice, not become a permission slip for cruelty.",
    ],
    "Sloth": [
      "Lord, awaken in me what acedia has put to sleep. Where I have grown passive toward my own good and the needs of others, stir me. Teach me the next honest action.",
      "Father, sloth is a heaviness of soul that resists the weight of love. Lift that heaviness from me. Remind me that you placed gifts in me the world needs, and avoidance is its own kind of harm.",
      "Holy God, give me the courage to take up the weight of love again. Help me do the next faithful thing rather than waiting for perfect motivation. Let faithfulness be my worship.",
    ],
  },
  inferno: {
    1: [
      "Lord, I pray for all who have known natural virtue without knowing you fully. May your mercy reach every sincere heart that sought truth and beauty as well as it knew how.",
      "Father, guard me from presuming that goodness is mine alone or that you are absent where I do not expect you. Teach me to recognize your image in all who bear it.",
      "Holy God, the longing of Limbo is the longing of every heart seeking meaning without your full light. Meet every such heart. Let no sincere seeker remain at the threshold forever.",
    ],
    2: [
      "Lord, I pray for all whose consuming desire left destruction in its wake. Have mercy on love that lost its form. Restore in the living what was broken.",
      "Father, the restless winds of Circle 2 speak of passion never stilled. Teach me to find my rest in you, that desire might serve relationship rather than drive me past what is sacred.",
      "Holy God, where disordered passion has touched me or those I love, bring healing, restoration, and new order. You made us for love; restore what has been bent.",
    ],
    3: [
      "Lord, I pray for all whose appetite for comfort left them buried in excess. May mercy reach the hungry soul that sought to fill itself with what could never satisfy. Only you are that satisfaction.",
      "Father, the cold rain and mire of Circle 3 show what excess actually produces—not pleasure but emptiness. Teach me to receive good things as sacrament, not as compensation for what is missing.",
      "Holy God, deliver the living from consumption that numbs the soul. Where I have filled a spiritual need with a physical substitute, reveal the real need and meet it with your presence.",
    ],
    4: [
      "Lord, I pray for all who made accumulation the work of their life. May mercy reach every heart that confused wealth with worth. Teach the living to give before giving becomes impossible.",
      "Father, the souls of Circle 4 push heavy weights in both directions—hoarding and wasting both distort the right use of goods. Teach me generosity that is neither compulsive nor anxious.",
      "Holy God, free the living from the anxiety that drives accumulation. Give us courage to hold wealth as stewardship and find security in you rather than in what we own.",
    ],
    5: [
      "Lord, I pray for all who carried unresolved anger to their final moment. May your mercy be greater than the rage. Bring peace where resentment froze.",
      "Father, the fighting above the Styx and the choking below describe what wrath does—it destroys both the one who acts and the one who suppresses. Teach me to process anger before it becomes violence or poison.",
      "Holy God, where destructive anger lives in me or those I love, bring your healing. Teach us to grieve honestly, confront truthfully, and forgive—not as permission for the harm, but as freedom for ourselves.",
    ],
    6: [
      "Lord, guard me from placing my own understanding above truth. Where I have built my faith around comfort or the need to be right, humble me and correct me gently.",
      "Father, the fiery tombs of Circle 6 describe ultimate self-deception about what is real. Give me the humility to remain teachable and love truth more than my version of it.",
      "Holy God, keep me close to your word, your people, and correction. Let my faith serve life rather than self. Teach me to hold conviction with genuine openness.",
    ],
    7: [
      "Lord, I pray for all who chose destruction—of others, of themselves, of what was sacred. Have mercy beyond our capacity for violence. Restore in the living a reverence for life.",
      "Father, where I have used force to dominate, harm, or control, convict me and set me on a different path. Let Circle 7's imagery move me toward protection, not exploitation.",
      "Holy God, protect the vulnerable from the violent. Give wisdom to those in positions of power. Let the cycle of harm stop with someone willing to pay the cost of not passing it forward.",
    ],
    8: [
      "Lord, guard me from subtle corruptions—manipulation, hypocrisy, flattery, and broken trust. Where I have used cleverness to benefit myself at another's expense, bring me to honest account.",
      "Father, the ten ditches of Malebolge describe the many forms betrayal of speech and trust can take. Give me integrity in every layer of my life—in public and private, in word and action.",
      "Holy God, you hate deceit because it destroys the trust that holds human life together. Give me the courage to be transparent, the humility to own my errors, and the integrity to build trust rather than exploit it.",
    ],
    9: [
      "Lord, I pray for all who chose to betray what was most trusted. May your mercy reach even the frozen bottom. And guard me from the slow drift toward betrayal in my own heart.",
      "Father, Cocytus teaches that the coldest sin is deliberate betrayal of love. Where I have grown cold toward what I once cherished, warm me again. Restore faithful love where ice has formed.",
      "Holy God, you remained faithful even when we betrayed you. Teach me to hold trust as sacred, honor commitments as covenants, and never treat love as a strategy.",
    ],
  },
  demons: {
    "Lucifer": [
      "Lord, I renounce the spirit of pride that claims its own sufficiency. Wherever I have refused correction, demanded superiority, or placed myself above accountability, I confess it and return to dependence on you.",
      "Father, the fall of pride is the fall of one who could not receive being as gift. Teach me to receive my existence, gifts, and calling as given rather than earned. Let gratitude replace self-exaltation.",
      "Holy God, where Lucifer's logic lives in me—the need to be supreme and self-created—expose it with your light. Replace it with the freedom of humility and the peace of a creature loved by its Creator.",
    ],
    "Mammon": [
      "Lord, I confess every place where wealth or security has become my functional god. I cannot serve two masters. Show me where Mammon has taken the loyalty that belongs to you alone.",
      "Father, the spirit of Mammon says security comes from accumulation and worth is measured by what I have. Speak the truth against that lie: I am secure in you, and my worth is already established.",
      "Holy God, free me from the fear that drives me to accumulate beyond need. Let generosity be an act of warfare against the spirit of greed. Teach me to give as a declaration that you are my provider.",
    ],
    "Asmodeus": [
      "Lord, I pray for all bound by possessive, consuming, or destructive desire. Where disordered passion has brought harm to me or others, I bring it before you for cleansing, healing, and reordering.",
      "Father, Asmodeus is the spirit of desire that destroys what it claims to love. Teach me desire that honors, protects, and serves the dignity of the person. Let intimacy be covenant, not consumption.",
      "Holy God, integrate my desire with love and truth. Where lust has formed in me, replace it with reverence. Let the body remain sacred and desire remain servant to genuine love.",
    ],
    "Leviathan": [
      "Lord, I renounce the twisting, envious spirit that poisons my ability to rejoice in another's good. Where Leviathan's chaos lives in me—comparing, resenting, undermining—bring your peace.",
      "Father, envy is a particular kind of suffering: it takes what could be shared joy and turns it into personal diminishment. Heal that distortion in me. Their flourishing is not my loss.",
      "Holy God, the sea monster of chaos cannot stand before you. Wherever the spirit of Leviathan has created rivalry or resentment in my relationships, rebuke it and restore peace.",
    ],
    "Beelzebub / Beelzebul": [
      "Lord, I pray against every spirit of corruption and excess. Where appetite has become a ruling power in my life, I renounce its mastery and return it to its proper place.",
      "Father, Beelzebub is lord of flies—a spirit of decay and corruption, of appetite run to waste. Clean what has grown foul in me. Restore what has been spoiled by excess.",
      "Holy God, where I have given the enemy a foothold through physical excess, I close that door with repentance and invite your restoring Spirit to make me whole.",
    ],
    "Satan": [
      "Lord, I submit to you and resist the accuser. Where the adversarial spirit of contempt and rage has operated through me, I confess it. Teach me the difference between righteous resistance and destructive anger.",
      "Father, Satan in his role as accuser uses truth as a weapon rather than a path to healing. Guard me from the spirit of accusation—toward others and toward myself. Replace it with the spirit of intercession.",
      "Holy God, the adversary's final defeat is already declared. I stand on that victory against every spirit of opposition and destructive wrath. Let my anger serve your justice, not the enemy's agenda.",
    ],
    "Belphegor": [
      "Lord, I renounce the spirit of comfortable avoidance and wasted potential. Where acedia has settled in my soul—making me passive toward my own good and the needs of others—stir me awake.",
      "Father, Belphegor is the demon of easy comfort that slowly drains purpose. Wherever that spirit has made its home in me through procrastination or spiritual heaviness, I invite your awakening.",
      "Holy God, give me the courage to take up the weight of love again. Wake what has gone to sleep in me. Let faithfulness be a fire, not a burden.",
    ],
    "Abaddon / Apollyon": [
      "Lord, I pray against every spirit of destruction and every force working toward the undoing of life, hope, and goodness. You hold the keys of death and Hades, and nothing is beyond your authority.",
      "Father, Abaddon is the angel of the abyss—a symbol of irreversible destruction. Protect all that I love from the spirit of destruction. Let nothing good in my life or calling be lost to the abyss.",
      "Holy God, even at the edge of the abyss, you are present. Where destruction has already come—in loss, grief, or despair—meet us there. Let Apollyon not have the final word. Your restoration does.",
    ],
    "Legion": [
      "Lord, I pray for all who are fragmented, divided, and lost to themselves—all who feel they are many voices with no center. Speak as you spoke on the Gerasene shore: a word of order, release, and restoration.",
      "Father, Legion describes a person no longer self-commanding. Where I have lost my center through sin, trauma, or scattered living, call me back to integration. Restore my capacity to choose myself and return to you.",
      "Holy God, you did not turn away from the one possessed by Legion—you came toward him. Let that compassion reach everyone today who feels held by forces stronger than themselves. Speak, and let order be restored.",
    ],
    "Azazel": [
      "Lord, I bring the weight of what I have carried—sins laid on me by others, guilt that belongs elsewhere, shame that has become my identity. Let the scapegoat pattern end here. You have already carried it.",
      "Father, Azazel carries the image of sins sent into the wilderness. You, the true Lamb, have fulfilled that image. Teach me to release what is not mine to carry and to receive the absolution you have already provided.",
      "Holy God, the wilderness is not beyond your reach. Whether I carry my own guilt or the projected guilt of others, teach me the difference, help me set down what is not mine, and receive your complete forgiveness.",
    ],
  },
  angels: {
    "Michael": [
      "Lord, thank you for Michael and the heavenly host who stand against every spiritual force of evil. In the battles I cannot see, remind me that the armies of heaven are engaged and that I do not fight alone.",
      "Father, Michael does not speak on his own authority — even when confronting the devil he says 'The Lord rebuke you.' Teach me that same restraint: to act under your authority rather than my own indignation.",
      "Holy God, the warfare Michael wages declares that Satan's accusations against your people are already answered in Christ. Let that victory be real to me today. I am not condemned; I am kept.",
    ],
    "Gabriel": [
      "Lord, Gabriel announced the moments your redemption broke into history. Tune my ears to hear your word in the ordinary — the quiet messages that point toward your larger purposes for my life.",
      "Father, Gabriel stands in your presence and goes forth at your word. Give me that same attentiveness: to wait on you before I speak, to carry only what you have actually given, and to deliver it faithfully.",
      "Holy God, you sent Gabriel to the afraid and the surprised — to Zechariah in the temple and to Mary in Nazareth. You choose unlikely messengers and unlikely recipients. Use me however you will.",
    ],
    "Raphael": [
      "Lord, Raphael's ministry is healing and guidance on difficult journeys. I bring before you every hidden wound and every path that feels uncertain. Send your healing presence into every hidden place.",
      "Father, the tradition of Raphael carrying prayers before your throne is a beautiful image of intercession. In that spirit, I ask that my own prayers rise before you, and that you send help to those I lift by name.",
      "Holy God, Tobias did not know his companion was an angel. Guard me from assuming your help must arrive in obvious forms. Let me recognize your guidance even when it looks completely ordinary.",
    ],
    "Seraphim": [
      "Lord, the Seraphim cry 'Holy, holy, holy' without ceasing. Let that refrain echo in me — a living reminder that you are wholly other, wholly good, and worthy of everything I have.",
      "Father, the fire of the Seraphim cleanses Isaiah's lips before his prophetic commission. Whatever in my speech is impure, careless, or dishonoring — cleanse it. Prepare me to speak only what comes from you.",
      "Holy God, the creatures nearest your throne are overwhelmed with worship, not with knowledge or power. Teach me that closeness to you produces awe before it produces anything else. Draw me near and let your holiness undo me gently.",
    ],
    "Cherubim": [
      "Lord, the Cherubim guard the threshold of sacred space — from Eden's gate to the Ark of the Covenant. I come through the one door that is open: Christ, who has made access to your presence possible.",
      "Father, the Cherubim woven into the Ark remind me that your dwelling is not casual or common. Guard in me a holy reverence for your presence — not fear that drives me away, but awe that draws me near with care.",
      "Holy God, Ezekiel's vision of the Cherubim carrying your glory shows that your presence moves, leads, and cannot be contained or held stationary. Follow your glory wherever it leads. Do not let me cling to where it was.",
    ],
    "The Angel of the LORD": [
      "Lord, the Angel of the LORD appeared at every moment of desperate need — to Hagar in the wilderness, to Gideon by the winepress, to Elijah under the broom tree. You meet your people in their actual place, not where they think they should be.",
      "Father, the recipients of these visits were not ready. They were afraid, exhausted, or hiding. Meet me in exactly the condition I am in. I do not need to be prepared for you. You come first.",
      "Holy God, you appeared in ways that were only recognized after the fact — 'Surely the LORD is in this place, and I did not know it.' Open my eyes to where you have already been present in what I thought was ordinary.",
    ],
    "Four Living Creatures": [
      "Lord, the four living creatures represent all creation offering itself back to you in unending worship. Let that be the posture of my life — not performance, but existence given back to the One who gave it.",
      "Father, the creatures are 'full of eyes' — wholly attentive, wholly aware of what you are doing. Give me even a fraction of that attentiveness in prayer: to see what you are doing, to notice where you are moving.",
      "Holy God, the living creatures have no rest day or night in their worship. I will rest — you made me for that. But let worship be the rhythm my rest returns to, not an obligation I escape as soon as I am able.",
    ],
    "The Heavenly Host": [
      "Lord, the heavenly host who sang over Bethlehem were not singing for themselves. They sang because the moment the world had been waiting for had arrived. Teach me to celebrate your acts in history, not only my personal experiences of you.",
      "Father, Elisha prayed that his servant's eyes would be opened, and he saw the horses and chariots of fire surrounding them. Open my eyes to the reality that your resources surround the very situations that terrify me.",
      "Holy God, the hosts of heaven are not distant or neutral. They serve for the sake of those who will inherit salvation. That is me. Thank you that I am not unattended in a world that sometimes feels hostile and vast.",
    ],
    "Guardian Angels": [
      "Lord, the thought that angels always see your face on behalf of your children is humbling. I am cared for at levels I cannot track or measure. Let that truth move me from anxiety to trust.",
      "Father, Psalm 91 promises that you will command your angels to guard me in all my ways. I do not always feel guarded. Anchor me in what your word says rather than what my circumstances seem to confirm.",
      "Holy God, your angels are ministering spirits sent to serve those who will inherit salvation. The ministry happens whether or not I see it, feel it, or acknowledge it. Thank you for the unseen help that has already been given.",
    ],
    "The Commander of the LORD's Army": [
      "Lord, the Commander's answer to Joshua was neither 'I am for you' nor 'I am for your enemies' — but 'I am the commander of the LORD's army.' Remind me that you do not exist to take my side. I exist to take yours.",
      "Father, Joshua fell face down in worship before asking what message the Commander had. Before I bring my agenda to you, let me fall down and ask: what is yours? What are your orders here?",
      "Holy God, Joshua was told to remove his sandals — holy ground. Every encounter with your genuine presence is holy ground. Slow me down. Let me not rush past the holiness to get to the instructions.",
    ],
  },
  themes: prayerTextByTitle,
};

function getPrayers(item, type) {
  const key = item.title || item.name || item.circle;
  return prayerData[type]?.[key] || null;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Modal dialog behaviour: focus moves into the dialog when it opens and back to
// whatever opened it when it closes; Escape closes it and Tab stays inside.
// Keys are handled on the dialog itself rather than the window, so with the
// prayer dialog stacked over a detail dialog, Escape closes only the top one.
function useDialog(onClose) {
  const ref = useRef(null);
  useEffect(() => {
    const opener = document.activeElement;
    ref.current?.focus();
    return () => {
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus();
    };
  }, []);
  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== "Tab" || !ref.current) return;
    const focusable = [...ref.current.querySelectorAll(FOCUSABLE)];
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  return [ref, onKeyDown];
}

function PrayerModal({ prayers, title, type, onClose }) {
  const [dialogRef, onDialogKeyDown] = useDialog(onClose);
  const titleId = useId();

  if (!prayers) return null;

  const accentClass =
    type === "virtues" ? "text-emerald-300/70" :
    type === "sins" ? "text-red-400/70" :
    type === "inferno" ? "text-violet-300/70" :
    type === "demons" ? "text-red-400/70" :
    type === "angels" ? "text-cyan-300/70" :
    "text-amber-300/70";

  const borderAccent =
    type === "virtues" ? "border-emerald-400/20 bg-emerald-500/5" :
    type === "sins" ? "border-red-400/20 bg-red-500/5" :
    type === "inferno" ? "border-violet-400/20 bg-violet-500/5" :
    type === "demons" ? "border-red-400/20 bg-red-500/5" :
    type === "angels" ? "border-cyan-400/20 bg-cyan-500/5" :
    "border-amber-300/20 bg-amber-300/5";

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#07090f]/85 px-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={onDialogKeyDown}
        className="max-h-[88vh] w-full max-w-xl overflow-auto rounded-[28px] border border-violet-300/20 bg-[#0c0e18] shadow-[0_22px_65px_rgba(0,0,0,0.45)] outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 border-b border-white/10 bg-[#0c0e18]/95 px-6 py-5 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className={`text-xs font-bold uppercase tracking-[0.3em] ${accentClass}`}>Prayers</p>
              <h2 id={titleId} className="mt-1 text-xl font-black text-white">{title}</h2>
            </div>
            <button
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
        <div className="space-y-4 p-6">
          {prayers.map((prayer, i) => (
            <div key={i} className={`rounded-2xl border p-5 ${borderAccent}`}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Prayer {i + 1}</p>
              <p className="text-sm leading-7 text-slate-200">{prayer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Pill({ children, tone = "default" }) {
  const tones = {
    default: "border-white/10 bg-white/5 text-slate-200",
    gold: "border-amber-300/30 bg-amber-300/10 text-amber-100",
    red: "border-red-400/30 bg-red-500/10 text-red-100",
    blue: "border-sky-400/30 bg-sky-500/10 text-sky-100",
    cyan: "border-cyan-400/30 bg-cyan-500/10 text-cyan-100",
    green: "border-emerald-400/30 bg-emerald-500/10 text-emerald-100",
    violet: "border-violet-400/30 bg-violet-500/10 text-violet-100",
  };
  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${tones[tone]}`}>{children}</span>;
}

function AngelDetailBody({ angel }) {
  const a = angel;
  const box = "rounded-2xl border border-white/10 bg-white/[0.03] p-4";
  const label = "mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400";
  const assoc = a.associations || {};
  const joinMaybe = (v) => (Array.isArray(v) ? v.join(", ") : v);
  return (
    <>
      {a.originalName && (
        <div className={box}>
          <div className={label}>Also known as</div>
          <p className="text-sm leading-7 text-slate-200">{a.originalName}</p>
        </div>
      )}
      {a.role && (
        <div className={box}>
          <div className={label}>Role</div>
          <p className="text-sm leading-7 text-slate-200">{a.role}</p>
        </div>
      )}
      {a.traditions?.length > 0 && (
        <div className={box}>
          <div className={label}>Traditions</div>
          <div className="flex flex-wrap gap-2">{a.traditions.map((t) => <Pill key={t} tone="cyan">{t}</Pill>)}</div>
        </div>
      )}
      {a.summary && (
        <div className={box}>
          <div className={label}>Summary</div>
          <p className="text-sm leading-7 text-slate-200">{a.summary}</p>
        </div>
      )}
      {a.overview && (
        <div className={box}>
          <div className={label}>Overview</div>
          <p className="text-sm leading-7 text-slate-200">{a.overview}</p>
        </div>
      )}
      {a.domains?.length > 0 && (
        <div className={box}>
          <div className={label}>Domains</div>
          <div className="flex flex-wrap gap-2">{a.domains.map((d) => <Pill key={d}>{d}</Pill>)}</div>
        </div>
      )}
      {(assoc.element || assoc.day || assoc.colors || assoc.symbols) && (
        <div className={box}>
          <div className={label}>Associations</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {assoc.element && <div><div className="text-xs text-slate-400">Element</div><p className="text-sm text-slate-200">{joinMaybe(assoc.element)}</p></div>}
            {assoc.day && <div><div className="text-xs text-slate-400">Day</div><p className="text-sm text-slate-200">{joinMaybe(assoc.day)}</p></div>}
            {assoc.colors && <div><div className="text-xs text-slate-400">Colors</div><p className="text-sm text-slate-200">{joinMaybe(assoc.colors)}</p></div>}
            {assoc.symbols && <div><div className="text-xs text-slate-400">Symbols</div><p className="text-sm text-slate-200">{joinMaybe(assoc.symbols)}</p></div>}
          </div>
        </div>
      )}
      {a.texts?.length > 0 && (
        <div className={box}>
          <div className={label}>Texts &amp; sources</div>
          <ul className="list-disc space-y-1 pl-5 text-sm leading-7 text-slate-200">{a.texts.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      )}
      {a.invocation && (
        <div className="rounded-2xl border border-cyan-300/20 bg-cyan-500/10 p-4">
          <div className={label}>Invocation</div>
          <p className="text-sm italic leading-7 text-cyan-50/90">{a.invocation}</p>
        </div>
      )}
      {a.caution && (
        <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4">
          <div className={label}>Caution</div>
          <p className="text-sm leading-7 text-amber-50/90">{a.caution}</p>
        </div>
      )}
    </>
  );
}

// Rendered only while open, so useDialog's mount/unmount tracks open/close.
function DetailModal({ item, onClose, type, onPray }) {
  const [dialogRef, onDialogKeyDown] = useDialog(onClose);
  const titleId = useId();

  const entries = Object.entries(item).filter(([key]) => !["id", "title", "name", "circle"].includes(key));
  const heading = item.title || item.name || `Circle ${item.circle}`;
  const prayers = getPrayers(item, type);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={onDialogKeyDown}
        className="max-h-[86vh] w-full max-w-3xl overflow-auto rounded-[28px] border border-violet-300/20 bg-[#0c0e18] shadow-[0_22px_65px_rgba(0,0,0,0.45)] outline-none"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 border-b border-white/10 bg-[#0c0e18]/95 p-5 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Pill tone={type === "demons" ? "red" : type === "angels" ? "cyan" : type === "virtues" ? "green" : type === "inferno" ? "violet" : type === "wheel-spirit" ? "blue" : type === "wheel-body" ? "green" : "gold"}>{type}</Pill>
              <h2 id={titleId} className="mt-3 text-2xl font-bold text-white">{item.circle ? `Circle ${item.circle}: ${heading}` : heading}</h2>
            </div>
            <div className="flex shrink-0 gap-2">
              {prayers && (
                <button
                  className="rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-300/20"
                  onClick={() => onPray(item, type)}
                >
                  ✦ Pray
                </button>
              )}
              <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
        <div className="space-y-4 p-5">
          {type === "angels" ? (
            <AngelDetailBody angel={item} />
          ) : (
            entries.map(([key, value]) => (
              <div key={key} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">{key.replace(/([A-Z])/g, " $1")}</div>
                <p className="text-sm leading-7 text-slate-200">{String(value)}</p>
              </div>
            ))
          )}
        </div>
        {prayers && (
          <div className="border-t border-white/10 p-5">
            <button
              className="w-full rounded-2xl border border-amber-300/20 bg-amber-300/5 py-4 text-sm font-semibold text-amber-100 transition hover:bg-amber-300/10"
              onClick={() => onPray(item, type)}
            >
              ✦ Open Prayers for {heading}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ConceptCard({ item, type, onOpen, onPray }) {
  const title = item.title || item.name;
  const subtitle = item.short || item.family || item.sin || item.role || item.category || item.tradition;
  const body = item.summary || item.focus || item.distortion || item.meaning || item.association;
  const tone = type === "virtues" ? "green" : type === "sins" ? "red" : type === "inferno" ? "violet" : type === "demons" ? "red" : type === "angels" ? "cyan" : type === "wheel-spirit" ? "blue" : type === "wheel-body" ? "green" : "gold";
  const prayers = getPrayers(item, type);

  return (
    <div className="group relative h-full rounded-[22px] border border-white/10 bg-white/[0.035] shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-violet-300/35 hover:bg-white/[0.06] hover:shadow-[0_18px_44px_rgba(168,85,247,0.12)]">
      <button onClick={() => onOpen(item, type)} className="block w-full p-5 text-left">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Pill tone={tone}>{item.scripture || item.category || item.tag || item.latin || item.opposite || item.sin || (item.circle ? `Circle ${item.circle}` : type)}</Pill>
          <span className="text-xl opacity-60 transition group-hover:opacity-100">↗</span>
        </div>
        <h3 className="text-lg font-bold text-white">{item.circle ? `${item.circle}. ${title}` : title}</h3>
        {subtitle && <p className="mt-1 text-sm text-[#a89ec4]">{subtitle}</p>}
        <p className="mt-4 line-clamp-4 text-sm leading-6 text-[#d4cef0]/85">{body}</p>
      </button>
      {prayers && (
        <div className="border-t border-white/[0.06] px-5 pb-4 pt-3">
          <button
            onClick={(e) => { e.stopPropagation(); onPray(item, type); }}
            className="w-full rounded-xl border border-amber-300/20 bg-amber-300/5 py-2 text-xs font-semibold text-amber-200/80 transition hover:bg-amber-300/10 hover:text-amber-100"
          >
            ✦ Pray
          </button>
        </div>
      )}
    </div>
  );
}

function SectionHeader({ eyebrow, title, children }) {
  return (
    <div className="mb-6">
      <div className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#a89ec4]">{eyebrow}</div>
      <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">{title}</h2>
      {children && <p className="mt-3 max-w-3xl text-sm leading-7 text-[#c8c0e0]">{children}</p>}
    </div>
  );
}

function EmptyResults() {
  return (
    <p className="rounded-2xl border border-dashed border-white/[0.14] bg-white/[0.03] p-5 text-sm text-[#a89ec4]">
      No entries match your search. Try fewer or different words, or clear the search.
    </p>
  );
}

const joinList = (value) => (Array.isArray(value) ? value.join(", ") : value);

// Column sets for the Table view of each card section. `value` feeds sorting
// and the cell text; `render` overrides the cell's markup.
const TABLE_COLUMNS = {
  commandments: [
    { key: "id", label: "No.", value: (r) => r.id, className: "w-12 text-slate-400" },
    { key: "title", label: "Commandment", value: (r) => r.title, primary: true },
    { key: "scripture", label: "Scripture", value: (r) => r.scripture },
    { key: "virtue", label: "Virtue", value: (r) => r.virtue, className: "text-emerald-100" },
    { key: "linkedSin", label: "Linked sin", value: (r) => r.linkedSin, className: "text-red-100" },
    { key: "plain", label: "In plain words", value: (r) => r.plain, wide: true },
  ],
  virtues: [
    { key: "title", label: "Virtue", value: (r) => r.title, primary: true },
    { key: "family", label: "Family", value: (r) => r.family },
    { key: "opposite", label: "Opposes", value: (r) => r.opposite, className: "text-red-100" },
    { key: "summary", label: "Summary", value: (r) => r.summary, wide: true },
  ],
  sins: [
    { key: "title", label: "Sin", value: (r) => r.title, primary: true },
    { key: "latin", label: "Latin", value: (r) => r.latin, className: "italic text-slate-400" },
    { key: "antidote", label: "Antidote", value: (r) => r.antidote, className: "text-emerald-100" },
    { key: "commandment", label: "Commandment", value: (r) => r.commandment },
    { key: "demon", label: "Demon (Binsfeld)", value: (r) => r.demon, className: "text-red-100" },
    { key: "watch", label: "Watch for", value: (r) => r.watch, wide: true },
  ],
  inferno: [
    { key: "circle", label: "Circle", value: (r) => r.circle, className: "w-16 text-slate-400" },
    { key: "title", label: "Name", value: (r) => r.title, primary: true },
    { key: "category", label: "Category", value: (r) => r.category },
    { key: "meaning", label: "Meaning", value: (r) => r.meaning, wide: true },
  ],
  demons: [
    { key: "name", label: "Name", value: (r) => r.name, primary: true },
    { key: "sin", label: "Sin", value: (r) => r.sin, className: "text-red-100" },
    { key: "tradition", label: "Tradition / source", value: (r) => r.tradition },
    { key: "association", label: "Association", value: (r) => r.association, wide: true },
  ],
  angels: [
    { key: "name", label: "Name", value: (r) => r.name, primary: true },
    { key: "category", label: "Category", value: (r) => r.category },
    { key: "traditions", label: "Traditions", value: (r) => r.traditions },
    { key: "role", label: "Role", value: (r) => r.role, wide: true },
    { key: "texts", label: "Texts & sources", value: (r) => r.texts, wide: true },
  ],
};

const DEMON_CLASSIFICATION_COLUMNS = [
  { key: "sin", label: "Deadly sin", value: (r) => r.sin, primary: true },
  { key: "latin", label: "Latin", value: (r) => r.latin, className: "italic text-slate-400" },
  { key: "binsfeld", label: "Binsfeld (1589)", value: (r) => r.binsfeld, className: "font-semibold text-red-100" },
  {
    key: "lanterne",
    label: "Lanterne of Light (c.1409)",
    value: (r) => r.lanterne,
    className: "font-semibold text-red-100",
    render: (r) => (
      <>
        {r.lanterne}
        {!r.agree && (
          <span className="ml-2 inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-200">
            differs
          </span>
        )}
      </>
    ),
  },
  { key: "virtue", label: "Antidote virtue", value: (r) => r.virtue, className: "font-semibold text-emerald-100" },
  { key: "dante", label: "Dante's Inferno", value: (r) => r.dante, wide: true },
];

const SIN_MAP_COLUMNS = [
  { key: "sin", label: "Sin", value: (r) => r.sin, primary: true },
  { key: "antidote", label: "Antidote", value: (r) => r.antidote, className: "font-semibold text-emerald-100" },
  { key: "commandment", label: "Commandment watch", value: (r) => r.commandment },
  { key: "dante", label: "Dante layer", value: (r) => r.dante, wide: true },
  { key: "demon", label: "Demonology", value: (r) => r.demon, className: "font-semibold text-red-100" },
  { key: "watch", label: "Watch for", value: (r) => r.watch, wide: true },
];

const WHEEL_CONNECTION_COLUMNS = [
  { key: "soul", label: "Soul issue", value: (r) => r.soul, primary: true },
  { key: "spirit", label: "Spirit reality (answer)", value: (r) => r.spirit, className: "font-semibold text-sky-100" },
  { key: "scripture", label: "Key scripture", value: (r) => r.scripture },
];

const SORT_GLYPH = { asc: "↑", desc: "↓" };

// A sortable reference table. On narrow screens each row becomes a stacked
// card with its column labels, so wide tables never need sideways scrolling.
// `onRowClick` makes rows open their detail entry; the primary cell is a real
// button so the table works from the keyboard.
function DataTable({ caption, columns, rows, rowKey, onRowClick }) {
  const [sort, setSort] = useState(null);
  const sorted = useMemo(() => {
    if (!sort) return rows;
    const column = columns.find((c) => c.key === sort.key);
    return column ? sortRows(rows, column.value, sort.direction) : rows;
  }, [rows, columns, sort]);

  if (rows.length === 0) return <EmptyResults />;

  const cell = (column, row) => (column.render ? column.render(row) : joinList(column.value(row)));
  const primaryCell = (column, row) =>
    onRowClick ? (
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onRowClick(row);
        }}
        className="text-left font-bold text-white underline decoration-violet-300/30 underline-offset-4 hover:decoration-violet-300"
      >
        {cell(column, row)}
      </button>
    ) : (
      <span className="font-bold text-white">{cell(column, row)}</span>
    );

  return (
    <>
      <div className="hidden overflow-x-auto rounded-3xl border border-white/10 md:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            {caption}
            {sort ? `, sorted by ${columns.find((c) => c.key === sort.key)?.label} (${sort.direction === "asc" ? "ascending" : "descending"})` : ""}
          </caption>
          <thead>
            <tr className="border-b border-white/10 bg-white/10 text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
              {columns.map((column) => {
                const active = sort?.key === column.key;
                return (
                  <th
                    key={column.key}
                    scope="col"
                    aria-sort={active ? (sort.direction === "asc" ? "ascending" : "descending") : undefined}
                    className="p-0 font-bold"
                  >
                    {column.sortable === false ? (
                      <span className="block p-4">{column.label}</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSort((current) => nextSort(current, column.key))}
                        className={`flex w-full items-center gap-1.5 p-4 text-left uppercase tracking-[0.16em] transition hover:text-white ${active ? "text-white" : ""}`}
                      >
                        {column.label}
                        <span aria-hidden="true" className={active ? "text-violet-300" : "text-white/20"}>
                          {active ? SORT_GLYPH[sort.direction] : "↕"}
                        </span>
                      </button>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => (
              <tr
                key={rowKey(row)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={`border-b border-white/10 bg-white/[0.03] align-top last:border-b-0 ${onRowClick ? "cursor-pointer transition hover:bg-white/[0.07]" : ""}`}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`p-4 text-sm leading-6 text-slate-300 ${column.wide ? "min-w-[16rem]" : ""} ${column.className || ""}`}
                  >
                    {column.primary ? primaryCell(column, row) : cell(column, row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="grid gap-3 md:hidden" aria-label={caption}>
        {sorted.map((row) => {
          const primary = columns.find((c) => c.primary) || columns[0];
          return (
            <li key={rowKey(row)} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-base">{primaryCell(primary, row)}</div>
              <dl className="mt-3 grid gap-2">
                {columns
                  .filter((c) => c !== primary)
                  .map((column) => {
                    const content = cell(column, row);
                    if (content == null || content === "") return null;
                    return (
                      <div key={column.key}>
                        <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#7a7096]">{column.label}</dt>
                        <dd className={`text-sm leading-6 text-slate-300 ${column.className || ""}`}>{content}</dd>
                      </div>
                    );
                  })}
              </dl>
            </li>
          );
        })}
      </ul>
    </>
  );
}

// Card or table, for the sections that list one kind of entry.
function EntryView({ view, items, type, caption, onOpen, onPray }) {
  if (view === "table" && TABLE_COLUMNS[type]) {
    return (
      <DataTable
        caption={caption}
        columns={TABLE_COLUMNS[type]}
        rows={items}
        rowKey={(row) => row.id ?? row.title ?? row.name}
        onRowClick={(row) => onOpen(row, type)}
      />
    );
  }
  return <GridView items={items} type={type} onOpen={onOpen} onPray={onPray} />;
}

function ViewToggle({ view, onChange }) {
  return (
    <div role="group" aria-label="Display as" className="inline-flex shrink-0 self-start rounded-full sm:self-auto border border-white/[0.14] bg-white/[0.04] p-1">
      {[
        { id: "cards", label: "Cards", icon: "▦" },
        { id: "table", label: "Table", icon: "☰" },
      ].map((option) => (
        <button
          key={option.id}
          type="button"
          aria-pressed={view === option.id}
          onClick={() => onChange(option.id)}
          className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
            view === option.id ? "bg-violet-300/20 text-white" : "text-[#a89ec4] hover:text-white"
          }`}
        >
          <span aria-hidden="true">{option.icon}</span>
          {option.label}
        </button>
      ))}
    </div>
  );
}

function GridView({ items, type, onOpen, onPray }) {
  if (items.length === 0) return <EmptyResults />;
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => (
        <ConceptCard key={`${type}-${item.title || item.name}-${index}`} item={item} type={type} onOpen={onOpen} onPray={onPray} />
      ))}
    </div>
  );
}

const toneClasses = {
  blue: {
    pill: "text-sky-200 bg-sky-500/15 border border-sky-400/20",
    border: "border-sky-400/15 hover:border-sky-400/35",
    eyebrow: "text-sky-300/80",
    btn: "text-sky-300/60 hover:text-sky-200",
  },
  cyan: {
    pill: "text-cyan-200 bg-cyan-500/15 border border-cyan-400/20",
    border: "border-cyan-400/15 hover:border-cyan-400/35",
    eyebrow: "text-cyan-300/80",
    btn: "text-cyan-300/60 hover:text-cyan-200",
  },
  gold: {
    pill: "text-amber-200 bg-amber-500/15 border border-amber-400/20",
    border: "border-amber-400/15 hover:border-amber-400/35",
    eyebrow: "text-amber-300/80",
    btn: "text-amber-300/60 hover:text-amber-200",
  },
  green: {
    pill: "text-emerald-200 bg-emerald-500/15 border border-emerald-400/20",
    border: "border-emerald-400/15 hover:border-emerald-400/35",
    eyebrow: "text-emerald-300/80",
    btn: "text-emerald-300/60 hover:text-emerald-200",
  },
  violet: {
    pill: "text-violet-200 bg-violet-500/15 border border-violet-400/20",
    border: "border-violet-400/15 hover:border-violet-400/35",
    eyebrow: "text-violet-300/80",
    btn: "text-violet-300/60 hover:text-violet-200",
  },
};

function PrayerThemeCard({ theme, catLabel, tone, onPray }) {
  const tc = toneClasses[tone] || toneClasses.blue;
  const hasPrayers = !!prayerData.themes?.[theme.title];
  return (
    <div className={`flex flex-col rounded-2xl border bg-white/[0.03] p-5 transition-colors ${tc.border}`}>
      <div className={`mb-3 inline-block self-start rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-[0.15em] ${tc.pill}`}>
        {catLabel}
      </div>
      <h3 className="text-base font-bold text-white">{theme.title}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-6 text-slate-400">{theme.description}</p>
      {hasPrayers && (
        <button
          onClick={() => onPray({ title: theme.title }, "themes")}
          className={`mt-4 self-start text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${tc.btn}`}
        >
          ✦ Open Prayers
        </button>
      )}
    </div>
  );
}

const prayerSelectClass =
  "w-full rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white outline-none transition-colors hover:border-white/30 focus:border-violet-300/60 [&>option]:bg-[#0c0e18] [&>optgroup]:bg-[#0c0e18] [&>optgroup]:font-bold";

function PrayersSection({ openPrayer, query }) {
  const [categoryId, setCategoryId] = useState("all");

  const themesWithPrayers = useMemo(
    () =>
      prayerThemesCategories.flatMap((cat) =>
        cat.themes.filter((theme) => !!prayerData.themes?.[theme.title])
      ),
    []
  );

  const visibleCategories = (
    categoryId === "all"
      ? prayerThemesCategories
      : prayerThemesCategories.filter((cat) => cat.id === categoryId)
  )
    .map((cat) => ({ ...cat, themes: filterByQuery(cat.themes, query) }))
    .filter((cat) => cat.themes.length > 0);

  const pickRandom = () => {
    if (themesWithPrayers.length === 0) return;
    const pick = themesWithPrayers[Math.floor(Math.random() * themesWithPrayers.length)];
    openPrayer({ title: pick.title }, "themes");
  };

  const openTheme = (title) => {
    if (title) openPrayer({ title }, "themes");
  };

  return (
    <div>
      <SectionHeader eyebrow="Thematic prayer" title="Prayer Themes">
        Prayers organized by spiritual posture, the Beatitudes, the Fruits of the Spirit, life seasons, and formation themes — independent of the Ten Commandments framework. Each card opens three prayers for that theme.
      </SectionHeader>

      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Filter by category</span>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className={prayerSelectClass}
          >
            <option value="all">All categories</option>
            {prayerThemesCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Jump to a prayer theme</span>
          <select
            value=""
            onChange={(e) => openTheme(e.target.value)}
            className={prayerSelectClass}
          >
            <option value="">Choose a theme…</option>
            {prayerThemesCategories.map((cat) => {
              const items = cat.themes.filter((theme) => !!prayerData.themes?.[theme.title]);
              if (items.length === 0) return null;
              return (
                <optgroup key={cat.id} label={cat.label}>
                  {items.map((theme) => (
                    <option key={theme.title} value={theme.title}>{theme.title}</option>
                  ))}
                </optgroup>
              );
            })}
          </select>
        </label>

        <button
          onClick={pickRandom}
          className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/10"
        >
          <span className="text-base">⟳</span> Surprise Me
        </button>
      </div>

      {visibleCategories.length === 0 && <EmptyResults />}
      <div className="space-y-12">
        {visibleCategories.map((cat) => {
          const tc = toneClasses[cat.tone] || toneClasses.blue;
          return (
            <div key={cat.id}>
              <div className={`mb-1 text-xs font-bold uppercase tracking-[0.14em] ${tc.eyebrow}`}>{cat.eyebrow}</div>
              <h3 className="mb-2 text-2xl font-black text-white">{cat.label}</h3>
              <p className="mb-6 max-w-2xl text-sm leading-6 text-slate-400">{cat.description}</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cat.themes.map((theme) => (
                  <PrayerThemeCard key={theme.title} theme={theme} catLabel={cat.label} tone={cat.tone} onPray={openPrayer} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EmbeddedLoading({ label }) {
  return (
    <div role="status" aria-live="polite" className="py-16 text-center text-sm font-bold uppercase tracking-[0.12em] text-[#a89ec4]">
      <span aria-hidden="true">✦</span> Opening the {label}…
    </div>
  );
}

function SectionPageContent({ tabId, searchable, query, view, openModal, openPrayer, onEmbeddedNavigate, embeddedInitialSection }) {
  // Comparison-table rows are keyed by sin name; open that sin's full entry.
  const openSinByTitle = (row) => {
    const sin = sins.find((entry) => entry.title === row.sin);
    if (sin) openModal(sin, "sins");
  };

  if (tabId === "commandments") {
    return (
      <div>
        <SectionHeader eyebrow="Bible foundation" title="The 10 Commandments">
          A clean card view for Exodus 20, with each commandment translated into a moral focus, a reflection question, linked virtue, and linked sin pattern.
        </SectionHeader>
        <EntryView view={view} items={searchable.commandments} type="commandments" caption="The 10 Commandments" onOpen={openModal} onPray={openPrayer} />
      </div>
    );
  }

  if (tabId === "virtues") {
    return (
      <div>
        <SectionHeader eyebrow="Character formation" title="Virtues as antidotes">
          Includes the seven heavenly virtues plus major cardinal/theological virtues so the app has more depth than only "sin vs punishment."
        </SectionHeader>
        <EntryView view={view} items={searchable.virtues} type="virtues" caption="Virtues" onOpen={openModal} onPray={openPrayer} />
      </div>
    );
  }

  if (tabId === "sins") {
    return (
      <div>
        <SectionHeader eyebrow="Distorted desire" title="The 7 Deadly Sins">
          Each sin is framed as a good desire bent out of order. This makes it easier to study psychologically, spiritually, and symbolically.
        </SectionHeader>
        <EntryView view={view} items={searchable.sins} type="sins" caption="The 7 Deadly Sins" onOpen={openModal} onPray={openPrayer} />
      </div>
    );
  }

  if (tabId === "inferno") {
    return (
      <div>
        <SectionHeader eyebrow="Literary layer" title="Dante's Inferno circles">
          Dante's Inferno is not a simple Bible chart. It is medieval Christian poetry with symbolic punishments, moral categories, and a dramatic descent through disordered love.
        </SectionHeader>
        <div className={view === "table" ? "grid gap-4" : "grid gap-4 lg:grid-cols-3"}>
          <div className={`rounded-3xl border border-violet-300/20 bg-violet-500/10 p-5 ${view === "table" ? "" : "lg:col-span-1"}`}>
            <h3 className="text-lg font-bold text-white">Descent logic</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">Dante moves from less deliberate disorders of appetite into deeper forms of malice: heresy, violence, fraud, and treachery. The bottom is not fire, but frozen betrayal.</p>
          </div>
          <div className={view === "table" ? "" : "lg:col-span-2"}>
            <EntryView view={view} items={searchable.inferno} type="inferno" caption="Dante's Inferno circles" onOpen={openModal} onPray={openPrayer} />
          </div>
        </div>
      </div>
    );
  }

  if (tabId === "demons") {
    return (
      <div>
        <SectionHeader eyebrow="Association layer" title="Demonology associations">
          These cards are best treated as historical/literary association maps. Binsfeld's seven-princes scheme maps demons to the seven deadly sins, while other biblical names belong to separate symbolic categories.
        </SectionHeader>
        <div className="mb-6 rounded-3xl border border-red-300/20 bg-red-500/10 p-5 text-sm leading-7 text-red-50/90">
          <strong>Design rule:</strong> Keep "Biblical figure/name," "Dante character," and "later demonology association" as separate labels. That makes the frontend feel trustworthy instead of conspiracy-board messy.
        </div>
        <EntryView view={view} items={searchable.demons} type="demons" caption="Demonology associations" onOpen={openModal} onPray={openPrayer} />

        <div className="mt-10">
          <SectionHeader eyebrow="Classification grid" title="Seven deadly sins → demon princes">
            A comprehensive cross-reference of the seven deadly sins and the demon "prince" assigned to each by the two most influential historical schemes: Peter Binsfeld's <em>Tractatus de confessionibus maleficorum et sagarum</em> (1589) and the earlier Lollard tract the <em>Lanterne of Light</em> (c. 1409–1410). Where the two disagree, the row is marked so you can see the tradition is not a single fixed doctrine.
          </SectionHeader>

          <DataTable
            caption="Seven deadly sins mapped to demon princes by Binsfeld and the Lanterne of Light"
            columns={DEMON_CLASSIFICATION_COLUMNS}
            rows={searchable.demonClassification}
            rowKey={(row) => row.sin}
            onRowClick={openSinByTitle}
          />

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-emerald-300/20 bg-emerald-500/[0.07] p-5">
              <p className="mb-2 text-sm font-bold text-emerald-100">Where the schemes agree</p>
              <p className="text-sm leading-7 text-slate-300">
                Pride/Lucifer, Greed/Mammon, Lust/Asmodeus, and Wrath/Satan are stable across both traditions — the four most widely attested sin-to-demon pairings.
              </p>
            </div>
            <div className="rounded-3xl border border-amber-300/20 bg-amber-300/[0.07] p-5">
              <p className="mb-2 text-sm font-bold text-amber-100">Where they diverge</p>
              <p className="text-sm leading-7 text-slate-300">
                Envy, Gluttony, and Sloth are assigned differently. Beelzebub shifts between gluttony and envy; Belphegor between sloth and gluttony; and Leviathan (Binsfeld) is replaced by Abaddon for sloth in the Lanterne of Light.
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {demonClassification.filter((row) => !row.agree).map((row) => (
              <div key={row.sin} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-slate-300">
                <span className="font-semibold text-red-100">{row.sin}:</span> {row.note}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (tabId === "angels") {
    const groups = ANGEL_FILTERS.filter((c) => c !== "All")
      .map((cat) => ({ cat, items: searchable.angels.filter((a) => a.category === cat) }))
      .filter((g) => g.items.length > 0);
    return (
      <div>
        <SectionHeader eyebrow="Across traditions" title="Angelology">
          Celestial beings across the world&apos;s traditions — Archangels, the Celestial Hierarchy, Kabbalistic angels, Islamic Malak, Zoroastrian Amesha Spentas, and Apocryphal figures. Where a name, rank, or canonical status differs across traditions, that difference is noted on each card.
        </SectionHeader>
        <div className="mb-6 rounded-3xl border border-cyan-300/20 bg-cyan-500/10 p-5 text-sm leading-7 text-cyan-50/90">
          <strong>Design rule:</strong> These cards present angels as each tradition describes them — not as a single doctrine. Names, ranks, and associations vary widely between Scripture, later Jewish and Christian writings, Islam, Zoroastrianism, and esoteric texts. Treat the esoteric and apocryphal material as tradition, not canon.
        </div>
        {groups.length === 0 ? (
          <EmptyResults />
        ) : view === "table" ? (
          <EntryView view={view} items={groups.flatMap((g) => g.items)} type="angels" caption="Angelology" onOpen={openModal} onPray={openPrayer} />
        ) : (
          <div className="space-y-8">
            {groups.map(({ cat, items }) => (
              <div key={cat}>
                <div className="mb-3 flex items-center gap-3">
                  <Pill tone="cyan">{cat}</Pill>
                  <span className="text-xs text-slate-400">{items.length} {items.length === 1 ? "being" : "beings"}</span>
                </div>
                <GridView items={items} type="angels" onOpen={openModal} onPray={openPrayer} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (tabId === "demonology-atlas") {
    return (
      <Suspense fallback={<EmbeddedLoading label="Demonology Atlas" />}>
        <DemonologyAtlas
          embedded
          initialSection={embeddedInitialSection}
          onNavigate={onEmbeddedNavigate}
        />
      </Suspense>
    );
  }

  if (tabId === "infernal-codex") {
    return (
      <Suspense fallback={<EmbeddedLoading label="Infernal Codex" />}>
        <InfernalCodex
          embedded
          onNavigate={onEmbeddedNavigate}
        />
      </Suspense>
    );
  }

  if (tabId === "prayers") {
    return <PrayersSection openPrayer={openPrayer} query={query} />;
  }

  if (tabId === "map") {
    return (
      <div>
        <SectionHeader eyebrow="Comparison mode" title="Sin → virtue → commandment → Dante → demonology">
          This is the page that makes the whole system click. It turns the lists into a relationship map.
        </SectionHeader>
        <DataTable
          caption="Each deadly sin with its antidote, commandment, Dante layer, and demonology association"
          columns={SIN_MAP_COLUMNS}
          rows={searchable.sinMap}
          rowKey={(row) => row.sin}
          onRowClick={openSinByTitle}
        />
      </div>
    );
  }

  if (tabId === "wheel") {
    return (
      <div>
        <SectionHeader eyebrow="Christian counseling framework" title="Soul · Spirit · Body Wheel">
          From <em>Handbook to Happiness</em> (Charles R. Solomon), this wheel diagram maps how unresolved soul patterns — inferiority, guilt, fear — produce body symptoms, and how Spirit realities in Christ directly address each soul disorder.
        </SectionHeader>

        <div className="mb-6 rounded-3xl border border-sky-300/20 bg-sky-500/10 p-5 text-sm leading-7 text-sky-50/90">
          <strong>Source:</strong> Part I of <em>Handbook to Happiness and You — A Spiritual Clinic</em> by Charles R. Solomon. This is a Christian counseling framework for personal reflection and spiritual care, not a medical diagnosis tool. Always consult a qualified physician for physical or mental health concerns.
        </div>

        <div className="mb-8 grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl border border-amber-300/25 bg-amber-500/10 p-6">
            <Pill tone="gold">Soul · Personality</Pill>
            <h3 className="mt-4 text-2xl font-black text-white">Soul</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">The inner life of mind, will, and emotions. When the spirit is not anchored in Christ, soul patterns become disordered — producing inferiority, insecurity, guilt, and fear.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Inferiority", "Insecurity", "Inadequacy", "Guilt", "Worry & Fears"].map((s) => <Pill key={s} tone="gold">{s}</Pill>)}
            </div>
          </div>
          <div className="rounded-3xl border border-sky-300/25 bg-sky-500/10 p-6">
            <Pill tone="blue">Spirit · Redemption</Pill>
            <h3 className="mt-4 text-2xl font-black text-white">Spirit</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">The deepest part of the person — the capacity for God-relationship. When yielded to Christ, the spirit becomes the source from which soul and body are renewed.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Salvation", "Assurance", "Security", "Acceptance", "Total Commitment"].map((s) => <Pill key={s} tone="blue">{s}</Pill>)}
            </div>
            <p className="mt-3 text-xs text-sky-200/60">Romans 12:1</p>
          </div>
          <div className="rounded-3xl border border-emerald-300/25 bg-emerald-500/10 p-6">
            <Pill tone="green">Body · Psychosomatic</Pill>
            <h3 className="mt-4 text-2xl font-black text-white">Body</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">The body bears the weight of what the soul cannot process. Unresolved soul pain — guilt, fear, hostility — produces measurable physical symptoms through the stress response.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Tension / Migraine", "Insomnia", "Hypertension", "Fatigue", "Palpitations"].map((s) => <Pill key={s} tone="green">{s}</Pill>)}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-amber-300/80">Soul · Personality</div>
          <h3 className="mb-4 text-2xl font-black text-white">The 5 Soul Issues</h3>
          <GridView items={searchable.wheelSoulIssues} type="wheel-soul" onOpen={openModal} onPray={openPrayer} />
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-amber-300/80">Soul · Mind Patterns</div>
            <div className="grid gap-3">
              {searchable.wheelMindPatterns.map((item) => (
                <ConceptCard key={item.title} item={item} type="wheel-mind" onOpen={openModal} onPray={openPrayer} />
              ))}
            </div>
          </div>
          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-amber-300/80">Soul · Emotional Patterns</div>
            <div className="grid gap-3">
              {searchable.wheelEmotions.map((item) => (
                <ConceptCard key={item.title} item={item} type="wheel-emotion" onOpen={openModal} onPray={openPrayer} />
              ))}
              <div className="rounded-2xl border border-amber-300/15 bg-amber-500/5 p-4 text-sm leading-6 text-slate-300">
                <strong className="text-amber-200">Flow patterns:</strong> Unresolved soul issues channel outward as <em>Hostility</em> (toward others) and <em>Frustration</em> (at circumstances) — depicted in the original diagram as arrows pointing back inward to the self.
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-sky-300/80">Spirit · Redemptive Realities</div>
          <h3 className="mb-4 text-2xl font-black text-white">The 5 Spirit Realities</h3>
          <GridView items={searchable.wheelSpirit} type="wheel-spirit" onOpen={openModal} onPray={openPrayer} />
        </div>

        <div className="mb-8">
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-emerald-300/80">Body · Psychosomatic Symptoms</div>
          <h3 className="mb-4 text-2xl font-black text-white">Body Manifestations</h3>
          <div className="mb-4 rounded-3xl border border-emerald-300/20 bg-emerald-500/10 p-5 text-sm leading-7 text-emerald-50/90">
            These physical symptoms are recognized psychosomatic patterns — real physiological suffering produced by chronic psychological and spiritual stress. This framework is for spiritual reflection only; all health concerns require qualified medical care.
          </div>
          <GridView items={searchable.wheelBody} type="wheel-body" onOpen={openModal} onPray={openPrayer} />
        </div>

        <div>
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-white/60">Integration</div>
          <h3 className="mb-4 text-2xl font-black text-white">Soul Issue → Spirit Answer</h3>
          <DataTable
            caption="Soul issues and the spirit reality that answers each"
            columns={WHEEL_CONNECTION_COLUMNS}
            rows={searchable.wheelConnections}
            rowKey={(row) => row.soul}
          />
        </div>
      </div>
    );
  }

  if (tabId === "love-deities") {
    const deities = [
      {
        name: 'Aphrodite',
        tradition: 'Greek',
        roman: 'Venus',
        symbol: '♀',
        accent: '#f9a8d4',
        domains: ['Love', 'Beauty', 'Desire', 'Pleasure'],
        desc: 'Born from sea foam, she embodies the irresistible pull of beauty and romantic longing. Associated with the planet Venus and the morning star.',
        note: 'Her power was not merely seduction — she represented the force that draws all living things toward union and completion.',
      },
      {
        name: 'Eros',
        tradition: 'Greek',
        roman: 'Cupid',
        symbol: '↝',
        accent: '#fb7185',
        domains: ['Love', 'Fertility', 'Desire'],
        desc: 'A winged youth carrying bow and golden arrows. His arrows pierce the heart without warning, symbolizing the involuntary nature of attraction.',
        note: 'In earlier traditions Eros was a primordial force — not a child but a cosmic power present at creation, the impulse that brings opposites together.',
      },
      {
        name: 'Freya',
        tradition: 'Norse',
        roman: '—',
        symbol: '⚡',
        accent: '#fbbf24',
        domains: ['Love', 'Beauty', 'Fertility', 'War', 'Death'],
        desc: 'One of the most powerful Norse deities, she rides a chariot pulled by cats and possesses a falcon-feather cloak. Half of those slain in battle are taken to her realm Fólkvangr.',
        note: 'Her pairing of love and war reveals the ancient understanding that passion and mortality are inseparable — desire always carries risk.',
      },
      {
        name: 'Ishtar',
        tradition: 'Mesopotamian',
        roman: '—',
        symbol: '★',
        accent: '#a78bfa',
        domains: ['Love', 'Beauty', 'Sex', 'War', 'Justice', 'Political Power'],
        desc: 'One of the most important deities of the ancient world, worshipped across Babylonia and Assyria. Her symbol was the eight-pointed star; her planet was Venus.',
        note: 'Ishtar\'s descent into the underworld — removing her powers at each gate — is one of the oldest recorded narratives of death and transformation.',
      },
      {
        name: 'Kamadeva',
        tradition: 'Hindu',
        roman: '—',
        symbol: '🏹',
        accent: '#34d399',
        domains: ['Love', 'Desire', 'Sensuality'],
        desc: 'The god of love in Hindu tradition, depicted as a handsome youth carrying a bow of sugarcane strung with bees and arrows tipped with fragrant flowers.',
        note: 'Kamadeva was burned to ash by Shiva\'s third eye for interrupting his meditation — symbolizing the tension between ascetic discipline and the force of desire.',
      },
      {
        name: 'Hathor',
        tradition: 'Egyptian',
        roman: '—',
        symbol: '☽',
        accent: '#22d3ee',
        domains: ['Love', 'Beauty', 'Music', 'Fertility', 'Joy'],
        desc: 'Depicted with the horns of a cow and a solar disk, she was the goddess of feminine beauty, dance, and the joyful side of life. Associated with the Milky Way.',
        note: 'As both a nurturing mother figure and a wild, sensual force, Hathor embodied the full range of the feminine divine — from tender care to ecstatic celebration.',
      },
    ];
    const visibleDeities = filterByQuery(deities, query);

    return (
      <div>
        <SectionHeader eyebrow="Comparative mythology" title="Love & Lust Deities">
          Divine figures from six world traditions who embody love, desire, beauty, and passion. Each reflects how a culture understood the transformative — and sometimes dangerous — power of attraction and union.
        </SectionHeader>

        {visibleDeities.length === 0 && <EmptyResults />}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleDeities.map((d) => (
            <div key={d.name} style={{ borderColor: `${d.accent}30` }} className="rounded-3xl border bg-white/[0.04] p-6">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span style={{ color: d.accent }} className="text-xl font-bold">{d.symbol}</span>
                    <h3 style={{ color: d.accent }} className="text-lg font-black">{d.name}</h3>
                  </div>
                  <div className="mt-1 flex gap-2 text-xs text-slate-400">
                    <span>{d.tradition}</span>
                    {d.roman !== '—' && <><span>·</span><span>Roman: {d.roman}</span></>}
                  </div>
                </div>
              </div>

              <div className="mb-3 flex flex-wrap gap-2">
                {d.domains.map((dom) => (
                  <span key={dom} style={{ color: d.accent, background: `${d.accent}14`, borderColor: `${d.accent}28` }}
                    className="rounded-full border px-3 py-0.5 text-xs font-semibold">{dom}</span>
                ))}
              </div>

              <p className="mb-3 text-sm leading-6 text-slate-300">{d.desc}</p>

              <p style={{ borderLeftColor: `${d.accent}40` }} className="border-l-2 pl-3 text-xs italic leading-5 text-slate-400">{d.note}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

// Matches the home screen: near-black base, violet/blue/pink glows, and a faint
// 52px grid. The glow layers are fixed so long sections keep them in view.
function PageShell({ children }) {
  return (
    <div className="relative min-h-screen bg-[#07090f] font-[Inter,ui-sans-serif,system-ui,-apple-system,sans-serif] text-[#f1eeff]">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          background: `
            radial-gradient(circle at 18% 18%, rgba(168,85,247,0.22), transparent 34%),
            radial-gradient(circle at 82% 12%, rgba(87,184,255,0.16), transparent 30%),
            radial-gradient(circle at 50% 92%, rgba(255,114,200,0.13), transparent 32%)
          `,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// The home sidebar's glass panel.
const PANEL =
  "rounded-[28px] border border-violet-300/20 bg-[rgba(12,14,24,0.72)] shadow-[0_22px_65px_rgba(0,0,0,0.24)] backdrop-blur-[18px]";

const TOP_BAR = "sticky top-0 z-40 border-b border-white/[0.08] bg-[#07090f]/75 backdrop-blur-xl";
const PILL_BUTTON =
  "inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.05] px-4 py-2 text-sm font-extrabold text-[#d8ceff] transition hover:border-violet-300/40 hover:bg-white/10";

const GRADIENT_TEXT = "bg-[linear-gradient(100deg,#c084fc_0%,#f0abfc_40%,#93c5fd_100%)] bg-clip-text text-transparent";

// Overview tiles double as shortcuts into their section.
const OVERVIEW_TILES = [
  { id: "commandments", num: "10", label: "Commandments", text: "Outer law and inner allegiance", tone: "gold" },
  { id: "virtues", num: "12", label: "Virtues", text: "Antidotes and character formation", tone: "green" },
  { id: "sins", num: "7", label: "Deadly Sins", text: "Distorted desire patterns", tone: "red" },
  { id: "inferno", num: "9", label: "Inferno Circles", text: "Dante's symbolic moral descent", tone: "violet" },
  { id: "demonology-atlas", num: "Atlas", label: "Demonology", text: "Long-form articles and tradition comparison", tone: "red" },
  { id: "infernal-codex", num: "A–Z", label: "Infernal Codex", text: "Searchable entity and concept database", tone: "gold" },
];

const VIEW_STORAGE_KEY = "moral-atlas-view";

function readStoredView() {
  return readJSON(VIEW_STORAGE_KEY, "cards") === "table" ? "table" : "cards";
}

export default function BibleConceptAtlas({ onBack, onNavigate, initialSection }) {
  // Allow deep-linking into a tab. Legacy routes map onto embedded sections.
  const normalizedInitial = normalizeInitialSection(initialSection, SECTION_LINKS);
  // Only used when there is no router (onNavigate) to put the section in the
  // URL; with one, App remounts this component per ?section= value.
  const [subPage, setSubPage] = useState(
    normalizedInitial.tab
  );
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(null);
  const [prayerModal, setPrayerModal] = useState(null);
  const [view, setViewState] = useState(readStoredView);
  const setView = (next) => {
    setViewState(next);
    writeJSON(VIEW_STORAGE_KEY, next);
  };

  const activeChipRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Bring the current section's chip into view in the scrollable strip.
    const chip = activeChipRef.current;
    const strip = chip?.parentElement;
    if (chip && strip) {
      strip.scrollLeft = chip.offsetLeft - (strip.clientWidth - chip.offsetWidth) / 2;
    }
  }, [subPage]);

  useEffect(() => {
    const tab = tabs.find((t) => t.id === subPage);
    if (tab) document.title = `${tab.label} · Sacred Moral Atlas · Sacred Pathways`;
  }, [subPage]);

  const searchable = useMemo(() => {
    const filterItems = (items) => filterByQuery(items, query);
    return {
      commandments: filterItems(commandments),
      virtues: filterItems(virtues),
      sins: filterItems(sins),
      inferno: filterItems(inferno),
      demons: filterItems(demons),
      angels: filterItems(angels),
      wheelSoulIssues: filterItems(wheelSoulIssues),
      wheelMindPatterns: filterItems(wheelMindPatterns),
      wheelEmotions: filterItems(wheelEmotions),
      wheelSpirit: filterItems(wheelSpiritRealities),
      wheelBody: filterItems(wheelBodySymptoms),
      wheelConnections: filterItems(wheelConnectionMap),
      demonClassification: filterItems(demonClassification),
      sinMap: filterItems(sinMap),
    };
  }, [query]);

  const openModal = (item, type) => setModal({ item, type });
  const openPrayer = (item, type) => {
    const prayers = getPrayers(item, type);
    if (!prayers) return;
    const title = item.title || item.name || `Circle ${item.circle}`;
    setPrayerModal({ prayers, title, type });
  };

  // Each section is its own URL (?section=virtues), so it can be bookmarked or
  // shared and the browser's Back/Forward move between sections.
  const navigateTo = (tabId) => {
    if (onNavigate) {
      onNavigate("biblical", { section: tabId });
      return;
    }
    setSubPage(tabId);
    setQuery("");
  };

  const navigateEmbedded = (portalId) => {
    if (portalId === "demonology") {
      navigateTo("demonology-atlas");
      return;
    }
    if (portalId === "infernalcodex") {
      navigateTo("infernal-codex");
      return;
    }
    onNavigate?.(portalId);
  };

  const goHome = () => {
    if (onNavigate) {
      onNavigate("biblical");
      return;
    }
    setSubPage(null);
    setQuery("");
  };

  const modals = (
    <>
      {modal && <DetailModal item={modal.item} type={modal.type} onClose={() => setModal(null)} onPray={openPrayer} />}
      {prayerModal && (
        <PrayerModal
          prayers={prayerModal.prayers}
          title={prayerModal.title}
          type={prayerModal.type}
          onClose={() => setPrayerModal(null)}
        />
      )}
    </>
  );

  // Sub-page view
  if (subPage) {
    const tab = tabs.find((t) => t.id === subPage);
    const showSectionSearch = !embeddedAtlasTabs.has(subPage);
    return (
      <PageShell>
        <div className={TOP_BAR}>
          <div className="mx-auto flex max-w-[1440px] items-center gap-3 px-4 py-3 sm:px-6 lg:px-10">
            <button onClick={goHome} className={`${PILL_BUTTON} min-w-0`}>
              <span aria-hidden="true">←</span>
              <span className="truncate">
                <span className="sm:hidden">Atlas</span>
                <span className="hidden sm:inline">Sacred Moral &amp; Mythic Atlas</span>
              </span>
            </button>
            <span className="min-w-0 truncate text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#a89ec4]">
              <span aria-hidden="true">{tab.icon}</span> {tab.label}
            </span>
          </div>
          {/* Every section one tap away, so moving between them doesn't need a
              trip back to the overview. */}
          <nav aria-label="Atlas sections" className="mx-auto max-w-[1440px] px-4 pb-3 sm:px-6 lg:px-10">
            <div className="relative flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {tabs.map((t) => {
                const active = t.id === subPage;
                return (
                  <button
                    key={t.id}
                    ref={active ? activeChipRef : undefined}
                    onClick={() => (t.id === "overview" ? goHome() : navigateTo(t.id))}
                    aria-current={active ? "page" : undefined}
                    className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                      active
                        ? "border-violet-300/50 bg-violet-300/15 text-white"
                        : "border-white/10 bg-white/[0.03] text-[#a89ec4] hover:border-violet-300/30 hover:text-white"
                    }`}
                  >
                    <span aria-hidden="true">{t.icon}</span>
                    {t.label}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 md:py-8 lg:px-10">
          {/* The page's name for screen readers and the document outline; the
              section's own SectionHeader is the visible title. The embedded
              atlases (Demonology, Infernal Codex) carry their own h1. */}
          {showSectionSearch && <h1 className="sr-only">{tab.label}</h1>}
          {showSectionSearch && (
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-3 rounded-full border border-white/[0.14] bg-white/[0.06] py-2 pl-5 pr-2 backdrop-blur-xl focus-within:border-violet-300/50">
              <span aria-hidden="true" className="text-lg text-[#a89ec4]">⌕</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${tab.label.toLowerCase()}…`}
                aria-label={`Search ${tab.label}`}
                className="min-w-0 flex-1 bg-transparent py-2 text-[0.95rem] text-[#f1eeff] outline-none placeholder:text-[#7a7096]"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="rounded-full border border-white/[0.12] bg-white/[0.08] px-4 py-1.5 text-xs font-bold text-[#d8ceff] transition hover:bg-white/[0.14]"
                >
                  Clear
                </button>
              )}
            </div>
            {TABLE_COLUMNS[subPage] && <ViewToggle view={view} onChange={setView} />}
            </div>
          )}

          <section className={`${PANEL} p-5 sm:p-6 md:p-8`}>
            <SectionPageContent
              tabId={subPage}
              searchable={searchable}
              query={query}
              view={view}
              openModal={openModal}
              openPrayer={openPrayer}
              onEmbeddedNavigate={navigateEmbedded}
              embeddedInitialSection={normalizedInitial.childSection}
            />
          </section>
        </main>

        {modals}
      </PageShell>
    );
  }

  // Home / overview view
  return (
    <PageShell>
      {onBack && (
        <div className={TOP_BAR}>
          <div className="mx-auto flex max-w-[1440px] items-center gap-3 px-4 py-3 sm:px-6 lg:px-10">
            <button onClick={onBack} className={PILL_BUTTON}>
              <span aria-hidden="true">←</span> Back to Home
            </button>
            <span className="hidden truncate text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#a89ec4] sm:inline">
              Sacred Moral &amp; Mythic Atlas
            </span>
          </div>
        </div>
      )}

      <div className="mx-auto grid w-full max-w-[1440px] gap-6 px-4 py-6 sm:px-6 md:py-10 lg:grid-cols-[minmax(300px,360px)_minmax(0,1fr)] lg:gap-10 lg:px-10">
        <aside className="lg:sticky lg:top-[4.5rem] lg:self-start">
          <div className={`${PANEL} p-5 sm:p-6`}>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/30 bg-[linear-gradient(135deg,rgba(251,191,36,0.32),rgba(168,85,247,0.22))] text-xl text-amber-100"
              >
                ✠
              </span>
              <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-[0.7rem] font-bold tracking-[0.04em] text-amber-100">
                Sacred Traditions Atlas
              </span>
            </div>
            <h1 className="mt-5 text-[2.4rem] font-black leading-[0.92] tracking-[-0.06em] text-white sm:text-[2.75rem]">
              Sacred Moral
              <span className={`block ${GRADIENT_TEXT}`}>&amp; Mythic Atlas</span>
            </h1>
            <p className="mt-4 text-sm leading-6 text-[#c8c0e0]">
              Biblical foundations, virtue ethics, angelology, demonology, Dante's symbolic hell, and mythic codex references.
            </p>

            <div className="mt-6 mb-3 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#7a7096]">Sections</div>
            <nav aria-label="Atlas sections" className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-1">
              {tabs.map((tab) => {
                const active = tab.id === "overview";
                return (
                  <button
                    key={tab.id}
                    onClick={() => !active && navigateTo(tab.id)}
                    aria-current={active ? "page" : undefined}
                    className={`group flex min-w-0 items-center gap-2.5 rounded-2xl border px-3 py-2.5 text-left text-[0.82rem] transition lg:px-4 lg:text-sm ${
                      active
                        ? "border-violet-300/40 bg-violet-300/[0.14] text-white"
                        : "border-white/[0.06] bg-white/[0.02] text-[#c8c0e0] hover:border-violet-300/30 hover:bg-white/[0.06] hover:text-white lg:border-transparent lg:bg-transparent"
                    }`}
                  >
                    <span aria-hidden="true" className="w-5 shrink-0 text-center text-base text-[#c4b5fd]">{tab.icon}</span>
                    <span className="min-w-0 font-bold leading-tight">{tab.label}</span>
                    {!active && (
                      <span aria-hidden="true" className="ml-auto hidden text-[#7a7096] transition group-hover:translate-x-0.5 group-hover:text-[#c4b5fd] lg:inline">
                        →
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="mt-5 rounded-[18px] border border-dashed border-white/[0.14] bg-white/[0.03] p-4 text-xs leading-6 text-[#a89ec4]">
              <strong className="text-[#e9e3ff]">Note:</strong> This separates biblical text, Christian moral tradition, Dante's literature, angelology, demonology, and mythic catalogues. The cards are association maps, not official doctrine.
            </div>
          </div>
        </aside>

        <main className="flex min-w-0 flex-col gap-6">
          <section className={`${PANEL} relative overflow-hidden p-6 md:p-10`}>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.16),transparent_65%)]"
            />
            <div className="relative max-w-3xl">
              <div className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#a89ec4]">Study Mode · Concept Atlas</div>
              <h2 className="mt-4 text-[2.1rem] font-black leading-[0.98] tracking-[-0.05em] text-white sm:text-5xl md:text-[3.5rem]">
                Moral patterns, spiritual beings &amp;{" "}
                <span className={GRADIENT_TEXT}>mythic associations.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-[0.98rem] leading-8 text-[#d4cef0]/90">
                Use this like an interactive study board: click a card, compare a sin to its antidote virtue, trace commandments into inner patterns, then move into angelology, demonology, Dante, and the codex as symbolic or historical layers.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Pill tone="gold">Exodus 20</Pill>
                <Pill tone="green">Virtue Ethics</Pill>
                <Pill tone="red">Deadly Sins</Pill>
                <Pill tone="violet">Dante</Pill>
                <Pill tone="cyan">Angelology</Pill>
                <Pill tone="red">Demonology</Pill>
              </div>
            </div>
          </section>

          <section className={`${PANEL} p-6 md:p-8`}>
            <SectionHeader eyebrow="Start here" title="The whole structure at a glance">
              Think of this app as one broad study atlas: commandments show sacred boundaries, virtues show formed character, sins show distorted desire, and the angelology, demonology, Dante, and codex layers show how traditions personify spiritual reality.
            </SectionHeader>
            <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
              {OVERVIEW_TILES.map((tile) => (
                <button
                  key={tile.id}
                  onClick={() => navigateTo(tile.id)}
                  className="group rounded-[22px] border border-white/10 bg-white/[0.035] p-5 text-left transition hover:-translate-y-1 hover:border-violet-300/35 hover:bg-white/[0.06] hover:shadow-[0_18px_44px_rgba(168,85,247,0.12)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <Pill tone={tile.tone}>{tile.label}</Pill>
                    <span aria-hidden="true" className="text-[#7a7096] transition group-hover:translate-x-0.5 group-hover:text-[#c4b5fd]">→</span>
                  </div>
                  <div className="mt-4 text-4xl font-black tracking-[-0.05em] text-white md:text-5xl">{tile.num}</div>
                  <p className="mt-2 text-sm leading-6 text-[#c8c0e0]">{tile.text}</p>
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-3.5 lg:grid-cols-2">
              <div className="rounded-[22px] border border-white/10 bg-white/[0.035] p-6">
                <div className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#a89ec4]">Best user flow</div>
                <ol className="mt-4 space-y-3 text-sm leading-6 text-[#d4cef0]/90">
                  {[
                    "Start with a commandment.",
                    "Open the related sin pattern.",
                    "Compare it to the antidote virtue.",
                    "Optionally view Dante/demonology as symbolic imagination.",
                  ].map((step, i) => (
                    <li key={step} className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-violet-300/30 bg-violet-300/10 text-xs font-black text-[#c4b5fd]">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/[0.035] p-6">
                <div className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#a89ec4]">Included reference layers</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Pill>Scripture lookup</Pill>
                  <Pill>Demonology timeline</Pill>
                  <Pill>Compare traditions</Pill>
                  <Pill>Angelology</Pill>
                  <Pill>Infernal Codex</Pill>
                  <Pill>Prayer Themes</Pill>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {modals}
    </PageShell>
  );
}
