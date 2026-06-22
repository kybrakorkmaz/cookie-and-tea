import { useState } from "react";
import { motion } from "framer-motion";
import { FaPenToSquare } from "react-icons/fa6";
import { comments, profile } from "../../constants/index.js";
import VideoPost from "./VideoPost.jsx";
import ImagePost from "./ImagePost.jsx";
import HybridPost from "./HybridPost.jsx";
import ShowSupporters from "./ShowSupporters.jsx";
import PostCommenters from "./PostCommenters.jsx";
import EditPost from "./EditPost.jsx";
import DonateMessage from "../../components/DonateMessage.jsx";
import InteractionBar from "./InteractionBar.jsx";
import apiClient from "../../api/axios.js";
import { MdDelete } from "react-icons/md";
import User from "./User.jsx";
import PostBody from "./structure/PostBody.jsx";

const PostCard = ({ post, highlightedId, isPermitted, onDelete }) => {
    const [activeType, setActiveType] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [donateAmount, setDonateAmount] = useState(null);

    const isFocused = highlightedId === `post-${post.id}`;
    const currentPostId = post.id;

    // Preview comment tracking logic
    const postComments = comments.filter(c => c.commented_to_post_id === post.id);
    let previewComment = null;
    if (postComments.length > 0) {
        const firstComment = postComments[0];
        const userMatch = profile.find(u => u.user_id === firstComment.commenter_id);
        previewComment = { ...firstComment, user: userMatch };
    }

    const handleUpdate = async (updatedPost) => {
        try {
            const response = await apiClient.put(`/api/v1/posts/${currentPostId}`, updatedPost);
            if (response.status === 200) {
                setIsEditing(false);
                alert("Post updated successfully!");
            }
        } catch (error) {
            console.error("Update Error:", error);
            alert(error?.response?.data?.message || "Could not save changes. Please try again.");
        }
    };

    return (
        <>
            <motion.div
                id={`post-${post.id}`}
                animate={{
                    scale: isFocused ? 1.01 : 1,
                    backgroundColor: isFocused ? "#FFFBEB" : "#ffffff",
                    borderColor: isFocused ? "var(--color-primary-dark)" : "#f3f4f6",
                }}
                className="p-5 md:p-7 rounded-2xl border-2 shadow-sm relative scroll-mt-32 transition-all duration-300 hover:shadow-md hover:border-gray-200 group"
            >
                <div className="flex flex-col gap-4">
                    {/* Top Bar */}
                    <div className="flex justify-between items-start">
                        <User profileImage={post.authorProfileImage} alt={post.authorName} name={post.authorName} username={post.authorUsername}/>
                        {isPermitted && (
                            <div className="flex">
                                <button
                                    onClick={() => setIsEditing(true)}
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

                    <PostBody header={post.header} date={post.createdAt} content={post.content}/>

                    {/* Media Display */}
                    <div className="mt-2 rounded-xl overflow-hidden border border-gray-50">
                        {post.type === "video" && <VideoPost video={post.videos}/>}
                        {post.type === "image" && <ImagePost images={post.images}/>}
                        {post.type === "hybrid" && <HybridPost videos={post.videos} images={post.images} />}
                    </div>

                    <InteractionBar post={post} activeType={activeType} setActiveType={setActiveType} setDonateAmount={setDonateAmount}/>

                    {previewComment && !activeType && (
                        <div className="mt-1">
                            <PostCommenters imgSrc={previewComment.user?.profileImage} name={previewComment.user?.name} comment={previewComment.comment}/>
                        </div>
                    )}

                    <ShowSupporters showComments={activeType === 'comments'} showDonations={activeType === 'donations'} postId={post.id} userId={post.userId}/>
                </div>
            </motion.div>

            {isEditing && (
                <EditPost
                    post={post}
                    onClose={() => setIsEditing(false)}
                    onUpdate={handleUpdate}
                    onDelete={() => {
                        setIsEditing(false);
                        onDelete(currentPostId);
                    }}
                />
            )}
            {donateAmount && <DonateMessage amount={donateAmount} onClose={() => setDonateAmount(null)}/>}
        </>
    );
};

export default PostCard;