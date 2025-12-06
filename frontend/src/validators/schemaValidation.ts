import { z } from "zod";

export const signupSchema = z
  .object({
    fullname: z
      .string()
      .min(2, "Full name must be at least 2 characters"),

    email: z
      .string()
      .email("Enter a valid email"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signinSchema = signupSchema.pick({
  email: true,
  password: true,
});

export type SignInValues = z.infer<typeof signinSchema>;

export type SignUpValues = z.infer<typeof signupSchema>;
