const ImagePost = ({detail="",  images=[]}) => {
    const imagesArray = Array.isArray(images) ? images : [images];

    return (
        <div className="mt-4 w-full">
            <div className={`grid gap-3 
                ${imagesArray.length === 1 ? 'grid-cols-1' :
                imagesArray.length === 2 ? 'grid-cols-2' :
                    'grid-cols-2 md:grid-cols-3'}`}
            >
                {imagesArray.map((img, index) => (
                    <div
                        key={index}
                        className={`overflow-hidden rounded-xl border border-gray-100 shadow-sm group
                            ${imagesArray.length === 1 ? 'h-auto' : 'aspect-square'}`}
                    >
                        <img
                            src={img}
                            alt={`Content ${index}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImagePost;