import {useState} from "react";

export const usePanelActions = (setSelected) => {
    const [editMode, setEditMode] = useState(null); // 'profile' | 'cover' | null
    const [error, setError] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleUpdate = async (file) => {
        if (!file) {
            setError("Please select a file to upload.");
            return;
        }

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

            // Assuming response contains the new image URL
            // const data = await response.json();
            // updateStateOrRedux(data.url);

            setEditMode(null);
            setError(null);
        } catch (err) {
            console.error("Update Error:", err);
            setError("Failed to upload image. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleTabClick = (tab) => {
        setSelected(tab);
        // Reset scroll when switching tabs
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return {
        editMode,
        setEditMode,
        error,
        setError,
        isUploading,
        handleUpdate,
        handleTabClick
    };
}