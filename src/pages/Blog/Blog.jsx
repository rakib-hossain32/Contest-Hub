import React from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";

const blogPosts = [
    {
        title: "How to Win Your First Design Contest",
        excerpt: "Success in design contests isn't just about skill. It's about understanding the brief and communicating your vision effectively.",
        author: "Alex Rivera",
        date: "Dec 20, 2025",
        image: "https://images.unsplash.com/photo-1541462608141-675f15914730?auto=format&fit=crop&w=400&q=80",
        category: "Tips"
    },
    {
        title: "The Future of AI in Creative Competitions",
        excerpt: "Artificial intelligence is reshaping how we create and judge. What does this mean for the next generation of creators?",
        author: "Elena Petrova",
        date: "Jan 05, 2026",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=80",
        category: "AI"
    },
    {
        title: "Community Spotlight: Winner Stories",
        excerpt: "Celebrating the incredible journey of our latest contest winners and how they overcame challenges to reach the top.",
        author: "Mark Johnson",
        date: "Jan 12, 2026",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80",
        category: "Community"
    }
];

const Blog = () => {
    return (
        <div className="pt-24 pb-20">
            <div className="container px-4 mx-auto">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
                        <BookOpen size={16} /> Latest Insights
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6">The ContestHub Blog</h1>
                    <p className="text-xl text-base-content/60 leading-relaxed">
                        Discover tips, stories, and the latest news from the global creative community.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {blogPosts.map((post, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-video rounded-4xl overflow-hidden mb-6">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-primary font-bold text-xs uppercase shadow-lg">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-base-content/50 mb-4">
                                <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
                                <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                                {post.title}
                            </h3>
                            <p className="text-base-content/60 mb-6 leading-relaxed line-clamp-3">
                                {post.excerpt}
                            </p>
                            <button className="flex items-center gap-2 font-bold text-primary group/btn">
                                Read Full Story <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                            </button>
                        </motion.div>
                    ))}
                </div>

                <div className="p-12 bg-base-100 text-neutral rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 border border-primary/50">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Want more insights?</h2>
                        <p className="opacity-60">Join 50,000+ creators and get the best content in your inbox.</p>
                    </div>
                    <button className="px-10 py-5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-lg cursor-pointer">
                        Subscribe Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Blog;
