// Hooks/useFeedTimeline.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../api/axios.js";
import { createPost, updatePost, deletePost } from "./handlePostActions.js";

const useFeedTimeline = (username) => {
    const queryClient = useQueryClient();

    // Core shared cache tracking key
    const timelineCacheKey = ["feedTimeline", username];

    // 1. READ: Automatic cache synchronization pipeline
    const timelineQuery = useQuery({
        queryKey: timelineCacheKey,
        queryFn: async () => {
            if (!username) return [];
            const response = await apiClient.get(`/api/v1/feed/${username}`);
            return response.data?.data || [];
        },
        enabled: !!username,
        staleTime: 1000 * 60 * 5, // Consider cache data fresh for 5 minutes
    });

    // 2. CREATE: Action execution + query cache clearance
    const createMutation = useMutation({
        mutationFn: (payload) => createPost(username, payload),
        onSuccess: () => {
            // 🚀 Invalidate forces immediate refetching of the joined user profile data
            queryClient.invalidateQueries({ queryKey: timelineCacheKey });
        },
    });

    // 3. UPDATE: Modification tracking + query cache clearance
    const updateMutation = useMutation({
        mutationFn: ({ postId, payload }) => updatePost(username, postId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: timelineCacheKey });
        },
    });

    // 4. DELETE: Removal execution + query cache clearance
    const deleteMutation = useMutation({
        mutationFn: (postId) => deletePost(username, postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: timelineCacheKey });
        },
    });

    return {
        // Data and descriptive boolean execution states
        feedTimeline: timelineQuery.data || [],
        loading: timelineQuery.isLoading,
        isRefetching: timelineQuery.isFetching && !timelineQuery.isLoading, // 🔄 Drives the reload spinner
        isPublishing: createMutation.isPending,
        error: timelineQuery.error,

        // Wrapped clean action dispatch references
        handleAddPost: createMutation.mutateAsync,
        handleUpdatePost: async (postId, updatedFields) => {
            await updateMutation.mutateAsync({ postId, payload: updatedFields });
            return true;
        },
        handleDeletePost: async (postId) => {
            await deleteMutation.mutateAsync(postId);
            return true;
        },
    };
};

export default useFeedTimeline;