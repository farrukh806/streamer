import { z } from "zod";

// Signup validation schema matching backend requirements
export const signupSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(3, "Full name must be at least 3 characters long")
        .max(100, "Full name must be at most 100 characters long"),
    email: z.email("Invalid email address"),
    password: z
        .string()
        .min(4, "Password must be at least 4 characters long")
        .max(100, "Password must be at most 100 characters long"),
    profilePicture: z.url("Invalid profile picture URL"),
});

export type SignupFormData = z.infer<typeof signupSchema>;
