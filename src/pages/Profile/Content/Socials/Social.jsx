import { FaXTwitter, FaSquarePinterest, FaYoutube, FaInstagram } from "react-icons/fa6";

// İkonları bir nesne içinde topluyoruz. Bu sayede switch-case kalabalığından kurtuluruz.
const ICON_MAP = {
    twitter: FaXTwitter,
    instagram: FaInstagram,
    pinterest: FaSquarePinterest,
    youtube: FaYoutube,
};

const Social = ({ accountUrl, socialAccountName }) => {
    // socialAccountName'e karşılık gelen bileşeni seçiyoruz
    // Eğer listede olmayan bir isim gelirse hata vermemesi için fallback (opsiyonel) eklenebilir.
    const IconComponent = ICON_MAP[socialAccountName];

    if (!IconComponent) return null; // İkon bulunamazsa hiçbir şey basma

    return (
        <a
            href={accountUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform inline-block"
        >
            <IconComponent className="w-8 h-8 text-primary-dark" />
        </a>
    );
};

export default Social;