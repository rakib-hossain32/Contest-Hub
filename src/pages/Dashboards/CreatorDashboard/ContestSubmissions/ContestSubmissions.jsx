import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Trophy,
  Eye,
  CheckCircle,
  XCircle,
  ChevronLeft,
  FileText,
} from "lucide-react";

const MOCK_CONTESTS = [
  {
    id: 1,
    name: "Minimalist Logo Design",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799314348d?auto=format&fit=crop&w=100&q=80",
    description: "Create a clean, modern logo for a tech startup.",
    price: 50,
    prizeMoney: 300,
    instructions: "Use blue and white colors. Keep it simple.",
    type: "Design",
    deadline: "2024-12-30", // Changed to string for simpler handling with HTML input
    status: "pending", // pending, confirmed, rejected
  },
  {
    id: 2,
    name: "Summer Photography",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=100&q=80",
    description: "Capture the essence of summer.",
    price: 20,
    prizeMoney: 150,
    instructions: "High resolution only. No heavy filters.",
    type: "Photography",
    deadline: "2023-11-01",
    status: "confirmed",
  },
];

const MOCK_SUBMISSIONS = [
  {
    id: 101,
    contestId: 2,
    participantName: "Alice Smith",
    email: "alice@example.com",
    taskInfo: "https://drive.google.com/file/d/photo1.jpg",
    notes: "Here is my submission, hope you like the lighting!",
  },
  {
    id: 102,
    contestId: 2,
    participantName: "Bob Jones",
    email: "bob@example.com",
    taskInfo: "https://portfolio.com/summer-vibe",
    notes: "Taken at Malibu beach.",
  },
  {
    id: 103,
    contestId: 2,
    participantName: "Charlie Day",
    email: "charlie@example.com",
    taskInfo: "https://dropbox.com/submission.png",
    notes: "Golden hour shot.",
  },
];

const ContestSubmissions = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [winner, setWinner] = useState(null);

  // In a real app, fetch submissions by contestId
  const submissions = MOCK_SUBMISSIONS;
  const contestName =
    MOCK_CONTESTS.find((c) => c.id === parseInt(contestId))?.name || "Contest";

  const handleDeclareWinner = (submissionId) => {
    if (
      window.confirm(
        "Declare this participant as the winner? This action cannot be undone."
      )
    ) {
      setWinner(submissionId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 text-slate-500"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Submissions</h2>
          <p className="text-sm text-slate-500">
            Viewing entries for:{" "}
            <span className="font-semibold text-[#00b074]">{contestName}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {submissions.map((sub) => {
          const isWinner = winner === sub.id;
          const isLoser = winner !== null && !isWinner;

          return (
            <div
              key={sub.id}
              className={`bg-white p-6 rounded-xl shadow-sm border ${
                isWinner
                  ? "border-[#00b074] ring-1 ring-[#00b074] bg-green-50/30"
                  : "border-gray-100"
              } transition-all flex flex-col md:flex-row gap-6 ${
                isLoser ? "opacity-50 grayscale" : ""
              }`}
            >
              {/* Preview Area */}
              <div className="flex items-center justify-center w-full h-32 text-gray-400 bg-gray-100 rounded-lg md:w-48 shrink-0">
                <FileText className="w-8 h-8" />
                <span className="ml-2 text-xs">Preview</span>
              </div>

              {/* Info Area */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      {sub.participantName}
                    </h3>
                    <p className="mb-2 text-sm text-slate-500">{sub.email}</p>
                  </div>
                  {isWinner && (
                    <div className="flex items-center gap-1 text-[#00b074] font-bold bg-green-100 px-3 py-1 rounded-full text-xs">
                      <Trophy className="w-3 h-3" /> Winner
                    </div>
                  )}
                </div>
                <div className="p-3 mt-2 mb-4 text-sm rounded-lg bg-slate-50 text-slate-600">
                  <span className="font-semibold text-slate-700">
                    Creator Note:
                  </span>{" "}
                  {sub.notes}
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={sub.taskInfo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
                  >
                    <Eye className="w-3 h-3" /> View Full Task
                  </a>
                </div>
              </div>

              {/* Action Area */}
              <div className="flex items-center justify-center md:border-l md:border-gray-100 md:pl-6">
                {!winner ? (
                  <button
                    onClick={() => handleDeclareWinner(sub.id)}
                    className="px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg shadow-lg bg-slate-800 hover:bg-slate-900 shadow-slate-200"
                  >
                    Declare Winner
                  </button>
                ) : isWinner ? (
                  <div className="text-center">
                    <CheckCircle className="w-8 h-8 text-[#00b074] mx-auto mb-1" />
                    <p className="text-xs font-bold text-[#00b074]">Selected</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <XCircle className="w-8 h-8 mx-auto mb-1 text-gray-300" />
                    <p className="text-xs font-bold text-gray-400">
                      Not Selected
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ContestSubmissions;
