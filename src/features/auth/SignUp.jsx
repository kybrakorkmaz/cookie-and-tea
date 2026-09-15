import Input from "@/components/ui/Input.jsx";
import {PrimaryButton} from "@/components/ui/Buttons.jsx";
import Toast from "@/components/ui/Toast.jsx";
import {Link} from "react-router-dom";
import {useSignUp} from "./hooks/useSignUp.js";
import Password from "@/components/ui/Password.jsx";
const SignUp = ()=>{
   const {
       formData,
       errors,
       successMessage,
       isSubmitting,
       handleChange,
       handleSubmit,
       clearServerErrors,
       clearSuccessMessage
   } = useSignUp();
    return(
        <>
            <div className="max-w-sm mx-auto mt-20 mb-30">
                <h2 className="font-header text-h-2 text-center text-primary-dark">Sign Up</h2>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <Input
                        name="name"
                        label="Name"
                        value={formData.name}
                        error={errors.name?.[0]}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                    <Input
                        name="username"
                        label="Username"
                        value={formData.username}
                        error={errors.username?.[0]}
                        onChange={handleChange}
                        placeholder="Username"
                        required
                    />
                    <Input
                        type="email"
                        name="email"
                        label="Email"
                        value={formData.email}
                        error={errors.email?.[0]}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        required
                    />
                    <Password
                        type="password"
                        name="password"
                        label="Password"
                        value={formData.password}
                        error={errors.password?.[0]}
                        onChange={handleChange}
                        placeholder={"********"}
                        required
                    />
                    <Password
                        type="password"
                        name="confirmPassword" // name must be the same as formData name
                        label="Confirm Password"
                        value={formData.confirmPassword}
                        error={errors.confirmPassword?.[0]}
                        onChange={handleChange}
                        placeholder="********"
                        required
                    />
                    <div className="flex flex-col items-center justify-center mt-10">
                        <PrimaryButton
                            type="submit"
                            text="Create my account!"
                            bgColor="bg-primary-dark"
                            textColor="text-white"
                            textPosition="text-center"
                            disabled={isSubmitting}
                        />
                        <p className="font-paragraph text-p pt-5">Already have an account? Log in <span className="underline cursor-pointer"><Link to={"/login"}>here.</Link></span></p>
                    </div>

                </form>
            </div>

            {successMessage && (
                <Toast tone="success" onClose={clearSuccessMessage}>
                    {successMessage}
                </Toast>
            )}

            {errors.server && errors.server.length > 0 && (
                <Toast tone="error" onClose={clearServerErrors}>
                    {errors.server.map((msg, index) => (
                        <p key={index} className="m-0">{msg}</p>
                    ))}
                </Toast>
            )}

        </>
    )
}
export default SignUp;