import { useState } from "react";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";

const VideoPost = ({ video = [] }) => {
    const videosArray = Array.isArray(video) ? video : [video];
    const [currentIndex, setCurrentIndex] = useState(0);

    const getEmbeddedLink = (url) => {
        if (!url || url.includes("youtube.com/embed")) return url;
        const urlId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
        return `https://www.youtube.com/embed/${urlId}`;
    };

    const nextVideo = () => {
        if (currentIndex < videosArray.length - 1) setCurrentIndex(currentIndex + 1);
    };

    const prevVideo = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    return (
        <div className="relative group w-full mt-4 overflow-hidden rounded-xl border border-primary-dark/20 shadow-md bg-black">
            {/* Iframe Container */}
            <iframe
                key={videosArray[currentIndex]} // rerender iframe
                className="w-full aspect-video border-none"
                src={getEmbeddedLink(videosArray[currentIndex])}
                title="YouTube player"
                allowFullScreen
                loading="lazy"
            />

            {/* show buttons if the data is more than one */}
            {videosArray.length > 1 && (
                <>
                    {currentIndex > 0 && (
                        <button
                            onClick={prevVideo}
                            className="absolute top-1/2 -translate-y-1/2 left-2 z-10 cursor-pointer"
                        >
                            <IoArrowBackCircle className="w-10 h-10 text-cream/70 hover:text-cream drop-shadow-[0_0_5px_rgba(0,0,0,0.5)] transition-all" />
                        </button>
                    )}
                    {currentIndex < videosArray.length - 1 && (
                        <button
                            onClick={nextVideo}
                            className="absolute top-1/2 -translate-y-1/2 right-2 z-10 cursor-pointer"
                        >
                            <IoArrowForwardCircle className="w-10 h-10 text-cream/70 hover:text-cream drop-shadow-[0_0_5px_rgba(0,0,0,0.5)] transition-all" />
                        </button>
                    )}

                    {/* Video counter */}
                    <div className="absolute bottom-2 right-4 text-cream/80 text-xs font-bold bg-black/40 px-2 py-1 rounded-lg">
                        {currentIndex + 1} / {videosArray.length}
                    </div>
                </>
            )}
        </div>
    );
};

export default VideoPost;