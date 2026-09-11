import Navbar from "../../components/nav-footer/guest/Navbar.jsx";
import Input from "../../components/Input.jsx";
import {PrimaryButton} from "../../components/Buttons.jsx";
import Footer from "../../components/nav-footer/guest/Footer.jsx";
import {Link} from "react-router";
import {useSignUp} from "./hooks/useSignUp.js";
import Password from "./components/Password.jsx";
const SignUp = ()=>{
   const {
       formData,
       errors,
       successMessage,
       handleChange,
       handleSubmit,
       clearServerErrors
   } = useSignUp();
    return(
        <div className="bg-cream min-h-screen">
            <Navbar textColor="text-primary-dark" bgColor="bg-primary-dark" searchBarColor="bg-white/65" />
            <div className="max-w-sm mx-auto mt-20 mb-30">
                <h2 className="font-header text-h-2 text-center text-primary-dark">Sign Up</h2>
                {successMessage && (
                    <div className="my-4 rounded-lg border border-green-600/40 bg-green-50 px-4 py-3 text-green-800 font-paragraph text-p" role="status">
                        {successMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <Input
                        name="name"
                        label="Name"
                        value={formData.name}
                        error={errors.name?.[0]}
                        onChange={handleChange}
                        placeholder="Name"
                    />
                    <Input
                        name="username"
                        label="Username"
                        value={formData.username}
                        error={errors.username?.[0]}
                        onChange={handleChange}
                        placeholder="Username"
                    />
                    <Input
                        type="email"
                        name="email"
                        label="Email"
                        value={formData.email}
                        error={errors.email?.[0]}
                        onChange={handleChange}
                        placeholder="email@example.com"
                    />
                    <Password
                        type="password"
                        name="password"
                        label="Password"
                        value={formData.password}
                        error={errors.password?.[0]}
                        onChange={handleChange}
                        placeholder={"********"}
                    />
                    <Password
                        type="password"
                        name="confirmPassword" // name must be the same as formData name
                        label="Confirm Password"
                        value={formData.confirmPassword}
                        error={errors.confirmPassword?.[0]}
                        onChange={handleChange}
                        placeholder="********"
                    />
                    <div className="flex flex-col items-center justify-center mt-10">
                        <PrimaryButton
                            type="submit"
                            text="Create my account!"
                            bgColor="bg-primary-dark"
                            textColor="text-white"
                            textPosition="text-center"
                        />
                        <p className="font-paragraph text-p pt-5">Already have an account? Log in <span className="underline cursor-pointer"><Link to={"/login"}>here.</Link></span></p>
                    </div>

                </form>
            </div>

            {/* Floating server-error toast — same pattern as the Login page */}
            {errors.server && errors.server.length > 0 && (
                <div className="fixed bottom-4 right-4 flex items-center gap-4 py-3 px-6 rounded-lg text-white shadow-lg bg-red-600 transition-all animate-bounce z-50" role="alert">
                    <div className="font-medium flex flex-col gap-0.5">
                        {errors.server.map((msg, index) => (
                            <p key={index} className="margin-0">{msg}</p>
                        ))}
                    </div>
                    <button
                        onClick={clearServerErrors}
                        aria-label="Close notification"
                        className="hover:opacity-75 font-bold border-l border-white/40 pl-3 focus:outline-none cursor-pointer"
                    >
                        X
                    </button>
                </div>
            )}

            <Footer/>
        </div>
    )
}
export default SignUp;