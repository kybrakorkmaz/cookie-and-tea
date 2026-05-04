import UploadImageFile from "./UploadImageFile.jsx";

const ImageUploadModal = ({ title, onClose, onConfirm }) => {
    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-heavy p-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-primary-dark">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-black font-bold text-2xl transition-colors">✕</button>
                </div>

                <UploadImageFile onImageUpload={(file) => console.log("Selected file:", file)} />

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 px-4 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-3 px-4 rounded-xl font-bold bg-primary-dark text-white hover:opacity-90 transition-opacity"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageUploadModal;