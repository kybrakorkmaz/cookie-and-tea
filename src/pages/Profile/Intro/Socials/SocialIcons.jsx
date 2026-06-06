import { FaXTwitter, FaSquarePinterest, FaYoutube, FaInstagram } from "react-icons/fa6";
import {ICON_MAP} from "../../constants/profileConstants.js";


const SocialIcons = ({ accountUrl, socialMedia }) => {
    // Select the component matching our database enum value string
    const IconComponent = ICON_MAP[socialMedia];

    if (!IconComponent) return null; // if no icon exists do nothing

    return (
        <a
            href={accountUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform inline-block"
        >
            <IconComponent className="w-8 h-8 text-primary-dark" />
        </a>
    );
};

export default SocialIcons;