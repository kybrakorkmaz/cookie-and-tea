import RoundedImage from "../../components/RoundedImage.jsx";
import { Link } from "react-router-dom";

const User = ({profileImage="", alt="", username="", name=""}) =>{
    return(
        <div className="flex items-center gap-3">
            <RoundedImage image={profileImage} alt={alt || ''} w={"w-11"} h={"h-11"}/>
            <div className="flex flex-col">
                <Link  to={`/profile/${username}`} className="font-header font-bold text-gray-900 text-sm leading-tight">{name}</Link>
                <Link to={`/profile/${username}`} className="font-paragraph text-xs text-gray-500">@{username}</Link>
            </div>
        </div>
    )
}
export default User;