import About from "./Content/About/About.jsx";
import Socials from "./Content/Socials/Socials.jsx";
import Earnings from "./Content/Earnings.jsx";
import LatestTwoPosts from "./Content/LatestTwoPosts.jsx";
import People from "./Content/People.jsx";

const Intro = ({about, socials, earnings, userLatestTwoPosts, followers, following}) =>{
    //console.log("content component socials:",socials);
    return(
        <div className="flex flex-col lg:flex-row w-5/6 mx-auto gap-28 mt-16">

            {/* LEFT: About, Socials, Earnings */}
            <div className="w-full lg:w-1/2 space-y-8">
                {/* About */}
                <About about={about}/>
                {/* Socials */}
                <Socials socials={socials}/>
                {/* Earnings Card with Enhanced Animation */}
                <Earnings earnings={earnings}/>
            </div>
            {/* RIGHT: Latest Posts & People */}
            <div className="w-full lg:w-1/2 space-y-8">
                {/* Latest Posts*/}
                <LatestTwoPosts userLatestTwoPosts={userLatestTwoPosts}/>
                {/* People */}
                <People followers={followers} following={following}/>
            </div>

        </div>
    )
}

export default Intro;