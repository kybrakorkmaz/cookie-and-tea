import {motion, AnimatePresence} from "framer-motion";
import {NavLink} from "react-router";
import {IoIosArrowForward} from "react-icons/io";
import {useProfilePeople} from "../hooks/useProfilePeople.js";

const People = ({followers}) =>{
    // Inject the connections engine seamlessly
    const {
        isFollowersTab,
        setIsFollowersTab,
        displayList,
        loading
    } = useProfilePeople(followers);

    return(
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-soft">
            {/* Tab Controls */}
            <div className="flex gap-6">
                <button
                    onClick={() => setIsFollowersTab(true)}
                    className={`font-header text-sh transition-all cursor-pointer pb-2 ${isFollowersTab ? "text-primary-dark font-bold border-b-2 border-primary-dark" : "text-gray-400"}`}
                >
                    Followers
                </button>
                <button
                    onClick={() => setIsFollowersTab(false)}
                    className={`font-header text-sh transition-all cursor-pointer pb-2 ${!isFollowersTab ? "text-primary-dark font-bold border-b-2 border-primary-dark" : "text-gray-400"}`}
                >
                    Following
                </button>
            </div>
            <hr className="border-gray-200 mb-6"/>
            <div className="min-h-40 md:min-h-45">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isFollowersTab ? 'followers' : 'following'}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-6"
                    >
                        {loading ? (
                            <div className="text-gray-400 text-sm font-paragraph animate-pulse py-4">Loading connections...</div>
                        ) : displayList.length === 0 ? (
                            <div className="text-gray-400 text-sm font-paragraph py-4">
                                {isFollowersTab ? "No followers found." : "Not following anyone yet."}
                            </div>
                        ) : (
                            displayList.map(person => (
                                <NavLink
                                    key={person.id}
                                    className="group flex items-center gap-4"
                                    to={`/profile/${encodeURIComponent(person.username)}`}
                                >
                                    {/* Image Wrapper */}
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-cream shadow-sm transition-transform group-hover:scale-105">
                                        <img
                                            className="w-full h-full object-cover"
                                            src={person.profileImage || "/default-avatar.png"} // Fixed key mapping reference to match your DB repository output schema (profileImage)
                                            alt={person.name}
                                        />
                                    </div>
                                    {/* Identity Text Context */}
                                    <div className="flex flex-col min-w-0">
                                        <span className="font-header font-bold text-primary-dark text-sm md:text-base truncate">
                                            {person.name}
                                        </span>
                                        <span className="font-paragraph text-xs md:text-sm text-gray-500 truncate">
                                            @{person.username}
                                        </span>
                                    </div>
                                </NavLink>
                            ))
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
            <NavLink className="flex items-center justify-end text-primary-dark hover:text-primary-dark/70 transition-all gap-1" to={"/people"}> <span className="font-paragraph text-xs  tracking-wider">See All</span>
                <IoIosArrowForward className="w-3 h-3" /></NavLink>
        </div>
    )
}

export default People;