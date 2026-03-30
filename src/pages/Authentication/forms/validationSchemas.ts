import { z } from "zod";

export const LOGIN_FORM_SCHEMA = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email("Please enter a valid email address"),
    password: z
        .string({ required_error: "Password is required" })
        .min(6, "Password must be at least 6 characters long"),
    type: z.string({ required_error: "Type is required" }),
    rememberToken: z.boolean().optional()
});

export const FORGOT_PASSWORD_FORM_SCHEMA = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email("Please enter a valid email address"),
    type: z.string({ required_error: "Type is required" })
});

export const FORGOT_PASSWORD_VERIFICATION_SCHEMA = z.object({
    code: z
        .string({ required_error: "Verification code is required" })
        .length(4, "Verification code must be 4 digits")
        .regex(/^\d{4}$/, "Verification code must be numeric")
});

export const RESET_PASSWORD_FORM_SCHEMA = z
    .object({
        password: z
            .string({ required_error: "Password is required" })
            .min(6, "Password must be at least 6 characters long"),
        confirmPassword: z
            .string({ required_error: "Please confirm your password" })
            .min(6, "Confirm Password must be at least 6 characters long")
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    });
