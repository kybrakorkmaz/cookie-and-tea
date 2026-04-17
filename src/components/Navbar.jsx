import Logo from "./Logo.jsx";
import SearchBar from "./SearchBar.jsx";
import {NavLink} from "react-router";

const Navbar = () => {
    return (
        <nav id="navbar" className="w-full px-4 md:px-10 py-4 font-paragraph text-p">
            <div className="flex flex-col md:flex-row  md:items-center md:justify-between gap-6">

                {/* LEFT */}
                <div className="navbar-item order-3 md:order-1 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-20">
                    <NavLink to="/faq" className="w-full md:w-auto pl-1">FAQ</NavLink>
                    <NavLink to="/your-passions" className="w-full md:w-auto pl-1">Your Passions</NavLink>
                </div>

                {/* CENTER */}
                <div className="order-1 md:order-2 flex justify-center">
                    <Logo />
                </div>

                {/* RIGHT */}
                <div className="navbar-item order-2 md:order-3 flex flex-col md:flex-row items-stretch md:items-center  gap-4 md:gap-20">
                    <SearchBar />
                    <NavLink to={"/login"} className="w-full md:w-auto pl-1">Login</NavLink>
                    <NavLink
                        to="/sign-up"
                        className="w-full md:w-32 h-12 flex items-center justify-center pl-1 md:pl-0 bg-cream rounded-lg md:rounded-button text-black"
                    >
                        Sign Up
                    </NavLink>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;