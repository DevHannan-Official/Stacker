import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Full Name is required" })
      .min(3, { message: "Full Name must be at least 3 characters" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])/, {
        message:
          "Password must contain at least one lowercase and one uppercase letter",
      })
      // regex for one number
      .regex(/(?=.*\d)/, {
        message: "Password must contain at least one number",
      })
      // regex for one special character
      .regex(/(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signinSchema = z.object({
  emailOrUsername: z
    .string()
    .min(1, { message: "Email or Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const otpSchema = z.object({
  code: z
    .string()
    .min(1, { message: "OTP is required" })
    .min(6, { message: "Please enter a valid 6 digit OTP" })
    .max(6, { message: "Please enter a valid 6 digit OTP" }),
});

export const forgetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email" }),
});
