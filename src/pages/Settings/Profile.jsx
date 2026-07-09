import { useState, useEffect } from "react";
import Input from "../../components/Input.jsx";
import { PrimaryButton } from "../../components/Buttons.jsx";
import { profileUpdateSchema } from "../../validations/userRegisterLoginValidation.js";
import {useUserSettings} from "./hooks/useUserSettings.js";

const Profile = () => {
    const {
        initialFormData,
        isLoading,
        updateSettings,
        isUpdating
    } = useUserSettings();

    const [formData, setFormData] = useState({
        Username: "",
        Name: "",
        Email: "",
        Password: "",
        Confirm: ""
    });
    const [errors, setErrors] = useState({});

    // Keep state synchronized once TanStack Query successfully resolves the GET request
    useEffect(() => {
        if (initialFormData) {
            setFormData(initialFormData);
        }
    }, [initialFormData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Isolate fields that were actually adjusted by the user
        const patchPayload = {};
        if (formData.Username.trim() !== initialFormData?.Username) patchPayload.username = formData.Username;
        if (formData.Name.trim() !== initialFormData?.Name)         patchPayload.name = formData.Name;
        if (formData.Email.trim() !== initialFormData?.Email)       patchPayload.email = formData.Email;

        if (formData.Password !== "") {
            patchPayload.password = formData.Password;
            patchPayload.confirmPassword = formData.Confirm;
        }

        if (Object.keys(patchPayload).length === 0) {
            alert("No changes detected.");
            return;
        }

        // 2. Evaluate only the fields that actually changed via client side schema
        // (validating untouched fields against this schema would incorrectly block
        // updates whenever an existing value no longer matches the current rules)
        const result = profileUpdateSchema.safeParse({
            username: patchPayload.username,
            name: patchPayload.name,
            email: patchPayload.email,
            password: patchPayload.password,
            passwordConfirm: patchPayload.confirmPassword
        });

        if (!result.success) {
            const formattedErrors = {};
            result.error.issues.forEach(issue => {
                const path = issue.path[0];
                const fieldName = path === "username" ? "Username" :
                    path === "name" ? "Name" :
                        path === "email" ? "Email" :
                            path === "password" ? "Password" :
                                path === "passwordConfirm" ? "Confirm" : path;

                if (!formattedErrors[fieldName]) {
                    formattedErrors[fieldName] = [];
                }
                formattedErrors[fieldName].push(issue.message);
            });
            setErrors(formattedErrors);
            return;
        }

        // 3. Fire mutation via TanStack Query
        try {
            await updateSettings(patchPayload);
            alert("Profile updated successfully!");
            setFormData(prev => ({ ...prev, Password: "", Confirm: "" }));
        } catch (err) {

            console.error("Profile Update Error Details:", err.response?.data);

            alert(err.response?.data?.message || "Failed to update configuration profile settings.");
        }
    };

    if (isLoading) {
        return <p className="text-center text-gray-400 text-sm py-6">Loading profile data...</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col max-w-md mx-auto">
            <Input
                label="Username"
                name="Username"
                value={formData.Username}
                onChange={handleChange}
                error={errors.Username?.[0]}
                placeholder="Username"
            />
            <Input
                label="Name"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                error={errors.Name?.[0]}
                placeholder="Your Name"
            />
            <Input
                label="Email"
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                error={errors.Email?.[0]}
                placeholder="email@example.com"
            />
            <Input
                label="Password"
                type="password"
                name="Password"
                value={formData.Password}
                onChange={handleChange}
                error={errors.Password?.[0]}
                placeholder="********"
            />
            <Input
                label="Confirm Password"
                type="password"
                name="Confirm"
                value={formData.Confirm}
                onChange={handleChange}
                error={errors.Confirm?.[0]}
                placeholder="********"
            />
            <div className="mt-8 flex justify-center">
                <PrimaryButton
                    type="submit"
                    text={isUpdating ? "Saving..." : "Save Changes"}
                    disabled={isUpdating}
                    bgColor="bg-primary-dark"
                    textColor="text-white"
                />
            </div>
        </form>
    );
};

export default Profile;