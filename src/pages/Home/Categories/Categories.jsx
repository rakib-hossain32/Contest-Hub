import React from "react";
import { motion } from "framer-motion";
import {
    Palette,
    Code,
    Camera,
    Video,
    TrendingUp,
    Cpu,
    PenTool,
    Gamepad2,
    ArrowUpRight
} from "lucide-react";
import { useNavigate } from "react-router";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";

const categories = [
    { name: "Design", icon: Palette, description: "Logos, Branding, UI/UX" },
    { name: "Coding", icon: Code, description: "Web, Mobile, Algorithms" },
    { name: "Photo", icon: Camera, description: "Life, Nature, Commercial" },
    { name: "Media", icon: Video, description: "Editing, Motion, VFX" },
    { name: "Growth", icon: TrendingUp, description: "Ads, Strategy, SEO" },
    { name: "Modern", icon: Cpu, description: "AI, ML, Data Science" },
    { name: "Letters", icon: PenTool, description: "Copy, Blogs, Fiction" },
    { name: "Play", icon: Gamepad2, description: "Game Dev, eSports" },
];

const Categories = () => {
    const navigate = useNavigate();

    return (
        <section className="bg-base-100 pb-10">
            <div className="container px-4 mx-auto">
                <SectionHeader
                    title="Explore by Category"
                    subtitle="Discover curated challenges that match your professional skill set and creative ambition."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((c, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            onClick={() => navigate("/all-contests")}
                            className="group relative p-8 rounded-[2.5rem] bg-base-100 border border-base-content/5 shadow-xl shadow-black/2 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 cursor-pointer overflow-hidden"
                        >
                            {/* Subtle Background Accent */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-500"></div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                        <c.icon size={28} />
                                    </div>
                                    <div className="w-10 h-10 rounded-full border border-base-content/10 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                        <ArrowUpRight size={18} className="text-primary" />
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black text-primary mb-2 tracking-tight group-hover:translate-x-1 transition-transform duration-500">
                                    {c.name}
                                </h3>
                                <p className="text-base-content/50 text-sm font-medium leading-relaxed group-hover:translate-x-1 transition-transform duration-500 delay-75">
                                    {c.description}
                                </p>

                                <div className="mt-8 pt-6 border-t border-base-content/5 flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-base-content/40 group-hover:text-primary transition-colors duration-500">
                                        Browse More
                                    </span>
                                    <div className="h-1 w-8 bg-primary/20 rounded-full group-hover:w-16 transition-all duration-500"></div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
