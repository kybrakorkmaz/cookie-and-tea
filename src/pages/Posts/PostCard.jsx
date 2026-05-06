import { useState } from "react";
import { motion } from "framer-motion";
import { FaMessage, FaPenToSquare } from "react-icons/fa6";
import { GiTwoCoins } from "react-icons/gi";
import {comments, DONATE_ICON, profile} from "../../constants/index.js";
import VideoPost from "./VideoPost.jsx";
import ImagePost from "./ImagePost.jsx";
import HybridPost from "./HybridPost.jsx";
import ShowSupporters from "./ShowSupporters.jsx";
import PostCommenters from "./PostCommenters.jsx";
import PostComment from "./PostComment.jsx";
import EditPost from "./EditPost.jsx";
import Donation from "../../components/Donation.jsx";
import DonateMessage from "../../components/DonateMessage.jsx";


const PostCard = ({ post, highlightedId }) => {
    // Every cards hold its own state
    const [activeType, setActiveType] = useState(null); // 'comments', 'donations' or null
    const isFocused = highlightedId === `post-${post.post_id}`;
    const [isEditing, setIsEditing] = useState(false);
    const [donateAmount, setDonateAmount] = useState(null);
    const [isDonating, setIsDonating] = useState(false);

    // preview comment
    const postComments = comments.filter(c => c.commented_to_post_id === post.post_id);
    let previewComment = null;
    if (postComments.length > 0) {
        const firstComment = postComments[0];
        const user = profile.find(u => u.user_id === firstComment.commenter_id);
        previewComment = { ...firstComment, user };
    }

    const postUser = profile.find(p => p.user_id === post.user_id);

    const handleToggle = (type) => {
        setActiveType(prev => prev === type ? null : type);
    };

    // todo import api from "../../api/axiosConfig";

    const handleUpdate = async (updatedPost) => {
        try {
            // Replace console.log with a real PUT or PATCH request
            // Using backticks for the specific post ID
            const response = await fetch(`/api/posts/${updatedPost.post_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedPost)
            });

            if (!response.ok) throw new Error("Failed to update post");

            // Success: Trigger a refresh or update parent state
            // If your parent component passed a refresh function:
            // await refreshPosts();

            setIsEditing(false); // Only close on success
            alert("Post updated successfully!");
        } catch (error) {
            console.error("Update Error:", error);
            // UI Feedback: Don't close the modal so the user doesn't lose their edits
            alert("Could not save changes. Please try again.");
        }
    };

    const handleDelete = async (postId) => {
        try {
            // Replace console.log with a real DELETE request
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error("Failed to delete post");

            // Success: Close modal and remove from UI
            // If using an upstream callback:
            // onPostDeleted(postId);

            setIsEditing(false);
            alert("Post deleted.");
        } catch (error) {
            console.error("Delete Error:", error);
            alert("Failed to delete post. Please check your connection.");
        }
    };

    return (
        <>
            <motion.div
                id={`post-${post.post_id}`}
                animate={{
                    scale: isFocused ? 1.01 : 1,
                    backgroundColor: isFocused ? "#FFFBEB" : "#ffffff", // Subtle amber tint for focus
                    borderColor: isFocused ? "var(--color-primary-dark)" : "#f3f4f6",
                }}
                className="p-5 md:p-7 rounded-2xl border-2 shadow-sm relative scroll-mt-32 transition-all duration-300 hover:shadow-md hover:border-gray-200 group"
            >
                <div className="flex flex-col gap-4">
                    {/* Top Bar: User Info & Actions */}
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full overflow-hidden border border-gray-100 shadow-sm">
                                <img className="w-full h-full object-cover" src={postUser?.profileImage} alt="profile"/>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-header font-bold text-gray-900 text-sm leading-tight">{postUser?.name}</span>
                                <span className="font-paragraph text-xs text-gray-500">@{postUser?.username}</span>
                            </div>
                        </div>
                        <button
                            onClick={()=>setIsEditing(true)}
                            className="p-2 text-gray-300 hover:text-primary-dark hover:bg-gray-50 rounded-lg transition-all"
                        >
                            <FaPenToSquare className="w-4 h-4"/>
                        </button>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-1">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                            <h3 className="text-xl md:text-2xl font-header font-extrabold text-primary-dark tracking-tight">
                                {post.post_header}
                            </h3>
                            <span className="font-paragraph text-[11px] uppercase tracking-wider text-gray-400 font-bold">
                                {post.post_date}
                            </span>
                        </div>

                        {post.post_detail && (
                            <p className="font-paragraph text-gray-600 mt-2 leading-relaxed text-sm md:text-base whitespace-pre-line">
                                {post.post_detail}
                            </p>
                        )}
                    </div>

                    {/* Media Section */}
                    <div className="mt-2 rounded-xl overflow-hidden border border-gray-50">
                        {post.post_type === "video" && <VideoPost video={post.post_video}/>}
                        {post.post_type === "image" && <ImagePost images={post.post_image}/>}
                        {post.post_type === "hybrid" && <HybridPost videos={post.post_video} images={post.post_image} />}
                    </div>

                    {/* Interaction Bar */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2 pt-4 border-t border-gray-50">
                        <div className="flex gap-2.5 bg-gray-50/80 p-1.5 rounded-full border border-gray-100 backdrop-blur-sm">
                            {Object.entries(DONATE_ICON).map(([key, iconPath]) => (
                                <Donation
                                    key={key}
                                    amount={key.split("_")[1]}
                                    icon={iconPath}
                                    onOpenDonate={setDonateAmount}
                                />
                            ))}
                        </div>

                        <div className="flex items-center gap-5">
                            <button
                                onClick={() => setActiveType(prev => prev === 'comments' ? null : 'comments')}
                                className={`group flex items-center gap-1.5 transition-all duration-200 ${activeType === 'comments' ? 'text-primary-dark' : 'text-gray-400 hover:text-primary-dark'}`}
                            >
                                <div className={`p-2 rounded-full transition-colors ${activeType === 'comments' ? 'bg-primary-dark/10' : 'group-hover:bg-gray-100'}`}>
                                    <FaMessage className="w-4 h-4"/>
                                </div>
                                <span className="text-sm font-bold">{post.comment}</span>
                            </button>

                            <button
                                onClick={() => setActiveType(prev => prev === 'donations' ? null : 'donations')}
                                className={`group flex items-center gap-1.5 transition-all duration-200 ${activeType === 'donations' ? 'text-amber-600' : 'text-gray-400 hover:text-amber-500'}`}
                            >
                                <div className={`p-2 rounded-full transition-colors ${activeType === 'donations' ? 'bg-amber-50' : 'group-hover:bg-gray-100'}`}>
                                    <GiTwoCoins className="w-5 h-5 text-amber-500"/>
                                </div>
                                <span className="text-sm font-bold">${post.donation}</span>
                            </button>
                        </div>
                    </div>

                    {/* Preview Comment (Minimalist) */}
                    {previewComment && !activeType && (
                        <div className="mt-1">
                            <PostCommenters
                                imgSrc={previewComment.user?.profileImage}
                                name={previewComment.user?.name}
                                comment={previewComment.comment}
                            />
                        </div>
                    )}

                    <ShowSupporters
                        showComments={activeType === 'comments'}
                        showDonations={activeType === 'donations'}
                        postId={post.post_id}
                        userId={post.user_id}
                    />
                </div>
            </motion.div>
            {isEditing && (
                <EditPost
                    post={post}
                    onClose={() => setIsEditing(false)}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />
            )}
            {donateAmount && (
                <DonateMessage
                    amount={donateAmount}
                    onClose={() => setDonateAmount(null)}
                />
            )}
        </>
    );
};

export default PostCard;