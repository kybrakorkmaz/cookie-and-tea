import { useState } from "react";
import PostComment from "./PostComment.jsx";
import {deleteComment, updateComment} from "../../Hooks/useCommentActions.js";

const PostCommenters = ({ postId, commentId, imgSrc, name, date, comment}) => {
    const [currentComment, setCurrentComment] = useState(comment);
    const [isEditing, setIsEditing] = useState(false);
    const [isVisible, setIsVisible] = useState(true); // Local mock for deletion

    const { handleUpdateComment, isUpdatingComment } = updateComment();
    const { handleDeleteComment, isDeletingComment } = deleteComment();

    const handleUpdate = async (updatedText) => {
        try {
            await handleUpdateComment({
                postId,
                commentId,
                comment: updatedText
            });
            setCurrentComment(updatedText);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to apply comment modifications:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await handleDeleteComment({
                postId,
                commentId
            });
            // React Query will instantly drop this from UI during invalidation sync
        } catch (error) {
            console.error("Failed to execute comment removal:", error);
        }
    };

    return (
        <div className="mt-4 p-3 bg-gray-50 rounded-xl border-l-4 border-primary-dark/50 transition-all">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 mb-2">
                    <img
                        src={imgSrc}
                        className="w-6 h-6 rounded-full object-cover"
                        alt="commenter"
                    />
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-800">{name}</span>
                        <span className="text-[10px] text-gray-400">{date}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="text-[11px] text-gray-400 hover:text-gray-900 font-medium transition-colors"
                    >
                        {isEditing ? "Cancel" : "Edit"}
                    </button>
                    <button
                        onClick={handleDelete}
                        className="text-[11px] text-gray-400 hover:text-red-500 font-medium transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {isEditing ? (
                <div className="-mt-4"> {/* Tighten spacing for edit mode */}
                    <PostComment
                        oldComment={currentComment}
                        onSend={() => setIsEditing(false)}
                        update={handleUpdate}
                    />
                </div>
            ) : (
                <p className="text-sm text-gray-600 leading-relaxed pl-1">
                    {currentComment}
                </p>
            )}
        </div>
    );
};

export default PostCommenters;