import {z} from "zod";
/** @type {import("zod").ZodSchema} */
export const registerSchema = z.object({
        name: z.string()
        .min(1, "Name cannot be empty"),
        username: z.string()
            .min(5, "Username must be at least 5 characters!")
            .max(255, "This is too long"),
        email: z.email("Invalid email address!"),
        password: z.string().min(8,"password must be at least 8 characters!"),
        confirmPassword: z.string()
}).refine(
    (data)=> data.password === data.confirmPassword,
    {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    }
);

export const profileUpdateSchema = z.object({
    username: z.string()
        .min(5, "Username must be at least 5 characters!")
        .max(255, "This is too long"),
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address!"),
    password: z.string().min(8, "password must be at least 8 characters!").optional().or(z.literal('')),
    passwordConfirm: z.string().optional().or(z.literal('')),
}).refine(
    (data) => {
        const targetConfirm = data.confirmPassword || data.passwordConfirm;
        if (data.password && data.password !== targetConfirm) {
            return false;
        }
        return true;
    },
    {
        message: "Passwords do not match",
        path: ["passwordConfirm"],
    }
);

export const loginSchema = z.object({
    //username or email login
    identifier: z.string()
        .trim()
        .min(3, "Identifier must be at least 3 characters long"),
    password: z.string().min(8, "password must be at least 8 characters")
});
