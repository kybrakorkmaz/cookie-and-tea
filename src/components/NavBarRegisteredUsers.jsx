import Logo from "./Logo.jsx";
import SearchBar from "./SearchBar.jsx";
import Badge from '@mui/material/Badge'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Box from '@mui/material/Box'
import {FaHome} from "react-icons/fa";
import {useState} from "react";
import {RiListSettingsFill} from "react-icons/ri";
import {NavLink} from "react-router";
const image = "/images/your-passions-icons/woman.jpg";
const name = "Angel"
const NavBarRegisteredUsers = () =>{
    const [isMenuOpen, setIsMenuOpen]=useState(false);

    const toggleMenu = ()=>{
        setIsMenuOpen(!isMenuOpen);
    }
    return(
        <nav id="navbar-registered-users" className="w-full px-4 md:px-8 lg:px-10 py-4 md:py-6 font-paragraph text-p">
            {/* Desktop */}
            <div className="hidden lg:flex flex-row justify-between items-center gap-6 ">
                <div className="flex-1/3 justify-start text-primary-dark ">
                  <Logo/>
                </div>
                <div className="flex flex-1/3 justify-center text-primary-dark font-bold ">
                    <SearchBar bgSearchColor="bg-white" />
                </div>
                <div className="flex flex-1/3 justify-end  items-center gap-4 px-4 ">
                    {/* Your Page Wrapper*/}
                    <div className="flex justify-center max-w-64 max-h-12 p-2 items-center gap-2.5 bg-white rounded-3xl">
                        {/* Daire içine alınmış profil resmi */}
                        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-100">
                            <img
                                src={image}
                                alt={name}
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                        <div className="flex">
                            <a href="#" className="text-primary-dark text-sm font-bold">
                                Your Page
                            </a>
                        </div>
                    </div>
                    {/* Notification Icon*/}
                    <Box sx={{ color: 'black' }}>
                        <Badge badgeContent={4} color="primary">
                            <NotificationsIcon sx={{ minWidth: '2.5rem', minHeight: '2.5rem' }} />
                        </Badge>
                    </Box>
                    <FaHome style={{width:"2.5rem", height:"2.5rem"}} />
                    <RiListSettingsFill style={{width:"2.5rem", height:"2.5rem"}} />
                </div>
            </div>
            {/* Mobile */}
            <div className="lg:hidden flex justify-between items-center">
                <div className="flex justify-center text-primary-dark ">
                    <Logo/>
                </div>
                {/* Hamburger Button (Mobile/Tablet Only) */}
                <div>
                    <button
                        onClick={toggleMenu}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label="Toggle Menu"
                        className="p-2 transition-all rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
                {/* MOBILE MENU (State-driven) */}
                {isMenuOpen && (
                    <div
                        id="mobile-menu"
                        className="flex flex-col lg:hidden gap-4 animate-fadeIn"
                    >
                        <NavLink className="navbar-item pl-1" to={"/profile"}>Profile</NavLink>
                        <NavLink  className="navbar-item pl-1" to={"/home"}>Home</NavLink>
                        <NavLink  className="navbar-item pl-1" to={"/settings"}>Settings</NavLink>
                        <NavLink  className="navbar-item pl-1" to={"/faq"}>FAQ</NavLink>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default NavBarRegisteredUsers;