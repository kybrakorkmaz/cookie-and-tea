import { useEffect,  useState } from "react";
import PostCard from "./PostCard.jsx";
import PageUpButton from "../../components/PageUpButton.jsx";
import useAllPosts from "./hooks/useAllPosts.js";
import {useParams} from "react-router";
import {useAuth} from "../../context/AuthContext.jsx";
import useDeleteProfilePost from "./hooks/useDeleteProfilePost.js";
import LoadMore from "../../components/LoadMore.jsx";
import useUpdateProfilePost from "./hooks/useUpdateProfilePost.js";

const Posts = ({ targetPostId, onTargetHandled }) => {
    const {username} = useParams(); // extract username from URL
    const { user } = useAuth(); // The logged-in authenticated user context

    const [highlightedId, setHighlightedId] = useState(null);
    const [visibleCount, setVisibleCount] = useState(5);
    const [internalTarget, setInternalTarget] = useState(null);


    // Fetch initial post data stream
    const {posts: fetchedPosts, loading} = useAllPosts(username);
    //Local state list so we can update it immediately on deletion
    const [allPosts, setAllPosts] = useState([]);
    // Sync fetched posts into state when they load
    useEffect(() => {
        if (fetchedPosts) setAllPosts(fetchedPosts);
    }, [fetchedPosts]);

    const { handleDelete } = useDeleteProfilePost(username, setAllPosts);
    const { handleUpdate } = useUpdateProfilePost(username, setAllPosts);

    const totalPosts = allPosts?.length || 0;
    const visiblePosts = allPosts?.slice(0, visibleCount) || [];

    // 1. Sync external targetPostId to internal state and clear it in parent immediately.
    // This prevents the "intent" from leaking across manual tab changes.
    useEffect(() => {
        if (targetPostId) {
            setInternalTarget(targetPostId);
            onTargetHandled();
        }
    }, [targetPostId, onTargetHandled]);

    // 2. Handle scrolling and highlighting based on the captured internalTarget.
    // This decoupled approach ensures the scroll timer isn't cleared when the parent state resets.
    useEffect(() => {
        if (!internalTarget || loading || totalPosts === 0) return;

        const targetIndex = allPosts.findIndex(
            (post) => post.id === internalTarget
        );

        if (targetIndex === -1) {
            setInternalTarget(null);
            return;
        }

        // Expand visibility if needed
        if (targetIndex >= visibleCount) {
            setVisibleCount(targetIndex + 1);
            return;
        }

        const targetId = `post-${internalTarget}`;
        setHighlightedId(targetId);

        const timer = setTimeout(() => {
            const el = document.getElementById(targetId);
            if (el) {
                el.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }
        }, 150);

        const highlightTimer = setTimeout(() => {
            setHighlightedId(null);
            setInternalTarget(null); // Finish handling the intent
        }, 2000);

        return () => {
            clearTimeout(timer);
            clearTimeout(highlightTimer);
        };
    }, [internalTarget, visibleCount, allPosts, loading, totalPosts]);

    if (loading) return <div className="text-center py-20 font-header text-gray-500">Loading...</div>;

    return (
        <div className="min-h-screen ">
            <div className="flex flex-col gap-10 p-6 md:p-10 max-w-4xl mx-auto">
                {visiblePosts.length > 0 ? (
                    visiblePosts.map((post) => {
                        const isMyOwnPost = user && user.id === post.userId;
                        return(
                            <PostCard
                                key={post.id}
                                post={post}
                                highlightedId={highlightedId}
                                isPermitted= {isMyOwnPost} // Pass exact permission down
                                onDelete={handleDelete}
                                onUpdate={handleUpdate}
                            />
                        )
                    })
                ): (
                    <div className="text-center py-20 text-gray-400 font-paragraph">
                        No posts published yet.
                    </div>
                )}
                {visibleCount < totalPosts && (
                    <LoadMore setVisibleCount={setVisibleCount}/>
                )}
            </div>
            <PageUpButton />
        </div>
    );
};

export default Posts;