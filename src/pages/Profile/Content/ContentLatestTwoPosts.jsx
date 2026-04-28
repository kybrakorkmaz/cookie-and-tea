import {NavLink} from "react-router";
import {IoIosArrowForward} from "react-icons/io";

const ContentLatestTwoPosts = ({userLatestTwoPosts}) => {
    const sortedPostsByDate = [...userLatestTwoPosts].sort((a, b) => {
        const formatDate = (dateStr) => {
            const [day, month, year] = dateStr.split('/');
            return new Date(`${year}-${month}-${day}`);
        };

        const aDate = formatDate(a.post_date);
        const bDate = formatDate(b.post_date);

        return bDate - aDate;
    });

    const latestTwo = sortedPostsByDate.slice(0, 2);
    return (
        <div className="bg-white p-10 rounded-2xl shadow-soft">
            <h3 className="font-header text-sh text-primary-dark mb-4">Latest Posts</h3>
            <hr className="border-gray-200 mb-6" />
            <div className="space-y-6">
                {latestTwo.map(post => (
                    <div key={post.post_id} className="border-b border-gray-50 last:border-0 pb-4">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-header text-lg font-bold text-gray-800">{post.post_header}</h4>
                            <span className="font-paragraph text-xs text-gray-400">{post.post_date}</span>
                        </div>
                        <p className="font-paragraph text-gray-600 text-sm mb-3">
                            {post.post_type === "image" ? "📷 Shared an image" : (
                                post.post_type === "video" ? "🎥 Shared a video" :
                                    post.post_detail.length > 100 ? post.post_detail.slice(0, 100) + "..." : post.post_detail
                            )}
                        </p>
                        <NavLink to={`/post/${post.post_id}`} className="flex items-center justify-end text-primary-dark hover:text-primary-dark/70 transition-all gap-1">
                            <span className="text-xs font-bold uppercase tracking-wider">See details</span>
                            <IoIosArrowForward className="w-3 h-3" />
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ContentLatestTwoPosts;