import {NavLink} from "react-router";
import {useMemo} from "react";
import {getSortedActivities} from "../helpers/followingNotifications.js";


const Notifications =  ({onClose}) =>{
    const dropdownBg = "bg-white/50 backdrop-blur-md border border-gray-100/50 shadow-xl rounded-2xl overflow-hidden z-50";
    // Get latest activities (both yours and followed users)
    const latestActivities = useMemo(() => {
        const currentUserId = 1;
        const image = "/images/people/angel.jpg";
        return getSortedActivities(currentUserId, image);
    }, []);
    return(
        <>
            <div
                className="fixed inset-0 z-40"
                onClick={() => onClose()}
            />
            <div className={`absolute right-0 mt-2 w-80 ${dropdownBg} z-50`}>
                <div className="p-4 border-b border-gray-100/20 bg-primary-dark/5">
                    <h4 className="font-bold text-primary-dark">Latest Activities</h4>
                </div>
                <div className="max-h-96 overflow-y-auto">
                    {latestActivities.length > 0 ? (
                        latestActivities.map(activity => (
                            <div key={activity.id} className="p-3 flex items-center gap-3 hover:bg-white/40 transition-colors border-b border-gray-100/10">
                                <img src={activity.img} alt="" className="w-8 h-8 rounded-full object-cover" />
                                <div className="flex flex-col">
                                    <p className="text-xs text-gray-800">
                                        <span className="font-bold">{activity.user}</span> {activity.action}
                                    </p>
                                    <span className="text-[10px] text-gray-500">{activity.date}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="p-4 text-sm text-gray-500 text-center">No recent activities</p>
                    )}
                </div>
                <NavLink to="/activity" onClick={() => onClose()} className="block p-3 text-center text-xs font-bold text-primary-dark hover:bg-white/60 transition-colors bg-white/20">
                    View All Notifications
                </NavLink>
            </div>
        </>
    )
}

export default Notifications;