import {GiTwoCoins} from "react-icons/gi";

const PostDonators = ({imgSrc, name, username, date, donatedAmount}) =>{
    return(
        <div className="flex justify-between mt-4 p-3 bg-gray-50 rounded-xl border-l-4 border-primary-dark/30">
            <div className="flex items-center gap-2 mb-1">
                <img
                    src={imgSrc}
                    className="w-5 h-5 rounded-full object-cover"
                    alt="donator"
                />
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-800">{name}</span>
                    <span className="text-xs text-gray-800">@{username}</span>
                </div>
                <span className="flex text-sm italic"> Donated <GiTwoCoins className="w-5 h-5 text-amber-500"/>${donatedAmount}</span>
            </div>
            <span className="text-[10px] text-gray-400">{date}</span>
        </div>
    )
}
export default PostDonators;