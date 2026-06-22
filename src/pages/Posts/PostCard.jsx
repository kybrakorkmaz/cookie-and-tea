import { useState } from "react";
import { motion } from "framer-motion";
import { FaPenToSquare } from "react-icons/fa6";
import {comments,  profile} from "../../constants/index.js";
import VideoPost from "./VideoPost.jsx";
import ImagePost from "./ImagePost.jsx";
import HybridPost from "./HybridPost.jsx";
import ShowSupporters from "./ShowSupporters.jsx";
import PostCommenters from "./PostCommenters.jsx";
import EditPost from "./EditPost.jsx";
import DonateMessage from "../../components/DonateMessage.jsx";
import InteractionBar from "./InteractionBar.jsx";
import apiClient from "../../api/axios.js";
import {MdDelete} from "react-icons/md";
import User from "./User.jsx";
import PostBody from "./structure/PostBody.jsx";


const PostCard = ({ post, highlightedId, isPermitted, onDelete}) => {
    // Every cards hold its own state
    const [activeType, setActiveType] = useState(null); // 'comments', 'donations' or null
    const [isEditing, setIsEditing] = useState(false);
    const [donateAmount, setDonateAmount] = useState(null);

    const isFocused = highlightedId === `post-${post.id}`;
    const currentPostId = post.id


    // preview comment
    const postComments = comments.filter(c => c.commented_to_post_id === post.id);
    let previewComment = null;
    if (postComments.length > 0) {
        const firstComment = postComments[0];
        const user = profile.find(u => u.user_id === firstComment.commenter_id);
        previewComment = { ...firstComment, user };
    }

    const handleUpdate = async (updatedPost) => {
        try {
            const response = await apiClient.put(`/api/v1/posts/${currentPostId}`, updatedPost);

            if(response.status === 200) {
                setIsEditing(false);  // Only close on success
                alert("Post updated successfully!");
                // Note: If you want text to update on screen without reloading,
                // mutate the object property or call a parent onUpdateSuccess handler here.
            }

        } catch (error) {
            console.error("Update Error:", error);
            // UI Feedback: Don't close the modal so the user doesn't lose their edits
            alert(error?.response?.data?.message || "Could not save changes. Please try again.");
        }
    };

    // Migrated from native fetch to authorization-aware apiClient
    const handleDelete = async (postId) => {
        try {
            // Replace console.log with a real DELETE request
            const response = await apiClient.delete(`/api/v1/posts/${postId}`);

            if(response.status === 200 || response.status === 204){
                setIsEditing(false);
                alert("Post deleted successfully!");
                // Success: Close modal and remove from UI
                // If using an upstream callback:
                // onPostDeleted(postId);
            }

        } catch (error) {
            console.error("Delete Error:", error);
            alert(error.response?.data?.message || "Failed to delete post. Please check your connection.");
        }
    };

    return (
        <>
            <motion.div
                id={`post-${post.id}`}
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
                        <User profileImage={post.authorProfileImage} alt={post.authorName} name={post.authorName} username={post.authorUsername}/>
                        {/* Protect the edit configuration button behind the ownership check*/}
                        {isPermitted && (
                            <div className="flex">
                                <button
                                    onClick={()=>setIsEditing(true)}
                                    className="p-2 text-gray-300 hover:text-primary-dark hover:bg-gray-50 rounded-lg transition-all"
                                >
                                    <FaPenToSquare className="w-4 h-4"/>
                                </button>
                                <button onClick={() => onDelete(currentPostId)} className="p-2 text-gray-300 hover:text-primary-dark">
                                    <MdDelete className="w-4 h-4"/>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <PostBody header={post.header} date={post.createdAt} content={post.content}/>


                    {/* Media Section */}
                    <div className="mt-2 rounded-xl overflow-hidden border border-gray-50">
                        {post.type === "video" && <VideoPost video={post.videos}/>}
                        {post.type === "image" && <ImagePost images={post.images}/>}
                        {post.type === "hybrid" && <HybridPost videos={post.videos} images={post.images} />}
                    </div>

                    {/* Interaction Bar */}
                    <InteractionBar
                        post={post}
                        activeType={activeType}
                        setActiveType={setActiveType}
                        setDonateAmount={setDonateAmount}
                    />

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
                        postId={post.id}
                        userId={post.userId}
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