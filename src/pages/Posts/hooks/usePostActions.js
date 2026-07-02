import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { useState } from "react";
import apiClient from "../../../api/axios.js";

// FETCH HOOK
export const useFetchProfilePosts = (username) => {
    return useQuery({
        queryKey: ["profilePosts", username], // Removed 'tab' from key, as this hook only handles posts now
        queryFn: async () => {
            if (!username) return [];

            const response = await apiClient.get(`/api/v1/profile/${username}/posts`);
            return response.data?.data ?? [];
        },
        enabled: !!username,
    });
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
            queryClient.invalidateQueries({ queryKey: ["profilePosts", username] });
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
            queryClient.invalidateQueries({ queryKey: ["profilePosts", username] });
            alert("Post updated successfully!");
        },
        onError: (err) => {
            console.error("Failed to update post:", err);
            alert(err.response?.data?.message || "Could not save changes.");
        }
    });

    return { handleUpdate: mutation.mutateAsync, isUpdating };
};