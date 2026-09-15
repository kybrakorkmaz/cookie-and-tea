const HamburgerMenu = ({ onClick, isOpen }) => {
    return (
        <button
            onClick={onClick}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle Menu"
            className="p-2 transition-all rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark"
        >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
            </svg>
        </button>
    );
};

export default HamburgerMenu;