// hooks/useDonations.js
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../api/axios.js";
import { useLocation, useParams } from "react-router";

const checkFeedContext = (pathname) => pathname.includes("/feed");

const serverResponse = (response) => {
    const donationsArray = Array.isArray(response?.data)
        ? response.data
        : (Array.isArray(response) ? response : []);

    // 2. Reduce the array, not the response object
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

    // useQuery for declarative GET requests
    return useQuery({
        //  contextType to differentiate profile vs feed cache spaces
        queryKey: ["donations", postId],
        queryFn: async () => {
            const endpoint = isFeed
                ? `/api/v1/feed/${username}/posts/${postId}/donations`
                : `/api/v1/profile/${username}/posts/${postId}/donations`;

            const { data } = await apiClient.get(endpoint);
            console.log(data);
            return data;
        },
        enabled: !!username,
        select: serverResponse
    });
};