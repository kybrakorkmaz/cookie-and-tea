import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../api/axios.js";
import { useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const checkFeedContext = (pathname) => pathname.includes("/feed");

// On /feed there is NO :username route param — fall back to the logged-in
// user, mirroring useComments.useAllComments (previously mutations built
// /api/v1/feed/undefined/... URLs and silently 404'd)
const useCommentContext = () => {
    const { username: routeUsername } = useParams();
    const { pathname } = useLocation();
    const { user } = useAuth();

    const isFeed = checkFeedContext(pathname);
    const targetUsername = isFeed ? user?.username : routeUsername;

    return { isFeed, targetUsername };
};

// Must match the query key shape used by useAllComments in useComments.js —
// the old ["comments", postId] key never prefix-matched and left threads stale
const commentsKey = (isFeed, targetUsername, postId) =>
    ["comments", isFeed ? "feed" : "profile", targetUsername, postId];

const useInvalidateCommentCaches = () => {
    const queryClient = useQueryClient();

    return (isFeed, targetUsername, postId) => {
        // Refresh the open thread
        queryClient.invalidateQueries({ queryKey: commentsKey(isFeed, targetUsername, postId) });

        // Refresh parent timelines + preview badges
        if (isFeed) {
            queryClient.invalidateQueries({ queryKey: ["feedTimeline", targetUsername] });
            queryClient.invalidateQueries({ queryKey: ["preview", "feed", targetUsername] });
        } else {
            queryClient.invalidateQueries({ queryKey: ["profilePosts", targetUsername] });
            queryClient.invalidateQueries({ queryKey: ["preview", "profile", targetUsername] });
        }
        queryClient.invalidateQueries({ queryKey: ["actions"] });
    };
};

export const useCreateComment = () => {
    const { isFeed, targetUsername } = useCommentContext();
    const invalidateCaches = useInvalidateCommentCaches();

    const commentMutation = useMutation({
        mutationFn: async ({ postId, comment }) => {
            const endpoint = isFeed
                ? `/api/v1/feed/${targetUsername}/posts/${postId}/comment`
                : `/api/v1/profile/${targetUsername}/posts/${postId}/comment`;

            const response = await apiClient.post(endpoint, { comment });
            return response.data;
        },
        onSuccess: (data, variables) => {
            invalidateCaches(isFeed, targetUsername, variables.postId);
        }
    });

    return {
        handleWriteComment: commentMutation.mutateAsync,
        isSubmittingComment: commentMutation.isPending
    };
};

export const useUpdateComment = () => {
    const { isFeed, targetUsername } = useCommentContext();
    const invalidateCaches = useInvalidateCommentCaches();

    const commentMutation = useMutation({
        mutationFn: async ({ postId, commentId, comment }) => {
            const endpoint = isFeed
                ? `/api/v1/feed/${targetUsername}/posts/${postId}/comment/${commentId}`
                : `/api/v1/profile/${targetUsername}/posts/${postId}/comment/${commentId}`;

            const response = await apiClient.put(endpoint, { comment });
            return response.data;
        },
        onSuccess: (data, variables) => {
            invalidateCaches(isFeed, targetUsername, variables.postId);
        }
    });

    return {
        handleUpdateComment: commentMutation.mutateAsync,
        isUpdatingComment: commentMutation.isPending
    };
};

export const useDeleteComment = () => {
    const { isFeed, targetUsername } = useCommentContext();
    const invalidateCaches = useInvalidateCommentCaches();

    const commentMutation = useMutation({
        mutationFn: async ({ postId, commentId }) => {
            const endpoint = isFeed
                ? `/api/v1/feed/${targetUsername}/posts/${postId}/comment/${commentId}`
                : `/api/v1/profile/${targetUsername}/posts/${postId}/comment/${commentId}`;

            const response = await apiClient.delete(endpoint);
            return response.data;
        },
        onSuccess: (data, variables) => {
            invalidateCaches(isFeed, targetUsername, variables.postId);
        }
    });

    return {
        handleDeleteComment: commentMutation.mutateAsync,
        isDeletingComment: commentMutation.isPending
    };
};
