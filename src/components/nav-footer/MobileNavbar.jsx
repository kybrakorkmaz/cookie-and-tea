import { NavLink } from "react-router";
import SearchBar from "./SearchBar.jsx";

const MobileNavbar = ({isOpen, signUpStyle, bgColor, textColor, searchBarColor="", links = [], nav = "navbar"}) => {
    if (!isOpen) return null;
    return (
        <div id="mobile-menu" className={`flex flex-col  lg:hidden gap-4 animate-fadeIn ${textColor}`}>
            {links.map((link) => (
                <NavLink
                    key={link.to}
                    to={link.to}
                    className="navbar-item pl-1 hover:text-primary-light transition-colors "
                >
                    {link.label}
                </NavLink>
            ))}

            {nav === "navbar" && (
                <>
                    <NavLink
                        to="/sign-up"
                        className={`navbar-item w-full h-12 flex items-center pl-4 ${bgColor} rounded-lg text-white font-bold`}
                        style={signUpStyle}
                    >
                        Sign Up
                    </NavLink>
                    <div className="mt-2">
                        <SearchBar bgSearchColor={searchBarColor} />
                    </div>
                </>
            )}
        </div>
    );
};

export default MobileNavbar;