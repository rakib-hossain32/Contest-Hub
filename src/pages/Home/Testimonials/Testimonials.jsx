import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, MessageSquarePlus, X, Send } from "lucide-react";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useRole from "../../../hooks/useRole";
import { Loader } from "../../../components/Loader/Loader";

const testimonialsData = [
    {
        name: "Sarah Jenkins",
        role: "Digital Artist",
        content: "ContestHub changed my career. I won my first logo challenge here and now I have a full-time design job!",
        avatar: "https://i.pravatar.cc/150?u=sarah",
        rating: 5
    },
    {
        name: "Michael Chen",
        role: "Software Developer",
        content: "The coding competitions are top-notch. I love the technical depth and the fair judging process.",
        avatar: "https://i.pravatar.cc/150?u=michael",
        rating: 5
    },
    {
        name: "Emma Watson",
        role: "Content Creator",
        content: "The easiest platform to host contests. I grew my brand 5x using their campaign tools.",
        avatar: "https://i.pravatar.cc/150?u=emma",
        rating: 5
    },
];

const Testimonials = () => {
    const { user } = useAuth();
    const { role: userRole } = useRole();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const { data: testimonials = [], isLoading } = useQuery({
        queryKey: ["approved-reviews"],
        queryFn: async () => {
            const res = await axiosSecure.get("/reviews");
            return res.data;
        }
    });

    const submitMutation = useMutation({
        mutationFn: async (newReview) => {
            const res = await axiosSecure.post("/reviews", newReview);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Thank you! Your review is pending approval.");
            setIsModalOpen(false);
            setComment("");
        },
        onError: (err) => {
            toast.error(err.message || "Failed to submit review");
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user) {
            toast.error("Please login to share your experience!");
            return;
        }

        const reviewData = {
            name: user?.displayName || "Anonymous",
            email: user?.email,
            role: userRole || "Member",
            avatar: user?.photoURL || "https://i.ibb.co/mJR9fX4/user-placeholder.png",
            content: comment,
            rating: rating
        };

        submitMutation.mutate(reviewData);
    };

    return (
        <section className="bg-base-100 py-10 relative overflow-hidden">
            <div className="container px-4 mx-auto">
                <SectionHeader
                    title="What Our Users Say"
                    subtitle="Hear from the thousands of creators and organizers who use ContestHub every day."
                />

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 pb-16">
                    {isLoading ? (
                        <div className="col-span-full flex justify-center py-20">
                            <Loader />
                        </div>
                    ) : testimonials.length === 0 ? (
                        <div className="col-span-full text-center py-20 text-base-content/40 font-bold italic">
                            No reviews to show. Be the first to share your story!
                        </div>
                    ) : (
                        testimonials.map((t, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 border bg-base-100 rounded-[2.5rem] border-base-content/5 relative group hover:bg-base-200/30 transition-all duration-500 shadow-xl shadow-black/2"
                            >
                                <Quote className="absolute top-6 right-8 text-primary/10 group-hover:text-primary transition-all duration-500" size={48} />

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="relative">
                                        <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-primary/20" />
                                        <div className="absolute -bottom-2 -right-2 bg-accent text-neutral text-[10px] font-black px-2 py-0.5 rounded-lg shadow-lg">
                                            PRO
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-black text-primary text-lg">{t.name}</h4>
                                        <p className="text-xs text-base-content/50 font-bold uppercase tracking-widest">{t.role}</p>
                                    </div>
                                </div>

                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} className="fill-accent text-accent" />
                                    ))}
                                </div>

                                <p className="text-base-content/70 leading-relaxed font-medium">"{t.content}"</p>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* Write a Review Button */}
                <div className="flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsModalOpen(true)}
                        className="group flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-2xl font-black text-lg shadow-sm shadow-primary/20 hover:shadow-primary/40 transition-all cursor-pointer"
                    >
                        <MessageSquarePlus size={24} />
                        Share Your Story
                    </motion.button>
                </div>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-neutral/80 backdrop-blur-sm"
                        ></motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg bg-base-100 rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden border border-white/10"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-base-200 transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="mb-8">
                                <h3 className="text-3xl font-black text-primary mb-2">Write a Review</h3>
                                <p className="text-base-content/60 font-medium italic">Your experience inspires others to create.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-black uppercase tracking-widest text-base-content/40 mb-3">Rating</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                className="transition-transform active:scale-90"
                                            >
                                                <Star
                                                    size={32}
                                                    className={`${star <= rating ? "fill-accent text-accent" : "text-base-content/20"} transition-colors`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-black uppercase tracking-widest text-base-content/40 mb-3">Your Message</label>
                                    <textarea
                                        required
                                        rows="4"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="How did ContestHub help you?"
                                        className="w-full bg-base-200 border-none rounded-2xl p-5 text-lg font-medium outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitMutation.isPending}
                                    className="w-full bg-primary text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
                                >
                                    {submitMutation.isPending ? (
                                        <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            Submit Review <Send size={20} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Testimonials;
