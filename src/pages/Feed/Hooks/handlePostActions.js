import apiClient from "../../../api/axios.js";

export const createPost = async (username, formData) => {
    try {
        // Do NOT set headers manually. Axios detects FormData and sets 'multipart/form-data' + boundary
        const response = await apiClient.post(`/api/v1/feed/${username}/`, formData);
        return response.data?.data || response.data;
    } catch (e) {
        console.error("Error publishing post:", e.response?.data || e.message);
        throw e;
    }
};

export const updatePost = async (username, postId, formData) => {
    try {
        // Do NOT set Content-Type header manually here!
        const response = await apiClient.put(
            `/api/v1/feed/${username}/posts/${postId}`,
            formData
        );
        return response.data;
    } catch (e) {
        console.error("Error updating post:", e.response?.data || e.message);
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