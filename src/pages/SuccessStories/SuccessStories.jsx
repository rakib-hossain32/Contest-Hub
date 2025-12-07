import React from "react";
import { motion } from "framer-motion";
import { Trophy, Play, Quote, Award, Sparkles, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router";
import { StatItem } from "./StatItem";

// --- Mock Data ---
const winners = [
  {
    id: 1,
    name: "Eleanor Pena",
    role: "Freelance Designer",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    contest: "UI Masterclass 2024",
    prize: "$5,000",
    quote:
      "Winning this contest didn't just give me prize money, it gave me a portfolio piece that landed me a job at a top agency.",
  },
  {
    id: 2,
    name: "Cody Fisher",
    role: "Backend Dev",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    contest: "API Optimization Challenge",
    prize: "$3,500",
    quote:
      "The competition was fierce, but the judging was transparent. I learned so much from the feedback provided by the experts.",
  },
  {
    id: 3,
    name: "Esther Howard",
    role: "Content Creator",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    contest: "Viral Blog Writing",
    prize: "$2,000",
    quote:
      "ContestHub is the best platform for writers. The community support is amazing and the payouts are instant.",
  },
];

export default function SuccessStories() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* --- Hero Section --- */}
      <section className="relative py-20 bg-[#111827] text-white overflow-hidden">
        {/* Background linears */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1D4ED8] rounded-full mix-blend-screen filter blur-[150px] opacity-30 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#8B5CF6] rounded-full mix-blend-screen filter blur-[150px] opacity-20 -translate-x-1/3 translate-y-1/3"></div>

        <div className="container relative z-10 px-4 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm mb-4 border border-yellow-500/30">
              Inspiration Hub
            </span>
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
              Real Winners. <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">
                Real Stories.
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-300">
              Discover how creative minds from around the world are changing
              their lives through our contests. You could be next.
            </p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid max-w-4xl grid-cols-2 gap-4 p-6 mx-auto mt-16 border md:grid-cols-4 bg-white/5 backdrop-blur-md rounded-2xl border-white/10"
          >
            <StatItem
              icon={Trophy}
              value="5,000+"
              label="Winners"
              color="text-yellow-400"
            />
            <StatItem
              icon={Award}
              value="$1.2M+"
              label="Prizes Paid"
              color="text-emerald-400"
            />
            <StatItem
              icon={Sparkles}
              value="850+"
              label="Contests"
              color="text-purple-400"
            />
            <StatItem
              icon={TrendingUp}
              value="50k+"
              label="Community"
              color="text-blue-400"
            />
          </motion.div>
        </div>
      </section>

      {/* --- Featured Video Story --- */}
      <section className="container px-4 py-20 mx-auto md:px-6">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="lg:w-1/2">
            <h2 className="mb-4 text-3xl font-bold text-neutral">
              From Hobbyist to Professional
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-gray-600">
              Meet <strong>Sarah Jenkins</strong>, a graphic designer who
              started participating in weekend contests for fun. Today, she runs
              her own agency funded entirely by her contest winnings.
            </p>
            <div className="flex items-center gap-4 text-sm font-semibold text-gray-500">
              <span className="px-3 py-1 text-blue-700 bg-blue-100 rounded-full">
                Video Interview
              </span>
              <span>5 Min Watch</span>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="relative overflow-hidden shadow-2xl cursor-pointer aspect-video rounded-3xl group">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
                alt="Video Thumbnail"
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center transition-all bg-black/40 group-hover:bg-black/30">
                <div className="flex items-center justify-center w-16 h-16 transition-transform border rounded-full bg-white/20 backdrop-blur-md border-white/50 group-hover:scale-110">
                  <Play fill="white" className="ml-1 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Winners Grid (Masonry Style) --- */}
      <section className="py-16 ">
        <div className="container px-4 mx-auto md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-neutral">
              Top Performers of the Month
            </h2>
            <p className="mt-2 text-gray-500">
              Will you be on this list next month?
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {winners.map((winner, idx) => (
              <motion.div
                key={winner.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative p-8 transition-all duration-300 border border-gray-100 bg-base-100 rounded-2xl hover:border-blue-200 hover:shadow-xl group"
              >
                <Quote
                  className="absolute text-gray-200 transition-colors top-6 right-6 group-hover:text-blue-100"
                  size={48}
                />

                <div className="relative z-10 flex items-center gap-4 mb-6">
                  <img
                    src={winner.image}
                    alt={winner.name}
                    className="object-cover w-16 h-16 border-2 border-white rounded-full shadow-md"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-neutral">
                      {winner.name}
                    </h3>
                    <p className="text-sm text-blue-600">{winner.role}</p>
                  </div>
                </div>

                <p className="mb-6 italic leading-relaxed text-gray-600">
                  "{winner.quote}"
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-400 uppercase">
                      Won Contest
                    </p>
                    <p className="text-sm font-semibold text-gray-700">
                      {winner.contest}
                    </p>
                  </div>
                  <div className="px-3 py-1 text-sm font-bold rounded-full bg-emerald-100 text-emerald-700">
                    {winner.prize}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="container px-4 py-20 mx-auto">
        <div className="bg-linear-to-r from-[#1D4ED8] to-[#8B5CF6] rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 -mt-10 -mr-10 bg-white rounded-full opacity-10 blur-3xl"></div>

          <h2 className="relative z-10 mb-6 text-3xl font-bold md:text-5xl">
            Start Your Success Story Today
          </h2>
          <p className="relative z-10 max-w-2xl mx-auto mb-8 text-lg text-blue-100">
            Join thousands of creators who are earning, learning, and growing
            with ContestHub.
          </p>

          <button
            onClick={() => navigate("/register")}
            className="bg-white text-[#1D4ED8] px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all relative z-10"
          >
            Join Now & Participate
          </button>
        </div>
      </section>
    </div>
  );
}
