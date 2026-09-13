import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext.jsx";
import apiClient from "../../../api/axios.js"; // Standardized routing client

export const usePanelActions = (username, initialIsFollowing, isOwnProfile, setSelected, onImageUpdated) => {
    const { setUserData } = useAuth();
    const queryClient = useQueryClient();
    const [editMode, setEditMode] = useState(null);
    const [error, setError] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    // Manage local follow status reactively
    const [isFollowingState, setIsFollowingState] = useState(initialIsFollowing);

    // Sync local state if parent props change (e.g. navigation between profiles)
    useEffect(() => {
        setIsFollowingState(initialIsFollowing);
    }, [initialIsFollowing]);

    const handleUpdate = async (file) => {
        if (!file) return;

        try {
            setIsUploading(true);
            const formData = new FormData();
            formData.append('file', file);

            const endpoint = editMode === 'profile' ? '/api/v1/profile/photo' : '/api/v1/profile/cover';
            const response = await apiClient.post(endpoint, formData);
            const data = response.data?.data;

            if (editMode === 'profile') {
                // Sync global session state + the panel currently on screen
                setUserData({ profileImage: data.profileImage });
                onImageUpdated?.("profileImage", data.profileImage);
            } else {
                setUserData({ backgroundImage: data.backgroundImage });
                onImageUpdated?.("backgroundImage", data.backgroundImage);
            }

            setEditMode(null);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to upload image. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleFollowToggle = async () => {
        if (isOwnProfile) return; // Hard guard against self-following

        try {
            if (isFollowingState) {
                await apiClient.delete(`/api/v1/profile/${username}/follow`);
            } else {
                await apiClient.post(`/api/v1/profile/${username}/follow`);
            }

            setIsFollowingState(!isFollowingState);
            setError(null);
            // The feed timeline is derived from who you follow — invalidate it
            // here too (matches useFollowActions) or it stays cached 5 minutes
            queryClient.invalidateQueries({ queryKey: ["feedTimeline"] });
        } catch (err) {
            setError(err.response?.data?.message || "Failed to modify follow status. Please try again.");
        }
    };

    const handleTabClick = (tab) => {
        setSelected(tab);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return {
        editMode,
        setEditMode,
        error,
        setError,
        isUploading, // FIXED: Now exposed to your UI components
        handleUpdate,
        handleTabClick,
        isFollowingState,
        handleFollowToggle
    };
};