import {Link} from "react-router";

const Logo = ({to = "/"}) => {
    return (
        <Link to={to} id="logo" className="flex items-center font-logo lg:justify-start">
            C<img id="logo-img" src="/images/logo.png" alt="logo" />T
        </Link>
    );
};

export default Logo;