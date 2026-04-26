import {FaPenToSquare} from "react-icons/fa6";
import ContentSocial from "./ContentSocial.jsx";

const ContentSocials = ({socials}) =>{
    console.log("contentSocials component socials:", socials);
    return(
        <div className="bg-white p-10 rounded-2xl shadow-soft text-primary-dark">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-header text-sh">Socials</h3>
                <FaPenToSquare className="w-5 h-5 text-gray-500 cursor-pointer hover:text-primary-dark transition-colors"/>
            </div>
            <hr className="border-gray-200 mb-6"/>
            <div className="flex justify-start gap-4">
                {socials.map(social=>(
                    <ContentSocial key={social.name} socialAccountName={social.name} accountUrl={social.url}/>
                ))}
            </div>
        </div>
    )
}
export default ContentSocials;