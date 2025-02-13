import * as z from "zod";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Please enter your last name." })
    .max(50, { message: "Last name is too long." }),

  password: z
    .string()
    .min(1, { message: "Please enter password." })
    .max(255, { message: "Password is too long." })
    .regex(passwordValidation, {
      message:
        "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
    }),
});

export const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "Please enter your first name." })
      .max(50, { message: "First name is too long." }),

    lastName: z
      .string()
      .min(1, { message: "Please enter your last name." })
      .max(50, { message: "Last name is too long." }),

    username: z
      .string()
      .min(1, { message: "Please enter your last name." })
      .max(50, { message: "Last name is too long." }),

    password: z
      .string()
      .min(1, { message: "Please enter a password." })
      .max(255, { message: "Password is too long." })
      .regex(passwordValidation, {
        message:
          "Password must have at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character.",
      }),

    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // Points error to confirmPassword field
    message: "Passwords do not match.",
  });
