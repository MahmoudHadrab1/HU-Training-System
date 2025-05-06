import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import CompanyNavbar from './CompanyNavbar';
import CreatePostModal from './CreatePostModal';
import EditPostModal from './EditPostModal';
import SubmitReportModal from './CompanyFinalReportModal';
import ViewCVModal from './ViewCVModal';
import ConfirmationModal from './confirmationModal';
import WeeklyActivityReport from './WeeklyActivityReport';
import authService from '../../../services/authService'; // Import the auth service

const CompanyDashboard = () => {
  const navigate = useNavigate();
  
  // State management for active tab and data
  const [activeTab, setActiveTab] = useState('posts');
  const [isLoaded, setIsLoaded] = useState(false);
  const [trainingPosts, setTrainingPosts] = useState([]);
  const [studentApplications, setStudentApplications] = useState([]);
  const [completedReports, setCompletedReports] = useState([]);
  const [companyProfile, setCompanyProfile] = useState({
    companyName: '',
    fieldOfWork: '',
    companyLocation: '',
    phoneNumber: '',
    email: '',
    logo: null
  });

  // State for modals
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isSubmitReportModalOpen, setIsSubmitReportModalOpen] = useState(false);
  const [isViewCVModalOpen, setIsViewCVModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [confirmationAction, setConfirmationAction] = useState({
    title: '',
    message: '',
    type: '',
    confirmText: '',
    onConfirm: () => {}
  });

  // State for profile updates
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);



 



  useEffect(() => {
    // Check authentication 4/5/2025
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userRole = localStorage.getItem('userRole');
    const companyId = localStorage.getItem('currentCompanyId');
    if (!isAuthenticated || userRole !== 'company') {
      // Redirect to login if not authenticated as company 4/5/2025
      navigate('/login/company');
      return;
    }
    
    // Load company profile data 4/5/2025
    const loadedProfile = authService.getCompanyProfile();
    if (loadedProfile) {
      setCompanyProfile(loadedProfile);
    }
    
    // Load saved posts from localStorage  5/5/25
  //const savedPosts = localStorage.getItem('trainingPosts');
  const savedPosts = JSON.parse(localStorage.getItem(`trainingPosts_${companyId}`)) || [];//6/5/25
setTrainingPosts(savedPosts);//6/5/25

 // if (savedPosts) {
  //  try {
   //   setTrainingPosts(JSON.parse(savedPosts));
  //  } catch (error) {
  //    console.error("Error parsing saved posts:", error);
 //   }
  //}
    // Load demo data
    setTimeout(() => {
      //setTrainingPosts(demoTrainingPosts);
      //setStudentApplications(demoStudentApplications);
      //setCompletedReports(demoCompletedReports);
      setIsLoaded(true);
    }, 500);
  }, []);
  
  // Handle creating a new training post
  const handleCreatePost = (postData) => {
    const companyId = localStorage.getItem('currentCompanyId'); // مهم
    const newPost = {
      id: trainingPosts.length + 1,
      ...postData,
      companyId, // 👈 أضف هذا السطر
      status: 'Active', // Posts are now active by default without approval
      applicantsCount: 0
    };
// Update state with the new post 5/5/25
const updatedPosts = [newPost, ...trainingPosts];
setTrainingPosts(updatedPosts);

localStorage.setItem(`trainingPosts_${companyId}`, JSON.stringify(updatedPosts)); //6/5/25
// Store in localStorage for persistence across page refreshes
   // localStorage.setItem('trainingPosts', JSON.stringify(updatedPosts));
    //setTrainingPosts([newPost, ...trainingPosts]);
    alert(`Training post "${postData.title}" has been created successfully.`);
  };

  const handleEditPost = (post) => {
    const transformedPost = {
      ...post,
      _id: post.id // <== add _id
    };
    setSelectedPost(transformedPost);
    setIsEditPostModalOpen(true);
  };
  

  // Handle saving edited post
  const handleSaveEditedPost = (updatedPostFromBackend) => {
    const updatedPosts = trainingPosts.map(post => {
      const postId = post._id || post.id;
      const updatedId = updatedPostFromBackend._id || updatedPostFromBackend.id;
  
      if (postId === updatedId) {
        return {
          ...post,
          ...updatedPostFromBackend,
          id: updatedPostFromBackend._id || updatedPostFromBackend.id, // normalize
          _id: updatedPostFromBackend._id || updatedPostFromBackend.id // normalize
        };
      }
      return post;
    });
  
    setTrainingPosts(updatedPosts);
    const companyId = localStorage.getItem('currentCompanyId'); //6/5/25
    localStorage.setItem(`trainingPosts_${companyId}`, JSON.stringify(updatedPosts));//6/5/25
    
    // Add this line to persist the changes to localStorage 5/5/25
  //localStorage.setItem('trainingPosts', JSON.stringify(updatedPosts));
    alert(`Training post "${updatedPostFromBackend.title}" has been updated successfully.`);
  };
  

  // Handle profile update 4/5/2025
  const handleProfileUpdate = async () => {
    try {
      // Show loading state
      setIsProfileUpdated(false);
      setIsSubmitting(true);
      
      // Update the profile in the service (which will call the API)
      await authService.updateCompanyProfile(companyProfile);
      
      // Show the success message
      setIsSubmitting(false);
      setIsProfileUpdated(true);
      setTimeout(() => {
        setIsProfileUpdated(false);
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setIsSubmitting(false);
      // Show error message to user
      alert(`Failed to update profile: ${error.message || 'Unknown error'}`);
    }
  };

  // Handle file upload for company logo 4/5/2025
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Update local state
        setCompanyProfile({
          ...companyProfile,
          logo: reader.result
        });
        
        // Update in localStorage via service
        authService.updateCompanyProfile({
          logo: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };
  // Handle deleting a post
  const handleDeletePost = (post) => {
    setSelectedPost(post);
    setConfirmationAction({
      title: 'Delete Training Post?',
      message: `Are you sure you want to delete "${post.title}"? This action cannot be undone.`,
      type: 'danger',
      confirmText: 'Delete',
      onConfirm: () => {
        const updatedPosts = trainingPosts.filter(p => p.id !== post.id);
        setTrainingPosts(updatedPosts);
        alert(`Training post "${post.title}" has been deleted successfully.`);
      }
    });
    setIsConfirmationModalOpen(true);
  };

  // Handle student application approval
  const handleApproveStudent = (application) => {
    setSelectedStudent(application);
    setConfirmationAction({
      title: 'Approve Student Application?',
      message: `Are you sure you want to approve ${application.studentName}'s application for "${application.trainingTitle}"?`,
      type: 'success',
      confirmText: 'Approve',
      onConfirm: () => {
        const updatedApplications = studentApplications.map(app => {
          if (app.id === application.id) {
            return { ...app, status: 'Approved' };
          }
          return app;
        });
        setStudentApplications(updatedApplications);
      }
    });
    setIsConfirmationModalOpen(true);
  };

  // Handle student application rejection
  const handleRejectStudent = (application) => {
    setSelectedStudent(application);
    setConfirmationAction({
      title: 'Reject Student Application?',
      message: `Are you sure you want to reject ${application.studentName}'s application for "${application.trainingTitle}"?`,
      type: 'danger',
      confirmText: 'Reject',
      onConfirm: () => {
        const updatedApplications = studentApplications.map(app => {
          if (app.id === application.id) {
            return { ...app, status: 'Rejected' };
          }
          return app;
        });
        setStudentApplications(updatedApplications);
      }
    });
    setIsConfirmationModalOpen(true);
  };

  // Handle opening CV modal
  const handleViewCV = (student) => {
    setSelectedStudent(student);
    setIsViewCVModalOpen(true);
  };

  // Handle opening submit report modal
  const handleOpenReportModal = (student) => {
    setSelectedStudent(student);
    setIsSubmitReportModalOpen(true);
  };

  // Handle submitting a report
  const handleSubmitReport = (reportData) => {
    const newReport = {
      id: completedReports.length + 1,
      ...reportData
    };
    
    setCompletedReports([newReport, ...completedReports]);
    alert(`Report for ${reportData.studentName} submitted successfully!`);
  };

  /* // Handle profile update
  const handleProfileUpdate = () => {
    setIsProfileUpdated(true);
    setTimeout(() => {
      setIsProfileUpdated(false);
    }, 3000);
    alert('Company profile updated successfully!');
  };

  // Handle file upload for company logo
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyProfile({
          ...companyProfile,
          logo: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }; */
  
  // Handle logout with Router
  const handleLogout = () => {
    // Navigate to home page
    navigate('/');
  };



// Render the profile tab content
  const renderProfileTab = () => (
    <div className={`space-y-6 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Company Profile</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Logo Upload Section */}
            <div className="md:col-span-1">
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden mb-4">
                  {companyProfile.logo ? (
                    <img 
                      src={companyProfile.logo} 
                      alt="Company Logo" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <label 
                  htmlFor="logo-upload" 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm py-2 px-4 rounded-lg transition-colors duration-300 cursor-pointer"
                >
                  Upload Logo
                </label>
                <input 
                  id="logo-upload" 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
              </div>
            </div>
            
            {/* Profile Form */}
            <div className="md:col-span-2">
              <form className="space-y-4">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    value={companyProfile.companyName}
                    onChange={(e) => setCompanyProfile({...companyProfile, companyName: e.target.value})}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="fieldOfWork" className="block text-sm font-medium text-gray-700 mb-1">
                    Field of Work
                  </label>
                  <input
                    type="text"
                    id="fieldOfWork"
                    value={companyProfile.fieldOfWork}
                    onChange={(e) => setCompanyProfile({...companyProfile, fieldOfWork: e.target.value})}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="companyLocation" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Location
                  </label>
                  <input
                    type="text"
                    id="companyLocation"
                    value={companyProfile.companyLocation}
                    onChange={(e) => setCompanyProfile({...companyProfile, companyLocation: e.target.value})}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={companyProfile.phoneNumber}
                    onChange={(e) => setCompanyProfile({...companyProfile, phoneNumber: e.target.value})}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={companyProfile.email}
                    onChange={(e) => setCompanyProfile({...companyProfile, email: e.target.value})}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleProfileUpdate}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md shadow-sm transition-colors duration-300"
                  >
                    Save Changes
                  </button>
                  
                  {isProfileUpdated && (
                    <span className="ml-3 text-green-600 font-medium animate-pulse">
                      Profile updated successfully!
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar Component */}
      <CompanyNavbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout}
        companyName={companyProfile.companyName} // Pass company name to navbar
      />
      
      {/* Dashboard Header - Welcome section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Welcome, {companyProfile.companyName}</h1>
              <p className="text-gray-600 mt-1">Manage your training posts and student applications</p>
            </div>
            {activeTab === 'posts' && (
              <button
                onClick={() => setIsCreatePostModalOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-300"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Training Post
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dynamic tab content based on activeTab state */}
        {activeTab === 'posts' && (
          <div className={`space-y-6 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            {/* Training Posts tab content */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-800">Your Training Posts</h2>
                <div className="text-sm text-gray-500">
                  Total: {trainingPosts.length} posts
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Period
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        End Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applicants
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {trainingPosts.length > 0 ? (
                      trainingPosts.map((post) => (
                        <tr key={post.id} className="transition-colors hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{post.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{post.location}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{post.period}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{post.endDate}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {post.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {post.applicantsCount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                              className="text-blue-600 hover:text-blue-900 mr-4 inline-flex items-center"
                              onClick={() => handleEditPost(post)}
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </button>
                            <button 
                              className="text-red-600 hover:text-red-900 inline-flex items-center"
                              onClick={() => handleDeletePost(post)}
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                          No training posts found. Create your first training post to get started.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {/* ... existing posts tab content ... */}
          </div>
        )}

        {activeTab === 'applications' && (
          <div className={`space-y-6 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            {/* Applications tab content */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-800">Student Applications</h2>
                <div className="text-sm text-gray-500">
                  Total: {studentApplications.length} applications
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Training
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applied On
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
                    {studentApplications.length > 0 ? (
                      studentApplications.map((application) => (
                        <tr key={application.id} className="transition-colors hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-gray-900">{application.studentName}</div>
                              <div className="ml-2 text-xs text-gray-500">(ID: {application.studentId})</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{application.trainingTitle}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{application.applicationDate}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${application.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                                application.status === 'Rejected' ? 'bg-red-100 text-red-800' : 
                                'bg-yellow-100 text-yellow-800'}`}>
                              {application.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                              className="text-blue-600 hover:text-blue-900 mr-3"
                              onClick={() => handleViewCV(application)}
                            >
                              View CV
                            </button>
                            {application.status === 'Pending' && (
                              <>
                                <button 
                                  className="text-green-600 hover:text-green-900 mr-3"
                                  onClick={() => handleApproveStudent(application)}
                                >
                                  Approve
                                </button>
                                <button 
                                  className="text-red-600 hover:text-red-900"
                                  onClick={() => handleRejectStudent(application)}
                                >
                                  Reject
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                          No student applications found. Applications will appear here once students apply to your training posts.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {/* ... existing applications tab content ... */}
          </div>
        )}

        {activeTab === 'reports' && (
          <div className={`space-y-6 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            {/* Reports tab content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white shadow rounded-lg overflow-hidden p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Training Reports</h2>
                
                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-gray-800 mb-3">Pending Reports</h3>
                    
                    <div className="space-y-4">
                      {studentApplications.filter(app => app.status === 'Approved').map((student) => (
                        <div key={student.id} className="bg-white p-4 rounded shadow-sm">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">{student.studentName}</p>
                              <p className="text-sm text-gray-500">{student.trainingTitle}</p>
                            </div>
                            <button 
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                              onClick={() => handleOpenReportModal(student)}
                            >
                              Submit Report
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      {studentApplications.filter(app => app.status === 'Approved').length === 0 && (
                        <div className="bg-white p-4 rounded shadow-sm text-center text-gray-500">
                          No pending reports. Reports will appear here once you approve student applications.
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-gray-800 mb-3">Completed Reports</h3>
                    
                    <div className="space-y-4">
                      {completedReports.map((report) => (
                        <div key={report.id} className="bg-white p-4 rounded shadow-sm">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">{report.studentName}</p>
                              <p className="text-sm text-gray-500">{report.trainingTitle}</p>
                              <p className="text-xs text-gray-400 mt-1">Submitted: {report.submissionDate}</p>
                            </div>
                            <div className="flex space-x-2">
                              <button 
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                onClick={() => alert(`View report functionality for ${report.studentName} would be implemented here`)}
                              >
                                View
                              </button>
                              <button 
                                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                                onClick={() => alert(`Edit report functionality for ${report.studentName} would be implemented here`)}
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {completedReports.length === 0 && (
                        <div className="bg-white p-4 rounded shadow-sm text-center text-gray-500">
                          No completed reports yet. They will appear here after you submit them.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <WeeklyActivityReport />
              </div>
            </div>
            {/* ... existing reports tab content ... */}
          </div>
        )}

        {activeTab === 'profile' && renderProfileTab()}
      </div>


      {/* Modals */}
      <CreatePostModal 
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        onSubmit={handleCreatePost}
      />
      
      {isEditPostModalOpen && selectedPost && (
        <EditPostModal 
          isOpen={isEditPostModalOpen}
          post={selectedPost}
          onClose={() => setIsEditPostModalOpen(false)}
          onSubmit={handleSaveEditedPost}
        />
      )}
      
      <ConfirmationModal 
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={confirmationAction.onConfirm}
        title={confirmationAction.title}
        message={confirmationAction.message}
        confirmText={confirmationAction.confirmText}
        type={confirmationAction.type}
      />
      
      <SubmitReportModal 
        isOpen={isSubmitReportModalOpen}
        onClose={() => setIsSubmitReportModalOpen(false)}
        onSubmit={handleSubmitReport}
        student={selectedStudent?.studentName}
        trainingTitle={selectedStudent?.trainingTitle}
      />
      
      <ViewCVModal 
        isOpen={isViewCVModalOpen}
        onClose={() => setIsViewCVModalOpen(false)}
        student={selectedStudent}
      />
    </div>
  );
};

export default CompanyDashboard;