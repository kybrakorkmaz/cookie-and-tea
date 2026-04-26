import {FaPenToSquare} from "react-icons/fa6";
import {motion, AnimatePresence} from "framer-motion";
import {useState} from "react";

const ContentPeople = () =>{
    const [peopleHeaderState, setPeopleHeaderState] = useState(true);
    return(
        <div className="bg-white p-10 rounded-2xl shadow-soft">
            <div className="flex justify-between items-center mb-4">
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
                <FaPenToSquare className="w-5 h-5 text-gray-500 cursor-pointer hover:text-primary-dark transition-colors"/>
            </div>
            <hr className="border-gray-200 mb-6"/>
            <div className="min-h-25">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={peopleHeaderState ? 'followers' : 'following'}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-4"
                    >
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-cream shadow-sm">
                            <img
                                className="w-full h-full object-cover"
                                src={peopleHeaderState ? "/images/people/john.jpg" : "/images/people/mike.jpg"}
                                alt="user"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-header font-bold text-primary-dark">{peopleHeaderState ? "John" : "Mike"}</span>
                            <span className="font-paragraph text-sm text-gray-500">{peopleHeaderState ? "@johnscorner" : "@mikescorner"}</span>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

export default ContentPeople;