import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { useState } from "react";
import apiClient from "@/services/apiClient.js";
import { invalidatePostCaches } from "./invalidatePostCaches.js";

export const profilePostsQueryKey = (username) => ["profilePosts", username];

export const fetchProfilePosts = async (username) => {
    if (!username) return [];
    const response = await apiClient.get(`/api/v1/profile/${username}/posts`);
    return response.data?.data ?? [];
};

export const profilePostsQueryOptions = (username) => ({
    queryKey: profilePostsQueryKey(username),
    queryFn: () => fetchProfilePosts(username),
    enabled: !!username,
    staleTime: 1000 * 60 * 5,
});

export const prefetchProfilePosts = (queryClient, username) => {
    if (!username) return Promise.resolve();
    return queryClient.prefetchQuery(profilePostsQueryOptions(username));
};

export const useFetchProfilePosts = (username) => {
    return useQuery(profilePostsQueryOptions(username));
};

// DELETE HOOK
export const useDeletePost = (username) => {
    const queryClient = useQueryClient();
    const [isDeleting, setIsDeleting] = useState(false);

    const mutation = useMutation({
        mutationFn: (postId) => apiClient.delete(`/api/v1/profile/${username}/posts/${postId}`),
        onMutate: () => setIsDeleting(true),
        onSettled: () => setIsDeleting(false),
        onSuccess: () => {
            invalidatePostCaches(queryClient, username);
            alert("Post deleted successfully!");
        },
        onError: (err) => {
            console.error("Failed to delete post:", err);
            alert(err.response?.data?.message || "Failed to delete post.");
        }
    });

    return { handleDelete: mutation.mutate, isDeleting };
};

// UPDATE HOOK
export const useUpdatePost = (username) => {
    const queryClient = useQueryClient();
    const [isUpdating, setIsUpdating] = useState(false);

    const mutation = useMutation({
        mutationFn: ({ postId, formData }) => apiClient.put(`/api/v1/profile/${username}/posts/${postId}`, formData),
        onMutate: () => setIsUpdating(true),
        onSettled: () => setIsUpdating(false),
        onSuccess: () => {
            invalidatePostCaches(queryClient, username);
            alert("Post updated successfully!");
        },
        onError: (err) => {
            console.error("Failed to update post:", err);
            alert(err.response?.data?.message || "Could not save changes.");
        }
    });

    return { handleUpdate: mutation.mutateAsync, isUpdating };
};