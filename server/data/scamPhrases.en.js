export const englishScamPhrases = [
  /* 🔥 High-Risk Payment Pressure */
  { phrase: "pay now", score: 15 },
  { phrase: "payment first", score: 15 },
  { phrase: "no refund", score: 20 },
  { phrase: "send deposit", score: 15 },
  { phrase: "transfer only", score: 15 },
  { phrase: "no pay on delivery", score: 15 },
  { phrase: "pay before delivery", score: 15 },

  /* ⏳ Urgency & Scarcity */
  { phrase: "last price", score: 10 },
  { phrase: "final price", score: 10 },
  { phrase: "promo ends today", score: 10 },
  { phrase: "act fast", score: 8 },
  { phrase: "only one left", score: 10 },
  { phrase: "offer expires", score: 10 },
  { phrase: "today only", score: 8 },

  /* 🧠 Manipulation & Trust Engineering */
  { phrase: "trust me", score: 10 },
  { phrase: "i swear", score: 8 },
  { phrase: "honest seller", score: 8 },
  { phrase: "god fearing", score: 12 },
  { phrase: "i won’t scam you", score: 15 },
  { phrase: "why would i scam you", score: 12 },

  /* 🚨 Avoidance & Isolation */
  { phrase: "chat only", score: 10 },
  { phrase: "no calls", score: 10 },
  { phrase: "dm for details", score: 6 },
  { phrase: "don’t involve anyone", score: 15 },
  { phrase: "no third party", score: 12 },

  /* 😡 Hostility, Harassment & Intimidation (⚠️ Risk Signal) */
  { phrase: "stop disturbing me", score: 12 },
  { phrase: "are you mad", score: 12 },
  { phrase: "use your brain", score: 15 },
  { phrase: "don’t waste my time", score: 10 },
  { phrase: "you are stupid", score: 18 },
  { phrase: "nonsense", score: 8 },

  /* 🛑 Hate / Aggressive Language (Moderation Signal) */
  { phrase: "i hate people like you", score: 20 },
  { phrase: "people like you", score: 15 },
  { phrase: "you people are", score: 15 },
  { phrase: "go and die", score: 25 },
  { phrase: "useless", score: 15 },

  /* 🕳️ Disappearing / Excuses */
  { phrase: "network issue", score: 8 },
  { phrase: "i will get back to you", score: 6 },
  { phrase: "busy right now", score: 5 },
  { phrase: "later today", score: 5 }
];
