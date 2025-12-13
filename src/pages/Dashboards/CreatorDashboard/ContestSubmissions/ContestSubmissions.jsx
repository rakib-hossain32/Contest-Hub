import { useNavigate, useParams } from "react-router";
import {
  Trophy,
  ExternalLink,
  Mail,
  Calendar,
  Clock,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ContestSubmissions = () => {
  const navigate = useNavigate();
  const { contestId } = useParams();

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch Submitted Entries
  const { data: submittedContests = [] } = useQuery({
    queryKey: ["submissions-contests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments/task-submitted?contestId=${contestId}`
      );
      return res.data;
    },
  });

  // Fetch Contest Winner (THIS IS NEW)
  const { data: contestData = {}, refetch } = useQuery({
    queryKey: ["contest", contestId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${contestId}`);
      return res.data;
    },
  });

  // console.log(contestData);

  // Declare Winner Handler
  const handleDeclareWinner = (submission) => {
    const winner = {
      photo: submission.participantImage,
      name: submission.participantName,
      email: submission.contestParticipantEmail,
      winningDate: new Date(),
    };
    // console.log(submission);

    Swal.fire({
      title: "Are you sure?",
      text: `Confirm ${submission.participantName} as the winner?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/contests/${submission.contestId}/creator`, winner)
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              axiosSecure.patch(
                `/users/win-count/${submission.contestParticipantEmail}`
              );
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Winner has been declared!",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };

  return (
    <div className="min-h-screen pb-20 font-sans bg-base-100 text-base-content selection:bg-primary selection:text-white">
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-secondary/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4"></div>
      </div>

      <div className="relative max-w-6xl px-5 pt-8 mx-auto">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 mb-10 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="border btn btn-circle btn-ghost border-base-300 hover:bg-base-200"
            >
              ←
            </button>
            <div>
              <h1 className="text-2xl font-extrabold md:text-3xl text-base-content">
                Submissions
              </h1>
              <p className="mt-1 text-sm text-base-content/60">
                Manage entries for{" "}
                <span className="font-semibold text-primary">
                  Contest #{contestId}
                </span>
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 px-3 py-2 border shadow-sm rounded-2xl bg-base-100/80 border-base-200 backdrop-blur">
            <div className="px-3 py-2 text-center rounded-xl bg-base-200/50">
              <span className="text-xs font-bold uppercase text-base-content/50">
                Entries
              </span>
              <p className="text-lg font-black text-primary">
                {submittedContests.length}
              </p>
            </div>

            <div
              className={`px-3 py-2 rounded-xl border ${
                contestData?.winner
                  ? "bg-accent/10 border-accent/20"
                  : "bg-base-200/50 border-transparent"
              }`}
            >
              <span className="text-xs font-bold uppercase text-base-content/50">
                Status
              </span>
              <p
                className={`text-lg font-black ${
                  contestData?.winner ? "text-accent" : "text-base-content/70"
                }`}
              >
                {contestData?.winner ? "Closed" : "Active"}
              </p>
            </div>
          </div>
        </div>

        {/* No Submission */}
        {submittedContests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 border border-dashed bg-base-200/30 border-base-300 rounded-4xl">
            <FileText className="w-12 h-12 text-base-content/30" />
            <h3 className="mt-3 text-xl font-bold text-base-content/70">
              No submissions yet
            </h3>
            <p className="max-w-xs mt-2 text-center text-base-content/40">
              Wait for participants to submit their work. Check back later.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            <AnimatePresence>
              {submittedContests.map((sub, i) => {
                const isWinner =
                  contestData?.winner?.name === sub.participantName &&
                  contestData?.winner?.photo === sub.participantImage;

                const isLoser = contestData?.winner && !isWinner;

                return (
                  <motion.div
                    key={sub._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: isLoser ? 0.5 : 1,
                      y: 0,
                      scale: isWinner ? 1.03 : 1,
                    }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className={`relative group p-1 rounded-4xl ${
                      isWinner
                        ? "bg-linear-to-r from-accent via-yellow-400 to-accent shadow-xl"
                        : "bg-transparent hover:bg-base-200/50"
                    }`}
                  >
                    {/* Card */}
                    <div
                      className={`bg-base-100 rounded-[1.8rem] p-5 border flex flex-col gap-6 md:gap-8 transition  ${
                        isWinner
                          ? "border-transparent"
                          : "border-base-200 hover:border-primary/20 hover:shadow"
                      }`}
                    >
                      <div className="grid items-center grid-cols-1 gap-3 md:grid-cols-3 md:gap-5">
                        {/* Profile */}
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              className={`w-16 h-16 rounded-2xl object-cover ${
                                isWinner
                                  ? "ring-4 ring-accent ring-offset-2"
                                  : ""
                              }`}
                              src={sub.participantImage}
                            />
                            {isWinner && (
                              <div className="absolute -top-2 -right-2 bg-accent text-white p-1.5 rounded-full">
                                <Trophy size={14} />
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold group-hover:text-primary">
                              {sub.participantName}
                            </h3>
                            <p className="flex items-center gap-2 text-sm truncate text-base-content/50 max-w-40">
                              <Mail size={12} /> {sub.contestParticipantEmail}
                            </p>
                          </div>
                        </div>

                        {/* Project Link + Date */}
                        <a
                          href={sub.submissionLink}
                          target="_blank"
                          className="block"
                        >
                          <div className="p-4 transition border rounded-xl bg-base-200/40 hover:bg-primary/5 hover:border-primary/40">
                            <p className="mb-1 text-xs font-bold uppercase text-base-content/50">
                              Project Link
                            </p>
                            <p className="font-semibold truncate">
                              {sub.submissionLink}
                            </p>

                            <div className="flex items-center gap-3 mt-3 text-xs text-base-content/60">
                              <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {new Date(sub.submittedAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </span>

                              <span className="flex items-center gap-1">
                                <Clock size={12} />
                                {new Date(sub.submittedAt).toLocaleTimeString(
                                  "en-US",
                                  { hour: "2-digit", minute: "2-digit" }
                                )}
                              </span>
                            </div>
                          </div>
                        </a>

                        {/* Action */}
                        <div className="flex justify-start md:justify-end">
                          {isWinner ? (
                            <div className="text-center">
                              <p className="flex items-center gap-2 text-xl font-black text-accent">
                                <Trophy size={20} /> Winner
                              </p>
                              <p className="text-[10px] text-base-content/40">
                                Confirmed
                              </p>
                            </div>
                          ) : contestData?.winner ? (
                            <div className="flex items-center gap-2 px-4 py-3 text-sm font-bold border rounded-xl bg-base-200/20 text-base-content/30">
                              <ShieldCheck size={16} /> Passed
                            </div>
                          ) : (
                            <button
                              onClick={() => handleDeclareWinner(sub)}
                              className="w-full px-6 font-bold shadow-lg btn btn-primary md:w-auto rounded-xl"
                            >
                              <Trophy size={18} /> Declare Winner
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestSubmissions;
