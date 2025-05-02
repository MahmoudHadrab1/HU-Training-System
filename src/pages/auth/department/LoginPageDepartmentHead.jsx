import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPageDepartmentHead() {
  const navigate = useNavigate();
  
  // Animation and form states
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    departmentId: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    // Check for saved credentials
    const savedCredentials = localStorage.getItem('departmentCredentials');
    if (savedCredentials) {
      try {
        const { departmentId, rememberMe } = JSON.parse(savedCredentials);
        setFormData(prev => ({ ...prev, departmentId }));
        setRememberMe(rememberMe);
      } catch (e) {
        console.error("Error parsing saved credentials");
        localStorage.removeItem('departmentCredentials');
      }
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.departmentId.trim()) {
      setError("Please enter your department ID");
      return;
    }
    
    if (!formData.password.trim()) {
      setError("Please enter your password");
      return;
    }
    
    setIsSubmitting(true);
    
    // Save credentials if "remember me" is checked
    if (rememberMe) {
      localStorage.setItem('departmentCredentials', JSON.stringify({
        departmentId: formData.departmentId,
        rememberMe
      }));
    } else {
      localStorage.removeItem('departmentCredentials');
    }
    
    // Simulate authentication (replace with actual API call)
    setTimeout(() => {
      // For demo purposes - always successful login with test credentials
      if (formData.departmentId === "123456" && formData.password === "password") {
        // Set authentication state
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'department');
        
        // Navigate to department head dashboard
        navigate('/dashboard/department');
      } else {
        setError("Invalid credentials. Please check your ID and password.");
      }
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="flex h-screen w-full">
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
        <div className={`max-w-md w-full transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {/* Header with Logo */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-2 bg-gray-700 rounded-full h-20 w-20 mb-4">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">HU-Tech Train</h2>
            <p className="text-gray-600">Department Portal</p>
          </div>
          
          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="departmentId" className="block text-gray-700 mb-2">Department ID</label>
              <div className="relative">
                <input
                  type="text"
                  id="departmentId"
                  value={formData.departmentId}
                  onChange={handleInputChange}
                  placeholder="Enter your department ID"
                  className="w-full py-3 px-4 bg-gray-50 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 right-4 flex items-center">
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="block text-gray-700">Password</label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full py-3 px-4 bg-gray-50 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div 
                  className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    {showPassword ? (
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                    ) : null}
                    <path fillRule="evenodd" d={showPassword 
                      ? "M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      : "M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                    } clipRule="evenodd"></path>
                    {!showPassword ? (
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"></path>
                    ) : null}
                  </svg>
                </div>
              </div>
              
              {/* Error message */}
              {error && (
                <p className="mt-2 text-sm text-red-600 animate-pulse">
                  {error}
                </p>
              )}
            </div>
            
            <div className="flex items-center mb-6">
              <input 
                type="checkbox" 
                id="remember" 
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            
            <button
              type="submit"
              className="w-full flex items-center justify-center py-3 px-4 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors group"
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
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </>
              )}
            </button>
          </form>
          
          
        </div>
      </div>
    </div>
  );
}