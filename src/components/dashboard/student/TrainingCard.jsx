import React from "react";
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
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          {post.logoUrl ? (
            <img 
              src={post.logoUrl} 
              alt={`${post.company} logo`} 
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold mr-3">
              {post.company.charAt(0)}
            </div>
          )}
          <h3 className="text-lg font-bold">{post.company}</h3>
        </div>
        <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded">
          {post.fieldOfWork}
        </span>
      </div>
      
      <h4 className="font-semibold text-gray-700 mb-2">{post.title}</h4>
      
      <div className="flex items-center text-sm text-gray-600 mb-3">
        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getModeColor(post.location)}`}>
          {post.location}
        </span>
        <span className="mx-2">•</span>
        <span>{post.duration}</span>
      </div>
      
      <p className="text-sm text-gray-500 mb-4">End Date: {post.endDate}</p>
      
      <button
        onClick={() => onDetailsClick(post)}
        className="w-full bg-red-600 text-white hover:bg-red-700 rounded-lg px-4 py-2 flex items-center justify-center transition-colors"
      >
        View Info <ExternalLink className="ml-2 w-4 h-4" />
      </button>
    </div>
  );
};

export default TrainingCard;