import { useState, useEffect, useRef } from "react";
import UploadImageFile from "./UploadImageFile.jsx";

const ImageUploadModal = ({ title, onClose, onConfirm }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const modalRef = useRef(null);
    const firstFocusableRef = useRef(null);
    const lastFocusableRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
            if (e.key === "Tab") {
                if (e.shiftKey) { // shift + tab
                    if (document.activeElement === firstFocusableRef.current) {
                        e.preventDefault();
                        lastFocusableRef.current?.focus();
                    }
                } else { // tab
                    if (document.activeElement === lastFocusableRef.current) {
                        e.preventDefault();
                        firstFocusableRef.current?.focus();
                    }
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        firstFocusableRef.current?.focus();

        // Prevent background scroll
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [onClose]);

    return (
        <div 
            role="dialog" 
            aria-modal="true" 
            aria-labelledby="modal-title"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            <div ref={modalRef} className="relative w-full max-w-lg bg-white rounded-2xl shadow-heavy p-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 id="modal-title" className="text-xl font-bold text-primary-dark">{title}</h2>
                    <button 
                        ref={firstFocusableRef}
                        onClick={onClose} 
                        className="text-gray-400 hover:text-black font-bold text-2xl transition-colors"
                        aria-label="Close modal"
                    >
                        ✕
                    </button>
                </div>

                <UploadImageFile onImageUpload={(file) => setSelectedFile(file)} />

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 px-4 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        ref={lastFocusableRef}
                        disabled={!selectedFile}
                        onClick={() => selectedFile && onConfirm(selectedFile)}
                        className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
                            selectedFile 
                            ? "bg-primary-dark text-white hover:opacity-90" 
                            : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
                        }`}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageUploadModal;