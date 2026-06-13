import Navbar from "../../components/nav-footer/Navbar.jsx";
import {PrimaryButton} from "../../components/Buttons.jsx";
import {Link} from "react-router-dom";
import Input from "../../components/Input.jsx"
import Footer from "../../components/nav-footer/Footer.jsx";
import useLogin from "./hooks/useLogin.js";
import Password from "./components/Password.jsx";

const Login = () =>{
    const {
        formData,
        handleSubmit,
        handleChange,
        errors
    } = useLogin();
    return(
        <div className="bg-cream min-h-screen">
            <Navbar textColor="text-primary-dark" bgColor="bg-primary-dark" searchBarColor="bg-white/65" />
            <div className="max-w-sm mx-auto mt-20 mb-30" >
                <h2 className="font-header text-h-2 text-center text-primary-dark">Login</h2>
                {errors.server && errors.server.length > 0 && (
                    <div className="mt-6 p-3 rounded-lg bg-red-50 border border-primary text-primary text-sm flex flex-col gap-1" role="alert">
                        {errors.server.map((msg, index) => (
                            <p key={index} className="font-paragraph m-0">{msg}</p>
                        ))}
                    </div>
                )}
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
                            text="Login"
                            bgColor="bg-primary-dark"
                            textColor="text-white"
                            textPosition="text-center"
                        />
                        <p className="font-paragraph text-p pt-5">Don't have an account? Sign up <span className="underline cursor-pointer"><Link to={"/sign-up"}>here.</Link></span></p>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default Login;