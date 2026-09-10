import { useState, useRef } from "react";
import { loginSchema } from "../../../validations/userRegisterLoginValidation.js";
import apiClient from "../../../api/axios.js";
import { useNavigate } from "react-router";
import { useAuth } from "../../../context/AuthContext.jsx";

const useLogin = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const [formData, setFormData] = useState({ identifier: "", password: "" });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // introduce atomic mutable reference tracking
    const submittingRef = useRef(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        //  Atomic guard check reads synchronously from mutable ref
        if (submittingRef.current) return;

        const result = loginSchema.safeParse(formData);
        if (!result.success) {
            setErrors(result.error.flatten().fieldErrors);
            return;
        }

        try {
            // Flip the ref lock instantly before entering async micro-task lines
            submittingRef.current = true;
            setIsSubmitting(true);

            const response = await apiClient.post("/api/v1/auth/login", result.data);

            if (response.status === 200) {
                setAuth(response.data.user);
                setFormData({ identifier: "", password: "" });
                setErrors({});
                navigate(`/feed`);
            }
        } catch (error) {
            const backendMessage = error.response?.data?.message || "Something went wrong. Please try again.";
            setErrors({ server: [backendMessage] });
        } finally {
            // Cleanly reset both the engine reference and UI indicator state
            submittingRef.current = false;
            setIsSubmitting(false);
        }
    };

    const clearServerErrors = () => setErrors(prev => ({ ...prev, server: null }));

    return {
        formData,
        handleSubmit,
        handleChange,
        errors,
        isSubmitting,
        clearServerErrors
    };
};

export default useLogin;