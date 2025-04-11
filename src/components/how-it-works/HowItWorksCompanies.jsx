import { useEffect, useRef } from "react";
import StepCard from "./StepCard";

// Import company images directly
import company1Img from "../../assets/images/how_it_works_company_1.png";
import company2Img from "../../assets/images/how_it_works_company_2.png";
import company3Img from "../../assets/images/how_it_works_company_3.png";
import company4Img from "../../assets/images/how_it_works_company_4.png";

const companySteps = [
    { image: company1Img, title: "Register for the Platform", description: "Sign up by providing your company's details and wait for approval from the system." },
    { image: company2Img, title: "Post Available Internships", description: "After approval, upload the details of available internship opportunities on the platform." },
    { image: company3Img, title: "Review and Approve Students", description: "Evaluate student applications and approve those that meet your requirements." },
    { image: company4Img, title: "Submit a Final Report", description: "At the end of the internship, send a detailed final report about the student's performance to the department head." },
];

const HowItWorksCompanies = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const cards = entry.target.querySelectorAll('.step-card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('opacity-100', 'translate-y-0');
                                card.classList.remove('opacity-0', 'translate-y-8');
                            }, index * 150);
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        const currentContainerRef = containerRef.current;
        
        if (currentContainerRef) {
            observer.observe(currentContainerRef);
        }

        return () => {
            if (currentContainerRef) {
                observer.unobserve(currentContainerRef);
            }
        };
    }, []);

    return (
        <div 
            ref={containerRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6 transition-opacity duration-500"
        >
            {companySteps.map((step, index) => (
                <StepCard 
                    key={index} 
                    {...step} 
                    className="step-card opacity-0 translate-y-8 transition-all duration-500 ease-out"
                    animationDelay={index * 150}
                    stepNumber={index + 1}
                />
            ))}
        </div>
    );
};

export default HowItWorksCompanies;