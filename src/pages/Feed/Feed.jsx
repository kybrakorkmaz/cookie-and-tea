import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { FaImage, FaVideo, FaTimes, FaNewspaper } from "react-icons/fa";
import { GrSend } from "react-icons/gr";

// State and context handlers
import { useAuth } from "../../context/AuthContext.jsx";
import useFeedTimeline from "./Hooks/useFeedTimeline.js";
import { createPost, updatePost, deletePost } from "./Hooks/handlePostActions.js";

// Layout presentation components
import UserNavbar from "../../components/nav-footer/user/UserNavbar.jsx";
import UploadImageFile from "../../components/media/UploadImageFile.jsx";
import UploadVideoFile from "../../components/media/UploadFile.jsx";
import PostCard from "../Posts/PostCard.jsx";
import UserFooter from "../../components/nav-footer/user/UserFooter.jsx";
import PageUpButton from "../../components/PageUpButton.jsx";
import LoadMore from "../../components/LoadMore.jsx";

const Feed = () => {
    const { username } = useParams();
    const { user } = useAuth();

    const isMyOwnFeed = user?.username === username;

    // Form inputs and media file tracking hooks
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [uploadedImages, setUploadedImages] = useState([]);
    const [uploadedVideos, setUploadedVideos] = useState([]);
    const [showImageUpload, setShowImageUpload] = useState(false);
    const [showVideoUpload, setShowVideoUpload] = useState(false);

    // Paginated hook manager data structure
    const {
        feedTimeline: allPosts,
        setFeedTimeline: setAllPosts,
        loading,
        hasMore,
        loadMorePosts
    } = useFeedTimeline(username);

    // Create pipeline handler
    const handleCreatePost = async () => {
        if (!title && !content) return;
        try {
            const newPost = await createPost(username, {
                title,
                content,
                images: uploadedImages,
                videos: uploadedVideos
            });

            if (newPost) setAllPosts(prev => [newPost, ...prev]);

            // Clean dynamic references out of browser cache allocation blocks
            uploadedVideos.forEach(url => URL.revokeObjectURL(url));
            setTitle("");
            setContent("");
            setUploadedImages([]);
            setUploadedVideos([]);
            setShowImageUpload(false);
            setShowVideoUpload(false);
        } catch (err) {
            console.error("Failed to append created post:", err.message);
        }
    };

    // Component unmount layout optimization handler
    useEffect(() => {
        return () => {
            uploadedVideos.forEach(url => URL.revokeObjectURL(url));
        };
    }, [uploadedVideos]);

    // Local media tracking modifiers
    const handleImageUpload = (file) => {
        if (file && uploadedImages.length < 10) {
            const reader = new FileReader();
            reader.onload = (e) => setUploadedImages(prev => [...prev, e.target.result]);
            reader.readAsDataURL(file);
        }
    };

    const handleVideoUpload = (file) => {
        if (file && uploadedVideos.length < 5) {
            const videoUrl = URL.createObjectURL(file);
            setUploadedVideos([...uploadedVideos, videoUrl]);
        }
    };

    const removeImage = (index) => setUploadedImages(uploadedImages.filter((_, i) => i !== index));
    const removeVideo = (index) => {
        URL.revokeObjectURL(uploadedVideos[index]);
        setUploadedVideos(uploadedVideos.filter((_, i) => i !== index));
    };

    // Real-time inline timeline mutators
    const handleDelete = async (postId) => {
        try {
            const success = await deletePost(postId);
            if (success) {
                setAllPosts(prev => prev.filter(post => post.id !== postId));
            }
        } catch (err) {
            console.error("Failed to delete post:", err.message);
        }
    };

    const handleUpdate = async (postId, updatedFields) => {
        try {
            const updatedPost = await updatePost(postId, updatedFields);
            if (updatedPost) {
                setAllPosts(prev => prev.map(post => post.id === postId ? updatedPost : post));
            }
        } catch (err) {
            console.error("Failed to apply post update parameters:", err.message);
        }
    };

    return (
        <>
            {isMyOwnFeed ? (
                <div className="min-h-screen bg-cream/50">
                    <UserNavbar />
                    <div className="max-w-3xl mx-auto px-4 py-8 mb-10 md:mb-40">

                        {/* Create Post Form */}
                        <div className="w-full flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8 transition-shadow duration-300 hover:shadow-md">
                            <div className="p-4 flex flex-col gap-3">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    className="text-xl font-bold outline-none border-b border-gray-50 pb-2 focus:border-primary-dark/30 transition-colors"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                                <textarea
                                    className="w-full outline-none resize-none min-h-25 text-gray-700 font-paragraph"
                                    placeholder="Write your thoughts..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />

                                {/* Image Preview Grid Container */}
                                {uploadedImages.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {uploadedImages.map((img, index) => (
                                            <div key={index} className="relative w-20 h-20 group">
                                                <img src={img} alt="" className="w-full h-full object-cover rounded-lg border border-gray-200" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 cursor-pointer"
                                                >
                                                    <FaTimes size={10} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Video Preview Container */}
                                {uploadedVideos.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {uploadedVideos.map((video, index) => (
                                            <div key={index} className="relative w-32 aspect-video group bg-black rounded-lg overflow-hidden">
                                                <video src={video} className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeVideo(index)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 cursor-pointer"
                                                >
                                                    <FaTimes size={10} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {showImageUpload && (
                                    <div className="relative animate-in fade-in slide-in-from-top-2 duration-300">
                                        <button type="button" onClick={() => setShowImageUpload(false)} className="absolute top-2 right-2 z-10 text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
                                            <FaTimes />
                                        </button>
                                        <UploadImageFile onImageUpload={handleImageUpload} />
                                    </div>
                                )}

                                {showVideoUpload && (
                                    <div className="relative animate-in fade-in slide-in-from-top-2 duration-300">
                                        <button type="button" onClick={() => setShowVideoUpload(false)} className="absolute top-2 right-2 z-10 text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
                                            <FaTimes />
                                        </button>
                                        <UploadVideoFile onVideoSelect={handleVideoUpload} />
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between items-center py-3 px-4 bg-gray-50 border-t border-gray-100">
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowImageUpload(!showImageUpload)}
                                        className={`flex items-center gap-2 cursor-pointer transition-all duration-200 hover:opacity-80 ${showImageUpload ? 'text-primary-dark font-bold' : 'text-gray-600'}`}
                                    >
                                        <FaImage className="w-5 h-5" />
                                        <span className="text-sm">Image</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowVideoUpload(!showVideoUpload)}
                                        className={`flex items-center gap-2 cursor-pointer transition-all duration-200 hover:opacity-80 ${showVideoUpload ? 'text-primary-dark font-bold' : 'text-gray-600'}`}
                                    >
                                        <FaVideo className="w-5 h-5" />
                                        <span className="text-sm">Video</span>
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleCreatePost}
                                    className="bg-primary-dark text-white p-2.5 rounded-full hover:bg-primary-dark/90 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed shadow-sm cursor-pointer"
                                    disabled={!title && !content}
                                >
                                    <GrSend className="rotate-45" size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Newspaper Section with Decorative Break Line */}
                        <div className="flex items-center gap-4 mb-10 group">
                            <FaNewspaper className="text-primary-dark transition-transform duration-300 group-hover:rotate-12" size={22} />
                            <hr className="flex-1 border-t-2 border-gray-200" />
                        </div>

                        {/* Interactive Timeline Stream Feed Section */}
                        <div className="flex flex-col gap-8">
                            <h2 className="text-xl font-header font-bold text-gray-800 mb-2">Your Feed</h2>

                            {allPosts.length > 0 ? (
                                allPosts.map((post) => {
                                    const isMyOwnPost = user && user.id === post.userId;
                                    return (
                                        <PostCard
                                            key={post.id}
                                            post={post}
                                            isPermitted={isMyOwnPost}
                                            onDelete={handleDelete}
                                            onUpdate={handleUpdate}
                                        />
                                    );
                                })
                            ) : !loading ? (
                                <div className="text-center py-10 text-gray-400 font-paragraph">
                                    No posts to show on your timeline yet.
                                </div>
                            ) : null}

                            {loading && (
                                <div className="text-center py-4 text-gray-500 font-paragraph">
                                    Loading older entries...
                                </div>
                            )}

                            {hasMore && !loading && (
                                <LoadMore onClick={loadMorePosts} />
                            )}
                        </div>
                    </div>
                    <UserFooter />
                    <PageUpButton />
                </div>
            ) : (
                /* Fallback structural context frame when path route parameters mismatch authorization */
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
                    <div className="text-center max-w-sm bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                        <h2 className="text-xl font-header font-bold text-gray-800 mb-2">Private Timeline</h2>
                        <p className="text-gray-500 text-sm font-paragraph mb-4">
                            You are not authorized to directly manage or view another user's interactive post execution channel.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Feed;