export const HeaderIcon =({ icon: Icon, badge, color }) =>{
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 hover:bg-blue-100",
    indigo: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100",
    red: "bg-red-50 text-red-600 hover:bg-red-100",
  };

  const badgeClasses = {
    blue: "bg-blue-600",
    indigo: "bg-indigo-600",
    red: "bg-red-500",
  };

  return (
    <button
      className={`w-10 h-10 flex items-center justify-center rounded-xl relative transition-colors ${
        colorClasses[color] || colorClasses.blue
      }`}
    >
      <Icon className="w-5 h-5" />
      {badge && (
        <span
          className={`absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold rounded-full text-white border-2 border-[#f7f6f9] ${
            badgeClasses[color] || badgeClasses.blue
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}
