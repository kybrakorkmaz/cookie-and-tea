import UserNavbar from "../../components/UserNavbar.jsx";
import { FaCamera, FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router";
import { IoIosArrowDown, IoIosArrowForward, IoMdAdd } from "react-icons/io";
import { profile } from "../../constants/index.js";
import { FaPenToSquare, FaXTwitter } from "react-icons/fa6";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Animasyon için

const Profile = () => {
    const [isEarningActive, setIsEarningActive] = useState(false);
    const [earningDays, setEarningDays] = useState("Last 30 days");
    const [peopleHeaderState, setPeopleHeaderState]= useState(true);

    const earned = 85;
    const strokeStyle = {
        WebkitTextStroke: `0.7px black`,
        textShadow: "0 0.5px 0.7px rgba(0,0,0,0.3)"
    };

    // Seçim yapıldığında dropdown'ı kapatan yardımcı fonksiyon
    const handleEarningSelect = (days) => {
        setEarningDays(days);
        setIsEarningActive(false);
    };

    return (
        <div className="bg-cream/50 min-h-screen pb-20">
            <UserNavbar />

            {/* Panel Section */}
            <div className="w-5/6 mx-auto mt-10 rounded-2xl overflow-hidden border border-primary-dark bg-white shadow-soft">
                {/* Cover Area */}
                <div className="relative w-full h-60 md:h-80 lg:h-[450px]">
                    <img className="absolute inset-0 w-full h-full object-cover object-center" src="/images/profile/angels-background.jpg" alt="cover"/>

                    <div className="absolute top-6 right-6">
                        <button className="flex items-center bg-white/90 hover:bg-white border border-primary-dark rounded-xl py-2 px-6 transition-all active:scale-95 cursor-pointer shadow-md">
                            <FaCamera className="w-5 h-auto mr-2 text-primary-dark"/>
                            <span className="font-paragraph font-bold text-sm">Cover</span>
                        </button>
                    </div>

                    {/* User Info Overlapping Cover */}
                    <div className="absolute -bottom-12 left-12 flex items-end gap-6">
                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-heavy bg-white">
                            <img className="w-full h-full object-cover object-top" src="/images/people/angel.jpg" alt="profile"/>
                        </div>
                        <div className="flex flex-col mb-14 md:mb-16">
                            <span className="font-header text-2xl md:text-4xl font-bold text-white" style={strokeStyle}>Angel</span>
                            <span className="font-paragraph text-sm md:text-base font-bold text-white" style={strokeStyle}>@angelscorner</span>
                        </div>
                    </div>
                </div>

                {/* Panel Navbar */}
                <div className="w-full flex justify-between items-center h-24 bg-white mt-4">
                    <div className="flex font-header text-sh text-primary-dark p-4 pl-24 md:pl-64 gap-8">
                        <NavLink to="/user/about" className={({isActive}) => isActive ? "border-b-2 border-primary-dark" : "hover:text-primary"}>About</NavLink>
                        <NavLink to="/user/gallery" className={({isActive}) => isActive ? "border-b-2 border-primary-dark" : "hover:text-primary"}>Gallery</NavLink>
                        <NavLink to="/user/posts" className={({isActive}) => isActive ? "border-b-2 border-primary-dark" : "hover:text-primary"}>Posts</NavLink>
                    </div>
                    <button className="p-2 rounded-xl text-primary-dark border border-primary-dark hover:bg-primary-dark hover:text-white transition-all active:scale-95 mr-12">
                        <IoMdAdd className="h-8 w-8" />
                    </button>
                </div>
            </div>

            {/* Profile Detail Section */}
            <div className="flex flex-col lg:flex-row w-5/6 mx-auto gap-8 mt-16">
                {/* LEFT COLUMN */}
                <div className="w-full lg:w-1/2 space-y-8">
                    {/* About Card */}
                    <div className="bg-white p-10 rounded-2xl shadow-soft">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-header text-sh">About</h3>
                            <FaPenToSquare className="w-6 h-6 text-gray-500 cursor-pointer hover:text-primary-dark transition-colors"/>
                        </div>
                        <hr className="border-gray-200 mb-6"/>
                        <p className="font-paragraph text-gray-700 leading-relaxed">{profile[0].about}</p>
                    </div>

                    {/* Socials Card */}
                    <div className="bg-white p-10 rounded-2xl shadow-soft text-primary-dark">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-header text-sh">Socials</h3>
                            <FaPenToSquare className="w-6 h-6 text-gray-500 cursor-pointer hover:text-primary-dark transition-colors"/>
                        </div>
                        <hr className="border-gray-200 mb-6"/>
                        <div className="flex justify-center gap-12 pt-4 text-primary-dark">
                            <a href="#" className="hover:scale-110 transition-transform"><FaXTwitter className="w-10 h-10" /></a>
                            <a href="#" className="hover:scale-110 transition-transform"><FaInstagram className="w-10 h-10" /></a>
                        </div>
                    </div>

                    {/* Earnings Card with Animation */}
                    <div className="bg-white p-10 rounded-2xl shadow-soft">
                        <div className="flex items-center justify-center gap-4">
                            <h3 className="font-header text-sh text-primary-dark">Earnings</h3>
                            <div className="relative w-52">
                                <button
                                    onClick={() => setIsEarningActive(!isEarningActive)}
                                    className="flex w-full justify-between items-center px-4 py-2 border border-gray-300 rounded-xl bg-white hover:border-primary-dark transition-all cursor-pointer"
                                >
                                    {/* Span Değişim Animasyonu */}
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={earningDays}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="font-paragraph text-sm"
                                        >
                                            {earningDays}
                                        </motion.span>
                                    </AnimatePresence>
                                    {isEarningActive ? <IoIosArrowDown /> : <IoIosArrowForward />}
                                </button>

                                {isEarningActive && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="absolute top-full left-0 w-full bg-white border border-gray-200 mt-2 rounded-xl shadow-lg z-10 overflow-hidden"
                                    >
                                        {["Last 30 days", "Last 90 days", "All days"].map((option) => (
                                            <div
                                                key={option}
                                                onClick={() => handleEarningSelect(option)}
                                                className="px-4 py-2 hover:bg-cream/30 cursor-pointer font-paragraph text-sm border-b last:border-0 border-gray-100"
                                            >
                                                {option}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </div>
                        </div>
                        <div className="flex w-full justify-center items-center gap-2.5 mt-3">
                            <span className="font-header text-h-2 font-bold">$</span>
                            <span className="font-paragraph text-p font-bold">{earned}</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN (Placeholder) */}
                <div className="w-full lg:w-1/2 space-y-8">
                    {/* latest posts */}
                    <div className="bg-white p-10 rounded-2xl shadow-soft">
                        <h3 className="font-header text-sh  text-primary-dark">Latest Posts</h3>
                        <hr className="border-primary-dark"/>
                        <div className="flex flex-col p-5 gap-5">
                            <div className="flex justify-between">
                                <span className="font-paragraph text-p font-bold">First Day of Spring</span>
                                <span className="font-paragraph text-p">23.04.2026</span>
                            </div>
                            <p className="font-paragraph text-p">
                                Soft light, fresh air, and a quiet reminder that new beginnings are here 🌿
                            </p>
                            <div
                                onClick={(e)=>{
                                    e.preventDefault();
                                    //todo route the post
                                    console.log("clicked the post");
                                }}
                                className="w-full flex justify-end items-center cursor-pointer">
                                <span className="text-b font-paragraph">See details</span>
                                <IoIosArrowForward/>
                            </div>
                        </div>
                    </div>
                    {/* people section*/}
                    <div className="bg-white p-10  rounded-2xl shadow-soft">
                        <div className="flex w-full justify-between">
                            <div className="flex w-1/2 justify-between">
                                <button
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        setPeopleHeaderState(true);
                                    }}
                                    className={`font-header text-sh text-primary-dark ${peopleHeaderState? "font-bold": "font-normal"} `}
                                >Followers</button>
                                <button
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        setPeopleHeaderState(false);
                                    }}
                                    className={`font-header text-sh text-primary-dark ${peopleHeaderState ? "font-normal": "font-bold"}`}>Following</button>
                            </div>
                            <FaPenToSquare className="w-6 h-6 text-gray-500 cursor-pointer hover:text-primary-dark transition-colors"/>
                        </div>
                        <hr/>
                        <div className="w-full gap-4 px-6 py-8">
                            {peopleHeaderState ? (
                                <div className="flex gap-4">
                                    <div className="w-16  h-16 rounded-full overflow-hidden shrink-0">
                                        <img className="w-full h-full object-cover object-top" src="/images/people/john.jpg" alt="follower-john"/>
                                    </div>
                                    <div className="flex flex-col justify-end">
                                        <span className="font-paragraph text-sm">John</span>
                                        <span className="font-paragraph text-sm">@johnscorner</span>
                                    </div>
                                </div>
                            ):(
                                <div className="flex gap-4">
                                    <div className="w-16  h-16 rounded-full overflow-hidden shrink-0">
                                        <img className="w-full h-full object-cover object-top" src="/images/people/mike.jpg" alt="follower-john"/>
                                    </div>
                                    <div className="flex flex-col justify-end">
                                        <span className="font-paragraph text-sm">Mike</span>
                                        <span className="font-paragraph text-sm">@mikescorner</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;