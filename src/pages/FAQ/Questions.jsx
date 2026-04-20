import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useState } from "react";

const Questions = ({ question, answer }) => {
    const [showExplaining, setShowExplaining] = useState(false);

    return (
        <div className="bg-white border border-primary-dark/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Question Header */}
            <div
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setShowExplaining(!showExplaining)}
            >
                <h3 className={`font-header text-sh transition-colors duration-300 ${showExplaining ? "text-primary" : "text-primary-dark"}`}>
                    {question}
                </h3>
                <button className="text-2xl text-primary-dark cursor-pointer">
                    {showExplaining ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                </button>
            </div>

            {/* Expandable Content */}
            <div className={`grid transition-all duration-300 ease-in-out ${
                showExplaining ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}>
                <div className="overflow-hidden">
                    <div className="p-6 pt-0">
                        {/* Ayırıcı Çizgi (Sadece açıkken görünür) */}
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