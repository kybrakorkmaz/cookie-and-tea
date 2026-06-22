const PostBody = ({header, content, date}) =>{
    return(
        <div className="space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="text-xl md:text-2xl font-header font-extrabold text-primary-dark tracking-tight">
                    {header}
                </h3>
                <span className="font-paragraph text-[11px] uppercase tracking-wider text-gray-400 font-bold">
                                {new Date(date).toLocaleDateString()}
                            </span>
            </div>

            {content && (
                <p className="font-paragraph text-gray-600 mt-2 leading-relaxed text-sm md:text-base whitespace-pre-line">
                    {content}
                </p>
            )}
        </div>
    )
}

export default PostBody;