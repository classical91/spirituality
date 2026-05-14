import React, { useEffect, useMemo, useState } from "react";

const tabs = [
  { id: "overview", label: "Overview", icon: "✦" },
  { id: "commandments", label: "10 Commandments", icon: "✥" },
  { id: "virtues", label: "Virtues", icon: "✧" },
  { id: "sins", label: "7 Deadly Sins", icon: "☿" },
  { id: "inferno", label: "Dante Inferno", icon: "◉" },
  { id: "demons", label: "Demonology", icon: "♆" },
  { id: "map", label: "Sin Map", icon: "⌁" },
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

const sinMap = sins.map((sin) => ({
  sin: sin.title,
  antidote: sin.antidote,
  commandment: sin.commandment,
  dante: sin.dante,
  demon: sin.demon,
  watch: sin.watch,
}));

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

function DetailModal({ item, onClose, type }) {
  if (!item) return null;

  const entries = Object.entries(item).filter(([key]) => !["id", "title", "name", "circle"].includes(key));
  const heading = item.title || item.name || `Circle ${item.circle}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="max-h-[86vh] w-full max-w-3xl overflow-auto rounded-3xl border border-white/15 bg-slate-950 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="sticky top-0 border-b border-white/10 bg-slate-950/95 p-5 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Pill tone={type === "demons" ? "red" : type === "virtues" ? "green" : type === "inferno" ? "violet" : "gold"}>{type}</Pill>
              <h2 className="mt-3 text-2xl font-bold text-white">{item.circle ? `Circle ${item.circle}: ${heading}` : heading}</h2>
            </div>
            <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10" onClick={onClose}>
              Close
            </button>
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
      </div>
    </div>
  );
}

function ConceptCard({ item, type, onOpen }) {
  const title = item.title || item.name;
  const subtitle = item.short || item.family || item.sin || item.category || item.tradition;
  const body = item.summary || item.focus || item.distortion || item.meaning || item.association;
  const tone = type === "virtues" ? "green" : type === "sins" ? "red" : type === "inferno" ? "violet" : type === "demons" ? "red" : "gold";

  return (
    <button onClick={() => onOpen(item, type)} className="group h-full rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-left shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <Pill tone={tone}>{item.scripture || item.latin || item.opposite || item.sin || (item.circle ? `Circle ${item.circle}` : type)}</Pill>
        <span className="text-xl opacity-60 transition group-hover:opacity-100">↗</span>
      </div>
      <h3 className="text-lg font-bold text-white">{item.circle ? `${item.circle}. ${title}` : title}</h3>
      {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
      <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-300">{body}</p>
    </button>
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

function GridView({ items, type, onOpen }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => (
        <ConceptCard key={`${type}-${item.title || item.name}-${index}`} item={item} type={type} onOpen={onOpen} />
      ))}
    </div>
  );
}

function SectionPageContent({ tabId, searchable, openModal }) {
  if (tabId === "commandments") {
    return (
      <div>
        <SectionHeader eyebrow="Bible foundation" title="The 10 Commandments">
          A clean card view for Exodus 20, with each commandment translated into a moral focus, a reflection question, linked virtue, and linked sin pattern.
        </SectionHeader>
        <GridView items={searchable.commandments} type="commandments" onOpen={openModal} />
      </div>
    );
  }

  if (tabId === "virtues") {
    return (
      <div>
        <SectionHeader eyebrow="Character formation" title="Virtues as antidotes">
          Includes the seven heavenly virtues plus major cardinal/theological virtues so the app has more depth than only "sin vs punishment."
        </SectionHeader>
        <GridView items={searchable.virtues} type="virtues" onOpen={openModal} />
      </div>
    );
  }

  if (tabId === "sins") {
    return (
      <div>
        <SectionHeader eyebrow="Distorted desire" title="The 7 Deadly Sins">
          Each sin is framed as a good desire bent out of order. This makes it easier to study psychologically, spiritually, and symbolically.
        </SectionHeader>
        <GridView items={searchable.sins} type="sins" onOpen={openModal} />
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
            <GridView items={searchable.inferno} type="inferno" onOpen={openModal} />
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
        <GridView items={searchable.demons} type="demons" onOpen={openModal} />
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

  return null;
}

const BG = "min-h-screen bg-[radial-gradient(circle_at_top_left,#3b1d05,transparent_34%),radial-gradient(circle_at_top_right,#1e1b4b,transparent_30%),linear-gradient(180deg,#020617,#0f172a_45%,#020617)] text-slate-100";

export default function BibleConceptAtlas({ onBack }) {
  const [subPage, setSubPage] = useState(null);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(null);

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
    };
  }, [query]);

  const openModal = (item, type) => setModal({ item, type });

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
            <SectionPageContent tabId={subPage} searchable={searchable} openModal={openModal} />
          </section>
        </div>

        <DetailModal item={modal?.item} type={modal?.type} onClose={() => setModal(null)} />
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

      <DetailModal item={modal?.item} type={modal?.type} onClose={() => setModal(null)} />
    </div>
  );
}
