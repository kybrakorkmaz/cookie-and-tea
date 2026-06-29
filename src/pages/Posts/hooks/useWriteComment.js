import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../api/axios.js";
import { useParams } from "react-router";

const useWriteComment = () => {
    const { username } = useParams();
    const queryClient = useQueryClient();

    const commentMutation = useMutation({
        mutationFn: async ({ postId, comment }) => {
            console.log("Submitting comment payload for post id:", postId);

            const response = await apiClient.post(
                `/api/v1/profile/${username}/posts/${postId}/comment`,
                { comment }
            );
            return response.data;
        },
        onSuccess: (data, variables) => {
            const { postId } = variables;

            // 1. Refresh profile feed/posts query
            queryClient.invalidateQueries({ queryKey: ["profilePosts", username] });

            // 2. Refresh home/timeline feed query if it exists
            queryClient.invalidateQueries({ queryKey: ["feedTimeline", username] });

            // 3. Refresh deep comments list if open
            queryClient.invalidateQueries({ queryKey: ["comments", postId] });

            // 4. THE FIX: Invalidate the preview comment caches so the Feed updates instantly
            queryClient.invalidateQueries({ queryKey: ["preview", "feed", username] });
            queryClient.invalidateQueries({ queryKey: ["preview", "profile", username] });
        }
    });

    return {
        handleWriteComment: commentMutation.mutateAsync,
        isSubmittingComment: commentMutation.isPending
    };
};

export default useWriteComment;