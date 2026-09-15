import { NavLink } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";

const linkStyle = "transition-all duration-300 hover:text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary-dark rounded-sm px-1";
const iconStyle = "w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 transition-transform duration-300 hover:scale-110 hover:text-primary";

const navClass = ({ isActive }) =>
    `navbar-item ${isActive ? " underline underline-offset-8 decoration-2" : ""} ${linkStyle}`;

const XLogo = ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path
            fill="currentColor"
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.837L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"
        />
    </svg>
);

const SiteFooter = ({ variant = "guest" }) => {
    const isGuest = variant === "guest";
    const date = new Date().getFullYear();

    return (
        <>
            <div
                className={`w-full flex flex-wrap items-center justify-between px-8 md:px-10 lg:px-60 pt-10 pb-16 font-paragraph text-p font-medium text-primary-dark gap-4 ${
                    isGuest ? "bg-cream max-h-60" : ""
                }`}
            >
                <NavLink to="/send-email" className={navClass}>
                    cookie.tea@mail.com
                </NavLink>
                <NavLink to="/about" className={navClass}>
                    About
                </NavLink>
                {!isGuest && (
                    <NavLink to="/faq" className={navClass}>
                        FAQ
                    </NavLink>
                )}
                <a
                    href="https://github.com/kybrakorkmaz/cookie-and-tea"
                    target="_blank"
                    rel="noreferrer"
                    className={linkStyle}
                >
                    Resources
                </a>
                <div className="flex items-center justify-center pt-1 gap-6 md:gap-10">
                    <a
                        href={isGuest ? "https://x.com" : "https://x.com/your-profile"}
                        aria-label="Follow Cookie and Tea on X"
                        target="_blank"
                        rel="noreferrer"
                        className="focus:outline-none focus:ring-2 focus:ring-primary-dark rounded-full p-1"
                    >
                        <XLogo className={iconStyle} />
                    </a>
                    <a
                        href={isGuest ? "https://instagram.com" : "https://instagram.com/your-profile"}
                        aria-label="Follow Cookie and Tea on Instagram"
                        target="_blank"
                        rel="noreferrer"
                        className="focus:outline-none focus:ring-2 focus:ring-primary-dark rounded-full p-1"
                    >
                        <FaInstagram className={iconStyle} />
                    </a>
                </div>
            </div>
            <div
                className={`flex items-center justify-center w-full min-h-18 ${
                    isGuest ? "bg-primary-dark" : "text-primary-dark"
                }`}
            >
                <p className={`font-paragraph text-p ${isGuest ? "text-white" : "opacity-80"}`}>
                    @cookie and Tea {date}
                </p>
            </div>
        </>
    );
};

export default SiteFooter;
