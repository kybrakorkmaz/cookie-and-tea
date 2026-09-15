export const invalidatePostCaches = (queryClient, username) => {
    if (!username) {
        return queryClient.invalidateQueries({ queryKey: ["feedTimeline"] });
    }

    return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["feedTimeline", username] }),
        queryClient.invalidateQueries({ queryKey: ["profilePosts", username] }),
    ]);
};
