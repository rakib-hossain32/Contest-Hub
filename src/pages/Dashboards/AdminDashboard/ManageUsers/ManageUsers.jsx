import { UserCog } from "lucide-react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

// // --- Mock Data ---

// const INITIAL_USERS = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john@example.com",
//     role: "user",
//     status: "Active",
//   },
//   {
//     id: 2,
//     name: "Alice Creator",
//     email: "alice@example.com",
//     role: "creator",
//     status: "Active",
//   },
//   {
//     id: 3,
//     name: "Super Admin",
//     email: "admin@example.com",
//     role: "admin",
//     status: "Active",
//   },
//   {
//     id: 4,
//     name: "Bob Smith",
//     email: "bob@example.com",
//     role: "user",
//     status: "Banned",
//   },
// ];

const ManageUsers = () => {
  // const [users, setUsers] = useState(INITIAL_USERS);

  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleRoleChange = (userId, newRole) => {
    // console.log(userId, newRole);
    const userRole = { role: newRole };

    axiosSecure
      .patch(`/users/${userId}`, userRole)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            title: `Marked as an ${newRole}`,
            icon: "success",
          });
        }
      })
      .catch((e) => {
        toast.error(e.message);
      });
    // // In a real app, API call here
    // setUsers(
    //   users.map((user) =>
    //     user.id === userId ? { ...user, role: newRole } : user
    //   )
    // );
    // alert(`User ID ${userId} role changed to ${newRole}`);
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "creator":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };
  return (
    <div className="space-y-6 ">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold ">Manage Users</h2>
          <p className="text-sm text-slate-500">
            View all users and manage their system roles.
          </p>
        </div>
        <div className="px-4 py-2 text-sm font-medium border rounded-lg shadow-sm border-secondary/30 bg-base-100 ">
          Total Users: {users.length}
        </div>
      </div>

      <div className="overflow-hidden border shadow-sm border-secondary/30 rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left ">
            <thead className="text-xs font-semibold uppercase border-b border-secondary/50 text-neutral">
              <tr>
                <th className="px-6 py-4">User Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Current Role</th>
                <th className="px-6 py-4">Change Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary/50">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="transition-colors hover:bg-gray-50/20"
                >
                  {/* <td className="flex items-center justify-center gap-3 px-6 py-4 font-medium text-neutral ">
                    <img
                      src={user.photoURL}
                      className="flex items-center justify-center w-8 h-8 text-xs font-bold rounded-full"
                    />

                    {user.displayName}
                  </td> */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user?.photoURL}
                        alt=""
                        className="object-cover w-10 h-10 rounded-full "
                      />
                      <div>
                        <p className="font-semibold text-neutral">
                          {user.displayName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral/70">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        user.status === "Active"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border uppercase ${getRoleBadgeColor(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative inline-block w-40">
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(user._id, e.target.value)
                        }
                        className="block w-full py-2 pl-3 pr-8 text-sm border rounded-lg text-neutral focus:border-primary focus:ring-primary bg-base-100 border-secondary/50"
                      >
                        <option value="user">User</option>
                        <option value="creator">Creator</option>
                        <option value="admin">Admin</option>
                      </select>
                      <div className="absolute inset-y-0 flex items-center px-2 pointer-events-none text-neutral right-2">
                        <UserCog className="w-4 h-4" />
                      </div>
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

export default ManageUsers;
