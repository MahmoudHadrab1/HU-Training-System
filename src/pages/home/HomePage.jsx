import React from "react";
import CompanySection from "../../components/home/CompanySection";
import StudentSection from "../../components/home/StudentSection";
import BenefitsSection from "../../components/home/BenefitsSection";

const HomePage = ({ setActivePage, activeTab, setActiveTab }) => {
  return (
    <div className="home bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 py-8">
        {/* Content Section - Remove the tab buttons and directly render based on activeTab */}
        <div>
          {activeTab === "company" ? (
            <CompanySection setActivePage={setActivePage} />
          ) : (
            <StudentSection setActivePage={setActivePage} />
          )}
        </div>

        {/* Benefits Section */}
        <div className="mt-12">
          <BenefitsSection />
        </div>
        
        {/* We're keeping the existing buttons in the CompanySection/StudentSection components */}
        {/* No need to add additional button here */}
      </div>
    </div>
  );
};

export default HomePage;