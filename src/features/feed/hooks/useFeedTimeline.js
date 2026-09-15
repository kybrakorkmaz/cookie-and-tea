import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, updatePost, deletePost } from "./handlePostActions.js";
import { preparePostFormData } from "@/features/posts/postUtils.js";
import { feedTimelineInfiniteOptions, feedTimelineQueryKey } from "./feedTimelineQuery.js";
import { invalidatePostCaches } from "@/features/posts/hooks/invalidatePostCaches.js";

const useFeedTimeline = (username) => {
    const queryClient = useQueryClient();
    const timelineCacheKey = feedTimelineQueryKey(username);

    const timelineQuery = useInfiniteQuery(feedTimelineInfiniteOptions(username));

    const createMutation = useMutation({
        mutationFn: (payload) => {
            if (!username) throw new Error("Unauthorized action dispatch.");
            return createPost(username, payload);
        },
        onSuccess: () => {
            invalidatePostCaches(queryClient, username);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ postId, payload }) => {
            if (!username) throw new Error("Unauthorized modification dispatch.");
            return updatePost(username, postId, payload);
        },
        onSuccess: (serverResponse) => {
            const updatedPostFromServer = serverResponse?.data?.data || serverResponse?.data || serverResponse;

            if (updatedPostFromServer && updatedPostFromServer.id) {
                queryClient.setQueryData(timelineCacheKey, (oldTimelineData) => {
                    if (!oldTimelineData?.pages) return oldTimelineData;
                    return {
                        ...oldTimelineData,
                        pages: oldTimelineData.pages.map((page) => ({
                            ...page,
                            posts: page.posts.map((post) =>
                                post.id === updatedPostFromServer.id
                                    ? { ...post, ...updatedPostFromServer }
                                    : post
                            ),
                        })),
                    };
                });
            }
            invalidatePostCaches(queryClient, username);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (postId) => {
            if (!username) throw new Error("Unauthorized exclusion dispatch.");
            return deletePost(username, postId);
        },
        onSuccess: () => {
            invalidatePostCaches(queryClient, username);
        },
    });

    const feedTimeline = timelineQuery.data?.pages?.flatMap((page) => page.posts) ?? [];

    return {
        feedTimeline,
        loading: timelineQuery.isLoading,
        isRefetching: timelineQuery.isFetching && !timelineQuery.isLoading && !timelineQuery.isFetchingNextPage,
        isPublishing: createMutation.isPending,
        error: timelineQuery.error,
        hasNextPage: Boolean(timelineQuery.hasNextPage),
        isFetchingNextPage: timelineQuery.isFetchingNextPage,
        fetchNextPage: timelineQuery.fetchNextPage,

        handleAddPost: createMutation.mutateAsync,

        handleUpdatePost: async (postId, editPosts, pendingFiles) => {
            const formData = preparePostFormData(editPosts, pendingFiles);
            const result = await updateMutation.mutateAsync({
                postId,
                payload: formData
            });
            return Boolean(result);
        },

        handleDeletePost: async (postId) => {
            return await deleteMutation.mutateAsync(postId);
        },
    };
};

export default useFeedTimeline;
