import {z} from "zod";

const envSchema = z.object({
    VITE_EMAILJS_SERVICE_ID: z.string().min(1, "EMAILJS SERVICE KEY EMPTY"),
    VITE_EMAILJS_PUBLIC_KEY: z.string().min(1, "EMAILJS PUBLIC KEY EMPTY"),
    VITE_EMAILJS_TEMPLATE_ID: z.string().min(1, "EMAILJS TEMPLATE ID EMPTY!"),
    MODE: z.enum(["development", "production", "test"]).default("development"),
});

const parsed = envSchema.safeParse(import.meta.env);

if(!parsed.success){
    console.error("Invalid env variables: ", parsed.error.flatten().fieldErrors);
    throw new Error("Application could not start");
}

export const ENV = parsed.data;