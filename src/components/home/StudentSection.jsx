import React, { useEffect, useRef } from "react";
import studentIllustration from "../../assets/images/student_img2.png";

const StudentSection = ({ setActivePage }) => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

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
                textRef.current.classList.remove('translate-x-10');
              }
              if (imageRef.current) {
                imageRef.current.classList.add('translate-x-0');
                imageRef.current.classList.remove('-translate-x-10');
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
      
      // Set the tab to student view
      if (window.setHowItWorksTab) {
        window.setHowItWorksTab(true); // true = student view
      }
    }
  };

  // Handler for Start Your Journey button click
  const handleStartJourneyClick = () => {
    setActivePage('studentLogin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
    {/* Full screen background - fixed position so it stays in place when scrolling */}
    <div className="absolute inset-0 -z-10 bg-gray-100"></div>
    <div className="absolute inset-0 -z-10 bg-dots-pattern opacity-5"></div>
    <section 
      ref={sectionRef} 
      className="student-section  bg-gray-100 py-16 px-8 min-h-[80vh] opacity-0 transition-opacity duration-1000 ease-in-out flex items-start pt-20"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
          
          <div 
            ref={textRef}
            className="md:w-1/2 text-center md:text-left translate-x-10 transform transition-transform duration-1000 ease-out delay-300"
          >
           <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight mb-6">
             <span className="text-red-600 inline-block animate-slide-in-left" style={{animationDelay: '400ms'}}>
               Your Journey To A
             </span> Brighter Future
             <br />
             <span className="text-red-600 inline-block animate-slide-in-right" style={{animationDelay: '600ms'}}>
               Starts With The Right Internship
             </span>
           </h1>
            <p className="text-base md:text-lg text-gray-600 mt-6 mb-8 opacity-0 animate-fade-in max-w-xl" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
              Your career journey begins with the right skills and the right guidance.
              Through our training program, you will receive the training you need in the
              right place, with the best companies ensuring you're ready for the
              professional world.
            </p>

            <div className="mt-8 flex flex-col md:flex-row space-y-4 md:space-x-5 md:space-y-0">
              <button 
                className="bg-red-600 text-white px-6 py-3 text-base rounded-lg shadow-md hover:bg-red-700 transition duration-300 transform hover:scale-105 hover:shadow-lg opacity-0 animate-bounce-in"
                onClick={handleStartJourneyClick}
                style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}
              >
                Start Your Journey
              </button>
              
              {/* Updated How It Works button */}
              <button
                className="bg-gray-600 text-white px-6 py-3 text-base rounded-lg shadow-md hover:bg-gray-700 transition duration-300 transform hover:scale-105 hover:shadow-lg opacity-0 animate-bounce-in"
                onClick={handleHowItWorksClick}
                style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}
              >
                How It Works
              </button>
            </div>
          </div>

          <div 
            ref={imageRef}
            className="md:w-1/2 mt-8 md:mt-0 flex justify-center -translate-x-10 transform transition-transform duration-1000 ease-out delay-500"
          >
            <img
              src={studentIllustration}
              alt="Student Illustration"
              className="w-full max-w-lg h-auto object-cover rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default StudentSection;