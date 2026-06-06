import UserNavbar from "../../components/nav-footer/UserNavbar.jsx";
import { useEffect, useMemo, useState } from "react";
import { posts } from "../../constants/index.js";
import PostCard from "./PostCard.jsx";
import UserFooter from "../../components/nav-footer/UserFooter.jsx";
import Panel from "../Profile/Panel.jsx";
import PageUpButton from "../../components/PageUpButton.jsx";

const Posts = ({ targetPostId, onTargetHandled }) => {
    //const [allPosts, setAllPosts] = useState([]);
    //const [loading, setLoading] = useState(true);
    const [highlightedId, setHighlightedId] = useState(null);
    const [visibleCount, setVisibleCount] = useState(5);
    const [internalTarget, setInternalTarget] = useState(null);

    const allPosts = posts[0].posts;

    /*
        useEffect(() => {
            const fetchPosts = async () => {
                try {
                    // Simulate API call or use real fetch
                    // const response = await fetch('/api/profile/posts');
                    // const data = await response.json();

                    // Using your mock data for now:
                    setAllPosts(posts[0].posts);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchPosts();
        }, []);
     */
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
        //if (!internalTarget || loading) return; // Wait for loading to finish!
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
    //if (loading) return <div className="text-center py-20">Loading...</div>;
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
            <PageUpButton />
        </div>
    );
};

export default Posts;