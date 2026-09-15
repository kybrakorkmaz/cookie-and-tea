export const validatePost = (payload) => {
    const { header, content, type, images, videos } = payload;
    const errors = [];

    // 1. Text Validation
    if (!header || header.trim().length === 0) errors.push("Header is required.");
    if (header.length > 200) errors.push("Header too long.");
    if (content.length > 1500) errors.push("Content too long.");

    // 2. Media Logic Validation
    const imgCount = images.length;
    const vidCount = videos.length;

    if (type === "text" && (imgCount > 0 || vidCount > 0)) {
        errors.push("Text posts cannot contain media.");
    }
    if (type === "image" && imgCount === 0) errors.push("Image posts require images.");
    if (type === "video" && vidCount === 0) errors.push("Video posts require videos.");
    if (type === "hybrid" && (imgCount === 0 || vidCount === 0)) {
        errors.push("Hybrid posts require both images and videos.");
    }
    if (imgCount > 10) errors.push("Max 10 images.");
    if (vidCount > 5) errors.push("Max 5 videos.");

    return { isValid: errors.length === 0, errors };
};