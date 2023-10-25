import * as z from "zod";

export const UserValidation = z.object({
  profile_photo: z.string().url().min(1),
  name: z.string().min(1).max(30),
  username: z.string().min(3).max(30),
  bio: z.string().max(30),
});
