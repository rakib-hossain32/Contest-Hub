import React from "react";
import { motion } from "framer-motion";
import { Users, Trophy, Briefcase, Star } from "lucide-react";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";

const stats = [
    { icon: Users, label: "Active Creators", value: "10,000+" },
    { icon: Trophy, label: "Total Prizes", value: "$250,000+" },
    { icon: Briefcase, label: "Total Contests", value: "1,500+" },
    { icon: Star, label: "Success Rate", value: "98%" },
];

const Stats = () => {
    return (
        <section className="bg-base-100 overflow-hidden relative">

            <div className="container relative z-10 px-4 mx-auto">
                <SectionHeader
                    title="Impact in Numbers"
                    subtitle="We are proud of the community we have built and the opportunities we have created for talented individuals."
                />
                <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                    {stats.map((s, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-center"
                        >
                            <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-white/20">
                                <s.icon size={24} />
                            </div>
                            <h3 className="mb-2 text-3xl font-black md:text-4xl">{s.value}</h3>
                            <p className="text-sm font-bold tracking-widest uppercase opacity-80">{s.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
