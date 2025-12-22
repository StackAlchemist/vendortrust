import { getRiskUI } from "../utils/ui";
import AnimatedCount from "./AnimatedCount";

interface RiskResultCardProps {
  score: number;
  recommendation: string;
  flags?: string[];
  checkedAt?: string;
}

const RiskResultCard: React.FC<RiskResultCardProps> = ({
  score,
  recommendation,
  flags = [],
  checkedAt,
}) => {
  const ui = getRiskUI(score);

  return (
    <div className="bg-white rounded-2xl shadow  overflow-hidden">
      {/* HEADER */}
      <div
        className="p-5"
        style={{ backgroundColor: ui.bg }}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-600">
              Risk Score
            </p>
            <p
              className="text-4xl font-bold"
              style={{ color: ui.color }}
            >
                <AnimatedCount value={score} />%
            </p>
          </div>

          <span
            className="px-4 py-1 rounded-full text-sm font-medium"
            style={{
              backgroundColor: ui.color,
              color: "white",
            }}
          >
            {ui.label}
          </span>
        </div>
      </div>

      {/* BODY */}
      <div className="p-5 space-y-4">
        <div>
          <p className="text-sm text-slate-500">Recommendation</p>
          <p className="font-medium">{recommendation}</p>
        </div>

        {flags.length > 0 && (
          <div>
            <p className="text-sm text-slate-500 mb-2">
              Risk Signals Detected
            </p>

            <ul className="space-y-1">
              {flags.map((flag, i) => (
                <li
                  key={i}
                  className="text-sm bg-slate-100 px-3 py-1 rounded"
                >
                  • {flag}
                </li>
              ))}
            </ul>
          </div>
        )}

        {checkedAt && (
          <p className="text-xs text-slate-400">
            Checked on {new Date(checkedAt).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default RiskResultCard;
