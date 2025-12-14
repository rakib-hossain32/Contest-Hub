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
  ShieldCheck,
  FileText,
} from "lucide-react";
import { useParams } from "react-router";
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
    // console.log(data.url);

    // if (isEnded) return;
    // const confirmPayment = window.confirm(
    //   `Proceed to pay $${contest.price} entry fee?`
    // );
    // if (confirmPayment) {
    //   setIsRegistered(true);
    //   alert("Payment Successful! You are now registered.");
    // }
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
  // console.log(contest._id);
  // console.log(paymentStatus);
  // console.log(user);
  const handleSubmitTask = (e) => {
    e.preventDefault();

    const submittedInfo = {
      submitted: true,
      submissionLink: submissionLink,
      participantName: user?.displayName,
      participantImage: user?.photoURL,
      submittedAt: new Date(),
    };
    // console.log(submittedInfo);

    // console.log(submissionLink);
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
      <div className="relative h-[45vh] lg:h-[50vh] w-full overflow-hidden group">
        <img
          src={contest.image}
          alt="Banner"
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-base-100 via-base-100/60 to-transparent"></div>

        <div className="container absolute bottom-0 z-10 w-full p-6 -translate-x-1/2 left-1/2 md:p-12">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="font-bold tracking-wide uppercase border-none shadow-lg badge badge-primary badge-lg text-primary-content">
                {contest.type}
              </span>
              {isEnded ? (
                <span className="font-bold tracking-wide text-white uppercase shadow-lg badge badge-error badge-lg">
                  Contest Ended
                </span>
              ) : (
                <span className="flex items-center gap-1 font-bold tracking-wide uppercase border-none shadow-lg badge badge-secondary badge-lg text-secondary-content">
                  <Clock size={12} /> Active
                </span>
              )}
            </div>

            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-base-content md:text-5xl lg:text-6xl drop-shadow-sm">
              {contest.name}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-base-content/80 md:text-base">
              <span className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-base-200/50 backdrop-blur-md border-base-300">
                <Users size={18} className="text-primary" />
                {contest.participants || 0} Participants
              </span>
              <span className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-base-200/50 backdrop-blur-md border-base-300">
                <DollarSign size={18} className="text-secondary" />
                Entry Fee: ${contest.price}
              </span>
              <span className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-base-200/50 backdrop-blur-md border-base-300">
                <Calendar size={18} className="text-accent" />
                Deadline: {new Date(contest.deadline).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container relative z-20 px-4 mx-auto -mt-3 lg:-mt-8 max-w-7xl md:px-6 md:-mt-5">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {contest.winner ? (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center gap-4 p-6 border shadow-sm rounded-2xl bg-accent/10 border-accent/20"
              >
                <div className="relative">
                  <img
                    src={
                      contest.winner.photo || "https://via.placeholder.com/150"
                    }
                    alt="Winner"
                    className="object-cover w-16 h-16 border-4 rounded-full shadow-md border-accent"
                  />
                  <div className="absolute p-1 rounded-full text-accent-content bg-accent -bottom-1 -right-1">
                    <Trophy size={12} fill="currentColor" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-base-content">
                    Winner Declared!
                  </h3>
                  <p className="text-base-content/70">
                    Congratulations to{" "}
                    <span className="font-bold text-accent">
                      {contest.winner.name}
                    </span>{" "}
                    for winning this challenge.
                  </p>
                </div>
              </motion.div>
            ) : null}

            <div className="p-8 overflow-hidden border shadow-xl bg-base-100 border-base-200 rounded-3xl">
              <h2 className="flex items-center gap-2 mb-6 text-2xl font-bold text-base-content">
                <span className="w-1 h-8 rounded-full bg-primary"></span>
                Challenge Overview
              </h2>

              <TextRenderer text={contest.description} />

              <div className="flex items-center gap-4 pt-6 mt-8 text-sm border-t text-base-content/60 border-base-200">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base-content">Creator:</span>
                  {contest.creatorName}
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base-content">Created:</span>
                  {new Date(contest.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            {contest.instructions && (
              <div className="p-8 border shadow-xl bg-base-100 border-base-200 rounded-3xl">
                <h2 className="flex items-center gap-2 mb-6 text-2xl font-bold text-base-content">
                  <span className="w-1 h-8 rounded-full bg-secondary"></span>
                  Submission Instructions
                </h2>

                <div className="p-6 border border-secondary/20 bg-secondary/5 rounded-2xl">
                  <TextRenderer text={contest.instructions} />
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="space-y-6 lg:sticky lg:top-24">
              {/* Prize Card - Uses Primary to Secondary linear or Solid Primary */}
              {/* <div className="relative p-8 overflow-hidden text-center shadow-2xl bg-primary text-primary-content rounded-3xl group">
                
                <div className="absolute top-0 right-0 w-40 h-40 transition-all duration-700 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl group-hover:bg-white/20"></div>

                <Trophy
                  size={48}
                  className="mx-auto mb-4 text-accent drop-shadow-lg"
                />
                <p className="mb-1 text-sm font-bold tracking-widest uppercase opacity-80">
                  Grand Prize
                </p>
                <h3 className="mb-2 text-5xl font-black tracking-tight text-accent drop-shadow-md">
                  ${contest.prizeMoney}
                </h3>
              </div> */}
              {/* Prize Card */}

              {/* <div className="relative overflow-hidden bg-linear-to-br from-[#0f172a] to-[#1e293b] rounded-3xl p-8 text-center shadow-2xl text-white group">
                <div className="absolute top-0 right-0 w-40 h-40 transition-all duration-700 translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl group-hover:bg-blue-500/30"></div>

                <Trophy
                  size={48}
                  className="mx-auto mb-4 text-yellow-400 drop-shadow-lg"
                />

                <p className="mb-1 text-sm font-bold tracking-widest text-blue-200 uppercase">
                  Grand Prize
                </p>

                <h3 className="mb-2 text-5xl font-black tracking-tight text-white drop-shadow-md">
                  ${contest.prizeMoney} 
                </h3>
              </div> */}
              <div className="relative w-full overflow-hidden border shadow-2xl rounded-4xl bg-primary shadow-primary/40 group border-white/10">
                <div className="absolute inset-0 pointer-events-none bg-linear-to-br from-white/10 via-transparent to-black/30"></div>

                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-accent/30 transition-all duration-700"></div>

                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 blur-[60px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

                <div className="relative z-10 p-10 text-center text-primary-content">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 transition-opacity duration-500 rounded-full opacity-0 bg-accent/30 blur-2xl group-hover:opacity-100"></div>

                    <Trophy
                      size={56}
                      className="relative z-10 text-accent drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)] transform group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 ease-out"
                      strokeWidth={1.5}
                      fill="currentColor"
                      fillOpacity={0.2}
                    />
                  </div>

                  <p className="mb-3 text-xs font-bold tracking-[0.25em] uppercase text-primary-content/70">
                    Grand Prize Pool
                  </p>

                  <h3 className="text-5xl font-black tracking-tight text-white lg:text-6xl drop-shadow-md">
                    <span className="mr-1 text-4xl align-top text-accent">
                      $
                    </span>
                    {contest.prizeMoney}
                  </h3>

                  <div className="flex items-center justify-center gap-3 mt-6 text-sm font-medium opacity-60">
                    <div className="w-8 h-px bg-current"></div>
                    <span>Winner Takes All</span>
                    <div className="w-8 h-px bg-current"></div>
                  </div>
                </div>

                <div className="absolute inset-0 z-20 transition-transform duration-1000 -translate-x-full pointer-events-none group-hover:translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent"></div>
              </div>

              <div className="p-6 border shadow-xl bg-base-100 border-base-200 rounded-3xl">
                <h4 className="flex items-center gap-2 mb-6 text-sm font-bold tracking-wide uppercase text-base-content/70">
                  <Clock size={16} className="text-error" /> Time Remaining
                </h4>

                <div className="grid grid-cols-4 gap-2 mb-8 text-center">
                  {[
                    { label: "Days", value: timeLeft.days },
                    { label: "Hours", value: timeLeft.hours },
                    { label: "Mins", value: timeLeft.minutes },
                    { label: "Secs", value: timeLeft.seconds },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div
                        className={`w-full py-3 rounded-xl font-mono text-xl md:text-2xl font-bold border-2 ${
                          isEnded
                            ? "bg-base-200 border-base-300 text-base-content/50"
                            : "bg-base-200 border-base-300 text-primary"
                        }`}
                      >
                        {item.value.toString().padStart(2, "0")}
                      </div>
                      <span className="text-[10px] font-bold uppercase text-base-content/50 mt-2 tracking-wider">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  {isEnded ? (
                    <button
                      disabled
                      className="flex items-center justify-center w-full gap-2 py-4 font-bold btn btn-disabled rounded-xl"
                    >
                      <AlertCircle size={20} /> Contest Ended
                    </button>
                  ) : paymentStatus.paymentStatus ? (
                    <button
                      disabled={paymentStatus.submitted}
                      onClick={() => setIsModalOpen(true)}
                      className="flex items-center justify-center w-full gap-2 py-4 text-lg font-bold shadow-lg btn btn-primary shadow-primary/30 rounded-xl disabled:bg-warning/80 disabled:text-neutral/30 disabled:cursor-not-allowed"
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
                      className="flex items-center justify-center w-full gap-2 py-4 text-lg font-bold shadow-lg btn btn-secondary shadow-secondary/30 rounded-xl text-secondary-content disabled:cursor-not-allowed disabled:shadow "
                    >
                      Register Now • ${contest.price}
                    </button>
                  )}

                  <button className="flex items-center justify-center w-full gap-2 py-3 font-semibold transition-colors border border-transparent cursor-pointer text-neutral rounded-xl hover:shadow-2xs">
                    <Share2 size={18} /> Share Challenge
                  </button>
                </div>
              </div>

              <div className="p-6 border border-primary/20 bg-primary/5 rounded-3xl">
                <h4 className="flex items-center gap-2 mb-4 font-bold text-primary">
                  <FileText size={16} /> Quick Info
                </h4>
                <ul className="space-y-3">
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
              className="relative z-10 w-full max-w-lg overflow-hidden border shadow-2xl bg-base-100 rounded-3xl border-base-200"
            >
              <div className="relative p-6 text-center bg-primary text-primary-content">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute p-2 transition rounded-full top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20"
                >
                  <X size={20} />
                </button>
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-base-100/20 backdrop-blur-md">
                  <Upload size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold">Submit Your Project</h3>
                <p className="mt-1 text-sm opacity-90">
                  Show us what you've built!
                </p>
              </div>

              <div className="p-8">
                <form onSubmit={handleSubmitTask}>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-base-content">
                      Project Link
                    </label>
                    <textarea
                      required
                      value={submissionLink}
                      onChange={(e) => setSubmissionLink(e.target.value)}
                      placeholder="Paste your Google Drive, Figma, or GitHub link here..."
                      className="w-full h-32 resize-none textarea textarea-bordered textarea-lg text-base-content bg-base-100 focus:textarea-primary rounded-xl"
                    ></textarea>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-3.5 font-bold text-gray-600 transition-colors hover:bg-neutral hover:text-base-100 rounded-xl border border-gray-200 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all flex justify-center items-center gap-2 cursor-pointer"
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
