import { DONATE_ICON } from "../../../constants/index.js";
import Donation from "../../../components/Donation.jsx";
import { FaMessage } from "react-icons/fa6";
import { GiTwoCoins } from "react-icons/gi";

const InteractionBar = ({commentCount, donationAmount, activeType, setActiveType, setDonateAmount }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2 pt-4 border-t border-gray-50">
            {/* Donation Options */}
            <div className="flex gap-2.5 bg-gray-50/80 p-1.5 rounded-full border border-gray-100 backdrop-blur-sm">
                {Object.entries(DONATE_ICON).map(([key, iconPath]) => (
                    <Donation
                        key={key}
                        amount={key.split("_")[1]}
                        icon={iconPath}
                        onOpenDonate={setDonateAmount} // Uses prop from parent
                    />
                ))}
            </div>

            <div className="flex items-center gap-5">
                {/* Comment Toggle */}
                <button
                    onClick={() => setActiveType(prev => prev === 'comments' ? null : 'comments')}
                    aria-pressed={activeType === 'comments'}
                    className={`group flex items-center gap-1.5 transition-all duration-200 ${
                        activeType === 'comments' ? 'text-primary-dark' : 'text-gray-400 hover:text-primary-dark'
                    }`}
                >
                    <div className={`p-2 rounded-full transition-colors ${
                        activeType === 'comments' ? 'bg-primary-dark/10' : 'group-hover:bg-gray-100'
                    }`}>
                        <FaMessage className="w-4 h-4"/>
                    </div>
                    <span className="text-sm font-bold">{commentCount ?? 0}</span>
                </button>

                {/* Donation Toggle */}
                <button
                    onClick={() => setActiveType(prev => prev === 'donations' ? null : 'donations')}
                    aria-pressed={activeType === 'donations'}
                    className={`group flex items-center gap-1.5 transition-all duration-200 ${
                        activeType === 'donations' ? 'text-amber-600' : 'text-gray-400 hover:text-amber-500'
                    }`}
                >
                    <div className={`p-2 rounded-full transition-colors ${
                        activeType === 'donations' ? 'bg-amber-50' : 'group-hover:bg-gray-100'
                    }`}>
                        <GiTwoCoins className="w-5 h-5 text-current"/>
                    </div>
                    <span className="text-sm font-bold">${donationAmount ?? 0}</span>
                </button>
            </div>
        </div>
    );
};

export default InteractionBar;