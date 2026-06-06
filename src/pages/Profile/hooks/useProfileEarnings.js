import {useEffect, useState} from "react";
import {useParams} from "react-router";
import apiClient from "../../../api/axios.js";
import {TIMELINE_MAPPING} from "../constants/profileConstants.js";

export const useProfileEarnings = (time, earnings) => {
    const {username} = useParams(); // Dynamically captures whatever is in the URL path
    // Maintain a local live state initialized with the parent's first glance data
    const [liveTotal, setLiveTotal] = useState(earnings.total ?? 0);
    const [isLoading, setIsLoading] = useState(false);

    // Handles Timeline Changes and sets earned money according to a selected one
    useEffect(() => {
        if (!username) return;
        // If the user selects the default 30-day timeline, save a network call
        // by instantly rendering the pre-hydrated snapshot data.
        if (time === "Last 30 days") {
            // Restore default total from dashboard layout snapshot cleanly
            setLiveTotal(earnings.total ?? 0);
        }
        const controller = new AbortController();

        const fetchNewEarnedMoney = async () => {
            try {
                setIsLoading(true);
                const daysParam = TIMELINE_MAPPING[time] || "30";
                const response = await apiClient.get(`/api/v1/profile/${username}/earnings`, {
                    params: { earningTimeline: daysParam },
                    signal: controller.signal
                });
                if (response.data && typeof response.data.total !== 'undefined') {
                    setLiveTotal(response.data.total);
                }
            } catch (err) {
                if (err.name !== "CanceledError" && err.code !== "ERR_CANCELED") {
                    console.error("Failed syncing isolated timeline financial metrics:", err.message);
                }
            }finally {
                setIsLoading(false);
            }
        };
        fetchNewEarnedMoney();

        return () => controller.abort();

    }, [time, username]);

    return {
        liveTotal,
        isLoading
    };
}