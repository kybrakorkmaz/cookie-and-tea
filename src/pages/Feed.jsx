import UserNavbar from "../components/UserNavbar.jsx";
import {FaImage, FaVideo, FaTimes, FaNewspaper} from "react-icons/fa";
import { GrSend } from "react-icons/gr";
import { useState } from "react";
import UploadImageFile from "../components/UploadImageFile.jsx";
import UploadVideoFile from "../components/UploadFile.jsx";
import PostCard from "./Posts/PostCard.jsx";
import { posts, following } from "../constants/index.js";
import UserFooter from "../components/UserFooter.jsx";

const Feed = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [uploadedImages, setUploadedImages] = useState([]);
    const [uploadedVideos, setUploadedVideos] = useState([]);
    const [showImageUpload, setShowImageUpload] = useState(false);
    const [showVideoUpload, setShowVideoUpload] = useState(false);

    const currentUserId = 1;
    const followedUserIds = following.find(f => f.follower_id === currentUserId)?.following.map(f => f.following_user_id) || [];
    followedUserIds.push(currentUserId); // add authenticated user's own posts too
    const feedPosts = posts
        .flatMap(userPosts => userPosts.posts)
        .filter(post => followedUserIds.includes(post.user_id))
        .sort((a, b) => {
            const dateA = new Date(a.post_date.split("/").reverse().join("-"));
            const dateB = new Date(b.post_date.split("/").reverse().join("-"));
            return dateB - dateA;
        });

    const handleImageUpload = (file) => {
        if (file && uploadedImages.length < 10) {
            const reader = new FileReader();
            reader.onload = (e) => setUploadedImages([...uploadedImages, e.target.result]);
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
    const removeVideo = (index) => setUploadedVideos(uploadedVideos.filter((_, i) => i !== index));

    const handleCreatePost = () => {
        if (!title && !content) return;
        setTitle(""); setContent(""); setUploadedImages([]); setUploadedVideos([]);
        setShowImageUpload(false); setShowVideoUpload(false);
    };

    return (
        <div className="min-h-screen bg-cream/50">
            <UserNavbar />
            <div className="max-w-3xl mx-auto px-4 py-8 mb-10 md:mb-40">

                {/* Create Post */}
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

                        {/* Image Preview */}
                        {uploadedImages.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {uploadedImages.map((img, index) => (
                                    <div key={index} className="relative w-20 h-20 group">
                                        <img src={img} alt="" className="w-full h-full object-cover rounded-lg border border-gray-200" />
                                        <button
                                            onClick={() => removeImage(index)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 cursor-pointer"
                                        >
                                            <FaTimes size={10} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Video Preview */}
                        {uploadedVideos.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {uploadedVideos.map((video, index) => (
                                    <div key={index} className="relative w-32 aspect-video group bg-black rounded-lg overflow-hidden">
                                        <video src={video} className="w-full h-full object-cover" />
                                        <button
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
                                <button onClick={() => setShowImageUpload(false)} className="absolute top-2 right-2 z-10 text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
                                    <FaTimes />
                                </button>
                                <UploadImageFile onImageUpload={handleImageUpload} />
                            </div>
                        )}

                        {showVideoUpload && (
                            <div className="relative animate-in fade-in slide-in-from-top-2 duration-300">
                                <button onClick={() => setShowVideoUpload(false)} className="absolute top-2 right-2 z-10 text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
                                    <FaTimes />
                                </button>
                                <UploadVideoFile onVideoSelect={handleVideoUpload} />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between items-center py-3 px-4 bg-gray-50 border-t border-gray-100">
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowImageUpload(!showImageUpload)}
                                className={`flex items-center gap-2 cursor-pointer transition-all duration-200 hover:opacity-80 ${showImageUpload ? 'text-primary-dark font-bold' : 'text-gray-600'}`}
                            >
                                <FaImage className="w-5 h-5" />
                                <span className="text-sm">Image</span>
                            </button>
                            <button
                                onClick={() => setShowVideoUpload(!showVideoUpload)}
                                className={`flex items-center gap-2 cursor-pointer transition-all duration-200 hover:opacity-80 ${showVideoUpload ? 'text-primary-dark font-bold' : 'text-gray-600'}`}
                            >
                                <FaVideo className="w-5 h-5" />
                                <span className="text-sm">Video</span>
                            </button>
                        </div>
                        <button
                            onClick={handleCreatePost}
                            className="bg-primary-dark text-white p-2.5 rounded-full hover:bg-opacity-90 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed shadow-sm cursor-pointer"
                            disabled={!title && !content}
                        >
                            <GrSend className="rotate-45" size={20} />
                        </button>
                    </div>
                </div>

                {/* Newspaper Section with Line */}
                <div className="flex items-center gap-4 mb-10 group">
                    <FaNewspaper className="text-primary-dark transition-transform duration-300 group-hover:rotate-12" size={22} />
                    <hr className="flex-1 border-t-2 border-gray-200" />
                </div>

                {/* Feed Section */}
                <div className="flex flex-col gap-8">
                    <h2 className="text-xl font-header font-bold text-gray-800 mb-2">Your Feed</h2>
                    {feedPosts.map((post) => (
                        <PostCard key={post.post_id} post={post} />
                    ))}
                </div>

            </div>
            <UserFooter/>
        </div>
    );
};

export default Feed;