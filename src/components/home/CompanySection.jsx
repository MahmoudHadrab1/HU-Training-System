import React, { useEffect, useRef } from "react";
import companyIllustration from "../../assets/images/company_img1.png";

const CompanySection = ({ setActivePage }) => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0');
            
            if (entry.target === sectionRef.current) {
              if (textRef.current) {
                textRef.current.classList.add('translate-x-0');
                textRef.current.classList.remove('-translate-x-10');
              }
              if (imageRef.current) {
                imageRef.current.classList.add('translate-x-0');
                imageRef.current.classList.remove('translate-x-10');
              }
              if (buttonRef.current) {
                buttonRef.current.classList.add('opacity-100');
                buttonRef.current.classList.remove('opacity-0');
              }
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    const currentSectionRef = sectionRef.current;
    
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  // New function for How It Works button
  const handleHowItWorksClick = () => {
    const howItWorksSection = document.getElementById("how-it-works");
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: "smooth" });
      
      // Set the tab to company view
      if (window.setHowItWorksTab) {
        window.setHowItWorksTab(false); // false = company view
      }
    }
  };

  // Handler for register button click
  const handleRegisterClick = () => {
    // Add button click animation before navigating
    if (buttonRef.current) {
      buttonRef.current.classList.add('scale-95');
      setTimeout(() => {
        buttonRef.current.classList.remove('scale-95');
        // Navigate after brief animation
        setTimeout(() => {
          setActivePage('register');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 150);
      }, 150);
    } else {
      setActivePage('register');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
    <div className="absolute inset-0 -z-10 bg-gray-100"></div>
    <div className="absolute inset-0 -z-10 bg-dots-pattern opacity-5"></div>
    <section 
      ref={sectionRef} 
      className="company-section bg-gray-100 py-16 px-8 min-h-[80vh] opacity-0 transition-opacity duration-1000 ease-in-out flex items-start pt-20"
    >
       
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
        <div
          ref={textRef}
          className="md:w-1/2 text-center md:text-left -translate-x-10 transform transition-transform duration-1000 ease-out delay-300"
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight mb-6">
            <span className="text-red-600 inline-block animate-pulse-slow">Connect, collaborate, and grow</span>
            <br /> with the next generation of industry leaders
          </h1>

            <p className="text-base md:text-lg text-gray-600 mt-6 mb-8 animate-fade-in max-w-xl" style={{ animationDelay: '500ms' }}>
              Invest in the future of your industry with our training program, which helps
              you connect with and train our students. You will find the right students
              tailored to your company's needs, ensuring a perfect match for your
              organization's growth and success.
            </p>
            
            <div className="mt-8 flex flex-col md:flex-row space-y-4 md:space-x-5 md:space-y-0">
              <button 
                ref={buttonRef}
                onClick={handleRegisterClick}
                className="bg-red-600 text-white px-6 py-3 text-base rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg opacity-0 animate-fade-in relative overflow-hidden group"
                style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}
              >
                <span className="relative z-10">Register Now</span>
                <span className="absolute inset-0 bg-red-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
              </button>
              
              {/* Updated How It Works button */}
              <button
                className="bg-gray-600 text-white px-6 py-3 text-base rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg opacity-0 animate-fade-in"
                onClick={handleHowItWorksClick}
                style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}
              >
                How It Works
              </button>
            </div>
          </div>
          
          <div 
            ref={imageRef}
            className="md:w-1/2 mt-8 md:mt-0 flex justify-center translate-x-10 transform transition-transform duration-1000 ease-out delay-500"
          >
            <img
              src={companyIllustration}
              alt="Company Illustration"
              className="w-full max-w-lg h-auto object-cover rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 animate-float"
            />
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default CompanySection