import Panel from "./Panel.jsx";
import Intro from "./Intro.jsx";
import Gallery from "./Gallery.jsx";
import Posts from "@/features/posts/Posts.jsx";
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
        handleNavigateToPost,
        updatePanelImage
    } = useProfile();

    return (
        <div className="m-0 p-0 mb-10">
                <Panel
                    name={userPanel.name}
                    username={userPanel.username}
                    backgroundImage={userPanel.backgroundImage}
                    backgroundAlt={userPanel.backgroundAlt}
                    profileImage={userPanel.profileImage}
                    profileAlt={userPanel.profileAlt}
                    selected={selected}
                    setSelected={setSelected}
                    isFollowing={userPanel.isFollowing}
                    isOwnProfile={userPanel.isOwnProfile}
                    onImageUpdated={updatePanelImage}
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
                            isOwnProfile={userPanel.isOwnProfile}
                        />
                )}

        </div>
    );
};

export default Profile;