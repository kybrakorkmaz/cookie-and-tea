import apiClient from "@/services/apiClient.js";
import {useAuth} from "@/hooks/useAuth.js";
import {useNavigate} from "react-router-dom";

export const useLogout = () => {
    const { setAuth } = useAuth(); // Grab the global logout clear state function
    const navigate = useNavigate();
    const handleClick = (e) =>{
        // Prevent default link tracking behavior if wrapped in a NavLink
        if (e && e.preventDefault) e.preventDefault();
        const logout = async () =>{
            try{
                const response = await apiClient.post("api/v1/auth/logout");

                // Support any successful 2xx status code block cleanly
                if (response.status >= 200 && response.status < 300) {
                    console.log("Cookie wiped on browser!");

                    // Clear your React app's global state memory
                    setAuth(null);

                    // Kick the user out to a safe public layout route
                    navigate("/login");
                }

            }catch (err){
                console.error("Logout request failed:", err.message);
                // Fallback safety measure: even if network fails, wipe state to protect device privacy
                setAuth(null);
                navigate("/login");
            }
        }

        logout();
    }


    return{
        handleClick
    }
}