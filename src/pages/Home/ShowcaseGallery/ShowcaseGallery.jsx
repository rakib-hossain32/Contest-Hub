import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Code, Camera, Video, Trophy, ArrowUpRight } from "lucide-react";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";

const galleryData = [
    {
        id: 1,
        title: "EcoBrand Logo Design",
        category: "Design",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        winner: "Eleanor Pena",
        prize: "$1,200",
    },
    {
        id: 2,
        title: "Urban Photography Pack",
        category: "Photo",
        image: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        winner: "Guy Hawkins",
        prize: "$800",
    },
    {
        id: 3,
        title: "SaaS Dashboard UI Kit",
        category: "Design",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        winner: "Jane Cooper",
        prize: "$1,500",
    },
    {
        id: 4,
        title: "AI Voice Bot Script",
        category: "Coding",
        image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        winner: "Wade Warren",
        prize: "$2,000",
    },
    {
        id: 5,
        title: "Cinematic Travel Film",
        category: "Media",
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        winner: "Bessie Cooper",
        prize: "$1,100",
    },
    {
        id: 6,
        title: "FinTech App Architecture",
        category: "Coding",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        winner: "Robert Fox",
        prize: "$2,500",
    },
];

const categories = ["All", "Design", "Photo", "Coding", "Media"];

const ShowcaseGallery = () => {
    const [filter, setFilter] = useState("All");

    const filteredItems = galleryData.filter(
        (item) => filter === "All" || item.category === filter
    );

    return (
        <section className="bg-base-100 pb-20">
            <div className="container px-4 mx-auto">
                <SectionHeader
                    title="Winning Showcase"
                    subtitle="Explore the exceptional work submitted by our creative community that set new standards of excellence."
                />

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${filter === cat
                                    ? "bg-primary text-primary-content shadow-lg ring-2 ring-primary/20"
                                    : "bg-base-200 text-base-content/60 hover:bg-base-300"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="group relative h-[450px] rounded-4xl overflow-hidden border border-base-content/5 bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-500"
                            >
                                {/* Image Overlay Gradient */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity"></div>

                                {/* Image */}
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
                                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="inline-block px-3 py-1 bg-primary text-primary-content rounded-full text-[10px] font-black uppercase tracking-wider mb-4">
                                            {item.category}
                                        </span>

                                        <h3 className="text-2xl font-black text-white mb-2 leading-tight">
                                            {item.title}
                                        </h3>

                                        <div className="flex items-center justify-between mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-primary">
                                                    <Trophy size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-white/50 uppercase font-black">Winner</p>
                                                    <p className="text-sm font-bold text-white">{item.winner}</p>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-[10px] text-white/50 uppercase font-black">Prize Won</p>
                                                <p className="text-xl font-black text-primary">{item.prize}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Action Icon */}
                                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                    <ArrowUpRight size={24} />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default ShowcaseGallery;
