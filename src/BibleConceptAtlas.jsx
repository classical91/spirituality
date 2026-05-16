import React, { useEffect, useMemo, useState } from "react";
import { prayerThemesCategories, prayerTextByTitle } from "./data/prayerThemes";

const tabs = [
  { id: "overview", label: "Overview", icon: "✦" },
  { id: "commandments", label: "10 Commandments", icon: "✥" },
  { id: "virtues", label: "Virtues", icon: "✧" },
  { id: "sins", label: "7 Deadly Sins", icon: "☿" },
  { id: "inferno", label: "Dante Inferno", icon: "◉" },
  { id: "demons", label: "Demonology", icon: "♆" },
  { id: "prayers", label: "Prayer Themes", icon: "✿" },
  { id: "map", label: "Sin Map", icon: "⌁" },
  { id: "wheel", label: "Soul · Spirit · Body", icon: "◈" },
];

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
  themes: prayerTextByTitle,
};

function getPrayers(item, type) {
  const key = item.title || item.name || item.circle;
  return prayerData[type]?.[key] || null;
}

function PrayerModal({ prayers, title, type, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!prayers) return null;

  const accentClass =
    type === "virtues" ? "text-emerald-300/70" :
    type === "sins" ? "text-red-400/70" :
    type === "inferno" ? "text-violet-300/70" :
    type === "demons" ? "text-red-400/70" :
    "text-amber-300/70";

  const borderAccent =
    type === "virtues" ? "border-emerald-400/20 bg-emerald-500/5" :
    type === "sins" ? "border-red-400/20 bg-red-500/5" :
    type === "inferno" ? "border-violet-400/20 bg-violet-500/5" :
    type === "demons" ? "border-red-400/20 bg-red-500/5" :
    "border-amber-300/20 bg-amber-300/5";

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/90 px-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="max-h-[88vh] w-full max-w-xl overflow-auto rounded-3xl border border-white/15 bg-slate-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 border-b border-white/10 bg-slate-950/95 px-6 py-5 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className={`text-xs font-bold uppercase tracking-[0.3em] ${accentClass}`}>Prayers</p>
              <h2 className="mt-1 text-xl font-black text-white">{title}</h2>
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
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Prayer {i + 1}</p>
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
    green: "border-emerald-400/30 bg-emerald-500/10 text-emerald-100",
    violet: "border-violet-400/30 bg-violet-500/10 text-violet-100",
  };
  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${tones[tone]}`}>{children}</span>;
}

function DetailModal({ item, onClose, type, onPray }) {
  if (!item) return null;

  const entries = Object.entries(item).filter(([key]) => !["id", "title", "name", "circle"].includes(key));
  const heading = item.title || item.name || `Circle ${item.circle}`;
  const prayers = getPrayers(item, type);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="max-h-[86vh] w-full max-w-3xl overflow-auto rounded-3xl border border-white/15 bg-slate-950 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="sticky top-0 border-b border-white/10 bg-slate-950/95 p-5 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Pill tone={type === "demons" ? "red" : type === "virtues" ? "green" : type === "inferno" ? "violet" : type === "wheel-spirit" ? "blue" : type === "wheel-body" ? "green" : "gold"}>{type}</Pill>
              <h2 className="mt-3 text-2xl font-bold text-white">{item.circle ? `Circle ${item.circle}: ${heading}` : heading}</h2>
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
          {entries.map(([key, value]) => (
            <div key={key} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{key.replace(/([A-Z])/g, " $1")}</div>
              <p className="text-sm leading-7 text-slate-200">{String(value)}</p>
            </div>
          ))}
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
  const subtitle = item.short || item.family || item.sin || item.category || item.tradition;
  const body = item.summary || item.focus || item.distortion || item.meaning || item.association;
  const tone = type === "virtues" ? "green" : type === "sins" ? "red" : type === "inferno" ? "violet" : type === "demons" ? "red" : type === "wheel-spirit" ? "blue" : type === "wheel-body" ? "green" : "gold";
  const prayers = getPrayers(item, type);

  return (
    <div className="group relative h-full rounded-3xl border border-white/10 bg-white/[0.04] shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07]">
      <button onClick={() => onOpen(item, type)} className="block w-full p-5 text-left">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Pill tone={tone}>{item.scripture || item.category || item.tag || item.latin || item.opposite || item.sin || (item.circle ? `Circle ${item.circle}` : type)}</Pill>
          <span className="text-xl opacity-60 transition group-hover:opacity-100">↗</span>
        </div>
        <h3 className="text-lg font-bold text-white">{item.circle ? `${item.circle}. ${title}` : title}</h3>
        {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
        <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-300">{body}</p>
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
      <div className="text-xs font-bold uppercase tracking-[0.35em] text-amber-300/80">{eyebrow}</div>
      <h2 className="mt-2 text-3xl font-black tracking-tight text-white md:text-4xl">{title}</h2>
      {children && <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{children}</p>}
    </div>
  );
}

function GridView({ items, type, onOpen, onPray }) {
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

function SectionPageContent({ tabId, searchable, openModal, openPrayer }) {
  if (tabId === "commandments") {
    return (
      <div>
        <SectionHeader eyebrow="Bible foundation" title="The 10 Commandments">
          A clean card view for Exodus 20, with each commandment translated into a moral focus, a reflection question, linked virtue, and linked sin pattern.
        </SectionHeader>
        <GridView items={searchable.commandments} type="commandments" onOpen={openModal} onPray={openPrayer} />
      </div>
    );
  }

  if (tabId === "virtues") {
    return (
      <div>
        <SectionHeader eyebrow="Character formation" title="Virtues as antidotes">
          Includes the seven heavenly virtues plus major cardinal/theological virtues so the app has more depth than only "sin vs punishment."
        </SectionHeader>
        <GridView items={searchable.virtues} type="virtues" onOpen={openModal} onPray={openPrayer} />
      </div>
    );
  }

  if (tabId === "sins") {
    return (
      <div>
        <SectionHeader eyebrow="Distorted desire" title="The 7 Deadly Sins">
          Each sin is framed as a good desire bent out of order. This makes it easier to study psychologically, spiritually, and symbolically.
        </SectionHeader>
        <GridView items={searchable.sins} type="sins" onOpen={openModal} onPray={openPrayer} />
      </div>
    );
  }

  if (tabId === "inferno") {
    return (
      <div>
        <SectionHeader eyebrow="Literary layer" title="Dante's Inferno circles">
          Dante's Inferno is not a simple Bible chart. It is medieval Christian poetry with symbolic punishments, moral categories, and a dramatic descent through disordered love.
        </SectionHeader>
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl border border-violet-300/20 bg-violet-500/10 p-5 lg:col-span-1">
            <h3 className="text-lg font-bold text-white">Descent logic</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">Dante moves from less deliberate disorders of appetite into deeper forms of malice: heresy, violence, fraud, and treachery. The bottom is not fire, but frozen betrayal.</p>
          </div>
          <div className="lg:col-span-2">
            <GridView items={searchable.inferno} type="inferno" onOpen={openModal} onPray={openPrayer} />
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
        <GridView items={searchable.demons} type="demons" onOpen={openModal} onPray={openPrayer} />
      </div>
    );
  }

  if (tabId === "prayers") {
    const allThemes = prayerThemesCategories.flatMap((cat) =>
      cat.themes.map((theme) => ({ ...theme, tone: cat.tone, catLabel: cat.label }))
    );
    const pickRandom = () => {
      const pick = allThemes[Math.floor(Math.random() * allThemes.length)];
      openPrayer({ title: pick.title }, "themes");
    };
    return (
      <div>
        <SectionHeader eyebrow="Thematic prayer" title="Prayer Themes">
          Prayers organized by spiritual posture, the Beatitudes, the Fruits of the Spirit, life seasons, and formation themes — independent of the Ten Commandments framework. Each card opens three prayers for that theme.
        </SectionHeader>
        <div className="mb-10 flex items-center gap-4">
          <button
            onClick={pickRandom}
            className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/10"
          >
            <span className="text-base">⟳</span> Surprise Me
          </button>
          <p className="text-sm text-slate-500">Open a random prayer theme</p>
        </div>
        <div className="space-y-12">
          {prayerThemesCategories.map((cat) => {
            const tc = toneClasses[cat.tone] || toneClasses.blue;
            return (
              <div key={cat.id}>
                <div className={`mb-1 text-xs font-bold uppercase tracking-[0.35em] ${tc.eyebrow}`}>{cat.eyebrow}</div>
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

  if (tabId === "map") {
    return (
      <div>
        <SectionHeader eyebrow="Comparison mode" title="Sin → virtue → commandment → Dante → demonology">
          This is the page that makes the whole system click. It turns the lists into a relationship map.
        </SectionHeader>
        <div className="overflow-hidden rounded-3xl border border-white/10">
          <div className="hidden grid-cols-5 gap-0 border-b border-white/10 bg-white/10 text-xs font-bold uppercase tracking-[0.2em] text-slate-300 lg:grid">
            <div className="p-4">Sin</div>
            <div className="p-4">Antidote</div>
            <div className="p-4">Commandment Watch</div>
            <div className="p-4">Dante Layer</div>
            <div className="p-4">Demonology</div>
          </div>
          {sinMap.map((row) => (
            <div key={row.sin} className="grid gap-0 border-b border-white/10 bg-white/[0.03] last:border-b-0 lg:grid-cols-5">
              <div className="p-4"><Pill tone="red">{row.sin}</Pill><p className="mt-3 text-xs leading-5 text-slate-400">{row.watch}</p></div>
              <div className="p-4 text-sm font-semibold text-emerald-100">{row.antidote}</div>
              <div className="p-4 text-sm leading-6 text-slate-300">{row.commandment}</div>
              <div className="p-4 text-sm leading-6 text-slate-300">{row.dante}</div>
              <div className="p-4 text-sm font-semibold text-red-100">{row.demon}</div>
            </div>
          ))}
        </div>
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
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-amber-300/80">Soul · Personality</div>
          <h3 className="mb-4 text-2xl font-black text-white">The 5 Soul Issues</h3>
          <GridView items={searchable.wheelSoulIssues} type="wheel-soul" onOpen={openModal} onPray={openPrayer} />
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-amber-300/80">Soul · Mind Patterns</div>
            <div className="grid gap-3">
              {searchable.wheelMindPatterns.map((item) => (
                <ConceptCard key={item.title} item={item} type="wheel-mind" onOpen={openModal} onPray={openPrayer} />
              ))}
            </div>
          </div>
          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-amber-300/80">Soul · Emotional Patterns</div>
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
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-sky-300/80">Spirit · Redemptive Realities</div>
          <h3 className="mb-4 text-2xl font-black text-white">The 5 Spirit Realities</h3>
          <GridView items={searchable.wheelSpirit} type="wheel-spirit" onOpen={openModal} onPray={openPrayer} />
        </div>

        <div className="mb-8">
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-emerald-300/80">Body · Psychosomatic Symptoms</div>
          <h3 className="mb-4 text-2xl font-black text-white">Body Manifestations</h3>
          <div className="mb-4 rounded-3xl border border-emerald-300/20 bg-emerald-500/10 p-5 text-sm leading-7 text-emerald-50/90">
            These physical symptoms are recognized psychosomatic patterns — real physiological suffering produced by chronic psychological and spiritual stress. This framework is for spiritual reflection only; all health concerns require qualified medical care.
          </div>
          <GridView items={searchable.wheelBody} type="wheel-body" onOpen={openModal} onPray={openPrayer} />
        </div>

        <div>
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-white/60">Integration</div>
          <h3 className="mb-4 text-2xl font-black text-white">Soul Issue → Spirit Answer</h3>
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <div className="hidden grid-cols-3 gap-0 border-b border-white/10 bg-white/10 text-xs font-bold uppercase tracking-[0.2em] text-slate-300 lg:grid">
              <div className="p-4">Soul Issue</div>
              <div className="p-4">Spirit Reality (Answer)</div>
              <div className="p-4">Key Scripture</div>
            </div>
            {wheelConnectionMap.map((row) => (
              <div key={row.soul} className="grid gap-0 border-b border-white/10 bg-white/[0.03] last:border-b-0 lg:grid-cols-3">
                <div className="p-4"><Pill tone="gold">{row.soul}</Pill></div>
                <div className="p-4 text-sm font-semibold text-sky-100">{row.spirit}</div>
                <div className="p-4 text-sm leading-6 text-slate-300">{row.scripture}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

const BG = "min-h-screen bg-[radial-gradient(circle_at_top_left,#3b1d05,transparent_34%),radial-gradient(circle_at_top_right,#1e1b4b,transparent_30%),linear-gradient(180deg,#020617,#0f172a_45%,#020617)] text-slate-100";

export default function BibleConceptAtlas({ onBack }) {
  const [subPage, setSubPage] = useState(null);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(null);
  const [prayerModal, setPrayerModal] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [subPage]);

  const searchable = useMemo(() => {
    const lower = query.trim().toLowerCase();
    const filterItems = (items) => {
      if (!lower) return items;
      return items.filter((item) => JSON.stringify(item).toLowerCase().includes(lower));
    };
    return {
      commandments: filterItems(commandments),
      virtues: filterItems(virtues),
      sins: filterItems(sins),
      inferno: filterItems(inferno),
      demons: filterItems(demons),
      wheelSoulIssues: filterItems(wheelSoulIssues),
      wheelMindPatterns: filterItems(wheelMindPatterns),
      wheelEmotions: filterItems(wheelEmotions),
      wheelSpirit: filterItems(wheelSpiritRealities),
      wheelBody: filterItems(wheelBodySymptoms),
    };
  }, [query]);

  const openModal = (item, type) => setModal({ item, type });
  const openPrayer = (item, type) => {
    const prayers = getPrayers(item, type);
    if (!prayers) return;
    const title = item.title || item.name || `Circle ${item.circle}`;
    setPrayerModal({ prayers, title, type });
  };

  const navigateTo = (tabId) => {
    setSubPage(tabId);
    setQuery("");
  };

  const goHome = () => {
    setSubPage(null);
    setQuery("");
  };

  // Sub-page view
  if (subPage) {
    const tab = tabs.find((t) => t.id === subPage);
    return (
      <div className={BG}>
        <div className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
            <button
              onClick={goHome}
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
            >
              ← Sacred Moral Atlas
            </button>
            <span className="text-xs text-slate-500">{tab.icon} {tab.label}</span>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8">
          <section className="mb-6 overflow-hidden rounded-[2rem] border border-white/10 bg-black/25 shadow-2xl backdrop-blur-xl">
            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-3 md:flex-row">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search concepts..."
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/60"
                />
                <button onClick={() => setQuery("")} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-slate-200 hover:bg-white/10">
                  Clear
                </button>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-black/25 p-6 shadow-2xl backdrop-blur-xl md:p-8">
            <SectionPageContent tabId={subPage} searchable={searchable} openModal={openModal} openPrayer={openPrayer} />
          </section>
        </div>

        <DetailModal item={modal?.item} type={modal?.type} onClose={() => setModal(null)} onPray={openPrayer} />
        {prayerModal && (
          <PrayerModal
            prayers={prayerModal.prayers}
            title={prayerModal.title}
            type={prayerModal.type}
            onClose={() => setPrayerModal(null)}
          />
        )}
      </div>
    );
  }

  // Home / overview view
  return (
    <div className={BG}>
      {onBack && (
        <div className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
            <button
              onClick={onBack}
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
            >
              ← Back to Home
            </button>
            <span className="text-xs text-slate-500">Sacred Moral Atlas</span>
          </div>
        </div>
      )}

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row">
        <aside className="lg:sticky lg:top-[3.5rem] lg:h-[calc(100vh-3.5rem)] lg:w-72">
          <div className="rounded-[2rem] border border-white/10 bg-black/25 p-4 shadow-2xl backdrop-blur-xl">
            <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-4">
              <div className="text-3xl">✠</div>
              <h1 className="mt-3 text-2xl font-black leading-tight text-white">Sacred Moral Atlas</h1>
              <p className="mt-2 text-sm leading-6 text-amber-50/75">Bible concepts, virtue ethics, deadly sins, Dante's symbolic hell, and demonology associations.</p>
            </div>

            <div className="mt-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => tab.id !== "overview" && navigateTo(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition ${
                    tab.id === "overview"
                      ? "bg-white text-slate-950 shadow-lg"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-semibold">{tab.label}</span>
                  {tab.id !== "overview" && <span className="ml-auto opacity-40">→</span>}
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-6 text-slate-400">
              <strong className="text-slate-200">Note:</strong> This separates biblical text, Christian moral tradition, Dante's literature, and later demonology. The demon cards are association maps, not official doctrine.
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/25 shadow-2xl backdrop-blur-xl">
            <div className="relative p-6 md:p-8">
              <div className="absolute right-6 top-6 hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300 md:block">Study Mode · Concept Atlas</div>
              <div className="max-w-3xl">
                <div className="mb-4 flex flex-wrap gap-2">
                  <Pill tone="gold">Exodus 20</Pill>
                  <Pill tone="green">Virtue Ethics</Pill>
                  <Pill tone="red">Deadly Sins</Pill>
                  <Pill tone="violet">Dante</Pill>
                </div>
                <h2 className="text-4xl font-black tracking-tight text-white md:text-6xl">A frontend for moral patterns, spiritual symbolism, and mythic associations.</h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">Use this like an interactive study board: click a card, compare a sin to its antidote virtue, trace commandments into inner patterns, then optionally view Dante and demonology as symbolic/literary layers.</p>
              </div>
            </div>
          </section>

          <section className="mt-6 rounded-[2rem] border border-white/10 bg-black/25 p-6 shadow-2xl backdrop-blur-xl md:p-8">
            <SectionHeader eyebrow="Start here" title="The whole structure at a glance">
              Think of this app as four layers: commandments show sacred boundaries, virtues show formed character, sins show distorted desire, and Dante/demonology show symbolic imagination around those distortions.
            </SectionHeader>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                ["10", "Commandments", "Outer law and inner allegiance", "gold"],
                ["12", "Virtues", "Antidotes and character formation", "green"],
                ["7", "Deadly Sins", "Distorted desire patterns", "red"],
                ["9", "Inferno Circles", "Dante's symbolic moral descent", "violet"],
              ].map(([num, label, text, tone]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <Pill tone={tone}>{label}</Pill>
                  <div className="mt-5 text-5xl font-black text-white">{num}</div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-xl font-bold text-white">Best user flow</h3>
                <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                  <li><strong className="text-white">1.</strong> Start with a commandment.</li>
                  <li><strong className="text-white">2.</strong> Open the related sin pattern.</li>
                  <li><strong className="text-white">3.</strong> Compare it to the antidote virtue.</li>
                  <li><strong className="text-white">4.</strong> Optionally view Dante/demonology as symbolic imagination.</li>
                </ol>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-xl font-bold text-white">Good extra pages to add next</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Pill>Scripture lookup</Pill>
                  <Pill>Timeline of demonology</Pill>
                  <Pill>Compare traditions</Pill>
                  <Pill>Glossary</Pill>
                  <Pill>Reflection journal</Pill>
                  <Pill>Mind map graph</Pill>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <DetailModal item={modal?.item} type={modal?.type} onClose={() => setModal(null)} onPray={openPrayer} />
      {prayerModal && (
        <PrayerModal
          prayers={prayerModal.prayers}
          title={prayerModal.title}
          type={prayerModal.type}
          onClose={() => setPrayerModal(null)}
        />
      )}
    </div>
  );
}
