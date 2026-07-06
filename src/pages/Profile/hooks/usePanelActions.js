import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";
import apiClient from "../../../api/axios.js"; // Standardized routing client

export const usePanelActions = (username, initialIsFollowing, isOwnProfile, setSelected) => {
    const { setUserData } = useAuth();
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

            const endpoint = editMode === 'profile' ? '/api/profile/photo' : '/api/profile/cover';
            const response = await apiClient.post(endpoint, formData);
            const data = response.data;

            if (editMode === 'profile') {
                setUserData({ profileImage: data.imageUrl });
            }

            setEditMode(null);
            setError(null);
        } catch (err) {
            setError("Failed to upload image. Please try again.");
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
        } catch (err) {
            setError("Failed to modify follow status. Please try again.");
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