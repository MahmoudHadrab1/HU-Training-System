import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../services/authService";

const DepartmentHeadLoginPage = () => {
  const navigate = useNavigate();
  
  // Animation and form states
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
      
    }));
    
    // Clear any error messages when user types
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email.trim()) {
      setError("Please enter your email");
      return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    if (!formData.password.trim()) {
      setError("Please enter your password");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const result = await authService.loginDepartmentHead(formData.email, formData.password);
      console.log("Login successful, result:", result);
  
      // Store authentication data
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'department');

      
      // Store token if available
      if (result && result.token) {
        localStorage.setItem('token', result.token);
      }
  
      // Redirect using React Router to the department dashboard
      navigate('/dashboard/department', { replace: true });
    } catch (error) {
      if (error.response?.status === 401) {
        setError("Invalid credentials. Please check your email and password.");
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

  return (
    <div className="flex h-screen w-full">
      {/* Header/Navbar */}
      <header className="absolute top-0 left-0 right-0 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <div className="text-xl font-medium">
            <span className="text-red-600 font-bold">HU-</span> Tech Train
          </div>
          <div className="ml-auto flex space-x-8">
            <a href="/" className="text-gray-700 hover:text-gray-900">Home</a>
            <a href="/about" className="text-gray-700 hover:text-gray-900">About</a>
            <a href="/login" className="text-red-600 font-medium">Login</a>
            <a href="/company" className="text-gray-700 hover:text-gray-900">Company</a>
            <a href="/student" className="text-gray-700 hover:text-gray-900">Student</a>
          </div>
        </div>
      </header>
      
      {/* Left Panel - Background Image & Info */}
      <div 
        className="hidden md:flex w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)` }}
      >
        <div className="absolute inset-0 bg-gray-800 bg-opacity-70 flex flex-col justify-center p-12">
          <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h1 className="text-white text-4xl font-bold mb-6">Welcome Back!</h1>
            <p className="text-gray-200 text-lg mb-8">
              Sign in to access your department dashboard and manage student internships.
            </p>
          </div>
          
          <ul className="space-y-4 text-gray-200">
            <li className={`flex items-center transition-all duration-500 delay-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="bg-green-500 rounded-full p-1 mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              Review student internship applications
            </li>
            <li className={`flex items-center transition-all duration-500 delay-700 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="bg-green-500 rounded-full p-1 mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              Monitor student training progress
            </li>
            <li className={`flex items-center transition-all duration-500 delay-900 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="bg-green-500 rounded-full p-1 mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              Approve company partnerships
            </li>
            <li className={`flex items-center transition-all duration-500 delay-1100 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="bg-green-500 rounded-full p-1 mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              Generate performance reports
            </li>
          </ul>
        </div>
      </div>
      
      {/* Right Panel - Login Form */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeWidth="2" d="M3 9l9 3m0 0l9-3m-9 3v11" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">HU-Tech Train</h2>
            <p className="text-gray-600 mb-8">Department Portal</p>
          </div>
          
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">Department Email</label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your department email"
                  className="w-full py-3 px-4 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full py-3 px-4 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div 
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    ) : null}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showPassword 
                      ? "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      : "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    } />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Error message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-2">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            <button
              type="submit"
              className="w-full flex items-center justify-center py-3 px-4 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors group mt-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  Log In
                  <svg className="w-5 h-5 ml-2 transform transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DepartmentHeadLoginPage;