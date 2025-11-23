import z from "zod"

export const userValidationSchema = z.object({
    fullName: z.string({ error: "Full name is required" }).trim().min(3, "Full name must be at least 3 characters long").max(100, "Full name must be at most 100 characters long"),
    email: z.email("Invalid email address"),
    password: z.string({ error: "Password is required" }).min(4, "Password must be at least 4 characters long").max(100, "Password must be at most 100 characters long"),
    profilePicture: z.url("Invalid profile picture URL"),
});

export const userOnboardingSchema = userValidationSchema.omit({
    password: true,
}).extend({
    nativeLanguage: z.string({ error: "Native language is required" }).trim().min(1, "Native language is required"),
    learningLanguage: z.string({ error: "Learning language is required" }).trim().min(1, "Learning language is required"),
    bio: z.string({ error: "Bio is required" }).trim().min(1, "Bio is required"),
})

export const userCredsValidationSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string({ error: "Password is required" }).min(1, "Password is required")
})

export type IUserValidationSchema = z.infer<typeof userValidationSchema>
export type IUserCredsValidationSchema = z.infer<typeof userCredsValidationSchema>
export type IUserOnboardingSchema = z.infer<typeof userOnboardingSchema>