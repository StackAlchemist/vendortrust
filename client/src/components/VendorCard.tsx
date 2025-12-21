import type { VendorCheckResponse } from "../types/vendor";
import RiskBadge from "./RiskBadge";

interface VendorCardProps {
  data: VendorCheckResponse;
}

const VendorCard: React.FC<VendorCardProps> = ({ data }) => {
  return (
    <div className="mt-6 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold">{data.vendor.name}</h2>

      <div className="flex justify-between mt-2 items-center">
        <RiskBadge score={data.combinedScore} />
        <span className="text-sm">{data.recommendation}</span>
      </div>

      <div className="mt-4 text-sm">
        <p>
          <strong>AI Sentiment:</strong>{" "}
          {data.ai.label} ({data.ai.score}%)
        </p>
      </div>

      <div className="mt-4">
        <p className="font-semibold">Red Flags:</p>
        <ul className="list-disc pl-5 text-sm">
          {data.heuristic.flags.map((flag, i) => (
            <li key={i}>{flag}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VendorCard;
