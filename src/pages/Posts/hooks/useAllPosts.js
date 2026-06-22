import {useEffect, useState} from "react";
import apiClient from "../../../api/axios.js";

const useAllPosts = (username) =>{
    // Grab the logged-in user context in case we need to verify post ownership in the UI
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAllPosts = async () =>{
            try{
                const response = await apiClient.get(`/api/v1/profile/${username}/posts`)
                // If backend returns 200, populate posts. If it returns 204, fall back to empty array
                if(response.status === 200){
                    setPosts(response.data.data);
                }else if(response.status === 204){
                    setPosts([]);
                }
            }catch (err){
                console.error("Failed fetching profile posts timeline:", err);
            }finally {
                setLoading(false);
            }
        }

        getAllPosts();
    }, [username]);

    return{
        posts,
        loading,
    }
}

export default useAllPosts;