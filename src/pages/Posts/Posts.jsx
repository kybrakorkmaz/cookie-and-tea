import UserNavbar from "../../components/UserNavbar.jsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { posts } from "../../constants/index.js";
import { useLocation } from "react-router";
import PostCard from "./PostCard.jsx";
import UserFooter from "../../components/UserFooter.jsx";

const Posts = () => {
    const { hash } = useLocation();

    const [highlightedId, setHighlightedId] = useState(null);
    const [visibleCount, setVisibleCount] = useState(5);

    const lastHandledHashRef = useRef(null);

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

    useEffect(() => {
        if (!hash) return;

        // same hash → ignore
        if (lastHandledHashRef.current === hash) return;

        const targetId = hash.replace("#", "");
        const targetPostId = Number(targetId.replace("post-", ""));
        const targetIndex = sortedPostsByDate.findIndex((post) => post.post_id === targetPostId);

        if (targetIndex >= visibleCount) {
            setVisibleCount(targetIndex + 1);
            return;
        }

        lastHandledHashRef.current = hash;

        setHighlightedId(targetId);

        const element = document.getElementById(targetId);

        if (!element) return;

        const scrollTimer = setTimeout(() => {
            element.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }, 100);

        const highlightTimer = setTimeout(() => {
            setHighlightedId(null);
        }, 3000);

        return () => {
            clearTimeout(scrollTimer);
            clearTimeout(highlightTimer);
        };
    }, [hash, sortedPostsByDate, visibleCount]);

    return (
        <div className="min-h-screen bg-cream/20">
            <UserNavbar />
            <div className="flex flex-col gap-10 p-6 md:p-10 max-w-4xl mx-auto mb-14 md:mb-32 lg:mb-40">
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
            <UserFooter/>
        </div>
    );
};

export default Posts;