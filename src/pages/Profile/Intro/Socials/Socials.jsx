import { FaPenToSquare } from "react-icons/fa6";
import SocialIcons from "./SocialIcons.jsx";
import SocialEdit from "./SocialEdit.jsx";
import { useState, useEffect } from "react";
import apiClient from "../../../../api/axios.js";
import {useParams} from "react-router";

const Socials = ({ socials }) => {
    const [isEditClicked, setIsEditClicked] = useState(false);
    const [currentSocials, setCurrentSocials] = useState([]);
    const {username} = useParams();
    // Update internal state when data loads or updates from the main server response
    useEffect(() => {
        setCurrentSocials(socials || []);
    }, [socials]);

    // if edit icon is clicked prevent scrolling
    useEffect(() => {
        document.body.style.overflow = isEditClicked ? 'hidden' : 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [isEditClicked]);

    // updates social media account data list
    const handleSaveSocials = async (updatedList) => {
        if (!updatedList) return;
        // store old data for using again if error occurred
        const previousSocials = currentSocials;
        // Sanity check: prevent to send empty URLs
        const finalData = updatedList
            .filter(item=>item.socialUrl && item.socialUrl.trim() !=="")
            .map(item=>({
                socialMedia: item.socialMedia,
                socialUrl: item.socialUrl.trim()
            }));
        // Optimistic UI Update: change frontend state immediately so it feels instantaneous
        setCurrentSocials(finalData);
        try {
            // Passing the array cleanly inside the HTTP Request Body payload
            await apiClient.put(`/api/v1/profile/${username}/socials`, {
                socials: finalData
            });

            //close modal
            setIsEditClicked(false);

        } catch (error) {
            // Rollback to old values if network connection dropouts occur
            setCurrentSocials(previousSocials);
            console.error("Failed saving social media settings:", error);
            // do not call setIsEditClicked(false)
            // so if anything occurs, window stays open and the user does not lose its url(s)
            alert("Changes couldn't be saved. Please try again!");
        }
    };

    return (
        <div className="bg-white p-10 rounded-2xl shadow-soft text-primary-dark">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-header text-sh">Socials</h3>
                <button
                    onClick={() => setIsEditClicked(true)}
                    className="text-gray-500 cursor-pointer hover:text-primary-dark transition-colors"
                >
                    <FaPenToSquare className="w-5 h-5 "/>
                </button>
            </div>
            <hr className="border-gray-200 mb-6"/>

            <div className="flex justify-start gap-4">
                {/* Now map current data not prop (old one) */}
                {currentSocials.map((social, index) => (
                    <SocialIcons
                        key={social.id || index} // Safe fallback key
                        socialMedia={social.socialMedia}
                        accountUrl={social.socialUrl}
                    />
                ))}
            </div>

            {/* Edit window */}
            {isEditClicked && (
                <SocialEdit
                    socials={currentSocials}
                    onClose={() => setIsEditClicked(false)}
                    onSave={handleSaveSocials}
                />
            )}
        </div>
    );
};

export default Socials;