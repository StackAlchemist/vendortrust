import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Flag, X, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import api from "../services/api"; // Your axios instance

const Footer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phrase, setPhrase] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [explanation, setExplanation] = useState("");
  const [language, setLanguage] = useState("en");
  const [category, setCategory] = useState("urgency");
  const [suggestedScore, setSuggestedScore] = useState(25);
  // const [submittedBy, setSubmittedBy] = useState(localStorage.getItem("userId"));

  const handleFlagSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Sending the specific payload your schema requires
      await api.post("/flags/create-flag", {
        phrase: phrase,
        language: language, // Defaulting for simple footer input
        category: category, // Defaulting for simple footer input
        explanation: explanation,
        suggestedScore: suggestedScore
      });

      setIsSubmitted(true);
      
      // Reset and close after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setIsModalOpen(false);
        setPhrase("");
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        
        {/* Logo & Branding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3"
        >
          <div className="flex items-center gap-2 text-xl font-bold">
            <ShieldCheck className="text-indigo-500" />
            VendorTrust
          </div>
          <p className="text-slate-400 text-sm">
            Helping Nigerians avoid online scams with AI + local insights.
          </p>
          
          {/* HELP US GET BETTER SECTION */}
          <div className="mt-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-700">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Community</h4>
            <p className="text-xs text-slate-300 mb-3">Seen a new scam tactic? Help us flag it.</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 text-sm font-bold bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-xl transition-all"
            >
              <Flag size={14} /> Add a Flag
            </button>
          </div>
        </motion.div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold mb-2 text-indigo-400">Quick Links</h3>
          <a href="/" className="text-slate-400 hover:text-white transition">Home</a>
          <a href="/check" className="text-slate-400 hover:text-white transition">Check Vendor</a>
          <a href="/dashboard" className="text-slate-400 hover:text-white transition">Dashboard</a>
        </div>

        {/* Resources */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold mb-2 text-indigo-400">Resources</h3>
          <a href="#" className="text-slate-400 hover:text-white transition">Tips & Guides</a>
          <a href="#" className="text-slate-400 hover:text-white transition">FAQ</a>
          <a href="#" className="text-slate-400 hover:text-white transition">Community Stories</a>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold mb-2 text-indigo-400">Stay Updated</h3>
          <p className="text-slate-400 text-sm">Get alerts on trending online scams.</p>
          <form className="flex gap-2 mt-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
            />
            <button className="p-2 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition">
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* MODAL OVERLAY */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => !loading && setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl text-slate-900"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full text-slate-400"
              >
                <X size={20} />
              </button>

              {isSubmitted ? (
                <div className="text-center py-10 flex flex-col items-center">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
                  <p className="text-slate-500">Your flag has been submitted for review. Together we make the internet safer.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-2">Help us get better</h2>
                  <p className="text-slate-500 text-sm mb-6">Found a phrase or experience scammers are using? Share it below.</p>
                  
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-xs flex items-center gap-2 font-medium">
                      <AlertCircle size={14} /> {error}
                    </div>
                  )}

                  <form onSubmit={handleFlagSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-400 ml-1">The Scam Phrase</label>
                      <input 
                        required
                        disabled={loading}
                        value={phrase}
                        onChange={(e) => setPhrase(e.target.value)}
                        placeholder="e.g. 'Pay commitment fee first'"
                        className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none disabled:opacity-50"
                      />
                    </div>


                    <div>
                      <label htmlFor="language" className="text-xs font-bold uppercase text-slate-400 ml-1">Language</label>
                      <select name="language" id="language" className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none disabled:opacity-50" value={language} onChange={(e) => setLanguage(e.target.value)}>
                        <option value="en">English</option>
                        <option value="pidgin">Pidgin</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
    <label className="text-xs font-bold uppercase text-slate-400 ml-1">
      Category
    </label>
    <select 
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm text-slate-700 font-medium"
    >
      <option value="urgency">Urgency</option>
      <option value="trust-building">Trust Building</option>
      <option value="payment">Payment Terms</option>
      <option value="fake-fees">Hidden Fees</option>
      <option value="other">Other</option>
    </select>
  </div>

                    <div>
                      <label className="text-xs font-bold uppercase text-slate-400 ml-1">Explanation</label>
                      <input 
                        required
                        disabled={loading}
                        value={explanation}
                        onChange={(e) => setExplanation(e.target.value)}
                        placeholder="e.g. 'The scammer used this phrase to...'"
                        className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label htmlFor="suggestedScore" className="text-xs font-bold uppercase text-slate-400 ml-1">what should we score this?(points)</label>
                      <input 
                        required
                        disabled={loading}
                        value={suggestedScore}
                        onChange={(e) => setSuggestedScore(Number(e.target.value))}
                        placeholder="e.g. '25'"
                        type="number"
                        min={1}
                        max={50}
                        className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none disabled:opacity-50"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all disabled:opacity-50"
                    >
                      {loading ? "Submitting..." : "Submit Flag"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="mt-10 border-t border-slate-800 pt-6 text-center text-slate-500 text-xs">
        &copy; {new Date().getFullYear()} VendorTrust. Built for safety.
      </div>
    </footer>
  );
};

export default Footer;