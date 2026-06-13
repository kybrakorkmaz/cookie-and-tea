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
       handleChange,
       handleSubmit
   } = useSignUp();
    return(
        <div className="bg-cream min-h-screen">
            <Navbar textColor="text-primary-dark" bgColor="bg-primary-dark" searchBarColor="bg-white/65" />
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
            <Footer/>
        </div>
    )
}
export default SignUp;