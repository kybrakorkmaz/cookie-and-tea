import { useState, useRef, useEffect } from "react";
import { FaCircleNotch } from "react-icons/fa";
import UploadImageFile from "../../components/media/UploadImageFile.jsx";
import MediaManager from "../../components/media/MediaManager.jsx";
import UploadVideoFile from "../../components/media/UploadVideoFile.jsx";

const EditPost = ({ post, isSaving, onClose, onDelete, onUpdate }) => {
    const createdUrlsRef = useRef([]);

    const [editPost, setEditPost] = useState({
        ...post,
        header: post.header || "",
        content: post.content || "",
        type: post.type,
        images: post.images || [],
        videos: post.videos || []
    });

    // State for pending binary files
    const [pendingFiles, setPendingFiles] = useState({ images: [], videos: [] });

    // Standard change handler for text inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditPost(prev => ({ ...prev, [name]: value }));
    };

    // Media removal handler
    const handleRemoveMedia = (name, index) => {
        const removedUrl = editPost[name][index];

        if (removedUrl?.startsWith("blob:")) {
            const pendingIndex = editPost[name]
                .slice(0, index)
                .filter(url => url.startsWith("blob:"))
                .length;

            setPendingFiles(prev => ({
                ...prev,
                [name]: prev[name].filter((_, i) => i !== pendingIndex)
            }));
        }

        setEditPost(prev => {
            const updatedArray = prev[name].filter((_, i) => i !== index);
            const newState = {
                ...prev,
                [name]: updatedArray
            };

            const hasImages = newState.images.length > 0;
            const hasVideos = newState.videos.length > 0;

            let newType = "text";
            if (hasImages && hasVideos) newType = "hybrid";
            else if (hasImages) newType = "image";
            else if (hasVideos) newType = "video";

            return { ...newState, type: newType };
        });
    };

    // File selection handler
    const handleNewFile = (name, file) => {
        if (!file) return;

        setPendingFiles(prev => ({
            ...prev,
            [name]: [...prev[name], file]
        }));

        // Add to local preview
        const previewUrl = URL.createObjectURL(file);
        createdUrlsRef.current.push(previewUrl);

        setEditPost(prev => {
            const newState = {
                ...prev,
                [name]: [...prev[name], previewUrl]
            };

            const hasImages = newState.images.length > 0;
            const hasVideos = newState.videos.length > 0;

            let newType = "text";
            if (hasImages && hasVideos) newType = "hybrid";
            else if (hasImages) newType = "image";
            else if (hasVideos) newType = "video";

            return { ...newState, type: newType };
        });
    };

    useEffect(() => {
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            createdUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
        };
    }, []);

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
            {/* Backdrop — Blocks click-to-close while uploading */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => !isSaving && onClose()}
            />

            {/* Modal Body */}
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center bg-white">
                    <h3 className="text-xl font-bold text-primary-dark">Edit Post Settings</h3>
                    <button
                        onClick={onClose}
                        disabled={isSaving}
                        className="text-gray-400 hover:text-black text-2xl disabled:opacity-20 disabled:cursor-not-allowed transition-opacity"
                    >
                        ✕
                    </button>
                </div>

                {/* Scrollable Body */}
                <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar">
                    <div>
                        <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Title</label>
                        <input
                            name="header"
                            value={editPost.header}
                            onChange={handleChange}
                            disabled={isSaving}
                            className="w-full mt-2 p-3 border rounded-xl outline-primary-dark disabled:bg-gray-50 disabled:text-gray-400"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Content</label>
                        <textarea
                            name="content"
                            value={editPost.content}
                            onChange={handleChange}
                            disabled={isSaving}
                            className="w-full mt-2 p-3 border rounded-xl h-32 resize-none outline-primary-dark disabled:bg-gray-50 disabled:text-gray-400"
                        />
                    </div>

                    {/* Disable media managers inside the modal layout during updates */}
                    <div className={isSaving ? "pointer-events-none opacity-60 transition-opacity" : ""}>
                        <MediaManager
                            label="Images"
                            name="images"
                            value={editPost.images}
                            onRemove={handleRemoveMedia}
                            onFileSelect={handleNewFile}
                            UploadComponent={UploadImageFile}
                        />

                        <MediaManager
                            label="Videos"
                            name="videos"
                            value={editPost.videos}
                            onRemove={handleRemoveMedia}
                            onFileSelect={handleNewFile}
                            UploadComponent={UploadVideoFile}
                        />
                    </div>
                </div>

                {/* Action Footer */}
                <div className="p-6 border-t bg-gray-50 flex flex-col sm:flex-row gap-3">
                    <button
                        disabled={isSaving}
                        onClick={() => {
                            if(window.confirm("Delete this post permanently?")) {
                                onDelete(editPost.id);
                            }
                        }}
                        className="flex-1 py-3 px-4 border-2 border-red-500 text-red-500 font-bold rounded-2xl hover:bg-red-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                    >
                        Delete Post
                    </button>

                    <button
                        disabled={isSaving}
                        onClick={() => onUpdate(post.id, editPost, pendingFiles)}
                        className="flex-1 py-3 px-4 bg-primary-dark text-white font-bold rounded-2xl flex items-center justify-center transition-all disabled:opacity-80 disabled:cursor-not-allowed min-w-[120px]"
                    >
                        {isSaving ? (
                            <FaCircleNotch className="w-5 h-5 animate-spin" />
                        ) : (
                            "Update Post"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPost;