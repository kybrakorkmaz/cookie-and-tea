import UserNavbar from "../../components/nav-footer/UserNavbar.jsx";
import Panel from "./Panel.jsx";
import Intro from "./Intro.jsx";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router";
import {followers, following, posts, profile} from "../../constants/index.js";
import UserFooter from "../../components/nav-footer/UserFooter.jsx";
import Gallery from "./Gallery.jsx";
import Posts from "../Posts/Posts.jsx";

const Profile = () => {
    const [user, setUser] = useState({
        name:"",
        username:"",
        backgroundImage:"",
        backgroundAlt:"",
        profileImage:"",
        profileAlt:"",
        about:"",
        socials:[],
        earnings:{}
    });

    const [userTopDonatedPosts, setUserTopDonatedPosts] = useState([]);

    const [followsUs, setFollowsUs]=useState([]);
    const [weFollow, setWeFollow]=useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const allowedTabs = ["intro", "posts", "gallery"];
    const tabParam = searchParams.get("tab");
    const selected = allowedTabs.includes(tabParam) ? tabParam : "intro";

    const setSelected = (tab) => {
        const newParams = new URLSearchParams(searchParams);
        if (tab === "intro") {
            newParams.delete("tab");
        } else {
            newParams.set("tab", tab);
        }
        setSearchParams(newParams, { replace: true });
    };

    const [targetPostId, setTargetPostId] = useState(null);

    const handleNavigateToPost = (postId) => {
        // 1. Switch tab
        setSelected("posts");
        setTargetPostId(postId);
    };

    // todo API call
    useEffect(() => {
        setUser({
            name: profile[0].name,
            username: profile[0].username,
            backgroundImage: profile[0].backgroundImage,
            backgroundAlt: profile[0].backgroundAlt,
            profileImage: profile[0].profileImage,
            profileAlt: profile[0].profileAlt,
            about: profile[0].about,
            socials: profile[0].socials.filter(social => Boolean(social.url)),
            earnings: profile[0].earnings
        });

        // Angel's id=1
        setFollowsUs(followers[0].followers);
        setWeFollow(following[0].following);

        // todo API call for top posts or handle sorting here
        // Set the posts data. Sorting happens in the child component via useMemo.
        setUserTopDonatedPosts(posts?.[0]?.posts ?? [])

    }, []);
    return (
        <div className="bg-cream/50 min-h-screen pb-20">
            <UserNavbar />
            {/* Panel Section */}
            <div className="m-0 p-0 mb-40">
                <Panel
                    name={user.name}
                    username={user.username}
                    backgroundImage={user.backgroundImage}
                    backgroundAlt={user.backgroundAlt}
                    profileImage={user.profileImage}
                    profileAlt={user.profileAlt}
                    selected={selected}
                    setSelected={setSelected}
                />
                {/* Main Intro */}
                {selected==="gallery" ? <Gallery/>
                    :selected === "posts" ? <Posts targetPostId={targetPostId} onTargetHandled={() => setTargetPostId(null)} />
                        :<Intro
                            about={user.about}
                            socials={user.socials}
                            earnings={user.earnings}
                            userTopDonatedPosts={userTopDonatedPosts}
                            onPostClick={handleNavigateToPost}
                            followers={followsUs}
                            following={weFollow}/>
                }

            </div>
            <UserFooter/>
        </div>
    );
};

export default Profile;