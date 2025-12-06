// Stats Helper Component
export const StatItem =({ icon: Icon, value, label, color }) =>{
  return (
    <div className="text-center">
      <Icon className={`mx-auto mb-2 ${color}`} size={24} />
      <h3 className="text-2xl font-bold text-white">{value}</h3>
      <p className="text-xs tracking-wide text-gray-400 uppercase">{label}</p>
    </div>
  );
}
