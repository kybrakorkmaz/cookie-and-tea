import PostCommenters from "./structure/PostCommenters.jsx";
import PostDonators from "./PostDonators.jsx";
import { useAllComments } from "../Hooks/useComments.js";
import { useAllDonations } from "../Hooks/useDonations.js";

const ShowSupporters = ({ showDonations = false, showComments = false, postId, userId }) => {
    if (!showDonations && !showComments) return null;

    const { data: commentsMap, isLoading: isLoadingComments } = useAllComments(postId);
    const { data: donationsMap, isLoading: isLoadingDonations } = useAllDonations(postId);

    // Identical data extraction flow for both domains
    const liveComments = commentsMap?.[postId] || [];
    const liveDonations = donationsMap?.[postId] || [];

    return (
        <div className="mt-1 flex flex-col gap-1">
            {/* === COMMENTS TAB VIEW === */}
            {showComments && (
                isLoadingComments ? (
                    <div className="text-xs text-gray-400 italic py-2 pl-1">Loading comments...</div>
                ) : liveComments.length > 0 ? (
                    liveComments.map((comment, index) => (
                        <PostCommenters
                            key={`live-comment-${comment.commentId}-${index}`}
                            postId={postId}
                            commentId={comment.commentId}
                            imgSrc={comment.authorProfileImage}
                            name={comment.authorName}
                            username={comment.authorUsername}
                            comment={comment.comment}
                            date={comment.createdAt}
                        />
                    ))
                ) : (
                    <div className="text-xs text-gray-400 italic py-2 pl-1">No comments yet.</div>
                )
            )}

            {/* === DONATIONS TAB VIEW === */}
            {showDonations && (
                isLoadingDonations ? (
                    <div className="text-xs text-gray-400 italic py-2 pl-1">Loading supporters...</div>
                ) : liveDonations.length > 0 ? (
                    liveDonations.map((donation, index) => (
                        <PostDonators
                            key={`live-donate-${donation.id || index}`}
                            imgSrc={donation.donator?.profileImage}
                            name={donation.donator?.name}
                            username={donation.donator?.username}
                            donatedAmount={donation.amountDollars}
                            date={new Date(donation.createdAt).toLocaleDateString()}
                        />
                    ))
                ) : (
                    <div className="text-xs text-gray-400 italic py-2 pl-1">No donations yet on this post.</div>
                )
            )}
        </div>
    );
};

export default ShowSupporters;