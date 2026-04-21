import { yourPassionReviews, yourPassionSocialPlatforms } from "../../constants/index.js";
import FromYouReviews from "./FromYouReviews.jsx";

const FromYou = () => {
    return (
        <div className="py-20 bg-cream">
            <h2 className="font-header text-h-2 text-center pb-24">FROM YOU!</h2>

            <div className="max-w-7xl mx-auto px-8 md:px-16">
                {yourPassionSocialPlatforms.map((platform) => {
                    // Bu platforma ait yorumları ayırıyoruz
                    const filteredReviews = yourPassionReviews.filter(
                        (review) => review.social_platform_id === platform.id
                    );

                    // Eğer o platformda hiç yorum yoksa başlığı göstermeyebiliriz
                    if (filteredReviews.length === 0) return null;

                    return (
                        <div key={platform.id} className="mb-24">
                            {/* Platform Başlığı */}
                            <div className="flex items-center gap-4 mb-10">
                                <h3 className="font-header text-sh text-primary-dark">
                                    {platform.name}
                                </h3>
                                <div className="h-px bg-primary-dark/20 flex-grow" />
                            </div>

                            {/* Yorum Kartları Izgarası */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                {filteredReviews.map((review) => (
                                    <FromYouReviews
                                        key={review.id}
                                        name={review.name}
                                        username={review.username}
                                        image={review.image_url}
                                        review={review.review}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FromYou;