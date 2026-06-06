import { useState, useEffect } from "react";
import { useParams } from "react-router";
import apiClient from "../../../api/axios.js";

export const useProfileSocials = (initialSocials) => {
    const { username } = useParams();
    const [isEditClicked, setIsEditClicked] = useState(false);
    const [currentSocials, setCurrentSocials] = useState([]);

    // Update internal state cleanly if the parent dashboard state updates
    useEffect(() => {
        setCurrentSocials(initialSocials || []);
    }, [initialSocials]);

    // Handle scroll lock side effects natively based on open states
    useEffect(() => {
        document.body.style.overflow = isEditClicked ? 'hidden' : 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [isEditClicked]);

    const handleSaveSocials = async (updatedList) => {
        if (!updatedList) return;

        const previousSocials = currentSocials;

        const finalData = updatedList
            .filter(item => item.socialUrl && item.socialUrl.trim() !== "")
            .map(item => ({
                socialMedia: item.socialMedia,
                socialUrl: item.socialUrl.trim()
            }));

        // Optimistic UI Update: updates instantly for a snappy user experience
        setCurrentSocials(finalData);

        try {
            await apiClient.put(`/api/v1/profile/${username}/socials`, {
                socials: finalData
            });
            setIsEditClicked(false);
        } catch (error) {
            // Rollback to original server values if network fails
            setCurrentSocials(previousSocials);
            console.error("Failed saving social media settings:", error);
            alert("Changes couldn't be saved. Please try again!");

            // Re-throw error so the calling modal knows to stay open
            throw error;
        }
    };

    return {
        isEditClicked,
        setIsEditClicked,
        currentSocials,
        handleSaveSocials
    };
};