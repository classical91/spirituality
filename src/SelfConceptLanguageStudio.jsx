import { useEffect, useMemo, useState } from "react";
import BackButton from "./components/BackButton";

const starterPhrases = [
  "I am her man",
  "I am chosen in love",
  "I am loved by my woman",
  "It feels great having love",
  "I have a loving relationship",
  "Being loved feels natural to me",
  "I am the man she loves",
  "I feel wanted and chosen"
];

const phraseBanks = {
  iam: [
    "I am the man she loves.",
    "I am chosen, loved, and valued in love.",
    "I am naturally secure in love.",
    "I am a deeply loving man.",
    "I am the kind of man who is cherished and respected."
  ],
  ihave: [
    "I have a loving relationship that feels natural and secure.",
    "I have love that is steady, warm, and mutual.",
    "I have a woman who loves me openly.",
    "I have affection, closeness, and loyalty in my relationship.",
    "I have the kind of love that feels easy to receive."
  ],
  being: [
    "Being loved feels natural to me.",
    "Being her man feels steady and real.",
    "Being chosen in love feels normal now.",
    "Being emotionally secure is who I am now.",
    "Being wanted by the woman I love feels calm and familiar."
  ]
};

const sectionCards = [
  {
    title: "I am statements",
    tag: "Identity",
    desc: "Use when you want the sentence to define who you are, not what you are chasing.",
    examples: phraseBanks.iam
  },
  {
    title: "I have statements",
    tag: "Possession / reality",
    desc: "Use when you want the relationship, feeling, or circumstance to sound already present.",
    examples: phraseBanks.ihave
  },
  {
    title: "Being statements",
    tag: "Embodied state",
    desc: "Use when you want the phrase to feel lived-in, natural, and emotionally familiar.",
    examples: phraseBanks.being
  }
];

const transformationExamples = [
  {
    before: "I want her to choose me.",
    after: "I am chosen in love.",
    note: "Moves from wanting to identity."
  },
  {
    before: "I hope she loves me.",
    after: "I am the man she loves.",
    note: "Removes uncertainty and makes the role clear."
  },
  {
    before: "I need to feel loved.",
    after: "Being loved feels natural to me.",
    note: "Softens neediness into embodied normalcy."
  },
  {
    before: "Love is coming to me.",
    after: "I have love that feels steady and mutual.",
    note: "Present possession beats future arrival."
  }
];

const toneTrapWordGroups = [
  {
    title: "Time and state words",
    tag: "Delay",
    watch: "Can imply stagnation, delay, or an old pattern that has not changed.",
    words: ["Still", "Yet", "Already", "Before", "Eventually", "Forever"],
    examples: [
      { word: "Still", negative: "Still not changed.", cleaner: "Changing now." },
      { word: "Eventually", negative: "It will happen eventually.", cleaner: "I return to what is true now." }
    ]
  },
  {
    title: "Repetition words",
    tag: "Pattern",
    watch: "Can make one moment sound like a permanent identity or repeated failure.",
    words: ["Always", "Again", "Constantly", "Still"],
    examples: [
      { word: "Always", negative: "Always the same problem.", cleaner: "This is one pattern I can interrupt." },
      { word: "Again", negative: "I am doing this again.", cleaner: "I noticed the loop and can return now." }
    ]
  },
  {
    title: "Neutral words with cold tone",
    tag: "Dismissal",
    watch: "Can sound passive-aggressive, avoidant, sarcastic, or emotionally shut down.",
    words: ["Fine", "Whatever", "Interesting", "Okay", "Maybe"],
    examples: [
      { word: "Fine", negative: "I am fine.", cleaner: "I need a minute, and I can speak clearly after." },
      { word: "Maybe", negative: "Maybe.", cleaner: "I am not sure yet. I will choose directly." }
    ]
  },
  {
    title: "Behavior and trait words",
    tag: "Judgment",
    watch: "Can turn a neutral trait into criticism, weakness, suspicion, or instability.",
    words: ["Nice", "Curious", "Simple", "Bold", "Quiet", "Passive", "Emotional", "Independent"],
    examples: [
      { word: "Emotional", negative: "I am too emotional.", cleaner: "I feel deeply and respond with steadiness." },
      { word: "Independent", negative: "They are too independent.", cleaner: "They value space and can still choose connection." }
    ]
  },
  {
    title: "Backhanded praise",
    tag: "Ambiguous",
    watch: "Can sound like praise on the surface while carrying judgment underneath.",
    words: ["Unique", "Different", "Ambitious", "Creative", "Sensitive"],
    examples: [
      { word: "Different", negative: "They are different.", cleaner: "They have a distinct way of moving through life." },
      { word: "Sensitive", negative: "I am too sensitive.", cleaner: "I notice subtle things and keep my center." }
    ]
  }
];

