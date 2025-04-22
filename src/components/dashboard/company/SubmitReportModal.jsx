import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const SubmitReportModal = ({ isOpen, onClose, onSubmit, student, trainingTitle }) => {
  const [reportData, setReportData] = useState({
    performance: 'Good',
    attendanceRating: 3,
    skillsRating: 3,
    attitudeRating: 3,
    comments: '',
    recommendation: 'Recommended'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportFile, setReportFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReportData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (name, value) => {
    setReportData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setReportFile(e.target.files[0]);
    }
  };

  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setReportFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit({
        studentName: student,
        trainingTitle,
        ...reportData,
        reportFile: reportFile ? reportFile.name : null,
        submissionDate: new Date().toISOString().split('T')[0]
      });
      setIsSubmitting(false);
      onClose();
      
      // Reset form
      setReportData({
        performance: 'Good',
        attendanceRating: 3,
        skillsRating: 3,
        attitudeRating: 3,
        comments: '',
        recommendation: 'Recommended'
      });
      setReportFile(null);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl max-w-lg mx-auto p-6 w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Submit Training Report</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-6 bg-gray-50 p-4 rounded-md">
          <p className="text-gray-600">Student: <span className="font-medium text-gray-800">{student}</span></p>
          <p className="text-gray-600">Training: <span className="font-medium text-gray-800">{trainingTitle}</span></p>
          <p className="text-gray-600">Report Date: <span className="font-medium text-gray-800">{new Date().toISOString().split('T')[0]}</span></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File Upload Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Report Document
            </label>
            <div 
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                isDragging ? 'border-red-400 bg-red-50' : reportFile ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById('fileUpload').click()}
            >
              <input
                type="file"
                id="fileUpload"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt"
              />
              <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
              {reportFile ? (
                <div>
                  <p className="text-green-600 font-medium">File selected: {reportFile.name}</p>
                  <p className="text-sm text-gray-500 mt-1">Click or drag to replace</p>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600">Drag & drop your report file here or click to browse</p>
                  <p className="text-sm text-gray-500 mt-1">Supports PDF, DOC, DOCX, TXT</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="performance" className="block text-sm font-medium text-gray-700 mb-1">
              Overall Performance*
            </label>
            <select
              id="performance"
              name="performance"
              value={reportData.performance}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            >
              <option value="Excellent">Excellent</option>
              <option value="Very Good">Very Good</option>
              <option value="Good">Good</option>
              <option value="Satisfactory">Satisfactory</option>
              <option value="Needs Improvement">Needs Improvement</option>
              <option value="Unsatisfactory">Unsatisfactory</option>
            </select>
          </div>

          {/* Attendance Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Attendance & Punctuality
            </label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleRatingChange('attendanceRating', rating)}
                  className={`w-10 h-10 rounded-full focus:outline-none transition-colors duration-200 ${
                    reportData.attendanceRating >= rating 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Development Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills Development
            </label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleRatingChange('skillsRating', rating)}
                  className={`w-10 h-10 rounded-full focus:outline-none transition-colors duration-200 ${
                    reportData.skillsRating >= rating 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>

          {/* Attitude & Professionalism Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Attitude & Professionalism
            </label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleRatingChange('attitudeRating', rating)}
                  className={`w-10 h-10 rounded-full focus:outline-none transition-colors duration-200 ${
                    reportData.attitudeRating >= rating 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
              Comments & Feedback
            </label>
            <textarea
              id="comments"
              name="comments"
              value={reportData.comments}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Provide detailed feedback about the student's performance, strengths, areas for improvement, etc."
            ></textarea>
          </div>

          <div>
            <label htmlFor="recommendation" className="block text-sm font-medium text-gray-700 mb-1">
              Recommendation
            </label>
            <select
              id="recommendation"
              name="recommendation"
              value={reportData.recommendation}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="Highly Recommended">Highly Recommended</option>
              <option value="Recommended">Recommended</option>
              <option value="Recommended with Reservations">Recommended with Reservations</option>
              <option value="Not Recommended">Not Recommended</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !reportFile}
              className={`bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300 flex items-center ${
                !reportFile ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitReportModal;