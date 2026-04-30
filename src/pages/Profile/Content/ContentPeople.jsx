import {FaPenToSquare} from "react-icons/fa6";
import {motion, AnimatePresence} from "framer-motion";
import {useState} from "react";
import {NavLink} from "react-router";
import {IoIosArrowForward} from "react-icons/io";

const ContentPeople = ({followers, following}) =>{
    const [peopleHeaderState, setPeopleHeaderState] = useState(true);
    const people = [
        { peopleFollowers: followers.slice(0,2) },
        { peopleFollowing: following.slice(0,2) }
    ];

    return(
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-soft">
            <div className="flex gap-6">
                <button
                    onClick={() => setPeopleHeaderState(true)}
                    className={`font-header text-sh transition-all ${peopleHeaderState ? "text-primary-dark font-bold border-b-2 border-primary-dark" : "text-gray-400"}`}
                >Followers</button>
                <button
                    onClick={() => setPeopleHeaderState(false)}
                    className={`font-header text-sh transition-all ${!peopleHeaderState ? "text-primary-dark font-bold border-b-2 border-primary-dark" : "text-gray-400"}`}
                >Following</button>
            </div>
            <hr className="border-gray-200 mb-6"/>
            <div className="min-h-40 md:min-h-45">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={peopleHeaderState ? 'followers' : 'following'}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-6"
                    >
                        {(peopleHeaderState ? people[0].peopleFollowers : people[1].peopleFollowing).map(person => (
                            <NavLink key={person.id} className="group flex items-center gap-4" to={`/user=?${person.username}/profile`}>
                                {/* image */}
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-cream shadow-sm transition-transform group-hover:scale-105">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={person.img}
                                        alt={person.name}
                                    />
                                </div>
                                {/* name info */}
                                <div className="flex flex-col min-w-0"> {/* min-w-0 uzun isimlerin taşmasını önler */}
                                    <span className="font-header font-bold text-primary-dark text-sm md:text-base truncate">
                                        {person.name}
                                    </span>
                                    <span className="font-paragraph text-xs md:text-sm text-gray-500 truncate">
                                        {person.username}
                                    </span>
                                </div>
                            </NavLink>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
            <NavLink className="flex items-center justify-end font-paragraph text-sm text-primary-dark" to={"/user/people"}>See All <IoIosArrowForward/></NavLink>
        </div>
    )
}

export default ContentPeople;