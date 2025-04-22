import React from 'react';
// Import the LogOut icon
import { LogOut } from 'lucide-react';

const CompanyNavbar = ({ activeTab, setActiveTab, onLogout }) => {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header with Logo and Logout */}
        <div className="container mx-auto flex justify-between items-center py-3">
          {/* Logo */}
          <div className="text-xl font-bold text-gray-800">
            <span className="text-red-600 mr-1">HU-</span>Tech Train
          </div>
          
          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="flex items-center bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md text-gray-700 transition-colors"
          >
            <LogOut className="mr-2 w-4 h-4" /> Log Out
          </button>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-8">
          <button
            onClick={() => setActiveTab('posts')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'posts'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } transition-colors duration-200`}
          >
            Training Posts
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'applications'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } transition-colors duration-200`}
          >
            Student Applications
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'reports'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } transition-colors duration-200`}
          >
            Reports
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'profile'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } transition-colors duration-200`}
          >
            Company Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyNavbar;