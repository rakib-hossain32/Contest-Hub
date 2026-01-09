import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Trophy, Rocket, Star } from "lucide-react";
import { useNavigate } from "react-router";

const CTA = () => {
    const navigate = useNavigate();

    return (
        <section className="py-24 bg-base-100 overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="relative">
                    {/* Decorative Elements */}
                    <div className="absolute -top-20 -around-left-20 w-80 h-80 bg-primary/20 blur-[120px] rounded-full"></div>
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-secondary/20 blur-[120px] rounded-full"></div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="p-10 md:p-24 bg-linear-to-br from-[#1c3b6c] via-[#1a7a77] to-[#1c3b6c] rounded-[5rem] text-white text-center shadow-[0_50px_100px_-20px_rgba(28,59,108,0.4)] relative overflow-hidden"
                    >
                        {/* Texture Overlay */}
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

                        <div className="relative z-10 max-w-4xl mx-auto">
                            <div className="flex justify-center gap-4 mb-10">
                                {[Rocket, Trophy, Star].map((Icon, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
                                        className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20"
                                    >
                                        <Icon size={28} className="text-accent" />
                                    </motion.div>
                                ))}
                            </div>

                            <h2 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
                                Your Biggest <br /> Stage Awaits.
                            </h2>

                            <p className="text-xl md:text-2xl opacity-80 mb-12 max-w-2xl mx-auto leading-relaxed">
                                Stop waiting for the right moment. Create it. Join the hub where talent meets legendary opportunity.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <button
                                    onClick={() => navigate("/auth/register")}
                                    className="group relative px-12 py-6 bg-accent text-neutral font-black text-xl rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_-10px_rgba(255,215,0,0.4)] cursor-pointer"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Get Started Now
                                        <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                                    </span>
                                </button>

                                <button
                                    onClick={() => navigate("/all-contests")}
                                    className="px-12 py-6 bg-white/5 backdrop-blur-2xl border-2 border-white/20 text-white font-bold text-xl rounded-2xl hover:bg-white/10 transition-all cursor-pointer"
                                >
                                    Browse Challenges
                                </button>
                            </div>

                            <div className="mt-16 pt-10 border-t border-white/10 flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                                <div className="flex items-center gap-2 text-lg font-bold">
                                    <Star size={20} fill="currentColor" /> Trustpilot 4.9/5
                                </div>
                                <div className="flex items-center gap-2 text-lg font-bold">
                                    <Trophy size={20} /> 5M+ Awarded
                                </div>
                                <div className="flex items-center gap-2 text-lg font-bold">
                                    <Rocket size={20} /> 10k+ Startups
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
