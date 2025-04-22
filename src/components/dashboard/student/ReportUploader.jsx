import React, { useState, useRef } from 'react';
import { Upload, Check, Send, Download, ChevronLeft, ChevronRight, X } from 'lucide-react';

const ReportUploader = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    // Page 1 Fields
    studentName: '',
    studentId: '',
    email: '',
    position: '',
    trainingPeriod: '',
    companyName: '',
    companyAddress: '',
    onSiteSupervisorName: '',
    onSiteSupervisorContact: '',
    trainingLocationType: [],
    trainingApplicationType: [],
    trainingCompensationType: '',
    tasksAndResponsibilities: '',
    
    // Page 1 Student Outcomes
    analyticalProblemSolving: '',
    writtenCommunication: '',
    verbalCommunication: '',
    leadershipTeamwork: '',
    ethicalResponsibility: '',
    lifelongLearning: '',
    informationTechnologyPerspective: '',
    computerSkills: '',
    stateOfArtTechnologies: '',
    
    // Page 2 Fields
    handsOnActivities: '',
    overallSatisfaction: '',
    likedAspects: '',
    dislikedAspects: '',
    recommendToOtherStudents: '',
    additionalComments: ''
  });

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setCurrentPage(1);
      } else {
        alert('Please select a valid PDF file');
      }
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle checkbox groups
    if (type === 'checkbox') {
      setFormData(prev => {
        const currentValues = prev[name] || [];
        if (checked) {
          return { ...prev, [name]: [...currentValues, value] };
        } else {
          return { 
            ...prev, 
            [name]: currentValues.filter(item => item !== value) 
          };
        }
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle radio button changes
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit the report
  const handleSubmitReport = async () => {
    if (!file) {
      alert('Please upload a PDF file first');
      return;
    }

    setIsUploading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsUploading(false);
      setSubmitSuccess(true);
      
      // Reset after showing success message
      setTimeout(() => {
        setSubmitSuccess(false);
        setFile(null);
        setFormData({
          studentName: '',
          studentId: '',
          email: '',
          position: '',
          trainingPeriod: '',
          companyName: '',
          companyAddress: '',
          onSiteSupervisorName: '',
          onSiteSupervisorContact: '',
          trainingLocationType: [],
          trainingApplicationType: [],
          trainingCompensationType: '',
          tasksAndResponsibilities: '',
          analyticalProblemSolving: '',
          writtenCommunication: '',
          verbalCommunication: '',
          leadershipTeamwork: '',
          ethicalResponsibility: '',
          lifelongLearning: '',
          informationTechnologyPerspective: '',
          computerSkills: '',
          stateOfArtTechnologies: '',
          handsOnActivities: '',
          overallSatisfaction: '',
          likedAspects: '',
          dislikedAspects: '',
          recommendToOtherStudents: '',
          additionalComments: ''
        });
        
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 3000);
    }, 2000);
  };

  // Download the original PDF
  const handleDownloadPdf = () => {
    if (!file) {
      alert('No file uploaded');
      return;
    }

    const downloadUrl = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = file.name;
    link.click();
    
    // Clean up
    URL.revokeObjectURL(downloadUrl);
  };

  // Render current page of form
  const renderFormContent = () => {
    if (currentPage === 1) {
      return (
        <div className="space-y-6">
          {/* Student Information Section */}
          <div>
            <h4 className="font-medium text-gray-700 mb-4">Student Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                placeholder="Name of Student"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                placeholder="ID"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="E-mail"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                placeholder="Position"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Company Information Section */}
          <div>
            <h4 className="font-medium text-gray-700 mb-4">Training Organization</h4>
            <div className="space-y-4">
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Name and Address of Trainer Organization"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                name="onSiteSupervisorName"
                value={formData.onSiteSupervisorName}
                onChange={handleInputChange}
                placeholder="Name of On-site Supervisor"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                name="onSiteSupervisorContact"
                value={formData.onSiteSupervisorContact}
                onChange={handleInputChange}
                placeholder="Contact Info of On-site Supervisor"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Training Location Section */}
          <div>
            <h4 className="font-medium text-gray-700 mb-4">Training Details</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">How did you locate the training?</label>
                <div className="flex space-x-4">
                  {['College', 'University', 'Personal contact', 'Other'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input 
                        type="checkbox" 
                        name="trainingLocationType"
                        value={type}
                        checked={formData.trainingLocationType.includes(type)}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Training Application/Acceptance Process</label>
                <div className="flex space-x-4">
                  {['Online', 'Postal Mail', 'Interview', 'Other'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input 
                        type="checkbox" 
                        name="trainingApplicationType"
                        value={type}
                        checked={formData.trainingApplicationType.includes(type)}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Compensation for the Training</label>
                <div className="flex space-x-4">
                  {['Remunerated', 'Not Remunerated'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input 
                        type="radio" 
                        name="trainingCompensationType"
                        value={type}
                        checked={formData.trainingCompensationType === type}
                        onChange={handleRadioChange}
                        className="mr-2"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              <textarea
                name="tasksAndResponsibilities"
                value={formData.tasksAndResponsibilities}
                onChange={handleInputChange}
                placeholder="Describe briefly the main tasks and responsibilities you had during the training"
                className="w-full border border-gray-300 rounded px-3 py-2 h-24"
              ></textarea>
            </div>
          </div>
        </div>
      );
    }

    if (currentPage === 2) {
      return (
        <div className="space-y-6">
          {/* Student Outcomes Section */}
          <div>
            <h4 className="font-medium text-gray-700 mb-4">Student Outcomes</h4>
            <div className="space-y-4">
              {[
                { name: 'analyticalProblemSolving', label: 'This training helped me improve my analytical problem solving skills (1,2)' },
                { name: 'writtenCommunication', label: 'This training helped me improve my written communication skills (3)' },
                { name: 'verbalCommunication', label: 'This training helped me improve my verbal communication skills (3)' },
                { name: 'leadershipTeamwork', label: 'This training helped me improve my leadership skills and ability to work in a team (5)' },
                { name: 'ethicalResponsibility', label: 'This training helped me understand ethical responsibility (4)' },
                { name: 'lifelongLearning', label: 'This training helped me improve my ability for lifelong learning (1,2)' },
                { name: 'informationTechnologyPerspective', label: 'This training helped me gain a realistic prospective of Information Technology (6)' },
                { name: 'computerSkills', label: 'This training helped me improve my necessary computer skills (6)' },
                { name: 'stateOfArtTechnologies', label: 'The training allowed me to be exposed to state-of-art technologies (6)' },
                { name: 'handsOnActivities', label: 'The training allowed me to be involved in hands-on activities (3,5)' },
                { name: 'overallSatisfaction', label: 'Overall, I am satisfied with my training' }
              ].map((item) => (
                <div key={item.name} className="grid grid-cols-1 md:grid-cols-6 items-center">
                  <span className="md:col-span-4 text-sm text-gray-700">{item.label}</span>
                  <div className="md:col-span-2 flex space-x-2 justify-around">
                    {['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'].map((rating, index) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="radio"
                          name={item.name}
                          value={rating}
                          checked={formData[item.name] === rating}
                          onChange={handleRadioChange}
                          className="mr-1"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback Section */}
          <div>
            <h4 className="font-medium text-gray-700 mb-4">Feedback</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">What did you like during the training?</label>
                <textarea
                  name="likedAspects"
                  value={formData.likedAspects}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 h-24"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">What did you not like during the training?</label>
                <textarea
                  name="dislikedAspects"
                  value={formData.dislikedAspects}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 h-24"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Would you recommend this organization to future students?</label>
                <div className="flex space-x-4">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="recommendToOtherStudents"
                        value={option}
                        checked={formData.recommendToOtherStudents === option}
                        onChange={handleRadioChange}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Additional Comments (if any):</label>
                <textarea
                  name="additionalComments"
                  value={formData.additionalComments}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 h-24"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-md p-6 space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
        <p>
          Congratulations on completing your internship! Please upload the evaluation form 
          provided by the Hashemite University and fill out the necessary details.
        </p>
      </div>
      
      {!file ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input
            type="file"
            className="hidden"
            id="report-upload"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="application/pdf"
          />
          <label
            htmlFor="report-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <Upload className="w-12 h-12 text-gray-400 mb-4" />
            <p className="mb-2 text-lg">
              Drag & Drop or Click to Upload Evaluation Form
            </p>
            <p className="text-sm text-gray-500">
              Only PDF files are accepted
            </p>
          </label>
        </div>
      ) : (
        <div className="space-y-6">
          {/* PDF Viewer and File Info */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* PDF Viewer */}
            <div className="bg-gray-100 rounded-lg overflow-hidden border">
              <div className="bg-gray-200 p-2 flex justify-between items-center">
                <span className="text-sm text-gray-700">PDF Preview (Page {currentPage}/2)</span>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="p-1 rounded-full hover:bg-gray-300 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setCurrentPage(2)}
                    disabled={currentPage === 2}
                    className="p-1 rounded-full hover:bg-gray-300 disabled:opacity-50"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleDownloadPdf}
                    className="p-1 rounded-full hover:bg-gray-300"
                    title="Download PDF"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => {
                      setFile(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                    className="p-1 rounded-full hover:bg-gray-300"
                    title="Remove PDF"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-4 h-[500px]">
                <object 
                  data={URL.createObjectURL(file) + `#page=${currentPage}`} 
                  type="application/pdf" 
                  width="100%" 
                  height="100%"
                  className="w-full h-full"
                >
                  <p>Your browser doesn't support PDF viewing. 
                    <a href={URL.createObjectURL(file)} download>Download the PDF</a> instead.</p>
                </object>
              </div>
            </div>

            {/* Form Content */}
            <div className="bg-gray-50 p-6 rounded-lg overflow-y-auto max-h-[600px]">
              {renderFormContent()}
            </div>
          </div>

          {/* Navigation and Submit Buttons */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
              >
                Previous Page
              </button>
              <button 
                onClick={() => setCurrentPage(Math.min(2, currentPage + 1))}
                disabled={currentPage === 2}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
              >
                Next Page
              </button>
            </div>

            <button
              onClick={handleSubmitReport}
              disabled={isUploading || submitSuccess}
              className={`flex items-center justify-center px-6 py-3 rounded-lg transition-colors ${
                isUploading || submitSuccess
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {isUploading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Uploading...
                </>
              ) : submitSuccess ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Submitted!
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Submit Report
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportUploader;