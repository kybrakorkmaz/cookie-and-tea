import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Input from "../components/Input.jsx";
import { PrimaryButton } from "../components/Buttons.jsx";
import Footer from "../components/Footer.jsx";
import sendEmailSchema from "../validations/sendEmailValidation.jsx";
import {z} from "zod";
const SendEmail = () => {
    const [formData, setFormData]=useState({
        name:"",
        email:"",
        subject:"",
        message:""
    });
    const [errors, setErrors]=useState({});

    const handleSubmit=(e)=>{
        e.preventDefault();

        const result = sendEmailSchema.safeParse(formData);

        if(!result.success){
            // result.error.flatten() creates a clean object: { fieldName: [messages] }
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors(fieldErrors);
            return;
        }
        // If valid, result.data contains the clean, parsed object
        console.log("Form submitted successfully:", result.data);
        setErrors({});
        // todo send email
    }

    const handleChange=(e)=>{
        const {name, value}= e.target;
        setFormData(prev=>({...prev, [name]:value}));
    }

    return (
        <div className="bg-cream min-h-screen flex flex-col">
            <Navbar textColor="text-primary-dark" bgColor="bg-primary-dark" searchBarColor="bg-white/65" />

            {/* Main Content: flex-grow ile Footer'ı en alta iteriz */}
            <main className="flex-grow container mx-auto px-4 py-20 md:py-32">
                <div className="max-w-2xl mx-auto">
                    <h2 className="font-header text-h-2 text-primary-dark mb-8">What do you want to say us?</h2>

                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <Input
                            label="Name"
                            name="name"
                            placeholder="Your Name"
                            onChange={handleChange}
                        />
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="email@example.com"
                            onChange={handleChange}
                        />
                        <Input
                            label="Subject"
                            name="subject"
                            placeholder="How can we help?"
                            onChange={handleChange}
                        />

                        {/* Message Box */}
                        <div className="flex flex-col gap-2 mt-6">
                            <label className="font-header text-sm text-primary-dark ml-1">Message</label>
                            <textarea
                                name="message"
                                rows="6"
                                onChange={handleChange}
                                className="w-full p-4 rounded-lg border border-primary-dark bg-white
                                           placeholder-primary/50 focus:outline-none focus:ring-2
                                           focus:ring-primary-dark/20 resize-none"
                                placeholder="Write your thoughts here..."
                            ></textarea>
                        </div>

                        {/* Button Alignment */}
                        <div className="flex justify-end mt-10">
                            <PrimaryButton
                                type="submit"
                                text="Send!"
                                bgColor="bg-primary-dark"
                                textColor="text-white"
                                textPosition={"text-center"}
                            />
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default SendEmail;