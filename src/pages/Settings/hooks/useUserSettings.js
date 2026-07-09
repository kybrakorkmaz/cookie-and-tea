import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import apiClient from "../../../api/axios.js";

export const useUserSettings = () => {
    const queryClient = useQueryClient();

    // 1. Fetch current settings profile based purely on the active session
    const { data: initialFormData = null, isLoading, isError } = useQuery({
        queryKey: ["userSettings"],
        queryFn: async () => {
            // No username appended here. The backend relies entirely on req.resolvedUser
            const response = await apiClient.get("/api/v1/settings");
            return response.data?.data;
        },
        select: (rawData) => {
            if (!rawData) return null;
            return {
                Username: rawData.username || "",
                Name: rawData.name || "",
                Email: rawData.email || "",
                Password: "",
                Confirm: "",
            };
        },
    });

    // 2. Patch mutated partial fields for the logged-in user
    const { mutateAsync: updateSettings, isPending: isUpdating, error: updateError } = useMutation({
        mutationFn: async (patchPayload) => {
            const response = await apiClient.patch("/api/v1/settings", patchPayload);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userSettings"] });
        },
    });

    return {
        initialFormData,
        isLoading,
        isError,
        updateSettings,
        isUpdating,
        updateError,
    };
};