import { useState } from "react";
import { motion } from "framer-motion";
import { FaMessage, FaPenToSquare } from "react-icons/fa6";
import { GiTwoCoins } from "react-icons/gi";
import { comments, profile } from "../../constants/index.js";
import VideoPost from "./VideoPost.jsx";
import ImagePost from "./ImagePost.jsx";
import HybridPost from "./HybridPost.jsx";
import ShowSupporters from "./ShowSupporters.jsx";
import PostCommenters from "./PostCommenters.jsx";
import PostComment from "./PostComment.jsx";

const PostCard = ({ post, highlightedId }) => {
    // Every cards hold its own state
    const [activeType, setActiveType] = useState(null); // 'comments', 'donations' or null
    const isFocused = highlightedId === `post-${post.post_id}`;

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

    return (
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
                    <button className="hover:text-primary-dark text-gray-400 transition-colors">
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

                <div className="flex justify-end mt-1 gap-4">
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
    );
};

export default PostCard;