const phrasebookBanks = [
  {
    title: "Terms of endearment",
    tag: "Names",
    desc: "Short, warm names that mark her as cherished and known. Choose the ones that feel honest, not performed.",
    examples: [
      "My love",
      "My heart",
      "My queen",
      "My woman",
      "My beloved",
      "Beautiful",
      "Sunshine",
      "Sweetheart",
      "Darling",
      "My peace",
      "My joy",
      "Wifey"
    ]
  },
  {
    title: "Words of affection",
    tag: "Affection",
    desc: "Full sentences that name what she is to you. Used out loud, written, or as the first line of a message.",
    examples: [
      "I cherish you.",
      "I adore you.",
      "I'm devoted to you.",
      "You are the love of my life.",
      "I'm grateful you're mine.",
      "I love being yours.",
      "You feel like home.",
      "You are my favorite person.",
      "I'm proud to be with you.",
      "You mean everything to me."
    ]
  },
  {
    title: "Ways to say I am with her",
    tag: "Presence",
    desc: "Different phrasings of the same simple truth — that you are beside her, choosing the same life.",
    examples: [
      "I'm here with her.",
      "She is by my side.",
      "I stand beside her.",
      "We are together.",
      "She is mine and I am hers.",
      "I belong with her.",
      "She has my hand.",
      "We walk through life together.",
      "She is next to me, always.",
      "I move through the world with her."
    ]
  },
  {
    title: "Ways to say I draw her to me",
    tag: "Magnetism",
    desc: "Phrasings that name attraction as something she moves toward, rather than something you chase.",
    examples: [
      "She is drawn to me.",
      "She moves toward me naturally.",
      "She comes to me easily.",
      "Her heart turns toward mine.",
      "She chooses me again and again.",
      "I am magnetic to her.",
      "She seeks me out.",
      "She gravitates to my warmth.",
      "She finds her way to me."
    ]
  },
  {
    title: "Ways to say I live with her",
    tag: "Shared life",
    desc: "The language of a shared rhythm — ordinary days, shared mornings, a home that is ours.",
    examples: [
      "We share a home.",
      "I share my days with her.",
      "Our lives are woven together.",
      "I wake up next to her.",
      "We build a life together.",
      "Our home is ours.",
      "I do life with her.",
      "I share my mornings, my evenings, my ordinary hours with her.",
      "She is part of my daily rhythm."
    ]
  },
  {
    title: "Alternatives to 'with' her",
    tag: "Variation",
    desc: "Different prepositions and verbs that say the same thing — so 'with' isn't the only word in your vocabulary.",
    examples: [
      "Beside her",
      "Alongside her",
      "Together with her",
      "Hand in hand with her",
      "Close to her",
      "Next to her",
      "By her side",
      "In her company",
      "Sharing this with her",
      "Side by side"
    ]
  },
  {
    title: "Phrases for a normal relationship",
    tag: "Everyday",
    desc: "Ordinary, grounded sentences that describe a healthy relationship without inflating it into a fantasy.",
    examples: [
      "We have a normal relationship — and that's a gift.",
      "Things are good between us.",
      "Our love is steady, ordinary, and chosen.",
      "We're calm together.",
      "We're in a good place.",
      "Things are easy with her.",
      "We're not perfect, but we're solid.",
      "The hard stuff gets worked through.",
      "We're a normal couple, living a normal life, loving each other well."
    ]
  },
  {
    title: "Cherishing her",
    tag: "Cherishing",
    desc: "Language that names her as treasured, honored, and held with care.",
    examples: [
      "I cherish my woman.",
      "She is treasured.",
      "I treat her like the gift she is.",
      "Her well-being matters to me, daily.",
      "I notice her — the small things and the big ones.",
      "She knows she's adored.",
      "I honor her in how I speak about her.",
      "She is held with care.",
      "I never take her for granted."
    ]
  },
  {
    title: "Commitment with my woman",
    tag: "Commitment",
    desc: "Sentences that name the choice you've made and keep making.",
    examples: [
      "I am committed to her.",
      "I have chosen her, and I keep choosing her.",
      "We are in this together, long-term.",
      "Our commitment is mutual and clear.",
      "I'm her man, fully and openly.",
      "I'm building a life with her.",
      "I show up — even when it's hard.",
      "She knows where she stands with me.",
      "My word to her is my word."
    ]
  },
  {
    title: "Happily married",
    tag: "Marriage",
    desc: "Language of a settled, joyful marriage — for use when that's the state you're describing or stepping into.",
    examples: [
      "We are happily married.",
      "Our marriage is a steady, joyful base.",
      "I love being her husband.",
      "She is my wife — and I'm grateful daily.",
      "Our home is warm.",
      "We chose well, and we live in that choice.",
      "Married life feels right.",
      "I'd choose her again, every time.",
      "Our marriage is built to last."
    ]
  },
  {
    title: "Compatible with my woman",
    tag: "Compatibility",
    desc: "Language naming the structural fit — values, rhythms, vision — not just the chemistry.",
    examples: [
      "We are compatible — in values, rhythm, and vision.",
      "Our lives fit well together.",
      "We want the same things.",
      "Our differences strengthen us; they don't divide us.",
      "We move at a pace that works for both of us.",
      "We have the same north star.",
      "Our compatibility is real, not forced.",
      "Being together feels natural and aligned."
    ]
  },
  {
    title: "Smiling with my woman",
    tag: "Joy",
    desc: "Phrases that name the daily lightness — the easy laughter and quiet smiles.",
    examples: [
      "She makes me smile.",
      "We laugh together easily.",
      "Our home is full of light.",
      "Joy comes naturally between us.",
      "She is my reason to smile.",
      "We grin at the same things.",
      "Being with her is a soft kind of happiness.",
      "I smile when I think of her.",
      "Her laugh is one of my favorite sounds."
    ]
  },
  {
    title: "Being her man",
    tag: "Identity",
    desc: "Identity statements for stepping into the role on purpose — boyfriend, partner, husband.",
    examples: [
      "I am her man, fully.",
      "I show up as her man, every day.",
      "Being hers is part of who I am.",
      "I am present, attentive, and devoted in this role.",
      "She has a real man — present, loyal, and grown.",
      "I take pride in being hers.",
      "I do the work of being her man — gladly.",
      "This role suits me, and I honor it."
    ]
  },
  {
    title: "Attraction with my woman",
    tag: "Attraction",
    desc: "Language for the pull between you — her toward you, you toward her — named as a natural, living thing.",
    examples: [
      "She is attracted to me.",
      "The attraction between us is real and mutual.",
      "She finds me magnetic.",
      "I draw her in effortlessly.",
      "She desires me.",
      "Our chemistry is steady — not just sparks, but a flame.",
      "She is pulled toward me naturally.",
      "I attract her with who I am, not with what I perform.",
      "The pull between us is easy and alive."
    ]
  },
  {
    title: "Intimacy with my woman",
    tag: "Intimacy",
    desc: "Language for closeness in all its forms — emotional, physical, spiritual — as something mutual and natural.",
    examples: [
      "We are intimate with each other.",
      "She is close to me — in body, heart, and spirit.",
      "Our intimacy is safe and natural.",
      "I am emotionally and physically close to her.",
      "We share a closeness that feels whole.",
      "She opens to me, and I open to her.",
      "Our connection goes deep.",
      "Being intimate with her feels easy and right.",
      "We have the kind of closeness that grows over time."
    ]
  },
  {
    title: "Getting along with my woman",
    tag: "Harmony",
    desc: "Phrasings for the everyday ease of getting along — not dramatic love, just genuine good feeling between two people.",
    examples: [
      "We get along well.",
      "Things are easy between us.",
      "We don't have to force it.",
      "We figure things out together, calmly.",
      "We navigate life without unnecessary friction.",
      "We work well together.",
      "We disagree and repair without drama.",
      "There's no war between us — just two people finding their way.",
      "Getting along feels natural to us."
    ]
  },
  {
    title: "Seeing her",
    tag: "Presence",
    desc: "The language of noticing her — being present to who she is, how she looks, how she moves through the world.",
    examples: [
      "I see her.",
      "I notice her — the real her.",
      "I am present to who she is.",
      "I take her in.",
      "I appreciate what I see when I look at her.",
      "She feels seen by me.",
      "I pay attention to her.",
      "I don't take her for granted — I look.",
      "Every time I see her, I see someone worth seeing."
    ]
  }
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function normalize(text) {
  return text.trim().replace(/\s+/g, " ");
}

function detectCategory(text) {
  const t = text.toLowerCase();
  if (/^i\s+am\b|^i'm\b/.test(t)) return "I am statement";
  if (/^i\s+have\b|^i've\b/.test(t)) return "I have statement";
  if (/^being\b/.test(t)) return "Being statement";
  if (/^it\s+feels\b|^i\s+feel\b/.test(t)) return "Feeling / experience statement";
  return "Open phrase";
}

function checkPresentTense(text) {
  const t = text.toLowerCase();
  const future = /\b(will|going to|soon|someday|one day|eventually|about to|trying to|hoping to|waiting for|want to|need to)\b/.test(t);
  const past = /\b(was|were|had been|used to)\b/.test(t);
  if (future) return { status: "Watch", label: "Future leaning", detail: "This may point your mind toward waiting instead of already being." };
  if (past) return { status: "Watch", label: "Past leaning", detail: "This may describe what happened instead of what is true now." };
  return { status: "Good", label: "Present tense", detail: "This reads as happening now, which is clean for self-concept wording." };
}

function checkPassiveVoice(text) {
  const t = text.toLowerCase();
  const passivePattern = /\b(am|is|are|was|were|be|being|been)\s+\w+(ed|en)\b/;
  const lovedBy = /\b(am|is|are|being)\s+loved\s+by\b/.test(t);
  const chosenBy = /\b(am|is|are|being)\s+chosen\s+by\b/.test(t);

  if (lovedBy || chosenBy) {
    return {
      status: "Okay",
      label: "Passive but usable",
      detail: "Passive voice works here because receiving love is the point. For stronger identity, make the role more direct."
    };
  }

  if (passivePattern) {
    return {
      status: "Watch",
      label: "Possible passive voice",
      detail: "This may sound less direct. Try making yourself the clear subject of the sentence."
    };
  }

  return { status: "Good", label: "Active / direct", detail: "The sentence feels clear and self-led." };
}

function detectMisalignment(text) {
  const t = text.toLowerCase();
  const notes = [];

  if (/\b(want|need|hope|trying|waiting|chasing|manifesting|desperate|why won't|when will)\b/.test(t)) {
    notes.push("There is a desire/absence signal. Try phrasing it as already natural, present, or part of your identity.");
  }
  if (/\bmake her|force|control|get her to|convince her\b/.test(t)) {
    notes.push("This leans toward control. A cleaner self-concept phrase centers your identity, not someone else's will.");
  }
  if (/\bnot rejected|not abandoned|not ignored|no longer|stop\b/.test(t)) {
    notes.push("This focuses on avoiding pain. Try naming the positive state directly: chosen, secure, loved, prioritized.");
  }
  if (/\bher man\b/.test(t)) {
    notes.push("'Her man' is strong identity language. It sounds direct, embodied, and relational.");
  }
  if (/\bloved by my woman\b/.test(t)) {
    notes.push("This is emotionally clear, though 'the woman I love' or 'my woman loves me' may sound more native depending on tone.");
  }

  return notes.length ? notes : ["No major misalignment detected. The phrase reads grounded enough to refine for tone, not repair."];
}

function nativeSuggestion(text) {
  const t = normalize(text);
  const low = t.toLowerCase();

  if (!t) return "Type a sentence to get a native-sounding version.";
  if (low === "i am her man") return "I am the man she loves.";
  if (low === "i am chosen in love") return "I am chosen in love.";
  if (low === "i am loved by my woman") return "My woman loves me deeply.";
  if (low === "it feels great having love") return "It feels great to have love in my life.";
  if (low.includes("want her to choose")) return "I am chosen in love.";
  if (low.includes("hope she loves")) return "I am the man she loves.";
  if (low.includes("need to feel loved")) return "Being loved feels natural to me.";
  if (low.startsWith("i feel ")) return t.replace(/^i feel/i, "I am").replace(/\.$/, "") + ".";
  if (low.startsWith("it feels great having")) return t.replace(/^it feels great having/i, "It feels great to have").replace(/\.$/, "") + ".";
  if (low.startsWith("i am loved by")) return t.replace(/^i am loved by/i, "I receive love from").replace(/\.$/, "") + ".";

  return t.endsWith(".") ? t : t + ".";
}

function identityScore(text) {
  const t = text.toLowerCase();
  let score = 52;

  if (/^i\s+am\b|^i'm\b/.test(t)) score += 22;
  if (/^being\b/.test(t)) score += 18;
  if (/^i\s+have\b|^i've\b/.test(t)) score += 14;
  if (/\b(chosen|loved|valued|secure|cherished|wanted|prioritized|devoted|faithful|her man|the man she loves)\b/.test(t)) score += 16;
  if (/\b(want|need|hope|trying|waiting|soon|someday|one day|will|manifesting)\b/.test(t)) score -= 25;
  if (/\bnot|never|no longer|stop\b/.test(t)) score -= 10;
  if (t.length < 8) score -= 8;

  return Math.max(0, Math.min(100, score));
}

function strengthLabel(score) {
  if (score >= 82) return "Strong identity language";
  if (score >= 68) return "Mostly grounded";
  if (score >= 50) return "Usable, but refine it";
  return "Likely desire-based";
}

function StatusPill({ status }) {
  const styles = {
    Good: "bg-emerald-400/15 text-emerald-200 border-emerald-300/25",
    Okay: "bg-sky-400/15 text-sky-200 border-sky-300/25",
    Watch: "bg-amber-400/15 text-amber-200 border-amber-300/25"
  };
  return <span className={cx("rounded-full border px-2.5 py-1 text-xs font-semibold", styles[status] || styles.Good)}>{status}</span>;
}

function Meter({ value }) {
  return (
    <div className="mt-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-sm text-slate-400">Identity strength</p>
          <p className="text-2xl font-black text-white">{value}%</p>
        </div>
        <p className="text-right text-sm font-semibold text-cyan-200">{strengthLabel(value)}</p>
      </div>
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-900 ring-1 ring-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-200 transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-white"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function ToneTrapWords() {
  return (
    <section id="tone-traps" className="mt-6 scroll-mt-24 rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 backdrop-blur-xl sm:p-6">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-200">Tone trap words</p>
          <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">Words that change meaning by context</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            These words are not bad by themselves. Watch the tone: the same word can support clarity, or quietly imply delay, judgment, dismissal, or an old identity.
          </p>
        </div>
        <span className="w-fit rounded-full border border-amber-200/20 bg-amber-300/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-amber-100">
          {toneTrapWordGroups.reduce((count, group) => count + group.words.length, 0)} words
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {toneTrapWordGroups.map((group) => (
          <article key={group.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{group.tag}</p>
                <h3 className="mt-1 text-lg font-black text-white">{group.title}</h3>
              </div>
              <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Watch tone
              </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-400">{group.watch}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {group.words.map((word) => (
                <button
                  key={word}
                  type="button"
                  onClick={() => navigator.clipboard?.writeText(word)}
                  className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-xs font-bold text-slate-300 transition hover:border-amber-200/40 hover:bg-amber-300/10 hover:text-white"
                >
                  {word}
                </button>
              ))}
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
              {group.examples.map((example) => (
                <div key={`${group.title}-${example.word}`} className="grid gap-0 border-b border-white/10 last:border-b-0 sm:grid-cols-[0.9fr_1.1fr]">
                  <div className="bg-rose-400/5 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-rose-100/55">{example.word}</p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-slate-300">{example.negative}</p>
                  </div>
                  <div className="border-white/10 bg-emerald-300/5 p-3 sm:border-l">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-100/55">Cleaner frame</p>
                    <p className="mt-1 text-sm font-black leading-6 text-white">{example.cleaner}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function SelfConceptLanguageStudio({ onBack, embedded, initialSection }) {
  const [input, setInput] = useState("I am her man");
  const [mode, setMode] = useState("Identity");

  const analysis = useMemo(() => {
    const cleaned = normalize(input);
    return {
      cleaned,
      category: detectCategory(cleaned),
      tense: checkPresentTense(cleaned),
      passive: checkPassiveVoice(cleaned),
      notes: detectMisalignment(cleaned),
      native: nativeSuggestion(cleaned),
      score: identityScore(cleaned)
    };
  }, [input]);

  const modes = ["Identity", "Experience", "Native", "Repair"];

  useEffect(() => {
    if (!initialSection) return undefined;
    const timeout = window.setTimeout(() => {
      document.getElementById(initialSection)?.scrollIntoView({ block: "start" });
    }, 80);
    return () => window.clearTimeout(timeout);
  }, [initialSection]);

  const mainContent = (
    <main className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
      {onBack && !embedded && (
        <div className="mb-6">
            <BackButton onBack={onBack} />
          </div>
        )}

        <header className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100 shadow-2xl shadow-cyan-950/30">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              Self-Concept Language Studio
            </div>
            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-6xl">
              Turn messy inner wording into clean identity language.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Build native-sounding self-concept sentences, check present tense, spot passive voice, and separate identity from temporary emotional experience.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {["I am", "I have", "Being", "Native"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Check</p>
                  <p className="mt-2 text-lg font-black text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        <section id="phrase-analyzer" className="mt-10 scroll-mt-24 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-200">Phrase lab</p>
                <h2 className="mt-2 text-2xl font-black text-white">Test a sentence</h2>
              </div>
              <div className="flex rounded-full border border-white/10 bg-white/5 p-1">
                {modes.map((item) => (
                  <button
                    key={item}
                    onClick={() => setMode(item)}
                    className={cx(
                      "rounded-full px-3 py-1.5 text-xs font-bold transition",
                      mode === item ? "bg-white text-slate-950" : "text-slate-400 hover:text-white"
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="mt-5 min-h-36 w-full resize-none rounded-3xl border border-white/10 bg-[#090D18] p-5 text-xl font-semibold leading-relaxed text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50 focus:ring-4 focus:ring-cyan-300/10"
              placeholder="Type a self-concept sentence..."
            />

            <div className="mt-4 flex flex-wrap gap-2">
              {starterPhrases.map((phrase) => (
                <button
                  key={phrase}
                  onClick={() => setInput(phrase)}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-white"
                >
                  {phrase}
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-cyan-100">Native-sounding version</p>
                  <p className="mt-2 text-2xl font-black leading-snug text-white">{analysis.native}</p>
                </div>
                <CopyButton text={analysis.native} />
              </div>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-200">Live scan</p>
                <h2 className="mt-2 text-2xl font-black text-white">Language diagnosis</h2>
              </div>
              <div className="rounded-2xl bg-white px-3 py-2 text-sm font-black text-slate-950">{analysis.category}</div>
            </div>

            <Meter value={analysis.score} />

            <div className="mt-5 grid gap-3">
              {[analysis.tense, analysis.passive].map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-black text-white">{item.label}</p>
                    <StatusPill status={item.status} />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-3xl border border-amber-300/20 bg-amber-300/10 p-4">
              <p className="font-black text-amber-100">Misalignment notes</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-amber-50/85">
                {analysis.notes.map((note, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-200" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-3">
          {sectionCards.map((card) => (
            <article key={card.title} className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-black text-white">{card.title}</h3>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-cyan-100">{card.tag}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-400">{card.desc}</p>
              <div className="mt-5 space-y-3">
                {card.examples.map((example) => (
                  <div key={example} className="group rounded-2xl border border-white/10 bg-slate-950/60 p-3 transition hover:border-cyan-300/30">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold leading-6 text-slate-200">{example}</p>
                      <CopyButton text={example} />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="mt-10">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-rose-200">Relationship phrasebook</p>
              <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">Ways of saying the love you live in.</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Vocabulary banks for naming her, naming what you feel, and naming the shared life — without recycling the same three phrases.</p>
            </div>
            <span className="rounded-full bg-white px-3 py-1.5 text-xs font-black text-slate-950">{phrasebookBanks.length} banks</span>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {phrasebookBanks.map((bank) => (
              <article key={bank.title} className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-black text-white">{bank.title}</h3>
                  <span className="rounded-full border border-rose-300/20 bg-rose-300/10 px-3 py-1 text-xs font-bold text-rose-100">{bank.tag}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-400">{bank.desc}</p>
                <div className="mt-5 space-y-2">
                  {bank.examples.map((example) => (
                    <div key={example} className="group flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-3 transition hover:border-rose-300/30">
                      <p className="text-sm font-semibold leading-6 text-slate-200">{example}</p>
                      <CopyButton text={example} />
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 backdrop-blur-xl sm:p-6">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-fuchsia-200">Identity vs experience</p>
            <h2 className="mt-2 text-2xl font-black text-white">Know what the phrase is doing</h2>
            <div className="mt-5 grid gap-3">
              <div className="rounded-3xl border border-emerald-300/20 bg-emerald-300/10 p-4">
                <p className="font-black text-emerald-100">Identity</p>
                <p className="mt-2 text-sm leading-6 text-emerald-50/85">"I am her man." This defines the self. Strongest when you want the sentence to feel like who you are.</p>
              </div>
              <div className="rounded-3xl border border-sky-300/20 bg-sky-300/10 p-4">
                <p className="font-black text-sky-100">Experience</p>
                <p className="mt-2 text-sm leading-6 text-sky-50/85">"It feels great having love." This defines the feeling. Useful, but less identity-based.</p>
              </div>
              <div className="rounded-3xl border border-violet-300/20 bg-violet-300/10 p-4">
                <p className="font-black text-violet-100">Embodiment</p>
                <p className="mt-2 text-sm leading-6 text-violet-50/85">"Being loved feels natural to me." This makes the state feel normal, familiar, and already lived.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-200">Rewrite matrix</p>
                <h2 className="mt-2 text-2xl font-black text-white">From wanting to being</h2>
              </div>
              <span className="rounded-full bg-white px-3 py-1.5 text-xs font-black text-slate-950">4 sample repairs</span>
            </div>

            <div className="mt-5 overflow-hidden rounded-3xl border border-white/10">
              <div className="grid grid-cols-[1fr_1fr] border-b border-white/10 bg-white/5 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                <div className="p-4">Before</div>
                <div className="border-l border-white/10 p-4">After</div>
              </div>
              {transformationExamples.map((row) => (
                <div key={row.before} className="grid grid-cols-1 border-b border-white/10 last:border-b-0 sm:grid-cols-[1fr_1fr]">
                  <div className="bg-slate-950/50 p-4">
                    <p className="font-bold text-slate-300">{row.before}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-500">{row.note}</p>
                  </div>
                  <div className="border-white/10 bg-cyan-300/5 p-4 sm:border-l">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-black text-white">{row.after}</p>
                      <CopyButton text={row.after} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ToneTrapWords />

        <section className="mt-6 rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-300/10 via-violet-300/10 to-fuchsia-300/10 p-5 backdrop-blur-xl sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-100">Phrase rule</p>
              <h2 className="mt-2 text-3xl font-black text-white">A clean sentence usually sounds simple.</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                The strongest phrasing is present, direct, emotionally calm, and not trying to argue with fear. It does not over-explain. It states the reality and lets the nervous system catch up.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Less force", "Do not make the sentence wrestle with doubt."],
                ["More identity", "Choose who you are, not what you are begging for."],
                ["Native tone", "Prefer phrases a real person would actually say."],
                ["Present now", "Avoid soon, someday, trying, waiting, or hoping."]
              ].map(([title, body]) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="font-black text-white">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
    </main>
  );

  if (embedded) {
    return <div className="text-slate-100">{mainContent}</div>;
  }

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-[-8%] top-[12%] h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute bottom-[-12%] left-[35%] h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
      </div>
      {mainContent}
    </div>
  );
}
