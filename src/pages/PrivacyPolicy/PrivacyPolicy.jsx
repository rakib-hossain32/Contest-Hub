import React from "react";
import { Shield, Lock, Eye, FileCheck } from "lucide-react";

const PrivacyPolicy = () => {
    return (
        <div className="pt-24 pb-20">
            <div className="container px-4 mx-auto max-w-4xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-6">
                        <Shield size={40} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4">Privacy Policy</h1>
                    <p className="text-lg text-base-content/60">Last updated: January 2026</p>
                </div>

                <div className="prose prose-lg max-w-none text-base-content/80">
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-base-content flex items-center gap-3 mb-6">
                            <Lock className="text-primary" /> 1. Information Collection
                        </h2>
                        <p className="leading-relaxed mb-4">
                            We collect information you provide directly to us when you create an account, participate in a contest, or communicate with us. This may include your name, email address, payment information, and any content you upload.
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Account Credentials (Email, Username, Password)</li>
                            <li>Profile Information (Photo, Bio, Location)</li>
                            <li>Submission Materials (Portfolio links, Files, Descriptions)</li>
                            <li>Payment Details (Handled securely by our payment partners)</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-base-content flex items-center gap-3 mb-6">
                            <Eye className="text-secondary" /> 2. How We Use Information
                        </h2>
                        <p className="leading-relaxed mb-4">
                            We use the information we collect to operate, maintain, and provide the features of ContestHub. Specifically, for:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Verifying contest submissions and awarding prizes</li>
                            <li>Communicating with you about contests and account activities</li>
                            <li>Improving our services and developing new features</li>
                            <li>Ensuring the security and integrity of our platform</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-base-content flex items-center gap-3 mb-6">
                            <FileCheck className="text-accent" /> 3. Data Protection
                        </h2>
                        <p className="leading-relaxed mb-4">
                            ContestHub takes security seriously. We use administrative, technical, and physical safeguards to protect your personal information from unauthorized access, loss, or alteration.
                        </p>
                        <p className="leading-relaxed">
                            For any questions regarding our privacy practices, please contact us at <span className="font-bold text-primary">privacy@contesthub.com</span>.
                        </p>
                    </section>
                </div>

                <div className="mt-20 p-8 bg-base-200 rounded-[2.5rem] border border-base-300">
                    <p className="text-center font-bold">
                        By using ContestHub, you agree to the terms outlined in this Privacy Policy and our Terms of Service.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
