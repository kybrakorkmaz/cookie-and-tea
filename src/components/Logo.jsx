import {Link} from "react-router";

const Logo = () => {
    return (
        <Link to="/" id="logo" className="flex items-center font-logo">
            C<img id="logo-img" src="/images/logo.png" alt="logo" />T
        </Link>
    );
};

export default Logo;