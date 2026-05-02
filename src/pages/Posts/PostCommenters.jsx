import UserNavbar from "../../components/UserNavbar.jsx";
import { useEffect, useState } from "react";
import { posts } from "../../constants/index.js";
import { useLocation } from "react-router";
import PostCard from "./PostCard.jsx"; // Yeni bileşeni import et

const Posts = () => {
    const { hash } = useLocation();
    const [highlightedId, setHighlightedId] = useState(null);
    const allPosts = posts[0].posts;

    // Sıralama Mantığı
    const sortedPostsByDate = [...allPosts].sort((a, b) => {
        const formatDate = (dateStr) => {
            const [day, month, year] = dateStr.split("/");
            return new Date(`${year}-${month}-${day}`);
        }
        return formatDate(b.post_date) - formatDate(a.post_date);
    });

    const [visibleCount, setVisibleCount] = useState(5);
    const totalPosts = allPosts.length;
    const visiblePosts = sortedPostsByDate.slice(0, visibleCount);

    const handleLoadMore = () => setVisibleCount(prev => prev + 5);

    useEffect(() => {
        if (hash) {
            const targetId = hash.replace("#", "");
            setHighlightedId(targetId);
            const element = document.getElementById(targetId);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 100);
                setTimeout(() => setHighlightedId(null), 3000);
            }
        }
    }, [hash]);

    return (
        <div className="min-h-screen bg-cream/20">
            <UserNavbar />
            <div className="flex flex-col gap-10 p-6 md:p-10 max-w-4xl mx-auto">
                {visiblePosts.map((post) => (
                    <PostCard
                        key={post.post_id}
                        post={post}
                        highlightedId={highlightedId}
                    />
                ))}

                {visibleCount < totalPosts && (
                    <button onClick={handleLoadMore} className="mx-auto px-10 py-3 bg-primary-dark text-white rounded-full font-bold hover:bg-opacity-90 transition-all">
                        Load More
                    </button>
                )}
            </div>
        </div>
    );
}

export default Posts;