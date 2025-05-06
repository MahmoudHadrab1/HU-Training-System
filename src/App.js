// src/App.js - Updated with React Router (FIXED + AUTH WORKING)
import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Import common components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';

// Import page components
import HomePage from './pages/home/HomePage';
import AboutPage from './pages/home/AboutPage';
import HowItWorksPage from './pages/home/HowItWorksPage';

// Import auth components
import LoginPageStudent from './pages/auth/student/LoginPageStudent';
import CompanyLoginPage from './pages/auth/company/CompanyLoginPage';
import LoginPageDepartmentHead from './pages/auth/department/LoginPageDepartmentHead';
import CompanyRegistration from './pages/auth/company/CompanyRegistration';
import CompanyProfileCreation from './pages/auth/company/CompanyProfileCreation';

// Import dashboard components
import StudentDashboard from './components/dashboard/student/studentDashborad';
import CompanyDashboard from './components/dashboard/company/CompanyDashboard';
import DepartmentHeadDashboard from './components/dashboard/department/DepartmentHeadDashboard';

// Main layout component that includes header and footer
const MainLayout = ({ children }) => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.includes('/dashboard');

  return (
    <div className="min-h-screen font-sans text-gray-800 flex flex-col">
      <div className="flex-grow">
        {!isDashboardRoute && <Header />}
        {children}
      </div>
      {location.pathname === '/' && <Footer />}
    </div>
  );
};

// Protected Route component to handle authentication
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole'); // Make sure this matches what you set
  console.log("Protected Route Check:", isAuthenticated, userRole);


  if (!isAuthenticated) {
   return <Navigate to="/login/company" replace />;
 }

  return children;
};

function App() {
  const [activeTab, setActiveTab] = useState('company');

  return (
    <>
      <ScrollToTop />
      <MainLayout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage activeTab={activeTab} setActiveTab={setActiveTab} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />

          {/* Auth Routes */}
          <Route path="/login/student" element={<LoginPageStudent />} />
          <Route path="/login/company" element={<CompanyLoginPage />} />
          <Route path="/login/department" element={<LoginPageDepartmentHead />} />
          <Route path="/register" element={<CompanyRegistration />} />
          <Route path="/register/profile-creation" element={<CompanyProfileCreation />} />

          {/* Protected Dashboard Routes */}
          <Route 
            path="/dashboard/student" 
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/company" 
            element={
              <ProtectedRoute>
                <CompanyDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/department" 
            element={
              <ProtectedRoute>
                <DepartmentHeadDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Fallback route - redirect to home page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </>
  );
}

export default App;