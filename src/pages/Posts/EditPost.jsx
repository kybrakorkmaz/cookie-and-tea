import { useState, useRef, useEffect } from "react";
import UploadImageFile from "../../components/media/UploadImageFile.jsx";
import MediaManager from "../../components/media/MediaManager.jsx";
import UploadVideoFile from "../../components/media/UploadVideoFile.jsx";

const EditPost = ({ post, onClose, onDelete, onUpdate }) => {
    const createdUrlsRef = useRef([]);

    const [editPost, setEditPost] = useState({
        ...post,
        header: post.header || "",
        content: post.content || "",
        type: post.type,
        images: post.images || [],
        videos: post.videos || []
    });

    // 1. ADD THIS: State for pending binary files
    const [pendingFiles, setPendingFiles] = useState({ images: [], videos: [] });

    // 2. ADD THIS: Standard change handler for text inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditPost(prev => ({ ...prev, [name]: value }));
    };

    // Inside EditPost.jsx
    const handleRemoveMedia = (name, index) => {
        setEditPost(prev => {
            const updatedArray = prev[name].filter((_, i) => i !== index);
            const newState = {
                ...prev,
                [name]: updatedArray
            };

            // --- AUTO-RESOLVER LOGIC ---
            const hasImages = newState.images.length > 0;
            const hasVideos = newState.videos.length > 0;

            let newType = "text";
            if (hasImages && hasVideos) newType = "hybrid";
            else if (hasImages) newType = "image";
            else if (hasVideos) newType = "video";

            return { ...newState, type: newType };
        });
    };

    const handleNewFile = (name, file) => {
        setPendingFiles(prev => ({
            ...prev,
            [name]: [...prev[name], file]
        }));

        // Add to local preview if needed
        const previewUrl = URL.createObjectURL(file);
        createdUrlsRef.current.push(previewUrl);

        setEditPost(prev => {
            const newState = {
                ...prev,
                [name]: [...prev[name], previewUrl]
            };

            // Update type based on the new total
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
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

            {/* Modal Intro */}
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">

                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center bg-white">
                    <h3 className="text-xl font-bold text-primary-dark">Edit Post Settings</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-black text-2xl">✕</button>
                </div>

                {/* Scrollable Body */}
                <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar">
                    <div>
                        <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Title</label>
                        <input
                            name="header"
                            value={editPost.header}
                            onChange={handleChange}
                            className="w-full mt-2 p-3 border rounded-xl outline-primary-dark"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Content</label>
                        <textarea
                            name="content"
                            value={editPost.content}
                            onChange={handleChange}
                            className="w-full mt-2 p-3 border rounded-xl h-32 resize-none outline-primary-dark"
                        />
                    </div>

                    <MediaManager
                        label="Images"
                        name="images"
                        value={editPost.images}
                        onRemove={handleRemoveMedia} // Your removal function
                        onFileSelect={handleNewFile} // Your new file handler
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

                {/* Action Footer */}
                <div className="p-6 border-t bg-gray-50 flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={() => {
                            if(window.confirm("Delete this post permanently?")) {
                                onDelete(editPost.id);
                            }
                        }}
                        className="flex-1 py-3 px-4 border-2 border-red-500 text-red-500 font-bold rounded-2xl hover:bg-red-50 transition-colors"
                    >
                        Delete Post
                    </button>
                    <button
                        onClick={() => onUpdate(post.id, editPost, pendingFiles)}
                        className="flex-1 py-3 px-4 bg-primary-dark text-white font-bold rounded-2xl"
                    >
                        Update Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPost;