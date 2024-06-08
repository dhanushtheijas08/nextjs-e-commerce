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
  jobs: z.array(
    z.object({
      jobcountry: z.string().min(1, { message: "Please select a category" }),
      jobcity: z.string().min(1, { message: "Please select a category" }),
      jobtitle: z
        .string()
        .min(3, { message: "Product Name must be at least 3 characters" }),
      employer: z
        .string()
        .min(3, { message: "Product Name must be at least 3 characters" }),
      startdate: z
        .string()
        .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
          message: "Start date should be in the format YYYY-MM-DD",
        }),
      enddate: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: "End date should be in the format YYYY-MM-DD",
      }),
    })
  ),
});

export type Product = z.infer<typeof productSchema>;
