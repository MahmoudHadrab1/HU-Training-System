import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";

const getStatusBadgeColor = (status) => {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-800";
    case "Rejected":
      return "bg-red-100 text-red-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const InternshipTable = ({ applications }) => {
  const [filter, setFilter] = useState('all');
  const [submittedApplicationId, setSubmittedApplicationId] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [uniqueApplications, setUniqueApplications] = useState([]);
  
  // Process applications to ensure uniqueness by ID
  useEffect(() => {
    // Create a map to track applications by ID
    const appMap = new Map();
    
    // Add each application to the map, with the ID as key
    applications.forEach(app => {
      // Only add if not already in map
      if (!appMap.has(app.id)) {
        appMap.set(app.id, app);
      }
    });
    
    // Convert map values back to array
    setUniqueApplications(Array.from(appMap.values()));
    
    // Check localStorage for previously submitted application
   // const savedSubmittedId = localStorage.getItem('submittedApplicationId');
   // if (savedSubmittedId) {
   //   setSubmittedApplicationId(parseInt(savedSubmittedId));
  //  }
  }, [applications]);
  
  // Filter applications based on status (case-insensitive)
  const filteredApplications = filter === 'all' 
    ? uniqueApplications 
    : uniqueApplications.filter(app => 
        app.status.toLowerCase() === filter.toLowerCase()
      );

  const handleSendToDepartmentHead = (applicationId) => {
    // Save the submitted application ID to localStorage
    localStorage.setItem('submittedApplicationId', applicationId.toString());
    setSubmittedApplicationId(applicationId);
    setShowConfirmationModal(true);
    
    // Auto-hide modal after 5 seconds
    setTimeout(() => {
      setShowConfirmationModal(false);
    }, 5000);
  };
  
  return (
    <div className="space-y-4 relative">
      {/* Filter */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Filter by status:</label>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              filter === 'all' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('approved')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              filter === 'approved' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Approved
          </button>
          <button 
            onClick={() => setFilter('rejected')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              filter === 'rejected' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Rejected
          </button>
          <button 
            onClick={() => setFilter('pending')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Pending
          </button>
        </div>
      </div>
    
      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 font-medium text-gray-700">Company</th>
              <th className="text-left p-4 font-medium text-gray-700">Training Title</th>
              <th className="text-left p-4 font-medium text-gray-700">Date Applied</th>
              <th className="text-left p-4 font-medium text-gray-700">Status</th>
              <th className="text-left p-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredApplications.length > 0 ? (
              filteredApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="p-4">{app.companyName}</td>
                  <td className="p-4">{app.trainingTitle}</td>
                  <td className="p-4">{app.dateApplied}</td>
                  <td className="p-4">
                    <span
                      className={`${getStatusBadgeColor(
                        app.status
                      )} rounded-full px-3 py-1 text-xs font-medium`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {app.status === "Approved" && (
                      submittedApplicationId === app.id ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          <Check className="w-4 h-4 mr-1" />
                          Sent
                        </span>
                      ) : submittedApplicationId !== null ? (
                        <span className="text-gray-400 text-sm">
                          Already sent another application
                        </span>
                      ) : (
                        <button
                          onClick={() => handleSendToDepartmentHead(app.id)}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
                        >
                          Send to Department Head
                        </button>
                      )
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No applications found with the selected filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Empty state message */}
      {filteredApplications.length === 0 && (
        <p className="text-center text-gray-500 py-4">
          No applications match your filter criteria.
        </p>
      )}

      {/* Information message about sending to department head */}
      {submittedApplicationId && (
        <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 text-blue-700">
          <p className="font-medium">Note:</p>
          <p>You can only send one approved internship to the department head for final approval.</p>
        </div>
      )}

      {/* Confirmation Modal - Fixed position overlay */}
      {showConfirmationModal && (
        <div className="fixed inset-0 grid place-items-center z-50 animate-fade-in">

          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 transform transition-all duration-300 scale-100 opacity-100 animate-scale-in">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                <Check className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Congratulations!</h3>
            <p className="text-gray-600 text-lg mb-8">
              Your request has been sent to the department head for final approval.
            </p>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-8 h-8">
                  <div className="absolute w-full h-full rounded-full border-4 border-gray-200"></div>
                  <div className="absolute w-full h-full rounded-full border-4 border-green-600 border-t-transparent animate-spin"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default InternshipTable;