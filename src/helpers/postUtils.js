export const preparePostFormData = (editPost, pendingFiles) => {
    const formData = new FormData();
    formData.append("header", editPost.header);
    formData.append("content", editPost.content);
    formData.append("type", editPost.type);
    formData.append("existingImages", JSON.stringify(editPost.images));
    formData.append("existingVideos", JSON.stringify(editPost.videos));

    pendingFiles.images.forEach(file => formData.append("images", file));
    pendingFiles.videos.forEach(file => formData.append("videos", file));

    return formData;
};