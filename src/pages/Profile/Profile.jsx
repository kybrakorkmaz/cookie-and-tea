import UserNavbar from "../../components/nav-footer/UserNavbar.jsx";
import Panel from "./Panel.jsx";
import Intro from "./Intro.jsx";
import {useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router";
import {posts} from "../../constants/index.js";
import UserFooter from "../../components/nav-footer/UserFooter.jsx";
import Gallery from "./Gallery.jsx";
import Posts from "../Posts/Posts.jsx";
import apiClient from "../../api/axios.js";

const allowedTabs = ["intro", "posts", "gallery"];

const Profile = () => {
    const {username} = useParams(); // Dynamically captures whatever is in the URL path
    // 1. Panel Header State
    const [searchParams, setSearchParams] = useSearchParams();
    const tabParam = searchParams.get("tab");
    // Tab State (Defaults to "intro" at first glance)
    const selected = allowedTabs.includes(tabParam) ? tabParam : "intro";

    // Decoupled Frontend States matching your individual Backend Resource Endpoints
    const [userPanel, setUserPanel] = useState({
        id: null,
        name:"",
        username:"",
        backgroundImage:"",
        backgroundAlt:"",
        profileImage:"",
        profileAlt:"",
    });
    // 2. Intro Dashboard State
    const [userIntro, setUserIntro] = useState({
        about:"",
        socials:[],
        earnings:{}
    })
    // 3. Connection & Post Sub-states
    const [userTopDonatedPosts, setUserTopDonatedPosts] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [targetPostId, setTargetPostId] = useState(null);

    const setSelected = (tab) => {
        const newParams = new URLSearchParams(searchParams);
        if (tab === "intro") {
            newParams.delete("tab");
        } else {
            newParams.set("tab", tab);
        }
        setSearchParams(newParams, { replace: true });
    };


    const handleNavigateToPost = (postId) => {
        // 1. Switch tab
        setSelected("posts");
        setTargetPostId(postId);
    };

    // API Call 1: Fetch Panel Header Data using Axios
    useEffect(() => {
        if (!username) return;
        const fetchPanelHeader = async () => {
            try {
                // Axios handles the base URL automatically. Just supply the end path!
                // Axios also parses JSON internally, so no more ".json()" step.// 🛰️ PIPELINE 1: Fetch Panel Resource (Runs ONCE when the username changes)
                const response = await apiClient.get(`/api/v1/profile/${username}`);
                const data = response.data;

                setUserPanel ({
                    id: data.id,
                    name: data.name,
                    username: data.username,
                    profileImage: data.profileImage,
                    profileAlt: data.profileImage ? `profile-${data.username}` : "default profile",
                    backgroundImage: data.backgroundImage,
                    backgroundAlt: data.backgroundImage ? `background-${data.username}` : "default background",
                });
            } catch (err) {
                // Axios automatically throws errors for 4xx and 5xx status codes!
                console.error("Error fetching header details via Axios:", err.message);
            }
        };
        fetchPanelHeader();
    }, [username]);

    // API Call 2: Fetch Intro Dashboard Data using Axios
    useEffect(() => {
        // Only trigger this database call if the active tab is set to "intro"
        if (!username) return;

        const fetchIntroData = async () => {
            try {
                if(selected === "intro"){
                    // Passing URL Query parameters the professional Axios way: using the 'params' config object
                    // Hits: GET /api/v1/profile/kubra/intro?earningTimeline=30&isFollower=true
                    const response = await apiClient.get(`/api/v1/profile/${username}/intro`,{
                        params:{
                            earningTimeline: 30,
                            isFollower: true
                        }
                    });
                    const data = response.data;

                    // hydrates userIntro state instead of userPanel
                    setUserIntro({
                        about: data.about || "",
                        socials: data.socials ? data.socials.filter(social => Boolean(social.socialUrl)) : [],
                        earnings: { total: data.earningsTotal }
                    });

                    setUserTopDonatedPosts(data.topSupportedPosts || []);
                    setFollowers(data.recentConnections || [])
                }
                // 💡 Note: If selected === "gallery", your separate <Gallery /> component
                // can safely hit your GET /api/v1/profile/:username/gallery endpoint internally!

            } catch (err) {
                console.error(`Failed loading ${selected} sub-resource:`, err);
            }
        };
        fetchIntroData();
    }, [selected, username]); // Refetches instantly if the user jumps back to Intro!
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
                {/* Main Intro */}
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