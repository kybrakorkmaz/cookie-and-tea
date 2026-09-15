import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { FaHome } from "react-icons/fa";
import { RiListSettingsFill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";

import Logo from "../Logo.jsx";
import SearchBar from "@/features/search/SearchBar.jsx";
import Navbar from "../guest/Navbar.jsx";
import Notifications from "@/features/notifications/Notifications.jsx";
import HamburgerMenu from "../HamburgerMenu.jsx";
import MobileNavbar from "../MobileNavbar.jsx";
import { useLogout } from "@/features/auth/hooks/useLogout.js";
import { useAuth } from "@/hooks/useAuth.js";
import { useActions } from "@/features/notifications/hooks/useActions.js";
import { useQueryClient } from "@tanstack/react-query";
import { prefetchFeedTimeline } from "@/features/feed/hooks/feedTimelineQuery.js";

const UserNavbar = () => {
    const { user } = useAuth();
    const location = useLocation();
    const queryClient = useQueryClient();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const { unreadCount } = useActions("received", 20, !!user);

    const { handleClick } = useLogout();
    const warmFeed = () => prefetchFeedTimeline(queryClient, user?.username);

    // 2. Navigation logic using optional chaining
    const profileTo = user ? `/profile/${user.username}?tab=intro` : "/login";
    const feedTo = user ? `/feed` : "/login";
    const isCurrentlyOnProfile = location.pathname === `/profile/${user?.username}`;

    // Logged-out visitors (e.g. right after logout, or guests browsing public
    // pages like /people and /profile/:username) get the default guest navbar
    // instead of a blank gap where the user navbar used to be.
    if (!user) {
        return <Navbar textColor="text-primary-dark" bgColor="bg-primary-dark" searchBarColor="bg-white/65" />;
    }

    return (
        <nav className="navbar w-full px-4 md:px-8 py-4 md:py-6 lg:px-28 font-paragraph text-p">
            {/* Mobile Layout */}
            <div className="lg:hidden flex justify-between items-center">
                <div className="text-primary-dark mb-6" onMouseEnter={warmFeed}>
                    <Logo to={feedTo} />
                </div>
                <HamburgerMenu onClick={() => setIsMenuOpen(!isMenuOpen)} isOpen={isMenuOpen} />
            </div>

            <MobileNavbar
                isOpen={isMenuOpen}
                links={[{ to: profileTo, label: "Profile" }, { to: feedTo, label: "Feed" }]}
                nav="usernavbar"
                onNavigate={() => setIsMenuOpen(false)}
            />

            {/* Desktop Layout */}
            <div className="hidden lg:flex flex-row justify-between items-center gap-6">
                    <div className="flex-1/3 justify-start text-primary-dark">
                    <span onMouseEnter={warmFeed}>
                    <Logo to={feedTo} />
                    </span>
                </div>

                <div className="flex flex-1/3 justify-center text-primary-dark font-bold">
                    <SearchBar bgSearchColor="bg-white" />
                </div>

                <div className="flex flex-1/3 justify-end items-center gap-4 px-4">
                    <NavLink
                        to={profileTo}
                        className={`flex justify-center max-w-64 max-h-12 p-2 items-center gap-2.5 bg-white rounded-3xl border shadow-sm transition-colors group
                            ${isCurrentlyOnProfile ? "border-primary-dark ring-1 ring-primary-dark bg-gray-50" : "border-gray-50 hover:border-primary"}`}
                    >
                        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-100 bg-gray-50">
                            <img
                                // 3. The Source of Truth: user.profileImage
                                src={user.profileImage || "/images/default-avatar.jpg"}
                                alt={user.name}
                                className="w-full h-full object-cover object-top"
                                onError={(e) => { e.target.src = "/images/default-avatar.jpg"; }}
                            />
                        </div>
                        <span className={`text-sm font-bold transition-colors pr-2 ${isCurrentlyOnProfile ? "text-primary" : "text-primary-dark group-hover:text-primary"}`}>
                            Your Page
                        </span>
                    </NavLink>

                    {/* Notifications */}
                    <div className="relative">
                        <button onClick={() => setShowNotifications(!showNotifications)} className="cursor-pointer bg-transparent border-none p-0">
                            <Badge badgeContent={unreadCount || null} color="primary">
                                <NotificationsIcon className="text-primary-dark hover:text-primary transition-colors" sx={{ width: '1.8rem', height: '1.8rem' }} />
                            </Badge>
                        </button>
                        {showNotifications && <Notifications onClose={() => setShowNotifications(false)} />}
                    </div>

                    <NavLink to={feedTo} onMouseEnter={warmFeed} className="text-primary-dark hover:text-primary transition-colors"><FaHome style={{ width: "1.8rem", height: "1.8rem" }} /></NavLink>
                    <NavLink to="/settings" className="text-primary-dark hover:text-primary transition-colors"><RiListSettingsFill style={{ width: "1.8rem", height: "1.8rem" }} /></NavLink>
                    <button onClick={handleClick} className="text-primary-dark hover:text-primary transition-colors bg-transparent border-none cursor-pointer"><IoLogOut style={{ width: "1.8rem", height: "1.8rem" }} /></button>
                </div>
            </div>
        </nav>
    );
};

export default UserNavbar;