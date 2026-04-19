import Hero from "./Hero/Hero.jsx";
import Slogan from "./SloganAndOffers/Slogan.jsx";
import SloganAndOffers from "./SloganAndOffers/SloganAndOffers.jsx";
import Footer from "../../components/Footer.jsx";

const Home = ()=>{
    return (
        <>
            <Hero/>
            <SloganAndOffers/>
            <Footer/>
        </>
    )
}

export default Home;