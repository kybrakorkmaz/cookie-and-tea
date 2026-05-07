// Activity from followed users (Others)
import {comments, donations, following, profile} from "../constants/index.js";

export const followedActivities = (followedIds) =>([
    ...comments.filter(c => followedIds.includes(c.commenter_id)).map(c => ({
        id: `c-${c.comment_id}`,
        user: profile.find(u => u.user_id === c.commenter_id)?.name || "User",
        action: "commented",
        date: c.commented_date,
        img: profile.find(u => u.user_id === c.commenter_id)?.profileImage
    })),
    ...donations.filter(d => followedIds.includes(d.donator_id)).map(d => ({
        id: `d-${d.donation_id}`,
        user: profile.find(u => u.user_id === d.donator_id)?.name || "User",
        action: `donated $${d.donated_amount}`,
        date: d.donated_date,
        img: profile.find(u => u.user_id === d.donator_id)?.profileImage
    }))
]);
// Activity from account owner
export const accountOwnerActivities=(currentUserId, image)=>([
        ...comments.filter(c => c.commenter_id === currentUserId).map(c => ({
            id: `yc-${c.comment_id}`,
            user: "You",
            action: "commented",
            date: c.commented_date,
            img: image
        })),
        ...donations.filter(d => d.donator_id === currentUserId).map(d => ({
            id: `yd-${d.donation_id}`,
            user: "You",
            action: `donated $${d.donated_amount}`,
            date: d.donated_date,
            img: image
        }))
]);

export const getSortedActivities = (currentUserId = 1, image = "/images/people/angel.jpg") => {
    const followedIds = following.find(u => u.user_id === currentUserId)?.following?.map(f => f.following_user_id) ?? [];
    const followed = followedActivities(followedIds);
    const owner = accountOwnerActivities(currentUserId, image);

    return [...followed, ...owner]
        .sort((a, b) => {
            const dateA = new Date(a.date.split('/').reverse().join('-'));
            const dateB = new Date(b.date.split('/').reverse().join('-'));
            return dateB - dateA;
        })
        .slice(0, 5);
}
