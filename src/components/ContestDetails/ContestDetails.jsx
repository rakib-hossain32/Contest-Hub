import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Users,
  Trophy,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Upload,
  X,
  Calendar,
  Share2,
  FileText,
  ArrowLeft,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../Loader/Loader";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";


const TextRenderer = ({ text }) => {
  if (!text) return null;

  return (
    <div className="space-y-2 leading-relaxed text-base-content/80">
      {text.split("\n").map((line, index) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return <br key={index} />;

        if (trimmedLine.startsWith("•") || trimmedLine.startsWith("-")) {
          return (
            <div key={index} className="flex items-start gap-2 ml-2">
              <span className="mt-2 w-1.5 h-1.5 bg-secondary rounded-full shrink-0"></span>
              <span>{trimmedLine.replace(/^[•-]\s*/, "")}</span>
            </div>
          );
        }
        return <p key={index}>{trimmedLine}</p>;
      })}
    </div>
  );
};

export default function ContestDetails() {
  // const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: contest = {}, isLoading } = useQuery({
    queryKey: ["contest-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data;
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isEnded, setIsEnded] = useState(false);
  const [submissionLink, setSubmissionLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!contest?.deadline) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const deadlineDate = new Date(contest.deadline).getTime();
      const distance = deadlineDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setIsEnded(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [contest]);

  const handleRegister = async () => {
    const paymentInfo = {
      contestId: contest._id,
      contestName: contest.name,
      contestPrice: contest.price,
      contestImage: contest.image,
      contestType: contest.type,
      contestCreatorName: contest.creatorName,
      contestDescription: contest.description,
      contestDeadline: contest.deadline,
      participant: {
        name: user?.displayNam,
        image: user?.photoURL,
        email: user?.email,
      },
    };

    const { data } = await axiosSecure.post(
      "/create-checkout-session",
      paymentInfo
    );
    window.location.href = data.url;
  };

  const { data: paymentStatus = {}, refetch } = useQuery({
    queryKey: ["payment-status", contest?._id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments/payment-status?contestId=${contest._id}&contestParticipantEmail=${user?.email}`
      );
      return res.data;
    },
  });

  const handleSubmitTask = (e) => {
    e.preventDefault();

    const submittedInfo = {
      submitted: true,
      submissionLink: submissionLink,
      participantName: user?.displayName,
      participantImage: user?.photoURL,
      submittedAt: new Date(),
    };

    axiosSecure
      .patch(
        `/payments/${paymentStatus._id}?contestParticipantEmail=${user?.email}`,
        submittedInfo
      )
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Task submitted successfully! Good luck.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((e) => {
        toast.error(e.message);
      });

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(false);
    }, 1500);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen pb-20 font-sans transition-colors duration-300 bg-base-100 text-base-content">

      {/* ═══════════════════════════════════════════════════
          HERO BANNER SECTION
          ═══════════════════════════════════════════════════ */}
      <div className="relative w-full h-[50vh] min-h-80 md:min-h-[380px] lg:h-[55vh] lg:min-h-[420px] overflow-hidden">
        {/* Background Image */}
        <img
          src={contest.image}
          alt={contest.name}
          className="absolute inset-0 object-cover w-full h-full"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0f172a] via-[#0f172a]/70 to-[#0f172a]/30"></div>

        {/* Go Back Button - Properly positioned below navbar */}
        <div className="absolute top-0 left-0 right-0 z-30">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-20 sm:pt-22 md:pt-24">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 border rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border-white/20 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Go Back</span>
              <span className="sm:hidden">Back</span>
            </button>
          </div>
        </div>

        {/* Hero Content - Title, Badges, Meta */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-6 md:pb-10">

            {/* Badges Row */}
            <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
              <span className="px-3 py-1 text-xs font-bold tracking-wide text-white uppercase rounded-full bg-primary/90 backdrop-blur-sm sm:text-sm">
                {contest.type}
              </span>
              {isEnded ? (
                <span className="px-3 py-1 text-xs font-bold tracking-wide text-white uppercase bg-red-500/90 backdrop-blur-sm rounded-full sm:text-sm">
                  Contest Ended
                </span>
              ) : (
                <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold tracking-wide text-white uppercase rounded-full bg-emerald-500/90 backdrop-blur-sm sm:text-sm">
                  <Clock size={12} /> Active
                </span>
              )}
            </div>

            {/* Contest Title */}
            <h1 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl max-w-3xl">
              {contest.name}
            </h1>

            {/* Meta Info Row */}
            <div className="flex flex-wrap items-center gap-3 mt-4 md:gap-4">
              <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white rounded-lg sm:text-sm bg-white/10 backdrop-blur-sm border border-white/10">
                <Users size={14} className="text-blue-300 shrink-0" />
                <span className="hidden sm:inline">{contest.participants || 0} Participants</span>
                <span className="sm:hidden">{contest.participants || 0}</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white rounded-lg sm:text-sm bg-white/10 backdrop-blur-sm border border-white/10">
                <DollarSign size={14} className="text-emerald-300 shrink-0" />
                <span className="hidden sm:inline">Entry Fee:</span> ${contest.price}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white rounded-lg sm:text-sm bg-white/10 backdrop-blur-sm border border-white/10">
                <Calendar size={14} className="text-amber-300 shrink-0" />
                <span className="hidden sm:inline">Deadline:</span> {new Date(contest.deadline).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          MAIN CONTENT AREA
          ═══════════════════════════════════════════════════ */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-6 md:pt-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">

          {/* ─── LEFT COLUMN: Content Cards ─── */}
          <div className="space-y-6 lg:col-span-2 order-2 lg:order-1">

            {/* Winner Card */}
            {contest.winner ? (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center gap-4 p-5 sm:p-6 border shadow-sm rounded-2xl bg-accent/10 border-accent/20"
              >
                <div className="relative shrink-0">
                  <img
                    src={
                      contest.winner.photo || "https://via.placeholder.com/150"
                    }
                    alt="Winner"
                    className="object-cover w-14 h-14 sm:w-16 sm:h-16 border-4 rounded-full shadow-md border-accent"
                  />
                  <div className="absolute p-1 rounded-full text-accent-content bg-accent -bottom-1 -right-1">
                    <Trophy size={12} fill="currentColor" />
                  </div>
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-base-content">
                    Winner Declared!
                  </h3>
                  <p className="text-sm sm:text-base text-base-content/70">
                    Congratulations to{" "}
                    <span className="font-bold text-accent">
                      {contest.winner.name}
                    </span>{" "}
                    for winning this challenge.
                  </p>
                </div>
              </motion.div>
            ) : null}

            {/* Challenge Overview */}
            <div className="p-5 sm:p-6 md:p-8 overflow-hidden border shadow-xl bg-base-100 border-base-200 rounded-2xl md:rounded-3xl">
              <h2 className="flex items-center gap-2 mb-4 sm:mb-6 text-xl sm:text-2xl font-bold text-base-content">
                <span className="w-1 h-6 sm:h-8 rounded-full bg-primary"></span>
                Challenge Overview
              </h2>

              <TextRenderer text={contest.description} />

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-4 sm:pt-6 mt-6 sm:mt-8 text-sm border-t text-base-content/60 border-base-200">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base-content">Creator:</span>
                  {contest.creatorName}
                </div>
                <span className="hidden sm:inline">•</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base-content">Created:</span>
                  {new Date(contest.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Submission Instructions */}
            {contest.instructions && (
              <div className="p-5 sm:p-6 md:p-8 border shadow-xl bg-base-100 border-base-200 rounded-2xl md:rounded-3xl">
                <h2 className="flex items-center gap-2 mb-4 sm:mb-6 text-xl sm:text-2xl font-bold text-base-content">
                  <span className="w-1 h-6 sm:h-8 rounded-full bg-secondary"></span>
                  Submission Instructions
                </h2>

                <div className="p-4 sm:p-6 border border-secondary/20 bg-secondary/5 rounded-xl sm:rounded-2xl">
                  <TextRenderer text={contest.instructions} />
                </div>
              </div>
            )}


          </div>

          {/* ─── RIGHT COLUMN: Sidebar ─── */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="space-y-5 sm:space-y-6 lg:sticky lg:top-24">

              {/* Prize Card */}
              <div className="relative w-full overflow-hidden border shadow-2xl rounded-2xl md:rounded-4xl bg-primary shadow-primary/40 group border-white/10">
                <div className="absolute inset-0 pointer-events-none bg-linear-to-br from-white/10 via-transparent to-black/30"></div>

                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-accent/30 transition-all duration-700"></div>

                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 blur-[60px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

                <div className="relative z-10 p-6 sm:p-8 md:p-10 text-center text-primary-content">
                  <div className="relative inline-block mb-4 sm:mb-6">
                    <div className="absolute inset-0 transition-opacity duration-500 rounded-full opacity-0 bg-accent/30 blur-2xl group-hover:opacity-100"></div>

                    <Trophy
                      size={48}
                      className="relative z-10 text-accent drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)] transform group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 ease-out sm:w-14 sm:h-14"
                      strokeWidth={1.5}
                      fill="currentColor"
                      fillOpacity={0.2}
                    />
                  </div>

                  <p className="mb-2 sm:mb-3 text-xs font-bold tracking-[0.25em] uppercase text-primary-content/70">
                    Grand Prize Pool
                  </p>

                  <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-white drop-shadow-md">
                    <span className="mr-1 text-3xl sm:text-4xl align-top text-accent">
                      $
                    </span>
                    {contest.prizeMoney}
                  </h3>

                  <div className="flex items-center justify-center gap-3 mt-4 sm:mt-6 text-sm font-medium opacity-60">
                    <div className="w-8 h-px bg-current"></div>
                    <span>Winner Takes All</span>
                    <div className="w-8 h-px bg-current"></div>
                  </div>
                </div>

                <div className="absolute inset-0 z-20 transition-transform duration-1000 -translate-x-full pointer-events-none group-hover:translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent"></div>
              </div>

              {/* Timer & Actions */}
              <div className="p-5 sm:p-6 border shadow-xl bg-base-100 border-base-200 rounded-2xl md:rounded-3xl">
                <h4 className="flex items-center gap-2 mb-4 sm:mb-6 text-sm font-bold tracking-wide uppercase text-base-content/70">
                  <Clock size={16} className="text-error" /> Time Remaining
                </h4>

                <div className="grid grid-cols-4 gap-2 mb-6 sm:mb-8 text-center">
                  {[
                    { label: "Days", value: timeLeft.days },
                    { label: "Hours", value: timeLeft.hours },
                    { label: "Mins", value: timeLeft.minutes },
                    { label: "Secs", value: timeLeft.seconds },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div
                        className={`w-full py-2.5 sm:py-3 rounded-xl font-mono text-lg sm:text-xl md:text-2xl font-bold border-2 ${isEnded
                          ? "bg-base-200 border-base-300 text-base-content/50"
                          : "bg-base-200 border-base-300 text-primary"
                          }`}
                      >
                        {item.value.toString().padStart(2, "0")}
                      </div>
                      <span className="text-[10px] font-bold uppercase text-base-content/50 mt-1.5 sm:mt-2 tracking-wider">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {isEnded ? (
                    <button
                      disabled
                      className="flex items-center justify-center w-full gap-2 py-3 sm:py-4 font-bold btn btn-disabled rounded-xl"
                    >
                      <AlertCircle size={20} /> Contest Ended
                    </button>
                  ) : paymentStatus.paymentStatus ? (
                    <button
                      disabled={paymentStatus.submitted}
                      onClick={() => setIsModalOpen(true)}
                      className="flex items-center justify-center w-full gap-2 py-3 sm:py-4 text-base sm:text-lg font-bold shadow-lg btn btn-primary shadow-primary/30 rounded-xl disabled:bg-warning/80 disabled:text-neutral/30 disabled:cursor-not-allowed"
                    >
                      <Upload size={20} />{" "}
                      {paymentStatus.submitted
                        ? "Already Submitted"
                        : "Submit Work"}
                    </button>
                  ) : (
                    <button
                      disabled={contest.winner}
                      onClick={handleRegister}
                      className="flex items-center justify-center w-full gap-2 py-3 sm:py-4 text-base sm:text-lg font-bold shadow-lg btn btn-secondary shadow-secondary/30 rounded-xl text-secondary-content disabled:cursor-not-allowed disabled:shadow "
                    >
                      Register Now • ${contest.price}
                    </button>
                  )}

                  <button className="flex items-center justify-center w-full gap-2 py-2.5 sm:py-3 font-semibold transition-colors border border-transparent cursor-pointer text-neutral rounded-xl hover:shadow-2xs">
                    <Share2 size={18} /> Share Challenge
                  </button>
                </div>
              </div>

              {/* Quick Info */}
              <div className="p-5 sm:p-6 border border-primary/20 bg-primary/5 rounded-2xl md:rounded-3xl">
                <h4 className="flex items-center gap-2 mb-3 sm:mb-4 font-bold text-primary">
                  <FileText size={16} /> Quick Info
                </h4>
                <ul className="space-y-2.5 sm:space-y-3">
                  <li className="flex items-center gap-3 text-sm text-base-content/80">
                    <CheckCircle size={16} className="text-primary shrink-0" />
                    Type:{" "}
                    <span className="font-semibold text-base-content">
                      {contest.type}
                    </span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-base-content/80">
                    <CheckCircle size={16} className="text-primary shrink-0" />
                    Status:{" "}
                    <span className="font-semibold text-white badge badge-sm badge-success">
                      {contest.status}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          SUBMISSION MODAL
          ═══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-base-300/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative z-10 w-full max-w-lg overflow-hidden border shadow-2xl bg-base-100 rounded-2xl sm:rounded-3xl border-base-200"
            >
              <div className="relative p-5 sm:p-6 text-center bg-primary text-primary-content">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute p-2 transition rounded-full top-3 right-3 sm:top-4 sm:right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20"
                >
                  <X size={20} />
                </button>
                <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-base-100/20 backdrop-blur-md">
                  <Upload size={28} className="text-white sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Submit Your Project</h3>
                <p className="mt-1 text-sm opacity-90">
                  Show us what you've built!
                </p>
              </div>

              <div className="p-5 sm:p-6 md:p-8">
                <form onSubmit={handleSubmitTask}>
                  <div className="mb-5 sm:mb-6">
                    <label className="block mb-2 text-sm font-bold text-base-content">
                      Project Link
                    </label>
                    <textarea
                      required
                      value={submissionLink}
                      onChange={(e) => setSubmissionLink(e.target.value)}
                      placeholder="Paste your Google Drive, Figma, or GitHub link here..."
                      className="w-full h-28 sm:h-32 resize-none textarea textarea-bordered textarea-lg text-base-content bg-base-100 focus:textarea-primary rounded-xl"
                    ></textarea>
                  </div>

                  <div className="flex gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-3 sm:py-3.5 font-bold text-gray-600 transition-colors hover:bg-neutral hover:text-base-100 rounded-xl border border-gray-200 cursor-pointer text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3 sm:py-3.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all flex justify-center items-center gap-2 cursor-pointer text-sm sm:text-base"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span>
                          Submitting...
                        </>
                      ) : (
                        <>Submit Now</>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
