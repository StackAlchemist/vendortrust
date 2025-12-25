import { motion } from "framer-motion";
import RiskBadge from "./RiskBadge";

interface Props {
  data: {
    vendor: {
      name: string;
      instagramHandle?: string;
      riskScore: number;
    };
    analysis: {
      heuristic: {
        score: number;
        flags: string[];
      };
      ai: {
        label: string;
        score: number;
      };
      combinedScore: number;
      recommendation: string;
    };
  };
}

const VendorResultCard: React.FC<Props> = ({ data }) => {
  const { vendor, analysis } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="bg-white rounded-3xl shadow-xl overflow-hidden"
    >
      {/* HEADER – SCORE */}
      <div className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 border-b">
        <p className="text-xs uppercase tracking-wider text-slate-500">
          Vendor Risk Assessment
        </p>

        <div className="flex items-end justify-between mt-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {vendor.name}
            </h2>

            {vendor.instagramHandle && (
              <p className="text-sm text-slate-500 mt-1">
                Instagram: @{vendor.instagramHandle}
              </p>
            )}
          </div>

          <RiskBadge score={analysis.combinedScore} />
        </div>
      </div>

      {/* BODY */}
      <div className="p-8 space-y-6">
        {/* Recommendation */}
        <div>
          <p className="text-sm text-slate-500">Recommendation</p>
          <p className="text-lg font-semibold text-slate-800">
            {analysis.recommendation}
          </p>
        </div>

        {/* AI SENTIMENT */}
        <div className="flex items-center justify-between bg-slate-50 rounded-xl p-4">
          <div>
            <p className="text-xs text-slate-500 uppercase">
              AI Sentiment
            </p>
            <p className="font-medium">
              {analysis.ai.label}
            </p>
          </div>

          <span className="text-sm font-semibold text-slate-700">
            {analysis.ai.score}%
          </span>
        </div>

        {/* FLAGS */}
        <div>
          <p className="text-sm text-slate-500 mb-3">
            Detected Risk Signals
          </p>

          {analysis.heuristic.flags.length > 0 ? (
            <ul className="grid gap-2">
              {analysis.heuristic.flags.map((flag, i) => (
                <li
                  key={i}
                  className="text-sm bg-rose-50 text-rose-700 px-4 py-2 rounded-xl"
                >
                  • {flag}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-sm text-emerald-600 bg-emerald-50 px-4 py-3 rounded-xl">
              No suspicious language detected in this conversation.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default VendorResultCard;
