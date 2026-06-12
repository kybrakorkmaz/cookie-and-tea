import { useState} from "react";
import {registerSchema} from "../../../validations/userRegisterLoginValidation.js";
import apiClient from "../../../api/axios.js";

export const useSignUp = () =>{
    const [formData, setFormData] = useState({
        name: "",
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    });
    const [errors, setErrors] = useState({});

    const handleChange=(e)=>{
        const {value, name}= e.target;
        setFormData(prev=>({...prev, [name]:value}));
        if(errors[name]) setErrors(prev=>({...prev, [name]:null}));
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const result = registerSchema.safeParse(formData);

        if(!result.success){
            setErrors(result.error.flatten().fieldErrors);
            return;
        }

        const payload = {
            name: result.data.name,
            username: result.data.username,
            password: result.data.password,
            email: result.data.email
        }

       try{
            const response = await apiClient.post("api/v1/auth/sign-up", payload);
            if (response.status !== 201) {
                console.log("couldn't register, try again");
                return;
            }
           console.log("successfully registered: ", payload.username);
           // Clean the form
           setFormData({ name: "", username: "", email: "", password: "", confirmPassword: "" });
           setErrors({});
       }catch (err){
           console.error("Registration error:", error.response?.data || error.message);
           // İleride backend'den dönen hataları (örn: email zaten kayıtlı) setErrors'a eşleyebilirsiniz.
       }
    }

    return{
        formData,
        errors,
        handleChange,
        handleSubmit
    }
}