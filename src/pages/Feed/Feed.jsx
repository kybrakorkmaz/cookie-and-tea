import { useState, useEffect } from "react";
import { FaImage, FaVideo, FaTimes, FaNewspaper } from "react-icons/fa";
import { GrSend } from "react-icons/gr";

import { useAuth } from "../../context/AuthContext.jsx";
import useFeedTimeline from "./Hooks/useFeedTimeline.js";

// Layout components
import UserNavbar from "../../components/nav-footer/user/UserNavbar.jsx";
import UploadImageFile from "../../components/media/UploadImageFile.jsx";
import UploadVideoFile from "../../components/media/UploadVideoFile.jsx";
import PostCard from "../Posts/PostCard.jsx";
import UserFooter from "../../components/nav-footer/user/UserFooter.jsx";
import PageUpButton from "../../components/PageUpButton.jsx";
import LoadMore from "../../components/LoadMore.jsx";
import { validatePost } from "../../validations/postValidator.validation.js";
import { usePreviewComments } from "../Hooks/useComments.js";

const Feed = () => {
    // 1. Extract the current logged-in identity directly from global state
    const { user } = useAuth();
    const username = user?.username;

    const [header, setHeader] = useState("");
    const [content, setContent] = useState("");
    const [uploadedImages, setUploadedImages] = useState([]);
    const [uploadedVideos, setUploadedVideos] = useState([]);
    const [showImageUpload, setShowImageUpload] = useState(false);
    const [showVideoUpload, setShowVideoUpload] = useState(false);
    const [visibleCount, setVisibleCount] = useState(5);

    // 2. Pass the authenticated user's name directly to the timeline query
    const {
        feedTimeline: allPosts,
        loading,
        isRefetching,
        isPublishing,
        handleAddPost,
        handleUpdatePost,
        handleDeletePost
    } = useFeedTimeline(username);

    const { data: commentsMap } = usePreviewComments(username, "feed");

    const totalPosts = allPosts?.length || 0;
    const visiblePosts = allPosts?.slice(0, visibleCount) || [];

    const determinePostType = () => {
        if (uploadedImages.length > 0 && uploadedVideos.length > 0) return "hybrid";
        if (uploadedImages.length > 0) return "image";
        if (uploadedVideos.length > 0) return "video";
        return "text";
    };

    const handleCreatePost = async () => {
        const payload = {
            header: header.trim(),
            content: content.trim(),
            type: determinePostType(),
            images: uploadedImages,
            videos: uploadedVideos
        };

        const { isValid, errors } = validatePost(payload);
        if (!isValid) {
            alert(errors.join("\n"));
            return;
        }

        const formData = new FormData();
        formData.append("header", header.trim());
        formData.append("content", content.trim());
        formData.append("type", determinePostType());

        payload.images.forEach((file) => formData.append("images", file));
        payload.videos.forEach((file) => formData.append("videos", file));

        try {
            await handleAddPost(formData);
            setHeader("");
            setContent("");
            setUploadedImages([]);
            setUploadedVideos([]);
            setShowImageUpload(false);
            setShowVideoUpload(false);
        } catch (err) {
            console.error("Post creation failed:", err.message);
        }
    };

    return (
        <div className="min-h-screen bg-cream/50">
            <UserNavbar />
            <div className="max-w-3xl mx-auto px-4 py-8 mb-10 md:mb-40">

                {/* Create Post Form */}
                <div className="w-full flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                    <div className="p-4 flex flex-col gap-3">
                        <input
                            type="text"
                            placeholder="Title"
                            className="text-xl font-bold outline-none border-b border-gray-50 pb-2 focus:border-primary-dark/30"
                            value={header}
                            onChange={(e) => setHeader(e.target.value)}
                            required
                        />
                        <textarea
                            className="w-full outline-none resize-none min-h-25 text-gray-700"
                            placeholder="Write your thoughts..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        {/* File preview layouts stay here... */}
                    </div>

                    <div className="flex justify-between items-center py-3 px-4 bg-gray-50 border-t border-gray-100">
                        <div className="flex gap-4">
                            <button type="button" onClick={() => setShowImageUpload(!showImageUpload)} className="flex items-center gap-2 cursor-pointer text-gray-600">
                                <FaImage className="w-5 h-5" /> <span className="text-sm">Image</span>
                            </button>
                            <button type="button" onClick={() => setShowVideoUpload(!showVideoUpload)} className="flex items-center gap-2 cursor-pointer text-gray-600">
                                <FaVideo className="w-5 h-5" /> <span className="text-sm">Video</span>
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={handleCreatePost}
                            className="bg-primary-dark text-white p-2.5 rounded-full disabled:opacity-30 cursor-pointer"
                            disabled={isPublishing || (!header.trim() && !content.trim())}
                        >
                            <GrSend className="rotate-45" size={20} />
                        </button>
                    </div>
                </div>

                {/* Divider Line */}
                <div className="flex items-center gap-4 mb-10 group">
                    <FaNewspaper className="text-primary-dark" size={22} />
                    <hr className="flex-1 border-t-2 border-gray-200" />
                    {isRefetching && <div className="w-5 h-5 border-2 border-primary-dark border-t-transparent rounded-full animate-spin" />}
                </div>

                {/* Stream Timeline Container */}
                <div className="flex flex-col gap-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Your Feed</h2>

                    {visiblePosts.length > 0 ? (
                        visiblePosts.map((post) => {
                            // 3. THIS SECURES THE CARDS: Compares logged-in user ID with author ID
                            const isMyOwnPost = user && user.id === post.userId;
                            const comments = commentsMap?.[post.id] ?? [];

                            return (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    previewComments={comments}
                                    isPermitted={isMyOwnPost} // Passes false for creators you follow
                                    onDelete={handleDeletePost}
                                    onUpdate={handleUpdatePost}
                                />
                            );
                        })
                    ) : (!loading && !isPublishing) ? (
                        <div className="text-center py-10 text-gray-400">
                            No posts to show on your timeline yet.
                        </div>
                    ) : null}

                    {loading && <div className="text-center py-4 text-gray-500">Loading timeline...</div>}
                    {visibleCount < totalPosts && !loading && <LoadMore onClick={() => setVisibleCount(prev => prev + 5)} />}
                </div>
            </div>
            <UserFooter />
            <PageUpButton />
        </div>
    );
};

export default Feed;