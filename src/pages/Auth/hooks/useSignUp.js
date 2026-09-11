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
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange=(e)=>{
        const {value, name}= e.target;
        setFormData(prev=>({...prev, [name]:value}));
        if(errors[name]) setErrors(prev=>({...prev, [name]:null}));
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        setSuccessMessage("");
        const result = registerSchema.safeParse(formData);

        if(!result.success){
            setErrors(result.error.flatten().fieldErrors);
            return;
        }

        // Safe payload extraction from validated Zod safe data results
        const payload = {
            name: result.data.name,
            username: result.data.username,
            password: result.data.password,
            confirmPassword: result.data.confirmPassword,
            email: result.data.email
        }

       try{
           const response = await apiClient.post("/api/v1/auth/sign-up", payload);
            if (response.status !== 201) {
                setErrors(prev => ({...prev, server: ["Couldn't register, please try again."]}));
                return;
            }
           setSuccessMessage("Account created! We've sent a verification link to your email address. Please check your inbox (and the spam/junk folder just in case) — the link expires in 24 hours. You'll need to verify your account before logging in.");
           // Clean the form
           setFormData({ name: "", username: "", email: "", password: "", confirmPassword: "" });
           setErrors({});
       }catch (err){
           const data = err.response?.data;
           if (data?.errors?.length) {
               // Backend zod validation errors: [{field: "body.email", message: "..."}]
               // Map them onto the same per-field error shape the inputs already read.
               const fieldErrors = {};
               for (const {field, message} of data.errors) {
                   const key = field.replace(/^body\./, "");
                   (fieldErrors[key] ??= []).push(message);
               }
               setErrors(prev => ({...prev, ...fieldErrors}));
           } else {
               // Business errors (e.g. "Username is already taken.") or network failures
               const backendMessage = data?.message || "Something went wrong. Please try again.";
               setErrors(prev => ({...prev, server: [backendMessage]}));
           }
       }
    }

    const clearServerErrors = () => setErrors(prev => ({ ...prev, server: null }));
    const clearSuccessMessage = () => setSuccessMessage("");

    return{
        formData,
        errors,
        successMessage,
        handleChange,
        handleSubmit,
        clearServerErrors,
        clearSuccessMessage
    }
}