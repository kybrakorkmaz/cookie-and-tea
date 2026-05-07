import Navbar from "../../components/nav-footer/Navbar.jsx";
import {PrimaryButton} from "../../components/Buttons.jsx";
import {Link} from "react-router";
import {useState} from "react";
import Input from "../../components/Input.jsx";
import {loginSchema} from "../../validations/userRegisterLoginValidation.js";
import Footer from "../../components/nav-footer/Footer.jsx";

const Login = () =>{
    const [formData, setFormData] = useState({
        username:"",
        password:""
    });
    const [errors, setErrors]= useState({});

    const handleChange=(e)=>{
        const {name, value}=e.target;

        setFormData(prev=>({...prev, [name]:value}));
        if(errors[name]) setErrors(prev=>({...prev, [name]:null}));
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();

        const result = loginSchema.safeParse(formData);

        if(!result.success){
            setErrors(result.error.flatten().fieldErrors);
            return;
        }

        const payload = result.data;

        console.log("Login attempt for user:", payload.username);

        try {
            //todo login payload API call
            setFormData({username: "", password: ""});
            console.log("Login form cleared.");

        } catch (error) {
            console.error("Login failed:", error.message);
        }
    }


    return(
        <div className="bg-cream min-h-screen">
            <Navbar textColor="text-primary-dark" bgColor="bg-primary-dark" searchBarColor="bg-white/65" />
            <div className="max-w-sm mx-auto mt-20 mb-30" >
                <h2 className="font-header text-h-2 text-center text-primary-dark">Login</h2>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <Input
                        name="username"
                        label="Username/Email"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username/Email"
                        error={errors.username?.[0]}
                    />
                    <Input
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