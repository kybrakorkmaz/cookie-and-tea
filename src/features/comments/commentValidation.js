import { z } from "zod";

// Define the configuration constant cleanly at the top
export const MAX_CHARS = 500;

// Export a pure, static Zod schema
export const commentSchema = z
    .string()
    .min(1, "Comment cannot be empty!")
    .max(MAX_CHARS, `Too long! (Max ${MAX_CHARS})`);