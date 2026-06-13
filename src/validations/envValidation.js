import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z
        .enum(["development", "production", "test"])
        .default("development"),
    VITE_API_BASE_URL: z
        .url("Invalid API Base URL configuration")
        .default("http://localhost:8001"),
    VITE_EMAILJS_SERVICE_ID: z.string().min(1, "EMAILJS SERVICE KEY EMPTY"),
    VITE_EMAILJS_PUBLIC_KEY: z.string().min(1, "EMAILJS PUBLIC KEY EMPTY"),
    VITE_EMAILJS_TEMPLATE_ID: z.string().min(1, "EMAILJS TEMPLATE ID EMPTY!"),
});

// Safely cross-examine environment scopes
// Checks if Vite's import context is active; otherwise, extracts keys straight from Node.js process state.
const platformRawEnv = typeof import.meta !== "undefined" && import.meta.env
    ? import.meta.env
    : process.env;

const parsed = envSchema.safeParse(platformRawEnv);

if (!parsed.success) {
    console.error("Environment Verification Failed! Invalid flags detected: ", parsed.error.flatten().fieldErrors);
    throw new Error("Application runtime execution blocked due to invalid environment configurations.");
}

export const ENV = parsed.data;