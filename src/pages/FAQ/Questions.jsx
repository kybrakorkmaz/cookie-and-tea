import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useState } from "react";

const Questions = ({ id, question, answer }) => {
    const [showExplaining, setShowExplaining] = useState(false);

    // Klavye desteği (Enter veya Space tuşları için)
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setShowExplaining(!showExplaining);
        }
    };

    const contentId = `faq-answer-${id}`;

    return (
        <div className="bg-white border border-primary-dark/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* ✅ Semantic Update:
                'div' yerine 'button' kullanarak odaklanabilir (focusable) hale getirdik.
                aria-expanded ve aria-controls ile ekran okuyuculara durum bilgisi veriyoruz.
            */}
            <button
                type="button"
                aria-expanded={showExplaining}
                aria-controls={contentId}
                className="w-full flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-primary/50"
                onClick={() => setShowExplaining(!showExplaining)}
                onKeyDown={handleKeyDown}
            >
                <h3 className={`font-header text-sh transition-colors duration-300 ${showExplaining ? "text-primary" : "text-primary-dark"}`}>
                    {question}
                </h3>
                <span className="text-2xl text-primary-dark" aria-hidden="true">
                    {showExplaining ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                </span>
            </button>

            {/* Expandable Intro Area */}
            <div
                id={contentId}
                role="region"
                aria-labelledby={`faq-header-${id}`}
                className={`grid transition-all duration-300 ease-in-out ${
                    showExplaining ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="overflow-hidden">
                    <div className="p-6 pt-0">
                        <div className="w-full h-px bg-gray-100 mb-4" />
                        <p className="font-paragraph text-gray-700 leading-relaxed whitespace-pre-line">
                            {answer}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Questions;