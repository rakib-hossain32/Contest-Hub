import { CheckCircle, XCircle, Trash2, AlertCircle } from "lucide-react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import { Loader } from "../../../../components/Loader/Loader";

// --- Mock Data ---

const INITIAL_CONTESTS = [
  {
    id: 101,
    title: "Summer Photography",
    creator: "Alice Creator",
    fee: 50,
    prize: 500,
    status: "pending",
  },
  {
    id: 102,
    title: "Tech Logo Design",
    creator: "Creative Studio",
    fee: 100,
    prize: 1000,
    status: "confirmed",
  },
  {
    id: 103,
    title: "Short Story Writing",
    creator: "Book Worms",
    fee: 20,
    prize: 150,
    status: "pending",
  },
  {
    id: 104,
    title: "Spam Contest 101",
    creator: "Unknown",
    fee: 0,
    prize: 0,
    status: "rejected",
  },
];

const ManageContests = () => {
  // const [contests, setContests] = useState(INITIAL_CONTESTS);

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: contests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-contests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests");
      return res.data;
    },
  });

  // console.log(data)

  const handleStatusChange = (id, newStatus) => {
    // console.log(id, newStatus);
    const status = { newStatus };

    axiosSecure.patch(`/contests/${id}/admin`, status).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Contest has been ${newStatus}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
    // setContests(
    //   contests.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    // );
  };

  const handleDelete = (id) => {
    Swal.fire({
      text: "Are you sure you want to delete this contest permanently?",
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
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your contest has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });

    {
      // setContests(contests.filter((c) => c.id !== id));
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200">
            <AlertCircle className="w-3 h-3" /> Pending
          </span>
        );
      case "Confirmed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
            <CheckCircle className="w-3 h-3" /> Active
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
            <XCircle className="w-3 h-3" /> Rejected
          </span>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6 ">
      <div>
        <h2 className="text-2xl font-bold text-neutral">Manage Contests</h2>
        <p className="text-sm text-slate-500">
          Review, approve, or remove contests submitted by creators.
        </p>
      </div>

      <div className="overflow-hidden border shadow-sm border-secondary/30 bg-base-100 rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-neutral">
            <thead className="text-xs font-semibold uppercase border-b bg-base-100 text-neutral border-secondary">
              <tr>
                <th className="px-6 py-4">Contest Title</th>
                <th className="px-6 py-4">Creator</th>
                <th className="px-6 py-4">Fee / Prize</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary/50">
              {contests.map((contest) => (
                <tr
                  key={contest._id}
                  className="transition-colors hover:bg-secondary/10"
                >
                  <td className="px-6 py-4 font-medium text-neutral">
                    {contest.name}
                    <div className="text-xs font-normal text-gray-400">
                      ID: #{contest._id}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral">
                    {contest.creatorName}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs">
                      <span className="text-neutral/80">Fee:</span> $
                      {contest.price} <br />
                      <span className="font-bold text-green-600">
                        Prize: ${contest.prizeMoney}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(contest.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Approve Button */}
                      {contest.status !== "Confirmed" && (
                        <button
                          onClick={() =>
                            handleStatusChange(contest._id, "Confirmed")
                          }
                          className="p-2 text-green-500 transition-colors rounded-lg cursor-pointer bg-green-800/30 hover:bg-green-800/20"
                          title="Confirm / Approve"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}

                      {/* Reject Button */}
                      {contest.status !== "Rejected" && (
                        <button
                          onClick={() =>
                            handleStatusChange(contest._id, "Rejected")
                          }
                          className="p-2 text-orange-600 transition-colors rounded-lg cursor-pointer bg-orange-500/30 hover:bg-orange-500/20"
                          title="Reject"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(contest._id)}
                        className="p-2 ml-2 text-red-600 transition-colors rounded-lg cursor-pointer bg-red-500/30 hover:bg-red-500/20"
                        title="Delete Permanently"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {contests.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-400">
                    No contests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageContests;
