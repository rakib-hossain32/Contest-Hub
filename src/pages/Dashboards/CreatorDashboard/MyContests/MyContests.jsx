import { Link, useNavigate } from "react-router";
import {
  PlusCircle,
  Edit,
  Trash2,
  Calendar as CalendarIcon,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Loader } from "../../../../components/Loader/Loader";

// --- Mock Data ---
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

const MyContests = () => {
  // const [contests, setContests] = useState(MOCK_CONTESTS);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: contests = [], isLoading, refetch } = useQuery({
    queryKey: ["my-contests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/contests/creator?email=${user?.email}`
      );
      return res.data;
    },
  });

  // console.log(contests);

  const handleDelete = (id) => {
    Swal.fire({
      text: "Are you sure you want to delete this contest?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(id);
        axiosSecure.delete(`/contests/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch()
            Swal.fire({
              title: "Deleted!",
              text: "Your contest has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Dhaka",
    });
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200">
            Pending
          </span>
        );
      case "Confirmed":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
            Confirmed
          </span>
        );
      case "Rejected":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return <Loader/>
  }

  return (
    <div className="space-y-6 ">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold ">My Contests</h2>
          <p className="text-sm text-slate-500">
            Manage your created challenges.
          </p>
        </div>
        <Link
          to="/dashboard/add-contest"
          className="flex items-center gap-2 px-4 py-2 font-medium text-white transition-all shadow-md bg-primary rounded-xl hover:shadow-lg"
        >
          <PlusCircle className="w-4 h-4" /> Create New
        </Link>
      </div>

      <div className="overflow-hidden border shadow-sm border-secondary/10 rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-700">
            <thead className="text-xs font-semibold uppercase border-b border-secondary/50 text-neutral">
              <tr>
                <th className="px-6 py-4">Contest</th>
                <th className="px-6 py-4">Deadline</th>
                <th className="px-6 py-4">Price / Prize</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Submissions</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary/50">
              {contests.map((contest) => (
                <tr
                  key={contest._id}
                  className="transition-colors hover:bg-secondary/10"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={contest.image}
                        alt=""
                        className="object-cover w-10 h-10 rounded-lg"
                      />
                      <div>
                        <p className="font-semibold text-neutral">
                          {contest.name}
                        </p>
                        <p className="text-xs text-gray-400">{contest.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      {formatDate(contest.deadline)}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">
                    <div className="text-primary">
                      ${contest.price} <span className="text-gray-300">/</span>{" "}
                      <span className="text-[#00b074]">
                        ${contest.prizeMoney}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(contest.status)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link
                      to={`/dashboard/submissions/${contest._id}`}
                      className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      See Submissions
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {contest.status === "Pending" ? (
                        <>
                          <button
                            onClick={() =>
                              navigate(`/dashboard/edit-contest/${contest._id}`)
                            }
                            className="p-2 text-blue-600 transition-colors rounded-lg cursor-pointer hover:bg-blue-50"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(contest._id)}
                            className="p-2 text-red-600 transition-colors rounded-lg cursor-pointer hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <span className="text-xs italic text-gray-400">
                          Locked
                        </span>
                      )}
                    </div>
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
export default MyContests;
