import { z } from "zod"

// Define the schema with proper type coercion
const envValidationSchema = z.object({
    MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
    JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
    PORT: z.coerce.number().positive().default(5001), // Coerce string to number with default
    STREAM_APP_KEY: z.string().min(1, "STREAM_APP_KEY is required"),
    STREAM_APP_SECRET: z.string().min(1, "STREAM_APP_SECRET is required"),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development")
})

export type EnvConfig = z.infer<typeof envValidationSchema>

// Validate once and export the result
function validateEnv(): EnvConfig {
    console.log("Validating environment variables...")
    try {
        const parsed = envValidationSchema.parse(process.env)
        return parsed
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("❌ Environment validation failed:")
            error.issues.forEach((err: z.core.$ZodIssue) => {
                console.error(`  - ${err.path.join(".")}: ${err.message}`)
            })
        } else {
            console.error("❌ Error parsing environment variables:", error)
        }
        process.exit(1)
    }
}

// Export the validated config as a singleton
// This will be evaluated once when first imported
export const env = validateEnv()