import {useState} from "react";
import apiClient from "../../../api/axios.js";

const useUpdateProfilePost = (username, setAllPosts) =>{
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdate = async (postId, updatedFields) =>{
        try{
            setIsUpdating(true);
            const response = await apiClient.put(`/api/v1/profile/${username}/posts/${postId}`, updatedFields);
            if (response.status === 200) {
                // 2. Map through your active state posts and update the matched item in place
                setAllPosts((prevPosts) =>
                    prevPosts.map((post) =>
                        (post.id === postId) ? { ...post, ...updatedFields } : post
                    )
                );
                alert("Post updated successfully!");
                return true; // Return success status to close the modal window downstream
            }
        }catch (err){
            console.error("Failed to update profile post:", err);
            alert(err.response?.data?.message || "Could not save changes. Please try again.");
            return false;
        }finally {
            setIsUpdating(false);
        }
    }

    return{
        handleUpdate,
        isUpdating
    }
}
export default useUpdateProfilePost;