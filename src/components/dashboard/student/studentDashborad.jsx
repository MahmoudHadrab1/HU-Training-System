import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

// Import components
import TrainingCard from './TrainingCard';
import TrainingModal from './TrainingModal';
import Navbar from './Navbar';
import InternshipTable from './InternshipTable';
import ReportUploader from './ReportUploader';

const StudentDashboard = ({ setActivePage }) => {
  // State for the component
  const [isLoaded, setIsLoaded] = useState(false);
  const [activePageTab, setActivePageTab] = useState('training');
  const [reportFile, setReportFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  // Training posts related state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  
  // Sample training posts data
  const trainingPosts = [
    {
      id: 1,
      company: "TechInnovate Solutions",
      fieldOfWork: "Software Development",
      title: "Software Engineering Internship",
      location: "Remote",
      duration: "8 Weeks",
      endDate: "August 15, 2025",
      description: "Join our team to develop cutting-edge software solutions and gain hands-on experience in real-world projects. You'll work closely with senior engineers on developing new features, fixing bugs, and improving our product.",
      logoUrl: "https://source.unsplash.com/random/100x100?logo&tech=1",
      email: "careers@techinnovate.com",
      phone: "+1 (555) 123-4567",
      address: "123 Tech Avenue, Silicon Valley"
    },
    {
      id: 2,
      company: "DataDrive Analytics",
      fieldOfWork: "Data Science",
      title: "Data Analysis Internship",
      location: "Hybrid",
      duration: "6 Weeks",
      endDate: "July 30, 2025",
      description: "Learn how to analyze large datasets and translate findings into actionable business insights. Our internship program gives you the opportunity to work on real data science projects while learning from our experienced team.",
      logoUrl: "https://source.unsplash.com/random/100x100?logo&data=1",
      email: "internships@datadrive.com",
      phone: "+1 (555) 987-6543",
      address: "456 Analytics Blvd, Data City"
    },
    {
      id: 3,
      company: "CreativeMinds Design",
      fieldOfWork: "UI/UX Design",
      title: "User Experience Design Internship",
      location: "On-site",
      duration: "8 Weeks",
      endDate: "September 1, 2025",
      description: "Design intuitive user interfaces and improve the user experience of our digital products. Work alongside our design team to create beautiful, functional interfaces that solve real user problems.",
      logoUrl: "https://source.unsplash.com/random/100x100?logo&design=1",
      email: "design@creativeminds.com",
      phone: "+1 (555) 234-5678",
      address: "789 Design District, Creative City"
    }
  ];
  
  // Sample applications data
  const applications = [
    {
      id: 1,
      companyName: "TechInnovate Solutions",
      trainingTitle: "Software Engineering Internship",
      dateApplied: "March 15, 2025",
      status: "Approved"
    },
    {
      id: 2,
      companyName: "DataDrive Analytics",
      trainingTitle: "Data Analysis Internship",
      dateApplied: "March 16, 2025",
      status: "Rejected"
    },
    {
      id: 3,
      companyName: "CloudTech Solutions",
      trainingTitle: "Cloud Infrastructure Internship",
      dateApplied: "March 14, 2025",
      status: "Pending"
    }
  ];
  
  // Set loaded state after component mounts to trigger animations
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 200);
  }, []);
  
  // Filter posts based on search query and active filter
  const filteredPosts = trainingPosts.filter(post => {
    // Apply search filter
    const matchesSearch = searchQuery === '' || 
      post.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.fieldOfWork.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply category filter
    const matchesFilter = 
      activeFilter === 'All' || 
      post.location === activeFilter ||
      post.fieldOfWork === activeFilter;
    
    return matchesSearch && matchesFilter;
  });
  
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
  
  // Handle opening training details modal - renamed from handleViewTrainingDetails
  const handleViewInfo = (training) => {
    setSelectedTraining(training);
    setIsModalOpen(true);
    setApplicationSubmitted(false);
  };
  
  // Handle application submission from modal
  const handleSubmitApplication = () => {
    // In a real app, this would send the application to the backend
    setTimeout(() => {
      setApplicationSubmitted(true);
      
      // Auto close after a delay
      setTimeout(() => {
        setIsModalOpen(false);
      }, 3000);
    }, 500);
  };
  
  // Handle logout
  const handleLogout = () => {
    setActivePage('login');
  };

  return (
    <div className={`min-h-screen bg-gray-50 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header with navigation component */}
      <Navbar 
        activePage={activePageTab} 
        setActivePage={setActivePageTab} 
        onLogout={handleLogout} 
      />
      
      {/* Main Content - with top padding to account for fixed navbar */}
      <div className="container mx-auto px-6 pt-8 pb-8">
        {/* Training Posts */}
        {activePageTab === 'training' && (
          <div className={`transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold mb-0">Training Posts</h2>
              
              <div className="w-full md:w-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-full md:w-64"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </div>
            </div>
            
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['All', 'Remote', 'On-site', 'Hybrid'].map((filter) => (
                <button 
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    activeFilter === filter 
                      ? 'bg-red-600 text-white' 
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Training Posts Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <TrainingCard 
                    key={post.id}
                    post={post}
                    onDetailsClick={() => handleViewInfo(post)} // Changed function name to match the change from "Apply Now" to "View Info"
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-600">No training posts match your search criteria. Try adjusting your filters.</p>
              </div>
            )}
            
            {/* Pagination section removed as requested */}
          </div>
        )}
        
        {/* Internship Applications */}
        {activePageTab === 'internship' && (
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
              
              {/* Applications Table */}
              <InternshipTable applications={applications} />
            </div>
          </div>
        )}
        
        {/* Report Submission */}
        {activePageTab === 'report' && (
          <div className={`transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-2xl font-bold mb-6">Submit Report</h2>
            
            <ReportUploader
              file={reportFile}
              isUploading={isUploading}
              onFileUpload={handleFileChange}
              onSubmitReport={handleReportSubmit}
            />
            
            {uploadSuccess && (
              <div className="mt-4 bg-green-100 text-green-800 p-4 rounded-md flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Report submitted successfully!
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Training Modal */}
      {isModalOpen && selectedTraining && (
        <TrainingModal 
          training={selectedTraining}
          onClose={() => setIsModalOpen(false)}
          onApply={handleSubmitApplication}
          applicationSubmitted={applicationSubmitted}
        />
      )}     
    </div>
  );
};

export default StudentDashboard;