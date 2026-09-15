import { IoIosArrowForward } from "react-icons/io";

const MostDonatedPosts = ({ userTopDonatedPosts, onPostClick }) => {

    return (
        <div className="bg-white p-10 rounded-2xl shadow-soft">
            <h3 className="font-header text-sh text-primary-dark mb-4">Top Supported Posts</h3>
            <hr className="border-gray-200 mb-6" />
            <div className="space-y-6">
                {userTopDonatedPosts.map(post => {
                    const detail = post.content || "";
                    return (
                        <div key={post.postId} className="border-b border-gray-50 last:border-0 pb-4">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-paragraph font-medium text-sm text-gray-800">{post.header}</h4>
                                <span className="font-paragraph text-xs text-gray-400">{new Date(post.date).toISOString().substring(0, 10)}</span>
                            </div>
                            <p className="font-paragraph text-gray-600 text-sm mb-3 italic">
                                {post.type === "image" ? "📷 Shared an image" : (
                                    post.type === "video" ? "🎥 Shared a video" :
                                        detail.length > 100 ? detail.slice(0, 100) + "..." : detail
                                )}
                            </p>
                            {/* Changed from NavLink to button to keep it on the same page */}
                            <button
                                onClick={() => onPostClick(post.postId)}
                                className="flex items-center justify-end text-primary-dark hover:text-primary-dark/70 transition-all gap-1 cursor-pointer w-full"
                            >
                                <span className="font-paragraph text-xs tracking-wider">See details</span>
                                <IoIosArrowForward className="w-3 h-3" />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MostDonatedPosts;