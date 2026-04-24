import { useState } from "react";
import { NavLink } from "react-router";
import Logo from "./Logo.jsx";
import SearchBar from "./SearchBar.jsx";

const Navbar = ({ textColor = "text-white", bgColor = "bg-cream", searchBarColor = "bg-primary/65", textOutline = "black" }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { to: "/faq", label: "FAQ" },
        { to: "/your-passions", label: "Your Passions" },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const signUpStyles = {
        WebkitTextStroke: `0.7px ${textOutline}`,
        textShadow: "0 1px 2px rgba(0,0,0,0.3)"
    };

    return (
        <nav id="navbar" className="w-full px-4 md:px-8 lg:px-10 py-4 md:py-6 font-paragraph text-p">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                {/* TOP BAR: Logo and Hamburger */}
                <div className="flex items-center justify-between lg:contents">
                    {/* CENTER (Logo) - Moved to top for mobile layout logic */}
                    <div className={`order-1 lg:order-2 flex justify-center ${textColor}`}>
                        <Logo />
                    </div>

                    {/* Hamburger Button (Mobile Only) */}
                    <div className={`lg:hidden order-2 ${textColor}`}>
                        <button
                            onClick={toggleMenu}
                            className="p-2 focus:outline-none"
                            aria-label="Toggle Menu"
                        >
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* MOBILE MENU (State-driven) */}
                {isMenuOpen && (
                    <div className={`flex flex-col lg:hidden gap-4 animate-fadeIn ${textColor}`}>
                        {navLinks.map(link => (
                            <NavLink key={link.to} to={link.to} className="navbar-item pl-1">{link.label}</NavLink>
                        ))}
                        <NavLink to="/login" className="navbar-item pl-1">Login</NavLink>
                        <NavLink
                            to="/sign-up"
                            className={`navbar-item w-full h-12 flex items-center pl-4 ${bgColor} rounded-lg text-white font-bold`}
                            style={signUpStyles}
                        >
                            Sign Up
                        </NavLink>
                        <div className="mt-2">
                            <SearchBar bgSearchColor={searchBarColor}/>
                        </div>
                    </div>
                )}

                {/* DESKTOP LEFT */}
                <div className={`hidden lg:flex order-1 items-center gap-10 ${textColor}`}>
                    {navLinks.map(link => (
                        <NavLink key={link.to} to={link.to} className="navbar-item">{link.label}</NavLink>
                    ))}
                </div>

                {/* DESKTOP RIGHT */}
                <div className={`hidden lg:flex order-3 items-center gap-10 ${textColor}`}>
                    <SearchBar bgSearchColor={searchBarColor}/>
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