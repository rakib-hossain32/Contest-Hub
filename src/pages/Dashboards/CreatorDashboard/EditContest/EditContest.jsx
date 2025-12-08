import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";


// --- Mock Data ---
const MOCK_CONTESTS = [
  {
    id: 1,
    name: "Minimalist Logo Design",
    image: "https://images.unsplash.com/photo-1626785774573-4b799314348d?auto=format&fit=crop&w=100&q=80",
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
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=100&q=80",
    description: "Capture the essence of summer.",
    price: 20,
    prizeMoney: 150,
    instructions: "High resolution only. No heavy filters.",
    type: "Photography",
    deadline: "2023-11-01", 
    status: "confirmed",
  },
];

const EditContest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Simulate fetching data
  const contestData = MOCK_CONTESTS.find((c) => c.id === parseInt(id));

  const { register, control, handleSubmit } = useForm({
    defaultValues: contestData, // Pre-fill form
  });

  const onSubmit = (data) => {
    console.log("Updated Data:", data);
    alert("Contest updated successfully!");
    navigate("/dashboard/my-contests");
  };

  if (!contestData) return <div>Contest not found</div>;

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

            <div className="space-y-2">
              <label className="text-sm font-medium">Deadline</label>
              <input
                {...register("deadline", { required: true })}
                type="date"
                className="w-full px-4 py-3 rounded-xl border  border-secondary/10 focus:border-[#00b074] outline-none"
              />
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
export default EditContest