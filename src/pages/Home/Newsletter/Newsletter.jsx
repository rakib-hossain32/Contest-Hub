import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Sparkles, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            toast.success("Welcome to the inner circle!");
            setEmail("");
        }
    };

    return (
        <section className="py-24 bg-base-100 overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="relative p-10 md:p-20 rounded-[4rem] bg-[#0f172a] overflow-hidden group">
                    {/* Animated Background Gradients */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[130px] rounded-full translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/20 blur-[110px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

                    <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-accent font-bold text-sm mb-6 backdrop-blur-md border border-white/10">
                                <Sparkles size={16} /> Exclusive Insights
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                                Don't Just Watch. <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-secondary to-accent">Be Part of It.</span>
                            </h2>
                            <p className="text-xl text-white/60 mb-8 max-w-lg">
                                Join 100k+ pros getting first-row access to high-reward contests, industry trends, and curated creative wisdom.
                            </p>

                            <div className="flex items-center gap-6">
                                {[
                                    { label: "Weekly Tips", icon: CheckCircle2 },
                                    { label: "New Contests", icon: CheckCircle2 },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-white/80 font-medium">
                                        <item.icon size={18} className="text-secondary" />
                                        <span>{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            {!isSubscribed ? (
                                <form
                                    onSubmit={handleSubmit}
                                    className="bg-white/5 backdrop-blur-2xl border border-white/10 p-4 rounded-[2.5rem] shadow-2xl flex flex-col sm:flex-row gap-4"
                                >
                                    <div className="relative flex-1">
                                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40" size={24} />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Your professional email"
                                            className="w-full bg-transparent py-5 pl-16 pr-6 text-white text-lg outline-none placeholder:text-white/20"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-primary hover:bg-primary/90 text-white font-black px-10 py-5 rounded-[1.8rem] transition-all flex items-center justify-center gap-3 active:scale-95 group/btn"
                                    >
                                        Join Inner Circle
                                        <Send size={20} className="group-hover/btn:translate-x-2 group-hover/btn:-translate-y-1 transition-transform" />
                                    </button>
                                </form>
                            ) : (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="bg-success/10 backdrop-blur-2xl border border-success/20 p-12 rounded-[2.5rem] text-center"
                                >
                                    <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6 text-success">
                                        <CheckCircle2 size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">You're All Set!</h3>
                                    <p className="text-white/60">Check your inbox for the welcome kit.</p>
                                </motion.div>
                            )}

                            <p className="mt-6 text-center text-sm text-white/30">
                                Respected privacy. No spam. One-click unsubscribe anytime.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
