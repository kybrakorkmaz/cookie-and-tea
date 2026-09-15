import apiClient from "@/services/apiClient.js";

export const FEED_PAGE_SIZE = 5;

export const feedTimelineQueryKey = (username) => ["feedTimeline", username, "pages"];

export const fetchFeedPage = async (username, offset = 0) => {
    const response = await apiClient.get(`/api/v1/feed/${username}`, {
        params: { limit: FEED_PAGE_SIZE, offset },
    });

    return {
        posts: response.data?.data || [],
        total: response.data?.meta?.total,
        offset,
    };
};

export const feedTimelineInfiniteOptions = (username) => ({
    queryKey: feedTimelineQueryKey(username),
    queryFn: ({ pageParam }) => fetchFeedPage(username, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
        const loaded = allPages.reduce((sum, page) => sum + page.posts.length, 0);
        if (typeof lastPage.total === "number") {
            return loaded < lastPage.total ? loaded : undefined;
        }
        return lastPage.posts.length === FEED_PAGE_SIZE ? loaded : undefined;
    },
    enabled: !!username,
    staleTime: 1000 * 60 * 5,
});

export const prefetchFeedTimeline = (queryClient, username) => {
    if (!username) return Promise.resolve();
    return queryClient.prefetchInfiniteQuery(feedTimelineInfiniteOptions(username));
};
