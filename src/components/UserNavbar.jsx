import Logo from "./Logo.jsx";
import SearchBar from "./SearchBar.jsx";
import Badge from '@mui/material/Badge'
import NotificationsIcon from '@mui/icons-material/Notifications'
import {FaHome} from "react-icons/fa";
import {useState, useMemo} from "react";
import {RiListSettingsFill} from "react-icons/ri";
import {NavLink} from "react-router";
import {following, posts, profile, comments, donations} from "../constants/index.js";

const image = "/images/people/angel.jpg";
const name = "Angel"

const UserNavbar = () =>{
    const [isMenuOpen, setIsMenuOpen]=useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const toggleMenu = ()=>{
        setIsMenuOpen(!isMenuOpen);
    }

    // Get latest activities (both yours and followed users)
    const latestActivities = useMemo(() => {
        const currentUserId = 1;
        const followedIds = following[0]?.following.map(f => f.following_user_id) || [];
        
        // Activity from followed users (Others)
        const followedActivityList = [
            ...comments.filter(c => followedIds.includes(c.commenter_id)).map(c => ({
                id: `c-${c.comment_id}`,
                user: profile.find(u => u.user_id === c.commenter_id)?.name || "User",
                action: "commented",
                date: c.commented_date,
                img: profile.find(u => u.user_id === c.commenter_id)?.profileImage
            })),
            ...donations.filter(d => followedIds.includes(d.donator_id)).map(d => ({
                id: `d-${d.donation_id}`,
                user: profile.find(u => u.user_id === d.donator_id)?.name || "User",
                action: `donated $${d.donated_amount}`,
                date: d.donated_date,
                img: profile.find(u => u.user_id === d.donator_id)?.profileImage
            }))
        ];

        // Activity from you (Yours)
        const yourActivityList = [
            ...comments.filter(c => c.commenter_id === currentUserId).map(c => ({
                id: `yc-${c.comment_id}`,
                user: "You",
                action: "commented",
                date: c.commented_date,
                img: image
            })),
            ...donations.filter(d => d.donator_id === currentUserId).map(d => ({
                id: `yd-${d.donation_id}`,
                user: "You",
                action: `donated $${d.donated_amount}`,
                date: d.donated_date,
                img: image
            }))
        ];

        return [...followedActivityList, ...yourActivityList]
            .sort((a, b) => {
                const dateA = new Date(a.date.split('/').reverse().join('-'));
                const dateB = new Date(b.date.split('/').reverse().join('-'));
                return dateB - dateA;
            })
            .slice(0, 5);
    }, []);

    const dropdownBg = "bg-white/50 backdrop-blur-md border border-gray-100/50 shadow-xl rounded-2xl overflow-hidden z-50";

    return(
        <nav id="navbar-registered-users" className="w-full px-4  py-4 md:px-8 md:py-6 lg:px-28  font-paragraph text-p">
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
                            <NavLink to="/profile/1" className="text-primary-dark text-sm font-bold hover:text-primary transition-colors">
                                                             Your Page
                                                         </NavLink>
                        </div>
                    </div>
                    {/* Notification Icon*/}
                    <div 
                        className="relative"
                    >
                        <div 
                            className="cursor-pointer"
                            onClick={() => setShowNotifications(!showNotifications)}
                        >
                            <Badge badgeContent={latestActivities.length} color="primary">
                                <NotificationsIcon className="text-primary-dark  hover:text-primary transition-colors" sx={{ width: '2rem', height: '2rem' }} />
                            </Badge>
                        </div>
                        
                        {showNotifications && (
                            <>
                                <div 
                                    className="fixed inset-0 z-40" 
                                    onClick={() => setShowNotifications(false)}
                                />
                                <div className={`absolute right-0 mt-2 w-80 ${dropdownBg} z-50`}>
                                    <div className="p-4 border-b border-gray-100/20 bg-primary-dark/5">
                                        <h4 className="font-bold text-primary-dark">Latest Activities</h4>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        {latestActivities.length > 0 ? (
                                            latestActivities.map(activity => (
                                                <div key={activity.id} className="p-3 flex items-center gap-3 hover:bg-white/40 transition-colors border-b border-gray-100/10">
                                                    <img src={activity.img} alt="" className="w-8 h-8 rounded-full object-cover" />
                                                    <div className="flex flex-col">
                                                        <p className="text-xs text-gray-800">
                                                            <span className="font-bold">{activity.user}</span> {activity.action}
                                                        </p>
                                                        <span className="text-[10px] text-gray-500">{activity.date}</span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="p-4 text-sm text-gray-500 text-center">No recent activities</p>
                                        )}
                                    </div>
                                    <NavLink to="/activity" onClick={() => setShowNotifications(false)} className="block p-3 text-center text-xs font-bold text-primary-dark hover:bg-white/60 transition-colors bg-white/20">
                                        View All Notifications
                                    </NavLink>
                                </div>
                            </>
                        )}
                    </div>

                    <NavLink to={"/feed"} className="text-primary-dark hover:text-primary transition-colors"> <FaHome style={{width:"2rem", height:"2rem"}} /></NavLink>
                    
                    {/* Settings Icon*/}
                    <NavLink to={"/settings"} className="text-primary-dark  hover:text-primary transition-colors block">
                        <RiListSettingsFill style={{width:"2rem", height:"2rem"}} />
                    </NavLink>
                </div>
            </div>
            {/* Mobile */}
            <div className="lg:hidden">
                <div className="flex justify-between items-center">
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
                </div>
                {/* MOBILE MENU (State-driven) */}
                {isMenuOpen && (
                    <div
                        id="mobile-menu"
                        className="flex flex-col gap-4 mt-4 animate-fadeIn text-primary-dark"
                    >
                        <NavLink className="navbar-item pl-1 hover:text-primary transition-colors" to={"/profile/1"}>Profile</NavLink>
                        <NavLink className="navbar-item pl-1 hover:text-primary transition-colors" to={"/activity"}>Activity</NavLink>
                        <NavLink  className="navbar-item pl-1 hover:text-primary transition-colors" to={"/feed"}>Feed</NavLink>
                        <NavLink  className="navbar-item pl-1 hover:text-primary transition-colors" to={"/settings"}>Settings</NavLink>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default UserNavbar;