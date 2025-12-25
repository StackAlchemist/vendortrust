export const calculateConfidenceScore = (vendor, checksCount) => {
    const daysActive =
      (Date.now() - new Date(vendor.firstSeenAt).getTime()) /
      (1000 * 60 * 60 * 24);
  
    let score = 0;
  
    if (checksCount > 5) score += 20;
    if (checksCount > 15) score += 30;
  
    if (daysActive > 30) score += 20;
    if (daysActive > 90) score += 30;
  
    return Math.min(score, 100);
  };
  