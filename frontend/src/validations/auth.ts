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

export const onboardingSchema = signupSchema.omit({ password: true }).extend({
    nativeLanguage: z.string().min(1, "Native language is required"),
    learningLanguage: z.string().min(1, "Learning language is required"),
    bio: z.string().min(1, "Bio is required").max(500, "Bio must be at most 500 characters long"),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;

export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
