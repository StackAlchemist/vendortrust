import type { VendorCheckResponse } from "../types/vendor";
import { getRiskUI } from "../utils/ui";
import AnimatedCount from "./AnimatedCount";

interface VendorCardProps {
  data: VendorCheckResponse;
}

const VendorCard: React.FC<VendorCardProps> = ({ data }) => {
  const ui = getRiskUI(data.combinedScore);

  return (
    <div className="mt-6 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">

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
              <AnimatedCount value={data.combinedScore} />%
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
          <p className="text-sm text-slate-500">Vendor Name</p>
          <p className="font-medium text-slate-700">{data.vendor.name}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Recommendation</p>
          <p className="font-medium text-slate-700">{data.recommendation}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500 mb-2">AI Sentiment</p>
          <p className="text-sm text-slate-700">
            {data.ai.label} ({data.ai.score}%)
          </p>
        </div>

        {data.heuristic.flags.length > 0 && (
          <div>
            <p className="text-sm text-slate-500 mb-2">Red Flags</p>
            <ul className="space-y-1">
              {data.heuristic.flags.map((flag, i) => (
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

        {/* {data.checkedAt && (
          <p className="text-xs text-slate-400">
            Checked on {new Date(data.checkedAt).toLocaleString()}
          </p>
        )} */}
      </div>
    </div>
  );
};

export default VendorCard;
