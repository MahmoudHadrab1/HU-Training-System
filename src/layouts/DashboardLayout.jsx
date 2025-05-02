import React from 'react';
import ScrollToTop from '../components/common/ScrollToTop';

const DashboardLayout = ({ 
  children, 
  navbar, 
  title = '', 
  subtitle = '',
  actionButton = null 
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollToTop />
      
      {/* Navbar */}
      {navbar}
      
      {/* Dashboard Header - Welcome section */}
      {(title || actionButton) && (
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                {title && <h1 className="text-2xl font-bold text-gray-800">{title}</h1>}
                {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
              </div>
              
              {actionButton && (
                <div>{actionButton}</div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;