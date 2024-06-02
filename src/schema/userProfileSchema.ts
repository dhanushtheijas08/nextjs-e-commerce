import * as z from "zod";

export const userProfileSchema = z.object({
  id: z.optional(z.string()),
  name: z.optional(z.string()),
  email: z.optional(z.string().email()),
  oldPassword: z.optional(z.string()),
  newPassword: z.optional(z.string()),
  imgUrl: z.optional(z.string()),
});
export type UserProfileType = z.infer<typeof userProfileSchema>;
