import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import Swal from "sweetalert2";

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Success!",
            text: "Thank you for your message. We'll get back to you soon!",
            icon: "success",
            confirmButtonColor: "#1D4ED8",
        });
        e.target.reset();
    };

    return (
        <div className="pt-24 pb-20">
            <div className="container px-4 mx-auto">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black mb-4">Get in Touch</h1>
                    <p className="text-xl text-base-content/60">
                        Have questions? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
                    <div className="lg:col-span-5 space-y-8">
                        <div className="p-8 bg-base-200 rounded-[2.5rem]">
                            <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
                            <div className="space-y-6">
                                <div className="flex gap-4 items-center">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold opacity-50 uppercase">Email Us</p>
                                        <p className="text-lg font-bold">support@contesthub.com</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold opacity-50 uppercase">Call Us</p>
                                        <p className="text-lg font-bold">+1 (555) 000-0000</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold opacity-50 uppercase">Our Office</p>
                                        <p className="text-lg font-bold">123 Creative Way, San Francisco, CA</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-primary text-primary-content rounded-[2.5rem] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full"></div>
                            <MessageSquare className="mb-6 opacity-30" size={48} />
                            <h3 className="text-2xl font-bold mb-4">Live Support</h3>
                            <p className="opacity-80 mb-6">Our support team is available 24/7 for urgent inquiries.</p>
                            <button className="px-6 py-3 bg-white text-primary font-bold rounded-xl hover:bg-base-100 transition-colors">
                                Start Chat
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <form onSubmit={handleSubmit} className="p-8 md:p-12 border border-base-200 bg-base-100 rounded-[3rem] shadow-xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-bold mb-2 opacity-70">First Name</label>
                                    <input required type="text" className="w-full px-5 py-4 bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-primary outline-none" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2 opacity-70">Last Name</label>
                                    <input required type="text" className="w-full px-5 py-4 bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-primary outline-none" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-bold mb-2 opacity-70">Email Address</label>
                                <input required type="email" className="w-full px-5 py-4 bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-primary outline-none" placeholder="john@example.com" />
                            </div>
                            <div className="mb-8">
                                <label className="block text-sm font-bold mb-2 opacity-70">Your Message</label>
                                <textarea required rows="5" className="w-full px-5 py-4 bg-base-200 border-none rounded-2xl focus:ring-2 focus:ring-primary outline-none resize-none" placeholder="How can we help you?"></textarea>
                            </div>
                            <button type="submit" className="w-full py-5 bg-primary text-white font-black text-lg rounded-2xl hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3 active:scale-95 cursor-pointer">
                                Send Message
                                <Send size={20} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
