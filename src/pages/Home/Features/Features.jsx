import React from "react";
import { motion } from "framer-motion";
import {
    Trophy,
    Target,
    Users,
    Zap,
    Search,
    ShieldCheck,
    Layout,
    Cpu
} from "lucide-react";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";

const features = [
    {
        title: "Global Reach",
        description: "Connect with elite creators and visionaries from over 150 countries worldwide.",
        icon: Users,
        color: "bg-primary/10 text-primary",
        border: "hover:border-primary/50"
    },
    {
        title: "Curated Challenges",
        description: "Access high-stakes contests designed by industry leaders and top-tier brands.",
        icon: Target,
        color: "bg-secondary/10 text-secondary",
        border: "hover:border-secondary/50"
    },
    {
        title: "Secure Payouts",
        description: "Experience absolute peace of mind with our military-grade encrypted payment gateway.",
        icon: ShieldCheck,
        color: "bg-success/10 text-success",
        border: "hover:border-success/50"
    },
    {
        title: "Instant Analytics",
        description: "Track your progress with real-time performance metrics and predictive insights.",
        icon: Cpu,
        color: "bg-info/10 text-info",
        border: "hover:border-info/50"
    },
    {
        title: "Victory Rewards",
        description: "Compete for massive prize pools, exclusive perks, and career-defining opportunities.",
        icon: Trophy,
        color: "bg-accent/10 text-accent",
        border: "hover:border-accent/50"
    },
    {
        title: "Seamless Workflow",
        description: "Manage submissions and feedback effortlessly with our intuitive creator dashboard.",
        icon: Layout,
        color: "bg-warning/10 text-warning",
        border: "hover:border-warning/50"
    }
];

const Features = () => {
    return (
        <section className="relative overflow-hidden bg-base-100 pb-10">
    

            <div className="container px-4 mx-auto relative z-10">
                <SectionHeader
                    title={<>Elevate Your Creative <br /> Potential</>}
                    subtitle="We provide the infrastructure for excellence. Join a platform built for professionals who demand more from their competitive journey."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className={`p-10 rounded-[3rem] bg-base-100 border border-base-200 shadow-2xl shadow-black/5 group transition-all duration-500 ${feature.border}`}
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${feature.color}`}>
                                <feature.icon size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-base-content/60 leading-relaxed mb-6">
                                {feature.description}
                            </p>
                            <div className="w-12 h-1 bg-linear-to-r from-transparent via-primary/20 to-transparent group-hover:w-full transition-all duration-700"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
