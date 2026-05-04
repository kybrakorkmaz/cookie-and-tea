const UploadImageFile = ({ onImageUpload=null }) => {
    return (
        <div className="flex justify-center mt-4">
            <div className="rounded-lg border bg-gray-50 w-full">
                <div className="m-4">
                    <label className="inline-block mb-2 text-gray-500 text-sm">
                        Upload Image (jpg, png, webp jpeg)
                    </label>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300 cursor-pointer">
                            <div className="flex flex-col items-center justify-center pt-7">
                                {/* SVG Icon here */}
                                <p className="pt-1 text-sm text-gray-400">Select a photo</p>
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                multiple // Allow multiple if your state supports it
                                accept="image/*"
                                onChange={(e) => onImageUpload?.(e.target.files?.[0] ?? null)}
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadImageFile;