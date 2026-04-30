import UserNavbar from "../components/UserNavbar.jsx";
import {followers, following} from "../constants/index.js";
import {NavLink} from "react-router";
import {useState} from "react";
import UserFooter from "../components/UserFooter.jsx";

const People = () =>{
    const [authUser, setAuthUser] = useState(false);
    const [headerState, setHeaderState] = useState(true);
    const [followingIds, setFollowingIds] = useState([4]);

    const textStyle = "underline text-primary-dark font-bold";
    const peopleList = [
        { peopleFollowers: followers[0]?.followers || [] },
        { peopleFollowing: following[0]?.following || [] }
    ];
    // todo People API call
    const handleFollow = async (personId) => {
        try {
            setAuthUser(!authUser);
            /*const response = await fetch(`/api/follow/${personId}`, { method: 'POST' });

            if (response.ok) {
                setFollowingIds(prev =>
                    prev.includes(personId)
                        ? prev.filter(id => id !== personId)
                        : [...prev, personId]
                );
            }*/
        } catch (error) {
            console.error("error", error);
        }
    };
    return(
        <div className="min-h-screen bg-cream/50">
            <UserNavbar/>
            <div className="grow w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-10 md:my-20 lg:my-32 gap-6 md:gap-10 flex flex-col">
                <div className="flex w-full h-14 md:h-16 lg:h-20 bg-white border border-primary-dark rounded-xl overflow-x-auto overflow-y-hidden">
                    <div className="flex items-center px-4 md:px-10 gap-6 md:gap-10">
                        <button
                            onClick={() =>{
                                setHeaderState(true);
                            }}
                            className={`whitespace-nowrap transition-all font-header text-sm md:text-base lg:text-sh ${headerState ? textStyle : "text-gray-400"}`}>Followers</button>
                        <button
                            onClick={()=>{
                                setHeaderState(false);
                            }}
                            className={`whitespace-nowrap transition-all font-header text-sm md:text-base lg:text-sh ${!headerState ? textStyle : "text-gray-400"}`}>Following</button>
                    </div>
                </div>
                <div className="flex flex-col h-[60vh] gap-4 bg-white p-4 md:p-8 lg:p-12 rounded-xl border border-primary-dark overflow-y-auto scrollbar">
                    {(headerState ? peopleList[0].peopleFollowers : peopleList[1].peopleFollowing).map(person=>(
                        <div key={person.id} className="w-full flex items-center justify-between p-3 md:p-6 bg-white rounded-xl border border-primary-dark hover:bg-gray-50 transition-colors shrink-0">
                            <NavLink className="flex gap-4 items-center" to={"/user=?/profile"}>
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden shrink-0 border border-cream shadow-sm">
                                    <img className="w-full h-full object-cover" src={person.img} alt={person.name} />
                                </div>
                                <div className="flex flex-col font-paragraph text-xs md:text-base min-w-0">
                                    <span className="font-bold truncate">{person.name}</span>
                                    <span className="text-gray-500 truncate text-[10px] md:text-sm">{person.username}</span>
                                </div>
                            </NavLink>
                            <div>
                                <button
                                    onClick={handleFollow}
                                    className="font-paragraph text-b hover:underline cursor-pointer hover:text-cream">{/*{followingIds.includes(person.id) ? "Unfollow" : "Follow"}*/}{authUser ? "Follow":"Unfollow"}</button>
                            </div>
                        </div>
                    ))}
                    {(headerState ? peopleList[0].peopleFollowers : peopleList[1].peopleFollowing).length === 0 && (
                        <div className="text-center py-20 text-gray-400 font-paragraph">No one found.</div>
                    )}
                </div>
            </div>
            <UserFooter/>
        </div>
    )
}

export default People;