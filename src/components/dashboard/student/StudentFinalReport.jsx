import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { Check, AlertTriangle, Send, FileText, Info } from 'lucide-react';

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
    totalHours: 120,
    isCompleted: false,
    applicationId: null,
    companyName: '',
    trainingTitle: '',
    startDate: '',
    endDate: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationSentToDepartment, setApplicationSentToDepartment] = useState(false);

  // Check if student has sent an application to the department head
  useEffect(() => {
    const submittedApplicationId = localStorage.getItem('submittedApplicationId');
    const reportSubmitted = localStorage.getItem('finalReportSubmitted');
    
    if (submittedApplicationId) {
      setApplicationSentToDepartment(true);
      
      // For demonstration purposes, set hours to completed (120/120)
      const completedHours = 120;
      
      setTrainingStatus({
        hoursCompleted: completedHours,
        totalHours: 120,
        isCompleted: true,
        applicationId: parseInt(submittedApplicationId),
        companyName: "TechInnovate Solutions", 
        trainingTitle: "Software Engineering Internship",
        startDate: "Feb 15, 2025",
        endDate: "Apr 15, 2025"
      });
      
      // Pre-fill form fields
      setFormData({
        studentName: "Ahmed Mohammad",
        studentId: "201912345",
        department: "Computer Science",
        companyName: "TechInnovate Solutions",
        trainingDuration: "8 Weeks",
        trainingSupervisor: "John Smith",
        aboutTraining: "",
        achievedObjectives: "",
        skills: ""
      });
      
      if (reportSubmitted === 'true') {
        setIsSubmitted(true);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!trainingStatus.isCompleted) return;
    
    setIsSubmitting(true);
    generatePDF();
    
    // Simulate sending to server
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      localStorage.setItem('finalReportSubmitted', 'true');
    }, 2000);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(18);
    doc.setTextColor(44, 62, 80);
    doc.text("TRAINING COMPLETION REPORT", 105, 20, { align: 'center' });
    
    // Add university name
    doc.setFontSize(14);
    doc.text("Hashemite University - Technical Training Program", 105, 30, { align: 'center' });
    
    // Add horizontal line
    doc.setDrawColor(44, 62, 80);
    doc.line(20, 35, 190, 35);
    
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
    
    // Add date only (no signature)
    yPos = yPos + 20 + (skillsLines.length * 7);
    doc.setFontSize(12);
    doc.text(`Date: 42025/ 5/`, 140, yPos);
    
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

  // If there's no approved internship
  if (!applicationSentToDepartment) {
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

  // If report is already submitted
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

  // Main report form
  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-md p-8 space-y-8">
      {/* Department Head Approval Notification */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md flex items-start">
        <div className="flex-shrink-0">
          <Info className="h-5 w-5 text-blue-500" />
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-medium text-blue-800">Report Preparation</h3>
          <div className="mt-2 text-blue-700">
            <p>Your internship has been approved by the department head. You can now prepare your final training report.</p>
            <p className="mt-2 font-medium">Important: The final report must be submitted at the end of your training period after completing all required hours.</p>
          </div>
        </div>
      </div>
      
      {/* Report Form */}
      <div className="transition-all duration-500">
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
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center mx-auto"
              disabled={isSubmitting}
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
    </div>
  );
};

export default StudentFinalReport;