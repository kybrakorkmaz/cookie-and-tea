import { z } from "zod";

const sendEmailSchema = z.object({
    name: z.string().min(1, "Name is required!"), //
    email: z.email("Invalid email address!"),
    subject: z.string().min(1, "Subject is required!"),
    message: z.string()
        .min(30, "Message is too short! Minimum 30")
        .max(500, "Message is too long!")
});

export default sendEmailSchema;