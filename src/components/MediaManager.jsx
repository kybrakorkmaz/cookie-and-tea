const MediaManager = ({ label, name, value, onChange, onFilesSelected, UploadComponent }) => (
    <div>
        <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">{label}</label>
        {value.length === 0 ? (
            <UploadComponent onFilesSelected={(files) => onFilesSelected(name, files)} />
        ) : (
            <textarea
                name={name}
                value={value.join("\n")}
                onChange={onChange}
                rows={Math.min(value.length, 4)}
                className="w-full mt-2 p-3 border rounded-xl outline-primary-dark resize-none overflow-y-auto max-h-32"
            />
        )}
    </div>
);

export default MediaManager;