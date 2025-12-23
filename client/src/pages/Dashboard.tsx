import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";
import VendorCard from "../components/VendorCard";
import type { SearchHistoryItem } from "../types/user";

const Dashboard: React.FC = () => {
  const [searches, setSearches] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Compute confidence and soft reputation
  const enhanceHistory = (history: SearchHistoryItem[]) => {
    return history.map(item => {
      const vendor = item.vendor;
      const historyData = vendor.analysisHistory || [];

      // Confidence: lower avg score = higher confidence
      const avgScore =
        historyData.reduce((acc, a) => acc + a.combinedScore, 0) /
        Math.max(historyData.length, 1);
      const confidenceScore = Math.max(0, 100 - avgScore);

      // Soft reputation: reduce score if consistent low risk
      const recent = historyData.slice(-5);
      const avgRecent = recent.reduce((a, b) => a + b.combinedScore, 0) / Math.max(recent.length, 1);
      const softReputation = avgRecent < 40 ? 1 : 0;

      // Aggregate community flags
      const keywordCount: { [phrase: string]: number } = {};
      historyData.forEach(a => {
        a.heuristic.flags.forEach(flag => {
          const phrase = flag.replace(/Detected phrase: "/, "").replace(/" \(\+\d+\)/, "");
          keywordCount[phrase] = (keywordCount[phrase] || 0) + 1;
        });
      });

      const communityFlags = Object.entries(keywordCount).map(([phrase, count]) => ({ phrase, count }));

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
      <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
        My Search History
      </h1>

      {searches.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl shadow-md text-center">
          <p className="text-lg font-medium">No searches yet.</p>
          <p className="text-sm text-slate-500 mt-2">
            Check a vendor to start building your history.
          </p>
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
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <VendorCard data={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
