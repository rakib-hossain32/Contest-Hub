import { DollarSign, Trophy, Calendar } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";

const AddContest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("New Contest Data:", data);
    data.email = user?.email;
    console.log(data)

    axiosSecure.post("/contests", data).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        navigate("/dashboard/my-contests");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "New Contest Created",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
    // alert("Contest created successfully! (Mock Action)");
    // navigate("/dashboard/my-contests");
  };

  return (
    <div className="w-full ">
      <div className="mb-8">
        <h2 className="text-2xl font-bold ">Create New Contest</h2>
        <p className="text-slate-500">
          Fill in the details to launch your new challenge.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 space-y-8 border shadow-sm border-secondary/30 bg-base-100 rounded-2xl"
      >
        {/* Basic Info Section */}
        <div className="space-y-6">
          <h3 className="pb-2 text-lg font-semibold border-b border-secondary/10 ">
            Basic Details
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium ">Contest Name</label>
              <input
                {...register("name", {
                  required: "Contest name is required",
                })}
                type="text"
                placeholder="e.g., Summer Logo Design"
                className="w-full px-4 py-3 rounded-xl border border-secondary/10 focus:border-[#00b074] focus:ring-4 focus:ring-[#00b074]/10 outline-none transition-all"
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Contest Type</label>
              <select
                {...register("type", { required: true })}
                className="w-full px-4 py-3 rounded-xl border border-secondary/10 focus:border-[#00b074] focus:ring-4 focus:ring-[#00b074]/10 outline-none transition-all bg-base-100"
              >
                <option value="">Select Type</option>
                <option value="Business">Business</option>
                <option value="Medical">Medical</option>
                <option value="Design">Design</option>
                <option value="Article">Article Writing</option>
                <option value="Gaming">Gaming</option>
                <option value="Programming">Programming & Tech</option>
                <option value="Design">Graphic & UI/UX Design</option>
                <option value="Photography">Photography</option>
                <option value="AI">AI & Machine Learning</option>
                <option value="Marketing">Digital Marketing</option>
                <option value="Video">Video Editing & Animation</option>
                <option value="DataScience">Data Science</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium ">Cover Image URL</label>
            <input
              {...register("image", { required: "Image URL is required" })}
              type="url"
              placeholder="https://..."
              className="w-full px-4 py-3 rounded-xl border border-secondary/10 focus:border-[#00b074] focus:ring-4 focus:ring-[#00b074]/10 outline-none transition-all"
            />
            {errors.image && (
              <p className="text-xs text-red-500">{errors.image.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium ">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows="3"
              placeholder="Describe what this contest is about..."
              className="w-full px-4 py-3 rounded-xl border border-secondary/10 focus:border-[#00b074] focus:ring-4 focus:ring-[#00b074]/10 outline-none transition-all resize-none"
            ></textarea>
            {errors.description && (
              <p className="text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        {/* Financials & Dates */}
        <div className="space-y-6">
          <h3 className="pb-2 text-lg font-semibold border-b border-secondary/10 ">
            Budget & Timeline
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium ">Entry Fee ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                <input
                  {...register("price", { required: true, min: 0 })}
                  type="number"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-secondary/10 focus:border-[#00b074] focus:ring-4 focus:ring-[#00b074]/10 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium ">Prize Money ($)</label>
              <div className="relative">
                <Trophy className="absolute left-3 top-3.5 h-4 w-4 text-yellow-500" />
                <input
                  {...register("prizeMoney", { required: true, min: 0 })}
                  type="number"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-secondary/10 focus:border-[#00b074] focus:ring-4 focus:ring-[#00b074]/10 outline-none transition-all"
                />
              </div>
            </div>

            {/* <div className="space-y-2">
                <label className="text-sm font-medium ">Deadline</label>
                <div className="w-full">
                  <Controller
                    control={control}
                    name="deadline"
                    rules={{ required: "Deadline is required" }}
                    render={({ field }) => (
                      <DatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        className="w-full px-4 py-3 rounded-xl border border-secondary/10 focus:border-[#00b074] focus:ring-4 focus:ring-[#00b074]/10 outline-none transition-all"
                        placeholderText="Select end date"
                        minDate={new Date()}
                      />
                    )}
                  />
                </div>
                {errors.deadline && (
                  <p className="text-xs text-red-500">
                    {errors.deadline.message}
                  </p>
                )}
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

        {/* Instructions */}
        <div className="space-y-2">
          <h3 className="pb-2 text-lg font-semibold border-b border-secondary/10 ">
            Task Details
          </h3>
          <label className="text-sm font-medium ">
            Detailed Task Instructions
          </label>
          <textarea
            {...register("instructions", {
              required: "Instructions are required",
            })}
            rows="5"
            placeholder="Step by step requirements for the participants..."
            className="w-full px-4 py-3 rounded-xl border border-secondary/10 focus:border-[#00b074] focus:ring-4 focus:ring-[#00b074]/10 outline-none transition-all resize-none"
          ></textarea>
          {errors.instructions && (
            <p className="text-xs text-red-500">
              {errors.instructions.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
           
            className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold shadow-lg shadow-[#00b074]/30 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            Create Contest
          </button>
        </div>
      </form>
    </div>
  );

  //   return (
  //     <div className="max-w-4xl mx-auto">
  //       <div className="mb-8">
  //         <h2 className="text-2xl font-bold text-slate-800">
  //           Create New Contest
  //         </h2>
  //         <p className="text-slate-500">
  //           Fill in the details to launch your new challenge.
  //         </p>
  //       </div>

  //       <form
  //         onSubmit={handleSubmit(onSubmit)}
  //         className="p-8 space-y-8 bg-white border border-gray-100 shadow-sm rounded-2xl"
  //       >
  //         {/* Basic Info Section */}
  //         <div className="space-y-6">
  //           <h3 className="pb-2 text-lg font-semibold border-b border-gray-100 text-slate-800">
  //             Basic Details
  //           </h3>

  //           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
  //             <div className="space-y-2">
  //               <label className="text-sm font-medium text-slate-700">
  //                 Contest Name
  //               </label>
  //               <input
  //                 {...register("name", { required: "Contest name is required" })}
  //                 type="text"
  //                 placeholder="e.g., Summer Logo Design"
  //                 className="w-full px-4 py-3 rounded-xl border border-secondary/10 focus:border-[#00b074] focus:ring-4 focus:ring-[#00b074]/10 outline-none transition-all"
  //               />
  //               {errors.name && (
  //                 <p className="text-xs text-red-500">{errors.name.message}</p>
  //               )}
  //             </div>

  //             <div className="space-y-2">
  //               <label className="text-sm font-medium text-slate-700">
  //                 Contest Type
  //               </label>
  //               <select
  //                 {...register("type", { required: true })}
  //                 className="w-full px-4 py-3 rounded-xl border border-secondary/10 focus:border-[#00b074] focus:ring-4 focus:ring-[#00b074]/10 outline-none transition-all bg-white"
  //               >
  //                 <option value="">Select Type</option>
  //                 <option value="Business">Business</option>
  //                 <option value="Medical">Medical</option>
  //                 <option value="Article">Article Writing</option>
  //                 <option value="Design">Gaming</option>
  //               </select>
  //             </div>
  //           </div>

  //           <div className="space-y-2">
  //             <label className="text-sm font-medium text-slate-700">
  //               Cover Image URL
  //             </label>
  //             <input
  //               {...register("image", { required: "Image URL is required" })}
  //               type="url"
  //               placeholder="https://..."
  //               className="w-full px-4 py-3 rounded-xl border border-secondary/10 focus:border-[#00b074] focus:ring-4 focus:ring-[#00b074]/10 outline-none transition-all"
  //             />
  //             {errors.image && (
  //               <p className="text-xs text-red-500">{errors.image.message}</p>
  //             )}
  //           </div>

  //           <div className="space-y-2">
  //             <label className="text-sm font-medium text-slate-700">
  //               Description
  //             </label>
  //             <textarea
  //               {...register("description", {
  //                 required: "Description is required",
  //               })}
  //               rows="3"
  //               placeholder="Describe what this contest is about..."
  //               className="w-full px-4 py-3 rounded-xl border border-secondary/10 focus:border-[#00b074] focus:ring-4 focus:ring-[#00b074]/10 outline-none transition-all resize-none"
  //             ></textarea>
  //             {errors.description && (
  //               <p className="text-xs text-red-500">
  //                 {errors.description.message}
  //               </p>
  //             )}
  //           </div>
  //         </div>

  //         {/* Financials & Dates */}
  //         <div className="space-y-6">
  //           <h3 className="pb-2 text-lg font-semibold border-b border-gray-100 text-slate-800">
  //             Budget & Timeline
  //           </h3>

  //           <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
  //             <div className="space-y-2">
  //               <label className="text-sm font-medium text-slate-700">
  //                 Entry Fee ($)
  //               </label>
  //               <div className="relative">
  //                 <DollarSign className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
  //                 <input
  //                   {...register("price", { required: true, min: 0 })}
  //                   type="number"
  //                   className="w-full pl-10 pr-4 py-3 rounded-xl border border-secondary/10 focus:border-[#00b074] focus:ring-4 focus:ring-[#00b074]/10 outline-none transition-all"
  //                 />
  //               </div>
  //             </div>

  //             <div className="space-y-2">
  //               <label className="text-sm font-medium text-slate-700">
  //                 Prize Money ($)
  //               </label>
  //               <div className="relative">
  //                 <Trophy className="absolute left-3 top-3.5 h-4 w-4 text-yellow-500" />
  //                 <input
  //                   {...register("prizeMoney", { required: true, min: 0 })}
  //                   type="number"
  //                   className="w-full pl-10 pr-4 py-3 rounded-xl border border-secondary/10 focus:border-[#00b074] focus:ring-4 focus:ring-[#00b074]/10 outline-none transition-all"
  //                 />
  //               </div>
  //             </div>

  //             <div className="space-y-2">
  //               <label className="text-sm font-medium text-slate-700">
  //                 Deadline
  //               </label>
  //               <div className="w-full">
  //                 {/* Changed to native Date Input */}
  //                 <input
  //                   type="date"
  //                   {...register("deadline", {
  //                     required: "Deadline is required",
  //                   })}
  //                   min={new Date().toISOString().split("T")[0]}
  //                   className="w-full px-4 py-3 rounded-xl border border-secondary/10 focus:border-[#00b074] focus:ring-4 focus:ring-[#00b074]/10 outline-none transition-all"
  //                 />
  //               </div>
  //               {errors.deadline && (
  //                 <p className="text-xs text-red-500">
  //                   {errors.deadline.message}
  //                 </p>
  //               )}
  //             </div>
  //           </div>
  //         </div>

  //         {/* Instructions */}
  //         <div className="space-y-2">
  //           <h3 className="pb-2 text-lg font-semibold border-b border-gray-100 text-slate-800">
  //             Task Details
  //           </h3>
  //           <label className="text-sm font-medium text-slate-700">
  //             Detailed Task Instructions
  //           </label>
  //           <textarea
  //             {...register("instructions", {
  //               required: "Instructions are required",
  //             })}
  //             rows="5"
  //             placeholder="Step by step requirements for the participants..."
  //             className="w-full px-4 py-3 rounded-xl border border-secondary/10 focus:border-[#00b074] focus:ring-4 focus:ring-[#00b074]/10 outline-none transition-all resize-none"
  //           ></textarea>
  //           {errors.instructions && (
  //             <p className="text-xs text-red-500">
  //               {errors.instructions.message}
  //             </p>
  //           )}
  //         </div>

  //         <div className="flex justify-end gap-4 pt-4">
  //           <button
  //             type="button"
  //             onClick={() => navigate(-1)}
  //             className="px-6 py-2.5 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-colors"
  //           >
  //             Cancel
  //           </button>
  //           <button
  //             type="submit"
  //             className="px-6 py-2.5 rounded-xl bg-[#00b074] text-white font-bold shadow-lg shadow-[#00b074]/30 hover:shadow-[#00b074]/40 hover:-translate-y-0.5 transition-all"
  //           >
  //             Create Contest
  //           </button>
  //         </div>
  //       </form>
  //     </div>
  //   );
};

export default AddContest;
