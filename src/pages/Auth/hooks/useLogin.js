import {useState} from "react";
import {loginSchema} from "../../../validations/userRegisterLoginValidation.js";
import apiClient from "../../../api/axios.js";
import {useNavigate} from "react-router";
import {useAuth} from "../../../context/AuthContext.jsx";

const useLogin = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const [formData, setFormData] = useState({
        identifier:"",
        password:""
    });
    const [errors, setErrors]= useState({});

    const handleChange=(e)=>{
        const {name, value}=e.target;

        setFormData(prev=>({...prev, [name]:value}));
        if(errors[name]) setErrors(prev=>({...prev, [name]:null}));
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();

        const result = loginSchema.safeParse(formData);
        if(!result.success){
            setErrors(result.error.flatten().fieldErrors);
            return;
        }
        const payload = result.data;
        try {
            const response = await apiClient.post("/api/v1/auth/login", payload);

            if(response.status === 200){
                console.log("logged successfully!");
                setAuth(response.data.user);
                setFormData({identifier: "", password: ""});
                setErrors({});
                navigate("/feed");
            }


        } catch (error) {
            // Surface backend rejection responses back to UI states cleanly
            const backendMessage = error.response?.data?.message || "Something went wrong. Please try again.";
            setErrors({ server: [backendMessage] });
            console.error("Login connection failure context:", error.message);
        }
    }

    return{
        formData,
        handleSubmit,
        handleChange,
        errors
    }
}

export default useLogin;