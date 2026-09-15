import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const PageUpButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", toggleVisibility);
        toggleVisibility();
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            type="button"
            onClick={scrollToTop}
            tabIndex={isVisible ? 0 : -1}
            aria-hidden={!isVisible}
            aria-label="Scroll to top"
            className={`fixed bottom-8 right-8 z-50 p-4 bg-primary-dark text-white rounded-full shadow-heavy hover:bg-primary cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 transition-all duration-300 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
            }`}
        >
            <FaArrowUp className="text-xl" />
        </button>
    );
};

export default PageUpButton;
