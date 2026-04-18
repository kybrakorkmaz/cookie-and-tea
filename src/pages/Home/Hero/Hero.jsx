import Navbar from "../../../components/Navbar.jsx";
import Banner from "./Banner.jsx";

const Hero = () => {
    return (
        <header id="hero" className="lg:min-h-[58vh] flex flex-col">
            <Navbar />
            <Banner />
        </header>
    );
};

export default Hero;