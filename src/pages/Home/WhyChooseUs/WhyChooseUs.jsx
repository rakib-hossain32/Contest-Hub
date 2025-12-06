import React from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Users,
  Trophy,
  Lightbulb,
  ShieldCheck,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Rocket,
    title: "Fast & Easy Creation",
    description:
      "Launch your contest in minutes with our intuitive step-by-step wizard. No coding required.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Users,
    title: "Large Community",
    description:
      "Connect with over 50,000+ talented creators ready to bring your ideas to life.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Trophy,
    title: "Fair Judging",
    description:
      "Our transparent voting system and expert panels ensure every entry gets a fair chance.",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    icon: Lightbulb,
    title: "Diverse Categories",
    description:
      "From Logo Design to AI Writing – explore contests across 20+ creative categories.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: ShieldCheck,
    title: "Secure Submissions",
    description:
      "Your intellectual property is safe with us. Advanced encryption for all file uploads.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: Zap,
    title: "Instant Payouts",
    description:
      "Winners receive their prize money swiftly via secure payment gateways upon approval.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-96 h-96 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="container relative z-10 px-4 mx-auto md:px-6">
        {/* --- Header --- */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#1D4ED8] font-bold tracking-wider uppercase text-sm"
          >
            Why Choose Us
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-3xl md:text-5xl font-extrabold text-[#111827] leading-tight"
          >
            The Ultimate Platform for <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#1D4ED8] to-[#8B5CF6]">
              Creators & Organizers
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-gray-500"
          >
            We simplify the process of hosting and participating in contests,
            making it rewarding for everyone involved.
          </motion.p>
        </div>

        {/* --- Features Grid --- */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Feature Card Component ---
function FeatureCard({ feature, index }) {
  const { icon: Icon, title, description, color, bg } = feature;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="p-8 transition-all duration-300 bg-white border border-gray-100 shadow-sm group rounded-2xl hover:shadow-xl hover:border-blue-100"
    >
      <div
        className={`w-14 h-14 rounded-xl ${bg} ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon size={28} strokeWidth={2} />
      </div>

      <h3 className="text-xl font-bold text-[#111827] mb-3 group-hover:text-[#1D4ED8] transition-colors">
        {title}
      </h3>

      <p className="text-sm leading-relaxed text-gray-500 md:text-base">
        {description}
      </p>
    </motion.div>
  );
}
