import { FaCamera } from "react-icons/fa";
import {IoMdAdd } from "react-icons/io";
import { NavLink } from "react-router";

const Panel = ({name, username, backgroundImage, backgroundAlt, profileImage, profileAlt}) => {
    const strokeStyle = {
        WebkitTextStroke: `0.7px black`,
        textShadow: "0 0.5px 0.7px rgba(0,0,0,0.3)"
    };
    return(
        <div className="w-5/6 mx-auto mt-10 rounded-2xl overflow-hidden border border-primary-dark bg-white shadow-soft">
            {/* cover area */}
            <div className="relative  w-full h-60 md:h-80 lg:h-100">
                {/* background image */}
                {backgroundImage ? (
                    <img
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        src={backgroundImage}
                        alt={backgroundAlt}
                    />
                ) : (
                    <div className="absolute inset-0 bg-primary-dark/10" /> // Resim yoksa bir placeholder
                )}
                {/* cover icon*/}
                <div className="absolute top-6 right-6">
                    <button className="flex items-center bg-white/90 hover:bg-white border border-primary-dark rounded-xl py-2 px-6 transition-all active:scale-95 cursor-pointer shadow-md">
                        <FaCamera className="w-5 h-auto mr-2 text-primary-dark"/>
                        <span className="font-paragraph font-bold text-sm">Cover</span>
                    </button>
                </div>
                {/* user profile*/}
                <div className="absolute bottom-16 left-12 flex items-end gap-6">
                    {/* profile image*/}
                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shrink-0 border border-white shadow-heavy bg-white">
                        <img
                            className="w-full h-full object-cover object-top"
                            src={profileImage || null}
                            alt={profileAlt || "profile"}
                        />
                    </div>
                    {/* user's name and account name*/}
                    <div className="flex flex-col mb-4 md:mb-8">
                        <span className="font-header text-2xl md:text-4xl font-bold text-white" style={strokeStyle}>{name}</span>
                        <span className="font-paragraph text-sm md:text-base font-bold text-white" style={strokeStyle}>@{username}</span>
                    </div>
                </div>
            </div>

            {/* Panel Navbar */}
            <div className="w-full flex justify-between items-center h-20 bg-white px-12">
                {/* navbar */}
                <div className="flex font-header text-sh text-primary-dark p-4 pl-12 md:pl-24 gap-6 ">
                    <NavLink to="/user/about" className={({isActive}) => isActive ? "border-b-2 border-primary-dark pb-1" : "hover:text-primary transition-colors"}>About</NavLink>
                    <NavLink to="/user/gallery" className={({isActive}) => isActive ? "border-b-2 border-primary-dark pb-1" : "hover:text-primary transition-colors"}>Gallery</NavLink>
                    <NavLink to="/user/posts" className={({isActive}) => isActive ? "border-b-2 border-primary-dark pb-1" : "hover:text-primary transition-colors"}>Posts</NavLink>
                </div>
                {/* create post button*/}
                <button className="p-3 rounded-xl text-primary-dark border border-primary-dark hover:bg-primary-dark hover:text-white transition-all active:scale-95">
                    <IoMdAdd className="h-6 w-6" />
                </button>
            </div>
        </div>
    )
}

export default Panel;