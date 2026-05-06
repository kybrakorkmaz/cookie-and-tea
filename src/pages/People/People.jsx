import UserNavbar from "../../components/UserNavbar.jsx";
import {followers, following} from "../../constants/index.js";
import {useState} from "react";
import UserFooter from "../../components/UserFooter.jsx";
import PersonCard from "./PersonCard.jsx";

const People = () => {
    const [headerState, setHeaderState] = useState(true); // true = Followers, false = Following
    const [followingIds, setFollowingIds] = useState([4]); // Mocking some followed IDs
    const [visibleCount, setVisibleCount] = useState(5);

    const activeTabStyle = "border-b-4 border-primary-dark text-primary-dark font-bold";
    const inactiveTabStyle = "text-gray-400 hover:text-gray-600";

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 5);
    };

    const followerList = followers[0]?.followers || [];
    const followingList = following[0]?.following || [];

    // Correct data based on active tab
    const currentData = headerState ? followerList : followingList;
    const totalCount = currentData.length;
    const visiblePeople = currentData.slice(0, visibleCount);

    const handleFollow = async (personId) => {
        // API logic remains the same
        setFollowingIds(prev =>
            prev.includes(personId)
                ? prev.filter(id => id !== personId)
                : [...prev, personId]
        );
    };

    return (
        <div className="min-h-screen bg-cream/30">
            <UserNavbar />

            <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-8">

                {/* Tab Switcher */}
                <div className="flex bg-white p-2 rounded-2xl shadow-soft border border-gray-100">
                    <button
                        onClick={() => { setHeaderState(true); setVisibleCount(5); }}
                        className={`flex-1 py-4 text-center transition-all font-header tracking-wide ${headerState ? activeTabStyle : inactiveTabStyle}`}
                    >
                        Followers ({followerList.length})
                    </button>
                    <button
                        onClick={() => { setHeaderState(false); setVisibleCount(5); }}
                        className={`flex-1 py-4 text-center transition-all font-header tracking-wide ${!headerState ? activeTabStyle : inactiveTabStyle}`}
                    >
                        Following ({followingList.length})
                    </button>
                </div>

                {/* People Feed */}
                <div className="flex flex-col gap-4">
                    {visiblePeople.map(person => {
                        const personId = person.id || person.following_user_id;
                        return (
                            <PersonCard
                                key={personId}
                                person={person}
                                isFollowing={followingIds.includes(personId)}
                                onFollow={handleFollow}
                            />
                        );
                    })}

                    {visiblePeople.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 font-paragraph">
                            No users found in this list.
                        </div>
                    )}

                    {visibleCount < totalCount && (
                        <button
                            type="button"
                            onClick={handleLoadMore}
                            className="mt-6 mx-auto px-12 py-3 bg-primary-dark text-white rounded-full font-bold hover:shadow-lg transition-all active:scale-95"
                        >
                            Load More
                        </button>
                    )}
                </div>
            </div>

            <UserFooter />
        </div>
    );
};

export default People;