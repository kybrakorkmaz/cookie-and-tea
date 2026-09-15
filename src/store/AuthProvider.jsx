import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import apiClient from "@/services/apiClient.js";
import { AuthContext } from "@/store/auth-context.js";
import { prefetchFeedTimeline } from "@/features/feed/hooks/feedTimelineQuery.js";

const AuthProvider = ({ children }) => {
    const queryClient = useQueryClient();
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem("cat_user_metadata");
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (error) {
            console.error("Failed to parse user metadata from localStorage:", error);
            return null;
        }
    });

    const didVerifySession = useRef(false);

    const setAuth = useCallback((authUser) => {
        if (!authUser) {
            didVerifySession.current = false;
        }
        setUser(authUser);
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

    // Ping /me once per login session. `user` is in the dep list so a later
    // login still verifies, but the ref stops setUserData from retriggering it.
    useEffect(() => {
        if (!user || didVerifySession.current) return;
        didVerifySession.current = true;

        const verifyActiveSession = async () => {
            try {
                const response = await apiClient.get("/api/v1/auth/me");
                if (response.status === 200 && response.data.user) {
                    setUserData(response.data.user);
                }
            } catch (err) {
                if (err.response?.status === 401 || err.response?.status === 403) {
                    setAuth(null);
                }
            }
        };
        verifyActiveSession();
    }, [user, setAuth, setUserData]);

    useEffect(() => {
        if (!user?.username) return;
        prefetchFeedTimeline(queryClient, user.username);
    }, [user?.username, queryClient]);

    const value = useMemo(
        () => ({ user, setAuth, setUserData }),
        [user, setAuth, setUserData]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
