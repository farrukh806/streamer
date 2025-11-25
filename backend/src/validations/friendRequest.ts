import z from "zod";

export const friendRequestValidationSchema = z.object({
    status: z.enum(["accepted", "rejected"]),
})

export type IFriendRequestValidationSchema = z.infer<typeof friendRequestValidationSchema>