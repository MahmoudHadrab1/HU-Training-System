import React, { useState } from 'react';
import { Calendar, FileText, Download, Check, ChevronRight } from 'lucide-react';
import WeeklyActivityReport from './WeeklyActivityReport';

const ModifiedReportsTab = () => {
  const [completedReports, setCompletedReports] = useState([
    {
      id: 1,
      studentName: 'Mohammed Ali',
      studentId: 'S12347',
      trainingTitle: 'UI/UX Design Training',
      submissionDate: '2025-03-20',
      performance: 'Very Good',
      recommendation: 'Recommended',
      type: 'Final'
    }
  ]);
  
  // Student applications with Approved status - pending final reports
  const pendingFinalReports = [
    {
      id: 2,
      studentName: 'Sara Ahmed',
      studentId: 'S12346',
      trainingTitle: 'Frontend Developer Internship',
      applicationDate: '2025-03-16',
      status: 'Approved'
    }
  ];
  
  const handleViewReport = (reportId) => {
    // In a real app, this would load the report details
    alert(`Viewing report details for ID: ${reportId}`);
  };

  const handleSubmitReport = (student) => {
    alert(`Opening final report submission form for ${student.studentName}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left column - Final Reports */}
      <div className="bg-white shadow rounded-lg overflow-hidden p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Final Training Reports</h2>
        
        <p className="text-gray-600 mb-6">Submit comprehensive reports for students who have completed their training period. These reports will be sent to the department head.</p>
        
        <div className="space-y-4">
          {/* Pending Final Reports */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-gray-800">Pending Final Reports</h3>
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Required for completion
              </span>
            </div>
            
            <div className="space-y-4">
              {pendingFinalReports.map((student) => (
                <div key={student.id} className="bg-white p-4 rounded shadow-sm">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{student.studentName}</p>
                      <p className="text-sm text-gray-500">{student.trainingTitle}</p>
                    </div>
                    <button 
                      className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
                      onClick={() => handleSubmitReport(student)}
                    >
                      Submit Final Report
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
              
              {pendingFinalReports.length === 0 && (
                <div className="bg-white p-4 rounded shadow-sm text-center text-gray-500">
                  No pending final reports.
                </div>
              )}
            </div>
          </div>
          
          {/* Completed Reports */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-800 mb-3">Completed Reports</h3>
            
            <div className="space-y-4">
              {completedReports.map((report) => (
                <div key={report.id} className="bg-white p-4 rounded shadow-sm">
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center">
                        <p className="font-medium">{report.studentName}</p>
                        <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                          {report.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{report.trainingTitle}</p>
                      <p className="text-xs text-gray-400 mt-1">Submitted: {report.submissionDate}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        onClick={() => handleViewReport(report.id)}
                      >
                        View
                      </button>
                      <button 
                        className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {completedReports.length === 0 && (
                <div className="bg-white p-4 rounded shadow-sm text-center text-gray-500">
                  No completed reports yet.
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Information box about department head */}
        <div className="mt-6 bg-blue-50 p-4 rounded-md border-l-4 border-blue-500">
          <div className="flex items-start">
            <div className="mr-3 mt-0.5">
              <Calendar className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h4 className="font-medium text-blue-800">Department Head Submission</h4>
              <p className="text-blue-700 text-sm mt-1">
                Final reports must be submitted for all trained students before the end of the semester. These reports will be used by the department head to evaluate the student's performance and award academic credit.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right column - Weekly Activity Reports */}
      <div>
        <WeeklyActivityReport />
      </div>
    </div>
  );
};

export default ModifiedReportsTab;