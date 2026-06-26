// Posts.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Core UI Presentational Components
import PostCard from "./PostCard.jsx";
import PageUpButton from "../../components/PageUpButton.jsx";
import LoadMore from "../../components/LoadMore.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import apiClient from "../../api/axios.js";

const Posts = ({ targetPostId, onTargetHandled }) => {
    const { username } = useParams();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const profileCacheKey = ["profilePosts", username];

    const [highlightedId, setHighlightedId] = useState(null);
    const [visibleCount, setVisibleCount] = useState(5);
    const [internalTarget, setInternalTarget] = useState(null);

    // 1. 🎯 READ PIPELINE: Automated Profile Posts Caching
    const { data: allPosts = [], isLoading: loading } = useQuery({
        queryKey: profileCacheKey,
        queryFn: async () => {
            if (!username) return [];
            const response = await apiClient.get(`/api/v1/profile/${username}/posts`);
            if (response.status === 204) return [];
            return response.data?.data ?? [];
        },
        enabled: !!username,
    });

    // 2. 🎯 MUTATION PIPELINE: Delete & Auto-Bust Cache
    const deleteMutation = useMutation({
        mutationFn: async (postId) => {
            await apiClient.delete(`/api/v1/profile/${username}/posts/${postId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: profileCacheKey });
            alert("Post deleted successfully!");
        },
        onError: (err) => {
            console.error(err);
            alert("Failed to delete post.");
        }
    });

    // 3. 🎯 MUTATION PIPELINE: Update & Auto-Bust Cache
    const updateMutation = useMutation({
        mutationFn: async ({ postId, updatedFields }) => {
            await apiClient.put(`/api/v1/profile/${username}/posts/${postId}`, updatedFields);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: profileCacheKey });
            alert("Post updated successfully!");
        },
        onError: (err) => {
            console.error(err);
            alert("Could not save changes.");
        }
    });

    const totalPosts = allPosts.length;
    const visiblePosts = allPosts.slice(0, visibleCount);

    // --- Core Highlighting & Scrolling Logic (Preserved Perfectly) ---
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

    if (loading) return <div className="text-center py-20 font-header text-gray-500">Loading profile posts...</div>;

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
                                highlightedId={highlightedId}
                                isPermitted={isMyOwnPost}
                                onDelete={(id) => deleteMutation.mutate(id)}
                                onUpdate={(id, fields) => updateMutation.mutateAsync({ postId: id, updatedFields: fields })}
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