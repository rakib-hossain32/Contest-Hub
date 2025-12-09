import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";
import Swal from "sweetalert2";
import { Loader } from "../../../../components/Loader/Loader";

const EditContest = () => {
  const axiosSecure = useAxiosSecure();

  const { id } = useParams();
  const navigate = useNavigate();
  // console.log(id);

  const { data: contest = {}, isLoading } = useQuery({
    queryKey: ["edit-contest", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data;
    },
  });

  // console.log(data);
  // Simulate fetching data
  // const contestData = MOCK_CONTESTS.find((c) => c.id === parseInt(id));

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: contest,
  });

  const onSubmit = (data) => {
    console.log("Updated Data:", data);
    const id = data._id;
    axiosSecure.patch(`/contests/${id}/update`, data).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Contest Updated",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
    // alert("Contest updated successfully!");
    // navigate("/dashboard/my-contests");
  };

  if (isLoading) {
    return <Loader/>
  }
  if (!contest) return <div className="flex items-center justify-center">Contest not found</div>;

  return (
    <div className="w-full ">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Edit Contest</h2>
        <p className="text-sm text-gray-500">
          Update the details of your contest below.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 space-y-8 border shadow-sm border-secondary/40 rounded-2xl"
      >
        {/* --- Section 1: Basic Info --- */}
        <div className="space-y-6">
          <h3 className="pb-2 text-lg font-semibold border-b border-secondary/30">
            Basic Details
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Contest Name</label>
              <input
                {...register("name", { required: true })}
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-secondary/10 focus:border-[#00b074] outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Contest Type</label>
              <select
                {...register("type", { required: true })}
                className="w-full px-4 py-3 rounded-xl border border-secondary/10 focus:border-[#00b074] outline-none "
              >
                <option value="Business">Business</option>
                <option value="Medical">Medical</option>
                <option value="Article">Article Writing</option>
                <option value="Design">Design</option>
                <option value="Photography">Photography</option>
                <option value="Gaming">Gaming</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Cover Image URL</label>
            <input
              {...register("image", { required: true })}
              type="url"
              className="w-full px-4 py-3 rounded-xl border border-secondary/10 focus:border-[#00b074] outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              {...register("description", { required: true })}
              rows="3"
              className="w-full px-4 py-3 rounded-xl border border-secondary/10 focus:border-[#00b074] outline-none resize-none"
            ></textarea>
          </div>
        </div>

        {/* --- Section 2: Budget & Timeline --- */}
        <div className="space-y-6">
          <h3 className="pb-2 text-lg font-semibold border-b border-secondary/30">
            Budget & Timeline
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Entry Fee ($)</label>
              <input
                {...register("price", { required: true })}
                type="number"
                className="w-full px-4 py-3 rounded-xl border border-secondary/10 focus:border-[#00b074] outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Prize Money ($)</label>
              <input
                {...register("prizeMoney", { required: true })}
                type="number"
                className="w-full px-4 py-3 rounded-xl border border-secondary/10 focus:border-[#00b074] outline-none"
              />
            </div>

            {/* <div className="space-y-2">
              <label className="text-sm font-medium">Deadline</label>
              <input
                {...register("deadline", { required: true })}
                type="date"
                className="w-full px-4 py-3 rounded-xl border  border-secondary/10 focus:border-[#00b074] outline-none"
              />
            </div> */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Deadline</label>

              <div className="relative">
                <Controller
                  control={control}
                  name="deadline"
                  rules={{ required: "Deadline is required" }}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      minDate={new Date()}
                      dateFormat="dd MMM, yyyy"
                      placeholderText="Select end date"
                      className="w-full px-4 py-3 transition-all duration-300 border outline-none cursor-pointer pl-11 rounded-xl border-secondary/10 bg-base-100 text-base-content focus:border-primary focus:ring-4 focus:ring-primary/10 "
                    />
                  )}
                />

                {/* Icon */}
                <Calendar
                  size={20}
                  className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
                />
              </div>

              {errors.deadline && (
                <p className="text-xs text-red-500">
                  {errors.deadline.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* --- Section 3: Instructions --- */}
        <div className="space-y-6">
          <h3 className="pb-2 text-lg font-semibold border-b border-secondary/30">
            Task Instructions
          </h3>
          <div className="space-y-2">
            <label className="text-sm font-medium">Detailed Instructions</label>
            <textarea
              {...register("instructions", { required: true })}
              rows="5"
              className="w-full px-4 py-3 rounded-xl border border-secondary/10 focus:border-[#00b074] outline-none resize-none"
            ></textarea>
          </div>
        </div>

        {/* --- Buttons --- */}
        <div className="flex justify-end gap-4 pt-4 border-t border-secondary/30">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 rounded-xl font-medium hover:bg-slate-50 hover:text-primary transition cursor-pointer text-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold shadow-lg hover:bg-primary/90 transition-all cursor-pointer "
          >
            Update Contest
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditContest;
