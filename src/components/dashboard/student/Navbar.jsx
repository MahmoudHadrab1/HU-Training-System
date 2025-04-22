import React from "react";
import { Home, Briefcase, FileText, LogOut } from "lucide-react";

const Navbar = ({ activePage, setActivePage, onLogout }) => {
  return (
    <>
      {/* Navigation Bar */}
      <div className="w-full bg-white shadow-sm z-40">
        {/* Top Header */}
        <div className="container mx-auto flex justify-between items-center py-3 px-6">
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
        
        {/* Navigation Links - Company Style */}
        <div className="border-b border-gray-200">
          <div className="container mx-auto px-6">
            <div className="flex space-x-8">
              <button
                onClick={() => setActivePage("training")}
                className={`py-4 relative font-medium transition-colors duration-300 ${
                  activePage === "training"
                    ? "text-red-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <div className="flex items-center">
                  <Home className="mr-2 w-5 h-5" /> Training Posts
                </div>
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform transition-transform duration-300 ${
                    activePage === "training" ? "scale-x-100" : "scale-x-0"
                  }`}
                ></span>
              </button>
              
              <button
                onClick={() => setActivePage("internship")}
                className={`py-4 relative font-medium transition-colors duration-300 ${
                  activePage === "internship"
                    ? "text-red-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <div className="flex items-center">
                  <Briefcase className="mr-2 w-5 h-5" /> Your Internship
                </div>
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform transition-transform duration-300 ${
                    activePage === "internship" ? "scale-x-100" : "scale-x-0"
                  }`}
                ></span>
              </button>
              
              <button
                onClick={() => setActivePage("report")}
                className={`py-4 relative font-medium transition-colors duration-300 ${
                  activePage === "report"
                    ? "text-red-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <div className="flex items-center">
                  <FileText className="mr-2 w-5 h-5" /> Submit Report
                </div>
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform transition-transform duration-300 ${
                    activePage === "report" ? "scale-x-100" : "scale-x-0"
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content area with padding-top to create space below navbar */}
      <div className="mt-2">
        {/* Your page content goes here */}
      </div>
    </>
  );
};

export default Navbar;