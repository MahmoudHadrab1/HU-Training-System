import React, { useState, useEffect } from 'react';

const StudentDetailView = ({ studentId, onBack }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [student, setStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const [reports, setReports] = useState([]);
  
  // Mock data for students with proper document structure, including separate reports
  const mockStudentData = {
    '2139754201': {
      id: '2139754201',
      name: 'Ahmed Ali',
      state: 'In Training',
      department: 'Computer Science',
      year: '3rd Year',
      gpa: '3.8',
      email: 'ahmed.ali@students.hu.edu.jo',
      phone: '+962 77 1234567',
      company: {
        name: 'Tech Solutions',
        id: 'CS123',
        trainingTitle: 'Web Development',
        location: 'Amman, Jordan',
        duration: '8 Weeks',
        startDate: '01/06/2025',
        endDate: '31/07/2025'
      },
      activityReports: [
        { id: 1, title: 'Week 1 Progress', date: '08/06/2025', status: 'Completed', submittedBy: 'Sarah Manager' },
        { id: 2, title: 'Week 2 Progress', date: '15/06/2025', status: 'Completed', submittedBy: 'Sarah Manager' },
      ],
      documents: {
        officialTrainingDocument: {
          status: true,
          date: '30/05/2025',
          filename: 'ahmed_ali_official_training_doc.pdf'
        },
        approvalFiles: {
          status: true,
          date: '02/06/2025',
          filename: 'ahmed_ali_approval.pdf'
        },
        studentFinalReport: {
          status: false,
          date: '',
          filename: ''
        },
        companyFinalReport: {
          status: false,
          date: '',
          filename: ''
        }
      }
    },
    '2139754202': {
      id: '2139754202',
      name: 'Sarah Khan',
      state: 'Not Started',
      department: 'Information Technology',
      year: '2nd Year',
      gpa: '3.5',
      email: 'sarah.khan@students.hu.edu.jo',
      phone: '+962 78 9876543',
      company: {
        name: 'DataViz Corp',
        id: 'DV456',
        trainingTitle: 'Data Analysis',
        location: 'Amman, Jordan',
        duration: '6 Weeks',
        startDate: 'Pending',
        endDate: 'Pending'
      },
      activityReports: [],
      documents: {
        officialTrainingDocument: {
          status: false,
          date: '',
          filename: ''
        },
        approvalFiles: {
          status: false,
          date: '',
          filename: ''
        },
        studentFinalReport: {
          status: false,
          date: '',
          filename: ''
        },
        companyFinalReport: {
          status: false,
          date: '',
          filename: ''
        }
      }
    },
    '2139754203': {
      id: '2139754203',
      name: 'Omar Hassan',
      state: 'Completed',
      department: 'Software Engineering',
      year: '4th Year',
      gpa: '3.7',
      email: 'omar.hassan@students.hu.edu.jo',
      phone: '+962 79 1122334',
      company: {
        name: 'Cloud Systems',
        id: 'CS789',
        trainingTitle: 'Cloud Infrastructure',
        location: 'Remote',
        duration: '10 Weeks',
        startDate: '15/01/2025',
        endDate: '30/03/2025'
      },
      activityReports: [
        { id: 1, title: 'Week 1 Progress', date: '22/01/2025', status: 'Completed', submittedBy: 'Ali Director' },
        { id: 2, title: 'Week 2 Progress', date: '29/01/2025', status: 'Completed', submittedBy: 'Ali Director' },
        { id: 3, title: 'Week 3 Progress', date: '05/02/2025', status: 'Completed', submittedBy: 'Ali Director' },
        { id: 4, title: 'Week 4 Progress', date: '12/02/2025', status: 'Completed', submittedBy: 'Ali Director' },
        { id: 5, title: 'Mid-term Evaluation', date: '19/02/2025', status: 'Completed', submittedBy: 'Mohammad Supervisor' },
        { id: 6, title: 'Week 6 Progress', date: '26/02/2025', status: 'Completed', submittedBy: 'Ali Director' },
        { id: 7, title: 'Week 7 Progress', date: '05/03/2025', status: 'Completed', submittedBy: 'Ali Director' },
        { id: 8, title: 'Week 8 Progress', date: '12/03/2025', status: 'Completed', submittedBy: 'Ali Director' },
        { id: 9, title: 'Week 9 Progress', date: '19/03/2025', status: 'Completed', submittedBy: 'Ali Director' },
        { id: 10, title: 'Final Evaluation', date: '30/03/2025', status: 'Completed', submittedBy: 'Mohammad Supervisor' },
      ],
      documents: {
        officialTrainingDocument: {
          status: true,
          date: '10/01/2025',
          filename: 'omar_hassan_official_training_doc.pdf'
        },
        approvalFiles: {
          status: true,
          date: '12/01/2025',
          filename: 'omar_hassan_approval.pdf'
        },
        studentFinalReport: {
          status: true,
          date: '31/03/2025',
          filename: 'omar_hassan_student_final_report.pdf'
        },
        companyFinalReport: {
          status: true,
          date: '31/03/2025',
          filename: 'omar_hassan_company_final_report.pdf'
        }
      }
    },
    '2139754204': {
      id: '2139754204',
      name: 'Layla Mahmoud',
      state: 'Waiting For Approval',
      department: 'Computer Science',
      year: '3rd Year',
      gpa: '3.8',
      email: 'layla.m@students.hu.edu.jo',
      phone: '+962 77 1234567',
      company: {
        name: 'Mobile Apps Inc',
        id: 'MA101',
        trainingTitle: 'Mobile Development',
        location: 'Amman, Jordan',
        duration: '8 Weeks',
        startDate: '01/06/2025',
        endDate: '31/07/2025'
      },
      activityReports: [],
      documents: {
        officialTrainingDocument: {
          status: false,
          date: '',
          filename: ''
        },
        approvalFiles: {
          status: false,
          date: '',
          filename: ''
        },
        studentFinalReport: {
          status: false,
          date: '',
          filename: ''
        },
        companyFinalReport: {
          status: false,
          date: '',
          filename: ''
        }
      }
    },
    '2139754205': {
      id: '2139754205',
      name: 'Yousef Nader',
      state: 'In Training',
      department: 'Computer Engineering',
      year: '4th Year',
      gpa: '3.9',
      email: 'yousef.n@students.hu.edu.jo',
      phone: '+962 79 9876543',
      company: {
        name: 'AI Solutions',
        id: 'AI202',
        trainingTitle: 'Machine Learning',
        location: 'Irbid, Jordan',
        duration: '10 Weeks',
        startDate: '15/05/2025',
        endDate: '25/07/2025'
      },
      activityReports: [
        { id: 1, title: 'Week 1 Progress', date: '22/05/2025', status: 'Completed', submittedBy: 'Noor Manager' },
        { id: 2, title: 'Week 2 Progress', date: '29/05/2025', status: 'Completed', submittedBy: 'Noor Manager' },
        { id: 3, title: 'Week 3 Progress', date: '05/06/2025', status: 'Completed', submittedBy: 'Noor Manager' },
        { id: 4, title: 'Week 4 Progress', date: '12/06/2025', status: 'Completed', submittedBy: 'Noor Manager' },
        { id: 5, title: 'Mid-term Evaluation', date: '19/06/2025', status: 'In Progress', submittedBy: 'Pending' },
      ],
      documents: {
        officialTrainingDocument: {
          status: true,
          date: '10/05/2025',
          filename: 'yousef_nader_official_training_doc.pdf'
        },
        approvalFiles: {
          status: true,
          date: '12/05/2025',
          filename: 'yousef_nader_approval.pdf'
        },
        studentFinalReport: {
          status: false,
          date: '',
          filename: ''
        },
        companyFinalReport: {
          status: false,
          date: '',
          filename: ''
        }
      }
    },
    '2139754206': {
      id: '2139754206',
      name: 'Nora Salem',
      state: 'Not Started',
      department: 'Cybersecurity',
      year: '3rd Year',
      gpa: '3.6',
      email: 'nora.s@students.hu.edu.jo',
      phone: '+962 77 5556667',
      company: {
        name: 'Cyber Security Ltd',
        id: 'CS303',
        trainingTitle: 'Network Security',
        location: 'Amman, Jordan',
        duration: '8 Weeks',
        startDate: 'Pending',
        endDate: 'Pending'
      },
      activityReports: [],
      documents: {
        officialTrainingDocument: {
          status: false,
          date: '',
          filename: ''
        },
        approvalFiles: {
          status: false,
          date: '',
          filename: ''
        },
        studentFinalReport: {
          status: false,
          date: '',
          filename: ''
        },
        companyFinalReport: {
          status: false,
          date: '',
          filename: ''
        }
      }
    }
  };
  
  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      // Look up student by ID from the mockStudentData object
      const studentData = mockStudentData[studentId];
      
      if (studentData) {
        console.log(`Loading student data for ID: ${studentId}, Name: ${studentData.name}`);
        
        // Ensure all required document properties exist
        const safeStudentData = {
          ...studentData,
          documents: {
            officialTrainingDocument: studentData.documents?.officialTrainingDocument || { status: false, date: '', filename: '' },
            approvalFiles: studentData.documents?.approvalFiles || { status: false, date: '', filename: '' },
            studentFinalReport: studentData.documents?.studentFinalReport || { status: false, date: '', filename: '' },
            companyFinalReport: studentData.documents?.companyFinalReport || { status: false, date: '', filename: '' }
          }
        };
        
        setStudent(safeStudentData);
        
        // Set reports data if available
        if (studentData.activityReports && studentData.activityReports.length > 0) {
          setReports(studentData.activityReports);
        }
      } else {
        console.error(`Student with ID ${studentId} not found`);
        // Don't set a default student - keep it null to show "not found" message
      }
      
      setIsLoaded(true);
    }, 500);
  }, [studentId]); // Only re-run when studentId changes
  
  // Safety function to check document status
  const getDocumentStatus = (docType) => {
    try {
      return student?.documents?.[docType]?.status || false;
    } catch (err) {
      console.error(`Error accessing document status for ${docType}:`, err);
      return false;
    }
  };
  
  // Safety function to get document date
  const getDocumentDate = (docType) => {
    try {
      return student?.documents?.[docType]?.date || '';
    } catch (err) {
      console.error(`Error accessing document date for ${docType}:`, err);
      return '';
    }
  };
  
  // Handle document upload
  const handleDocumentUpload = (docType) => {
    // In a real app, this would handle file upload
    alert(`The ${docType} has been successfully sent to the company`);
    
    // Update the student document status with safety checks
    setStudent(prev => {
      if (!prev || !prev.documents) return prev;
      
      return {
        ...prev,
        documents: {
          ...prev.documents,
          [docType]: {
            ...(prev.documents[docType] || {}),
            status: true,
            date: new Date().toLocaleDateString('en-GB').replace(/\//g, '/')
          }
        }
      };
    });
  };
  
  // Handle view document with safety checks
  const handleViewDocument = (docType) => {
    // In a real app, this would open the document
    alert(`Viewing ${docType} for ${student?.name || 'student'}`);
  };
  
  // Handle view report with safety checks
  const handleViewReport = (reportId) => {
    // In a real app, this would open the report
    alert(`Viewing report ID: ${reportId} for ${student?.name || 'student'}`);
  };
  
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }
  
  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800">Student not found</h2>
          <p className="text-gray-600 mt-2">The requested student information (ID: {studentId}) is not available.</p>
          <button 
            onClick={onBack}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6 flex items-center">
          <button 
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Students
          </button>
        </div>
        
        {/* Student info header */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex items-start">
              <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center text-2xl font-bold mr-4">
                {student.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{student.name}</h1>
                <p className="text-gray-600">ID: {student.id}</p>
                <p className="text-gray-600">{student.department} • {student.year}</p>
                <div className="mt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium
                    ${student.state === 'In Training' ? 'bg-blue-100 text-blue-800' : 
                      student.state === 'Not Started' ? 'bg-gray-100 text-gray-800' :
                      student.state === 'Completed' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'}`}
                  >
                    {student.state}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="flex flex-col space-y-1">
                <p className="text-gray-600 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {student.email}
                </p>
                <p className="text-gray-600 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {student.phone}
                </p>
                <p className="text-gray-600 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  GPA: {student.gpa}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tab navigation */}
        <div className="flex border-b border-gray-300 mb-6">
          <button
            className={`py-3 px-4 mr-4 font-medium relative transition duration-300 ${
              activeTab === 'info' ? "text-red-600 font-semibold" : "text-gray-600 hover:text-red-600"
            }`}
            onClick={() => setActiveTab('info')}
          >
            Training Information
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform transition-transform duration-300 ${
                activeTab === 'info' ? "scale-x-100" : "scale-x-0"
              }`}
            ></span>
          </button>
          
          <button
            className={`py-3 px-4 font-medium relative transition duration-300 ${
              activeTab === 'documents' ? "text-red-600 font-semibold" : "text-gray-600 hover:text-red-600"
            }`}
            onClick={() => setActiveTab('documents')}
          >
            Documents & Reports
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform transition-transform duration-300 ${
                activeTab === 'documents' ? "scale-x-100" : "scale-x-0"
              }`}
            ></span>
          </button>
          
          <button
            className={`py-3 px-4 font-medium relative transition duration-300 ${
              activeTab === 'activityReports' ? "text-red-600 font-semibold" : "text-gray-600 hover:text-red-600"
            }`}
            onClick={() => setActiveTab('activityReports')}
          >
            Activity Reports
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform transition-transform duration-300 ${
                activeTab === 'activityReports' ? "scale-x-100" : "scale-x-0"
              }`}
            ></span>
          </button>
        </div>
        
        {/* Tab content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === 'info' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">Training Information</h2>
              
              {student.state === 'Not Started' ? (
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-700">This student has not started any training yet.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">Company Details</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-gray-800 font-medium">{student.company?.name || 'N/A'}</p>
                        <p className="text-gray-600 text-sm">ID: {student.company?.id || 'N/A'}</p>
                        <p className="text-gray-600 mt-2">{student.company?.location || 'N/A'}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">Training Program</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-gray-800 font-medium">{student.company?.trainingTitle || 'N/A'}</p>
                        <p className="text-gray-600 mt-2">Duration: {student.company?.duration || 'N/A'}</p>
                        <div className="flex justify-between mt-2">
                          <p className="text-gray-600 text-sm">Start: {student.company?.startDate || 'N/A'}</p>
                          <p className="text-gray-600 text-sm">End: {student.company?.endDate || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {student.state === 'Waiting For Approval' && (
                    <div className="mt-6 bg-yellow-50 p-4 rounded-md">
                      <div className="flex items-start">
                        <div className="bg-yellow-100 p-2 rounded-full">
                          <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="font-semibold text-yellow-800">Waiting for Approval</h3>
                          <p className="text-yellow-700 mt-1">
                            This student is waiting for the official training document to be sent to the company to complete their procedures.
                          </p>
                          <button
                            onClick={() => handleDocumentUpload('officialTrainingDocument')}
                            className="mt-3 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
                          >
                            Send Official Training Document
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {student.state === 'In Training' && (
                    <div className="mt-6 bg-blue-50 p-4 rounded-md">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="font-semibold text-blue-800">Training in Progress</h3>
                          <p className="text-blue-700 mt-1">
                            This student is currently undergoing training at the company. You can review their activity reports in the Activity Reports tab.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {student.state === 'Completed' && (
                    <div className="mt-6 bg-green-50 p-4 rounded-md">
                      <div className="flex items-start">
                        <div className="bg-green-100 p-2 rounded-full">
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="font-semibold text-green-800">Training Completed</h3>
                          <p className="text-green-700 mt-1">
                            This student has successfully completed their training program. You can view their final reports in the Documents & Reports tab.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
          
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">Documents & Reports</h2>
              
              {student.state === 'Not Started' ? (
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-700">No documents available as the student has not started any training yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Official Training Document - Combined document */}
                    <div className="border border-gray-200 rounded-md p-4">
                      <h3 className="font-semibold text-gray-700 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Official Training Document
                      </h3>
                      <div className="mt-3 flex items-center justify-between">
                        <div>
                          {getDocumentStatus('officialTrainingDocument') ? (
                            <div className="flex items-center">
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-sm mr-3">Sent</span>
                              <span className="text-sm text-gray-600">Date: {getDocumentDate('officialTrainingDocument')}</span>
                            </div>
                          ) : (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">Not sent</span>
                          )}
                        </div>
                        
                        <div>
                          {getDocumentStatus('officialTrainingDocument') ? (
                            <button
                              onClick={() => handleViewDocument('officialTrainingDocument')}
                              className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                            >
                              View
                            </button>
                          ) : (
                            <button
                              onClick={() => handleDocumentUpload('officialTrainingDocument')}
                              className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                              Send Document
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Approval Files - For both In Training and Completed states */}
                    {(student.state === 'In Training' || student.state === 'Completed' || student.state === 'Waiting For Approval') && (
                      <div className="border border-gray-200 rounded-md p-4">
                        <h3 className="font-semibold text-gray-700 flex items-center">
                          <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Approval Files
                        </h3>
                        <div className="mt-3 flex items-center justify-between">
                          <div>
                            {getDocumentStatus('approvalFiles') ? (
                              <div className="flex items-center">
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-sm mr-3">Received</span>
                                <span className="text-sm text-gray-600">Date: {getDocumentDate('approvalFiles')}</span>
                              </div>
                            ) : (
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">Not available</span>
                            )}
                          </div>
                          
                          <div>
                            {getDocumentStatus('approvalFiles') ? (
                              <button
                                onClick={() => handleViewDocument('approvalFiles')}
                                className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                              >
                                View
                              </button>
                            ) : (
                              <button
                                onClick={() => handleDocumentUpload('approvalFiles')}
                                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                              >
                                Send Document
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Student Final Report - Only for Completed/In Training states */}
                    {(student.state === 'Completed' || student.state === 'In Training') && (
                      <div className="border border-gray-200 rounded-md p-4">
                        <h3 className="font-semibold text-gray-700 flex items-center">
                          <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Student Final Report
                        </h3>
                        <div className="mt-3 flex items-center justify-between">
                          <div>
                            {getDocumentStatus('studentFinalReport') ? (
                              <div className="flex items-center">
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-sm mr-3">Submitted</span>
                                <span className="text-sm text-gray-600">Date: {getDocumentDate('studentFinalReport')}</span>
                              </div>
                            ) : (
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">Not submitted</span>
                            )}
                          </div>
                          
                          <div>
                            {getDocumentStatus('studentFinalReport') ? (
                              <button
                                onClick={() => handleViewDocument('studentFinalReport')}
                                className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                              >
                                View
                              </button>
                            ) : (
                              <span className="text-sm text-gray-500 italic">Awaiting submission</span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Company Final Report - Only for Completed/In Training states */}
                    {(student.state === 'Completed' || student.state === 'In Training') && (
                      <div className="border border-gray-200 rounded-md p-4">
                        <h3 className="font-semibold text-gray-700 flex items-center">
                          <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Company Final Report
                        </h3>
                        <div className="mt-3 flex items-center justify-between">
                          <div>
                            {getDocumentStatus('companyFinalReport') ? (
                              <div className="flex items-center">
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-sm mr-3">Submitted</span>
                                <span className="text-sm text-gray-600">Date: {getDocumentDate('companyFinalReport')}</span>
                              </div>
                            ) : (
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">Not submitted</span>
                            )}
                          </div>
                          
                          <div>
                            {getDocumentStatus('companyFinalReport') ? (
                              <button
                                onClick={() => handleViewDocument('companyFinalReport')}
                                className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                              >
                                View
                              </button>
                            ) : (
                              <span className="text-sm text-gray-500 italic">Awaiting submission</span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Document information box - Only for states requiring documents */}
                  {(student.state === 'Waiting For Approval' || student.state === 'In Training') && (
                    <div className="mt-6 bg-blue-50 p-4 rounded-md">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="font-semibold text-blue-800">Document Information</h3>
                          <p className="text-blue-700 mt-1">
                            {student.state === 'Waiting For Approval' 
                              ? "The student is waiting for the official training document to be sent to the company. Please send the necessary document to proceed with the internship."
                              : "The student's internship is in progress. You can send or view any required documents from this section. Final reports will be submitted at the end of the internship."}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Final reports info box - Only for Completed state */}
                  {student.state === 'Completed' && (
                    <div className="mt-6 bg-green-50 p-4 rounded-md">
                      <div className="flex items-start">
                        <div className="bg-green-100 p-2 rounded-full">
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="font-semibold text-green-800">Final Reports Information</h3>
                          <p className="text-green-700 mt-1">
                            Both the student and the company are required to submit final reports at the end of the internship. 
                            These reports help evaluate the success of the internship and provide valuable feedback for future improvements.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'activityReports' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">Activity Reports</h2>
              
              {student.state === 'Not Started' ? (
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-700">No activity reports available as the student has not started any training yet.</p>
                </div>
              ) : reports.length === 0 ? (
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-700">No activity reports have been submitted by the company yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted By</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reports.map((report) => (
                        <tr key={report.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{report.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{report.date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              report.status === 'Completed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {report.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{report.submittedBy}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {report.status === 'Completed' ? (
                              <button
                                onClick={() => handleViewReport(report.id)}
                                className="text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors"
                              >
                                View Report
                              </button>
                            ) : (
                              <span className="text-gray-400">Pending</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              {/* Information box for department head */}
              {(student.state === 'In Training' || student.state === 'Completed') && (
                <div className="mt-6 bg-blue-50 p-4 rounded-md">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-blue-800">About Activity Reports</h3>
                      <p className="text-blue-700 mt-1">
                        Activity reports are submitted by the company supervisor periodically throughout the internship. 
                        These reports help track the student's progress and performance during the training period.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDetailView;