import React, { useState, useEffect, useRef } from 'react';

const Header = ({ setActivePage, setActiveTab, activeTab }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeButton, setActiveButton] = useState('home');
  const [activeSection, setActiveSection] = useState(activeTab);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Sync with activeTab from props when it changes
  useEffect(() => {
    setActiveSection(activeTab);
  }, [activeTab]);

  // Effect to detect scroll for header animation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLoginDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  // Handle navigation with animation state
  const handleNavClick = (page) => {
    setActiveButton(page);
    setActivePage(page);
  };

  // Handle Company/Student section toggle
  const handleSectionToggle = (section) => {
    setActiveSection(section);
    setActiveTab(section);
    
    // If not on home page, navigate to home
    if (activeButton !== 'home') {
      setActiveButton('home');
      setActivePage('home');
    }
  };

  // Handle login option selection
  const handleLoginOptionClick = (loginType) => {
    setShowLoginDropdown(false);
    setActivePage(loginType + 'Login');
  };

  // Toggle login dropdown
  const toggleLoginDropdown = () => {
    setShowLoginDropdown(!showLoginDropdown);
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'shadow-md py-2' 
          : 'shadow-sm py-4'
      }`}
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)',
        backgroundSize: '100% 100%',
        backgroundAttachment: 'fixed',
        borderBottom: '1px solid rgba(229, 231, 235, 0.8)'
      }}
    >
      {/* Decorative header elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-0 right-0 w-1/3 h-full opacity-10"
          style={{ 
            background: 'radial-gradient(circle, #ef4444 0%, transparent 70%)',
            mixBlendMode: 'multiply'
          }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 w-1/4 h-full opacity-5"
          style={{ 
            background: 'radial-gradient(circle at bottom left, #3b82f6 0%, transparent 70%)',
            mixBlendMode: 'multiply'
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 flex justify-between items-center relative z-10">
        <div
          className="logo cursor-pointer transform transition-transform duration-300 hover:scale-105 flex items-center"
          onClick={() => handleNavClick('home')}
        >
          {/* Logo styling */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-700">
              <span className="text-red-600 mr-1">HU-</span>
              Tech Train
            </span>
          </div>
        </div>
        
        <nav className="animate-slide-in-down">
          <ul className="flex space-x-8 items-center">
            {/* Regular navigation items */}
            <li className="transition-all duration-300">
              <button 
                onClick={() => handleNavClick('home')} 
                className={`relative px-2 py-1 transition-colors duration-300 ${
                  activeButton === 'home' 
                    ? 'text-red-600 font-medium' 
                    : 'hover:text-red-600'
                }`}
              >
                Home
                <span 
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform transition-transform duration-300 ${
                    activeButton === 'home' 
                      ? 'scale-x-100' 
                      : 'scale-x-0'
                  }`}
                ></span>
              </button>
            </li>
            
            <li className="transition-all duration-300">
              <button 
                onClick={() => handleNavClick('about')} 
                className={`relative px-2 py-1 transition-colors duration-300 ${
                  activeButton === 'about' 
                    ? 'text-red-600 font-medium' 
                    : 'hover:text-red-600'
                }`}
              >
                About
                <span 
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform transition-transform duration-300 ${
                    activeButton === 'about' 
                      ? 'scale-x-100' 
                      : 'scale-x-0'
                  }`}
                ></span>
              </button>
            </li>
            
            {/* Login Dropdown */}
            <li className="transition-all duration-300 relative" ref={dropdownRef}>
              <button 
                onClick={toggleLoginDropdown} 
                className={`relative px-2 py-1 transition-colors duration-300 flex items-center ${
                  activeButton === 'login' 
                    ? 'text-red-600 font-medium' 
                    : 'hover:text-red-600'
                }`}
              >
                Login
                <svg 
                  className={`ml-1 w-4 h-4 transition-transform duration-300 ${showLoginDropdown ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span 
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform transition-transform duration-300 ${
                    activeButton === 'login' 
                      ? 'scale-x-100' 
                      : 'scale-x-0'
                  }`}
                ></span>
              </button>
              
              {/* Dropdown Menu with Animation */}
              {showLoginDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50 dropdown-fade-in">
                  <button
                    onClick={() => handleLoginOptionClick('student')}
                    className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 text-left dropdown-item"
                  >
                    <svg className="mr-3 h-6 w-6 text-gray-500 icon-hover" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      <circle cx="12" cy="10" r="3" strokeWidth="2" />
                      <path strokeLinecap="round" strokeWidth="2" d="M7 18.6c1.4-2 3.1-3.1 5-3.1s3.6 1.1 5 3.1" />
                    </svg>
                    <span className="text-lg">Student Login</span>
                  </button>
                  
                  <button
                    onClick={() => handleLoginOptionClick('company')}
                    className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 text-left dropdown-item"
                    style={{ animationDelay: '100ms' }}
                  >
                    <svg className="mr-3 h-6 w-6 text-gray-500 icon-hover" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect width="20" height="16" x="2" y="4" rx="2" strokeWidth="2" />
                      <path strokeWidth="2" d="M6 8h.01M6 12h.01M6 16h.01M10 8h8M10 12h8M10 16h8" />
                    </svg>
                    <span className="text-lg">Company Login</span>
                  </button>
                  
                  <button
                    onClick={() => handleLoginOptionClick('department')}
                    className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 text-left dropdown-item"
                    style={{ animationDelay: '200ms' }}
                  >
                    <svg className="mr-3 h-6 w-6 text-gray-500 icon-hover" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeWidth="2" d="M3 9l9 3m0 0l9-3m-9 3v11" />
                    </svg>
                    <span className="text-lg">Department Head Login</span>
                  </button>
                </div>
              )}
            </li>
            
            {/* Company Button - Styled like other nav items */}
            <li className="transition-all duration-300">
              <button 
                onClick={() => handleSectionToggle('company')} 
                className={`relative px-2 py-1 transition-colors duration-300 ${
                  activeSection === 'company' 
                    ? 'text-red-600 font-medium' 
                    : 'hover:text-red-600'
                }`}
              >
                Company
                <span 
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform transition-transform duration-300 ${
                    activeSection === 'company' 
                      ? 'scale-x-100' 
                      : 'scale-x-0'
                  }`}
                ></span>
              </button>
            </li>
            
            {/* Student Button - Styled like other nav items */}
            <li className="transition-all duration-300">
              <button 
                onClick={() => handleSectionToggle('student')} 
                className={`relative px-2 py-1 transition-colors duration-300 ${
                  activeSection === 'student' 
                    ? 'text-red-600 font-medium' 
                    : 'hover:text-red-600'
                }`}
              >
                Student
                <span 
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform transition-transform duration-300 ${
                    activeSection === 'student' 
                      ? 'scale-x-100' 
                      : 'scale-x-0'
                  }`}
                ></span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;