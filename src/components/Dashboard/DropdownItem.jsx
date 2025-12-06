export const DropdownItem =({ icon: Icon, text, isDestructive })=> {
  return (
    <a
      href="#"
      className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
        isDestructive
          ? "text-red-600 hover:bg-red-50"
          : "text-slate-700 hover:bg-[#d9f3ea] hover:text-[#00b074]"
      }`}
    >
      <Icon className="w-4 h-4 mr-3 opacity-75" />
      {text}
    </a>
  );
}
