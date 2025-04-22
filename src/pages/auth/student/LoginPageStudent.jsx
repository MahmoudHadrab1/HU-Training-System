import React, { useState, useEffect } from "react";

export default function LoginPageStudent({ setActivePage }) {
  // Animation and form states
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    studentId: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Set loaded state after component mounts to trigger animations
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
    
    // Check for saved credentials
    const savedCredentials = localStorage.getItem('studentCredentials');
    if (savedCredentials) {
      try {
        const { studentId, rememberMe } = JSON.parse(savedCredentials);
        setFormData(prev => ({ ...prev, studentId }));
        setRememberMe(rememberMe);
      } catch (e) {
        console.error("Error parsing saved credentials:", e);
        localStorage.removeItem('studentCredentials');
      }
    }

    // For testing convenience (remove in production)
    console.log("Login credentials for testing: ID '123456', password 'password'");
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
    
    // Enhanced validation
    if (!formData.studentId.trim()) {
      setError("Please enter your student ID");
      return;
    }
    
    if (!formData.password.trim()) {
      setError("Please enter your password");
      return;
    }
    
    setIsSubmitting(true);
    
    // Save credentials if "remember me" is checked
    if (rememberMe) {
      localStorage.setItem('studentCredentials', JSON.stringify({
        studentId: formData.studentId,
        rememberMe
      }));
    } else {
      localStorage.removeItem('studentCredentials');
    }
    
    // Simulate authentication
    setTimeout(() => {
      // For demo purposes, accept any of these credential sets
      if (
        (formData.studentId === "123456" && formData.password === "password") ||
        (formData.studentId === "student" && formData.password === "student") ||
        (formData.studentId === "demo" && formData.password === "demo")
      ) {
        console.log("Login successful, navigating to student dashboard");
        // Successful login - explicitly call setActivePage to redirect
        if (typeof setActivePage === 'function') {
          setActivePage('studentDashboard');
        } else {
          console.error("setActivePage is not a function:", setActivePage);
          alert("Navigation error: Please contact support. (Error: Invalid navigation function)");
        }
      } else {
        console.log("Login failed, invalid credentials provided");
        setError("Invalid credentials. Please check your ID and password.");
      }
      setIsSubmitting(false);
    }, 800);
  };

  // Handle forgot password
  //const handleForgotPassword = () => {
    // Replace with actual forgot password functionality
   // alert("Forgot password functionality will be implemented here");
  //};

  // Debug function to help with login issues (remove in production)
  //const debugLogin = () => {
   // console.log("Debug: Setting test credentials");
   //setFormData({
   //   studentId: "123456",
   //   password: "password"
  //  });
  //};

  return (
    <div className="flex min-h-screen w-full items-center justify-center relative bg-gradient-to-br from-blue-50 to-red-50 overflow-hidden">
      {/* Custom background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-white/20 to-blue-500/10 animate-gradient"></div>
        
        {/* Animated dots/particles using Tailwind */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, index) => (
            <div 
              key={index} 
              className={`absolute rounded-full bg-white opacity-70 animate-float`}
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>
        
        {/* Grid pattern using SVG */}
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 0 10 L 40 10 M 10 0 L 10 40" stroke="rgba(220, 38, 38, 0.3)" strokeWidth="1" fill="none" />
            </pattern>
            <pattern id="circles" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(37, 99, 235, 0.2)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#circles)" />
        </svg>
      </div>
      
      {/* Main container */}
      <div 
        className={`relative z-10 flex w-[90%] md:w-[80%] max-w-4xl shadow-2xl rounded-xl overflow-hidden bg-white
          transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        {/* Left Side - Image */}
        <div className="w-1/2 bg-white hidden md:flex flex-col items-center justify-center p-6 bg-gray-100 overflow-hidden">
          <div 
            className={`transition-all duration-1000 ease-in-out w-full h-full
              ${isLoaded ? 'translate-x-0 scale-100 opacity-100' : '-translate-x-full scale-90 opacity-0'}`}
          >
            <div className="relative h-full flex flex-col items-center justify-center">
              {/* Blob animations using Tailwind */}
              <div className="absolute -top-16 -left-16 w-64 h-64 bg-red-100 rounded-full mix-blend-multiply opacity-70 filter blur-2xl animate-blob"></div>
              <div className="absolute top-40 -right-16 w-48 h-48 bg-blue-100 rounded-full mix-blend-multiply opacity-70 filter blur-2xl animate-blob animation-delay-4000"></div>
              <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply opacity-70 filter blur-2xl animate-blob animation-delay-2000"></div>
              <div className="absolute bottom-40 -left-16 w-48 h-48 bg-blue-200 rounded-full mix-blend-multiply opacity-70 filter blur-2xl animate-blob animation-delay-6000"></div>
              
              {/* Student image */}
              <img 
                src="https://img.freepik.com/free-vector/student-with-laptop-studying-online-course_74855-5293.jpg"
                alt="Illustrated student working on computer"
                className="w-full h-auto object-cover rounded-lg shadow-lg relative z-10 transition-transform duration-500 hover:scale-105 animate-float"
              />
              <div className="mt-8 text-center relative z-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back, Student!</h2>
                <p className="text-gray-600">Access your training portal to manage internships and connect with companies.</p>
                
                <div className="mt-6 space-y-3">
                  {['Track application status', 'Submit reports', 'Connect with companies', 'Get feedback from mentors'].map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-center opacity-0 animate-fade-in"
                      style={{ animationDelay: `${800 + index * 200}ms`, animationFillMode: 'forwards' }}
                    >
                      <svg className="w-5 h-5 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
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
        <div className={`w-full md:w-1/2 bg-white p-8 md:p-10 flex flex-col
          transition-all duration-500 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
        >
          {/* User Icon and Header */}
          <div className={`flex flex-col items-center mb-8 transition-transform duration-700 delay-500 
            ${isLoaded ? 'translate-y-0' : 'translate-y-10'}`}
          >
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-4 shadow-lg transform transition-transform hover:scale-105 duration-300">
              <svg
                className="w-12 h-12 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-4.41 0-8 3.59-8 8h16c0-4.41-3.59-8-8-8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Student Login</h1>
            <p className="text-gray-600 text-center">Sign in to access your training portal</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5 w-full">
            {/* Student ID Input */}
            <div className={`relative transition-all duration-500 delay-700
              ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            >
              <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                Student ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  placeholder="Enter your student ID"
                  className={`w-full py-3 px-4 pl-11 bg-gray-50 border ${error && !formData.studentId ? 'border-red-400' : 'border-gray-300'} 
                    rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent 
                    transition-all duration-300`}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-4.41 0-8 3.59-8 8h16c0-4.41-3.59-8-8-8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div className={`relative transition-all duration-500 delay-800
              ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            >
              <div className="flex justify-between items-center mb-1 ml-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={`w-full py-3 px-4 pl-11 bg-gray-50 border ${error && !formData.password ? 'border-red-400' : 'border-gray-300'} 
                    rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent 
                    transition-all duration-300`}
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
              className={`w-full py-3 px-4 flex justify-center items-center bg-red-500 text-white font-medium rounded-lg shadow-md transform transition-all duration-500 delay-1000
                hover:bg-red-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2
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

        </div>
      </div>
      
      {/* Tailwind animation classes */}
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
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
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
        
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
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
}