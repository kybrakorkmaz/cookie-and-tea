const RoundedImage = ({ w, h, image, alt = "" }) =>{
    return(
        <div className={`${w} ${h} rounded-full overflow-hidden shrink-0 border border-gray-100 shadow-sm`}>
            <img
                src={image}
                alt={alt}
                className="w-full h-full object-cover"
            />
        </div>
    )
}
export default RoundedImage;