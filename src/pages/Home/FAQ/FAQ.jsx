import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Minus,
  MessageCircle,
  Mail,
  FileText,
  ChevronRight,
  HelpCircle,
} from "lucide-react";

// --- FAQ Data ---
const faqData = [
  {
    id: 1,
    category: "General",
    question: "What is ContestHub and how does it work?",
    answer:
      "ContestHub is a platform connecting creators with contest organizers. Organizers launch contests with specific requirements and prize money. Creators submit their work, and the best entries are selected as winners to receive the prize.",
  },
  {
    id: 2,
    category: "Participation",
    question: "How do I create a contest?",
    answer:
      "To create a contest, log in to your account and click 'Create Contest'. Follow the simple step-by-step wizard to define your category, budget, timeline, and requirements. Once approved by our admin, your contest goes live immediately.",
  },
  {
    id: 3,
    category: "Participation",
    question: "How do I participate in a contest?",
    answer:
      "Browse the 'All Contests' page and find a challenge that suits your skills. Click 'View Details' to read the brief. You may need to pay a small entry fee (if applicable). Once registered, use the 'Submit Task' button to upload your work or provide a link.",
  },
  {
    id: 4,
    category: "Judging",
    question: "How are winners selected?",
    answer:
      "Winners are selected based on the criteria set by the contest organizer (e.g., creativity, adherence to brief). For some contests, we also have a community voting system or an expert panel to ensure fair transparency.",
  },
  {
    id: 5,
    category: "Payments",
    question: "How do I withdraw my prize money?",
    answer:
      "Once you are declared a winner, the prize money is credited to your ContestHub wallet. You can withdraw it anytime via PayPal, Stripe, or Bank Transfer. Withdrawals are typically processed within 24-48 hours.",
  },
  {
    id: 6,
    category: "General",
    question: "What are the contest categories?",
    answer:
      "We support a wide range of categories including Graphic Design (Logos, UI/UX), Content Writing, Web Development, Photography, Video Editing, and Digital Art.",
  },
  {
    id: 7,
    category: "Participation",
    question: "Can I edit or delete my submission?",
    answer:
      "Yes, you can edit or withdraw your submission as long as the contest deadline hasn't passed. Go to your dashboard, find the submission, and select 'Edit'. After the deadline, submissions are locked.",
  },
  {
    id: 8,
    category: "Support",
    question: "How do I contact support?",
    answer:
      "You can reach our support team 24/7. Scroll down to the bottom of this page to find our email address or use the live chat feature for immediate assistance.",
  },
];

const categories = [
  "All",
  "General",
  "Participation",
  "Judging",
  "Payments",
  "Support",
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState(null);

  // Toggle Accordion
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Filter Logic
  const filteredFAQs = faqData.filter((item) => {
    const matchesSearch = item.question
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;

    // If searching, ignore category tab to show all relevant results
    return searchQuery ? matchesSearch : matchesCategory && matchesSearch;
  });

  return (
    <div className="">
      {/* --- 1. Hero Section --- */}
      <section className="relative bg-[#111827] pt-24 pb-32 px-4 md:px-6 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1D4ED8] rounded-full opacity-20 blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#8B5CF6] rounded-full opacity-10 blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

        <div className="container relative z-10 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-sm font-medium text-blue-400 border rounded-full bg-blue-500/10 border-blue-500/20">
              <HelpCircle size={16} /> Help Center
            </span>
            <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              How can we help you?
            </h1>
            <p className="max-w-2xl mx-auto mb-10 text-lg text-gray-400">
              Everything you need to know about creating contests,
              participating, and getting paid.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 z-10 flex items-center pointer-events-none left-4">
                <Search className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                placeholder="Search for answers (e.g. 'Withdraw money')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:bg-white/20 transition-all shadow-xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 2. FAQ Section --- */}
      <div className="container relative z-20 px-4 pb-20 mx-auto -mt-16 md:px-6">
        {/* Categories (Only show if not searching) */}
        {!searchQuery && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat, idx) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(null);
                }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm ${
                  activeCategory === cat
                    ? "bg-[#1D4ED8] text-white ring-4 ring-blue-100"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        )}

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4">
          <AnimatePresence>
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openIndex === index}
                  onClick={() => toggleFAQ(index)}
                />
              ))
            ) : (
              <div className="py-10 text-center border shadow-xl bg-base-100 border-base-100 rounded-2xl">
                <p className="text-gray-500">
                  No results found for "{searchQuery}"
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-2 text-[#1D4ED8] font-medium hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* --- 3. Contact Support Section --- */}
      <section className="py-16 border-t border-neutral bg-base-100">
        <div className="container px-4 mx-auto text-center">
          <div className="relative max-w-4xl p-8 mx-auto overflow-hidden border border-gray-100 shadow-lg bg-linear-to-br from-base-200 to-base-100 rounded-3xl md:p-12">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl text-neutral">
              Still have questions?
            </h2>
            <p className="max-w-xl mx-auto mb-8 text-gray-500">
              Can't find the answer you're looking for? Please chat to our
              friendly team.
            </p>

            <div className="flex flex-col justify-center gap-4 md:flex-row">
              <a
                href="#"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1D4ED8] text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20"
              >
                <MessageCircle size={18} /> Chat with Support
              </a>
              <a
                href="mailto:support@contesthub.com"
                className="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-gray-700 transition bg-white border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                <Mail size={18} /> Email Us
              </a>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-gray-500">
              <a
                href="#"
                className="flex items-center gap-1 hover:text-[#1D4ED8] transition"
              >
                <FileText size={14} /> Documentation
              </a>
              <span className="text-gray-300">|</span>
              <a
                href="#"
                className="flex items-center gap-1 hover:text-[#1D4ED8] transition"
              >
                <ChevronRight size={14} /> Community Forum
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- Sub-Component: FAQ Accordion Item ---
function FAQItem({ faq, isOpen, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`bg-base-100 rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "border-[#1D4ED8] shadow-md ring-2 ring-blue-50"
          : "border-gray-200 hover:border-blue-200"
      }`}
    >
      <button
        onClick={onClick}
        className="flex items-center justify-between w-full p-5 text-left md:p-6 focus:outline-none"
      >
        <span
          className={`text-lg font-semibold transition-colors ${
            isOpen ? "text-[#1D4ED8]" : ""
          }`}
        >
          {faq.question}
        </span>
        <div
          className={`p-2 rounded-full transition-colors shrink-0 ml-4 ${
            isOpen ? "bg-blue-100 text-[#1D4ED8]" : "bg-gray-100 text-gray-500"
          }`}
        >
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pt-4 pb-6 leading-relaxed text-gray-600 border-t border-gray-100">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
