import React from "react";
import { motion } from "framer-motion";

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

const TrainingModal = ({ training, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
      >
        <h2 className="text-2xl font-bold mb-4">{training.title}</h2>
        <div
          className={`inline-block ${getModeColor(
            training.mode
          )} rounded-full px-3 py-1 text-sm font-medium mb-4`}
        >
          {training.mode}
        </div>
        <div className="space-y-2 mb-4">
          <p>
            <strong>Company:</strong> {training.company}
          </p>
          <p>
            <strong>Address:</strong> {training.address}
          </p>
          <p>
            <strong>Email:</strong> {training.email}
          </p>
          <p>
            <strong>Phone:</strong> {training.phone}
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 rounded-lg py-2"
          >
            Close
          </button>
          <button className="flex-1 bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600">
            Submit CV
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TrainingModal;
