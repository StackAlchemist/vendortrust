import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";
import VendorCard from "../components/VendorCard";
import type { VendorCheckResponse } from "../types/vendor";
import { ShieldCheck, ScanText } from "lucide-react";

interface VendorForm {
  name?: string;
  instagramHandle?: string;
  phoneNumber?: string;
  conversationText?: string;
  userId: string;
}

const CheckVendor: React.FC = () => {
  const userId = localStorage.getItem("userId");

  const [form, setForm] = useState<VendorForm>({
    userId: userId || "",
  });
  const [result, setResult] = useState<VendorCheckResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post<VendorCheckResponse>("/check-vendor", form);
      setResult(res.data);
    } catch {
      alert("Failed to check vendor");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-start">

        {/* LEFT – FORM */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Check a Vendor
            </h1>
            <p className="mt-3 text-slate-600 max-w-md">
              Paste vendor details or chats to detect scam patterns before you
              send money.
            </p>
          </div>

          <form
            onSubmit={submit}
            className="bg-white rounded-2xl shadow-lg p-8 space-y-5"
          >
            <div>
              <label className="text-sm font-medium text-slate-600">
                Vendor Name (optional)
              </label>
              <input
                className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-emerald-400 outline-none"
                placeholder="e.g. John Gadgets Store"
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">
                Instagram Handle
              </label>
              <input
                className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                placeholder="@vendorhandle"
                onChange={(e) =>
                  setForm({ ...form, instagramHandle: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">
                Conversation Text
              </label>
              <textarea
                className="mt-1 w-full h-36 rounded-lg border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-rose-400 outline-none resize-none"
                placeholder="Paste WhatsApp or Instagram chat here..."
                onChange={(e) =>
                  setForm({ ...form, conversationText: e.target.value })
                }
              />
            </div>

            <button
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-white bg-indigo-500 shadow-md hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Analyzing Vendor..." : "Check Vendor"}
            </button>
          </form>
        </motion.div>

        {/* RIGHT – TRUST / INFO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="text-emerald-500" />
              <h3 className="font-semibold">Why this works</h3>
            </div>
            <p className="text-sm text-slate-600">
              Our system analyzes real Nigerian scam patterns such as urgency,
              refund denial, pressure language, and identity avoidance.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <ScanText className="text-indigo-500" />
              <h3 className="font-semibold">What you’ll get</h3>
            </div>
            <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
              <li>Risk score (Low / Medium / High)</li>
              <li>Detected scam phrases</li>
              <li>Clear recommendation</li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* RESULT */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto mt-20"
          >
            <VendorCard data={result} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CheckVendor;
