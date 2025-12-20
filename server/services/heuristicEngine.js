import { englishScamPhrases } from "../data/scamPhrases.en.js";
import { pidginScamPhrases } from "../data/scamPhrases.pidgin.js";

export function runHeuristics(text) {
  const normalized = text.toLowerCase();

  let score = 0;
  const flags = [];

  const allPhrases = [
    ...englishScamPhrases,
    ...pidginScamPhrases
  ];

  for (const item of allPhrases) {
    if (normalized.includes(item.phrase)) {
      score += item.score;
      flags.push(
        `Detected phrase: "${item.phrase}" (+${item.score})`
      );
    }
  }

  /* 🔍 Behavioral checks */
  if (
    normalized.includes("chat only") ||
    normalized.includes("no calls")
  ) {
    score += 10;
    flags.push("Avoids voice calls (+10)");
  }

  if (
    normalized.includes("transfer only") ||
    normalized.includes("no pay on delivery")
  ) {
    score += 15;
    flags.push("No Pay-on-Delivery (+15)");
  }

  return {
    score: Math.min(score, 100),
    flags
  };
}
