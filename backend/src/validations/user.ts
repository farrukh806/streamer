import z from "zod"

export const userValidationSchema = z.object({
    fullName: z.string().trim().min(3, "Full name must be at least 3 characters long").max(100, "Full name must be at most 100 characters long"),
    email: z.email("Invalid email address"),
    password: z.string().min(4, "Password must be at least 4 characters long").max(100, "Password must be at most 100 characters long"),
    nativeLanguage: z.string().trim().min(2, "Native language must be at least 2 characters long").max(100, "Native language must be at most 100 characters long"),
    learningLanguage: z.string().trim().min(2, "Learning language must be at least 2 characters long").max(100, "Learning language must be at most 100 characters long"),
    profilePicture: z.url("Invalid profile picture URL")
});

export const userCredsValidationSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(1, "Password is required")
})

export type IUserValidationSchema = z.infer<typeof userValidationSchema>
export type IUserCredsValidationSchema = z.infer<typeof userCredsValidationSchema>