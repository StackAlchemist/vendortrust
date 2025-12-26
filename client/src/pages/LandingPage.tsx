import { motion } from "framer-motion";
import Button from "../components/Button";
import RiskResultCard from "../components/RiskResultCard";
import HowItWorks from "../components/HowItWorks";
import WhyUseIt from "../components/WhyUseIt";
import TipsFAQ from "../components/TipsFAQ";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const textVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: "easeOut" as any
    }
  })
};


const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      
      {/* SOFT BACKGROUND BLOBS */}
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-emerald-300/20 rounded-full blur-3xl" />
      <div className="absolute top-40 -right-32 w-[420px] h-[420px] bg-indigo-300/20 rounded-full blur-3xl" />

      {/* HERO */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16">
        <div className="grid md:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            {/* 🇳🇬 Badge */}
            <motion.div
              variants={textVariant}
              custom={0}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium mb-5 border border-green-100"
            >
              🇳🇬 Built for Nigerian scams
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={textVariant}
              custom={1}
              className="text-3xl sm:text-4xl font-extrabold leading-tight"
            >
              Verify{" "}
              <span className="bg-gradient-to-r from-pink-500 to-emerald-500 bg-clip-text text-transparent">
                Instagram & WhatsApp
              </span>{" "}
              Vendors Instantly
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={textVariant}
              custom={2}
              className="mt-4 text-slate-600 max-w-md"
            >
              Avoid online scams by analyzing vendor chats using fraud signals
              trained on Nigerian buying patterns.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={textVariant}
              custom={3}
              className="flex flex-col sm:flex-row gap-4 mt-8"
            >
              <Button onClick={() => navigate('/check')} >
                Check a Vendor
              </Button>
              <Button variant="secondary" onClick={() => navigate('/login')}>
                Sign Up Free
              </Button>
            </motion.div>

            {/* Credibility strip */}
            {/* <motion.div
              variants={textVariant}
              custom={4}
              className="mt-7 flex flex-wrap items-center gap-3 text-sm text-slate-500"
            >
              <span className="font-semibold text-slate-700">Powered by:</span>
              <span className="px-3 py-1 bg-white rounded-full border shadow-sm">
                🧠 AI
              </span>
              <span className="px-3 py-1 bg-white rounded-full border shadow-sm">
                🔍 Fraud Heuristics
              </span>
              <span className="px-3 py-1 bg-white rounded-full border shadow-sm">
                🇳🇬 Local Scam Data
              </span>
            </motion.div> */}
          </motion.div>

          {/* RIGHT – TILTED CARD STACK */}
          <div className="relative w-full max-w-md mx-auto h-[340px] sm:h-[380px]">

            {/* LEFT CARD */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotate: -4 }}
              animate={{ opacity: 0.55, y: 25, rotate: -3 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="absolute top-6 left-[-24px] sm:left-[-48px]"
            >
              <div className="w-[230px] sm:w-[280px]">
                <RiskResultCard
                  score={35}
                  recommendation="Medium risk – proceed with caution"
                  flags={["Unverified seller identity"]}
                />
              </div>
            </motion.div>

            {/* RIGHT CARD */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotate: 4 }}
              animate={{ opacity: 0.55, y: 25, rotate: 3 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="absolute top-6 right-[-24px] sm:right-[-48px]"
            >
              <div className="w-[230px] sm:w-[280px]">
                <RiskResultCard
                  score={22}
                  recommendation="Low risk – relatively safe"
                  flags={["No known scam signals"]}
                />
              </div>
            </motion.div>

            {/* CENTER CARD */}
            <motion.div
              initial={{ opacity: 0, y: 70, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="absolute inset-0 z-20 flex justify-center"
            >
              <div className="w-[260px] sm:w-[320px]">
                <RiskResultCard
                  score={78}
                  recommendation="High risk – avoid payment"
                  flags={[
                    'Detected phrase: "pay now"',
                    'Detected phrase: "no refund"',
                    "Urgent payment pressure detected",
                    "Seller avoided verification request"
                  ]}
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <HowItWorks />
      <WhyUseIt />
      <TipsFAQ />
      <Footer />
    </div>
  );
};

export default LandingPage;
