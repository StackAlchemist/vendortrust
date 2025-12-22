import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";
import RiskBadge from "../components/RiskBadge";
import type { SearchHistoryItem } from "../types/user";

const Dashboard: React.FC = () => {
  const [searches, setSearches] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearches = async () => {
      try {
        const res = await api.get("/users/history");
        setSearches(res.data.history || []);
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
                className="bg-white p-6 rounded-2xl shadow-md flex flex-col justify-between"
              >
                <div className="mb-4">
                  <p className="font-semibold text-lg">{item.snapshot.name}</p>
                  <p className="text-sm text-slate-600 mt-1">
                    {item.snapshot.recommendation}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    {new Date(item.searchedAt).toLocaleString()}
                  </p>
                </div>

                <div className="self-end">
                  <RiskBadge score={item.snapshot.combinedScore} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
