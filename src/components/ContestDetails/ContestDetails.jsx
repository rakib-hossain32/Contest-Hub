import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, Users, Trophy, DollarSign, CheckCircle, 
  AlertCircle, Upload, X, ShieldCheck, Calendar 
} from "lucide-react";
import { useNavigate, useParams } from "react-router";

// --- Mock Data (Simulating API Response) ---
const mockContestData = {
  id: 1,
  name: "Modern UI/UX Design Championship",
  banner: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
  description: `
    <h3>Challenge Overview</h3>
    <p>We are looking for a futuristic dashboard design for a Fintech SaaS application. The design must be clean, responsive, and accessible.</p>
    <br/>
    <h3>What you need to deliver:</h3>
    <ul>
      <li>High-fidelity mockup (Figma/XD/Sketch link)</li>
      <li>A short document explaining your UX decisions</li>
      <li>Mobile responsive view</li>
    </ul>
    <br/>
    <h3>Evaluation Criteria:</h3>
    <p>Creativity, Usability, Color Theory, and Typography.</p>
  `,
  participants: 142,
  prize: "$5,000",
  entryFee: "$25",
  deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  // deadline: new Date(Date.now() - 1000), // Uncomment to test "Ended" state
  winner: null, 
  // winner: { name: "Sarah Jenkins", photo: "https://i.pravatar.cc/150?img=32" } // Uncomment to test Winner View
};

