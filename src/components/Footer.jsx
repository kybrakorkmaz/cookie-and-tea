import {NavLink} from "react-router";
import {FaXTwitter} from "react-icons/fa6";
import {FaInstagram} from "react-icons/fa";

const Footer=()=>{
    const date = new Date().getFullYear();
    return(
        <>
            <div className="bg-cream w-full max-h-60 flex flex-wrap items-center justify-between px-8 md:px-10 lg:px-60 pt-10 pb-16 font-paragraph text-p font-medium">
                <NavLink to={"/email"}>cookie.tea@mail.com</NavLink>
                <NavLink to={"/about"}>About</NavLink>
                <a href="https://github.com/kybrakorkmaz/cookie-and-tea" target="_blank" rel="noreferrer">
                    Resources
                </a>
                <div className="flex items-center justify-center pt-1 gap-6 md:gap-10">
                    <a href="https://x.com/your-profile" aria-label="Follow Cookie and Tea on X" target="_blank" rel="noreferrer">
                        <FaXTwitter className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                    </a>
                    <a href="https://instagram.com/your-profile" aria-label="Follow Cookie and Tea on Instagram" target="_blank" rel="noreferrer">
                        <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                    </a>
                </div>
            </div>
            <div className="flex items-center justify-center bg-primary-dark w-full min-h-18">
                <p className="font-paragraph text-p text-white">@cookie and Tea {date}</p>
            </div>
        </>
    )
}

export default Footer;