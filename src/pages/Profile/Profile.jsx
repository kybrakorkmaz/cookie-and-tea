import UserNavbar from "../../components/UserNavbar.jsx";
import {FaCamera, FaInstagram} from "react-icons/fa";
import {NavLink} from "react-router";
import {IoIosArrowForward, IoMdAdd} from "react-icons/io";
import {profile} from "../../constants/index.js";
import {FaPenToSquare, FaXTwitter} from "react-icons/fa6";
import {useState} from "react";

const Profile = () =>{
    const [isEarningActive, setIsEarningActive] = useState(false);
    const strokeStyle = {
        WebkitTextStroke: `0.7px black`,
        textShadow: "0 0.5px 0.7px rgba(0,0,0,0.3)"
    }
    return(
        <div className="bg-cream/50 min-h-screen">
            <UserNavbar/>
            {/* panel */}
            <div className="w-5/6 mx-auto mt-10 rounded-2xl overflow-hidden border border-primary-dark ">
                {/* cover area */}
                <div className="relative w-full h-60 md:h-80 lg:h-100">
                    {/* background image */}
                    <img className="absolute inset-0 w-full h-full object-cover object-center" src="/images/profile/angels-background.jpg" alt="angels-bg-image"/>
                    {/* cover icon*/}
                    <div className="absolute top-6 right-6">
                        <button className="flex justify-between items-center w-32 h-11 bg-white/90 border border-primary-dark rounded-xl py-2 px-6 transition-all active:scale-95  cursor-pointer">
                            <FaCamera className="w-6 h-auto mr-2"/>
                            <span className="font-paragraph font-bold text-b">Cover</span>
                        </button>
                    </div>
                    {/* user profile*/}
                    <div className="absolute bottom-16 left-12 flex items-end gap-6">
                        {/* profile image*/}
                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shrink-0">
                            <img className="w-full h-full object-cover object-top" src="/images/your-passions-icons/woman.jpg" alt="profile-angel"/>
                        </div>
                        {/* user's name and account name*/}
                        <div className="flex flex-col mb-4 md:mb-8">
                            <span className="font-header text-2xl md:text-4xl font-bold text-white" style={strokeStyle}>Angel</span>
                            <span className="font-paragraph text-sm md:text-base font-bold text-white" style={strokeStyle}>@angelscorner</span>
                        </div>
                    </div>
                </div>
                {/* panel navbar */}
                <div className="w-full flex justify-between items-center h-20 bg-white">
                    <div className="flex font-header text-sh text-primary-dark p-4 pl-24 gap-6">
                        <NavLink to={"/user/about"}>About</NavLink>
                        <NavLink to={"/user/gallery"}>Gallery</NavLink>
                        <NavLink to={"/user/posts"}>Posts</NavLink>
                    </div>
                    {/* create post button*/}
                    <button className=" rounded-2xl text-primary-dark border border-primary-dark transition-all active:scale-95 shadow-md cursor-pointer my-auto mr-12">
                        <IoMdAdd className="h-12 w-auto" />
                    </button>
                </div>
            </div>
            {/* profile detail section*/}
            <div className="flex w-5/6 mx-auto">
                {/* LEFT */}
                <div className="w-1/2">
                    {/* about */}
                    <div className="w-full bg-white p-10">
                        <div className="flex justify-between">
                            <h3 className="font-header text-sh">About</h3>
                            <FaPenToSquare className="w-10 h-auto text-gray-700 stroke-[0.5px]"/>
                        </div>
                        <hr className="border border-primary-dark"/>
                        <p className="py-8">{profile[0].about}</p>
                    </div>
                    {/* socials */}
                    <div className="w-full bg-white p-10 mt-8">
                        <div className="flex justify-between">
                            <h3 className="font-header text-sh">Socials</h3>
                            <FaPenToSquare className="w-10 h-auto text-gray-700 stroke-[0.5px]"/>
                        </div>
                        <hr className="border border-primary-dark"/>
                        <div className="flex items-center justify-center pt-1 gap-6 md:gap-10">
                            <a href="https://x.com/your-profile" aria-label="Follow Cookie and Tea on X" target="_blank" rel="noreferrer">
                                <FaXTwitter className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                            </a>
                            <a href="https://instagram.com/your-profile" aria-label="Follow Cookie and Tea on Instagram" target="_blank" rel="noreferrer">
                                <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                            </a>
                        </div>
                    </div>
                    {/* Earnings */}
                    <div className="w-full bg-white p-10 mt-8">
                        <div className="flex justify-center gap-10">
                            <h3>Earnings</h3>
                            <div>
                                <div className="w-48 bg-white border border-primary-dark rounded-2xl">
                                    <button className="flex w-full justify-center items-center gap-4">Last 30 days <IoIosArrowForward /></button>
                                </div>
                                <div className="flex flex-col w-full">
                                    <span className="font-paragraph text-b">Last 30 days</span>
                                    <span className="font-paragraph text-b">Last 90 days</span>
                                    <span className="font-paragraph text-b">All</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* RIGHT */}
                <div>
                    {/* LATEST POST */}
                    <div></div>
                    {/* PEOPLE */}
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default Profile;