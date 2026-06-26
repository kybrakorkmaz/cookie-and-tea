// Hooks/useFeedTimeline.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../api/axios.js";
import { createPost, updatePost, deletePost } from "./handlePostActions.js";

const useFeedTimeline = (username) => {
    const queryClient = useQueryClient();
    const timelineCacheKey = ["feedTimeline", username];

    // 1. READ: Safe Cache Synchronization Pipeline
    const timelineQuery = useQuery({
        queryKey: timelineCacheKey,
        queryFn: async () => {
            if (!username) return [];
            const response = await apiClient.get(`/api/v1/feed/${username}`);
            return response.data?.data || [];
        },
        enabled: !!username,
        staleTime: 1000 * 60 * 5,
    });

    // 2. CREATE: Bound Action Execution Block
    const createMutation = useMutation({
        mutationFn: (payload) => {
            if (!username) throw new Error("Unauthorized action dispatch blocked by cache orchestration runtime.");
            return createPost(username, payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: timelineCacheKey });
        },
    });

    // 3. UPDATE: Bound Modification Block
    const updateMutation = useMutation({
        mutationFn: ({ postId, payload }) => {
            if (!username) throw new Error("Unauthorized modification dispatch blocked.");
            return updatePost(username, postId, payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: timelineCacheKey });
        },
    });

    // 4. DELETE: Bound Removal Block
    const deleteMutation = useMutation({
        mutationFn: (postId) => {
            if (!username) throw new Error("Unauthorized exclusion dispatch blocked.");
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

        // Convert the backend's updated post payload result directly to an authentic truthy/falsy boolean
        handleUpdatePost: async (postId, updatedFields) => {
            const result = await updateMutation.mutateAsync({ postId, payload: updatedFields });
            return Boolean(result);
        },

        // Directly return the true/false response received from deletePost
        handleDeletePost: async (postId) => {
            return await deleteMutation.mutateAsync(postId);
        },
    };
};

export default useFeedTimeline;