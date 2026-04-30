import UserNavbar from "../../components/UserNavbar.jsx";
import Panel from "./Panel.jsx";
import Content from "./Content.jsx";
import {useEffect, useState} from "react";
import {followers, following, latestPosts, profile} from "../../constants/index.js";
import UserFooter from "../../components/UserFooter.jsx";

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
    const [userLatestTwoPosts, setUserLatestTwoPosts]= useState([]);
    const [followsUs, setFollowsUs]=useState([]);
    const [weFollow, setWeFollow]=useState([]);
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

        setUserLatestTwoPosts(latestPosts[0].posts || []);
        //Angel's id=1
        setFollowsUs(followers[0].followers);
        setWeFollow(following[0].following);
    }, []);
    return (
        <div className="bg-cream/50 min-h-screen pb-20">
            <UserNavbar />
            {/* Panel Section */}
            <Panel
                name={user.name}
                username={user.username}
                backgroundImage={user.backgroundImage}
                backgroundAlt={user.backgroundAlt}
                profileImage={user.profileImage}
                profileAlt={user.profileAlt}
            />
            {/* Main Content */}
            <Content
                about={user.about}
                socials={user.socials}
                earnings={user.earnings}
                userLatestTwoPosts={userLatestTwoPosts}
                followers={followsUs}
                following={weFollow}
            />
            <UserFooter/>
        </div>
    );
};

export default Profile;