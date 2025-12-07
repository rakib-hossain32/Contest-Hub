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
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Edit Contest</h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 space-y-8 bg-white border border-gray-100 shadow-sm rounded-2xl"
      >
        {/* Reusing structure from Add Contest but simplified for brevity */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Contest Name
            </label>
            <input
              {...register("name")}
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#00b074] outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Prize Money
            </label>
            <input
              {...register("prizeMoney")}
              type="number"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#00b074] outline-none"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            {...register("description")}
            rows="3"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#00b074] outline-none resize-none"
          ></textarea>
        </div>
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 rounded-xl text-slate-600 font-medium hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition-all"
          >
            Update Contest
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditContest