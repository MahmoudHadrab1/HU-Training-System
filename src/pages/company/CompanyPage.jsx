import React from "react";
import { Link } from "react-router-dom";
import CompanySection from "../../components/home/CompanySection";
import BenefitsSection from "../../components/home/BenefitsSection";



const CompanyPage = () => {
  return (
    <div className="company-page min-h-screen relative">
      {/* Background with multiple layers for depth */}
      <div className="absolute inset-0 z-0" style={{
        background: "linear-gradient(120deg, #fef2f2 0%, #fff1f7 50%, #fffbeb 100%)",
        backgroundSize: "cover"
      }}></div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-10" style={{
        backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23b04b5a\" fill-opacity=\"0.4\" fill-rule=\"evenodd\"%3E%3Cpath d=\"M0 20L20 0h10L0 30v-10zM30 0L0 30h10L30 10V0z\"/%3E%3C/g%3E%3C/svg%3E')"
      }}></div>
      
      {/* Decorative gradient circles */}
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-gradient-radial from-red-100 to-transparent opacity-40 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-gradient-radial from-amber-100 to-transparent opacity-40 blur-3xl"></div>
      
      {/* Main content */}
      <div className="relative z-10">
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
    </div>
  );
};

export default CompanyPage;