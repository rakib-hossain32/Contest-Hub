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
export const WinningContests = () => {
  const winnings = [
    {
      id: 1,
      contest: "Abstract Art 2023",
      rank: 1,
      prize: "$500",
      date: "Oct 20, 2023",
    },
    {
      id: 2,
      contest: "Mobile App Design",
      rank: 3,
      prize: "$150",
      date: "Sep 15, 2023",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {winnings.map((item) => (
        <div
          key={item.id}
          className="relative p-6 overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm group rounded-2xl hover:shadow-lg"
        >
          <div className="absolute top-0 right-0 w-24 h-24 -mt-4 -mr-4 transition-transform bg-yellow-100 rounded-bl-full opacity-50 group-hover:scale-110"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-center w-12 h-12 mb-4 text-yellow-600 bg-yellow-100 shadow-sm rounded-xl">
              <Trophy className="w-6 h-6" />
            </div>

            <h3 className="mb-1 text-lg font-bold text-slate-800">
              {item.contest}
            </h3>
            <p className="mb-4 text-sm text-slate-500">Won on {item.date}</p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-400 uppercase">
                  Rank
                </span>
                <span className="flex items-center gap-1 font-bold text-slate-800">
                  <Award className="w-4 h-4 text-purple-500" /> #{item.rank}
                </span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-xs font-semibold text-gray-400 uppercase">
                  Prize
                </span>
                <span className="text-lg font-bold text-green-600">
                  {item.prize}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Empty State Placeholder if needed */}
      {winnings.length === 0 && (
        <div className="py-12 text-center text-gray-500 col-span-full">
          <Trophy className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No winnings yet. Keep participating!</p>
        </div>
      )}
    </div>
  );
};
