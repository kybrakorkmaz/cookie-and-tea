import {useEffect, useState} from "react";
import {useParams} from "react-router";
import apiClient from "../../../api/axios.js";

export const useProfileAbout = (about) => {
    const {username} = useParams();
    const [currentAbout, setCurrentAbout] = useState(about || "");
    const [isEditClicked, setIsEditClicked] = useState(false);

    // Sync state safely only when the parent value actually shifts
    useEffect(() => {
        setCurrentAbout(about || "");
    }, [about]);

    const handleSaveAbout = async (updatedAbout) =>{
        // Terminate instantly if invoked by mount-lifecycle automation
        if(updatedAbout===undefined){
            //setIsEditClicked(false);
            return;
        }
        const previousAbout = currentAbout;

        // Short-circuit if nothing changed to prevent wasteful network requests
        if(previousAbout === updatedAbout) {
            setIsEditClicked(false);
            return;
        }

        // Optimistic UI Update: change screen instantly for maximum perceived speed
        setCurrentAbout(updatedAbout);

        try{
            // Send payload inside an JSON request object body
            const response = await apiClient.put(`/api/v1/profile/${username}/about`, {
                about:updatedAbout
            });
            if (response.data?.about !== undefined) {
                setCurrentAbout(response.data.about);
            }
            //close modal
            setIsEditClicked(false);
        }catch (error){
            // Rollback state if network pipes break or fail schema check constraints
            setCurrentAbout(previousAbout);
            console.error("Failed saving profile about context:", error.message);
            alert("Changes couldn't be saved. Please try again!");
            throw error; // Re-throw so the modal interceptor knows NOT to close
        }
    }

    // if edit icon clicked prevent scrolling
    useEffect(() => {
        document.body.style.overflow = isEditClicked ? 'hidden' : 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [isEditClicked]);

    return{
        currentAbout,
        handleSaveAbout,
        isEditClicked,
        setIsEditClicked
    }
}