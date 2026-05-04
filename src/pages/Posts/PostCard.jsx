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
                    scale: isFocused ? 1.02 : 1,
                    backgroundColor: isFocused ? "#fefce8" : "#ffffff",
                    borderColor: isFocused ? "var(--color-primary-dark)" : "#e5e7eb",
                }}
                className="p-6 rounded-2xl border-2 shadow-sm relative scroll-mt-32 transition-colors duration-500"
            >
                <div className="flex flex-col gap-2">
                    <div className="flex justify-end">
                        <button
                            onClick={()=>setIsEditing(true)}
                            className="hover:text-primary-dark text-gray-400 transition-colors">
                            <FaPenToSquare className="w-5 h-5"/>
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-header font-bold text-primary-dark">{post.post_header}</h3>
                        <span className="font-paragraph text-sm text-gray-400">{post.post_date}</span>
                    </div>

                    {post.post_detail && (
                        <p className="font-paragraph text-gray-700 mt-2 leading-relaxed whitespace-pre-line">
                            {post.post_detail}
                        </p>
                    )}

                    <div className="mt-4">
                        {post.post_type === "video" && <VideoPost video={post.post_video}/>}
                        {post.post_type === "image" && <ImagePost images={post.post_image}/>}
                        {post.post_type === "hybrid" && <HybridPost videos={post.post_video} images={post.post_image} />}
                    </div>
                    <div className="flex justify-between">
                        <div className="flex gap-2 bg-gray-50 p-2 rounded-full border border-gray-100">
                            {Object.entries(DONATE_ICON).map(([key, iconPath]) => {
                                // Extract number from "donate_5_dollars"
                                const amount = key.split("_")[1];

                                return (
                                    <Donation
                                        key={key}
                                        amount={amount}
                                        icon={iconPath}
                                        alt={key.replace(/_/g, " ")}
                                        onOpenDonate={setDonateAmount}
                                    />
                                );
                            })}
                        </div>
                        <div className="flex mt-1 gap-4">
                            <button
                                onClick={() => handleToggle('comments')}
                                className={`flex items-center gap-1 cursor-pointer transition-colors ${activeType === 'comments' ? 'text-primary-dark' : 'hover:text-primary-dark'}`}
                            >
                                <FaMessage className="w-4 h-4"/>
                                <span className="text-sm font-bold">{post.comment}</span>
                            </button>
                            <button
                                onClick={() => handleToggle('donations')}
                                className={`flex items-center gap-1 cursor-pointer transition-colors ${activeType === 'donations' ? 'text-amber-600' : 'hover:text-primary-dark'}`}
                            >
                                <GiTwoCoins className="w-5 h-5 text-amber-500"/>
                                <span className="text-sm font-bold">${post.donation}</span>
                            </button>
                        </div>
                    </div>
                    <PostComment/>
                    {/* If no panel is open (comments or donations sectttion) show only a preview comment */}
                    {previewComment && !activeType && (
                        <PostCommenters
                            imgSrc={previewComment.user?.profileImage}
                            name={previewComment.user?.name}
                            username={previewComment.user?.username}
                            date={previewComment.commented_date}
                            comment={previewComment.comment}
                        />
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