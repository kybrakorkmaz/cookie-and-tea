// authentication context and provider
import {createContext, useContext, useState} from "react";

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

    const [user, setUser] = useState(null);
    const setAuth  = (authUser) =>{
        setUser(authUser);
    };
    const setUserData = (data) => {
        setUser({...data});
    };
    return (
        <AuthContext.Provider value={{user, setAuth, setUserData}}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for accessing the AuthContext
export const useAuth = () => useContext(AuthContext);
export default AuthProvider;