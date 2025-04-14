import React, { useState, useEffect } from 'react';
import { ChevronDown, FileText, Briefcase, Home, ExternalLink, Upload, Check, X, ArrowRight } from 'lucide-react';

const StudentDashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activePage, setActivePage] = useState('training');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [reportFile, setReportFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [filter, setFilter] = useState('all');
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  
  // Mock data for training posts
  const trainingPosts = [
    {
      id: 1,
      company: "TechInnovate Solutions",
      fieldOfWork: "Software Development",
      title: "Software Engineering Internship",
      location: "Remote",
      duration: "8 Weeks",
      endDate: "August 15, 2025",
      description: "Join our team to develop cutting-edge software solutions and gain hands-on experience in real-world projects.",
      email: "careers@techinnovate.com",
      address: "123 Tech Avenue, Silicon Valley",
      phone: "+1 (555) 123-4567"
    },
    {
      id: 2,
      company: "DataDrive Analytics",
      fieldOfWork: "Data Science",
      title: "Data Analysis Internship",
      location: "Hybrid",
      duration: "6 Weeks",
      endDate: "July 30, 2025",
      description: "Learn how to analyze large datasets and translate findings into actionable business insights.",
      email: "internships@datadrive.com",
      address: "456 Analytics Blvd, Data City",
      phone: "+1 (555) 987-6543"
    },
    {
      id: 3,
      company: "CreativeMinds Design",
      fieldOfWork: "UI/UX Design",
      title: "User Experience Design Internship",
      location: "On-site",
      duration: "8 Weeks",
      endDate: "September 1, 2025",
      description: "Design intuitive user interfaces and improve the user experience of our digital products.",
      email: "design@creativeminds.com",
      address: "789 Design District, Creative City",
      phone: "+1 (555) 234-5678"
    },
    {
      id: 4,
      company: "CloudTech Solutions",
      fieldOfWork: "Cloud Computing",
      title: "Cloud Infrastructure Internship",
      location: "Remote",
      duration: "6 Weeks",
      endDate: "August 20, 2025",
      description: "Learn to design, deploy and maintain cloud-based infrastructure for enterprise applications.",
      email: "cloud@cloudtech.com",
      address: "101 Cloud Lane, Tech Park",
      phone: "+1 (555) 345-6789"
    },
    {
      id: 5,
      company: "FinTech Innovations",
      fieldOfWork: "Financial Technology",
      title: "Financial Software Development",
      location: "Hybrid",
      duration: "8 Weeks",
      endDate: "September 15, 2025",
      description: "Develop software solutions for the finance industry while learning about financial systems.",
      email: "dev@fintechinnovations.com",
      address: "222 Finance Street, Money District",
      phone: "+1 (555) 456-7890"
    },
    {
      id: 6,
      company: "EcoTech Solutions",
      fieldOfWork: "Environmental Technology",
      title: "Green Technology Internship",
      location: "On-site",
      duration: "6 Weeks",
      endDate: "July 25, 2025",
      description: "Work on innovative technologies that help businesses reduce their environmental impact.",
      email: "green@ecotech.com",
      address: "333 Green Avenue, Eco Park",
      phone: "+1 (555) 567-8901"
    }
  ];
  
  // Mock data for applications
  const applications = [
    {
      id: 1,
      company: "TechInnovate Solutions",
      title: "Software Engineering Internship",
      status: "Approved"
    },
    {
      id: 2,
      company: "DataDrive Analytics",
      title: "Data Analysis Internship",
      status: "Rejected"
    },
    {
      id: 3,
      company: "CloudTech Solutions",
      title: "Cloud Infrastructure Internship",
      status: "Under Review"
    }
  ];
  
  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoaded(true), 100);
  }, []);
  
  // Filter applications based on status
  const filteredApplications = filter === 'all' 
    ? applications 
    : applications.filter(app => app.status.toLowerCase().replace(' ', '') === filter);
  
  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setReportFile(e.target.files[0]);
    }
  };
  
  // Handle report submission
  const handleReportSubmit = () => {
    if (!reportFile) return;
    
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      
      // Reset after showing success message
      setTimeout(() => {
        setUploadSuccess(false);
        setReportFile(null);
      }, 3000);
    }, 2000);
  };
  
  // Handle sending application to department head
  const handleSendToDepartmentHead = () => {
    setShowApprovalModal(true);
    
    // Simulate processing
    setTimeout(() => {
      setShowApprovalModal(false);
      // Update the application status in a real app
    }, 2000);
  };
  
  // Open training details modal
  const handleViewTrainingDetails = (training) => {
    setSelectedTraining(training);
    setShowTrainingModal(true);
  };
  
  // Handle applying for training
  const handleApplyForTraining = () => {
    setApplicationSubmitted(true);
    
    // Reset after showing confirmation
    setTimeout(() => {
      setShowTrainingModal(false);
      setApplicationSubmitted(false);
    }, 3000);
  };
  
  return (
    <div className={`min-h-screen bg-gray-50 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header - Student Name and Navigation */}
      <div className="bg-white border-b shadow-sm py-2">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center">
            <span className="font-bold text-xl">
              <span className="text-red-600 mr-1">HU-</span>
              Tech Train
            </span>
          </div>
          
          <nav className="flex items-center space-x-6">
            <button 
              onClick={() => setActivePage('training')}
              className={`flex items-center relative px-2 py-1 transition-colors duration-300 ${
                activePage === 'training' ? 'text-red-600 font-medium' : 'hover:text-red-600'
              }`}
            >
              <Home className="w-4 h-4 mr-1" />
              Home Page
              <span 
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform transition-transform duration-300 ${
                  activePage === 'training' ? 'scale-x-100' : 'scale-x-0'
                }`}
              ></span>
            </button>
            
            <button 
              onClick={() => setActivePage('internship')}
              className={`flex items-center relative px-2 py-1 transition-colors duration-300 ${
                activePage === 'internship' ? 'text-red-600 font-medium' : 'hover:text-red-600'
              }`}
            >
              <Briefcase className="w-4 h-4 mr-1" />
              Your Internship
              <span 
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform transition-transform duration-300 ${
                  activePage === 'internship' ? 'scale-x-100' : 'scale-x-0'
                }`}
              ></span>
            </button>
            
            <button 
              onClick={() => setActivePage('report')}
              className={`flex items-center relative px-2 py-1 transition-colors duration-300 ${
                activePage === 'report' ? 'text-red-600 font-medium' : 'hover:text-red-600'
              }`}
            >
              <FileText className="w-4 h-4 mr-1" />
              Submit Report
              <span 
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform transition-transform duration-300 ${
                  activePage === 'report' ? 'scale-x-100' : 'scale-x-0'
                }`}
              ></span>
            </button>
            
            <button 
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md text-gray-700 transition-colors duration-300"
            >
              Log Out
            </button>
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Training Posts */}
        {activePage === 'training' && (
          <div className={`transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-2xl font-bold mb-6">Training Posts</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trainingPosts.map((post, index) => (
                <div 
                  key={post.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg text-gray-800">{post.company}</h3>
                      <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded">{post.fieldOfWork}</span>
                    </div>
                    <h4 className="font-semibold text-gray-700 mb-2">{post.title}</h4>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <span>{post.location}</span>
                      <span className="mx-2">•</span>
                      <span>{post.duration}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">End Date: {post.endDate}</p>
                    
                    <button
                      onClick={() => handleViewTrainingDetails(post)}
                      className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors duration-300 flex items-center justify-center"
                    >
                      More Info
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-8 space-x-2">
              <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-300">
                Previous Page
              </button>
              <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-300">
                Next Page
              </button>
            </div>
          </div>
        )}
        
        {/* Internship Applications */}
        {activePage === 'internship' && (
          <div className={`transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-2xl font-bold mb-4">Your Internship</h2>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <p className="text-gray-700 mb-4">
                Here you can track the status of the internship applications you submitted to companies.
                This page will be updated with any changes.
              </p>
              <p className="text-gray-700 mb-6">
                You must select one approved internship and send it to the department head for final approval.
              </p>
              
              {/* Filter */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">State:</label>
                <select 
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="all">All</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="underreview">Under Review</option>
                </select>
              </div>
              
              {/* Applications List */}
              {filteredApplications.length > 0 ? (
                <div className="space-y-4">
                  {filteredApplications.map(application => (
                    <div 
                      key={application.id}
                      className="border border-gray-200 rounded-lg p-4 transition-all duration-300 hover:border-gray-300 hover:shadow-sm"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold text-gray-800">{application.company}</h3>
                          <p className="text-gray-600">{application.title}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className={`
                            px-3 py-1 rounded-full text-sm font-medium
                            ${application.status === 'Approved' ? 'bg-green-100 text-green-800' :
                              application.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'}
                          `}>
                            {application.status}
                          </div>
                          
                          {application.status === 'Approved' && (
                            <button
                              onClick={() => handleSendToDepartmentHead()}
                              className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-sm transition-colors duration-300"
                            >
                              Send to department head
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">No applications found with the selected filter.</p>
              )}
            </div>
          </div>
        )}
        
        {/* Report Submission */}
        {activePage === 'report' && (
          <div className={`transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-2xl font-bold mb-6">Submit Report</h2>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-700 mb-6">
                Congratulations on completing your internship! Please provide the department head with information about 
                your training, your experience and what you learned during this period.
              </p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
                <input
                  type="file"
                  id="reportUpload"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                />
                <label 
                  htmlFor="reportUpload" 
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="w-12 h-12 text-gray-400 mb-3" />
                  <p className="text-gray-600">
                    {reportFile ? `Selected: ${reportFile.name}` : 'Upload Report'}
                  </p>
                </label>
              </div>
              
              <button
                onClick={handleReportSubmit}
                disabled={!reportFile || isUploading || uploadSuccess}
                className={`
                  w-full py-3 px-4 rounded-md flex items-center justify-center font-medium
                  ${isUploading || !reportFile ? 'bg-gray-400 cursor-not-allowed' : 
                    uploadSuccess ? 'bg-green-600' : 'bg-red-600 hover:bg-red-700'}
                  text-white transition-colors duration-300
                `}
              >
                {isUploading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : uploadSuccess ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Report Submitted Successfully
                  </>
                ) : (
                  'Submit Report'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Training Details Modal */}
      {showTrainingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 animate-scale-in">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800">{selectedTraining?.company}</h3>
              <button 
                onClick={() => setShowTrainingModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <h4 className="text-lg font-medium text-gray-700 mb-4">{selectedTraining?.title}</h4>
            
            <div className="mb-4">
              <p className="text-gray-600 mb-2">{selectedTraining?.description}</p>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <span className="font-medium mr-2">Location:</span>
                <span>{selectedTraining?.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <span className="font-medium mr-2">Duration:</span>
                <span>{selectedTraining?.duration}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <span className="font-medium mr-2">Email:</span>
                <span>{selectedTraining?.email}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <span className="font-medium mr-2">Address:</span>
                <span>{selectedTraining?.address}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <span className="font-medium mr-2">Phone:</span>
                <span>{selectedTraining?.phone}</span>
              </div>
            </div>
            
            {applicationSubmitted ? (
              <div className="bg-green-50 border border-green-200 text-green-700 rounded-md p-4 text-center">
                <Check className="w-5 h-5 mx-auto mb-2" />
                <p>Our team will review your information, and we will get back to you soon with an update.</p>
                <p className="font-medium mt-1">Thank you for your interest!</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600">
                  We are delighted to welcome ambitious students eager to join our exceptional training programs.
                  If you're interested in applying, please share your CV.
                </p>
                
                <div className="flex items-center justify-between">
                  <button 
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors duration-300"
                  >
                    Open File
                  </button>
                  
                  <button
                    onClick={handleApplyForTraining}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-300 flex items-center"
                  >
                    Submit For Training
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Approval Confirmation Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 text-center animate-scale-in">
            <Check className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Congratulations!</h3>
            <p className="text-gray-600 mb-6">
              Your request has been sent to the department head for final approval.
            </p>
            
            <div className="animate-pulse">
              <svg className="animate-spin h-5 w-5 mx-auto" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
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

export default StudentDashboard;