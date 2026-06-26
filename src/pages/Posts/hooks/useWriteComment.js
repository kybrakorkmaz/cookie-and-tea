import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../api/axios.js";
import { useParams } from "react-router";

const useWriteComment = () => {
    const { username } = useParams();
    const queryClient = useQueryClient();

    const commentMutation = useMutation({
        mutationFn: async ({ postId, comment }) => {
            // Dropped sensitive raw user text logging, tracking only the structural postId metadata
            console.log("Submitting comment payload for post id:", postId);

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