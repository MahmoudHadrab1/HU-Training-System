// App.js - Updated with Footer only on homepage
import React, { useState } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer'; // Import the Footer component
import BenefitsSection from './components/home/BenefitsSection';
import CompanySection from './components/home/CompanySection';
import StudentSection from './components/home/StudentSection';
import HowItWorks from './components/how-it-works/HowItWorks';

// Import pages from their new locations
import AboutPage from './pages/home/AboutPage.jsx';
import LoginPageStudent from './pages/auth/student/LoginPageStudent.jsx';


import CompanyRegistration from './pages/auth/company/CompanyRegistration.jsx';
import CompanyProfileCreation from './pages/auth/company/CompanyProfileCreation.jsx';
import CompanyLoginPage from './pages/auth/company/CompanyLoginPage.jsx';
import LoginPageDepartmentHead from './pages/auth/department/LoginPageDepartmentHead.jsx';

// Import dashboard components from their new locations
import DepartmentHeadDashboard from './components/dashboard/department/DepartmentHeadDashboard.jsx';
import CompanyDashboard from './components/dashboard/company/CompanyDashboard.jsx';
import StudentDashboard from './components/dashboard/student/studentDashborad.jsx';
function App() {
  const [activeTab, setActiveTab] = useState('company');
  const [activePage, setActivePage] = useState('home');

  // دالة تغيير الصفحة – تم تعديلها لإلغاء حفظ موضع التمرير
  const handlePageChange = (page, tab = null) => {
    if (tab) {
      setActiveTab(tab);
    }
    setActivePage(page);
    
    // ارجع لأعلى الصفحة دائماً عند التنقل
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch(activePage) {
      case 'home':
        return (
          <div className="container mx-auto p-4">
            {activeTab === 'company' ? 
              <CompanySection setActivePage={handlePageChange} /> : 
              <StudentSection setActivePage={handlePageChange} />
            }
            <BenefitsSection />
            <HowItWorks />
          </div>
        );
      case 'about':
        return <AboutPage />;
      case 'login':
        return <LoginPageStudent />;
      case 'studentLogin':
        return <LoginPageStudent setActivePage={handlePageChange} />;
      case 'companyLogin':
        return <CompanyLoginPage setActivePage={handlePageChange} />;
      case 'departmentLogin':
        return <LoginPageDepartmentHead setActivePage={handlePageChange} />;
      case 'departmentDashboard':
        return <DepartmentHeadDashboard setActivePage={handlePageChange} />;
      case 'register':
        return <CompanyRegistration setActivePage={handlePageChange} />;
      case 'profileCreation':
        return <CompanyProfileCreation setActivePage={handlePageChange} />;
        case 'studentDashboard':
      return <StudentDashboard setActivePage={handlePageChange} />;
      case 'companyDashboard':
        return <CompanyDashboard setActivePage={handlePageChange} />;
      default:
        return (
          <div className="container mx-auto p-4">
            {activeTab === 'company' ? 
              <CompanySection setActivePage={handlePageChange} /> : 
              <StudentSection setActivePage={handlePageChange} />
            }
            <BenefitsSection />
            <HowItWorks />
          </div>
        );
    }
  };

  const showFooter = activePage === 'home';
  const isDashboardPage =
  activePage === 'departmentDashboard' ||
  activePage === 'companyDashboard' ||
  activePage === 'studentDashboard';

  return (
    <div className="min-h-screen font-sans text-gray-800 flex flex-col">
      <div className="flex-grow">
        {!isDashboardPage && (
          <Header 
            setActivePage={handlePageChange} 
            setActiveTab={setActiveTab} 
            activeTab={activeTab} 
          />
        )}

        {renderPage()}
      </div>

      {showFooter && !isDashboardPage && (
        <Footer 
          setActivePage={handlePageChange} 
          activeTab={activeTab} 
        />
      )}
    </div>
  );
}

export default App;