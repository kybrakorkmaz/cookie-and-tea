import {z} from "zod";
/** @type {import("zod").ZodSchema} */
export const registerSchema = z.object({
        username: z.string()
            .min(5, "Username must be at least 5 characters!")
            .max(255, "This is too long"),
        email: z.email("Invalid email address!"),
        password: z.string().min(8,"password must be at least 8 characters!"),
        passwordConfirm: z.string()
}).refine(
    (data)=> data.password === data.passwordConfirm,
    {
        message: "Passwords do not match",
        path: ["passwordConfirm"],
    }
);
export const loginSchema = z.object({
    //username or email login
    username:z.union([
        z.email("Invalid email address"),
        z.string().min(5, "Username must be at least 5 characters!")
    ]),
    password: z.string().min(1, "Password is required")
});