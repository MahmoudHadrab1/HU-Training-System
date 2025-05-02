import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { Check, Clock, AlertTriangle, Send, Calendar, FileText } from 'lucide-react';

const StudentFinalReport = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    department: '',
    trainingSupervisor: '',
    companyName: '',
    trainingDuration: '',
    aboutTraining: '',
    achievedObjectives: '',
    skills: ''
  });
  
  const [trainingStatus, setTrainingStatus] = useState({
    hoursCompleted: 0,
    totalHours: 120, // Default total hours required
    isCompleted: false,
    applicationId: null,
    companyName: '',
    trainingTitle: '',
    startDate: '',
    endDate: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHoursCompletedNotification, setShowHoursCompletedNotification] = useState(false);
  const [previousHoursCompleted, setPreviousHoursCompleted] = useState(0);

  // Check if student has completed training hours and has an approved internship
  useEffect(() => {
    // In a real app, fetch this data from your API
    // For this demo, we'll simulate it with localStorage and hardcoded data
    const submittedApplicationId = localStorage.getItem('submittedApplicationId');
    const savedHours = localStorage.getItem('trainingHoursCompleted');
    const reportSubmitted = localStorage.getItem('finalReportSubmitted');
    
    if (submittedApplicationId) {
      // Get completed hours from localStorage or default to a value
      const completedHours = savedHours ? parseInt(savedHours) : 90;
      
      // Simulate fetching training data for this application
      setTrainingStatus({
        hoursCompleted: completedHours,
        totalHours: 120,
        isCompleted: completedHours >= 120,
        applicationId: parseInt(submittedApplicationId),
        companyName: "TechInnovate Solutions", 
        trainingTitle: "Software Engineering Internship",
        startDate: "Feb 15, 2025",
        endDate: "Apr 15, 2025"
      });
      
      // Keep track of previous hours to detect completion
      setPreviousHoursCompleted(completedHours);
      
      // Pre-fill some form fields based on the selected internship
      setFormData(prev => ({
        ...prev,
        studentName: "Ahmed Mohammad", // For demo purposes
        studentId: "201912345", // For demo purposes
        department: "Computer Science",
        companyName: "TechInnovate Solutions",
        trainingDuration: "8 Weeks",
        trainingSupervisor: "John Smith" 
      }));
      
      // Check if the report was already submitted
      if (reportSubmitted === 'true') {
        setIsSubmitted(true);
      }
    }
  }, []);

  // Check if hours are completed whenever trainingStatus changes
  useEffect(() => {
    // Save current hours to localStorage
    if (trainingStatus.hoursCompleted > 0) {
      localStorage.setItem('trainingHoursCompleted', trainingStatus.hoursCompleted);
    }
    
    // Check if hours are now complete but weren't before
    if (trainingStatus.hoursCompleted >= trainingStatus.totalHours && 
        previousHoursCompleted < trainingStatus.totalHours) {
      // Show completion notification
      setShowHoursCompletedNotification(true);
      // Update the completion status
      setTrainingStatus(prev => ({ ...prev, isCompleted: true }));
      
      // Auto-dismiss notification after 10 seconds
      setTimeout(() => {
        setShowHoursCompletedNotification(false);
      }, 10000);
    }
    
    // Update previous hours state
    setPreviousHoursCompleted(trainingStatus.hoursCompleted);
  }, [trainingStatus.hoursCompleted, trainingStatus.totalHours, previousHoursCompleted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if training hours are completed
    if (!trainingStatus.isCompleted) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Generate PDF
    generatePDF();
    
    // Simulate sending to server
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // In a real app, you would make an API call here to update the status
      localStorage.setItem('finalReportSubmitted', 'true');
    }, 2000);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add header with logo (simulated)
    doc.setFontSize(18);
    doc.setTextColor(44, 62, 80);
    doc.text("TRAINING COMPLETION REPORT", 105, 20, { align: 'center' });
    
    // Add university name
    doc.setFontSize(14);
    doc.text("Hashemite University - Technical Training Program", 105, 30, { align: 'center' });
    
    // Add horizontal line
    doc.setDrawColor(44, 62, 80);
    doc.line(20, 35, 190, 35);
    
    // Student and Company Information Section
    doc.setFontSize(12);
    doc.setTextColor(52, 73, 94);
    
    // Student Info
    doc.setFontSize(14);
    doc.setTextColor(41, 128, 185);
    doc.text("Student Information", 20, 45);
    
    doc.setFontSize(12);
    doc.setTextColor(52, 73, 94);
    doc.text(`Student Name: ${formData.studentName}`, 20, 55);
    doc.text(`Student ID: ${formData.studentId}`, 20, 65);
    doc.text(`Department: ${formData.department}`, 20, 75);
    
    // Company Info
    doc.setFontSize(14);
    doc.setTextColor(41, 128, 185);
    doc.text("Company Information", 20, 90);
    
    doc.setFontSize(12);
    doc.setTextColor(52, 73, 94);
    doc.text(`Company: ${formData.companyName}`, 20, 100);
    doc.text(`Training Supervisor: ${formData.trainingSupervisor}`, 20, 110);
    doc.text(`Training Duration: ${formData.trainingDuration}`, 20, 120);
    doc.text(`Total Hours Completed: ${trainingStatus.hoursCompleted}`, 20, 130);
    
    // Training Details
    doc.setFontSize(14);
    doc.setTextColor(41, 128, 185);
    doc.text("Training Details", 20, 145);
    
    doc.setFontSize(12);
    doc.setTextColor(52, 73, 94);
    doc.text("About Training:", 20, 155);
    const aboutTrainingLines = doc.splitTextToSize(formData.aboutTraining, 170);
    doc.text(aboutTrainingLines, 20, 165);
    
    // Calculate position for next section based on text height
    let yPos = 170 + (aboutTrainingLines.length * 7);
    
    doc.text("Objectives Achieved:", 20, yPos);
    const objectivesLines = doc.splitTextToSize(formData.achievedObjectives, 170);
    doc.text(objectivesLines, 20, yPos + 10);
    
    yPos = yPos + 15 + (objectivesLines.length * 7);
    
    doc.text("Skills Acquired:", 20, yPos);
    const skillsLines = doc.splitTextToSize(formData.skills, 170);
    doc.text(skillsLines, 20, yPos + 10);
    
    // Add signature section
    yPos = yPos + 20 + (skillsLines.length * 7);
    
    doc.setFontSize(12);
    doc.text("Student Signature: _________________________", 20, yPos);
    doc.text("Date: " + new Date().toLocaleDateString(), 140, yPos);
    
    // Add footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text('This is an official training completion report - Hashemite University', 105, 285, { align: 'center' });
    }
    
    // Save the PDF
    doc.save('training_completion_report.pdf');
    
    return doc;
  };

  // Simulated function to complete more hours (for demo purposes)
  const handleCompleteMoreHours = () => {
    const newHours = Math.min(trainingStatus.hoursCompleted + 10, trainingStatus.totalHours);
    setTrainingStatus(prev => ({
      ...prev,
      hoursCompleted: newHours
    }));
  };

  if (!trainingStatus.applicationId) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg shadow-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-yellow-800">No approved internship found</h3>
            <div className="mt-2 text-yellow-700">
              <p>You need to have an approved internship that has been sent to the department head before you can submit a final report.</p>
              <p className="mt-2">Please go to the "Your Internship" tab to submit an approved internship application.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Report Successfully Submitted</h2>
          <p className="text-gray-600">Your training completion report has been submitted successfully.</p>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg border mb-6">
          <h3 className="text-lg font-semibold mb-4">Training Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700"><span className="font-medium">Company:</span> {trainingStatus.companyName}</p>
              <p className="text-gray-700"><span className="font-medium">Position:</span> {trainingStatus.trainingTitle}</p>
              <p className="text-gray-700"><span className="font-medium">Duration:</span> {formData.trainingDuration}</p>
            </div>
            <div>
              <p className="text-gray-700"><span className="font-medium">Hours Completed:</span> {trainingStatus.hoursCompleted}/{trainingStatus.totalHours}</p>
              <p className="text-gray-700"><span className="font-medium">Status:</span> Completed</p>
              <p className="text-gray-700"><span className="font-medium">Submission Date:</span> {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <button
            onClick={generatePDF}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center mx-auto"
          >
            <FileText className="mr-2 h-5 w-5" />
            Download Report PDF
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-md p-8 space-y-8">
      {/* Completion Notification Banner - shown only when hours are newly completed */}
      {showHoursCompletedNotification && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md animate-pulse">
          <div className="flex">
            <div className="flex-shrink-0">
              <Check className="h-5 w-5 text-green-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-green-800">Training Hours Completed!</h3>
              <div className="mt-2 text-green-700">
                <p>Congratulations! You have completed all required training hours. You can now submit your final training report.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Training Details and Progress Card */}
      <div className={`bg-white border rounded-lg shadow-sm overflow-hidden`}>
        <div className="border-b bg-gray-50 px-6 py-4">
          <h3 className="text-lg font-semibold">Training Information</h3>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Company</div>
                  <div className="font-medium">{trainingStatus.companyName}</div>
                </div>
              </div>
              
              <div className="flex items-center text-gray-700">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Position</div>
                  <div className="font-medium">{trainingStatus.trainingTitle}</div>
                </div>
              </div>
              
              <div className="flex items-center text-gray-700">
                <div className="bg-amber-100 p-2 rounded-full mr-3">
                  <Calendar className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Training Period</div>
                  <div className="font-medium">{trainingStatus.startDate} to {trainingStatus.endDate}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg flex-1">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-700">Training Hours Progress</h4>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  trainingStatus.isCompleted ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {trainingStatus.isCompleted ? 'Completed' : 'In Progress'}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div 
                  className={`h-4 rounded-full transition-all duration-1000 ${trainingStatus.isCompleted ? 'bg-green-600' : 'bg-blue-600'}`}
                  style={{ width: `${(trainingStatus.hoursCompleted / trainingStatus.totalHours) * 100}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium text-gray-700">
                  {trainingStatus.hoursCompleted}/{trainingStatus.totalHours} hours
                </div>
                <div className="text-sm text-gray-500">
                  {trainingStatus.isCompleted 
                    ? 'All hours completed!' 
                    : `${trainingStatus.totalHours - trainingStatus.hoursCompleted} hours remaining`}
                </div>
              </div>
              
              {/* Demo button - would be removed in production */}
              {!trainingStatus.isCompleted && (
                <button
                  onClick={handleCompleteMoreHours}
                  className="mt-4 w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-sm font-medium"
                >
                  + Complete 10 More Hours (Demo)
                </button>
              )}
              
              {trainingStatus.isCompleted && (
                <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700 flex items-center">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  You have completed all required training hours and can submit your final report.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Report Form */}
      <div className={`${!trainingStatus.isCompleted ? 'opacity-50 pointer-events-none filter blur-sm' : ''} transition-all duration-500`}>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Final Training Report</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
              <input 
                type="text" 
                name="studentName" 
                value={formData.studentName} 
                onChange={handleChange} 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
              <input 
                type="text" 
                name="studentId" 
                value={formData.studentId} 
                onChange={handleChange} 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <input 
                type="text" 
                name="department" 
                value={formData.department} 
                onChange={handleChange} 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Training Supervisor</label>
              <input 
                type="text" 
                name="trainingSupervisor" 
                value={formData.trainingSupervisor} 
                onChange={handleChange} 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company/Institution</label>
              <input 
                type="text" 
                name="companyName" 
                value={formData.companyName} 
                onChange={handleChange} 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Training Duration</label>
              <input 
                type="text" 
                name="trainingDuration" 
                value={formData.trainingDuration} 
                onChange={handleChange} 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                required 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">About this Training</label>
            <textarea 
              name="aboutTraining" 
              placeholder="Describe your experience and the company environment" 
              value={formData.aboutTraining} 
              onChange={handleChange} 
              className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Objectives Achieved</label>
            <textarea 
              name="achievedObjectives" 
              placeholder="List the objectives you achieved during your training" 
              value={formData.achievedObjectives} 
              onChange={handleChange} 
              className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Skills Acquired</label>
            <textarea 
              name="skills" 
              placeholder="Describe the skills and knowledge you gained during your training" 
              value={formData.skills} 
              onChange={handleChange} 
              className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
              required 
            />
          </div>

          <div className="text-center pt-4">
            <button 
              type="submit" 
              className={`px-8 py-3 ${trainingStatus.isCompleted ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'} text-white rounded-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center mx-auto`}
              disabled={isSubmitting || !trainingStatus.isCompleted}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Submit Final Report
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      
      {!trainingStatus.isCompleted && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Clock className="h-5 w-5 text-yellow-400 mt-0.5" />
            </div>
            <div className="ml-3">
              <h3 className="text-md font-medium text-yellow-800">Training Hours Not Completed</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>You still need to complete <span className="font-semibold">{trainingStatus.totalHours - trainingStatus.hoursCompleted} more hours</span> of training before you can submit your final report.</p>
                <p className="mt-2">Please continue with your training program and check back once your hours are complete.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentFinalReport;