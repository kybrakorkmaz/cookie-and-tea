import Navbar from "../../components/nav-footer/guest/Navbar.jsx";
import { PrimaryButton } from "../../components/Buttons.jsx";
import { Link, useSearchParams } from "react-router-dom";
import Input from "../../components/Input.jsx"
import Footer from "../../components/nav-footer/guest/Footer.jsx";
import useLogin from "./hooks/useLogin.js";
import Password from "./components/Password.jsx";

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
        <div className="bg-cream min-h-screen flex flex-col">
            <Navbar textColor="text-primary-dark" bgColor="bg-primary-dark" searchBarColor="bg-white/65" />

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
                        />
                        <Password
                            type="password"
                            name="password"
                            label="Password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="********"
                            error={errors.password?.[0]}
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

            {/* Verification result banner — Panel-style rectangular card, green for info */}
            {verified === "1" && (
                <div className="fixed bottom-4 right-4 flex items-center gap-3 bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg z-50 max-w-md" role="status">
                    <p className="font-paragraph text-p">Your email has been verified successfully! You can now log in.</p>
                    <button
                        onClick={dismissVerifiedBanner}
                        aria-label="Close notification"
                        className="hover:opacity-75 font-bold border-l border-white/40 pl-3 shrink-0 focus:outline-none cursor-pointer"
                    >
                        ✕
                    </button>
                </div>
            )}
            {verified === "0" && (
                <div className="fixed bottom-4 right-4 flex items-center gap-3 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 max-w-md" role="alert">
                    <p className="font-paragraph text-p">
                        {verifiedReason === "invalid-or-expired"
                            ? "This verification link is invalid or has expired. Please sign up again."
                            : "Verification failed. Please try signing up again."}
                    </p>
                    <button
                        onClick={dismissVerifiedBanner}
                        aria-label="Close notification"
                        className="hover:opacity-75 font-bold border-l border-white/40 pl-3 shrink-0 focus:outline-none cursor-pointer"
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* Floating alert notification toast — same card, red for errors */}
            {errors.server && errors.server.length > 0 && (
                <div className="fixed bottom-4 right-4 flex items-center gap-3 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 max-w-md" role="alert">
                    <div className="font-paragraph text-p flex flex-col gap-0.5">
                        {errors.server.map((msg, index) => (
                            <p key={index} className="m-0">{msg}</p>
                        ))}
                    </div>
                    <button
                        onClick={clearServerErrors}
                        aria-label="Close notification"
                        className="hover:opacity-75 font-bold border-l border-white/40 pl-3 shrink-0 focus:outline-none cursor-pointer"
                    >
                        ✕
                    </button>
                </div>
            )}

            <Footer />
        </div>
    )
}

export default Login;