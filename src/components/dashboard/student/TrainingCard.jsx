import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const getModeColor = (mode) => {
  switch (mode) {
    case "On-site":
      return "bg-green-100 text-green-800";
    case "Hybrid":
      return "bg-orange-100 text-orange-800";
    case "Remote":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const TrainingCard = ({ post, onDetailsClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
    >
      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
      <div
        className={`inline-block ${getModeColor(
          post.mode
        )} rounded-full px-3 py-1 text-sm font-medium mb-2`}
      >
        {post.mode}
      </div>
      <p className="text-gray-500 text-sm mb-4">{post.date}</p>
      <button
        onClick={() => onDetailsClick(post)}
        className="border border-blue-500 text-blue-500 hover:bg-blue-50 rounded-lg px-4 py-2 flex items-center"
      >
        More Details <ExternalLink className="ml-2 w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default TrainingCard;
