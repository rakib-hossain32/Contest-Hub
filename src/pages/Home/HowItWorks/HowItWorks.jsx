import React from "react";
import { motion } from "framer-motion";
import { Search, UserPlus, Send, Trophy, ArrowRight } from "lucide-react";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";

const steps = [
    {
        icon: Search,
        title: "Explore Challenges",
        description: "Browse through thousands of diverse contests in design, coding, writing, and more to find your perfect match.",
        color: "bg-primary",
    },
    {
        icon: UserPlus,
        title: "Join & Register",
        description: "Create your professional profile, join interesting contests, and get ready to showcase your unique talent.",
        color: "bg-secondary",
    },
    {
        icon: Send,
        title: "Submit Your Work",
        description: "Upload your high-quality entries before the deadline. Our platform supports various file formats and links.",
        color: "bg-accent",
    },
    {
        icon: Trophy,
        title: "Win & Get Rewarded",
        description: "The best entries win cash prizes, digital certificates, and global recognition in our vibrant community.",
        color: "bg-primary",
    },
];

const HowItWorks = () => {
    return (
        <section className="bg-base-100 overflow-hidden relative">
            <div className="container px-4 mx-auto relative z-10">
                <SectionHeader
                    title="How It Works"
                    subtitle="Your journey from discovery to success on ContestHub is designed to be seamless, transparent, and rewarding."
                />

                <div className="relative mt-12">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-base-content/10 -translate-y-1/2 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex flex-col items-center text-center group"
                            >
                                {/* Step Icon Container */}
                                <div className="mb-6 relative">
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className={`w-24 h-24 rounded-4xl ${step.color} flex items-center justify-center text-primary-content shadow-xl relative z-10 p-6`}
                                    >
                                        <step.icon size={40} />
                                    </motion.div>

                                    {/* Step Number Badge */}
                                    <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-base-100 border-4 border-base-200 flex items-center justify-center font-black text-sm text-neutral z-20 shadow-md">
                                        {idx + 1}
                                    </div>

                                    {/* Connecting Arrow for Mobile/Tablet */}
                                    {idx < steps.length - 1 && (
                                        <div className="lg:hidden absolute -bottom-10 left-1/2 -translate-x-1/2 text-base-content/20">
                                            <ArrowRight className="rotate-90 md:rotate-0" size={32} />
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-2xl font-black text-neutral mb-3 tracking-tight">
                                    {step.title}
                                </h3>
                                <p className="text-base-content/60 leading-relaxed font-medium max-w-[260px]">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
