import { useState } from "react";
import { NavLink } from "react-router";
import Logo from "./Logo.jsx";
import SearchBar from "./SearchBar.jsx";
import HamburgerMenu from "./HamburgerMenu.jsx";
import MobileNavbar from "./MobileNavbar.jsx";

const Navbar = ({
                    textColor = "text-white",
                    bgColor = "bg-cream",
                    searchBarColor = "bg-primary/65",
                    textOutline = "black"
                }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    const signUpStyles = {
        WebkitTextStroke: `0.7px ${textOutline}`,
        textShadow: "0 1px 2px rgba(0,0,0,0.3)"
    };

    const links = [
        { to: "/faq", label: "FAQ" },
        { to: "/your-passions", label: "Your Passions" },
        { to: "/login", label: "Login" }
    ];

    return (
        <nav className="navbar w-full px-4 md:px-8 lg:px-10 py-4 md:py-6 font-paragraph text-p">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Header: Logo and Hamburger */}
                <div className="flex items-center justify-between lg:hidden">
                    <div className={`order-1 lg:order-2 flex justify-center ${textColor}`}>
                        <Logo/>
                    </div>
                    <div className={`lg:hidden order-2 ${textColor}`}>
                        <HamburgerMenu onClick={toggleMenu} isOpen={isMenuOpen} />
                    </div>
                </div>

                {/* Shared Mobile Menu */}
                <MobileNavbar
                    isOpen={isMenuOpen}
                    links={links}
                    nav="navbar"
                    bgColor={bgColor}
                    textColor={textColor}
                    searchBarColor={searchBarColor}
                    signUpStyle={signUpStyles}
                    onNavigate={() => setIsMenuOpen(false)}
                />

                {/* Desktop Logo */}
                <div className={`hidden lg:flex order-2 justify-center ${textColor}`}>
                    <Logo/>
                </div>

                {/* Desktop Navigation Left */}
                <div className={`hidden lg:flex order-1 items-center gap-10 ${textColor}`}>
                    {links.slice(0, 2).map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) => `navbar-item hover:text-primary transition-colors ${isActive ? "underline underline-offset-8 decoration-2" : ""} ${textColor}`}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>

                {/* Desktop Navigation Right */}
                <div className={`hidden lg:flex order-3 items-center gap-10 ${textColor}`}>
                    <SearchBar bgSearchColor={searchBarColor} />
                    <NavLink to="/login" className="navbar-item">Login</NavLink>
                    <NavLink
                        to="/sign-up"
                        className={`navbar-item w-48 h-12 flex items-center justify-center ${bgColor} rounded-button text-white shadow-sm shadow-black font-bold transition-transform hover:scale-105`}
                        style={signUpStyles}
                    >
                        Sign Up
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;