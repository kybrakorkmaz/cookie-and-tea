import RoundedImage from "../../components/RoundedImage.jsx";

const FromYouReviews = ({ name, username, accountUrl, image, review }) => {
    return (
        <div className="flex flex-col bg-white rounded-3xl p-8 shadow-sm border border-primary-dark/5">
            <div className="flex items-center gap-4 mb-6">
                <RoundedImage w={"w-14"} h={"h-14"} image={image} alt={name}/>
                <div className="flex flex-col">
                    <span className="text-lg capitalize">{name}</span>
                    <a href={accountUrl} className="text-gray-400 text-sm hover:underline">
                        @{username}
                    </a>
                </div>
            </div>
            <p className="font-paragraph text-gray-700 leading-relaxed whitespace-pre-line">
                {review}
            </p>
        </div>
    );
};

export  default FromYouReviews;