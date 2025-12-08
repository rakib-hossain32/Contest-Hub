import {

  MapPin,
  Edit3,
  Camera,
  TrendingUp,
} from "lucide-react";
export const UserProfile = () => {
  const stats = { participated: 20, won: 5 };
  const winPercentage = ((stats.won / stats.participated) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Left Column: Profile Card */}
      <div className="space-y-6 lg:col-span-1">
        <div className="relative p-6 overflow-hidden text-center border shadow-sm border-secondary/30 rounded-2xl">
          <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-r from-blue-500 to-cyan-500"></div>
          <div className="relative mt-8 mb-4">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Profile"
              className="object-cover w-24 h-24 mx-auto border-4 border-white rounded-full shadow-md"
            />
            <button className="absolute bottom-0 right-[35%] bg-white p-1.5 rounded-full shadow-sm border border-secondary/10 text-gray-600 hover:text-blue-600">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <h2 className="text-xl font-bold ">John Doe</h2>
          <p className="text-sm text-slate-500">Creative Designer</p>
          <div className="flex items-center justify-center gap-2 py-2 mt-4 text-sm rounded-lg bg-primary">
            <MapPin className="w-4 h-4" /> New York, USA
          </div>
        </div>

        {/* Win Percentage Chart (Custom CSS Implementation) */}
        <div className="p-6 border shadow-sm border-secondary/30 rounded-2xl">
          <h3 className="flex items-center gap-2 mb-4 font-bold ">
            <TrendingUp className="w-5 h-5 text-blue-500" /> Success Rate
          </h3>
          <div className="flex items-center justify-center py-4">
            <div className="relative w-40 h-40">
              {/* SVG Circle Chart */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#f1f5f9"
                  strokeWidth="12"
                  fill="transparent"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#00b074"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * winPercentage) / 100}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold ">{winPercentage}%</span>
                <span className="text-xs font-medium uppercase text-slate-500">
                  Win Rate
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2 text-center">
            <div className="p-2 rounded-lg bg-secondary">
              <span className="block text-xs uppercase ">Won</span>
              <span className="font-bold text-slate-800">{stats.won}</span>
            </div>
            <div className="p-2 rounded-lg bg-secondary">
              <span className="block text-xs uppercase ">Total</span>
              <span className="font-bold text-slate-800">
                {stats.participated}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Update Form */}
      <div className="lg:col-span-2">
        <div className="overflow-hidden border shadow-sm border-secondary/30 rounded-2xl">
          <div className="flex items-center justify-between p-6 border-b border-secondary/30">
            <h3 className="text-lg font-bold ">Update Information</h3>
            <Edit3 className="w-5 h-5 " />
          </div>
          <div className="p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold ">Full Name</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-secondary/10 focus:border-[#00b074] focus:ring-4 focus:ring-[#00b074]/10 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold ">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl border border-secondary/10 focus:border-[#00b074] focus:ring-4 focus:ring-[#00b074]/10 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold ">
                  Profile Photo URL
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  className="w-full px-4 py-3 rounded-xl border border-secondary/10 focus:border-[#00b074] focus:ring-4 focus:ring-[#00b074]/10 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold ">
                  Address (Extra Field)
                </label>
                <textarea
                  rows="3"
                  placeholder="Enter your full address..."
                  className="w-full px-4 py-3 rounded-xl border border-secondary/10 focus:border-[#00b074] focus:ring-4 focus:ring-[#00b074]/10 outline-none transition-all resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-xl  font-medium text-neutral hover:text-base-100 hover:bg-neutral transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
