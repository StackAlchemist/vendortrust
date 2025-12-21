import { useEffect, useState } from "react";
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
        console.log(res.data);
        setSearches(res.data.history);
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
      <div className="max-w-4xl mx-auto mt-10 text-center">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 mt-10">
      <h1 className="text-2xl font-bold mb-6">
        My Search History
      </h1>

      {searches.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p>No searches yet.</p>
          <p className="text-sm text-slate-500 mt-2">
            Check a vendor to start building your history.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {searches.map((item, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  {item.snapshot.name}
                </p>

                <p className="text-sm text-slate-600">
                  {item.snapshot.recommendation}
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  {new Date(item.searchedAt).toLocaleString()}
                </p>
              </div>

              <RiskBadge score={item.snapshot.combinedScore} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
