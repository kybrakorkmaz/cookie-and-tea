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

        handleUpdatePost: async (postId, editPosts, updatedFields) => {
            // Assemble as FormData to handle raw binary File transfers smoothly
            const formData = new FormData();
            formData.append("header", editPosts.header);
            formData.append("type", editPosts.type);
            formData.append("content", editPosts.content ?? "");

            // 🛠️ FIX: Append retained/existing asset URLs so the server knows what to keep
            if (editPosts?.images && editPosts.images.length > 0) {
                editPosts.images.forEach((img) => {
                    if (typeof img === "string") {
                        formData.append("retainedImages", img);
                    }
                });
            }

            if (editPosts?.videos && editPosts.videos.length > 0) {
                editPosts.videos.forEach((vid) => {
                    if (typeof vid === "string") {
                        formData.append("retainedVideos", vid);
                    }
                });
            }

            // Append newly added images if present
            if (updatedFields?.images && updatedFields.images.length > 0) {
                updatedFields.images.forEach((file) => {
                    if (file instanceof File) {
                        formData.append("images", file);
                    }
                });
            }

            // Append newly added videos if present
            if (updatedFields?.videos && updatedFields.videos.length > 0) {
                updatedFields.videos.forEach((file) => {
                    if (file instanceof File) {
                        formData.append("videos", file);
                    }
                });
            }

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