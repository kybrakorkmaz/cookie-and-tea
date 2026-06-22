import { useState } from "react";
import apiClient from "../../../api/axios.js";

const useDeleteProfilePost = (username, setAllPosts) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (postId) => {
        try {
            setIsDeleting(true);

            // 1. Make the secure backend API call
            const response = await apiClient.delete(`/api/v1/profile/${username}/posts/${postId}`);

            if (response.status === 200 || response.status === 204) {
                // 2. Clear it from the UI state list immediately on success
                setAllPosts((prevPosts) =>
                    prevPosts.filter((post) => post.id !== postId && post.post_id !== postId)
                );
                alert("Post deleted successfully!");
            }
        } catch (err) {
            console.error("Failed to delete post:", err);
            alert(err.response?.data?.message || "Failed to delete post. Please check your connection.");
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        handleDelete,
        isDeleting
    };
};

export default useDeleteProfilePost;