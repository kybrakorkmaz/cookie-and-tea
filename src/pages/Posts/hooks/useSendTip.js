import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../api/axios.js";

export const useSendTip = () => {
    const queryClient = useQueryClient();

    const getEndpointByAmount = (amount) => {
        const amt = Number(amount);
        if (amt === 5) return "/api/v1/donate/tip-tea";
        if (amt === 7) return "/api/v1/donate/tip-cookie";
        if (amt === 12) return "/api/v1/donate/tip-cookie-tea";

        // Throw an explicit exception instead of routing to the wrong product endpoint
        throw new Error(`Unsupported donation amount: $${amount}`);
    };

    return useMutation({
        mutationFn: async ({ recipientUsername, amount, postId }) => {
            const endpoint = getEndpointByAmount(amount);
            const response = await apiClient.post(endpoint, { recipientUsername, postId });
            return response.data?.data;
        },
        onSuccess: () => {
            // Bağış başarılı olduğunda sayfadaki sayaçların anında güncellenmesi için
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["donationHistory"] });
            // Donator's own "sent" activity feed (if viewed) should also reflect the new donation
            queryClient.invalidateQueries({ queryKey: ["actions"] });
        }
    });
};