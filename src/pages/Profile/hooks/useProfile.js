import {useParams, useSearchParams} from "react-router";
import {useEffect, useState} from "react";

const allowedTabs = ["intro", "posts", "gallery"];

export const useProfile =() =>{
    const {username} = useParams(); // Dynamically captures whatever is in the URL path
    const [searchParams, setSearchParams] = useSearchParams(); // Panel Tab Header

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

    // Intro Dashboard State
    const [userIntro, setUserIntro] = useState({
        about:"",
        socials:[],
        earnings:{}
    })

    // Connection & Post Sub-states
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
        setSelected("posts"); // Switch tab
        setTargetPostId(postId);
    };

    // API CALL 1: Fetch Panel Header Data
    useEffect(() => {
        if (!username) return;
        // AbortController context to eliminate race conditions on header data
        const controller = new AbortController();

        const fetchPanelHeader = async () => {
            try {
                const response = await apiClient.get(`/api/v1/profile/${username}`, {
                    // The signal property links the controller to the fetch. Calling controller.abort() stops the fetch.
                    signal: controller.signal // Bind token instance directly to Axios
                });
                const data = response.data;

                setUserPanel({
                    id: data.id,
                    name: data.name,
                    username: data.username,
                    profileImage: data.profileImage,
                    profileAlt: data.profileImage ? `profile-${data.username}` : "default profile",
                    backgroundImage: data.backgroundImage,
                    backgroundAlt: data.backgroundImage ? `background-${data.username}` : "default background",
                });
            } catch (err) {
                // Ignore safe cancellations so they don't pollute your console logs
                if (err.name !== "CanceledError" && err.code !== "ERR_CANCELED") {
                    console.error("Error fetching header details via Axios:", err.message);
                }
            }
        };

        fetchPanelHeader();

        // Cleanup: Instantly kill pending pipeline requests if user navigates away (component unmounts)
        return () => {
            controller.abort();
        };
    }, [username]);

    // API Call 2: Fetch Intro Dashboard Data
    useEffect(() => {
        if (!username) return;

        const controller = new AbortController();

        const fetchIntroData = async () => {
            try {
                if (selected === "intro") {
                    const response = await apiClient.get(`/api/v1/profile/${username}/intro`, {
                        params: {
                            earningTimeline: 30,
                            isFollower: true
                        },
                        signal: controller.signal
                    });
                    const data = response.data;

                    setUserIntro({
                        about: data.about || "",
                        socials: data.socials ? data.socials.filter(social => Boolean(social.socialUrl)) : [],
                        earnings: { total: data.earningsTotal }
                    });

                    setUserTopDonatedPosts(data.topSupportedPosts || []);
                    setFollowers(data.recentConnections || []);
                }
            } catch (err) {
                if (err.name !== "CanceledError" && err.code !== "ERR_CANCELED") {
                    console.error(`Failed loading ${selected} sub-resource:`, err);
                }
            }
        };

        fetchIntroData();

        return () => {
            controller.abort();
        };
    }, [selected, username]);

    return{
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
    }
}