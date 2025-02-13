import * as z from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Please enter your last name." })
    .max(50, { message: "Last name is too long." }),
  description: z
    .string()
    .min(1, { message: "Please enter your last name." })
    .max(50, { message: "Last name is too long." }),
  price: z
    .string()
    .min(1, { message: "Please enter your last name." })
    .max(50, { message: "Last name is too long." }),
  category: z
    .string()
    .min(1, { message: "Please enter your last name." })
    .max(50, { message: "Last name is too long." }),
});
