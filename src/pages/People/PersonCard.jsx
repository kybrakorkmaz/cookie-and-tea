import {NavLink} from "react-router";
import { motion } from "framer-motion";
const PersonCard = ({ person, isFollowing, onFollow }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex items-center justify-between p-4 md:p-6 bg-white rounded-2xl border-2 border-gray-100 shadow-sm hover:border-primary-dark/30 transition-all group"
    >
        <NavLink
            className="flex gap-4 items-center flex-1 min-w-0"
            to={`/profile?user=${encodeURIComponent(person.username)}`}
        >
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden shrink-0 border-2 border-cream shadow-inner group-hover:scale-105 transition-transform">
                <img className="w-full h-full object-cover" src={person.img} alt={person.name} />
            </div>
            <div className="flex flex-col font-paragraph min-w-0">
                <span className="font-bold text-gray-800 text-sm md:text-lg truncate">{person.name}</span>
                <span className="text-gray-400 text-xs md:text-sm truncate">{person.username}</span>
            </div>
        </NavLink>

        <button
            onClick={() => onFollow(person.id)}
            className={`px-6 py-2 rounded-full font-paragraph text-sm font-bold transition-all border ${
                isFollowing
                    ? "bg-white border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-100"
                    : "bg-primary-dark border-primary-dark text-white hover:bg-opacity-90 shadow-md"
            }`}
        >
            {isFollowing ? "Unfollow" : "Follow"}
        </button>
    </motion.div>
);
export  default PersonCard;