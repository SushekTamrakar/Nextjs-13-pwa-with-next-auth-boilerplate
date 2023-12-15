import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z
    .number()
    .min(10, "phone number must be minimum of 10 characters long."),
  email: z.string().email(),
  password: z.string().min(10, "Password must be atleast 8 characters long."),
});

export type TSignUpSchema = z.infer<typeof signUpSchema>;
