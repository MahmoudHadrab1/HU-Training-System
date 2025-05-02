import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentDetailView from './StudentDetailView';
import DepartmentNavbar from './DepartmentNavbar';

const DepartmentHeadDashboard = () => {
  const navigate = useNavigate();
  
  // State for animation and content
  const [isLoaded, setIsLoaded] = useState(false);
  const [filterState, setFilterState] = useState('ALL');
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  
  // Mock student data with complete information for each student
  const mockStudents = [
    { 
      id: '2139754201', 
      name: 'Ahmed Ali', 
      state: 'In Training', 
      company: 'Tech Solutions', 
      companyId: 'CS123', 
      trainingTitle: 'Web Development' 
    },
    { 
      id: '2139754202', 
      name: 'Sarah Khan', 
      state: 'Not Started', 
      company: 'DataViz Corp', 
      companyId: 'DV456', 
      trainingTitle: 'Data Analysis' 
    },
    { 
      id: '2139754203', 
      name: 'Omar Hassan', 
      state: 'Completed', 
      company: 'Cloud Systems', 
      companyId: 'CS789', 
      trainingTitle: 'Cloud Infrastructure' 
    },
    { 
      id: '2139754204', 
      name: 'Layla Mahmoud', 
      state: 'Waiting For Approval', 
      company: 'Mobile Apps Inc', 
      companyId: 'MA101', 
      trainingTitle: 'Mobile Development' 
    },
    { 
      id: '2139754205', 
      name: 'Yousef Nader', 
      state: 'In Training', 
      company: 'AI Solutions', 
      companyId: 'AI202', 
      trainingTitle: 'Machine Learning' 
    },
    { 
      id: '2139754206', 
      name: 'Nora Salem', 
      state: 'Not Started', 
      company: 'Cyber Security Ltd', 
      companyId: 'CS303', 
      trainingTitle: 'Network Security' 
    },
  ];
  
  // Mock company posts data
  const companyPosts = [
    { id: 1, companyName: 'Tech Solutions', fieldOfWork: 'Software Development', trainingTitle: 'Full-stack Development', location: 'On-site', period: '8 Weeks', endDate: '15/07/2025' },
    { id: 2, companyName: 'DataViz Corp', fieldOfWork: 'Data Science', trainingTitle: 'Data Visualization', location: 'Remote', period: '6 Weeks', endDate: '20/08/2025' },
    { id: 3, companyName: 'Cloud Systems', fieldOfWork: 'Cloud Computing', trainingTitle: 'AWS Architecture', location: 'Hybrid', period: '8 Weeks', endDate: '10/09/2025' },
    { id: 4, companyName: 'Mobile Apps Inc', fieldOfWork: 'Mobile Development', trainingTitle: 'iOS App Development', location: 'On-site', period: '6 Weeks', endDate: '05/08/2025' },
  ];

  useEffect(() => {
    // Check authentication status
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    
    if (!isAuthenticated || userRole !== 'department') {
      // Redirect to login if not authenticated
      navigate('/login/department');
      return;
    }
    
    // Filter students based on selected state
    if (filterState === 'ALL') {
      setStudents(mockStudents);
    } else {
      setStudents(mockStudents.filter(student => student.state === filterState));
    }
    
    // Animation delay
    setTimeout(() => setIsLoaded(true), 100);
  }, [filterState, navigate]);

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

  // Handle document upload
  const handleUploadDocument = (studentId) => {
    alert("The training document has been successfully sent to the company");
  };
  
  // Handle logout
  const handleLogout = () => {
    // Clear authentication data from localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    
    // Navigate to home page
    navigate('/');
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
          {/* Use the updated DepartmentNavbar component */}
          <DepartmentNavbar 
            onLogout={handleLogout}
          />
          
          {/* Main content */}
          <div className="container mx-auto px-4 py-8">
            {/* Welcome header section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Welcome, Dr. Mohammad Al-Hassan</h1>
              <p className="text-gray-600 mt-1">Manage your students' training progress and approve their applications</p>
            </div>
            
            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button 
                onClick={() => handleFilterChange('ALL')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  filterState === 'ALL' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => handleFilterChange('In Training')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  filterState === 'In Training' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                In Training
              </button>
              <button 
                onClick={() => handleFilterChange('Not Started')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  filterState === 'Not Started' 
                    ? 'bg-gray-100 text-gray-800' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Not Started
              </button>
              <button 
                onClick={() => handleFilterChange('Completed')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  filterState === 'Completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Completed
              </button>
              <button 
                onClick={() => handleFilterChange('Waiting For Approval')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  filterState === 'Waiting For Approval' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Waiting For Approval
              </button>
            </div>
            
            {/* Student cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map((student) => (
                <div 
                  key={student.id} 
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                >
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
        </>
      )}
    </div>
  );
};

export default DepartmentHeadDashboard;