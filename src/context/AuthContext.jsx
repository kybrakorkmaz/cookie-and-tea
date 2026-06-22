// authentication context and provider
import {createContext, useContext, useEffect, useState} from "react";
import apiClient from "../api/axios.js";

const AuthContext = createContext(); // instantiates a new context object
/**
 * @param param0
 * @param param0.children
 * @returns {React.JSX.Element}
 * @constructor
 * Holds the user state and methods to update it (setAuth, setUserData)
 * Passes these values down via AuthContext.Provider
 */
const AuthProvider = ({children}) =>{
    // Synchronously initialize user state using non-sensitive metadata from localStorage
    const [user, setUser] = useState(() =>{
        try{
            const savedUser = localStorage.getItem("cat_user_metadata");
            return savedUser ?  JSON.parse(savedUser) : null;
        }catch (error){
            console.error("Failed to parse user metadata from localStorage:", error);
            return null;
        }
    });
    // Action to handle direct login/logout states
    const setAuth  = (authUser) =>{
        setUser(authUser);
        if(authUser){
            localStorage.setItem("cat_user_metadata", JSON.stringify(authUser));
        }else {
            localStorage.removeItem("cat_user_metadata");
        }
    };

    // Action to update specific profile fields cleanly (merging old state with new data)
    const setUserData = (updatedFields) => {
        setUser((prevUser) =>{
           if(!prevUser) return null;

           const newUserData = {... prevUser, ...updatedFields};
           localStorage.setItem("cat_user_metadata", JSON.stringify(newUserData));
           return newUserData;
        });
    };

    // Silent background verification to sync client state with secure backend cookies
    useEffect(() => {
        // If there is no local tracking data, we can assume the user is a guest
        if(!user) return;

        const verifyActiveSession = async () =>{
            try{
                // Hits your router.get("/me") route. Cookies are sent along automatically.
                const response = await apiClient.get("/api/v1/auth/me");
                if (response.status === 200 && response.data.user){
                    // Sync up state if backend has updated user fields
                    setAuth(response.data.user);
                }
            }catch (err){
                // If the secure HTTP-only cookie expired or is missing, log out silently
                if (err.response?.status === 401 || err.response?.status === 403) {
                    setAuth(null);
                }
            }
        };
        verifyActiveSession();
    }, []);

    return (
        <AuthContext.Provider value={{user, setAuth, setUserData}}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for accessing the AuthContext
export const useAuth = () => useContext(AuthContext);
export default AuthProvider;