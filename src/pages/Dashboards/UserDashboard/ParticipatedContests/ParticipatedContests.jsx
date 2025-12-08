import { useState } from "react";
import {
  Calendar,
  CheckCircle,
  Clock,
  Trophy,
  Award,
  MapPin,
  Edit3,
  Camera,
  TrendingUp,
} from "lucide-react";

export const ParticipatedContests = () => {
  // Mock Data
  const [contests] = useState([
    {
      id: 1,
      name: "Logo Design Championship",
      deadline: "2023-12-25",
      fee: 50,
      status: "Paid",
      paymentId: "TXN12345",
    },
    {
      id: 2,
      name: "UI/UX Hackathon 2024",
      deadline: "2023-11-10",
      fee: 100,
      status: "Paid",
      paymentId: "TXN67890",
    },
    {
      id: 3,
      name: "Code Warriors V2",
      deadline: "2024-01-15",
      fee: 25,
      status: "Paid",
      paymentId: "TXN54321",
    },
  ]);

  // Sort by Upcoming Deadline
  const sortedContests = [...contests].sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
  );

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex items-center gap-4 p-6 border shadow-sm border-secondary/30 rounded-xl">
          <div className="p-3 text-blue-600 rounded-lg bg-blue-50">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm ">Total Participated</p>
            <h3 className="text-xl font-bold">12</h3>
          </div>
        </div>
        <div className="flex items-center gap-4 p-6 border shadow-sm border-secondary/30 rounded-xl">
          <div className="p-3 text-green-600 rounded-lg bg-green-50">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm ">Active Contests</p>
            <h3 className="text-xl font-bold">3</h3>
          </div>
        </div>
      </div>

      {/* List Table */}
      <div className="overflow-hidden border shadow-sm border-secondary/30 rounded-xl">
        <div className="p-6 border-b border-secondary/30">
          <h3 className="font-bold ">Participation History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-700">
            <thead className="text-xs font-semibold uppercase text-neutral">
              <tr>
                <th className="px-6 py-4">Contest Name</th>
                <th className="px-6 py-4">Deadline</th>
                <th className="px-6 py-4">Fee Paid</th>
                <th className="px-6 py-4">Payment Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary/15">
              {sortedContests.map((contest) => (
                <tr
                  key={contest.id}
                  className="transition-colors hover:bg-secondary/10"
                >
                  <td className="px-6 py-4 font-medium text-neutral">
                    {contest.name}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-neutral">
                      <Clock className="w-4 h-4 text-orange-400" />
                      {new Date(contest.deadline).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral">${contest.fee}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                      <CheckCircle className="w-3 h-3" /> {contest.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-xs border border-secondary/30 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all cursor-pointer">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
