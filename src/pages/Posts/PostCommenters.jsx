const PostCommenters = ({imgSrc, name, username, date,comment})=>{
    return(
        <div className="mt-4 p-3 bg-gray-50 rounded-xl border-l-4 border-primary-dark/30">
            <div className="flex items-center gap-2 mb-1">
                <img
                    src={imgSrc}
                    className="w-5 h-5 rounded-full object-cover"
                    alt="commenter"
                />
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-800">{name}</span>
                    <span className="text-xs text-gray-800">@{username}</span>
                </div>
                <span className="text-[10px] text-gray-400">{date}</span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 italic">
                "{comment}"
            </p>
        </div>
    )
}

export default PostCommenters;