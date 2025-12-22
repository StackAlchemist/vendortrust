import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const tips = [
  {
    title: "Verify before Payment",
    description: "Always check vendor history and chat signals before sending money.",
    color: "from-emerald-400 to-emerald-600",
  },
  {
    title: "Look for Red Flags",
    description: "Watch for urgent payment requests, refund denial, or dodgy contacts.",
    color: "from-rose-400 to-rose-600",
  },
  {
    title: "Trust Data, Not Promises",
    description: "AI + heuristics give you objective risk scores for safer transactions.",
    color: "from-indigo-400 to-indigo-600",
  },
];

const faqs = [
  {
    question: "How does VendorTrust calculate risk?",
    answer:
      "We combine AI sentiment analysis, chat heuristics, and local scam intelligence to give a risk score.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Yes. We never share your personal data or conversation text. Analysis is secure and confidential.",
  },
  {
    question: "Can I check multiple vendors?",
    answer: "Absolutely. You can check as many vendors as you want, and your history is saved in your dashboard.",
  },
];

const TipsFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Top Tips for Safer Transactions</h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            Simple steps to reduce risk and avoid online scams.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {tips.map((tip, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className={`rounded-2xl p-6 text-white shadow-lg bg-gradient-to-br ${tip.color}`}
            >
              <h3 className="font-semibold text-lg mb-2">{tip.title}</h3>
              <p className="text-sm">{tip.description}</p>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>

          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-slate-200/50 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex justify-between items-center px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <span className="font-medium">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 py-4 text-slate-600 text-sm bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TipsFAQ;
