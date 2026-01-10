import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, ShieldCheck, ArrowRight, Star } from "lucide-react";
import { toast } from "react-toastify";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle"); // idle, loading, success

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");

        // Simulate network request
        setTimeout(() => {
            setStatus("success");
            toast.success("Welcome to the elite circle! 🚀");
            setEmail("");
        }, 1500);
    };

    return (
        <section className="py-20 px-4 md:px-8 bg-base-100 overflow-hidden font-sans relative">
            {/* --- Ambient Background Noise/Grid --- */}
            {/* <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div> */}

            <div className="max-w-7xl mx-auto">
                <div className="relative rounded-[3rem] overflow-hidden bg-[#0B0F19] border border-white/10 shadow-2xl shadow-primary/10 group">

                    {/* --- Dynamic Background Glows --- */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3 group-hover:bg-primary/30 transition-colors duration-1000"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3 group-hover:bg-secondary/20 transition-colors duration-1000"></div>

                    {/* Grid Overlay for Tech feel */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)] pointer-events-none"></div>

                    <div className="relative z-10 grid lg:grid-cols-12 gap-12 p-8 md:p-16 lg:p-20 items-center">

                        {/* --- Left Content (Copy) --- */}
                        <div className="lg:col-span-7 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                                </span>
                                <span className="text-xs font-bold tracking-widest text-white/80 uppercase">Weekly Intelligence</span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight"
                            >
                                Unlock the <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-secondary animate-gradient-x">
                                    Future of Design.
                                </span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-lg text-white/60 max-w-xl leading-relaxed"
                            >
                                Join an elite network of creators receiving curated contests, insider strategies, and design resources directly to their inbox. No fluff, just value.
                            </motion.p>

                            {/* Social Proof / Trust Indicators */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="flex items-center gap-6 pt-4"
                            >
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <img
                                            key={i}
                                            className="w-10 h-10 rounded-full border-2 border-[#0B0F19]"
                                            src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                            alt="User"
                                        />
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-2 border-[#0B0F19] bg-white/10 backdrop-blur-sm flex items-center justify-center text-xs text-white font-bold">
                                        +2k
                                    </div>
                                </div>
                                <div>
                                    <div className="flex text-accent mb-1">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                    </div>
                                    <p className="text-sm text-white/40 font-medium">Loved by top designers</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* --- Right Content (Form Card) --- */}
                        <div className="lg:col-span-5">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="relative bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl"
                            >
                                {/* Floating Decor Element */}
                                <motion.div
                                    animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-accent to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30 rotate-12 z-20"
                                >
                                    <Sparkles className="text-white" size={32} />
                                </motion.div>

                                <AnimatePresence mode="wait">
                                    {status === "success" ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-10"
                                        >
                                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <ShieldCheck className="text-green-400" size={40} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">You're In!</h3>
                                            <p className="text-white/60">Check your inbox for the welcome kit.</p>
                                            <button
                                                onClick={() => setStatus("idle")}
                                                className="mt-6 text-sm text-white/40 hover:text-white underline"
                                            >
                                                Subscribe another email
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.form
                                            key="form"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onSubmit={handleSubmit}
                                            className="space-y-6"
                                        >
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-2">Join the Inner Circle</h3>
                                                <p className="text-sm text-white/50">Get early access to high-ticket contests.</p>
                                            </div>

                                            <div className="relative group/input">
                                                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-50 blur transition duration-500 group-hover/input:opacity-100"></div>
                                                <div className="relative flex items-center bg-[#0F1623] rounded-2xl p-2 border border-white/10 focus-within:border-white/20 transition-colors">
                                                    <input
                                                        type="email"
                                                        required
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="name@work-email.com"
                                                        className="w-full bg-transparent text-white px-4 py-3 outline-none placeholder:text-white/20"
                                                    />
                                                    <button
                                                        disabled={status === "loading"}
                                                        type="submit"
                                                        className="bg-white text-black hover:bg-gray-200 font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                                    >
                                                        {status === "loading" ? (
                                                            <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                                                        ) : (
                                                            <>
                                                                Join <ArrowRight size={16} />
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>

                                            <p className="text-xs text-center text-white/30 flex items-center justify-center gap-2">
                                                <ShieldCheck size={12} /> 100% Secure. Unsubscribe anytime.
                                            </p>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;