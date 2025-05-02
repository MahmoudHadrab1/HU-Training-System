// ✅ Final version using React Router
// This assumes your App is using <Routes><Route /></Routes> based routing.

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ForgotPasswordModal from "../../../components/auth/ForgotPasswordModal";
import AuthService from "../../../services/authService";

const CompanyLoginPage = () => {
  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ nationalId: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
    console.log("Login credentials for testing: ID '222222222', password 'cvb567'");
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.nationalId.trim()) {
      setError("Please enter your National ID");
      return;
    }
    if (!formData.password.trim()) {
      setError("Please enter your password");
      return;
    }
  
    setIsSubmitting(true);
    try {
      const result = await AuthService.loginCompany(formData.nationalId, formData.password);
      console.log("Login successful, result:", result);
  
      // Store authentication data
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userType', 'company');
      
      // Store token if available
      if (result && result.token) {
        localStorage.setItem('token', result.token);
      }
  
      // Redirect using React Router to the company dashboard
      navigate('/dashboard/company', { replace: true });
    } catch (error) {
      if (error.response?.status === 401) {
        setError("Invalid credentials. Please check your ID and password.");
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError("No response from server. Please check your internet connection.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setIsForgotPasswordOpen(true);
  };

  const handleRegister = () => {
    navigate('/register');
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* Grid background with larger squares and more visible gray lines */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(180, 180, 180, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(180, 180, 180, 0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0"
        }}>
      </div>

      <div className={`w-full max-w-4xl flex flex-col md:flex-row shadow-2xl rounded-xl overflow-hidden bg-white
        transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        
        {/* Left Side - Illustration (hidden on small screens) */}
        <div className="w-1/2 bg-white hidden md:flex flex-col items-center justify-center p-6 bg-gray-100 overflow-hidden">
          <div 
            className={`transition-all duration-1000 ease-in-out w-full h-full
              ${isLoaded ? 'translate-x-0 scale-100 opacity-100' : '-translate-x-full scale-90 opacity-0'}`}
          >
            <div className="relative h-full flex flex-col items-center justify-center">
              {/* Blob animations using Tailwind */}
              <div className="absolute -top-16 -left-16 w-64 h-64 bg-gray-100 rounded-full mix-blend-multiply opacity-70 filter blur-2xl animate-blob"></div>
              <div className="absolute top-40 -right-16 w-48 h-48 bg-gray-200 rounded-full mix-blend-multiply opacity-70 filter blur-2xl animate-blob animation-delay-4000"></div>
              <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-gray-300 rounded-full mix-blend-multiply opacity-70 filter blur-2xl animate-blob animation-delay-2000"></div>
              <div className="absolute bottom-40 -left-16 w-48 h-48 bg-gray-200 rounded-full mix-blend-multiply opacity-70 filter blur-2xl animate-blob animation-delay-6000"></div>
              
              {/* Company image */}
              <img 
                src="https://img.freepik.com/free-vector/business-team-discussing-ideas-startup_74855-4380.jpg"
                alt="Illustrated business team working together"
                className="w-full h-auto object-cover rounded-lg shadow-lg relative z-10 transition-transform duration-500 hover:scale-105 animate-float"
              />
              <div className="mt-8 text-center relative z-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back, Company!</h2>
                <p className="text-gray-600">Access your company portal to manage your internship offerings and connect with students.</p>
                
                <div className="mt-6 space-y-3">
                  {['Post internship opportunities', 'Review student applications', 'Manage training programs', 'Submit evaluation reports'].map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-center opacity-0 animate-fade-in"
                      style={{ animationDelay: `${800 + index * 200}ms`, animationFillMode: 'forwards' }}
                    >
                      <svg className="w-5 h-5 mr-2 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-10 flex flex-col">
          {/* User Icon and Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center mb-4 shadow-lg transform transition-transform hover:scale-105 duration-300">
              <svg
                className="w-12 h-12 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Company Login</h1>
            <p className="text-gray-600 text-center">Sign in to access your company portal</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5 w-full">
            {/* National ID Input */}
            <div className="relative">
              <label htmlFor="nationalId" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                National ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="nationalId"
                  value={formData.nationalId}
                  onChange={handleInputChange}
                  placeholder="Enter your National ID"
                  className="w-full py-3 px-4 pl-11 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="flex justify-between items-center mb-1 ml-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <button 
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-gray-600 hover:text-gray-800 focus:outline-none transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full py-3 px-4 pl-11 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                  </svg>
                </div>
                <div 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg
                    className="w-5 h-5 hover:text-gray-700 transition-colors"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    {showPassword ? (
                      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                    ) : (
                      <path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0-9C7.03 2 2.73 6.17 2 11.05c-.13.96-.19 1.92-.19 2.89 0 1.68.29 3.32.83 4.85.52 1.48 1.26 2.83 2.2 4 .1.13.26.21.42.21h14.47c.16 0 .31-.08.42-.21.94-1.17 1.68-2.52 2.2-4 .54-1.53.83-3.17.83-4.85 0-.97-.06-1.93-.19-2.89C21.27 6.17 16.97 2 12 2zm0 2c3.87 0 7.1 2.93 7.83 6.8.11.91.17 1.83.17 2.75 0 1.4-.23 2.76-.67 4.05-.43 1.25-1.03 2.42-1.78 3.45H6.45c-.75-1.03-1.35-2.2-1.78-3.45-.44-1.29-.67-2.65-.67-4.05 0-.92.06-1.84.17-2.75C4.9 6.93 8.13 4 12 4z"/>
                    )}
                  </svg>
                </div>
              </div>
            </div>

            {/* Error Message */}
            <div className={`transition-all duration-300 h-6 ${error ? 'opacity-100' : 'opacity-0'}`}>
              {error && (
                <p className="text-red-600 text-sm animate-pulse flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 flex justify-center items-center bg-gray-700 text-white font-medium rounded-lg shadow-md transform transition-all duration-300 hover:bg-gray-800 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  <span>Log In</span>
                  <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 010-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Registration Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account yet?{" "}
              <button
                type="button" 
                onClick={handleRegister}
                className="text-gray-700 font-semibold hover:text-gray-900 hover:underline focus:outline-none transition-colors"
              >
                Register Now
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal 
        isOpen={isForgotPasswordOpen} 
        onClose={() => setIsForgotPasswordOpen(false)} 
      />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes blob {
          0% { transform: scale(1); }
          33% { transform: scale(1.1) translate(10px, -10px); }
          66% { transform: scale(0.9) translate(-10px, 10px); }
          100% { transform: scale(1); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-blob {
          animation: blob 7s infinite alternate;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s forwards;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animation-delay-6000 {
          animation-delay: 6s;
        }
      `}</style>
    </div>
  );
};

export default CompanyLoginPage;