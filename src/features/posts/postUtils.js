// Single FormData builder for post updates — used by both the Feed
// (useFeedTimeline) and Profile Posts (Posts.jsx) paths.
//
// Rules (must match the backend update contract):
// - Retained media goes as repeated existingImages/existingVideos fields,
//   persisted URLs only. blob: entries are local previews of NEW files that
//   are already appended as binary below — sending them duplicates media.
// - New uploads go as binary File fields (images/videos).
export const preparePostFormData = (editPost, pendingFiles) => {
    const formData = new FormData();
    formData.append("header", editPost.header);
    formData.append("content", editPost.content ?? "");
    formData.append("type", editPost.type);

    const appendRetained = (field, media) => {
        (media || []).forEach((url) => {
            if (typeof url === "string" && !url.startsWith("blob:")) {
                formData.append(field, url);
            }
        });
    };
    appendRetained("existingImages", editPost.images);
    appendRetained("existingVideos", editPost.videos);

    const appendNew = (field, files) => {
        (files || []).forEach((file) => {
            if (file instanceof File) {
                formData.append(field, file);
            }
        });
    };
    appendNew("images", pendingFiles?.images);
    appendNew("videos", pendingFiles?.videos);

    return formData;
};
