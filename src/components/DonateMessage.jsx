import {GiTwoCoins} from "react-icons/gi";

const DonateMessage = ({ amount, onClose }) => {
    const handleConfirm = () => {
        // todo: api.post('/donate', { amount })
        alert(`Thank you for donating $${amount}!`);
        onClose();
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="donate-dialog-title"
            className="fixed inset-0 z-100 flex items-center justify-center p-4"
            onKeyDown={(e) => e.key === "Escape" && onClose()}
            >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 text-center">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GiTwoCoins className="w-8 h-8 text-amber-600" />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">Support Creator</h3>
                <p className="text-gray-600 mb-8">
                    You are about to donate <span className="font-bold text-primary-dark">${amount}</span> to this post.
                </p>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-3 px-4 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        className="flex-1 py-3 px-4 rounded-xl font-bold bg-primary-dark text-white hover:opacity-90 transition-opacity"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DonateMessage;