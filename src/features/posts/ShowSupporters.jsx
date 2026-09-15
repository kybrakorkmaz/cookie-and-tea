import PostCommenters from "@/features/comments/PostCommenters.jsx";
import PostDonators from "./PostDonators.jsx";
import { useAllComments } from "@/features/comments/hooks/useComments.js";
import { useAllDonations } from "@/features/donations/hooks/useDonations.js";

const ShowSupporters = ({ showDonations = false, showComments = false, postId }) => {
    const { data: commentsMap, isLoading: isLoadingComments } = useAllComments(postId, showComments);
    const { data: donationsMap, isLoading: isLoadingDonations } = useAllDonations(postId, {
        enabled: showDonations,
    });

    const liveComments = commentsMap?.[postId] || [];
    const liveDonations = donationsMap?.[postId] || [];

    if (!showDonations && !showComments) return null;

    return (
        <div className="mt-1 flex flex-col gap-1">
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
