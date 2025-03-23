import React from 'react';

const ViewCVModal = ({ isOpen, onClose, student }) => {
  // Mock student data for CV demonstration
  const studentCV = {
    name: student?.studentName || 'Student Name',
    id: student?.studentId || 'S12345',
    email: 'student@example.com',
    phone: '+962 79 123 4567',
    education: [
      {
        institution: 'University of Jordan',
        degree: 'Bachelor of Science in Computer Science',
        date: '2021 - Present',
        gpa: '3.8/4.0'
      }
    ],
    skills: [
      'React.js', 'JavaScript', 'HTML/CSS', 'Node.js', 'Python', 
      'UI/UX Design', 'Problem Solving', 'Team Collaboration'
    ],
    experience: [
      {
        position: 'Web Development Intern',
        company: 'TechStart',
        date: 'Jun 2024 - Aug 2024',
        description: 'Assisted in developing and maintaining web applications using React.js and Node.js.'
      }
    ],
    courses: [
      'Data Structures and Algorithms',
      'Database Systems',
      'Web Development',
      'Software Engineering'
    ],
    languages: [
      { language: 'Arabic', level: 'Native' },
      { language: 'English', level: 'Fluent' }
    ]
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl max-w-3xl mx-auto p-0 w-full max-h-[90vh] overflow-y-auto">
        {/* Header with close button */}
        <div className="sticky top-0 bg-gray-50 flex justify-between items-center px-6 py-4 border-b z-10">
          <h2 className="text-xl font-bold text-gray-800">Student CV</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* CV Content */}
        <div className="p-6">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">{studentCV.name}</h1>
            <p className="text-gray-600">Student ID: {studentCV.id}</p>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {studentCV.email}
              </div>
              <div className="flex items-center">
                <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {studentCV.phone}
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Education</h2>
            {studentCV.education.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-900">{edu.institution}</h3>
                  <span className="text-gray-600 text-sm">{edu.date}</span>
                </div>
                <p className="text-gray-700">{edu.degree}</p>
                <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>
              </div>
            ))}
          </div>

          {/* Skills Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {studentCV.skills.map((skill, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Experience</h2>
            {studentCV.experience.map((exp, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-900">{exp.position}</h3>
                  <span className="text-gray-600 text-sm">{exp.date}</span>
                </div>
                <p className="text-gray-700">{exp.company}</p>
                <p className="text-gray-600 mt-1">{exp.description}</p>
              </div>
            ))}
          </div>

          {/* Relevant Courses */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Relevant Coursework</h2>
            <ul className="list-disc pl-5 space-y-1">
              {studentCV.courses.map((course, index) => (
                <li key={index} className="text-gray-700">{course}</li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Languages</h2>
            <div className="space-y-1">
              {studentCV.languages.map((lang, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-700">{lang.language}</span>
                  <span className="text-gray-600">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Footer actions */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded transition-colors duration-300"
          >
            Close
          </button>
          
          <div className="space-x-2">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors duration-300"
              onClick={() => {
                // In a real app, you would download the CV as PDF
                alert('CV download functionality would be implemented here');
              }}
            >
              Download CV
            </button>
            
            {student?.status === 'Pending' && (
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors duration-300"
                onClick={() => {
                  // In a real app, you would proceed with the review
                  onClose();
                }}
              >
                Proceed to Review
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCVModal;