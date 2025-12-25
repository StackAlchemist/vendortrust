import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";
import VendorCard from "../components/VendorCard";
import type {
  SearchHistoryItem,
  AnalysisHistoryItem
} from "../types/user";
import type { VendorCheckResponse } from "../types/vendor";

const Dashboard: React.FC = () => {
  const [searches, setSearches] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const enhanceHistory = (history: SearchHistoryItem[]) => {
    return history.map(item => {
      const historyData: AnalysisHistoryItem[] =
        item.vendor?.analysisHistory ?? [];

      /* -----------------------------
         Confidence score
      ------------------------------ */
      const avgScore =
        historyData.reduce(
          (acc: number, a: AnalysisHistoryItem) =>
            acc + a.combinedScore,
          0
        ) / Math.max(historyData.length, 1);

      const confidenceScore = Math.max(
        0,
        Math.round(100 - avgScore)
      );

      /* -----------------------------
         Soft reputation
      ------------------------------ */
      const recent = historyData.slice(-5);

      const avgRecent =
        recent.reduce(
          (acc: number, a: AnalysisHistoryItem) =>
            acc + a.combinedScore,
          0
        ) / Math.max(recent.length, 1);

      const softReputation = avgRecent < 40 ? 1 : 0;

      /* -----------------------------
         Community flags
      ------------------------------ */
      const keywordCount: Record<string, number> = {};

      historyData.forEach((a: AnalysisHistoryItem) => {
        a.heuristic.flags.forEach((flag: string) => {
          const phrase = flag
            .replace(/Detected:\s*"/, "")
            .replace(/"\s*x\d+\s*\(\+\d+\)/, "");

          keywordCount[phrase] =
            (keywordCount[phrase] || 0) + 1;
        });
      });

      const communityFlags = Object.entries(keywordCount).map(
        ([phrase, count]) => ({ phrase, count })
      );

      return {
        ...item,
        confidenceScore,
        softReputation,
        communityFlags
      };
    });
  };

  useEffect(() => {
    const fetchSearches = async () => {
      try {
        const res = await api.get("/users/history");
        setSearches(enhanceHistory(res.data.history || []));
      } catch (err) {
        console.error("Failed to load searches", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearches();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-16 text-center text-slate-600">
        Loading your search history...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 mt-10">
      <h1 className="text-3xl font-bold mb-8">
        My Search History
      </h1>

      {searches.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl shadow text-center">
          No searches yet.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {searches.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <VendorCard data={item as unknown as VendorCheckResponse} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
