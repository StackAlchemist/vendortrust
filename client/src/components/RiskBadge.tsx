interface RiskBadgeProps {
    score: number;
  }
  
  const RiskBadge: React.FC<RiskBadgeProps> = ({ score }) => {
    const color =
      score >= 70
        ? "bg-red-500"
        : score >= 40
        ? "bg-yellow-400"
        : "bg-green-500";
  
    return (
      <span className={`px-3 py-1 rounded-full text-white ${color}`}>
        Risk: {score}%
      </span>
    );
  };
  
  export default RiskBadge;
  