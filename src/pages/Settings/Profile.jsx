import {useState} from "react";
import Input from "../../components/Input.jsx"
import {PrimaryButton} from "../../components/Buttons.jsx";
import {registerSchema} from "../../validations/userRegisterLoginValidation.js";

const Profile =  ()=>{
    const [formData, setFormData]=useState({
        Username:"",
        Name:"",
        Email:"",
        Password:"",
        Confirm:""
    });
    const [errors, setErrors]=useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const result = registerSchema.safeParse({
            username: formData.Username,
            email: formData.Email,
            password: formData.Password,
            passwordConfirm: formData.Confirm
        });

        if (!result.success) {
            const formattedErrors = {};
            result.error.issues.forEach(issue => {
                const path = issue.path[0];
                const fieldName = path === "username" ? "Username" :
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

        // API call would go here
        console.log("Profile update success:", formData);
        alert("Profile updated successfully!");
    };

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
                    text="Save Changes"
                    bgColor="bg-primary-dark"
                    textColor="text-white"
                />
            </div>
        </form>
    );
}
export default Profile;