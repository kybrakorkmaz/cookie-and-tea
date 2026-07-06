import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../api/axios.js";
import { useLocation, useParams } from "react-router";

const checkFeedContext = (pathname) => pathname.includes("/feed");

export const useCreateComment = () => {
    const { username } = useParams();
    const { pathname } = useLocation();
    const queryClient = useQueryClient();

    const isFeed = checkFeedContext(pathname);

    const commentMutation = useMutation({
        mutationFn: async ({ postId, comment }) => {
            console.log("Submitting comment payload for post id:", postId);

            const endpoint = isFeed
                ? `/api/v1/feed/${username}/posts/${postId}/comment`
                : `/api/v1/profile/${username}/posts/${postId}/comment`;

            const response = await apiClient.post(endpoint, { comment });
            return response.data;
        },
        onSuccess: (data, variables) => {
            const { postId } = variables;

            // Always update deep thread views
            queryClient.invalidateQueries({ queryKey: ["comments", postId] });

            // Smart-invalidate matching preview caches cleanly
            if (isFeed) {
                queryClient.invalidateQueries({ queryKey: ["feedTimeline", username] });
                queryClient.invalidateQueries({ queryKey: ["preview", "feed", username] });
            } else {
                queryClient.invalidateQueries({ queryKey: ["profilePosts", username] });
                queryClient.invalidateQueries({ queryKey: ["preview", "profile", username] });
            }
            queryClient.invalidateQueries({ queryKey: ["actions"] });
        }
    });

    return {
        handleWriteComment: commentMutation.mutateAsync,
        isSubmittingComment: commentMutation.isPending
    };
};

export const useUpdateComment = () => {
    const { username } = useParams();
    const { pathname } = useLocation();
    const queryClient = useQueryClient();

    const isFeed = checkFeedContext(pathname);

    const commentMutation = useMutation({
        mutationFn: async ({ postId, commentId, comment }) => {
            console.log(`Updating comment ${commentId} of post ${postId} with content:`, comment);

            const endpoint = isFeed
                ? `/api/v1/feed/${username}/posts/${postId}/comment/${commentId}`
                : `/api/v1/profile/${username}/posts/${postId}/comment/${commentId}`;

            const response = await apiClient.put(endpoint, { comment });
            return response.data;
        },
        onSuccess: (data, variables) => {
            const { postId } = variables;

            // Always refresh deep comment panels
            queryClient.invalidateQueries({ queryKey: ["comments", postId] });

            // Dynamically invalidate active UI timelines
            if (isFeed) {
                queryClient.invalidateQueries({ queryKey: ["feedTimeline", username] });
                queryClient.invalidateQueries({ queryKey: ["preview", "feed", username] });
            } else {
                queryClient.invalidateQueries({ queryKey: ["profilePosts", username] });
                queryClient.invalidateQueries({ queryKey: ["preview", "profile", username] });
            }
            queryClient.invalidateQueries({ queryKey: ["actions"] });
        }
    });

    return {
        handleUpdateComment: commentMutation.mutateAsync,
        isUpdatingComment: commentMutation.isPending
    };
};

export const useDeleteComment = () => {
    const { username } = useParams();
    const { pathname } = useLocation();
    const queryClient = useQueryClient();

    const isFeed = checkFeedContext(pathname);

    const commentMutation = useMutation({
        mutationFn: async ({ postId, commentId }) => {
            console.log(`Deleting comment ${commentId} from post ${postId}`);

            const endpoint = isFeed
                ? `/api/v1/feed/${username}/posts/${postId}/comment/${commentId}`
                : `/api/v1/profile/${username}/posts/${postId}/comment/${commentId}`;

            // Make the HTTP DELETE request to the resolved backend endpoint context
            const response = await apiClient.delete(endpoint);
            return response.data;
        },
        onSuccess: (data, variables) => {
            const { postId } = variables;

            // Invalidate deep threads to clear out the deleted item instantly
            queryClient.invalidateQueries({ queryKey: ["comments", postId] });

            // Invalidate parent caches to keep timeline notification badges and counters aligned
            if (isFeed) {
                queryClient.invalidateQueries({ queryKey: ["feedTimeline", username] });
                queryClient.invalidateQueries({ queryKey: ["preview", "feed", username] });
            } else {
                queryClient.invalidateQueries({ queryKey: ["profilePosts", username] });
                queryClient.invalidateQueries({ queryKey: ["preview", "profile", username] });
            }
            queryClient.invalidateQueries({ queryKey: ["actions"] });
        }
    });

    return {
        handleDeleteComment: commentMutation.mutateAsync,
        isDeletingComment: commentMutation.isPending
    };
};