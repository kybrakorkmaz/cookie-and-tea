import {useState} from "react";
import {loginSchema} from "../../../validations/userRegisterLoginValidation.js";
import apiClient from "../../../api/axios.js";

const useLogin = () => {
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

        console.log("Login attempt for user:", payload.identifier);

        try {
            const response = await apiClient.post("/api/v1/auth/login", payload);
            if(response.status !== 200){
                console.error("cannot login");
            }
            console.log("logged successfully!");

            setFormData({identifier: "", password: ""});
            console.log("Login form cleared.");

        } catch (error) {
            console.error("Login failed:", error.message);
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