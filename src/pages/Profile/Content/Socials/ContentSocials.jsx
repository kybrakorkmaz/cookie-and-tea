import { FaPenToSquare } from "react-icons/fa6";
import ContentSocial from "./ContentSocial.jsx";
import ContentSocialEdit from "./ContentSocialEdit.jsx";
import { useState, useEffect } from "react";

const ContentSocials = ({ socials }) => {
    const [isEditClicked, setIsEditClicked] = useState(false);
    // 1. to update data from prop, we store them into state
    const [currentSocials, setCurrentSocials] = useState(socials || []);


    // if data comes late or info changes (API or useEffect) update state
    useEffect(() => {
        setCurrentSocials(socials || []);
    }, [socials]);

    // if edit icon clicked prevent scrolling
    useEffect(() => {
        document.body.style.overflow = isEditClicked ? 'hidden' : 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [isEditClicked]);

    // 2. updates social media account data list
    const handleSaveSocials = async (updatedList) => {
        // store old data for using again if error occurred
        const previousSocials = currentSocials;
        // Sanity check: prevent to send empty URLs
        const finalData = updatedList.filter(item => item.url && item.url.trim() !== "");
        // 1. Update frontend immediately so the user don't wait to see the updated data
        setCurrentSocials(finalData);

        try {
            // 2. send changes to backend
            const response = await fetch('url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}` // if user authenticated
                },
                body: JSON.stringify(finalData)
            });

            if (!response.ok) throw new Error('Error occurred!');

            //close modal
            setIsEditClicked(false);

        } catch (error) {
            // if error occurs rollback to previous data
            setCurrentSocials(previousSocials);
            console.error("Error:", error);
            // NOTE: do not call setIsEditClicked(false)
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
                {/* 3. Now map current data not prop (old one) */}
                {currentSocials.map(social => (
                    <ContentSocial
                        key={social.name}
                        socialAccountName={social.name}
                        accountUrl={social.url}
                    />
                ))}
            </div>

            {/* Edit window */}
            {isEditClicked && (
                <ContentSocialEdit
                    socials={currentSocials}
                    onClose={() => setIsEditClicked(false)}
                    onSave={handleSaveSocials}
                />
            )}
        </div>
    );
};

export default ContentSocials;