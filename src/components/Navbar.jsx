import Logo from "./Logo.jsx";
import SearchBar from "./SearchBar.jsx";
import {NavLink} from "react-router";

const Navbar = ({textColor="text-white", bgColor="bg-cream", searchBarColor="bg-primary/65", textOutline="black"} ) => {
    return (
        <nav id="navbar" className="w-full px-4 md:px-8 lg:px-10 py-4 md:py-6 font-paragraph text-p ">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                {/* LEFT */}
                <div className={`order-3 lg:order-1 flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-20 ${textColor}`}>
                    <NavLink to="/faq" className="navbar-item  w-full md:w-auto pl-1 md:pl-0">FAQ</NavLink>
                    <NavLink to="/your-passions" className=" navbar-item w-full md:w-auto pl-1 md:pl-0 ">Your Passions</NavLink>
                </div>

                {/* CENTER */}
                <div className={`order-1 lg:order-2 flex justify-center ${textColor}`}>
                    <Logo />
                </div>

                {/* RIGHT */}
                <div className={`order-2 lg:order-3 flex flex-col lg:flex-row items-stretch lg:items-center gap-4 lg:gap-20 ${textColor}`}>
                    <SearchBar bgSearchColor={searchBarColor}/>
                    <NavLink  to={"/login"} className="navbar-item w-full lg:w-1/3 pl-1 lg:pl-0">Login</NavLink>
                    <NavLink
                        to="/sign-up"
                        className={`navbar-item w-full lg:w-48 h-12 flex items-center lg:justify-center pl-1 lg:pl-0 ${bgColor} rounded-lg lg:rounded-button text-white shadow-sm shadow-black font-bold`}
                        style={{
                            WebkitTextStroke: `0.7px ${textOutline}`,
                            textShadow: "0 1px 2px rgba(0,0,0,0.3)"
                        }}
                    >
                        Sign Up
                    </NavLink>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;