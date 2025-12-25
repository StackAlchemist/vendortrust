export const calculateSoftReputation = (vendor) => {
    const up = vendor.upvotes.length;
    const down = vendor.downvotes.length;
  
    if (up + down === 0) return 0;
  
    const ratio = up / (up + down);
  
    // max reduction = -20
    return Math.round((ratio - 0.5) * -40);
  };
  