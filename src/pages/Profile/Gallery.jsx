import { useState, useEffect, useCallback } from "react";
import { IoClose } from "react-icons/io5";
import PageUpButton from "../../components/PageUpButton.jsx";
import apiClient from "../../api/axios.js";

const PAGE_SIZE = 12;

const Gallery = ({ username }) => {
    // Lightbox state
    const [selectedImage, setSelectedImage] = useState(null);
    // Backend-driven gallery state (scoped to the profile owner)
    const [images, setImages] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPage = useCallback(async (pageToLoad) => {
        if (!username) return;
        setIsLoading(true);
        try {
            const response = await apiClient.get(`/api/v1/profile/${username}/gallery`, {
                params: { page: pageToLoad, limit: PAGE_SIZE }
            });
            const data = response.data?.data;
            const newImages = data?.images ?? [];
            setImages(prev => pageToLoad === 1 ? newImages : [...prev, ...newImages]);
            setTotal(data?.meta?.total ?? 0);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || "Couldn't load the gallery. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, [username]);

    // Reset and load the first page whenever a different profile is opened
    useEffect(() => {
        setImages([]);
        setPage(1);
        fetchPage(1);
    }, [fetchPage]);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchPage(nextPage);
    };

    return (
        <div className="w-5/6 p-5 sm:p-8 mx-auto mt-16 flex flex-col items-center">
            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                {images.map((img, index) => (
                    <div
                        key={`${img.postId}-${index}`}
                        onClick={() => setSelectedImage(img.imageUrl)}
                        className="aspect-square overflow-hidden rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-all hover:opacity-90 group"
                    >
                        <img
                            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            src={img.imageUrl}
                            alt={`shared-gallery-${index}`}
                        />
                    </div>
                ))}
            </div>

            {isLoading && (
                <div className="mt-12 text-gray-400 font-paragraph">Loading images...</div>
            )}

            {error && !isLoading && (
                <div className="mt-12 text-red-500 font-paragraph">{error}</div>
            )}

            {/* Load More Button */}
            {!isLoading && images.length < total && (
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

            {!isLoading && !error && images.length === 0 && (
                <div className="text-center py-20 text-gray-400 font-paragraph">
                    No images shared yet.
                </div>
            )}
            <PageUpButton />
        </div>
    );
};

export default Gallery;
