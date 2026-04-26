import {NavLink} from "react-router";
import {IoIosArrowForward} from "react-icons/io";

const ContentLatestPosts = () => {
    return(
        <div className="bg-white p-10 rounded-2xl shadow-soft">
            <h3 className="font-header text-sh text-primary-dark mb-4">Latest Posts</h3>
            <hr className="border-gray-200 mb-6"/>
            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <h4 className="font-header text-lg font-bold">First Day of Spring</h4>
                    <span className="font-paragraph text-sm text-gray-500">23.04.2026</span>
                </div>
                <p className="font-paragraph text-gray-700">
                    Soft light, fresh air, and a quiet reminder that new beginnings are here 🌿
                </p>
                <NavLink to="/post/details" className="flex items-center justify-end text-primary-dark hover:underline gap-1">
                    <span className="text-sm font-paragraph">See details</span>
                    <IoIosArrowForward />
                </NavLink>
            </div>
        </div>
    )
}

export default ContentLatestPosts;