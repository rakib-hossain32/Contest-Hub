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
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Users,
    title: "Large Community",
    description:
      "Connect with over 50,000+ talented creators ready to bring your ideas to life.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Trophy,
    title: "Fair Judging",
    description:
      "Our transparent voting system and expert panels ensure every entry gets a fair chance.",
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    icon: Lightbulb,
    title: "Diverse Categories",
    description:
      "From Logo Design to AI Writing – explore contests across 20+ creative categories.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: ShieldCheck,
    title: "Secure Submissions",
    description:
      "Your intellectual property is safe with us. Advanced encryption for all file uploads.",
    color: "text-info",
    bg: "bg-info/10",
  },
  {
    icon: Zap,
    title: "Instant Payouts",
    description:
      "Winners receive their prize money swiftly via secure payment gateways upon approval.",
    color: "text-error",
    bg: "bg-error/10",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 overflow-hidden bg-base-100">
      {/* Decorative Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10 px-4 mx-auto md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-wider uppercase text-primary"
          >
            Why Choose Us
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-3xl font-extrabold md:text-5xl text-neutral"
          >
            The Ultimate Platform for <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
              Creators & Organizers
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-neutral/60"
          >
            We simplify the process of hosting and participating in contests,
            making it rewarding for everyone involved.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }) {
  const { icon: Icon, title, description, color, bg } = feature;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="p-8 transition-all duration-300 border shadow-sm bg-base-100 border-base-100 rounded-2xl hover:shadow-xl hover:border-primary/40 group"
    >
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${bg} ${color}`}
      >
        <Icon size={28} strokeWidth={2} />
      </div>

      <h3 className="mb-3 text-xl font-bold transition-colors text-neutral group-hover:text-primary">
        {title}
      </h3>

      <p className="text-sm md:text-base text-neutral/60">{description}</p>
    </motion.div>
  );
}
