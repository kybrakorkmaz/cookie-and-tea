import { useState } from "react";
import { useParams } from "react-router-dom";
import PersonCard from "./PersonCard.jsx";
import PageUpButton from "@/components/ui/PageUpButton.jsx";
import LoadMore from "@/components/ui/LoadMore.jsx";
import { useAuth } from "@/hooks/useAuth.js";
import { useFollowActions } from "./hooks/useFollowActions.js";
import { usePeopleList } from "./hooks/usePeopleList.js";

const People = () => {
    const { username: routeUsername } = useParams();
    const { user } = useAuth();
    const targetUsername = routeUsername || user?.username;

    const [showFollowers, setShowFollowers] = useState(true);
    const [visibleCount, setVisibleCount] = useState(5);
    const { handleFollow, isFollowLoading } = useFollowActions();

    const followersQuery = usePeopleList(targetUsername, "followers");
    const followingQuery = usePeopleList(targetUsername, "following");

    const activeTabStyle = "border-b-4 border-primary-dark text-primary-dark font-bold";
    const inactiveTabStyle = "text-gray-400 hover:text-gray-600";

    const followerList = followersQuery.data ?? [];
    const followingList = followingQuery.data ?? [];
    const currentData = showFollowers ? followerList : followingList;
    const isLoading = showFollowers ? followersQuery.isLoading : followingQuery.isLoading;
    const isError = showFollowers ? followersQuery.isError : followingQuery.isError;
    const visiblePeople = currentData.slice(0, visibleCount);

    const switchTab = (followersTab) => {
        setShowFollowers(followersTab);
        setVisibleCount(5);
    };

    const onFollowToggle = async (person) => {
        if (!person?.username || person.id === user?.id) return;
        try {
            await handleFollow({ username: person.username, follow: !person.isFollowing });
        } catch (err) {
            alert(err.response?.data?.message || "Couldn't update follow status.");
        }
    };

    return (
        <>
            <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-8">
                <div className="flex bg-white p-2 rounded-2xl shadow-soft border border-gray-100">
                    <button
                        onClick={() => switchTab(true)}
                        className={`flex-1 py-4 text-center transition-all font-header tracking-wide ${showFollowers ? activeTabStyle : inactiveTabStyle}`}
                    >
                        Followers ({followerList.length})
                    </button>
                    <button
                        onClick={() => switchTab(false)}
                        className={`flex-1 py-4 text-center transition-all font-header tracking-wide ${!showFollowers ? activeTabStyle : inactiveTabStyle}`}
                    >
                        Following ({followingList.length})
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    {isLoading ? (
                        <div className="text-center py-20 text-gray-400 font-paragraph">
                            Loading connections...
                        </div>
                    ) : isError ? (
                        <div className="text-center py-20 text-red-500 font-paragraph">
                            Couldn't load this list. Please try again.
                        </div>
                    ) : visiblePeople.length > 0 ? (
                        visiblePeople.map((person) => (
                            <PersonCard
                                key={person.id}
                                person={person}
                                isFollowing={Boolean(person.isFollowing)}
                                isSelf={person.id === user?.id}
                                disabled={isFollowLoading}
                                onFollow={onFollowToggle}
                            />
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 font-paragraph">
                            No users found in this list.
                        </div>
                    )}

                    {visibleCount < currentData.length && (
                        <div className="mt-6 flex justify-center">
                            <LoadMore onClick={() => setVisibleCount((prev) => prev + 5)} />
                        </div>
                    )}
                </div>
            </div>
            <PageUpButton />
        </>
    );
};

export default People;
