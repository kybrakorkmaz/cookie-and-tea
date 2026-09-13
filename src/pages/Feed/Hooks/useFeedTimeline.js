// Hooks/useFeedTimeline.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../api/axios.js";
import { createPost, updatePost, deletePost } from "./handlePostActions.js";
import { preparePostFormData } from "../../../helpers/postUtils.js";

const useFeedTimeline = (username) => {
    const queryClient = useQueryClient();
    const timelineCacheKey = ["feedTimeline", username];

    // 1. READ: Safe Cache Synchronization Pipeline
    const timelineQuery = useQuery({
        queryKey: timelineCacheKey,
        queryFn: async () => {
            if (!username) return [];
            // Hits the custom endpoint with the logged-in handle safely
            const response = await apiClient.get(`/api/v1/feed/${username}`);
            return response.data?.data || [];
        },
        enabled: !!username,
        staleTime: 1000 * 60 * 5,
    });

    // 2. CREATE: Bound Action Execution Block
    const createMutation = useMutation({
        mutationFn: (payload) => {
            if (!username) throw new Error("Unauthorized action dispatch.");
            return createPost(username, payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: timelineCacheKey });
        },
    });

    // 3. UPDATE: Bound Modification Block
    const updateMutation = useMutation({
        mutationFn: ({ postId, payload }) => {
            if (!username) throw new Error("Unauthorized modification dispatch.");
            return updatePost(username, postId, payload);
        },
        onSuccess: (serverResponse) => {
            // 🛠️ FIX 2: Deep unpack response layers defensively to locate the true database ID
            const updatedPostFromServer = serverResponse?.data?.data || serverResponse?.data || serverResponse;

            if (updatedPostFromServer && updatedPostFromServer.id) {
                queryClient.setQueryData(timelineCacheKey, (oldTimelineData) => {
                    if (!oldTimelineData) return [];
                    return oldTimelineData.map((post) =>
                        post.id === updatedPostFromServer.id
                            ? { ...post, ...updatedPostFromServer } // Instantly replaces local blob URLs with permanent Cloudinary strings
                            : post
                    );
                });
            } else {
                // Secure fallback if data layout is unexpected
                queryClient.invalidateQueries({ queryKey: timelineCacheKey });
            }
        },
    });

    // 4. DELETE: Bound Removal Block
    const deleteMutation = useMutation({
        mutationFn: (postId) => {
            if (!username) throw new Error("Unauthorized exclusion dispatch.");
            return deletePost(username, postId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: timelineCacheKey });
        },
    });

    return {
        feedTimeline: timelineQuery.data || [],
        loading: timelineQuery.isLoading,
        isRefetching: timelineQuery.isFetching && !timelineQuery.isLoading,
        isPublishing: createMutation.isPending,
        error: timelineQuery.error,

        handleAddPost: createMutation.mutateAsync,

        // 3rd arg is EditPost's pendingFiles: { images: File[], videos: File[] }
        handleUpdatePost: async (postId, editPosts, pendingFiles) => {
            // Shared builder: retained URLs (blob:-filtered) + new binary files
            const formData = preparePostFormData(editPosts, pendingFiles);

            const result = await updateMutation.mutateAsync({
                postId,
                payload: formData
            });

            return Boolean(result);
        },

        handleDeletePost: async (postId) => {
            return await deleteMutation.mutateAsync(postId);
        },
    };
};

export default useFeedTimeline;