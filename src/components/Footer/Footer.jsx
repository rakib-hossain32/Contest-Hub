import React from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
  ArrowRight,
  Heart,
  ShieldCheck,
  Send,
} from "lucide-react";
import logo from '../../../public/logo3.png'
import { Link } from "react-router";


export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Link Groups Data
  const footerLinks = {
    platform: [
      { name: "Browse Contests", href: "#" },
      { name: "Success Stories", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "For Organizers", href: "#" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Contact", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Dispute Resolution", href: "#" },
    ],
  };

  return (
    <footer className="relative bg-[#0f172a] text-white overflow-hidden border-t border-white/5 font-sans">
      {/* --- Background Effects --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>
        {/* Glows */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#1D4ED8] rounded-full mix-blend-screen filter blur-[120px] opacity-10"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#8B5CF6] rounded-full mix-blend-screen filter blur-[120px] opacity-10"></div>
      </div>

      <div className="container relative z-10 px-6 pt-20 pb-10 mx-auto">
        {/* --- Top Section: CTA & Newsletter --- */}
        <div className="grid grid-cols-1 gap-12 mb-16 lg:grid-cols-12">
          {/* Brand Info */}
          <div className="space-y-6 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2"
            >
              <div className="flex items-center justify-center h-15 w-15 ">
                {/* <span className="text-xl font-bold text-white">C</span> */}
                <Link to='/'>
                  <img src={logo} alt="" />
                </Link>
              </div>

              <span className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-white to-gray-400">
                ContestHub
              </span>
            </motion.div>

            <p className="max-w-md leading-relaxed text-gray-400">
              The ultimate platform for creators to showcase talent and for
              businesses to find perfect solutions. Join the revolution of
              creative contests today.
            </p>

            <div className="flex gap-4">
              <SocialButton icon={Facebook} href="#" />
              <SocialButton icon={Twitter} href="#" />
              <SocialButton icon={Instagram} href="#" />
              <SocialButton icon={Linkedin} href="#" />
              <SocialButton icon={Github} href="#" />
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="flex flex-col justify-center p-8 border lg:col-span-7 bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl">
            <h3 className="mb-2 text-xl font-bold">
              Subscribe to our newsletter
            </h3>
            <p className="mb-6 text-sm text-gray-400">
              Get the latest contest updates, winner announcements, and tips
              straight to your inbox.
            </p>

            <form className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Mail
                  className="absolute text-gray-400 -translate-y-1/2 left-4 top-1/2"
                  size={20}
                />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-3.5 bg-[#0f172a] border border-gray-700 rounded-xl focus:outline-none focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8] text-white placeholder-gray-500 transition-all"
                />
              </div>
              <button
                type="button"
                className="group px-8 py-3.5 bg-[#1D4ED8] hover:bg-[#1e40af] text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
              >
                Subscribe
                <Send
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>
          </div>
        </div>

        <div className="w-full h-px mb-16 bg-linear-to-r from-transparent via-gray-800 to-transparent"></div>

        {/* --- Middle Section: Links Grid --- */}
        <div className="grid grid-cols-2 gap-8 mb-16 md:grid-cols-4 lg:gap-12">
          {/* Platform Links */}
          <div>
            <h4 className="mb-6 font-bold text-white">Platform</h4>
            <ul className="space-y-4">
              {footerLinks.platform.map((link) => (
                <FooterLink key={link.name} href={link.href}>
                  {link.name}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="mb-6 font-bold text-white">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <FooterLink key={link.name} href={link.href}>
                  {link.name}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="mb-6 font-bold text-white">Legal</h4>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <FooterLink key={link.name} href={link.href}>
                  {link.name}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Support Info */}
          <div>
            <h4 className="mb-6 font-bold text-white">Contact Support</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <Mail size={20} className="text-[#1D4ED8] mt-1" />
                <span>
                  support@contesthub.com
                  <br />
                  <span className="text-xs text-gray-500">
                    We reply within 24 hours
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <ShieldCheck size={20} className="text-[#10B981] mt-1" />
                <span>
                  Secure Payments
                  <br />
                  <span className="text-xs text-gray-500">
                    256-bit SSL Encryption
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* --- Bottom Section: Copyright --- */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 border-t border-gray-800 md:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} ContestHub Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <p className="flex items-center gap-1.5 text-sm text-gray-500">
              Made with{" "}
              <Heart
                size={14}
                className="text-red-500 fill-red-500 animate-pulse"
              />{" "}
              by <span className="font-medium text-white">ContestHub Team</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Helper Components ---

function FooterLink({ href, children }) {
  return (
    <li>
      <a
        href={href}
        className="group flex items-center gap-2 text-gray-400 hover:text-[#10B981] transition-colors duration-300 w-max"
      >
        <span className="h-px w-0 bg-[#10B981] group-hover:w-3 transition-all duration-300"></span>
        {children}
      </a>
    </li>
  );
}

function SocialButton({ icon: Icon, href }) {
  return (
    <a
      href={href}
      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#1D4ED8] hover:text-white hover:border-[#1D4ED8] hover:-translate-y-1 transition-all duration-300"
    >
      <Icon size={18} />
    </a>
  );
}
