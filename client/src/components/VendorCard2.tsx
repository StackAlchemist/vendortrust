import type { VendorCheckResponse } from "../types/vendor";
import RiskBadge from "./RiskBadge";

// Props now include confidence and communityFlags
interface VendorCardProps {
  data: VendorCheckResponse & {
    confidenceScore?: number; // 0–100
    softReputation?: number;  // positive adjustment if vendor is good
    communityFlags?: { phrase: string; count: number }[];
  };
}

const VendorCard: React.FC<VendorCardProps> = ({ data }) => {
  const snapshot = data.snapshot || data.vendor; // fallback if snapshot missing
  const { communityFlags = [], softReputation = 0, confidenceScore = 0 } = data;

  // Safe max count for heatmap
  const maxCount = communityFlags.length > 0 ? Math.max(...communityFlags.map(f => f.count)) : 1;

  return (
    <div className="mt-6 bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-bold">{snapshot.name}</p>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500 text-white">
            Confidence: {confidenceScore}%
          </span>
          {softReputation > 0 && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-500 text-white">
              Good History
            </span>
          )}
        </div>
      </div>

      {/* Risk */}
      <div className="flex justify-between items-center mb-4">
        <RiskBadge score={snapshot.combinedScore || 0} />
        <span className="text-sm">{snapshot.recommendation || "No recommendation"}</span>
      </div>

      {/* AI Sentiment */}
      {snapshot.ai && (
        <p className="text-sm text-slate-600 mb-3">
          <strong>AI Sentiment:</strong> {snapshot.ai.label} ({snapshot.ai.score}%)
        </p>
      )}

      {/* Heuristic Flags */}
      {snapshot.heuristic && snapshot.heuristic.flags.length > 0 && (
        <div className="mb-4">
          <p className="font-semibold text-sm mb-2">Risk Signals Detected</p>
          <ul className="grid grid-cols-1 gap-1 text-sm">
            {snapshot.heuristic.flags.map((flag, i) => (
              <li key={i} className="bg-slate-100 px-2 py-1 rounded">
                • {flag}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Keyword Frequency / Community Flags Heatmap */}
      {communityFlags.length > 0 && (
        <div className="mb-4">
          <p className="font-semibold text-sm mb-2">Community Flags</p>
          <div className="flex flex-wrap gap-2">
            {communityFlags.map((f, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded text-white text-xs"
                style={{
                  backgroundColor: `rgba(220,38,38,${Math.min(f.count / maxCount, 1)})`
                }}
                title={`${f.count} user(s) flagged this`}
              >
                {f.phrase}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Checked At */}
      {snapshot.checkedAt && (
        <p className="text-xs text-slate-400 mt-2">
          Checked on {new Date(snapshot.checkedAt).toLocaleString()}
        </p>
      )}
    </div>
  );
};

export default VendorCard;
