export function getRiskUI(score: number) {
    if (score >= 70) {
      return {
        label: "High Risk",
        color: "#dc2626",
        bg: "#fee2e2"
      };
    }
  
    if (score >= 40) {
      return {
        label: "Medium Risk",
        color: "#f59e0b",
        bg: "#fef3c7"
      };
    }
  
    return {
      label: "Low Risk",
      color: "#16a34a",
      bg: "#dcfce7"
    };
  }
  