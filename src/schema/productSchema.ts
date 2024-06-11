import { z } from "zod";

export const productSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(5, {
    message: "Product name must be atlest 5 characters",
  }),
  price: z.coerce
    .number({
      message: "Price must be a number",
    })
    .positive({
      message: "Price must be a positive number",
    }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters",
  }),
  variants: z.array(
    z.object({
      variantName: z
        .string({ message: "variant name is required" })
        .min(3, { message: "variant name must be at least 3 characters" })
        .max(50, { message: "variant name must be at least 3 characters" }),

      variantColorCode: z.coerce.number({
        message: "Color Code must be a number",
      }),
    })
  ),
});

export type Product = z.infer<typeof productSchema>;
