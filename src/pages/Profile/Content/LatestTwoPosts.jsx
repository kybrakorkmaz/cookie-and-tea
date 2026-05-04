import {NavLink} from "react-router";
import {IoIosArrowForward} from "react-icons/io";

const LatestTwoPosts = ({userLatestTwoPosts = []}) => {
    const sortedPostsByDate = [...userLatestTwoPosts].sort((a, b) => {
        const formatDate = (dateStr) => {
            if (!dateStr || typeof dateStr !== 'string') return null;
            const parts = dateStr.split('/');
            if (parts.length !== 3) return null;
            const [day, month, year] = parts;
            const date = new Date(`${year}-${month}-${day}`);
            return isNaN(date.getTime()) ? null : date;
        };

        const aDate = formatDate(a.post_date);
        const bDate = formatDate(b.post_date);

        if (!aDate && !bDate) return 0;
        if (!aDate) return 1; // Treat null as oldest
        if (!bDate) return -1;

        return bDate - aDate;
    });

    const latestTwo = sortedPostsByDate.slice(0, 2);
    return (
        <div className="bg-white p-10 rounded-2xl shadow-soft">
            <h3 className="font-header text-sh text-primary-dark mb-4">Latest Posts</h3>
            <hr className="border-gray-200 mb-6" />
            <div className="space-y-6">
                {latestTwo.map(post => {
                    const detail = post.post_detail || "";
                    return (
                        <div key={post.post_id} className="border-b border-gray-50 last:border-0 pb-4">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-paragraph font-medium text-sm text-gray-800">{post.post_header}</h4>
                                <span className="font-paragraph text-xs text-gray-400">{post.post_date}</span>
                            </div>
                            <p className="font-paragraph text-gray-600 text-sm mb-3 italic">
                                {post.post_type === "image" ? "📷 Shared an image" : (
                                    post.post_type === "video" ? "🎥 Shared a video" :
                                        detail.length > 100 ? detail.slice(0, 100) + "..." : detail
                                )}
                            </p>
                            <NavLink
                                to={`/posts#post-${post.post_id}`}
                                className="flex items-center justify-end text-primary-dark hover:text-primary-dark/70 transition-all gap-1"
                            >
                                <span className="font-paragraph text-xs  tracking-wider ">See details</span>
                                <IoIosArrowForward className="w-3 h-3" />
                            </NavLink>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default LatestTwoPosts;