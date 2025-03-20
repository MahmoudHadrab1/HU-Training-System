// CompanyProfileCreation.jsx
import React, { useState, useEffect } from 'react';

const CompanyProfileCreation = ({ setActivePage }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    fieldOfWork: '',
    companyLocation: '',
    phoneNumber: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after component mounts
    setTimeout(() => setAnimateIn(true), 100);
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear error when user starts typing
    if (showError) setShowError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if all required fields are filled
    const hasEmptyFields = Object.values(formData).some(value => !value.trim());
    if (hasEmptyFields) {
      setShowError(true);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to company dashboard or confirmation page
      setActivePage('companyDashboard');
    }, 1500);
  };

  return (
    <div className={`min-h-screen bg-gray-50 flex items-center justify-center p-4 transition-opacity duration-1000 ${animateIn ? 'opacity-100' : 'opacity-0'}`}
         style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)', 
                 backgroundSize: 'cover', 
                 backgroundPosition: 'center' }}>
      
      <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-lg shadow-xl transform transition-all duration-700 scale-100">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          We welcome your company on board! Please provide us with the necessary information to create your account
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className={`transform transition-all duration-500 delay-100 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <input
              type="text"
              id="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="Company Name"
              className="w-full bg-gray-300 bg-opacity-70 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>
          
          <div className={`transform transition-all duration-500 delay-200 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <input
              type="text"
              id="fieldOfWork"
              value={formData.fieldOfWork}
              onChange={handleInputChange}
              placeholder="Filed Of Work"
              className="w-full bg-gray-300 bg-opacity-70 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>
          
          <div className={`transform transition-all duration-500 delay-300 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <input
              type="text"
              id="companyLocation"
              value={formData.companyLocation}
              onChange={handleInputChange}
              placeholder="Company Location"
              className="w-full bg-gray-300 bg-opacity-70 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>
          
          <div className={`transform transition-all duration-500 delay-400 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <input
              type="tel"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="w-full bg-gray-300 bg-opacity-70 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>
          
          <div className={`transform transition-all duration-500 delay-500 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full bg-gray-300 bg-opacity-70 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>
          
          <div className={`transform transition-all duration-500 delay-600 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full bg-gray-300 bg-opacity-70 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>
          
          {/* Display error message if needed */}
          {showError && (
            <div className="text-red-600 text-center animate-pulse">
              Please fill in all fields to continue
            </div>
          )}
          
          <div className={`transform transition-all duration-500 delay-700 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <button
              type="submit"
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-md transition duration-300 transform hover:scale-[1.02] hover:shadow-lg flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyProfileCreation;