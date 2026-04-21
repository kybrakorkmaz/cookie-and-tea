const FromYouReviews = ({ name, username, accountUrl, image, review }) => {
    return (
        <div className="flex flex-col bg-white rounded-3xl p-8 shadow-sm border border-primary-dark/5">
            <div className="flex items-center gap-4 mb-6">
                {/* Daire içine alınmış profil resmi */}
                <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border border-gray-100">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover object-top"
                    />
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-lg capitalize">{name}</span>
                    <a href={accountUrl} className="text-primary text-sm hover:underline">
                        @{username}
                    </a>
                </div>
            </div>

            {/* \n karakterlerini tanıyan metin alanı */}
            <p className="font-paragraph text-gray-700 leading-relaxed whitespace-pre-line">
                {review}
            </p>
        </div>
    );
};

export  default FromYouReviews;