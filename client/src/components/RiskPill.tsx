interface RiskPillProps {
    label: string;
    color: string;
}

const RiskPill: React.FC<RiskPillProps> = ({ label, color }) => {
  return (
    <span
        style={{ backgroundColor: color }}
        className="text-white px-3 py-1 rounded-full text-xs font-medium"
    >
        {label}
    </span>
  )
}
export default RiskPill