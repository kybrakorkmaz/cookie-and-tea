import apiClient from "../../../api/axios.js";
import {useState, useEffect, useCallback} from "react";

const useFeedTimeline = (username) => {
    const [feedTimeline, setFeedTimeline] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);

    const LIMIT = 5;

    const fetchTimeline = useCallback(async (currentOffset, clearExisting = false) => {
        if(!username) return;

        setLoading(true);
        try{
            const response = await apiClient.get(`/api/v1/feed/${username}`, {
                params: {
                    limit: LIMIT,
                    offset: currentOffset
                }
            });

            if(response.status === 200) {
                const incomingPosts = response.data?.data || [];

                if(clearExisting) {
                    setFeedTimeline(incomingPosts);
                }else {
                    // Append new posts onto the end of our current list state
                    setFeedTimeline(prev => [...prev, ...incomingPosts]);
                }
                // If the backend sent fewer posts than our limit, we hit the end of the line
                if(incomingPosts.length < LIMIT){
                    setHasMore(false);
                }else {
                    setHasMore(true);
                }
            }
        }catch (e) {
            console.error("Internal Server Error while fetching feed timeline:", e.message);
        } finally {
            setLoading(false);
        }
    }, [username]);

    // Initial load: whenever username changes, reset everything completely
    useEffect(() => {
        setOffset(0);
        setHasMore(true);
        fetchTimeline(0, true);
    }, [username]); // Re-fetches automatically if the profile changes

    // Triggers when the user clicks Load More
    const loadMorePosts = () => {
        if(loading || !hasMore) return;
        const nextOffset = offset + LIMIT;
        setOffset(nextOffset);
        fetchTimeline(nextOffset, false);
    }
    return{
        feedTimeline,
        setFeedTimeline, // Exposed so handleCreatePost / handleDelete can update local state instantly
        loading,
        hasMore,
        loadMorePosts
    }
};

export default useFeedTimeline;