import Hero from "./Hero/Hero.jsx";
import SloganAndOffers from "./SloganAndOffers/SloganAndOffers.jsx";
import SiteFooter from "@/layouts/nav/SiteFooter.jsx";

const Home = ()=>{
    return (
        <>
            <Hero/>
            <SloganAndOffers/>
            <SiteFooter variant="guest" />
        </>
    )
}

export default Home;