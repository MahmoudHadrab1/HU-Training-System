import React from "react";

const DepartmentHeadPage = () => {
  return (
    <div className="department-head-page bg-gray-50 min-h-screen flex flex-col items-center py-12 px-6">
      
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Department Head Dashboard</h1>
      <p className="text-gray-600 text-center max-w-2xl">
        Welcome to the Department Head portal. Here you can track and manage student internships.
      </p>

      {/* Dashboard Placeholder Section */}
      <div className="dashboard-placeholder bg-white p-6 mt-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Dashboard Features (Coming Soon)</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Student application tracking</li>
          <li>Company partnership management</li>
          <li>Internship quality monitoring</li>
          <li>Reports and analytics</li>
        </ul>
      </div>
    </div>
  );
};

export default DepartmentHeadPage;
