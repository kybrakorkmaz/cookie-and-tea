import { useQuery } from "@tanstack/react-query";
import apiClient from "@/services/apiClient.js";

export const peopleQueryKey = (username, list) => ["people", username, list];

const fetchPeopleList = async (username, list) => {
    const response = await apiClient.get(`/api/v1/profile/${username}/${list}`);
    return Array.isArray(response.data?.data) ? response.data.data : [];
};

export const usePeopleList = (username, list) => {
    return useQuery({
        queryKey: peopleQueryKey(username, list),
        queryFn: () => fetchPeopleList(username, list),
        enabled: !!username,
        staleTime: 1000 * 30,
    });
};
