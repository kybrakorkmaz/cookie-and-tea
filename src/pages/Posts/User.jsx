import RoundedImage from "../../components/RoundedImage.jsx";

const User = ({profileImage="", alt="", username="", name=""}) =>{
    return(
        <div className="flex items-center gap-3">
            <RoundedImage image={profileImage} alt={alt || ''} w={"w-11"} h={"h-11"}/>
            <div className="flex flex-col">
                <span className="font-header font-bold text-gray-900 text-sm leading-tight">{name}</span>
                <span className="font-paragraph text-xs text-gray-500">@{username}</span>
            </div>
        </div>
    )
}
export default User;