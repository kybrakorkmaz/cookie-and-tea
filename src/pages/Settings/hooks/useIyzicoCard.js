import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../api/axios.js";

// Handles the "donating" side - tokenizing the authenticated user's card via Iyzico
// exactly once. The raw card data is only ever sent to Iyzico's own API; we simply
// forward it through our backend and only persist the returned cardUserKey/cardToken.
export const useIyzicoCard = () => {
    const queryClient = useQueryClient();

    const {
        data: cardStatus,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["iyzicoCard"],
        queryFn: async () => {
            const response = await apiClient.get("/api/v1/donate/card/status");
            return response.data?.data ?? { connected: false };
        },
    });

    const saveCardMutation = useMutation({
        mutationFn: async (card) => {
            const response = await apiClient.post("/api/v1/donate/card", card);
            return response.data?.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["iyzicoCard"] });
        },
    });

    return {
        isCardConnected: cardStatus?.connected ?? false,
        isLoading,
        isError,
        refetchCardStatus: refetch,
        saveCard: saveCardMutation.mutateAsync,
        isSavingCard: saveCardMutation.isPending,
        saveCardError: saveCardMutation.error,
    };
};
