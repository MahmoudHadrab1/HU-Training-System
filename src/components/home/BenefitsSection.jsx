import React, { useEffect, useRef } from "react";

// Dummy images (Replace these with actual images in `assets` folder)
import studentImg from "../../assets/images/students_benefit.jpg";
import companyImg from "../../assets/images/companies_benefit.jpg";
import deptHeadImg from "../../assets/images/department_head.jpg";

// Benefit Data (To avoid repetitive code)
const benefits = [
  {
    image: studentImg,
    title: "Students",
    description:
      "Gain valuable practical experience through internships, enhancing their skills and employability.",
  },
  {
    image: companyImg,
    title: "Companies",
    description:
      "Benefit by accessing a pool of talented students, helping them find skilled interns who can contribute to their projects.",
  },
  {
    image: deptHeadImg,
    title: "Department Head",
    description:
      "Ensure that students receive quality training and meet academic requirements, facilitating successful internship experiences.",
  },
];

const BenefitsSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0');
            
            // Animate the heading after the section becomes visible
            const heading = entry.target.querySelector('.heading-container');
            if (heading) {
              heading.classList.add('translate-y-0');
              heading.classList.remove('translate-y-20');
              heading.classList.add('opacity-100');
              heading.classList.remove('opacity-0');
            }
          }
        });
      },
      { threshold: 0.2 }
    );
    
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Get the index from the data attribute
            const index = parseInt(entry.target.dataset.index);
            
            // Staggered animation with calculated delay
            setTimeout(() => {
              entry.target.classList.add('translate-y-0');
              entry.target.classList.remove('translate-y-16');
              entry.target.classList.add('opacity-100');
              entry.target.classList.remove('opacity-0');
            }, index * 150);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
  
    // Store current refs for cleanup
    const currentSectionRef = sectionRef.current;
    const currentCardRefs = cardsRef.current;
    
    // Observe the section
    if (currentSectionRef) {
      sectionObserver.observe(currentSectionRef);
    }
    
    // Observe each card
    currentCardRefs.forEach((card) => {
      if (card) {
        cardObserver.observe(card);
      }
    });
  
    // Cleanup function
    return () => {
      if (currentSectionRef) {
        sectionObserver.unobserve(currentSectionRef);
      }
      
      currentCardRefs.forEach((card) => {
        if (card) {
          cardObserver.unobserve(card);
        }
      });
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="benefits-section bg-gray-100 py-16 px-6 text-center opacity-0 transition-all duration-1000 ease-out"
     
    >
      
      {/* Header Section with enhanced animation */}
      <div className="heading-container max-w-3xl mx-auto mb-16 transform opacity-0 translate-y-20 transition-all duration-1000 ease-out">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
          That rewarding feeling of building a bridge between education and the professional world?
        </h2>
        <div className="relative">
          <h3 className="text-xl md:text-2xl text-red-600 font-semibold mt-4 inline-block">
            It's mutual
          </h3>
          {/* Animated underline effect */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-red-600 transition-all duration-1000 ease-out heading-underline"></div>
        </div>
        <p className="text-gray-600 mt-6 text-lg">
          When university students connect with companies through structured training programs, everyone benefits. 
          Students gain experience, companies find talent, and academic departments ensure quality.
        </p>
      </div>

      {/* Benefits Cards with improved staggered animations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {benefits.map((benefit, index) => (
          <div 
            key={index}
            ref={(el) => cardsRef.current[index] = el}
            data-index={index}
            className="benefit-card bg-white p-6 rounded-xl shadow-md opacity-0 translate-y-16 transition-all duration-700 ease-out transform hover:shadow-xl hover:-translate-y-2"
          >
            <div className="benefit-image-container mb-6 overflow-hidden rounded-lg relative">
              {/* Circle position indicator */}
              
              <div className="relative overflow-hidden rounded-lg group h-48">
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500 ease-out"></div>
              </div>
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h4>
            <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
          </div>
        ))}
      </div>

      {/* Add CSS for additional animations */}
      <style jsx>{`
        .heading-container.opacity-100 .heading-underline {
          width: 80px;
          transition-delay: 0.8s;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default BenefitsSection;