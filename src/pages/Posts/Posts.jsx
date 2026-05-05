import UserNavbar from "../../components/UserNavbar.jsx";
import { useEffect, useMemo, useState } from "react";
import { posts } from "../../constants/index.js";
import PostCard from "./PostCard.jsx";
import UserFooter from "../../components/UserFooter.jsx";
import Panel from "../Profile/Panel.jsx";

const Posts = ({ targetPostId, onTargetHandled }) => {
    const [highlightedId, setHighlightedId] = useState(null);
    const [visibleCount, setVisibleCount] = useState(5);
    const [internalTarget, setInternalTarget] = useState(null);

    const allPosts = posts[0].posts;

    const sortedPostsByDate = useMemo(() => {
        const formatDate = (dateStr) => {
            const [day, month, year] = dateStr.split("/");
            return new Date(`${year}-${month}-${day}`);
        };

        return [...allPosts].sort(
            (a, b) => formatDate(b.post_date) - formatDate(a.post_date)
        );
    }, [allPosts]);

    const totalPosts = sortedPostsByDate.length;
    const visiblePosts = sortedPostsByDate.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 5);
    };

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
        if (!internalTarget) return;

        const targetIndex = sortedPostsByDate.findIndex(
            (post) => post.post_id === internalTarget
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
    }, [internalTarget, visibleCount, sortedPostsByDate]);

    return (
        <div className="min-h-screen ">
            <div className="flex flex-col gap-10 p-6 md:p-10 max-w-4xl mx-auto">
                {visiblePosts.map((post) => (
                    <PostCard
                        key={post.post_id}
                        post={post}
                        highlightedId={highlightedId}
                    />
                ))}

                {visibleCount < totalPosts && (
                    <button
                        type="button"
                        onClick={handleLoadMore}
                        className="mx-auto px-10 py-3 bg-primary-dark text-white rounded-full font-bold hover:bg-opacity-90 transition-all"
                    >
                        Load More
                    </button>
                )}
            </div>
        </div>
    );
};

export default Posts;