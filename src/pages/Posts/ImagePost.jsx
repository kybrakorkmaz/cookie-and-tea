import { useState } from "react";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";

const ImagePost = ({ images = [] }) => {
    const imagesArray = Array.isArray(images) ? images : [images];
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        if (currentIndex < imagesArray.length - 1) setCurrentIndex(currentIndex + 1);
    };

    const prevImage = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    return (
        <div className="relative group w-full mt-4 overflow-hidden rounded-xl border border-primary-dark/10 shadow-sm bg-gray-200/30 backdrop-blur-md">
            {/*
                - bg-gray-200/30: Light grayish transparent color
                - backdrop-blur-md: Blurs whatever is behind the card slightly for a premium feel
            */}
            <div className="aspect-video md:aspect-4/3 w-full flex items-center justify-center">
                <img
                    src={imagesArray[currentIndex]}
                    alt={`Content ${currentIndex}`}
                    /* object-contain ensures the full height is visible without stretching the card */
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                    loading="lazy"
                />
            </div>

            {/* Navigation Controls */}
            {imagesArray.length > 1 && (
                <>
                    {currentIndex > 0 && (
                        <button
                            onClick={prevImage}
                            className="absolute top-1/2 -translate-y-1/2 left-2 z-10 cursor-pointer"
                        >
                            <IoArrowBackCircle className="w-9 h-9 text-gray-700/70 hover:text-primary-dark drop-shadow-sm transition-all" />
                        </button>
                    )}
                    {currentIndex < imagesArray.length - 1 && (
                        <button
                            onClick={nextImage}
                            className="absolute top-1/2 -translate-y-1/2 right-2 z-10 cursor-pointer"
                        >
                            <IoArrowForwardCircle className="w-9 h-9 text-gray-700/70 hover:text-primary-dark drop-shadow-sm transition-all" />
                        </button>
                    )}

                    {/* Image counter - adjusted colors for light theme */}
                    <div className="absolute bottom-3 right-3 text-[10px] font-bold text-gray-700 bg-white/60 backdrop-blur-sm px-2 py-1 rounded-md border border-gray-200">
                        {currentIndex + 1} / {imagesArray.length}
                    </div>
                </>
            )}
        </div>
    );
};

export default ImagePost;