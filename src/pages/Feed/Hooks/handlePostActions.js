import apiClient from "../../../api/axios.js";

export const createPost = (username) => {
    const handleCreatePost = async (payload) => {
        try{
            const response = await apiClient.post(`/api/v1/feed/${username}`, payload);
            if(response.status === 201){
                console.log("Post shared successfully!");
                return;
            }
            console.log("new post couldn't be created!", response.status)
        }catch (e){
            console.error("Error occurred while publishing post!", e.message);
        }
    }
    return {
        handleCreatePost
    }
}

export const updatePost = (username) => {
    const handleUpdatePost = async (postId, payload) =>{
        try{
            const response = await apiClient.put(`/api/v1/feed/${username}/posts/${postId}`, payload);
            if(response.status === 200) {
                console.log("Post updated successfully!");
                return;
            }
            console.log("new post couldn't be updated", response.status)
        }catch (e){
            console.error("Error occurred while updating post!", e.message);
        }
    }

    return {
        handleUpdatePost
    }
}

export const deletePost  = (username) => {
    const handleDeletePost  = async (postId) => {
        try {
            const response = await  apiClient.delete(`/api/v1/feed/${username}/posts/${postId}`);
            if(response.status === 200){
                console.log("Post is deleted successfully!");
                return;
            }
            console.log("Post couldn't be deleted, try again!", response.status);
        }catch (e){
            console.error("Error occurred while deleting post!", e.message);
        }
    }

    return {
        handleDeletePost
    }
}