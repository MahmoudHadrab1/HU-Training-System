// App.js - Updated with Department Head Dashboard routing
import React, { useState, useRef } from 'react';
import Header from './components/common/Header';
import BenefitsSection from './components/home/BenefitsSection';
import CompanySection from './components/home/CompanySection';
import StudentSection from './components/home/StudentSection';
import HowItWorks from './components/how-it-works/HowItWorks';
import AboutPage from './pages/AboutPage.jsx';
import CompanyPage from './pages/CompanyPage.jsx';
import DepartmentHeadPage from './pages/DepartmentHeadPage.jsx';
import LoginPageStudent from './pages/LoginPageStudent.jsx';
import StudentPage from './pages/StudentPage.jsx';
import CompanyRegistration from './pages/CompanyRegistration.jsx';
import CompanyProfileCreation from './pages/CompanyProfileCreation.jsx';
import CompanyLoginPage from './pages/CompanyLoginPage.jsx';
import LoginPageDepartmentHead from './pages/LoginPageDepartmentHead.jsx';
import DepartmentHeadDashboard from './components/department-dashborad.jsx/DepartmentHeadDashboard.jsx';
//import StudentDetailView from '../components/StudentDetailView';

function App() {
  const [activeTab, setActiveTab] = useState('company');
  const [activePage, setActivePage] = useState('home');
  const prevScrollPos = useRef(0);

  // Custom function to handle page changes
  const handlePageChange = (page, tab = null) => {
    // Store current scroll position
    prevScrollPos.current = window.pageYOffset;
    
    // Update state
    if (tab) {
      setActiveTab(tab);
    }
    setActivePage(page);
    
    // Use double requestAnimationFrame for reliable timing after rendering
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo(0, prevScrollPos.current);
      });
    });
  };

  // Function to render the active page
  const renderPage = () => {
    switch(activePage) {
      case 'home':
        return (
          <>
            <div className="container mx-auto p-4">
              {activeTab === 'company' ? 
                <CompanySection setActivePage={handlePageChange} /> : 
                <StudentSection setActivePage={handlePageChange} />
              }
              <BenefitsSection />
              <HowItWorks />
            </div>
          </>
        );
      case 'about':
        return <AboutPage />;
      case 'company':
        return <CompanyPage />;
      case 'student':
        return <StudentPage />;
      case 'department':
        return <DepartmentHeadPage />;
      case 'login':
        // For login pages, we DO want to scroll to top
        window.scrollTo(0, 0);
        return <LoginPageStudent />;
      case 'studentLogin':
        window.scrollTo(0, 0);
        return <LoginPageStudent setActivePage={handlePageChange} />;
      case 'companyLogin':
        window.scrollTo(0, 0);
        return <CompanyLoginPage setActivePage={handlePageChange} />;
      case 'departmentLogin':
        window.scrollTo(0, 0);
        return <LoginPageDepartmentHead setActivePage={handlePageChange} />;
      case 'departmentDashboard':
        window.scrollTo(0, 0);
        return <DepartmentHeadDashboard setActivePage={handlePageChange} />;
      case 'register':
        window.scrollTo(0, 0);
        return <CompanyRegistration setActivePage={handlePageChange} />;
      case 'profileCreation':
        window.scrollTo(0, 0);
        return <CompanyProfileCreation setActivePage={handlePageChange} />;
      case 'companyDashboard':
        window.scrollTo(0, 0);
        return <div className="container mx-auto p-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Company Dashboard</h1>
          <p className="text-lg">Welcome to your company dashboard! This page is under construction.</p>
        </div>;
      default:
        return (
          <>
            <div className="container mx-auto p-4">
              {activeTab === 'company' ? 
                <CompanySection setActivePage={handlePageChange} /> : 
                <StudentSection setActivePage={handlePageChange} />
              }
              <BenefitsSection />
              <HowItWorks />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-800">
      {activePage === 'departmentDashboard' ? null : (
        <Header 
          setActivePage={handlePageChange} 
          setActiveTab={setActiveTab} 
          activeTab={activeTab} 
        />
      )}
      {renderPage()}
    </div>
  );
}

export default App;