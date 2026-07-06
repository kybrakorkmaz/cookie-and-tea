import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../api/axios.js";

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
        },
        onError: (err) => {
            console.error("Follow action failed:", err);
            alert(err.response?.data?.message || "Follow action failed.");
        },
    });

    return {
        handleFollow: followMutation.mutateAsync,
        isFollowLoading: followMutation.isPending,
    };
};
