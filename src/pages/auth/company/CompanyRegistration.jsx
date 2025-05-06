import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../../services/authService';

const CompanyRegistration = () => {
  const navigate = useNavigate();

  const [idNumber, setIdNumber] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showVerifying, setShowVerifying] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateIn(true), 100);
  }, []);

  const handleIdChange = (e) => {
    setIdNumber(e.target.value);
    setShowError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idNumber.trim()) {
      setErrorMessage('Please enter your ID number');
      setShowError(true);
      return;
    }

    if (!/^\d{9}$/.test(idNumber)) {
      setErrorMessage('ID must be 9 digits');
      setShowError(true);
      return;
    }

    setShowVerifying(true);
    setIsLoading(true);

    try {
      const result = await authService.verifyCompany(idNumber);
      if (result.status === 'success') {
        localStorage.setItem('companyNationalId', idNumber);
        navigate('/register/profile-creation');
      } else {
        setErrorMessage('Company not verified.');
        setShowError(true);
      }
    } catch (error) {
      console.error('Verification failed:', error);
      setErrorMessage('Error verifying company. Please try again later.');
      setShowError(true);
    } finally {
      setShowVerifying(false);
      setIsLoading(false);
    }
  };
  return (
    <div className={`flex min-h-screen bg-gray-50 transition-all duration-1000 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
      {/* Left side with image */}
      <div className="hidden md:block md:w-1/2 bg-cover bg-center transform transition-transform duration-1000 ease-out" 
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80')" }}>
      </div>
      
      {/* Right side with form */}
      <div className={`w-full md:w-1/2 flex flex-col justify-center items-center p-8 relative transition-transform duration-1000 ${animateIn ? 'translate-x-0' : 'translate-x-20'}`}>
        <div className="w-full max-w-md">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center transform transition-all duration-700 delay-300 ease-out">
            Welcome to our platform
          </h1>
          
          <p className="text-gray-700 text-center mb-8 transform transition-all duration-700 delay-500 ease-out">
            We look forward to a successful partnership with you<br />
            To ensure verification of your identity as a company, please enter your national ID number before completing the account creation process. Thank you for joining us
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className={`relative transform transition-all duration-700 delay-700 ease-out ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <input
                type="text"
                id="company-id"
                value={idNumber}
                onChange={handleIdChange}
                placeholder="Enter your 9-digit National ID"
                className={`w-full bg-gray-200 rounded-md py-3 px-4 pr-10 focus:outline-none focus:ring-2 transition-all ${
                  showError ? 'focus:ring-red-500 border-red-500' : 'focus:ring-blue-500'
                }`}
                maxLength="9"
              />
              <svg 
                className="absolute right-3 top-3 h-6 w-6 text-gray-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            
            {showError && (
              <p className="text-red-600 text-center animate-pulse">{errorMessage}</p>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-md transition duration-300 transform hover:translate-y-[-2px] hover:shadow-lg ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: '900ms' }}
            >
              Register Now
            </button>
          </form>
          
          

          {/* Back to Login button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/login/company')}
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              ← Back to Login
            </button>
          </div>
        </div>
        
        {/* Verification Modal */}
        {showVerifying && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 animate-fade-in">
            <div className="bg-gray-200 p-6 rounded-md shadow-xl max-w-md w-full mx-4 animate-scale-in">
              <div className="flex justify-between items-start">
                <div className="w-full text-center">
                  <h3 className="text-xl font-semibold mb-4">Thank you for submitting your request</h3>
                  <p className="mb-4">Please wait a moment while we verify your company information</p>
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
                  </div>
                </div>
                <button 
                  onClick={() => setShowVerifying(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

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

export default CompanyRegistration;