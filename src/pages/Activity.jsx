import UserNavbar from "../components/nav-footer/user/UserNavbar.jsx";
import UserFooter from "../components/nav-footer/user/UserFooter.jsx";
import { useState } from "react";
import { FaComment, FaDonate, FaUserPlus, FaTimes } from "react-icons/fa";
import PageUpButton from "../components/PageUpButton.jsx";
import { useActions } from "./Hooks/useActions.js";

const Activity = () => {
    const [activeTab, setActiveTab] = useState("received");
    const scope = activeTab === "received" ? "received" : "sent";
    const { activities, isLoading, markAsRead, deleteAction } = useActions(scope);

    const activeTabStyle = "border-b-4 border-primary-dark text-primary-dark font-bold";
    const inactiveTabStyle = "text-gray-400 hover:text-gray-600";

    const getIcon = (type) => {
        switch (type) {
            case "comment": return <FaComment className="text-blue-500" />;
            case "donation": return <FaDonate className="text-green-500" />;
            case "follow": return <FaUserPlus className="text-purple-500" />;
            default: return null;
        }
    };

    const getIconBg = (type) => {
        switch (type) {
            case "comment": return "bg-blue-50";
            case "donation": return "bg-green-50";
            case "follow": return "bg-purple-50";
            default: return "bg-gray-50";
        }
    };

    return (
        <div className="min-h-screen bg-cream/30">
            <UserNavbar />
            <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-8">
                <h3 className="font-header font-bold text-3xl text-primary-dark">Activity</h3>

                <div className="flex bg-white p-2 rounded-2xl shadow-soft border border-gray-100 overflow-x-auto">
                    {[
                        { id: "received", label: "For you" },
                        { id: "sent", label: "By you" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 min-w-25 py-4 text-center transition-all font-header tracking-wide ${activeTab === tab.id ? activeTabStyle : inactiveTabStyle}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col gap-4">
                    {isLoading ? (
                        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 text-gray-400 font-paragraph">
                            Loading activity...
                        </div>
                    ) : activities.length > 0 ? (
                        activities.map((activity) => (
                            <div
                                key={activity.id}
                                onClick={() => activity.status === "unread" && markAsRead(activity.id)}
                                className={`bg-white p-6 rounded-2xl shadow-sm border flex items-center gap-4 hover:shadow-md hover:border-gray-200 transition-all cursor-pointer ${
                                    activity.status === "unread" ? "border-primary-dark/30 bg-primary-dark/5" : "border-gray-100"
                                }`}
                            >
                                <div className={`p-3 rounded-full text-xl ${getIconBg(activity.type)}`}>
                                    {getIcon(activity.type)}
                                </div>
                                <img
                                    src={activity.img}
                                    alt=""
                                    className="w-10 h-10 rounded-full object-cover border border-gray-100"
                                />
                                <div className="flex-1">
                                    <p className="font-paragraph text-gray-800">
                                        <span className="font-bold text-primary-dark">{activity.user}</span>{" "}
                                        {activity.action}
                                    </p>
                                    <p className="text-sm text-gray-500 font-paragraph">{activity.date}</p>
                                </div>
                                {activity.status === "unread" && (
                                    <span className="w-2.5 h-2.5 rounded-full bg-primary-dark shrink-0" />
                                )}
                                <button
                                    type="button"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        deleteAction(activity.id);
                                    }}
                                    title="Delete notification"
                                    className="p-2 rounded-full text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
                                >
                                    <FaTimes />
                                </button>
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
