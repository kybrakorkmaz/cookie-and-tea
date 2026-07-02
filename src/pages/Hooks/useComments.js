// hooks/useComments.js
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import apiClient from "../../api/axios.js";
import {useLocation, useParams} from "react-router";

const checkFeedContext = (pathname) => pathname.includes("/feed");
const serverResponse = (response) =>{
    const commentsArray = response?.data || response || [];
    if (!Array.isArray(commentsArray)) return {};
    return commentsArray.reduce((acc, comment) => {
        if (!acc[comment.postId]) {
            acc[comment.postId] = [];
        }
        acc[comment.postId].push(comment);
        return acc;
    }, {});
}
export const usePreviewComments = (username, type = "profile") => {
    return useQuery({
        // 1. Differentiate cache spaces using the type argument
        queryKey: ["preview", type, username],
        queryFn: async () => {
            // 2. Select the right API path based on context
            const endpoint = type === "feed"
                ? `/api/v1/feed/${username}/preview`
                : `/api/v1/profile/${username}/posts/preview`;

            const { data } = await apiClient.get(endpoint);
            return data;
        },
        enabled: !!username,
        // 3. Centralized, shared parsing logic
        select:  serverResponse
    });
};

export const useAllComments = (postId) =>{
    const { username } = useParams();
    const { pathname } = useLocation();

    const isFeed = checkFeedContext(pathname);
    const contextType = isFeed ? "feed" : "profile";

    // useQuery for declarative GET requests
    return useQuery({
        //  contextType to differentiate profile vs feed cache spaces
        queryKey: ["comments", postId],
        queryFn: async () => {
            const endpoint = isFeed
                ? `/api/v1/feed/${username}/posts/${postId}/comment`
                : `/api/v1/profile/${username}/posts/${postId}/comment`;

            const { data } = await apiClient.get(endpoint);
            return data;
        },
        enabled: !!username,
        select: serverResponse
    });
}