import { useState } from "react";
import Input from "@/components/ui/Input.jsx";
import { PrimaryButton } from "@/components/ui/Buttons.jsx";
import Toast from "@/components/ui/Toast.jsx";
import sendEmailSchema from "@/utils/sendEmailValidation.js";
import emailjs from "@emailjs/browser";
import {ENV} from "@/utils/envValidation.js";

const SendEmail = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [errors, setErrors] = useState({});
    const [messageState, setMessageState] = useState(false);
    const [informUser, setInformUser] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        const result = sendEmailSchema.safeParse(formData);

        if (!result.success) {
            setErrors(result.error.flatten().fieldErrors);
            return;
        }

        try {
            setIsSubmitting(true);
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message
            };

            const response = await emailjs.send(
                ENV.VITE_EMAILJS_SERVICE_ID,
                ENV.VITE_EMAILJS_TEMPLATE_ID,
                templateParams,
                ENV.VITE_EMAILJS_PUBLIC_KEY,
            );

            if (response.status === 200) {
                setFormData({ name: "", email: "", subject: "", message: "" });
                setMessageState(true);
                setInformUser("Message is successfully sent!");
            }
        } catch (err) {
            console.error("Sending message failed", err);
            setMessageState(false);
            setInformUser("Message couldn't be sent!");
        } finally {
            setIsSubmitting(false);
        }
    }

    const closeNotification = () => {
        setInformUser("");
    }

    return (
        <>
            <main className="grow container mx-auto px-4 py-20 md:py-32">
                <div className="max-w-2xl mx-auto">
                    <h2 className="font-header text-h-2 text-primary-dark mb-8">What do you want to say us?</h2>

                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <Input label="Name" name="name" value={formData.name} error={errors.name?.[0]} placeholder="Your Name" onChange={handleChange} />
                        <Input label="Email" name="email" type="email" value={formData.email} error={errors.email?.[0]} placeholder="email@example.com" onChange={handleChange} />
                        <Input label="Subject" name="subject" value={formData.subject} error={errors.subject?.[0]} placeholder="How can we help?" onChange={handleChange} />

                        <div className="flex flex-col gap-2 mt-6">
                            <label htmlFor="message" className="font-header text-sm text-primary-dark ml-1">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="6"
                                value={formData.message}
                                onChange={handleChange}
                                className={`w-full p-4 rounded-lg border bg-white focus:outline-none focus:ring-2 resize-none transition-all
                                           ${errors.message ? "border-red-500 focus:ring-red-200" : "border-primary-dark focus:ring-primary-dark/20"}`}
                                placeholder="Write your thoughts here..."
                            />
                            <div className="flex justify-between items-center px-1">
                                {errors.message ? (
                                    <span className="text-red-500 text-xs font-bold uppercase">{errors.message[0]}</span>
                                ) : (
                                    <span></span>
                                )}
                                <label className={`text-xs font-bold ${formData.message.length > 500 ? 'text-red-500' : 'text-primary-dark/60'}`}>
                                    {formData.message.length}/500
                                </label>
                            </div>
                        </div>

                        {informUser && (
                            <Toast tone={messageState ? "success" : "error"} onClose={closeNotification}>
                                {informUser}
                            </Toast>
                        )}

                        <div className="flex justify-end mt-10">
                            <PrimaryButton
                                type="submit"
                                text={isSubmitting ? "Sending..." : "Send!"}
                                bgColor="bg-primary-dark"
                                textColor="text-white"
                                textPosition="text-center"
                                disabled={isSubmitting} // reactivate the button
                            />
                        </div>
                    </form>
                </div>
            </main>

        </>
    )
}
export default SendEmail;