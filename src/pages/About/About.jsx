import React from "react";
import { motion } from "framer-motion";
import { Target, Users, Award, Shield } from "lucide-react";

const About = () => {
    return (
        <div className="pt-24 pb-20">
            <div className="container px-4 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto text-center mb-20"
                >
                    <h1 className="text-4xl md:text-6xl font-black mb-6">Empowering Creativity Globally</h1>
                    <p className="text-xl text-base-content/60 leading-relaxed">
                        ContestHub is the world's leading platform for creative challenges. We connect talented individuals with opportunities to showcase their skills, win prizes, and build their professional portfolios.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                    <div className="relative rounded-[3rem] overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                            alt="Team"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                        <p className="text-lg text-base-content/70 mb-8 leading-relaxed">
                            We believe that talent is universal, but opportunity is not. Our goal is to bridge that gap by providing a transparent, fair, and exciting platform where anyone, anywhere, can compete and succeed based solely on their merit.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-6 bg-base-200 rounded-3xl">
                                <Target className="text-primary mb-3" size={32} />
                                <h4 className="font-bold">Focus</h4>
                                <p className="text-sm text-base-content/60">Dedicated to excellence in every challenge.</p>
                            </div>
                            <div className="p-6 bg-base-200 rounded-3xl">
                                <Users className="text-secondary mb-3" size={32} />
                                <h4 className="font-bold">Community</h4>
                                <p className="text-sm text-base-content/60">Building a supportive global network.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-base-100 text-neutral rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden border border-base-200">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[100px] rounded-full"></div>
                    <h2 className="text-3xl md:text-5xl font-black mb-12">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div>
                            <Award className="mx-auto mb-6 text-primary" size={48} />
                            <h3 className="text-xl font-bold mb-4">Integrity</h3>
                            <p className="opacity-70">We maintain the highest standards of fairness and transparency in all our contests.</p>
                        </div>
                        <div>
                            <Shield className="mx-auto mb-6 text-secondary" size={48} />
                            <h3 className="text-xl font-bold mb-4">Security</h3>
                            <p className="opacity-70">Your data and payments are protected with state-of-the-art security measures.</p>
                        </div>
                        <div>
                            <Users className="mx-auto mb-6 text-accent" size={48} />
                            <h3 className="text-xl font-bold mb-4">Inclusion</h3>
                            <p className="opacity-70">We welcome creators from all walks of life and all corners of the globe.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
