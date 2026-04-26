import UserNavbar from "../../components/UserNavbar.jsx";

import Panel from "./Panel.jsx";
import Content from "./Content.jsx";
import {useEffect, useState} from "react";
import {profile} from "../../constants/index.js";

const Profile = () => {
    const [user, setUser] = useState({
        name:"",
        username:"",
        backgroundImage:"",
        backgroundAlt:"",
        profileImage:"",
        profileAlt:"",
        about:"",
        socials:[]
    });

    // todo API call
    const renderedValue = ()=>{
        useEffect(() => {
            setUser({
                name: profile[0].name,
                username: profile[0].username,
                backgroundImage: profile[0].backgroundImage,
                backgroundAlt: profile[0].backgroundAlt,
                profileImage: profile[0].profileImage,
                profileAlt: profile[0].profileAlt,
                about: profile[0].about,
                socials : profile[0].socials.filter(social=>{
                    if(social.url)return social;
                }),
            });
        }, []);
    }
    renderedValue();
    //console.log("user:",user);
    //console.log("socials:",user.socials);
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
            <Content about={user.about} socials={user.socials}/>
        </div>
    );
};

export default Profile;