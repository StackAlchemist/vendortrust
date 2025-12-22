import { motion } from "framer-motion";

const WhyUseIt: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold mb-6"
        >
          Why Nigerians Trust VendorTrust
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-slate-600 text-lg sm:text-xl mb-12"
        >
          Online scams are increasing. VendorTrust gives you instant clarity on 
          vendors before sending money, combining AI, heuristics, and local scam intelligence.
        </motion.p>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="font-semibold text-lg mb-2">AI + Heuristics</h3>
            <p className="text-slate-500 text-sm">
              Automatically analyzes chat patterns and vendor signals to assess risk.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="font-semibold text-lg mb-2">Local Scam Data</h3>
            <p className="text-slate-500 text-sm">
              Built for Nigerian online commerce, using real patterns from local scams.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="font-semibold text-lg mb-2">Quick & Easy</h3>
            <p className="text-slate-500 text-sm">
              Get clear vendor risk scores in seconds before sending money.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyUseIt;
