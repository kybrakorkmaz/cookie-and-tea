import UserNavbar from "../../components/nav-footer/UserNavbar.jsx";
import Panel from "./Panel.jsx";
import Intro from "./Intro.jsx";
import UserFooter from "../../components/nav-footer/UserFooter.jsx";
import Gallery from "./Gallery.jsx";
import Posts from "../Posts/Posts.jsx";
import { useProfile } from "./hooks/useProfile.js";
const Profile = () => {
    // Inject useProfile hook
    const {
        username,
        selected,
        setSelected,
        userPanel,
        userIntro,
        userTopDonatedPosts,
        followers,
        targetPostId,
        setTargetPostId,
        handleNavigateToPost
    } = useProfile();

    return (
        <div className="bg-cream/50 min-h-screen pb-20">
            <UserNavbar />
            {/* Panel Section */}
            <div className="m-0 p-0 mb-40">
                <Panel
                    name={userPanel.name}
                    username={userPanel.username}
                    backgroundImage={userPanel.backgroundImage}
                    backgroundAlt={userPanel.backgroundAlt}
                    profileImage={userPanel.profileImage}
                    profileAlt={userPanel.profileAlt}
                    selected={selected}
                    setSelected={setSelected}
                />
                {/* Tabs: Welcome Tab Intro */}
                {selected==="gallery" ? (
                    <Gallery username={username}/>
                    ) : selected === "posts" ? (
                        <Posts targetPostId={targetPostId} onTargetHandled={() => setTargetPostId(null)} />
                    ) :(
                        <Intro
                            about={userIntro.about}
                            socials={userIntro.socials}
                            earnings={userIntro.earnings}
                            userTopDonatedPosts={userTopDonatedPosts}
                            onPostClick={handleNavigateToPost}
                            followers={followers}
                        />
                )}

            </div>
            <UserFooter/>
        </div>
    );
};

export default Profile;