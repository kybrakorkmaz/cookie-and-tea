import {comments, donations, profile} from "../../constants/index.js";
import PostCommenters from "./structure/PostCommenters.jsx";
import PostDonators from "./PostDonators.jsx";

const ShowSupporters = ({showDonations= false, showComments=false, postId, userId})=>{

    if(!showDonations && !showComments) return null;
    let supporters = [];
    if(showComments){
        supporters = comments
            .filter(comment=>comment.commented_to_user_id === userId && comment.commented_to_post_id === postId)
            .map(c=>{
                const person = profile.find(p=>p.user_id===c.commenter_id);
                return {
                    name: person?.name || "Unknown User",
                    username: person?.username || "anonymous",
                    profileImage: person?.profileImage || "/default-avatar.png",
                    comment_id: c.comment_id,
                    commented_date: c.commented_date,
                    comment: c.comment
                };
            })
    }
    else if(showDonations){
        supporters = donations
            .filter(donation=>donation.donated_to_user_id === userId && donation.donated_to_post_id === postId)
            .map(d=>{
                const person = profile.find(p=>p.user_id===d.donator_id);
                return {
                    name: person?.name || "Unknown User",
                    username: person?.username || "anonymous",
                    profileImage: person?.profileImage || "/default-avatar.png",
                    donation_id: d.donation_id,
                    donated_date: d.donated_date,
                    donated_amount:d.donated_amount
                };
            })
    }

    return(
        <>
            {showComments && supporters.map(supporter => (
                <PostCommenters
                    key={supporter.comment_id}
                    name={supporter.name}
                    username={supporter.username}
                    imgSrc={supporter.profileImage}
                    date={supporter.commented_date}
                    comment={supporter.comment}
                />
            ))}
            {showDonations && supporters.map(supporter => (
                <PostDonators
                    key={supporter.donation_id}
                    name={supporter.name}
                    username={supporter.username}
                    imgSrc={supporter.profileImage}
                    date={supporter.donated_date}
                    donatedAmount={supporter.donated_amount}
                />
            ))}
        </>
    )
}

export  default  ShowSupporters;