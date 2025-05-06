import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../../services/authService';

const CompanyProfileCreation = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nationalId: '',
    name: '',
    phone: '',
    location: '',
    fieldOfWork: '',
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Please fill in all required fields');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateIn(true), 100);
  
    const storedNationalId = localStorage.getItem('companyNationalId');
    const storedProfile = JSON.parse(localStorage.getItem('companyProfile'));
  
    if (storedNationalId) {
      setFormData(prev => ({
        ...prev,
        nationalId: storedNationalId,
        ...(storedProfile || {})  // Spread stored profile data if it exists
      }));
    } else {
      navigate('/register');
    }
  }, [navigate]);
  

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (showError) setShowError(false);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const enforcedNationalId = localStorage.getItem('companyNationalId');
    if (!enforcedNationalId) {
      setErrorMessage('National ID not found. Please go back and verify again.');
      setShowError(true);
      return;
    }

    // Validate all required fields
    const requiredFields = ['name', 'phone', 'location', 'fieldOfWork', 'email', 'password'];
    const emptyFields = requiredFields.filter(field => !formData[field].trim());
    
    if (emptyFields.length > 0) {
      setErrorMessage(`Please fill in the following fields: ${emptyFields.join(', ')}`);
      setShowError(true);
      return;
    }

    // Email validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      setShowError(true);
      return;
    }

    // Password validation
    if (formData.password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      setShowError(true);
      return;
    }

    setIsLoading(true);
    setShowError(false);

    try {
      // Prepare registration data
      const registrationData = {
        nationalId: enforcedNationalId,
        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        fieldOfWork: formData.fieldOfWork,
        email: formData.email,
        password: formData.password
      };

      console.log("Sending registration data:", registrationData);

      // Attempt to register the company
      const registrationResponse = await authService.registerCompany(registrationData);

      console.log("Registration response:", registrationResponse);

      if (registrationResponse.status === 'success') {

        console.log("Registration successful, attempting login...");
        
        const { name, phone, location, fieldOfWork, email } = formData;
        localStorage.setItem('companyProfile', JSON.stringify({ name, phone, location, fieldOfWork, email }));
      
        
        // Try to log in immediately after registration
        const loginResponse = await authService.loginCompany(enforcedNationalId, formData.password);

        console.log("Login response:", loginResponse);

        if (loginResponse.data && loginResponse.data.token) {
          localStorage.setItem("user", JSON.stringify(loginResponse.data));
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("userRole", "company");
          localStorage.removeItem("companyNationalId");
        
          console.log("Navigating to dashboard...");
          navigate("/dashboard/company", { replace: true });
          return;
        } else {
          throw new Error("Login failed after registration");
        }
        
      } else {
        // Registration was not successful
        throw new Error(registrationResponse.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration/Login error:', error);
      
      // Determine the error message to show
      let errorMsg = 'An unexpected error occurred';
      if (error.response) {
        // Backend returned an error response
        if (error.response.status === 409) {
          errorMsg = 'A company with this National ID or email already exists';
        } else if (error.response.data && error.response.data.message) {
          errorMsg = error.response.data.message;
        }
      } else if (error.message) {
        // Catch specific error messages
        errorMsg = error.message;
      }

      setErrorMessage(errorMsg);
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 flex items-center justify-center p-4 transition-opacity duration-1000 ${animateIn ? 'opacity-100' : 'opacity-0'}`}
         style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-lg shadow-xl relative z-10">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Complete Your Company Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* National ID field - disabled and read-only */}
          <div>
            <label htmlFor="nationalId" className="block text-sm font-medium text-gray-700 mb-1">National ID*</label>
            <input
              type="text"
              id="nationalId"
              value={formData.nationalId}
              disabled
              className="w-full bg-gray-100 border border-gray-300 rounded-md py-3 px-4 cursor-not-allowed"
            />
          </div>
          
          {/* Rest of the form fields with similar structure as before */}
          <div className={`transform transition-all duration-500 delay-200 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Company Name*</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Company Name"
              className="w-full bg-white border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>
          
          {/* Other form fields remain the same as in the previous version */}
          <div className={`transform transition-all duration-500 delay-300 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <label htmlFor="fieldOfWork" className="block text-sm font-medium text-gray-700 mb-1">Field Of Work*</label>
            <input
              type="text"
              id="fieldOfWork"
              value={formData.fieldOfWork}
              onChange={handleInputChange}
              placeholder="e.g. IT, Healthcare, Manufacturing"
              className="w-full bg-white border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>
          
          <div className={`transform transition-all duration-500 delay-400 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Company Location*</label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="City, Country"
              className="w-full bg-white border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          
          <div className={`transform transition-all duration-500 delay-500 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="e.g. 0798654000"
              className="w-full bg-white border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          
          <div className={`transform transition-all duration-500 delay-600 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="company@example.com"
              className="w-full bg-white border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          
          <div className={`transform transition-all duration-500 delay-700 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Min. 8 characters"
                className="w-full bg-white border border-gray-300 rounded-md py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          {/* Display error message if needed */}
          {showError && (
            <div className="text-red-600 bg-red-100 border border-red-200 p-3 rounded-md text-center animate-pulse">
              {errorMessage}
            </div>
          )}
          
          <div className={`transform transition-all duration-500 delay-800 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-md transition duration-300 transform hover:scale-[1.02] hover:shadow-lg flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </div>
              ) : "Create Account"}
            </button>
          </div>

          {/* Back button */}
          <div className={`text-center mt-4 transform transition-all duration-500 delay-900 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Back to previous step
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyProfileCreation;