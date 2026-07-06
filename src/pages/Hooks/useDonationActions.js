import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../api/axios.js";

const DONATION_ROUTES = {
    5: "/api/v1/donate/tip-tea",
    7: "/api/v1/donate/tip-cookie",
    12: "/api/v1/donate/tip-cookie-tea",
};

// Because of Iyzico's banking policy, we never show our own custom "Confirm" dialog for
// a charge - clicking a donation icon directly kicks off the payment using the donator's
// tokenized card, and the response carries Iyzico's own 3D Secure confirmation page
// (htmlContent) which the caller is expected to render (see IyzicoConfirm.jsx).
export const useDonationActions = () => {
    const queryClient = useQueryClient();

    const donationMutation = useMutation({
        mutationFn: async ({ amount, recipientUsername }) => {
            const endpoint = DONATION_ROUTES[Number(amount)];

            if (!endpoint) {
                throw new Error(`Unsupported donation amount: $${amount}`);
            }

            const response = await apiClient.post(endpoint, { recipientUsername });
            return response.data?.data;
        },
    });

    const onDonationConfirmed = (recipientUsername) => {
        queryClient.invalidateQueries({ queryKey: ["feedTimeline"] });
        queryClient.invalidateQueries({ queryKey: ["profilePosts", recipientUsername] });
        queryClient.invalidateQueries({ queryKey: ["donationHistory"] });
        queryClient.invalidateQueries({ queryKey: ["actions"] });
    };

    return {
        initiateDonation: donationMutation.mutateAsync,
        isInitiating: donationMutation.isPending,
        onDonationConfirmed,
    };
};
