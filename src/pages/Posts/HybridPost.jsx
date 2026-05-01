import VideoPost from "./VideoPost";
import ImagePost from "./ImagePost";

const HybridPost = ({ videos = [], images = [] }) => {
    const videosArray = Array.isArray(videos) ? videos : [videos];

    return (
        <div className="flex flex-col gap-6">
            {/* Videolar: Çoklu video varsa alt alta sıralanır */}
            <div className="flex flex-col gap-4">
                {videosArray.map((v, i) => (
                    <VideoPost key={i} video={v} />
                ))}
            </div>

            {/* Resimler: ImagePost bileşenini tekrar kullanarak tutarlılık sağlıyoruz */}
            {images.length > 0 && <ImagePost images={images} />}
        </div>
    );
};

export default HybridPost;