export default function ContestDetails() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL
  
  // --- States ---
  const [contest, setContest] = useState(mockContestData);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Toggle to false to test auth guard
  const [isRegistered, setIsRegistered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [isEnded, setIsEnded] = useState(false);
  const [submissionLink, setSubmissionLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Countdown Logic ---
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = contest.deadline - now;

      if (distance < 0) {
        clearInterval(timer);
        setIsEnded(true);
        setTimeLeft("Contest Ended");
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [contest.deadline]);

  // --- Handlers ---
  const handleRegister = () => {
    if (isEnded) return;
    // In a real app, navigate to payment page: navigate('/payment', { state: { contestId: contest.id } });
    // Simulating successful payment here:
    const confirmPayment = window.confirm(`Proceed to pay ${contest.entryFee} entry fee?`);
    if (confirmPayment) {
      setIsRegistered(true);
      setContest((prev) => ({ ...prev, participants: prev.participants + 1 }));
      alert("Payment Successful! You are now registered.");
    }
  };

  const handleSubmitTask = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(false);
      alert("Task submitted successfully! Good luck.");
    }, 1500);
  };

  // --- Auth Guard View ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] text-center p-6">
        <div className="max-w-md p-8 bg-white shadow-xl rounded-2xl">
          <ShieldCheck size={64} className="mx-auto text-[#1D4ED8] mb-4" />
          <h2 className="text-2xl font-bold text-[#111827] mb-2">Access Restricted</h2>
          <p className="mb-6 text-gray-500">You must be logged in to view contest details and participate.</p>
          <button 
            onClick={() => setIsLoggedIn(true)} // Or navigate('/login')
            className="w-full py-3 bg-[#1D4ED8] text-white rounded-xl font-bold hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20">
      
      {/* --- 1. Hero Banner --- */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <img src={contest.banner} alt="Banner" className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/60 to-transparent"></div>
        
        <div className="container absolute bottom-0 left-0 w-full p-6 mx-auto md:p-12">
          {/* Winner Badge (Conditional) */}
          {contest.winner && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              className="inline-flex items-center gap-3 p-2 pr-6 mb-4 border rounded-full bg-yellow-500/20 backdrop-blur-md border-yellow-500/50"
            >
              <img src={contest.winner.photo} alt="Winner" className="w-10 h-10 border-2 border-yellow-400 rounded-full" />
              <div>
                <p className="text-xs font-bold tracking-wider text-yellow-400 uppercase">Winner Declared</p>
                <p className="font-semibold text-white">{contest.winner.name}</p>
              </div>
              <Trophy className="ml-auto text-yellow-400" size={24} />
            </motion.div>
          )}

          <h1 className="mb-2 text-3xl font-bold text-white md:text-5xl">{contest.name}</h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 md:text-base">
            <span className="flex items-center gap-2"><Users size={18} className="text-[#8B5CF6]" /> {contest.participants} Participants</span>
            <span className="flex items-center gap-2"><DollarSign size={18} className="text-[#10B981]" /> Entry Fee: {contest.entryFee}</span>
          </div>
        </div>
      </div>

      {/* --- 2. Main Layout --- */}
      <div className="container grid grid-cols-1 gap-8 px-4 py-8 mx-auto md:px-6 lg:grid-cols-3">
        
        {/* Left Column: Details (2/3 width) */}
        <div className="space-y-8 lg:col-span-2">
          
          {/* Tabs / Description */}
          <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl md:p-8">
            <h2 className="text-2xl font-bold text-[#111827] mb-6 border-b pb-4 border-gray-100">Contest Details</h2>
            
            {/* HTML Content Render */}
            <div 
              className="leading-relaxed prose text-gray-600 prose-blue max-w-none"
              dangerouslySetInnerHTML={{ __html: contest.description }}
            />
          </div>
        </div>

        {/* Right Column: Stats & Actions (1/3 width) */}
        <div className="space-y-6 lg:col-span-1">
          
          {/* Prize Card */}
          <div className="bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl p-6 text-white shadow-lg text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 bg-white rounded-full opacity-10 blur-2xl"></div>
            <Trophy size={48} className="mx-auto mb-2 text-white/90" />
            <p className="text-sm font-medium tracking-wider uppercase text-white/80">Grand Prize</p>
            <h3 className="mt-1 text-4xl font-extrabold">{contest.prize}</h3>
          </div>

          {/* Status & Timer Card */}
          <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
            <h4 className="flex items-center gap-2 mb-4 font-medium text-gray-500">
              <Clock size={18} /> Time Remaining
            </h4>
            
            <div className={`text-center py-4 rounded-xl font-mono text-2xl md:text-3xl font-bold ${isEnded ? 'bg-gray-100 text-gray-500' : 'bg-red-50 text-red-600'}`}>
              {timeLeft}
            </div>

            <div className="mt-6 space-y-3">
              {/* Logic for Buttons */}
              {isEnded ? (
                <button disabled className="w-full py-3.5 bg-gray-200 text-gray-500 font-bold rounded-xl cursor-not-allowed flex items-center justify-center gap-2">
                  <AlertCircle size={20} /> Contest Ended
                </button>
              ) : isRegistered ? (
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-3.5 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <Upload size={20} /> Submit Task
                </button>
              ) : (
                <button 
                  onClick={handleRegister}
                  className="w-full py-3.5 bg-[#10B981] hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
                >
                  Register & Pay {contest.entryFee}
                </button>
              )}

              {/* Status Hint */}
              <div className="mt-2 text-xs text-center text-gray-400">
                {isRegistered 
                  ? "You are registered. Good luck!" 
                  : isEnded 
                    ? "Registration is closed." 
                    : "Secure payment via Stripe/SSL"}
              </div>
            </div>
          </div>

          {/* Rules / Extra Info */}
          <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
            <h4 className="font-bold text-[#111827] mb-4">Quick Rules</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-2"><CheckCircle size={16} className="text-[#10B981] flex-shrink-0" /> Original work only.</li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-[#10B981] flex-shrink-0" /> Submit before deadline.</li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-[#10B981] flex-shrink-0" /> Follow the design brief.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* --- 3. Submission Modal --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative z-10 w-full max-w-lg p-6 bg-white shadow-2xl rounded-2xl md:p-8"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute p-2 text-gray-400 transition rounded-full top-4 right-4 hover:text-gray-600 hover:bg-gray-100"
              >
                <X size={20} />
              </button>

              <div className="mb-6 text-center">
                <div className="w-14 h-14 bg-blue-100 text-[#1D4ED8] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Upload size={28} />
                </div>
                <h3 className="text-2xl font-bold text-[#111827]">Submit Your Work</h3>
                <p className="text-sm text-gray-500">Paste your project links (Google Drive, Figma, GitHub, etc.) below.</p>
              </div>

              <form onSubmit={handleSubmitTask}>
                <textarea
                  required
                  value={submissionLink}
                  onChange={(e) => setSubmissionLink(e.target.value)}
                  placeholder="Example: https://figma.com/file/xyz..."
                  className="w-full h-32 p-4 rounded-xl border border-gray-200 focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 outline-none resize-none text-gray-700 bg-gray-50 mb-6"
                ></textarea>

                <div className="flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 font-medium text-gray-600 transition hover:bg-gray-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex-1 py-3 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition flex justify-center items-center"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 rounded-full border-white/30 border-t-white animate-spin"></span>
                    ) : (
                      "Submit Now"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}