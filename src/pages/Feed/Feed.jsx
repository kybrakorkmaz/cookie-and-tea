// Feed.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { FaImage, FaVideo, FaTimes, FaNewspaper } from "react-icons/fa";
import { GrSend } from "react-icons/gr";

// Context & custom state cache orchestrator hooks
import { useAuth } from "../../context/AuthContext.jsx";
import useFeedTimeline from "./Hooks/useFeedTimeline.js";

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

    // Form inputs and local visibility control states
    const [header, setHeader] = useState("");
    const [content, setContent] = useState("");
    const [uploadedImages, setUploadedImages] = useState([]);
    const [uploadedVideos, setUploadedVideos] = useState([]);
    const [showImageUpload, setShowImageUpload] = useState(false);
    const [showVideoUpload, setShowVideoUpload] = useState(false);

    // Local presentational offset limits
    const [visibleCount, setVisibleCount] = useState(5);

    // 🚀 FIXED: Conditionally pass username down. If it's not my own feed, pass null
    // to stop unauthorized network requests from firing.
    const {
        feedTimeline: allPosts,
        loading,
        isRefetching,
        isPublishing,
        handleAddPost,
        handleUpdatePost,
        handleDeletePost
    } = useFeedTimeline(isMyOwnFeed ? username : null);

    const totalPosts = allPosts?.length || 0;
    const visiblePosts = allPosts?.slice(0, visibleCount) || [];

    const determinePostType = () => {
        const hasImages = uploadedImages.length > 0;
        const hasVideos = uploadedVideos.length > 0;
        if (hasImages && hasVideos) return "hybrid";
        if (hasImages) return "image";
        if (hasVideos) return "video";
        return "text";
    };

    const handleCreatePost = async () => {
        if (!header.trim() && !content.trim()) return;

        const payload = {
            header: header.trim(),
            content: content.trim(),
            type: determinePostType(),
            images: uploadedImages,
            videos: uploadedVideos
        };

        try {
            await handleAddPost(payload);

            // UI elements reset only upon confirmed server synchronization
            uploadedVideos.forEach(url => URL.revokeObjectURL(url));
            setHeader("");
            setContent("");
            setUploadedImages([]);
            setUploadedVideos([]);
            setShowImageUpload(false);
            setShowVideoUpload(false);
        } catch (err) {
            console.error("Post processing action was aborted by handler:", err.message);
        }
    };

    useEffect(() => {
        return () => {
            uploadedVideos.forEach(url => URL.revokeObjectURL(url));
        };
    }, []);

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
            setUploadedVideos(prev => [...prev, videoUrl]);
        }
    };

    const removeImage = (index) => setUploadedImages(uploadedImages.filter((_, i) => i !== index));
    const removeVideo = (index) => {
        URL.revokeObjectURL(uploadedVideos[index]);
        setUploadedVideos(uploadedVideos.filter((_, i) => i !== index));
    };

    return (
        <>
            {isMyOwnFeed ? (
                <div className="min-h-screen bg-cream/50">
                    <UserNavbar />
                    <div className="max-w-3xl mx-auto px-4 py-8 mb-10 md:mb-40">

                        {/* Create Post Form Wrapper */}
                        <div className="w-full flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8 transition-shadow duration-300 hover:shadow-md">
                            <div className="p-4 flex flex-col gap-3">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    className="text-xl font-bold outline-none border-b border-gray-50 pb-2 focus:border-primary-dark/30 transition-colors"
                                    value={header}
                                    onChange={(e) => setHeader(e.target.value)}
                                    required
                                />
                                <textarea
                                    className="w-full outline-none resize-none min-h-25 text-gray-700 font-paragraph"
                                    placeholder="Write your thoughts..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />

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
                                    disabled={isPublishing || (!header.trim() && !content.trim())}
                                >
                                    <GrSend className="rotate-45" size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Title Bar Section with Synchronized Background Spinner */}
                        <div className="flex items-center gap-4 mb-10 group">
                            <FaNewspaper className="text-primary-dark transition-transform duration-300 group-hover:rotate-12" size={22} />
                            <hr className="flex-1 border-t-2 border-gray-200" />

                            {isRefetching && (
                                <div className="w-5 h-5 border-2 border-primary-dark border-t-transparent rounded-full animate-spin transition-all" />
                            )}
                        </div>

                        {/* Stream Timeline Container */}
                        <div className="flex flex-col gap-8">
                            <h2 className="text-xl font-header font-bold text-gray-800 mb-2">Your Feed</h2>

                            {isPublishing && (
                                <div className="p-5 md:p-7 rounded-2xl border border-dashed border-gray-300 bg-white/80 animate-pulse flex flex-col gap-4 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-200" />
                                        <div className="flex flex-col gap-2">
                                            <div className="h-4 w-28 bg-gray-200 rounded" />
                                            <div className="h-3 w-16 bg-gray-100 rounded" />
                                        </div>
                                    </div>
                                    <div className="h-6 w-1/2 bg-gray-200 rounded mt-1" />
                                </div>
                            )}

                            {visiblePosts.length > 0 ? (
                                visiblePosts.map((post) => {
                                    // Clean standard ownership validation
                                    const isMyOwnPost = user && user.id === post.userId;
                                    return (
                                        <PostCard
                                            key={post.id}
                                            post={post}
                                            isPermitted={isMyOwnPost}
                                            onDelete={handleDeletePost}
                                            onUpdate={handleUpdatePost}
                                        />
                                    );
                                })
                            ) : (!loading && !isPublishing) ? (
                                <div className="text-center py-10 text-gray-400 font-paragraph">
                                    No posts to show on your timeline yet.
                                </div>
                            ) : null}

                            {loading && (
                                <div className="text-center py-4 text-gray-500 font-paragraph">
                                    Loading older entries...
                                </div>
                            )}

                            {visibleCount < totalPosts && !loading && (
                                <LoadMore onClick={() => setVisibleCount(prev => prev + 5)} />
                            )}
                        </div>
                    </div>
                    <UserFooter />
                    <PageUpButton />
                </div>
            ) : (
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