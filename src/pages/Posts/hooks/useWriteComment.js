import apiClient from "../../../api/axios.js";
import {useParams} from "react-router";
import {errors} from "@playwright/test";

const useWriteComment = () =>{
    const {username} = useParams();
    const handleWriteComment = async (postId,comment) =>{
        try{
            const response = await apiClient.post(`/api/v1/profile/${username}/posts/${postId}/comment`, comment);
            if(response.status === 201){
                console.log("comment published successfully!");
                return response.data;
            }
        }catch (e){
            console.error("Network error occurred while publishing the comment!");
            throw e;
        }
    }
    return{
        handleWriteComment
    }
 }

export default useWriteComment;