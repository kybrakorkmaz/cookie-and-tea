const MediaManager = ({ label, name, value, onRemove, onFileSelect, UploadComponent }) => (
    <div className="mb-6">
        <label className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 block">{label}</label>

        {/* Thumbnails */}
        <div className="flex flex-wrap gap-2 mb-4">
            {value.map((url, index) => (
                <div key={index} className="relative w-16 h-16">
                    <img src={url} className="w-full h-full object-cover rounded-lg border" />
                    <button
                        onClick={() => onRemove(name, index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
                    >✕</button>
                </div>
            ))}
        </div>

        {/* This now works for both Image and Video because both use onFileSelect */}
        <UploadComponent onFileSelect={(file) => onFileSelect(name, file)} />
    </div>
);
export default MediaManager;