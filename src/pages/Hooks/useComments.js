import { useQuery } from "@tanstack/react-query";
import apiClient from "../../api/axios.js";
import { useLocation, useParams } from "react-router";
import { useAuth } from "../../context/AuthContext.jsx"; // 1. Import your auth context

const checkFeedContext = (pathname) => pathname.includes("/feed");

const serverResponse = (response) => {
    const commentsArray = Array.isArray(response?.data)
        ? response.data
        : (Array.isArray(response) ? response : []);

    return commentsArray.reduce((acc, comment) => {
        const id = comment.postId;
        if (!acc[id]) {
            acc[id] = [];
        }
        acc[id].push(comment);
        return acc;
    }, {});
};

export const usePreviewComments = (username, type = "profile") => {
    return useQuery({
        queryKey: ["preview", type, username],
        queryFn: async () => {
            const endpoint = type === "feed"
                ? `/api/v1/feed/${username}/preview`
                : `/api/v1/profile/${username}/posts/preview`;

            const { data } = await apiClient.get(endpoint);
            return data;
        },
        enabled: !!username,
        select: serverResponse
    });
};

export const useAllComments = (postId) => {
    const { username: profileUsername } = useParams(); // Active on /profile/:username routes
    const { pathname } = useLocation();
    const { user } = useAuth(); // 2. Extract logged-in user properties

    const isFeed = checkFeedContext(pathname);

    // 3. Fallback: Use logged-in handle on feed, or url parameter on profile streams
    const targetUsername = isFeed ? user?.username : profileUsername;

    return useQuery({
        // 4. Added targetUsername and context to queryKey to avoid cross-page cache contamination
        queryKey: ["comments", isFeed ? "feed" : "profile", targetUsername, postId],
        queryFn: async () => {
            const endpoint = isFeed
                ? `/api/v1/feed/${targetUsername}/posts/${postId}/comment`
                : `/api/v1/profile/${targetUsername}/posts/${postId}/comment`;

            const { data } = await apiClient.get(endpoint);
            console.log("Fetched Full Comments Stack:", data);
            return data;
        },
        // 5. Query triggers securely only when username context is fully resolved
        enabled: !!targetUsername && !!postId,
        select: serverResponse
    });
};