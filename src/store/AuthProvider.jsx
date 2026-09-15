import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import apiClient from "@/services/apiClient.js";
import { AuthContext } from "@/store/auth-context.js";
import { prefetchFeedTimeline } from "@/features/feed/hooks/feedTimelineQuery.js";

const readCachedUser = () => {
    try {
        const savedUser = localStorage.getItem("cat_user_metadata");
        return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
        console.error("Failed to parse user metadata from localStorage:", error);
        return null;
    }
};

const AuthProvider = ({ children }) => {
    const queryClient = useQueryClient();
    const [user, setUser] = useState(readCachedUser);
    const [sessionReady, setSessionReady] = useState(() => !readCachedUser());

    const didVerifySession = useRef(false);

    const setAuth = useCallback((authUser) => {
        if (!authUser) {
            didVerifySession.current = false;
        }
        setUser(authUser);
        setSessionReady(true);
        if (authUser) {
            localStorage.setItem("cat_user_metadata", JSON.stringify(authUser));
        } else {
            localStorage.removeItem("cat_user_metadata");
        }
    }, []);

    const setUserData = useCallback((updatedFields) => {
        setUser((prevUser) => {
            if (!prevUser) return null;
            const newUserData = { ...prevUser, ...updatedFields };
            localStorage.setItem("cat_user_metadata", JSON.stringify(newUserData));
            return newUserData;
        });
    }, []);

    // Cached metadata is not treated as authenticated until /me succeeds.
    useEffect(() => {
        if (!user) {
            setSessionReady(true);
            return;
        }
        if (didVerifySession.current) return;
        didVerifySession.current = true;

        const verifyActiveSession = async () => {
            try {
                const response = await apiClient.get("/api/v1/auth/me");
                if (response.status === 200 && response.data.user) {
                    setUserData(response.data.user);
                } else {
                    setAuth(null);
                }
            } catch {
                setAuth(null);
            } finally {
                setSessionReady(true);
            }
        };
        verifyActiveSession();
    }, [user, setAuth, setUserData]);

    useEffect(() => {
        if (!sessionReady || !user?.username) return;
        prefetchFeedTimeline(queryClient, user.username);
    }, [sessionReady, user?.username, queryClient]);

    const value = useMemo(
        () => ({ user, sessionReady, setAuth, setUserData }),
        [user, sessionReady, setAuth, setUserData]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
