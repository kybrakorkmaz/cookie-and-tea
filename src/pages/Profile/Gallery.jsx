import { useState } from "react";
import { posts } from "../../constants/index.js";
import { IoClose } from "react-icons/io5";
import PageUpButton from "../../components/PageUpButton.jsx";

const Gallery = () => {
    // Lightbox state
    const [selectedImage, setSelectedImage] = useState(null);
    // Pagination state
    const [visibleCount, setVisibleCount] = useState(8);

    const sharedImages = posts[0].posts
        .filter(post => post.post_type === "image")
        .flatMap(p => p.post_image);

    const totalImages = sharedImages.length;
    const visibleImages = sharedImages.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 4);
    };

    return (
        <div className="w-5/6 p-5 sm:p-8 mx-auto mt-16 flex flex-col items-center">
            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                {visibleImages.map((img, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedImage(img)}
                        className="aspect-square overflow-hidden rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-all hover:opacity-90 group"
                    >
                        <img
                            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            src={img}
                            alt={`shared-gallery-${index}`}
                        />
                    </div>
                ))}
            </div>

            {/* Load More Button */}
            {visibleCount < totalImages && (
                <button
                    onClick={handleLoadMore}
                    className="mt-12 px-10 py-3 bg-primary-dark text-white rounded-full font-bold hover:bg-opacity-90 transition-all shadow-md active:scale-95"
                >
                    Load More
                </button>
            )}

            {/* Lightbox / Full-screen View */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-10"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(null);
                        }}
                        className="absolute top-6 right-6 text-white text-4xl hover:text-primary-dark transition-colors cursor-pointer"
                    >
                        <IoClose />
                    </button>

                    <div
                        className="relative max-w-5xl w-full h-full flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage}
                            className="max-w-full max-h-full rounded-lg object-contain shadow-2xl"
                            alt="preview-enlarged"
                        />
                    </div>
                </div>
            )}

            {sharedImages.length === 0 && (
                <div className="text-center py-20 text-gray-400 font-paragraph">
                    No images shared yet.
                </div>
            )}
            <PageUpButton />
        </div>
    );
};

export default Gallery;