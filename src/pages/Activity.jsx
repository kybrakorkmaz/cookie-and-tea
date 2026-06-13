import UserNavbar from "../components/nav-footer/user/UserNavbar.jsx";
import UserFooter from "../components/nav-footer/user/UserFooter.jsx";
import { donations, comments, following, posts, profile } from "../constants/index.js";
import { useState, useMemo } from "react";
import { FaHeart, FaComment, FaDonate, FaPlusSquare } from "react-icons/fa";
import PageUpButton from "../components/PageUpButton.jsx";

const Activity = () => {
    const [activeTab, setActiveTab] = useState("others"); // others, yours

    const activeTabStyle = "border-b-4 border-primary-dark text-primary-dark font-bold";
    const inactiveTabStyle = "text-gray-400 hover:text-gray-600";
    const currentUserId = 1;

    // Mock likes since they are not in constants
    const mockLikes = useMemo(() => [
        { id: 1, user_id: 2, action: "liked your post", date: "05/05/2026", type: "like" },
        { id: 2, user_id: 3, action: "liked your post", date: "04/05/2026", type: "like" },
    ], []);

    const formattedComments = useMemo(() => comments.map(c => ({
        id: `comment-${c.comment_id}`,
        user_id: c.commenter_id,
        user: profile.find(u => u.user_id === c.commenter_id)?.name || "User " + c.commenter_id,
        action: `commented: "${c.comment.substring(0, 40)}${c.comment.length > 40 ? '...' : ''}"`,
        date: c.commented_date,
        type: "comment"
    })), [comments, profile]);

    const formattedDonations = useMemo(() => donations.map(d => ({
        id: `donation-${d.donation_id}`,
        user_id: d.donator_id,
        user: profile.find(u => u.user_id === d.donator_id)?.name || "User " + d.donator_id,
        action: `donated $${d.donated_amount}`,
        date: d.donated_date,
        type: "donation"
    })), [donations, profile]);

    // Followed users activities (posts)
    const followedActivities = useMemo(() => {
        const followedIds = following[0]?.following.map(f => f.following_user_id) || [];
        return posts
            .flatMap(p => p.posts)
            .filter(post => followedIds.includes(post.user_id))
            .map(post => {
                const author = profile.find(u => u.user_id === post.user_id);
                return {
                    id: `post-${post.post_id}`,
                    user_id: post.user_id,
                    user: author?.name || "Unknown",
                    action: "shared a new post: " + post.post_header,
                    date: post.post_date,
                    type: "post"
                };
            });
    }, []);

    const othersActivities = useMemo(() => {
        const followedIds = following[0]?.following.map(f => f.following_user_id) || [];
        return [...mockLikes, ...formattedComments, ...formattedDonations, ...followedActivities]
            .filter(a => followedIds.includes(a.user_id))
            .sort((a, b) => {
                const dateA = new Date(a.date.split('/').reverse().join('-'));
                const dateB = new Date(b.date.split('/').reverse().join('-'));
                return dateB - dateA;
            });
    }, [mockLikes, formattedComments, formattedDonations, followedActivities]);

    const yourActivities = useMemo(() => {
        return [...formattedComments, ...formattedDonations]
            .filter(a => a.user_id === currentUserId)
            .sort((a, b) => {
                const dateA = new Date(a.date.split('/').reverse().join('-'));
                const dateB = new Date(b.date.split('/').reverse().join('-'));
                return dateB - dateA;
            });
    }, [formattedComments, formattedDonations]);

    const filteredActivities = activeTab === "others" ? othersActivities : yourActivities;

    const getIcon = (type) => {
        switch (type) {
            case "like": return <FaHeart className="text-red-500" />;
            case "comment": return <FaComment className="text-blue-500" />;
            case "donation": return <FaDonate className="text-green-500" />;
            case "post": return <FaPlusSquare className="text-purple-500" />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-cream/30">
            <UserNavbar />
            <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-8">
                <h3 className="font-header font-bold text-3xl text-primary-dark">Activity</h3>

                <div className="flex bg-white p-2 rounded-2xl shadow-soft border border-gray-100 overflow-x-auto">
                    {["others", "yours"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 min-w-25 py-4 text-center transition-all font-header capitalize tracking-wide ${activeTab === tab ? activeTabStyle : inactiveTabStyle}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col gap-4">
                    {filteredActivities.length > 0 ? (
                        filteredActivities.map((activity) => (
                            <div key={activity.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md hover:border-gray-200 transition-all">
                                <div className={`p-3 rounded-full text-xl ${
                                    activity.type === 'like' ? 'bg-red-50' :
                                    activity.type === 'comment' ? 'bg-blue-50' :
                                    activity.type === 'donation' ? 'bg-green-50' :
                                    'bg-purple-50'
                                }`}>
                                    {getIcon(activity.type)}
                                </div>
                                <div className="flex-1">
                                    <p className="font-paragraph text-gray-800">
                                        <span className="font-bold text-primary-dark">{activity.user}</span> {activity.action}
                                    </p>
                                    <p className="text-sm text-gray-500 font-paragraph">{activity.date}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 font-paragraph">
                            No activity found.
                        </div>
                    )}
                </div>
            </div>
            <UserFooter />
            <PageUpButton />
        </div>
    );
};

export default Activity;
