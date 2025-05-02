import React, { useState, useEffect } from 'react';
import { Calendar, FileText, Download, Send, Plus } from 'lucide-react';
import { jsPDF } from 'jspdf';

const WeeklyActivityReport = () => {
  const [activeReport, setActiveReport] = useState('new');
  const [reportForm, setReportForm] = useState({
    studentName: '',
    studentId: '',
    companyName: 'Tech Solutions Inc.',
    supervisorName: '',
    weekNumber: '',
    startDate: '',
    endDate: '',
    activitiesSummary: '',
    skillsLearned: '',
    challengesFaced: '',
    supervisorComments: '',
  });
  const [savedReports, setSavedReports] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  useEffect(() => {
    // Simulating loading saved reports
    const demoReports = [
      {
        id: 1,
        studentName: 'Sara Ahmed',
        studentId: 'S12346',
        weekNumber: '1',
        startDate: '2025-03-01',
        endDate: '2025-03-07',
        submissionDate: '2025-03-07',
        status: 'Submitted',
        activitiesSummary: 'Worked on frontend components',
        skillsLearned: 'React hooks, Tailwind CSS',
        challengesFaced: 'State management',
        supervisorComments: 'Good progress',
      },
      {
        id: 2,
        studentName: 'Sara Ahmed',
        studentId: 'S12346',
        weekNumber: '2',
        startDate: '2025-03-08',
        endDate: '2025-03-14',
        submissionDate: '2025-03-14',
        status: 'Submitted',
        activitiesSummary: 'Backend API integration',
        skillsLearned: 'Node.js, Express',
        challengesFaced: 'Authentication flow',
        supervisorComments: 'Needs improvement on error handling',
      }
    ];
    setSavedReports(demoReports);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReportForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generatePdf = (data) => {
    const doc = new jsPDF();
    const lineHeight = 10;
    let y = 10;

    doc.setFontSize(16);
    doc.text('Weekly Activity Report', 10, y);

    doc.setFontSize(12);
    y += lineHeight;
    doc.text(`Student Name: ${data.studentName}`, 10, y);
    y += lineHeight;
    doc.text(`Student ID: ${data.studentId}`, 10, y);
    y += lineHeight;
    doc.text(`Company Name: ${data.companyName}`, 10, y);
    y += lineHeight;
    doc.text(`Supervisor Name: ${data.supervisorName}`, 10, y);
    y += lineHeight;
    doc.text(`Week Number: ${data.weekNumber}`, 10, y);
    y += lineHeight;
    doc.text(`Period: ${data.startDate} to ${data.endDate}`, 10, y);
    y += lineHeight;
    doc.text('Summary of Activities:', 10, y);
    y += lineHeight;
    doc.text(doc.splitTextToSize(data.activitiesSummary, 180), 10, y);
    y += lineHeight * (doc.splitTextToSize(data.activitiesSummary, 180).length + 1);

    doc.text('Skills Learned/Used:', 10, y);
    y += lineHeight;
    doc.text(doc.splitTextToSize(data.skillsLearned, 180), 10, y);
    y += lineHeight * (doc.splitTextToSize(data.skillsLearned, 180).length + 1);

    if (data.challengesFaced) {
      doc.text('Challenges Faced:', 10, y);
      y += lineHeight;
      doc.text(doc.splitTextToSize(data.challengesFaced, 180), 10, y);
      y += lineHeight * (doc.splitTextToSize(data.challengesFaced, 180).length + 1);
    }

    doc.text('Supervisor Comments:', 10, y);
    y += lineHeight;
    doc.text(doc.splitTextToSize(data.supervisorComments, 180), 10, y);

    doc.save(`WeeklyReport_${data.studentId}_Week${data.weekNumber}.pdf`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newReport = {
        id: savedReports.length + 1,
        ...reportForm,
        submissionDate: new Date().toISOString().split('T')[0],
        status: 'Submitted'
      };

      setSavedReports(prev => [...prev, newReport]);
      setIsSubmitting(false);
      setSubmissionSuccess(true);

      // Generate PDF on submission
      generatePdf(newReport);

      setTimeout(() => {
        setSubmissionSuccess(false);
        setReportForm({
          studentName: '',
          studentId: '',
          companyName: 'Tech Solutions Inc.',
          supervisorName: '',
          weekNumber: '',
          startDate: '',
          endDate: '',
          activitiesSummary: '',
          skillsLearned: '',
          challengesFaced: '',
          supervisorComments: '',
        });
        setActiveReport('saved');
      }, 2000);
    }, 1500);
  };

  const handleViewReport = (reportId) => {
    alert(`Viewing report details for ID: ${reportId}`);
  };

  const handleDownloadReport = (reportId) => {
    const report = savedReports.find(r => r.id === reportId);
    if (report) {
      generatePdf(report);
    }
  };

  const renderReportForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <p className="text-blue-700">
          Weekly activity reports document student progress during their internship. 
          These reports help track activities, skills gained, and challenges faced.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-1">
            Student Name*
          </label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={reportForm.studentName}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
            Student ID*
          </label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            value={reportForm.studentId}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={reportForm.companyName}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
            disabled
          />
        </div>
        
        <div>
          <label htmlFor="supervisorName" className="block text-sm font-medium text-gray-700 mb-1">
            Supervisor Name*
          </label>
          <input
            type="text"
            id="supervisorName"
            name="supervisorName"
            value={reportForm.supervisorName}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="weekNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Week Number*
          </label>
          <input
            type="number"
            id="weekNumber"
            name="weekNumber"
            min="1"
            max="12"
            value={reportForm.weekNumber}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date*
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={reportForm.startDate}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              End Date*
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={reportForm.endDate}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
        </div>
      </div>
      
      <div>
        <label htmlFor="activitiesSummary" className="block text-sm font-medium text-gray-700 mb-1">
          Summary of Activities*
        </label>
        <textarea
          id="activitiesSummary"
          name="activitiesSummary"
          value={reportForm.activitiesSummary}
          onChange={handleInputChange}
          rows="3"
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-red-500 focus:border-red-500"
          placeholder="Describe the main activities and tasks performed by the student during this week"
          required
        ></textarea>
      </div>
      
      <div>
        <label htmlFor="skillsLearned" className="block text-sm font-medium text-gray-700 mb-1">
          Skills Learned/Used*
        </label>
        <textarea
          id="skillsLearned"
          name="skillsLearned"
          value={reportForm.skillsLearned}
          onChange={handleInputChange}
          rows="2"
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-red-500 focus:border-red-500"
          placeholder="List the skills that were learned or applied during this week"
          required
        ></textarea>
      </div>
      
      <div>
        <label htmlFor="challengesFaced" className="block text-sm font-medium text-gray-700 mb-1">
          Challenges Faced
        </label>
        <textarea
          id="challengesFaced"
          name="challengesFaced"
          value={reportForm.challengesFaced}
          onChange={handleInputChange}
          rows="2"
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-red-500 focus:border-red-500"
          placeholder="Describe any challenges or obstacles encountered and how they were addressed"
        ></textarea>
      </div>
      
      <div>
        <label htmlFor="supervisorComments" className="block text-sm font-medium text-gray-700 mb-1">
          Supervisor Comments*
        </label>
        <textarea
          id="supervisorComments"
          name="supervisorComments"
          value={reportForm.supervisorComments}
          onChange={handleInputChange}
          rows="2"
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-red-500 focus:border-red-500"
          placeholder="Provide feedback on the student's performance during this week"
          required
        ></textarea>
      </div>
      
      <div className="pt-4 flex justify-between">
        <button
          type="button"
          onClick={() => setActiveReport('saved')}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        
        <button
          type="submit"
          disabled={isSubmitting || submissionSuccess}
          className={`flex items-center px-4 py-2 rounded-md text-white transition-colors ${
            isSubmitting || submissionSuccess 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : submissionSuccess ? (
            <>
              <svg className="h-5 w-5 mr-2 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Submitted!
            </>
          ) : (
            <>
              <Send className="h-5 w-5 mr-2" />
              Submit Report
            </>
          )}
        </button>
      </div>
    </form>
  );

  const renderSavedReports = () => (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-700">Saved Weekly Reports</h3>
        <button
          onClick={() => setActiveReport('new')}
          className="bg-red-600 text-white px-3 py-1 rounded-md flex items-center hover:bg-red-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-1" />
          New Report
        </button>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {savedReports.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Week
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Period
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {savedReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{report.studentName}</div>
                      <div className="text-sm text-gray-500">{report.studentId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Week {report.weekNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {report.startDate} to {report.endDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{report.submissionDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleViewReport(report.id)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDownloadReport(report.id)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Download className="inline h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            No weekly reports have been submitted yet. Click "New Report" to create one.
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Weekly Activity Reports</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveReport('new')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors flex items-center ${
              activeReport === 'new' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <FileText className="h-4 w-4 mr-1" />
            New Report
          </button>
          <button
            onClick={() => setActiveReport('saved')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors flex items-center ${
              activeReport === 'saved' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Calendar className="h-4 w-4 mr-1" />
            Saved Reports
          </button>
        </div>
      </div>
      
      {activeReport === 'new' ? renderReportForm() : renderSavedReports()}
    </div>
  );
};

export default WeeklyActivityReport;