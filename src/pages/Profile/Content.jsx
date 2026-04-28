import ContentAbout from "./Content/About/ContentAbout.jsx";
import ContentSocials from "./Content/Socials/ContentSocials.jsx";
import ContentEarnings from "./Content/ContentEarnings.jsx";
import ContentLatestPosts from "./Content/ContentLatestPosts.jsx";
import ContentPeople from "./Content/ContentPeople.jsx";

const Content = ({about, socials}) =>{
    //console.log("content component socials:",socials);
    return(
        <div className="flex flex-col lg:flex-row w-5/6 mx-auto gap-28 mt-16">

            {/* LEFT: About, Socials, Earnings */}
            <div className="w-full lg:w-1/2 space-y-8">
                {/* About */}
                <ContentAbout about={about}/>
                {/* Socials */}
                <ContentSocials socials={socials}/>
                {/* Earnings Card with Enhanced Animation */}
                <ContentEarnings/>
            </div>
            {/* RIGHT: Latest Posts & People */}
            <div className="w-full lg:w-1/2 space-y-8">
                {/* Latest Posts*/}
                <ContentLatestPosts/>
                {/* People */}
                <ContentPeople/>
            </div>

        </div>
    )
}

export default Content;