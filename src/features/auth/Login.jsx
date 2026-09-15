import { PrimaryButton } from "@/components/ui/Buttons.jsx";
import { Link, useSearchParams } from "react-router-dom";
import Input from "@/components/ui/Input.jsx"
import Toast from "@/components/ui/Toast.jsx";
import useLogin from "./hooks/useLogin.js";
import Password from "@/components/ui/Password.jsx";

const Login = () => {
    const {
        formData,
        handleSubmit,
        handleChange,
        errors,
        isSubmitting,       // Destructured
        clearServerErrors   // Destructured
    } = useLogin();

    // Landing state after clicking the email verification link
    // (backend redirects here with ?verified=1 or ?verified=0&reason=...)
    const [searchParams, setSearchParams] = useSearchParams();
    const verified = searchParams.get("verified");
    const verifiedReason = searchParams.get("reason");

    // Dismissing the banner also cleans the query params from the URL
    const dismissVerifiedBanner = () => setSearchParams({}, { replace: true });

    return (
        <>

            <main className="grow flex items-center justify-center">
                <div className="w-full max-w-sm mx-auto px-4 my-20">
                    <h2 className="font-header text-h-2 text-center text-primary-dark mb-4">Login</h2>

                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <Input
                            name="identifier"
                            label="Username/Email"
                            value={formData.identifier}
                            onChange={handleChange}
                            placeholder="Username/Email"
                            error={errors.identifier?.[0]}
                            required
                        />
                        <Password
                            type="password"
                            name="password"
                            label="Password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="********"
                            error={errors.password?.[0]}
                            required
                        />
                        <div className="flex flex-col items-center justify-center mt-10">
                            <PrimaryButton
                                type="submit"
                                text={isSubmitting ? "Logging in..." : "Login"} // Feedback text
                                bgColor="bg-primary-dark"
                                textColor="text-white"
                                textPosition="text-center"
                                disabled={isSubmitting} // Disable button when submitting
                            />
                            <p className="font-paragraph text-p pt-5">
                                Don't have an account? Sign up <span className="underline cursor-pointer"><Link to={"/sign-up"}>here.</Link></span>
                            </p>
                        </div>
                    </form>
                </div>
            </main>

            {verified === "1" && (
                <Toast tone="success" onClose={dismissVerifiedBanner}>
                    Your email has been verified successfully! You can now log in.
                </Toast>
            )}
            {verified === "0" && (
                <Toast tone="error" onClose={dismissVerifiedBanner}>
                    {verifiedReason === "invalid-or-expired"
                        ? "This verification link is invalid or has expired. Please sign up again."
                        : "Verification failed. Please try signing up again."}
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

export default Login;