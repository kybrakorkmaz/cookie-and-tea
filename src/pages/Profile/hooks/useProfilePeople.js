import { useEffect, useState } from "react";
import { useParams } from "react-router";
import apiClient from "../../../api/axios.js";

export const useProfilePeople = (followers) => {
    const { username } = useParams();
    const [isFollowersTab, setIsFollowersTab] = useState(true);
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadedUsername, setLoadedUsername] = useState(null);

    // Pipeline 1: Fetch following list dynamically when opening "Following" tab
    useEffect(() => {
        if (isFollowersTab || loadedUsername === username) return;

        const controller = new AbortController();

        const fetchFollowingData = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(`/api/v1/profile/${username}/intro/follow`, {
                    params: { isFollower: false },
                    signal: controller.signal
                });

                if (response.data && response.data.follow) {
                    setFollowing(response.data.follow);
                    setLoadedUsername(username);
                }
            } catch (err) {
                if (err.name !== "CanceledError" && err.code !== "ERR_CANCELED") {
                    console.error("Failed to load following metrics:", err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchFollowingData();

        return () => controller.abort();
    }, [isFollowersTab, username, loadedUsername]);

    // Pipeline 2: Reset hook state when user navigates directly to a new profile
    useEffect(() => {
        setFollowing([]);
        setLoadedUsername(null);
        setIsFollowersTab(true);
    }, [username]);

    // Compute active list dynamically inside the hook
    const displayList = isFollowersTab ? followers : following;

    return {
        isFollowersTab,
        setIsFollowersTab,
        displayList,
        loading
    };
};