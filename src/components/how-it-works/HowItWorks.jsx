import { useState, useEffect, useRef } from "react";
import HowItWorksStudents from "./HowItWorksStudents";
import HowItWorksCompanies from "./HowItWorksCompanies";

const HowItWorks = () => {
    const [isStudentView, setIsStudentView] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('opacity-100');
                        entry.target.classList.remove('opacity-0');
                    }
                });
            },
            { threshold: 0.2 }
        );

        const currentSectionRef = sectionRef.current;
        
        if (currentSectionRef) {
            observer.observe(currentSectionRef);
        }

        // Create a global function to allow external components to control the view
        window.setHowItWorksTab = (isStudent) => {
            if (isStudentView !== isStudent && !isAnimating) {
                setIsAnimating(true);
                setTimeout(() => {
                    setIsStudentView(isStudent);
                    setIsAnimating(false);
                }, 300);
            }
        };

        return () => {
            if (currentSectionRef) {
                observer.unobserve(currentSectionRef);
            }
            // Clean up when component unmounts
            delete window.setHowItWorksTab;
        };
    }, [isStudentView, isAnimating]);

    const handleViewChange = (isStudent) => {
        if (isStudentView === isStudent || isAnimating) return;
        
        setIsAnimating(true);
        setTimeout(() => {
            setIsStudentView(isStudent);
            setIsAnimating(false);
        }, 300);
    };

    return (
        <div 
            ref={sectionRef}
            id="how-it-works" 
            className="py-12 bg-gray-100 opacity-0 transition-opacity duration-1000"
        >
            <h2 className="text-3xl font-bold text-center mb-8 animate-slide-in-down">How It Works</h2>
            
            {/* Toggle Button with animation */}
            <div className="flex justify-center mb-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
                <button 
                    onClick={() => handleViewChange(true)}
                    className={`px-4 py-2 mx-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                        isStudentView 
                            ? "bg-red-600 text-white shadow-md" 
                            : "bg-gray-300 hover:bg-gray-400"
                    }`}
                >
                    For Students
                </button>
                <button 
                    onClick={() => handleViewChange(false)}
                    className={`px-4 py-2 mx-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                        !isStudentView 
                            ? "bg-red-600 text-white shadow-md" 
                            : "bg-gray-300 hover:bg-gray-400"
                    }`}
                >
                    For Companies
                </button>
            </div>

            {/* Content with animation */}
            <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                {isStudentView ? <HowItWorksStudents /> : <HowItWorksCompanies />}
            </div>
        </div>
    );
};

export default HowItWorks;