import SearchBar from "./SearchBar.jsx";
import {NavLink} from "react-router";

const MobileNavbar = ({isOpen, signUpStyle, bgColor, textColor, searchBarColor="", links = [], nav = "navbar", onNavigate}) => {
    const handleNavigate = () => {
        if (onNavigate) onNavigate();
    };
    if (!isOpen) return null;
    return (
        <div id="mobile-menu" className={`flex flex-col lg:hidden gap-4 animate-fadeIn ${textColor}`}>

            <div className="mb-2">
                <SearchBar bgSearchColor={searchBarColor} />
            </div>

            {/* Navigation Links */}
            {links.map((link) => (
                <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={handleNavigate}
                    className="navbar-item pl-1 hover:text-primary-light transition-colors "
                >
                    {link.label}
                </NavLink>
            ))}

            {/* Handle specific signup layouts if needed */}
            {nav === "navbar" && (
                <NavLink
                    to="/sign-up"
                    onClick={handleNavigate}
                    className={`navbar-item w-full h-12 flex items-center pl-4 ${bgColor} rounded-lg text-white font-bold`}
                    style={signUpStyle}
                >
                    Sign Up
                </NavLink>
            )}
        </div>
    );
};

export default MobileNavbar;