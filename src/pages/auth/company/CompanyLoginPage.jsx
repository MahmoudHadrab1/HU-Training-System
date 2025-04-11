// CompanyLoginPage.jsx
import React, { useState, useEffect } from "react";
// Import company login image - you'll need to add this to your assets folder
import companyLoginImg from "../../../assets/images/company_login_img.jpg";

export default function CompanyLoginPage({ setActivePage }) {
  // State for animation, form fields, and error handling
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    companyId: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Set loaded state after component mounts to trigger animations
  useEffect(() => {
    // Small delay for smoother entrance animation
    setTimeout(() => setIsLoaded(true), 100);
    
    // Check for saved credentials if "remember me" was previously used
    const savedCredentials = localStorage.getItem('companyCredentials');
    if (savedCredentials) {
      const { companyId, rememberMe } = JSON.parse(savedCredentials);
      setFormData(prev => ({ ...prev, companyId }));
      setRememberMe(rememberMe);
    }
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear error when user types
    if (error) setError('');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Enhanced validation with more specific error messages
    if (!formData.companyId.trim()) {
      setError("Please enter your company ID");
      return;
    }
    
    if (!formData.password.trim()) {
      setError("Please enter your password");
      return;
    }
    
    setIsSubmitting(true);
    
    // Save credentials if "remember me" is checked
    if (rememberMe) {
      localStorage.setItem('companyCredentials', JSON.stringify({
        companyId: formData.companyId,
        rememberMe
      }));
    } else {
      localStorage.removeItem('companyCredentials');
    }
    
    // Simulate authentication (replace with actual API call)
    setTimeout(() => {
      // For demo purposes - simplified authentication
      // In a real app, you would check credentials with your backend
      if (formData.companyId === "12345" && formData.password === "password") {
        // Successful login - redirect to company dashboard
        setActivePage('companyDashboard');
      } else {
        setError("Invalid credentials. Please check your ID and password.");
      }
      setIsSubmitting(false);
    }, 800);
  };

  // Handle "forgot password" click
  const handleForgotPassword = () => {
    // Replace with your actual forgot password functionality
    alert("Forgot password functionality will be implemented here");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-gray-200 to-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div 
        className={`flex w-full max-w-4xl flex-col md:flex-row shadow-xl rounded-2xl overflow-hidden bg-white
          transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        {/* Left Side - Image (hidden on small screens) */}
        <div className="hidden md:block md:w-1/2 bg-gray-700 relative overflow-hidden">
          {/* Overlay gradient for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800/70 to-gray-900/30 z-10"></div>
          
          <div 
            className={`relative z-20 flex flex-col h-full p-8 text-white justify-center
              transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
          >
            <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>
            <p className="text-lg text-gray-200 mb-8">
              Sign in to access your company dashboard and manage your internship offerings.
            </p>
            <ul className="space-y-3">
              {['Post new internship opportunities', 'Review student applications', 'Track ongoing internships', 'Submit evaluation reports'].map((item, index) => (
                <li 
                  key={index} 
                  className="flex items-center opacity-0 animate-fade-in"
                  style={{ animationDelay: `${800 + index * 200}ms`, animationFillMode: 'forwards' }}
                >
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Background image with parallax effect */}
          <img 
            src={companyLoginImg} 
            alt="Company Login" 
            className={`absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 ease-in-out scale-110
              ${isLoaded ? 'translate-x-0 scale-100' : '-translate-x-full scale-110'}`}
            style={{ opacity: 0.6 }}
          />
        </div>

        {/* Right Side - Login Form */}
        <div className={`w-full md:w-1/2 bg-white p-8 md:p-10 flex flex-col
          transition-all duration-500 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          
          {/* Company Icon and Brand */}
          <div className={`flex flex-col items-center justify-center mb-8 transition-transform duration-700 delay-500 
            ${isLoaded ? 'translate-y-0' : 'translate-y-10'}`}>
            <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <svg
                className="w-12 h-12 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">HU-Tech Train</h1>
            <p className="text-gray-600 mt-1">Company Portal</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5 w-full">
            {/* ID Input */}
            <div className={`relative transition-all duration-500 delay-700
              ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <label htmlFor="companyId" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                Company ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="companyId"
                  value={formData.companyId}
                  onChange={handleInputChange}
                  placeholder="Enter your company ID"
                  className={`w-full py-3 px-4 pl-11 bg-gray-50 border ${error && !formData.companyId ? 'border-red-400' : 'border-gray-300'} 
                    rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent 
                    transition-all duration-300`}
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
            <div className={`relative transition-all duration-500 delay-800
              ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <div className="flex justify-between items-center mb-1 ml-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <button 
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-gray-600 hover:text-gray-800 focus:outline-none"
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
                  className={`w-full py-3 px-4 pl-11 bg-gray-50 border ${error && !formData.password ? 'border-red-400' : 'border-gray-300'} 
                    rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent 
                    transition-all duration-300`}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 13a1 1 0 100-2 1 1 0 000 2zm-8-6h2V5h12v2h2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v2zm15 3h-1v8a2 2 0 01-2 2H8a2 2 0 01-2-2v-8H5a1 1 0 110-2h14a1 1 0 110 2z" />
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

            {/* Remember Me Checkbox */}
            <div className={`flex items-center transition-all duration-500 delay-900
              ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                Remember me
              </label>
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
              className={`w-full py-3 px-4 flex justify-center items-center bg-gray-700 text-white font-medium rounded-lg shadow-md transform transition-all duration-500 delay-1000
                hover:bg-gray-800 active:scale-98 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                disabled:opacity-70 disabled:cursor-not-allowed
                ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
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

          {/* Register Account Link */}
          <div className={`text-center mt-6 transition-all duration-500 delay-1100
            ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-sm text-gray-600">
              Don't have an account yet?{" "}
              <button
                type="button" 
                onClick={() => setActivePage('register')}
                className="text-gray-800 font-semibold hover:text-gray-900 hover:underline focus:outline-none transition-colors"
              >
                Register Now
              </button>
            </p>
          </div>
          
          {/* Additional Help */}
          <div className={`text-center mt-4 transition-all duration-500 delay-1200
            ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <button 
              type="button"
              onClick={() => alert('Contact administrator feature not yet implemented')}
              className="text-sm text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              Need help? Contact administrator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}