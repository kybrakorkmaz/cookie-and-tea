import { FaCamera } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import ImageUploadModal from "../../components/media/ImageUploadModal.jsx";
import { usePanelActions } from "./hooks/usePanelActions.js";

const Panel = ({
                   name,
                   username,
                   backgroundImage,
                   backgroundAlt,
                   profileImage,
                   profileAlt,
                   selected,
                   setSelected,
                   isFollowing = false,
                   isOwnProfile = false
               }) => {
    const strokeStyle = {
        WebkitTextStroke: `0.7px black`,
        textShadow: "0 0.5px 0.7px rgba(0,0,0,0.3)"
    };

    // Forward props into your behavioral hook layer
    const {
        editMode,
        setEditMode,
        error,
        setError,
        handleUpdate,
        handleTabClick,
        isFollowingState,
        handleFollowToggle
    } = usePanelActions(username, isFollowing, isOwnProfile, setSelected);

    return (
        <div className="w-5/6 mx-auto mt-10 rounded-2xl overflow-hidden border border-primary-dark bg-white shadow-soft">
            {/* cover area */}
            <div className="relative w-full h-60 md:h-80 lg:h-100">
                {/* background image */}
                {backgroundImage ? (
                    <img
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        src={backgroundImage}
                        alt={backgroundAlt}
                    />
                ) : (
                    <div className="absolute inset-0 bg-primary-dark/10" />
                )}
                {/* Cover Edit Button */}
                <div className="absolute top-6 right-6">
                    <button
                        onClick={() => setEditMode('cover')}
                        className="flex items-center bg-white/90 hover:bg-white border border-primary-dark rounded-xl py-2 px-6 shadow-md cursor-pointer"
                    >
                        <FaCamera className="w-5 h-auto mr-2 text-primary-dark"/>
                        <span className="font-paragraph font-bold text-sm">Cover</span>
                    </button>
                </div>
                {/* user profile*/}
                <div className="absolute bottom-16 left-12 flex items-end gap-6">
                    {/* Profile Image Container */}
                    <div className="relative group">
                        {/* The circular photo */}
                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shrink-0 shadow-heavy bg-white">
                            {profileImage ? (
                                <img
                                    className="w-full h-full object-cover object-top"
                                    src={profileImage}
                                    alt={profileAlt || "profile"}
                                />
                            ) : (
                                <div className="w-full h-full bg-primary-dark/10" />
                            )}
                        </div>

                        <button
                            onClick={() => setEditMode('profile')}
                            className="absolute top-[8%] right-[8%]
                                       bg-blue-600/30 backdrop-blur-md
                                       hover:bg-blue-600/50
                                       text-white
                                       p-0.5 md:p-1
                                       rounded-lg md:rounded-xl
                                       border border-white/20
                                       transition-all active:scale-95 cursor-pointer shadow-lg"
                        >
                            <MdModeEditOutline className="w-4 h-4 md:w-6 md:h-6" />
                        </button>
                    </div>

                    {/* user's name and account name*/}
                    <div className="flex flex-col mb-4 md:mb-8">
                        <span className="font-header text-2xl md:text-4xl font-bold text-white" style={strokeStyle}>{name}</span>
                        <span className="font-paragraph text-sm md:text-base font-bold text-white" style={strokeStyle}>@{username}</span>
                    </div>
                </div>
            </div>

            {/* Render the Reusable Modal */}
            {editMode && (
                <ImageUploadModal
                    title={editMode === 'profile' ? "Update Profile Photo" : "Update Cover Image"}
                    onClose={() => {
                        setEditMode(null);
                        setError(null);
                    }}
                    onConfirm={handleUpdate}
                />
            )}

            {error && (
                <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg z-110">
                    {error}
                </div>
            )}

            {/* Panel Navbar */}
            <div className="w-full flex justify-between items-center h-20 bg-white px-8 md:px-12">
                <div className="flex font-header text-sh text-primary-dark p-4 pl-0 md:pl-24 gap-4 md:gap-8">
                    {/* Intro Tab */}
                    <button
                        onClick={() => handleTabClick("intro")}
                        className={`pb-1 transition-all duration-200 hover:text-primary cursor-pointer ${
                            selected === "intro"
                                ? "border-b-2 border-primary-dark text-primary-dark"
                                : "text-gray-400 border-b-2 border-transparent"
                        }`}
                    >
                        Intro
                    </button>

                    {/* Gallery Tab */}
                    <button
                        onClick={() => handleTabClick("gallery")}
                        className={`pb-1 transition-all duration-200 hover:text-primary cursor-pointer ${
                            selected === "gallery"
                                ? "border-b-2 border-primary-dark text-primary-dark"
                                : "text-gray-400 border-b-2 border-transparent"
                        }`}
                    >
                        Gallery
                    </button>

                    {/* Posts Tab */}
                    <button
                        onClick={() => handleTabClick("posts")}
                        className={`pb-1 transition-all duration-200 hover:text-primary cursor-pointer ${
                            selected === "posts"
                                ? "border-b-2 border-primary-dark text-primary-dark"
                                : "text-gray-400 border-b-2 border-transparent"
                        }`}
                    >
                        Posts
                    </button>
                </div>

                {/* Follow Button Action Area */}
                {!isOwnProfile && (
                    <button
                        onClick={handleFollowToggle}
                        className={`p-1 sm:p-2 md:p-3 font-header text-sh rounded-xl border border-primary-dark transition-all active:scale-95 cursor-pointer ${
                            isFollowingState
                                ? "bg-primary-dark text-white hover:bg-transparent hover:text-primary-dark"
                                : "text-primary-dark hover:bg-primary-dark hover:text-white"
                        }`}
                    >
                        {isFollowingState ? "Unfollow" : "Follow"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Panel;