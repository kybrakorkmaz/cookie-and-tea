import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import PostCard from "./PostCard.jsx";
import PageUpButton from "@/components/ui/PageUpButton.jsx";
import LoadMore from "@/components/ui/LoadMore.jsx";
import { useAuth } from "@/hooks/useAuth.js";
import {preparePostFormData} from "@/features/posts/postUtils.js";
import {useDeletePost, useFetchProfilePosts, useUpdatePost} from "./hooks/usePostActions.js";

const Posts = ({ targetPostId, onTargetHandled }) => {
    const { username } = useParams();
    const { user } = useAuth();

    const [highlightedId, setHighlightedId] = useState(null);
    const [visibleCount, setVisibleCount] = useState(5);
    const [internalTarget, setInternalTarget] = useState(null);

    //  Destructure isError state to prevent falling back to empty profile view on failures
    const {
        data: allPosts = [],
        isLoading: loading,
        isError: postsError
    } = useFetchProfilePosts(username);

    const { handleDelete } = useDeletePost(username);
    const { handleUpdate } = useUpdatePost(username);

    const posts = Array.isArray(allPosts) ? allPosts : [];
    const totalPosts = posts.length;
    const visiblePosts = posts.slice(0, visibleCount);

    // --- Highlighting & Scrolling Logic ---
    useEffect(() => {
        if (targetPostId) {
            setInternalTarget(targetPostId);
            onTargetHandled();
        }
    }, [targetPostId, onTargetHandled]);

    useEffect(() => {
        if (!internalTarget || loading || totalPosts === 0) return;

        const targetIndex = posts.findIndex((post) => post.id === internalTarget);
        if (targetIndex === -1) {
            setInternalTarget(null);
            return;
        }

        if (targetIndex >= visibleCount) {
            setVisibleCount(targetIndex + 1);
            return;
        }

        const targetId = `post-${internalTarget}`;
        setHighlightedId(targetId);

        const timer = setTimeout(() => {
            const el = document.getElementById(targetId);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 150);

        const highlightTimer = setTimeout(() => {
            setHighlightedId(null);
            setInternalTarget(null);
        }, 2000);

        return () => {
            clearTimeout(timer);
            clearTimeout(highlightTimer);
        };
    }, [internalTarget, visibleCount, posts, loading, totalPosts]);

    if (loading) {
        return (
            <div className="text-center py-20 font-header text-gray-500" data-testid="posts-loading">
                Loading profile posts...
            </div>
        );
    }

    // Render isolated explicit error fallback
    if (postsError) {
        return (
            <div className="text-center py-20 font-header text-red-500" data-testid="posts-error">
                Failed to load profile posts. Please check your connection or try again later.
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col gap-10 p-6 md:p-10 max-w-4xl mx-auto">
                {visiblePosts.length > 0 ? (
                    visiblePosts.map((post) => {
                        const isMyOwnPost = user && user.id === post.userId;
                        return (
                            <PostCard
                                key={post.id}
                                post={post}
                                previewComments={post.previewComments || []}
                                highlightedId={highlightedId}
                                isPermitted={isMyOwnPost}
                                onDelete={handleDelete}
                                onUpdate={(id, editPost, pendingFiles) => {
                                    const formData = preparePostFormData(editPost, pendingFiles);
                                    return handleUpdate({ postId: id, formData });
                                }}
                            />
                        );
                    })
                ) : (
                    <div className="text-center py-20 text-gray-400 font-paragraph">
                        No posts published yet.
                    </div>
                )}
                {visibleCount < totalPosts && (
                    <LoadMore onClick={() => setVisibleCount((prev) => prev + 5)} />
                )}
            </div>
            <PageUpButton />
        </>
    );
};

export default Posts;
