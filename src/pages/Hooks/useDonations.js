import { useQuery } from "@tanstack/react-query";
import apiClient from "../../api/axios.js";
import { useLocation, useParams } from "react-router";
import { useAuth } from "../../context/AuthContext.jsx"; // 1. Import your Auth Context

const checkFeedContext = (pathname) => pathname.includes("/feed");

const serverResponse = (response) => {
    const donationsArray = Array.isArray(response?.data)
        ? response.data
        : (Array.isArray(response) ? response : []);

    return donationsArray.reduce((acc, donation) => {
        const id = donation.postId;
        if (!acc[id]) {
            acc[id] = [];
        }
        acc[id].push(donation);
        return acc;
    }, {});
};

export const useAllDonations = (postId, limit = 5, offset = 0) => {
    const { username: profileUsername } = useParams(); // Renamed for clarity
    const { pathname } = useLocation();
    const { user } = useAuth(); // 2. Pull down the active user profile session

    const isFeed = checkFeedContext(pathname);
    const contextType = isFeed ? "feed" : "profile";

    // 3. Dynamic username mapping depending on the current active view route context
    const targetUsername = isFeed ? user?.username : profileUsername;

    return useQuery({
        // 4. Updated the cache key to reference targetUsername instead of the broken route parameter
        queryKey: ["donations", contextType, targetUsername, postId, limit, offset],
        queryFn: async () => {
            const endpoint = isFeed
                ? `/api/v1/feed/${targetUsername}/posts/${postId}/donations`
                : `/api/v1/profile/${targetUsername}/posts/${postId}/donations`;

            const { data } = await apiClient.get(endpoint, {
                params: { limit, offset }
            });
            return data;
        },
        // 5. Fire query only when the username context and the postId are fully ready
        enabled: !!targetUsername && !!postId,
        select: serverResponse
    });
};