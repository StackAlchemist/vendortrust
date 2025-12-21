import { useState } from "react";
import api from "../services/api";
import VendorCard from "../components/VendorCard";
import type { VendorCheckResponse } from "../types/vendor";

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
      const res = await api.post<VendorCheckResponse>(
        "/check-vendor",
        form
      );
      setResult(res.data);
    } catch {
      alert("Failed to check vendor");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">
        Check a Vendor
      </h1>

      <form
        onSubmit={submit}
        className="space-y-3 bg-white p-6 rounded-xl shadow"
      >
        <input
          className="input"
          placeholder="Vendor name"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="input"
          placeholder="Instagram handle"
          onChange={e =>
            setForm({ ...form, instagramHandle: e.target.value })
          }
        />

        <textarea
          className="input h-32"
          placeholder="Paste conversation text"
          onChange={e =>
            setForm({ ...form, conversationText: e.target.value })
          }
        />

        <button
          className="w-full bg-blue-500 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Checking..." : "Check Vendor"}
        </button>
      </form>

      {result && <VendorCard data={result} />}
    </div>
  );
};

export default CheckVendor;
