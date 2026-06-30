import {useEffect, useMemo, useState} from "react";
import { useParams } from "react-router";

import PostCard from "./PostCard.jsx";
import PageUpButton from "../../components/PageUpButton.jsx";
import LoadMore from "../../components/LoadMore.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import {preparePostFormData} from "../../helpers/postUtils.js";
import {useDeletePost, useFetchProfilePosts, useUpdatePost} from "./hooks/usePostActions.js";
import {usePreviewComments} from "../Hooks/useComments.js";

const Posts = ({ targetPostId, onTargetHandled }) => {
    //  Change to 'username' to perfectly match your frontend router profile segment layout
    const { username } = useParams();
    const { user } = useAuth();

    const [highlightedId, setHighlightedId] = useState(null);
    const [visibleCount, setVisibleCount] = useState(5);
    const [internalTarget, setInternalTarget] = useState(null);

    const { data: allPosts = [], isLoading: loading } = useFetchProfilePosts(username);

    // Fix: Default commentsMap to an empty object to guard against undefined runtime reads
    const { data: commentsMap = {}, isLoading } = usePreviewComments(username);

    const { handleDelete } = useDeletePost(username);
    const { handleUpdate } = useUpdatePost(username);

    const totalPosts = allPosts.length;
    const visiblePosts = allPosts.slice(0, visibleCount);

    // --- Highlighting & Scrolling Logic ---
    useEffect(() => {
        if (targetPostId) {
            setInternalTarget(targetPostId);
            onTargetHandled();
        }
    }, [targetPostId, onTargetHandled]);

    useEffect(() => {
        if (!internalTarget || loading || totalPosts === 0) return;

        const targetIndex = allPosts.findIndex((post) => post.id === internalTarget);
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
    }, [internalTarget, visibleCount, allPosts, loading, totalPosts]);

    if (loading) {
        return (
            <div className="text-center py-20 font-header text-gray-500" data-testid="posts-loading">
                Loading profile posts...
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="flex flex-col gap-10 p-6 md:p-10 max-w-4xl mx-auto">
                {visiblePosts.length > 0 ? (
                    visiblePosts.map((post) => {
                        const isMyOwnPost = user && user.id === post.userId;
                        return (
                            <PostCard
                                key={post.id}
                                post={post}
                                previewComments={commentsMap[post.id] || []}
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
                    <LoadMore onClick={() => setVisibleCount(prev => prev + 5)} />
                )}
            </div>
            <PageUpButton />
        </div>
    );
};

export default Posts;