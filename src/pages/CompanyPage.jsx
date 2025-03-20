import React from "react";
import { Link } from "react-router-dom";
import CompanySection from "../components/home/CompanySection";
import BenefitsSection from "../components/home/BenefitsSection";

const CompanyPage = () => {
  return (
    <div className="company-page bg-gray-50 min-h-screen">
      <CompanySection />
      <BenefitsSection />

     
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

export default CompanyPage;
