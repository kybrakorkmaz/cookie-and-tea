import Navbar from "../../components/nav-footer/Navbar.jsx";
import Input from "../../components/Input.jsx";
import {useState} from "react";
import {PrimaryButton} from "../../components/Buttons.jsx";
import {registerSchema} from "../../validations/userRegisterLoginValidation.js";
import Footer from "../../components/nav-footer/Footer.jsx";
import {Link} from "react-router";


const SignUp = ()=>{
    const [formData, setFormData] = useState({
        name: "",
        username:"",
        email:"",
        password:"",
        passwordConfirm:""
    });
    const [errors, setErrors] = useState({});

    const handleChange=(e)=>{
        const {value, name}= e.target;
        setFormData(prev=>({...prev, [name]:value}));
        if(errors[name]) setErrors(prev=>({...prev, [name]:null}));
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const result = registerSchema.safeParse(formData);

        if(!result.success){
            setErrors(result.error.flatten().fieldErrors);
            return;
        }

        // todo send payload to API call request
        const payload = {
            username: result.data.username,
            password: result.data.password,
            email: result.data.email
        }

        console.log("successfully registered: ", payload.username);
        setFormData({username: "", email: "", password: "",  passwordConfirm:""});
    }
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
                    <Input
                        type="password" // todo eye icon
                        name="password"
                        label="Password"
                        value={formData.password}
                        error={errors.password?.[0]}
                        onChange={handleChange}
                        placeholder="********"
                    />
                    <Input
                        type="password"
                        name="passwordConfirm" // name must be the same as formData name
                        label="Password Confirm"
                        value={formData.passwordConfirm}
                        error={errors.passwordConfirm?.[0]}
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