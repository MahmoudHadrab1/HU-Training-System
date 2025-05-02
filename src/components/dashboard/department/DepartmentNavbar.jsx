import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const DepartmentNavbar = ({ activeTab, setActiveTab, onLogout }) => {
  const navigate = useNavigate();
  
  // Handle logout
  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    
    // Call the onLogout function if provided
    if (typeof onLogout === 'function') {
      onLogout();
    } else {
      // Navigate to home page
      navigate('/');
    }
  };
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate('/')}  
        >
          <span className="text-red-600">HU-</span>Tech Train
        </div>
        
        {/* Logout Button - Styled to match the screenshot */}
        <button
          onClick={handleLogout}
          className="flex items-center text-gray-700 hover:text-gray-900 font-medium transition-colors"
        >
          <LogOut className="mr-2 w-5 h-5" /> Log Out
        </button>
      </div>
    </header>
  );
};

export default DepartmentNavbar;