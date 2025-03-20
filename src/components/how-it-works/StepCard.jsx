import React from "react";

const StepCard = ({ image, title, description, className, animationDelay, stepNumber, accentColor = "red" }) => {
  // Always use red for the accent color regardless of the passed prop
  const accentColorClass = "bg-red-600";
  
  return (
    <div 
      className={`bg-white p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className}`}
      style={{ transitionDelay: `${animationDelay}ms` }}
    >
      <div className="relative mb-4">
        {/* Step number badge - Changed to always use red */}
        <div className={`absolute -top-3 -left-3 w-8 h-8 ${accentColorClass} text-white rounded-full flex items-center justify-center font-bold z-10`}>
          {stepNumber}
        </div>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover rounded-md"
        />
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default StepCard;