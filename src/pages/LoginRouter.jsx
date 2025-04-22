import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginRouter = () => {
  const [selectedOption, setSelectedOption] = useState('student');
  const navigate = useNavigate();

  // Function to handle navigation to specific login page
  const navigateToLogin = () => {
    if (selectedOption === 'student') {
      navigate('/login/student');
    } else if (selectedOption === 'company') {
      navigate('/login/company');
    } else if (selectedOption === 'department') {
      navigate('/login/department');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full overflow-hidden">
        <div className="bg-red-600 text-white py-4 px-6">
          <h1 className="text-2xl font-bold text-center">Choose Login Type</h1>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <p className="text-gray-700 mb-4 text-center">
              Please select your role to log in to the system.
            </p>

            {/* Login Options */}
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="student"
                  name="loginType"
                  value="student"
                  checked={selectedOption === 'student'}
                  onChange={() => setSelectedOption('student')}
                  className="h-4 w-4 text-red-600 focus:ring-red-500"
                />
                <label htmlFor="student" className="ml-2 block text-gray-700">
                  Student
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="company"
                  name="loginType"
                  value="company"
                  checked={selectedOption === 'company'}
                  onChange={() => setSelectedOption('company')}
                  className="h-4 w-4 text-red-600 focus:ring-red-500"
                />
                <label htmlFor="company" className="ml-2 block text-gray-700">
                  Company
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="department"
                  name="loginType"
                  value="department"
                  checked={selectedOption === 'department'}
                  onChange={() => setSelectedOption('department')}
                  className="h-4 w-4 text-red-600 focus:ring-red-500"
                />
                <label htmlFor="department" className="ml-2 block text-gray-700">
                  Department Head
                </label>
              </div>
            </div>
          </div>

          <button
            onClick={navigateToLogin}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
          >
            Continue to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRouter;