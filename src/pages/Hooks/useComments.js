// hooks/useComments.js
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../api/axios.js";

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
        select: (serverResponse) => {
            const commentsArray = serverResponse?.data || serverResponse || [];
            if (!Array.isArray(commentsArray)) return {};

            return commentsArray.reduce((acc, comment) => {
                if (!acc[comment.postId]) {
                    acc[comment.postId] = [];
                }
                acc[comment.postId].push({comment});
                return acc;
            }, {});
        }
    });
};