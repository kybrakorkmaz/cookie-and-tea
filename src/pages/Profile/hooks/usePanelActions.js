import { useState } from "react";
import { useAuth } from "../../../context/AuthContext.jsx"; // Adjust path as needed

export const usePanelActions = (setSelected) => {
    const { setUserData } = useAuth(); // Access the context
    const [editMode, setEditMode] = useState(null);
    const [error, setError] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleUpdate = async (file) => {
        if (!file) return;

        try {
            setIsUploading(true);
            const formData = new FormData();
            formData.append('file', file);

            const endpoint = editMode === 'profile' ? '/api/profile/photo' : '/api/profile/cover';

            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error("Upload failed");

            const data = await response.json(); // Assuming response: { imageUrl: "..." }

            // 🔥 THE FIX: Update AuthContext immediately
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

    return { editMode, setEditMode, error, setError, handleUpdate, handleTabClick: (tab) => { setSelected(tab); window.scrollTo({ top: 0, behavior: "smooth" }); } };
}