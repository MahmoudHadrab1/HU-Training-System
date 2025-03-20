import React from "react";
import { Link } from "react-router-dom";
import StudentSection from "../components/home/StudentSection";
import BenefitsSection from "../components/home/BenefitsSection";

const StudentPage = () => {
  return (
    <div className="student-page bg-gray-50 min-h-screen">
      <StudentSection />
      <BenefitsSection />

      {/* "See How It Works" Button */}
      <div className="flex justify-center my-8">
        <Link
          to="/how-it-works"
          className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
        >
          See How It Works
        </Link>
      </div>
    </div>
  );
};

export default StudentPage;
