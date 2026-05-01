import UserNavbar from "../../components/UserNavbar.jsx";
import {useEffect, useState} from "react";
import {comments, posts, profile} from "../../constants/index.js";
import { motion } from "framer-motion";
import {FaMessage, FaPenToSquare} from "react-icons/fa6";
import VideoPost from "./VideoPost.jsx";
import ImagePost from "./ImagePost.jsx";
import HybridPost from "./HybridPost.jsx";
import {useLocation} from "react-router";
import {IoArrowBackCircle, IoArrowForwardCircle} from "react-icons/io5";
import {GiTwoCoins} from "react-icons/gi";
import ShowSupporters from "./ShowSupporters.jsx";
import people from "../People.jsx";
import PostCommenters from "./PostCommenters.jsx";

const Posts = () => {
    const {hash} = useLocation();
    const [highlightedId, setHighlightedId] = useState(null);
    const allPosts = posts[0].posts;
    const [isEditClicked, setIsEditClicked] = useState(false);
    const sortedPostsByDate =[...allPosts].sort((a, b) => {

        const formatDate = (dateStr) => {
            const [day, month, year] = dateStr.split("/");
            return new Date(`${year}-${month}-${day}`);
        }
        const aDate = formatDate(a.post_date);
        const bDate = formatDate(b.post_date);

        return bDate - aDate;
    });
    const [activeSupport, setActiveSupport] = useState({ postId: null, type: null });
    const [visibleCount, setVisibleCount] = useState(5); // show 5 posts when the page loaded at the first time

    // total post number
    const totalPosts = allPosts.length;

    // take the posts as many as visible count
    const visiblePosts = sortedPostsByDate.slice(0, visibleCount);


    const handleLoadMore = () =>{
        // show 5 posts more every time clicked
        setVisibleCount((prevCount) => prevCount + 5);
    }
    useEffect(() => {
        if (hash) {
            //get post id (#post-2 *> post-2)
            const targetId = hash.replace("#", "");
            setHighlightedId(targetId);

            const element = document.getElementById(targetId);
            // wait until the rendering of page is finish
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "center" // centralized the target post
                    })
                }, 100);

                // after 3 secs, remove behavior
                const timer = setTimeout(() => {
                    setHighlightedId(null);
                }, 3000);

                return () => clearTimeout(timer);
            }

        }
    }, [hash, sortedPostsByDate]);


    return (
        <div className="min-h-screen bg-cream/20">
            <UserNavbar/>
            <div className="flex flex-col gap-10 p-6 md:p-10 max-w-4xl mx-auto">
                {visiblePosts.map((post) => {
                    const isFocused = highlightedId === `post-${post.post_id}`;
                    // find all comments for the post
                    const isCommentsOpen = activeSupport.postId === post.post_id && activeSupport.type === 'comments';
                    const isDonationsOpen = activeSupport.postId === post.post_id && activeSupport.type === 'donations';

                    const postComments = comments.filter(c => c.commented_to_post_id === post.post_id);
                    // if there is at least a comment the find the latest commented person
                    let previewComment = null;
                    if (postComments.length > 0) {
                        const firstComment = postComments[0]; // take only one comment
                        const user = profile.find(u => u.user_id === firstComment.commenter_id);
                        previewComment = {...firstComment, user};
                    }
                    return (
                        <motion.div
                            key={post.post_id}
                            id={`post-${post.post_id}`}
                            animate={{
                                scale: isFocused ? 1.02 : 1,
                                backgroundColor: isFocused ? "#fefce8" : "#ffffff",
                                borderColor: isFocused ? "var(--color-primary-dark)" : "#e5e7eb",
                            }}
                            className="p-6 rounded-2xl border-2 shadow-sm relative scroll-mt-32 transition-colors duration-500"
                        >
                            {/* Post */}
                            <div className="flex flex-col gap-2">
                                { /* Edit Post Button*/}
                                <div className="flex justify-end">
                                    <button onClick={() => setIsEditClicked(true)}
                                            className="hover:text-primary-dark text-gray-400 transition-colors">
                                        <FaPenToSquare className="w-5 h-5"/>
                                    </button>
                                </div>

                                { /* Header + Date*/}
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-header font-bold text-primary-dark">{post.post_header}</h3>
                                    <span className="font-paragraph text-sm text-gray-400">{post.post_date}</span>
                                </div>

                                {post.post_detail && (
                                    <p className="font-paragraph text-gray-700 mt-2 leading-relaxed">
                                        {post.post_detail}
                                    </p>
                                )}

                                {/* Media Section */}
                                <div className="mt-4">
                                    {post.post_type === "video" && <VideoPost video={post.post_video}/>}
                                    {post.post_type === "image" && <ImagePost images={post.post_image}/>}
                                    {post.post_type === "hybrid" && <HybridPost videos={post.post_video} images={post.post_image} />}
                                </div>

                                {/* Comment and donation number*/}
                                <div className="flex justify-end mt-1 gap-4">
                                    <button
                                        onClick={() => setActiveSupport({ postId: post.post_id, type: 'comments' })}
                                        className="flex items-center gap-1 cursor-pointer hover:text-primary-dark transition-colors"
                                    >
                                        <FaMessage className="text-primary-dark w-4 h-4"/>
                                        <span className="text-sm font-bold">{post.comment}</span>
                                    </button>
                                    <button
                                        onClick={() => setActiveSupport({ postId: post.post_id, type: 'donations' })}
                                        className="flex items-center gap-1 cursor-pointer hover:text-primary-dark transition-colors"
                                    >
                                        <GiTwoCoins className="w-5 h-5 text-amber-500"/>
                                        <span className="text-sm font-bold">${post.donation}</span>
                                    </button>
                                </div>
                                {previewComment && (
                                    <PostCommenters
                                        imgSrc={previewComment.user?.profileImage}
                                        name={previewComment.user?.name}
                                        username={previewComment.user?.username}
                                        date={previewComment.commented_date}
                                        comment={previewComment.comment}
                                    />
                                )}
                                <ShowSupporters
                                    donation={isDonationsOpen}
                                    comments={isCommentsOpen}
                                    postId={post.post_id} // Hangi postun destekçilerini göstereceğini bilmesi için
                                    onClose={() => setActiveSupport({ postId: null, type: null })}
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

export  default Posts;