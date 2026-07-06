import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../api/axios.js";

export const useIyzicoConnection = () => {
    const queryClient = useQueryClient();

    const {
        data: connectionStatus,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["iyzicoConnection"],
        queryFn: async () => {
            const response = await apiClient.get("/api/v1/donate/connect/status");
            return response.data?.data ?? { connected: false };
        },
    });

    const connectMutation = useMutation({
        // Accept the merchantDetails object here
        mutationFn: async (merchantDetails) => {
            const response = await apiClient.post("/api/v1/donate/connect", merchantDetails);
            return response.data?.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["iyzicoConnection"] });
        },
        onError: (err) => {
            console.error("Failed to connect Iyzico account:", err);
            alert(err.response?.data?.message || "Failed to connect Iyzico account.");
        },
    });

    return {
        isConnected: connectionStatus?.connected ?? false,
        connectionStatus,
        isLoading,
        isError,
        refetchConnection: refetch,
        handleConnectIyzico: connectMutation.mutateAsync, // Switch to mutateAsync to handle promises if needed
        isConnecting: connectMutation.isPending,
    };
};