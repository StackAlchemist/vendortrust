import { englishScamPhrases } from "../data/scamPhrases.en.js";
import { pidginScamPhrases } from "../data/scamPhrases.pidgin.js";

export function runHeuristics(text) {
  const normalized = text.toLowerCase();
  let score = 0;
  const flags = [];

  // 1. Keyword/Phrase Check (Frequency based)
  const uniquePhrasesMap = new Map();
  [...englishScamPhrases, ...pidginScamPhrases].forEach(item => {
    uniquePhrasesMap.set(item.phrase.toLowerCase(), item.score);
  });

  uniquePhrasesMap.forEach((phraseScore, phrase) => {
    const safePhrase = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${safePhrase}\\b`, 'gi');
    const matches = normalized.match(regex);

    if (matches) {
      const count = matches.length;
      const totalPhraseScore = phraseScore * count;
      score += totalPhraseScore;
      flags.push(`Detected: "${phrase}" x${count} (+${totalPhraseScore})`);
    }
  });

  /* 🔍 2. Advanced Behavioral Patterns */
  const behavioralPatterns = [
    { 
      // URGENCY & PRESSURE
      pattern: /\b(fast|quick|hurry|asap|now now|limited stock|someone else is asking|last price|promo ending)\b/gi, 
      label: "Artificial Urgency/Pressure", 
      points: 15 
    },
    { 
      // OVER-TRUSTING LANGUAGE (Common in scams to disarm victims)
      pattern: /\b(trust me|god fearing|honest|legit|i don't cheat|believe me|in god we trust|pure heart)\b/gi, 
      label: "Suspicious Trust-Building", 
      points: 12 
    },
    { 
      // HIDDEN/UPFRONT FEES
      pattern: /\b(delivery fee first|commitment fee|form fee|insurance fee|logistics money|gas money|clearance fee)\b/gi, 
      label: "Upfront/Hidden Fee Request", 
      points: 25 
    },
    { 
      // CALL AVOIDANCE
      pattern: /\b(chat only|no calls|don't call|strictly chat|network is bad for calls)\b/gi, 
      label: "Avoids Voice Verification", 
      points: 10 
    },
    { 
      // PAYMENT REDIRECTION
      pattern: /\b(friends and family|no refund|screenshot of payment|send receipt|confirm payment)\b/gi, 
      label: "Strict Payment Terms", 
      points: 10 
    }
  ];

  behavioralPatterns.forEach(item => {
    const matches = normalized.match(item.pattern);
    if (matches) {
      // We give points for the behavior once, but note if they do it multiple times
      const multiplier = matches.length > 1 ? 1.5 : 1; 
      const totalPoints = Math.round(item.points * multiplier);
      score += totalPoints;
      flags.push(`${item.label} (+${totalPoints})`);
    }
  });

  return {
    score: score, 
    flags
  };
}