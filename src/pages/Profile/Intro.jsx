import About from "./Intro/About/About.jsx";
import Socials from "./Intro/Socials/Socials.jsx";
import Earnings from "./Intro/Earnings.jsx";
import People from "./Intro/People.jsx";
import MostDonatedPosts from "./Intro/MostDonatedPosts.jsx";

const Intro = ({about, socials, earnings, userTopDonatedPosts,onPostClick, followers}) =>{
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
                <MostDonatedPosts userTopDonatedPosts={userTopDonatedPosts} onPostClick={onPostClick}/>
                {/* People */}
                <People followers={followers}/>
            </div>

        </div>
    )
}

export default Intro;