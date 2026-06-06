import { FaPenToSquare } from "react-icons/fa6";
import SocialIcons from "./SocialIcons.jsx";
import SocialEdit from "./SocialEdit.jsx";
import {useProfileSocials} from "../../hooks/useProfileSocials.js";

const Socials = ({ socials }) => {
    const {
        isEditClicked,
        setIsEditClicked,
        currentSocials,
        handleSaveSocials
    } = useProfileSocials(socials);

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