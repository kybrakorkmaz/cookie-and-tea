// hooks/useDonations.js
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../api/axios.js";
import { useLocation, useParams } from "react-router";

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
    const { username } = useParams();
    const { pathname } = useLocation();

    const isFeed = checkFeedContext(pathname);
    const contextType = isFeed ? "feed" : "profile";

    return useQuery({
        // FIXED: Partitioning the cache safely by view context, target user, post ID, and page windows
        queryKey: ["donations", contextType, username, postId, limit, offset],
        queryFn: async () => {
            const endpoint = isFeed
                ? `/api/v1/feed/${username}/posts/${postId}/donations`
                : `/api/v1/profile/${username}/posts/${postId}/donations`;

            const { data } = await apiClient.get(endpoint, {
                params: { limit, offset }
            });
            return data;
        },
        enabled: !!username,
        select: serverResponse
    });
};