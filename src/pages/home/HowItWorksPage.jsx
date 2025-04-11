import React from "react";
import HowItWorks from "../how-it-works/HowItWorks"; // Assuming HowItWorks handles tabs internally

const HowItWorksPage = () => {
  return (
    <div className="how-it-works-page bg-gray-50 min-h-screen flex flex-col items-center py-12 px-6">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8">How It Works</h1>

      {/* How It Works Component */}
      <div className="container mx-auto w-full max-w-5xl">
        <HowItWorks />
      </div>
    </div>
  );
};

export default HowItWorksPage;

