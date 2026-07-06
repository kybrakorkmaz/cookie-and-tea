import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../api/axios.js";

const formatActionDate = (isoDate) => {
    if (!isoDate) return "";
    return new Date(isoDate).toLocaleDateString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
};

export const useActions = (scope = "received", limit = 20) => {
    const queryClient = useQueryClient();

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["actions", scope, limit],
        queryFn: async () => {
            const response = await apiClient.get("/api/v1/actions", {
                params: { scope, limit },
            });
            return response.data?.data ?? [];
        },
        // Poll periodically so new notifications (e.g. donations) show up on the
        // bell icon almost immediately, even without a manual page refresh.
        refetchInterval: 15000,
        refetchOnWindowFocus: true,
    });

    const markReadMutation = useMutation({
        mutationFn: async (actionId) => {
            const response = await apiClient.put(`/api/v1/actions/${actionId}/read`);
            return response.data?.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["actions"] });
        },
    });

    // Permanently deletes a notification from the user's view.
    // NOTE: this only removes the notification entry, the underlying transaction
    // (e.g. a donation shown in Settings > Payment history) is preserved.
    const deleteActionMutation = useMutation({
        mutationFn: async (actionId) => {
            const response = await apiClient.delete(`/api/v1/actions/${actionId}`);
            return response.data?.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["actions"] });
        },
    });

    const activities = (data ?? []).map((item) => ({
        id: item.id,
        type: item.type,
        user: scope === "sent" ? "You" : item.actor?.name || "User",
        username: item.actor?.username,
        action: item.action,
        date: formatActionDate(item.createdAt),
        img: item.actor?.profileImage || "/images/default-avatar.jpg",
        status: item.status,
        postId: item.postId,
        amountDollars: item.amountDollars,
    }));

    const unreadCount = (data ?? []).filter((item) => item.status === "unread").length;

    return {
        activities,
        unreadCount,
        isLoading,
        isError,
        refetchActions: refetch,
        markAsRead: markReadMutation.mutate,
        deleteAction: deleteActionMutation.mutate,
    };
};
