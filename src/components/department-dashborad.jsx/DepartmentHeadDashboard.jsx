import React, { useState, useEffect } from 'react';
import StudentDetailView from './StudentDetailView';

const DepartmentHeadDashboard = ({ setActivePage }) => {
  // State for animation and content
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('allStudents');
  const [filterState, setFilterState] = useState('ALL');
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  
  // Mock student data
  const mockStudents = [
    { id: '2139754201', name: 'Ahmed Ali', state: 'In Training', company: 'Tech Solutions', companyId: 'CS123', trainingTitle: 'Web Development' },
    { id: '2139754202', name: 'Sarah Khan', state: 'Not Started', company: 'DataViz Corp', companyId: 'DV456', trainingTitle: 'Data Analysis' },
    { id: '2139754203', name: 'Omar Hassan', state: 'Completed', company: 'Cloud Systems', companyId: 'CS789', trainingTitle: 'Cloud Infrastructure' },
    { id: '2139754204', name: 'Layla Mahmoud', state: 'Waiting For Approval', company: 'Mobile Apps Inc', companyId: 'MA101', trainingTitle: 'Mobile Development' },
    { id: '2139754205', name: 'Yousef Nader', state: 'In Training', company: 'AI Solutions', companyId: 'AI202', trainingTitle: 'Machine Learning' },
    { id: '2139754206', name: 'Nora Salem', state: 'Not Started', company: 'Cyber Security Ltd', companyId: 'CS303', trainingTitle: 'Network Security' },
  ];
  
  // Mock company posts data
  const companyPosts = [
    { id: 1, companyName: 'Tech Solutions', fieldOfWork: 'Software Development', trainingTitle: 'Full-stack Development', location: 'On-site', period: '8 Weeks', endDate: '15/07/2025' },
    { id: 2, companyName: 'DataViz Corp', fieldOfWork: 'Data Science', trainingTitle: 'Data Visualization', location: 'Remote', period: '6 Weeks', endDate: '20/08/2025' },
    { id: 3, companyName: 'Cloud Systems', fieldOfWork: 'Cloud Computing', trainingTitle: 'AWS Architecture', location: 'Hybrid', period: '8 Weeks', endDate: '10/09/2025' },
    { id: 4, companyName: 'Mobile Apps Inc', fieldOfWork: 'Mobile Development', trainingTitle: 'iOS App Development', location: 'On-site', period: '6 Weeks', endDate: '05/08/2025' },
  ];

  useEffect(() => {
    // Filter students based on selected state
    if (filterState === 'ALL') {
      setStudents(mockStudents);
    } else {
      setStudents(mockStudents.filter(student => student.state === filterState));
    }
    
    // Animation delay
    setTimeout(() => setIsLoaded(true), 100);
  }, [filterState]);

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Handle student filter change
  const handleFilterChange = (state) => {
    setFilterState(state);
  };

  // Handle student info view
  const handleViewStudentInfo = (studentId) => {
    setSelectedStudentId(studentId);
  };
  
  // Handle back from student detail
  const handleBackFromStudentDetail = () => {
    setSelectedStudentId(null);
  };

  // Handle company post actions
  const handlePostAction = (postId, action) => {
    console.log(`${action} post: ${postId}`);
    alert(`Your decision regarding the ${action === 'accept' ? 'acceptance' : 'rejection'} of the company post has been recorded. The company team will receive the update soon.`);
  };

  // Handle document upload
  const handleUploadDocument = (studentId) => {
    console.log(`Uploading document for student: ${studentId}`);
    alert("The training document has been successfully sent to the company");
  };

  // Render the main dashboard content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'allStudents':
        return (
          <div className={`transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-4 flex flex-wrap gap-2">
              <button 
                onClick={() => handleFilterChange('ALL')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${filterState === 'ALL' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                All
              </button>
              <button 
                onClick={() => handleFilterChange('In Training')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${filterState === 'In Training' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                In Training
              </button>
              <button 
                onClick={() => handleFilterChange('Not Started')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${filterState === 'Not Started' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Not Started
              </button>
              <button 
                onClick={() => handleFilterChange('Completed')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${filterState === 'Completed' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Completed
              </button>
              <button 
                onClick={() => handleFilterChange('Waiting For Approval')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${filterState === 'Waiting For Approval' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Waiting For Approval
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {students.map((student) => (
                <div key={student.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{student.name}</h3>
                      <p className="text-gray-600">ID: {student.id}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium
                      ${student.state === 'In Training' ? 'bg-blue-100 text-blue-800' : 
                        student.state === 'Not Started' ? 'bg-gray-100 text-gray-800' :
                        student.state === 'Completed' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'}`}
                    >
                      {student.state}
                    </div>
                  </div>
                  
                  {student.state !== 'Not Started' && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Company:</span> {student.company}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Training:</span> {student.trainingTitle}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                    <button 
                      onClick={() => handleViewStudentInfo(student.id)}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm transition-colors duration-300"
                    >
                      View Information
                    </button>
                    
                    {student.state === 'Waiting For Approval' && (
                      <button 
                        onClick={() => handleUploadDocument(student.id)}
                        className="ml-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition-colors duration-300"
                      >
                        Send Documents
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'companiesPosts':
        return (
          <div className={`transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-6">
              <p className="text-gray-700 font-medium mb-4">
                Please note that all company posts will appear here for review and to decide whether to approve or reject them
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {companyPosts.map((post) => (
                <div key={post.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-800">{post.companyName}</h3>
                    <p className="text-gray-600 text-sm">{post.fieldOfWork}</p>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-md font-medium text-gray-700">{post.trainingTitle}</p>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </span>
                        {post.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </span>
                        {post.period}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 col-span-2">
                        <span className="mr-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                        End Date: {post.endDate}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handlePostAction(post.id, 'accept')}
                      className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors duration-300"
                    >
                      Accept
                    </button>
                    <button 
                      onClick={() => handlePostAction(post.id, 'reject')}
                      className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors duration-300"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        return <div>No content available</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {selectedStudentId ? (
        <StudentDetailView 
          studentId={selectedStudentId} 
          onBack={handleBackFromStudentDetail} 
        />
      ) : (
        <>
          {/* Header with user info */}
          <div className={`bg-white shadow-md transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold mr-3">
                    DH
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-800">Department Head Dashboard</h1>
                    <p className="text-sm text-gray-600">Welcome Dr. Mohammad Al-Hassan</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setActivePage('home')}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md text-sm font-medium transition-colors duration-300"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="container mx-auto px-4 py-8">
            {/* Tab navigation */}
            <div className={`flex border-b border-gray-300 mb-8 transition-all duration-500 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <button
                className={`py-4 px-6 font-medium relative transition duration-300 ${
                  activeTab === 'allStudents'
                    ? 'text-red-600 font-semibold'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => handleTabChange('allStudents')}
              >
                All Students
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform transition-transform duration-300 ${
                    activeTab === 'allStudents' ? 'scale-x-100' : 'scale-x-0'
                  }`}
                ></span>
              </button>
              <button
                className={`py-4 px-6 font-medium relative transition duration-300 ${
                  activeTab === 'companiesPosts'
                    ? 'text-red-600 font-semibold'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => handleTabChange('companiesPosts')}
              >
                Companies Posts
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform transition-transform duration-300 ${
                    activeTab === 'companiesPosts' ? 'scale-x-100' : 'scale-x-0'
                  }`}
                ></span>
              </button>
            </div>
            
            {/* Tab content */}
            {renderTabContent()}
          </div>
        </>
      )}
    </div>
  );
};

export default DepartmentHeadDashboard;