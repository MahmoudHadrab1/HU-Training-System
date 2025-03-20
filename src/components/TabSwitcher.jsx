import React from 'react';

const TabSwitcher = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b border-gray-300 mb-6">
      <button
        className={`py-2 px-4 mr-4 font-medium text-lg relative transition duration-300 ${
          activeTab === "company"
            ? "text-red-600"
            : "text-gray-600 hover:text-red-600"
        }`}
        onClick={() => setActiveTab("company")}
      >
        For Company
        <span
          className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform transition-transform duration-300 ${
            activeTab === "company" ? "scale-x-100" : "scale-x-0"
          }`}
        ></span>
      </button>
      <button
        className={`py-2 px-4 font-medium text-lg relative transition duration-300 ${
          activeTab === "student"
            ? "text-red-600"
            : "text-gray-600 hover:text-red-600"
        }`}
        onClick={() => setActiveTab("student")}
      >
        For Student
        <span
          className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform transition-transform duration-300 ${
            activeTab === "student" ? "scale-x-100" : "scale-x-0"
          }`}
        ></span>
      </button>
    </div>
  );
};

export default TabSwitcher;