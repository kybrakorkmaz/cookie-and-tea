
const Donation = ({ amount, icon, alt, onOpenDonate }) => {
    return (
        <button
            type="button"
            onClick={() => onOpenDonate?.(amount)}
            className="hover:scale-110 transition-transform duration-200"
            title={`Donate $${amount}`}
        >
            <img src={icon} alt={alt} className="w-8 h-8 object-contain" />
        </button>
    );
};

export default Donation;