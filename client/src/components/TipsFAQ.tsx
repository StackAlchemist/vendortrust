import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const tips = [
  {
    title: "Don’t Pay Under Pressure",
    description:
      "Scammers often rush you with ‘last price’ or ‘someone else is waiting’. Legit vendors give you time to decide.",
    color: "from-amber-400 to-orange-500",
  },
  {
    title: "Screenshots Aren’t Proof",
    description:
      "Delivery screenshots, bank alerts, and chats can be faked. Always verify patterns, not promises.",
    color: "from-indigo-400 to-indigo-600",
  },
  {
    title: "Verify Before Every Payment",
    description:
      "A vendor who was safe last month can become risky today. Always re-check before sending money.",
    color: "from-emerald-400 to-emerald-600",
  },
];

const faqs = [
  {
    question: "Can a legit vendor still get a low risk score?",
    answer:
      "Yes. A low score doesn’t mean a vendor is a scam — it means there are risk signals present. The score helps you decide how cautious to be.",
  },
  {
    question: "How reliable is the risk score?",
    answer:
      "Scores are based on AI sentiment, behavioral patterns, and known scam signals. They improve as more data becomes available.",
  },
  {
    question: "Is my chat or personal data stored?",
    answer:
      "No. Conversation text is analyzed securely and never shared publicly or sold to third parties.",
  },
  {
    question: "Can vendors manipulate or fake verification?",
    answer:
      "Our system checks for patterns over time, not one-time proofs. This makes manipulation extremely difficult.",
  },
];

const TipsFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* TIPS */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">
            Smart Buying Tips
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            Simple habits that significantly reduce your chances of getting scammed.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {tips.map((tip, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className={`rounded-2xl p-6 text-white shadow-lg bg-gradient-to-br ${tip.color}`}
            >
              <h3 className="font-semibold text-lg mb-2">
                {tip.title}
              </h3>
              <p className="text-sm leading-relaxed opacity-95">
                {tip.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-10">
            Questions You Might Have
          </h2>

          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="border border-slate-200/60 rounded-2xl overflow-hidden bg-white"
                >
                  <button
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-slate-50 transition"
                  >
                    <span className="font-medium text-slate-800">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-sm text-slate-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TipsFAQ;
