export function getSentimentMultiplier(label) {
    switch (label) {
      case "NEGATIVE":
        return 1.25;
      case "POSITIVE":
        return 0.85;
      case "NEUTRAL":
        return 1.0;
      default:
        return 1.0; // UNAVAILABLE or unknown
    }
  }
  