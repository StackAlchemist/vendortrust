import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, ScanText, BarChart3 } from "lucide-react";

const steps = [
  {
    step: 1,
    title: "Paste Vendor Details",
    description:
      "Enter the Instagram handle, WhatsApp chat, or phone number before sending money.",
    icon: ShieldCheck,
    accent: "from-emerald-400 to-emerald-600",
    softBg: "bg-emerald-50"
  },
  {
    step: 2,
    title: "Fraud Analysis Runs",
    description:
      "AI + heuristics scan for Nigerian scam patterns like pressure tactics and refund denial.",
    icon: ScanText,
    accent: "from-indigo-400 to-indigo-600",
    softBg: "bg-indigo-50"
  },
  {
    step: 3,
    title: "Get Risk Score",
    description:
      "Receive a clear risk level and recommendation to proceed or avoid payment.",
    icon: BarChart3,
    accent: "from-rose-400 to-rose-600",
    softBg: "bg-rose-50"
  }
];

const StepCard = ({ data }: { data: typeof steps[number] }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-120px", once: false });
  const Icon = data.icon;

  return (
    <motion.div
      ref={ref}
      animate={{
        y: inView ? -8 : 0,
        scale: inView ? 1.02 : 1
      }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative border border-slate-200/50 rounded-2xl p-8 bg-white overflow-visible"
    >
      {/* Soft gradient glow */}
      <div
        className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${data.accent} opacity-10 blur-xl pointer-events-none`}
      />

      {/* Soft color wash */}
      <div
        className={`absolute inset-0 ${data.softBg} opacity-40 rounded-2xl pointer-events-none`}
      />

      {/* Step badge */}
      <div
        className={`absolute -top-5 left-6 w-10 h-10 rounded-full text-white font-bold text-sm flex items-center justify-center bg-gradient-to-br ${data.accent} shadow-md`}
      >
        {data.step}
      </div>

      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl mb-5 flex items-center justify-center bg-gradient-to-br ${data.accent} text-white relative z-10`}
      >
        <Icon className="w-6 h-6" />
      </div>

      <h3 className="font-semibold text-lg mb-2 relative z-10">
        {data.title}
      </h3>

      <p className="text-slate-600 text-sm leading-relaxed relative z-10">
        {data.description}
      </p>
    </motion.div>
  );
};

const HowItWorks = () => {
  return (
    <section className="bg-white py-28">
      <div className="max-w-6xl mx-auto px-6 relative">

        {/* Heading */}
        <div className="text-center mb-24">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto">
            A layered fraud detection system designed for Nigerian online buying.
          </p>
        </div>

        {/* Gradient connector */}
        <div className="hidden md:block absolute top-[240px] left-1/2 -translate-x-1/2 w-[78%] h-[4px] rounded-full bg-gradient-to-r from-emerald-400 via-indigo-400 to-rose-400 opacity-40" />

        {/* Cards */}
        <div className="grid gap-14 md:grid-cols-3 relative z-10">
          {steps.map((step) => (
            <StepCard key={step.step} data={step} />
          ))}
        </div>

        {/* Credibility strip */}
        <div className="mt-24 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
          <span className="px-4 py-2 rounded-full bg-white shadow-sm border">
          😂 <strong className="text-slate-700">Ps: We wont tell the vendor you used this tool</strong>
          </span>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
