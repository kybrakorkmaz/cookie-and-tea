import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/services/apiClient.js";

// Single source of truth for follow/unfollow. Callers own their error UX
// (mutateAsync rethrows) — do NOT alert() here.
export const useFollowActions = () => {
    const queryClient = useQueryClient();

    const followMutation = useMutation({
        mutationFn: async ({ username, follow }) => {
            if (follow) {
                const response = await apiClient.post(`/api/v1/profile/${username}/follow`);
                return response.data;
            }
            const response = await apiClient.delete(`/api/v1/profile/${username}/follow`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["actions"] });
            queryClient.invalidateQueries({ queryKey: ["feedTimeline"] });
            queryClient.invalidateQueries({ queryKey: ["people"] });
        },
    });

    return {
        handleFollow: followMutation.mutateAsync,
        isFollowLoading: followMutation.isPending,
    };
};
