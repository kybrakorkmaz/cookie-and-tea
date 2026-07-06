import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../api/axios.js";

const formatDonationDate = (isoDate) => {
    if (!isoDate) return "";
    return new Date(isoDate).toLocaleDateString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
};

export const useDonationHistory = () => {
    const { data: donations = [], isLoading, isError, refetch } = useQuery({
        queryKey: ["donationHistory"],
        queryFn: async () => {
            const response = await apiClient.get("/api/v1/donate/history");
            return response.data?.data ?? [];
        },
        select: (rawData) => {
            return rawData.map((donation) => ({
                id: donation.id,
                amount: donation.amountDollars,
                date: formatDonationDate(donation.createdAt),
                status: donation.status,
                from: donation.donator?.name || donation.donator?.username || "Anonymous",
                fromUsername: donation.donator?.username,
            }));
        }
    });

    return {
        donations,
        isLoading,
        isError,
        refetchHistory: refetch,
    };
};
