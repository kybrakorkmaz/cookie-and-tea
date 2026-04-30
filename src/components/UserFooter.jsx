import {NavLink} from "react-router";
import {FaXTwitter} from "react-icons/fa6";
import {FaInstagram} from "react-icons/fa";

const UserFooter = () => {
    const date = new Date().getFullYear();

    const linkStyle = "transition-all duration-300 hover:text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary-dark rounded-sm px-1";
    const iconStyle = "w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 transition-transform duration-300 hover:scale-110 hover:text-primary";

    return (
        <>
            <div className="w-full flex flex-wrap items-center justify-between px-8 md:px-10 lg:px-60 pt-10 pb-16 font-paragraph text-p font-medium text-primary-dark gap-4">

                <NavLink to="/send-email" className={linkStyle}>
                    cookie.tea@mail.com
                </NavLink>

                <NavLink to="/about" className={linkStyle}>
                    About
                </NavLink>

                <NavLink to="/faq" className={linkStyle}>
                    FAQ
                </NavLink>

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
                        href="https://x.com/your-profile"
                        aria-label="Follow Cookie and Tea on X"
                        target="_blank"
                        rel="noreferrer"
                        className="focus:outline-none focus:ring-2 focus:ring-primary-dark rounded-full p-1"
                    >
                        <FaXTwitter className={iconStyle} />
                    </a>

                    <a
                        href="https://instagram.com/your-profile"
                        aria-label="Follow Cookie and Tea on Instagram"
                        target="_blank"
                        rel="noreferrer"
                        className="focus:outline-none focus:ring-2 focus:ring-primary-dark rounded-full p-1"
                    >
                        <FaInstagram className={iconStyle} />
                    </a>
                </div>
            </div>

            <div className="flex items-center justify-center text-primary-dark w-full min-h-18">
                <p className="font-paragraph text-sm opacity-80">
                    @cookie and Tea {date}
                </p>
            </div>
        </>
    )
}

export default  UserFooter;