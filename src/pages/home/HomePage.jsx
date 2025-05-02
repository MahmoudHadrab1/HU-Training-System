import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import CompanySection from "../../components/home/CompanySection";
import StudentSection from "../../components/home/StudentSection";
import BenefitsSection from "../../components/home/BenefitsSection";
import HowItWorks from "../../components/how-it-works/HowItWorks";

const HomePage = ({ activeTab, setActiveTab }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Check URL parameters for active tab
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && (tabParam === "company" || tabParam === "student")) {
      setActiveTab(tabParam);
    }
  }, [searchParams, setActiveTab]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col">
      {/* Hero background like About page */}
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-64 bg-red-50" />
        <svg
          className="w-full -mt-1"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            fill="#f9fafb"
            d="M0,96L60,85.3C120,75,240,53,360,42.7C480,32,600,32,720,53.3C840,75,960,117,1080,117.3C1200,117,1320,75,1380,53.3L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 pb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Welcome to <span className="text-red-600">HU-Tech Train</span>
        </h1>
      </section>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-6 pt-0 pb-8">
          {/* Content Section based on activeTab */}
          <div className="mt-[-40px]">
            {activeTab === "company" ? (
              <CompanySection navigate={navigate} />
            ) : (
              <StudentSection navigate={navigate} />
            )}
          </div>

          {/* Benefits Section */}
          <div className="mt-12">
            <BenefitsSection />
          </div>

          {/* How It Works Section */}
          <div className="mt-12">
            <HowItWorks />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
