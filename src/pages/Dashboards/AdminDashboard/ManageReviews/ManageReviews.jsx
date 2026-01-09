import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Loader } from "../../../../components/Loader/Loader";
import { Check, Star, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageReviews = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ["all-reviews"],
        queryFn: async () => {
            const res = await axiosSecure.get("/reviews/all");
            return res.data;
        }
    });

    const approveMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/reviews/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["all-reviews"]);
            toast.success("Review approved successfully!");
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/reviews/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["all-reviews"]);
            toast.success("Review deleted!");
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }
        });
    };

    if (isLoading) return <Loader />;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Manage Reviews</h2>
                    <p className="text-sm text-slate-500">
                        Review and moderate user submissions before they go live on the home page.
                    </p>
                </div>
                <div className="px-4 py-2 text-sm font-medium border rounded-lg shadow-sm border-secondary/30 bg-base-100">
                    Total Reviews: {reviews.length}
                </div>
            </div>

            <div className="overflow-hidden border shadow-sm border-secondary/30 rounded-xl bg-base-100">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs font-semibold uppercase border-b border-secondary/50 text-neutral">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Rating</th>
                                <th className="px-6 py-4">Message</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-secondary/50">
                            {reviews.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-20 text-center text-slate-400 font-bold italic">
                                        No reviews found in the queue.
                                    </td>
                                </tr>
                            ) : (
                                reviews.map((review) => (
                                    <tr key={review._id} className="transition-colors hover:bg-gray-50/20">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={review.avatar}
                                                    alt=""
                                                    className="w-10 h-10 rounded-full object-cover border border-secondary/20"
                                                />
                                                <div>
                                                    <p className="font-semibold text-neutral">{review.name}</p>
                                                    <p className="text-xs text-slate-400">{review.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={12}
                                                        className={review.rating >= i + 1 ? "fill-accent text-accent" : "text-base-content/20"}
                                                    />
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 max-w-xs xl:max-w-md">
                                            <p className="text-neutral/70 line-clamp-2">"{review.content}"</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            {review.status === "approved" ? (
                                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold border bg-green-50 text-green-700 border-green-200 uppercase">
                                                    Approved
                                                </span>
                                            ) : (
                                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold border bg-yellow-50 text-yellow-700 border-yellow-200 uppercase">
                                                    Pending
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                {review.status !== "approved" && (
                                                    <button
                                                        onClick={() => approveMutation.mutate(review._id)}
                                                        className="p-1.5 bg-green-50 text-green-600 rounded-lg hober:bg-green-100 transition-colors border border-green-100 cursor-pointer"
                                                        title="Approve"
                                                    >
                                                        <Check size={18} />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(review._id)}
                                                    className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors border border-red-100 cursor-pointer"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageReviews;
