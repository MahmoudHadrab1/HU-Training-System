import React, { useState, useRef } from "react";
import { X, ArrowRight, Upload } from "lucide-react";

const TrainingModal = ({ training, onClose, onApply, applicationSubmitted }) => {
  const [selectedCV, setSelectedCV] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  if (!training) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || e;
    if (file) {
      setSelectedCV(file);
    }
  };

  const handleApply = () => {
    if (!selectedCV) {
      alert("Please attach your CV before applying");
      return;
    }

    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      onApply();
    }, 1000);
  };

  // Drag & Drop handlers
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
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      // Check if file is PDF, DOC, or DOCX
      const fileType = file.name.split('.').pop().toLowerCase();
      if (['pdf', 'doc', 'docx'].includes(fileType)) {
        setSelectedCV(file);
      } else {
        alert("Please upload a PDF, DOC, or DOCX file");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Company info */}
        <div className="flex items-center mb-2">
          {training.logoUrl ? (
            <img 
              src={training.logoUrl} 
              alt={`${training.company} logo`} 
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold mr-3">
              {training.company.charAt(0)}
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold text-gray-800">{training.company}</h2>
            <p className="text-sm text-gray-600">{training.fieldOfWork}</p>
          </div>
        </div>
        
        {/* Training title */}
        <h3 className="text-lg font-semibold text-gray-700 mb-4">{training.title}</h3>
        
        {/* Description */}
        <p className="text-gray-600 mb-4">{training.description}</p>
        
        {/* Details */}
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span className="inline-flex items-center">
            <svg className="w-4 h-4 mr-1 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {training.location}
          </span>
          <span className="mx-2">•</span>
          <span className="inline-flex items-center">
            <svg className="w-4 h-4 mr-1 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {training.duration}
          </span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <svg className="w-4 h-4 mr-1 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          End Date: {training.endDate}
        </div>
        
        {/* Contact Information */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-2">Contact Information</h4>
          <p className="text-sm text-gray-600">Email: {training.email}</p>
          <p className="text-sm text-gray-600">Address: {training.address}</p>
          <p className="text-sm text-gray-600">Phone: {training.phone}</p>
        </div>
        
        {/* Application section */}
        {applicationSubmitted ? (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-md p-4 text-center">
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p>Application submitted successfully!</p>
            <p className="font-medium mt-1">Thank you for your interest!</p>
          </div>
        ) : (
          <>
            {/* CV Upload Section - with drag & drop */}
            <div 
              className={`border-2 border-dashed ${isDragging ? 'border-red-400 bg-red-50' : 'border-gray-300'} 
                        rounded-lg p-6 text-center mb-4 transition-colors duration-200`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                ref={fileInputRef}
                id="cv-upload"
                className="hidden"
                onChange={(e) => handleFileChange(e)}
                accept=".pdf,.doc,.docx"
              />
              <label 
                htmlFor="cv-upload" 
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-gray-600 font-medium">
                  {isDragging ? 'Drop your CV here' : 'Attach your CV (required)'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Drag & drop or click to upload • PDF, DOC, DOCX
                </p>
              </label>
              
              {selectedCV && (
                <div className="mt-3 text-sm text-green-600 flex items-center justify-center">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {selectedCV.name} selected
                </div>
              )}
            </div>
            
            <div className="flex justify-end">
              <button 
                onClick={handleApply}
                disabled={isUploading || !selectedCV}
                className={`${!selectedCV ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'} 
                           text-white px-5 py-2 rounded-md transition-colors flex items-center`}
              >
                {isUploading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 mr-2 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  <>
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TrainingModal;