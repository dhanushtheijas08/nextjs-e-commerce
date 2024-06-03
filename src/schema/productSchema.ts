import { z } from "zod";

export const productSchema = z.object({
  id: z.string().optional(),
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
});

export type Product = z.infer<typeof productSchema>;
