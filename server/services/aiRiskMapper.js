export function getSentimentAdjustment(label, aiScore) {
  /**
   * aiScore is 0–100 confidence
   */

  switch (label) {
    case "NEGATIVE":
      return Math.min(25, aiScore * 0.3); // up to +25

    case "NEUTRAL":
      return 10; // slight uncertainty boost

    case "POSITIVE":
      return 5; // small trust boost, NOT negative

    default:
      return 0;
  }
}
