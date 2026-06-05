import Logo from "./Logo.jsx";
import SearchBar from "./SearchBar.jsx";
import Badge from '@mui/material/Badge'
import NotificationsIcon from '@mui/icons-material/Notifications'
import {FaHome} from "react-icons/fa";
import {useState, useMemo} from "react";
import {RiListSettingsFill} from "react-icons/ri";
import {NavLink} from "react-router";
import Notifications from "../Notifications.jsx";
import {getSortedActivities} from "../../helpers/followingNotifications.js";
import HamburgerMenu from "./HamburgerMenu.jsx";
import MobileNavbar from "./MobileNavbar.jsx";


const UserNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const image = "/images/people/angel.jpg";
    const name = "Angel"
    const currentUserId = 1;
    const sortedActivities = useMemo(() => getSortedActivities(currentUserId, image), [currentUserId, image]);
    const activityLength = sortedActivities.length;

    const links = [
        { to: "/profile/1?tab=intro", label: "Profile" },
        { to: "/activity", label: "Activity" },
        { to: "/feed", label: "Feed" },
        { to: "/settings", label: "Settings" },
    ];

    return (
        <nav className="navbar w-full px-4  md:px-8 py-4 md:py-6 lg:px-28 font-paragraph text-p">
            {/* Mobile Layout */}
            <div className="lg:hidden">
                <div className="flex justify-between items-center">
                    <div className="text-primary-dark mb-6">
                        <Logo to="/feed"/>
                    </div>
                    <HamburgerMenu onClick={toggleMenu} isOpen={isMenuOpen} />
                </div>
            </div>
            <MobileNavbar
                isOpen={isMenuOpen}
                links={links}
                nav="usernavbar"
                textColor="text-primary-dark"
                onNavigate={() => setIsMenuOpen(false)}
                searchBarColor="bg-white"
            />
            {/* Desktop Layout */}
            <div className="hidden lg:flex flex-row justify-between items-center gap-6">
                <div className="flex-1/3 justify-start text-primary-dark">
                    <Logo to="/feed" />
                </div>

                <div className="flex flex-1/3 justify-center text-primary-dark font-bold">
                    <SearchBar bgSearchColor="bg-white" />
                </div>

                <div className="flex flex-1/3 justify-end items-center gap-4 px-4">
                    {/* Profile Link Card */}
                    <NavLink to="/profile/1?tab=intro" className="flex justify-center max-w-64 max-h-12 p-2 items-center gap-2.5 bg-white rounded-3xl border border-gray-50 shadow-sm hover:border-primary transition-colors group">
                        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-100">
                            <img src={image} alt={name} className="w-full h-full object-cover object-top" />
                        </div>
                        <span className="text-primary-dark text-sm font-bold group-hover:text-primary transition-colors pr-2">
                            Your Page
                        </span>
                    </NavLink>

                    {/* Notifications Wrapper */}
                    <div className="relative">
                        <button
                            className="cursor-pointer bg-transparent border-none p-0"
                            onClick={() => setShowNotifications(!showNotifications)}
                            aria-label="Toggle notifications"
                        >
                            <Badge badgeContent={activityLength} color="primary">
                                <NotificationsIcon
                                    className="text-primary-dark hover:text-primary transition-colors"
                                    sx={{ width: '2rem', height: '2rem' }}
                                />
                            </Badge>
                        </button>
                        {showNotifications && (
                            <Notifications onClose={() => setShowNotifications(false)} />
                        )}
                    </div>

                    <NavLink to="/feed" className="text-primary-dark hover:text-primary transition-colors" aria-label="Home">
                        <FaHome style={{ width: "2rem", height: "2rem" }} />
                    </NavLink>

                    <NavLink to="/settings" className="text-primary-dark hover:text-primary transition-colors block" aria-label="Settings">
                        <RiListSettingsFill style={{ width: "2rem", height: "2rem" }} />
                    </NavLink>
                </div>
            </div>


        </nav>
    );
};

export default UserNavbar;