import {useParams, useSearchParams} from "react-router";
import {useEffect, useState} from "react";
import apiClient from "../../../api/axios.js";

const allowedTabs = ["intro", "posts", "gallery"];

export const useProfile =() => {
    const {username} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const tabParam = searchParams.get("tab");
    const selected = allowedTabs.includes(tabParam) ? tabParam : "intro";

    // 1. Added initial properties to the State structure
    const [userPanel, setUserPanel] = useState({
        id: null,
        name:"",
        username:"",
        backgroundImage:"",
        backgroundAlt:"",
        profileImage:"",
        profileAlt:"",
        isFollowing: false, // Added field
        isOwnProfile: false, // Added field
    });

    const [userIntro, setUserIntro] = useState({
        about:"",
        socials:[],
        earnings:{}
    })

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
        setSelected("posts");
        setTargetPostId(postId);
    };

    useEffect(() => {
        if (!username) return;
        const controller = new AbortController();

        const fetchPanelHeader = async () => {
            try {
                const response = await apiClient.get(`/api/v1/profile/${username}`, {
                    signal: controller.signal
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
                    isFollowing: data.isFollowing, // 2. Map field from response
                    isOwnProfile: data.isOwnProfile // 3. Map field from response
                });
            } catch (err) {
                if (err.name !== "CanceledError" && err.code !== "ERR_CANCELED") {
                    console.error("Error fetching header details via Axios:", err.message);
                }
            }
        };

        fetchPanelHeader();

        return () => {
            controller.abort();
        };
    }, [username]); // Correctly triggers refetching sequence when clicking names

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

    return {
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