import { useEffect, useRef } from "react";
import StepCard from "./StepCard";

// Import student images directly
import student1Img from "../../assets/images/how_it_works_student_1.png";
import student2Img from "../../assets/images/how_it_works_student_2.png";
import student3Img from "../../assets/images/how_it_works_student_3.png";
import student4Img from "../../assets/images/how_it_works_student_4.png";

const studentSteps = [
    { image: student1Img, title: "Log in to your profile", description: "Logging in takes less than 1 minute. Just enter your ID and password to start exploring opportunities." },
    { image: student2Img, title: "Search for internship", description: "Look for available internship opportunities at various companies." },
    { image: student3Img, title: "Apply for the Internship", description: "Select the company you wish to intern with and submit your application." },
    { image: student4Img, title: "Send a report at the end", description: "Send a report or documentation to the department head to document your experience." },
];

const HowItWorksStudents = () => {
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
            {studentSteps.map((step, index) => (
                <StepCard 
                    key={index} 
                    {...step} 
                    className="step-card opacity-0 translate-y-8 transition-all duration-500 ease-out"
                    animationDelay={index * 150}
                    stepNumber={index + 1}
                    accentColor="blue"
                />
            ))}
        </div>
    );
};

export default HowItWorksStudents;