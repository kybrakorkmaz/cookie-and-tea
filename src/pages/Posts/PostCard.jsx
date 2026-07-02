// components/PostCard.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FaPenToSquare } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import VideoPost from "./type/VideoPost.jsx";
import ImagePost from "./type/ImagePost.jsx";
import HybridPost from "./type/HybridPost.jsx";
import ShowSupporters from "./ShowSupporters.jsx";
import PostCommenters from "./structure/PostCommenters.jsx";
import EditPost from "./EditPost.jsx";
import DonateMessage from "../../components/DonateMessage.jsx";
import InteractionBar from "./structure/InteractionBar.jsx";
import User from "./User.jsx";
import PostBody from "./structure/PostBody.jsx";
import PostComment from "./structure/PostComment.jsx";
import {useAllComments} from "../Hooks/useComments.js";

const PostCard = ({ post, previewComments = [], highlightedId, isPermitted, onDelete, onUpdate }) => {
    const [activeType, setActiveType] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [donateAmount, setDonateAmount] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const isFocused = highlightedId === `post-${post.id}`;
    const currentPostId = post.id;

    // Gather the bulk comments object. React Query automatically handles query deduplication across cards!
    const { data: allCommentsLookUp, isLoading: isLoadingAllComments } = useAllComments(currentPostId);

    // Determine active list: use full database sync if toggled, otherwise fall back to previews
    const commentsToRender = activeType === 'comments'
        ? (allCommentsLookUp?.[post.id] || [])
        : previewComments;

    const handleUpdateSuccess = async (postId, editPosts, updatedFields) => {
        try {
            setIsSaving(true);
            const isSuccess = await onUpdate(postId, editPosts, updatedFields);
            if (isSuccess !== false) {
                setIsEditing(false);
            }
        } catch (error) {
            console.error("Failed to update post:", error);
        } finally {
            setIsSaving(false);
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

                    <InteractionBar
                        postId={post.id}
                        commentCount={post.commentCount ?? 0}
                        donationAmount={post.donationSum ?? 0}
                        activeType={activeType}
                        setActiveType={setActiveType}
                        setDonateAmount={setDonateAmount}
                    />

                    <PostComment postId={post.id} />

                    {/* Loading Placeholder State */}
                    {activeType === 'comments' && isLoadingAllComments && (
                        <div className="text-xs text-gray-400 animate-pulse mt-2 pl-1">
                            Loading all comments...
                        </div>
                    )}

                    {/* Comment Display Engine */}
                    {commentsToRender.length > 0 && activeType !== 'donations' && (
                        <div className="mt-1 flex flex-col gap-3">
                            {commentsToRender.map((comment, index) => (
                                <PostCommenters
                                    key={`${comment.commentId || comment.authorUsername}-${index}`}
                                    postId={post.id}
                                    commentId={comment.commentId}
                                    imgSrc={comment.authorProfileImage}
                                    name={comment.authorName}
                                    comment={comment.comment}
                                    date={comment.createdAt}
                                />
                            ))}
                        </div>
                    )}

                    <ShowSupporters showComments={activeType === 'comments'} showDonations={activeType === 'donations'} postId={post.id} userId={post.userId}/>
                </div>
            </motion.div>

            {isEditing && (
                <EditPost
                    post={post}
                    isSaving={isSaving}
                    onClose={() => setIsEditing(false)}
                    onUpdate={handleUpdateSuccess}
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