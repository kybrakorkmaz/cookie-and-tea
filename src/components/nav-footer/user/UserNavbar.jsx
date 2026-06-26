import Logo from "../Logo.jsx";
import SearchBar from "../SearchBar.jsx";
import Badge from '@mui/material/Badge'
import NotificationsIcon from '@mui/icons-material/Notifications'
import {FaHome} from "react-icons/fa";
import {useState, useMemo} from "react";
import {RiListSettingsFill} from "react-icons/ri";
import {NavLink} from "react-router";
import Notifications from "../../Notifications.jsx";
import {getSortedActivities} from "../../../helpers/followingNotifications.js";
import HamburgerMenu from "../HamburgerMenu.jsx";
import MobileNavbar from "../MobileNavbar.jsx";
import {IoLogOut} from "react-icons/io5";
import {useLogout} from "./useLogout.js";
import {useAuth} from "../../../context/AuthContext.jsx"; // todo change navbar profile for authenticated user

// @src/components/nav-footer/user/UserNavbar.jsx

const UserNavbar = () => {
    const { user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const currentUserId = user?.id || null;
    const sessionUsername = user?.username || "";
    const name = user?.name || "User";
    const image = user?.profileImage || "/images/people/angel.jpg";

    const sortedActivities = useMemo(() => getSortedActivities(currentUserId, image), [currentUserId, image]);
    const activityLength = sortedActivities.length;

    const { handleClick } = useLogout();

    // Dynamic route targets fall back to "/login" if sessionUsername is empty
    const profileTo = sessionUsername ? `/profile/${sessionUsername}?tab=intro` : "/login";
    const feedTo = sessionUsername ? `/feed/${sessionUsername}` : "/login";

    const links = [
        { to: profileTo, label: "Profile" },
        { to: "/activity", label: "Activity" },
        { to: feedTo, label: "Feed" },
        { to: "/settings", label: "Settings" },
        { to: "/logout", label: "Logout" }
    ];

    return (
        <nav className="navbar w-full px-4 md:px-8 py-4 md:py-6 lg:px-28 font-paragraph text-p">
            {/* Mobile Layout */}
            <div className="lg:hidden">
                <div className="flex justify-between items-center">
                    <div className="text-primary-dark mb-6">
                        <Logo to={sessionUsername ? `/feed/${sessionUsername}` : "/login"} />
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
                    <Logo to={sessionUsername ? `/feed/${sessionUsername}` : "/login"} />
                </div>

                <div className="flex flex-1/3 justify-center text-primary-dark font-bold">
                    <SearchBar bgSearchColor="bg-white" />
                </div>

                <div className="flex flex-1/3 justify-end items-center gap-4 px-4">
                    {/* 🚀 FIXED: Updated to use the safe profileTo route fallback pointer */}
                    <NavLink to={profileTo} className="flex justify-center max-w-64 max-h-12 p-2 items-center gap-2.5 bg-white rounded-3xl border border-gray-50 shadow-sm hover:border-primary transition-colors group">
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
                                    sx={{ width: '1.8rem', height: '1.8rem' }}
                                />
                            </Badge>
                        </button>
                        {showNotifications && (
                            <Notifications onClose={() => setShowNotifications(false)} />
                        )}
                    </div>

                    {/* 🚀 FIXED: Updated to use the safe feedTo route fallback pointer */}
                    <NavLink to={feedTo} className="text-primary-dark hover:text-primary transition-colors" aria-label="Home">
                        <FaHome style={{ width: "1.8rem", height: "1.8rem" }} />
                    </NavLink>

                    <NavLink to="/settings" className="text-primary-dark hover:text-primary transition-colors block" aria-label="Settings">
                        <RiListSettingsFill style={{ width: "1.8rem", height: "1.8rem" }} />
                    </NavLink>

                    <button
                        onClick={handleClick}
                        className="text-primary-dark hover:text-primary transition-colors block bg-transparent border-none cursor-pointer"
                        aria-label="Logout"
                    >
                        <IoLogOut style={{ width: "1.8rem", height: "1.8rem" }} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default UserNavbar;