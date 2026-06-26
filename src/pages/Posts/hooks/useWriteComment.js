// Hooks/useWriteComment.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../api/axios.js";
import { useParams } from "react-router";
import {useAuth} from "../../../context/AuthContext.jsx";

const useWriteComment = () => {
    const { username } = useParams();
    const queryClient = useQueryClient();

    const commentMutation = useMutation({
        mutationFn: async ({ postId, comment }) => {
            console.log("post id:", postId, "comment:", comment);
            const response = await apiClient.post(
                `/api/v1/profile/${username}/posts/${postId}/comment`,
                { comment }
            );
            return response.data;
        },
        onSuccess: () => {
            // Clear caches holding post metrics or feeds so counters refresh instantly!
            queryClient.invalidateQueries({ queryKey: ["profilePosts", username] });
            queryClient.invalidateQueries({ queryKey: ["feedTimeline", username] });
        }
    });

    return {
        handleWriteComment: commentMutation.mutateAsync,
        isSubmittingComment: commentMutation.isPending
    };
};

export default useWriteComment;