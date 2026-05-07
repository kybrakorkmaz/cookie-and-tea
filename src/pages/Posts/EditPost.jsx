import { useState, useRef, useEffect } from "react";
import UploadImageFile from "../../components/media/UploadImageFile.jsx";
import UploadFile from "../../components/media/UploadFile.jsx";
import MediaManager from "../../components/media/MediaManager.jsx";

const EditPost = ({ post, onClose, onUpdate, onDelete }) => {
    const createdUrlsRef = useRef([]);

    const [editPost, setEditPost] = useState({
        ...post,
        post_header: post.post_header || "",
        post_detail: post.post_detail || "",
        post_image: post.post_image || [],
        post_video: post.post_video || []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditPost(prev => ({
            ...prev,
            [name]: (name === "post_image" || name === "post_video")
                ? value.split("\n")
                : value
        }));
    };

    const handleFileUpdate = (name, files) => {
        // In a real app, upload to S3/Cloudinary here and get a URL.
        // For now, we'll create a local preview URL or use the file name
        // to ensure the state is no longer "empty".
        const newFiles = Array.from(files).map(file => {
            const url = URL.createObjectURL(file);
            createdUrlsRef.current.push(url);
            return url;
        });

        setEditPost(prev => ({
            ...prev,
            [name]: [...prev[name], ...newFiles]
        }));
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
                            name="post_header"
                            value={editPost.post_header}
                            onChange={handleChange}
                            className="w-full mt-2 p-3 border rounded-xl outline-primary-dark"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Content</label>
                        <textarea
                            name="post_detail"
                            value={editPost.post_detail}
                            onChange={handleChange}
                            className="w-full mt-2 p-3 border rounded-xl h-32 resize-none outline-primary-dark"
                        />
                    </div>

                    <MediaManager
                        label="Images" name="post_image" value={editPost.post_image}
                        onChange={handleChange} onFilesSelected={handleFileUpdate} UploadComponent={UploadImageFile}
                    />

                    <MediaManager
                        label="Videos" name="post_video" value={editPost.post_video}
                        onChange={handleChange} onFilesSelected={handleFileUpdate} UploadComponent={UploadFile}
                    />
                </div>

                {/* Action Footer */}
                <div className="p-6 border-t bg-gray-50 flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={() => {
                            if(window.confirm("Delete this post permanently?")) {
                                onDelete(editPost.post_id);
                            }
                        }}
                        className="flex-1 py-3 px-4 border-2 border-red-500 text-red-500 font-bold rounded-2xl hover:bg-red-50 transition-colors"
                    >
                        Delete Post
                    </button>
                    <button
                        onClick={() => onUpdate(editPost)}
                        className="flex-1 py-3 px-4 bg-primary-dark text-white font-bold rounded-2xl hover:opacity-90 transition-opacity shadow-lg"
                    >
                        Update Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPost;