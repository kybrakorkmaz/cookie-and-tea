import {Link} from "react-router";

const Logo = ({to = "/"}) => {
    return (
        <Link to={to} className="logo flex items-center font-logo lg:justify-start">
            C<img className="logo-img" src="/images/logo.png" alt="logo" />T
        </Link>
    );
};

export default Logo;