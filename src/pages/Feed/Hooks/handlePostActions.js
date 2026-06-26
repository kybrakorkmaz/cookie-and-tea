import apiClient from "../../../api/axios.js";

export const createPost = async (username, payload) => {
    try {
        console.log("Sending payload to backend:", payload);
        const response = await apiClient.post(`/api/v1/feed/${username}/`, payload);
        if (response.status === 201) {
            console.log("Post shared successfully!");
            return response.data?.data || response.data;
        }
        console.log("New post couldn't be created!", response.status);
        return null;
    } catch (e) {
        console.error("Error occurred while publishing post:", e.message);
        throw e;
    }
};

export const updatePost = async (username, postId, payload) => {
    try {
        const response = await apiClient.put(`/api/v1/feed/${username}/posts/${postId}`, payload);
        if (response.status === 200) {
            console.log("Post updated successfully!");
            return response.data?.data || response.data;
        }
        console.log("New post couldn't be updated", response.status);
        return null;
    } catch (e) {
        console.error("Error occurred while updating post:", e.message);
        throw e;
    }
};

export const deletePost = async (username, postId) => {
    try {
        const response = await apiClient.delete(`/api/v1/feed/${username}/posts/${postId}`);
        if (response.status === 200 || response.status === 204) {
            console.log("Post is deleted successfully!");
            return true;
        }
        console.log("Post couldn't be deleted, try again!", response.status);
        return false;
    } catch (e) {
        console.error("Error occurred while deleting post:", e.message);
        throw e;
    }
};