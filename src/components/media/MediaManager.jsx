const MediaManager = ({ label, name, value, onRemove, onFileSelect, UploadComponent }) => (
    <div className="mb-6">
        <label className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 block">
            {label}
        </label>

        {/* Thumbnails */}
        <div className="flex flex-wrap gap-2 mb-4">
            {value.map((url, index) => (
                <div key={url} className="relative w-16 h-16">
                    {name === "videos" ? (
                        <video
                            src={url}
                            className="w-full h-full object-cover rounded-lg border"
                            muted
                        />
                    ) : (
                        <img
                            src={url}
                            alt={`${label} preview ${index + 1}`} // Fix: added alt text for lint/a11y/useAltText
                            className="w-full h-full object-cover rounded-lg border"
                        />
                    )}
                    <button
                        type="button" // Fix: explicit button type for lint/a11y/useButtonType
                        onClick={() => onRemove(name, index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
                    >
                        ✕
                    </button>
                </div>
            ))}
        </div>
        <UploadComponent onFileSelect={(file) => onFileSelect(name, file)} />
    </div>
);

export default MediaManager;