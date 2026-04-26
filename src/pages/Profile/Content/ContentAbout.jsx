import {FaPenToSquare} from "react-icons/fa6";

const ContentAbout = ({about}) => {
    return(
        <div className="bg-white p-10 rounded-2xl shadow-soft">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-header text-sh">About</h3>
                <FaPenToSquare className="w-5 h-5 text-gray-500 cursor-pointer hover:text-primary-dark transition-colors"/>
            </div>
            <hr className="border-gray-200 mb-6"/>
            <p className="font-paragraph text-gray-700 leading-relaxed">{about}</p>
        </div>
    )
}

export default ContentAbout;