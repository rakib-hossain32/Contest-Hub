// ContestCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { Users, Calendar } from "lucide-react";
import { NavLink, useNavigate } from "react-router";

const ContestCard = ({ contest, index, }) => {
  const {} = {};
  const { name, image, participants = 0, description, deadline, type, _id } =
    contest;
  const navigate = useNavigate();

  const deadlineDate = new Date(deadline);
  const today = new Date();
  const diffTime = deadlineDate - today; // difference in milliseconds
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // convert to days

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flex flex-col h-full overflow-hidden transition-all duration-300 border shadow-lg bg-base-100 border-base-300 rounded-2xl hover:shadow-2xl group"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        {/* Category Badge */}
        <div className="absolute px-3 py-1 text-xs font-bold rounded-md shadow-sm top-3 left-3 bg-primary/90 backdrop-blur-sm text-primary-content">
          {type}
        </div>
        {/* Deadline Tag */}
        <div className="absolute flex items-center gap-1 px-3 py-1 text-xs rounded-full shadow-md top-3 right-3 bg-primary text-primary-content">
          <Calendar size={12} />{" "}
          {diffDays > 0
            ? `${diffDays} days left`
            : diffDays === 0
            ? "Last day"
            : "Expired"}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col p-6 grow">
        <h3 className="mb-2 text-xl font-bold transition-colors text-primary line-clamp-1 group-hover:text-secondary">
          {name}
        </h3>

        <p className="mb-4 text-sm text-base-content/70 line-clamp-2">
          {description.length > 80
            ? description.slice(0, 80) + "..."
            : description}
        </p>

        <div className="mt-auto">
          {/* Participants Info */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-secondary">
              <Users size={18} className="text-accent" />
              <span className="font-semibold">{participants}</span>
              <span className="text-xs text-base-content/60">Participants</span>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={() => navigate(`/contest/${_id}`)}
            // to={"contests-details"}

            className="w-full py-3 rounded-xl bg-primary text-primary-content font-medium hover:bg-primary/90 transition-all shadow-md hover:shadow-primary/30 cursor-pointer active:scale-[0.98]"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ContestCard;
