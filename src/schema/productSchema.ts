import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 8;
const ACCEPTED_FILE_TYPES = ["image/png"];

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

      variantColorCode: z.string({
        message: "Color Code is required",
      }),

      variantImages: z.array(
        z.object({
          file: z
            .instanceof(File)
            .refine(
              (file) => {
                return !file || file.size <= MAX_UPLOAD_SIZE;
              },
              {
                message: `File size must be less than ${
                  MAX_UPLOAD_SIZE / 1024 / 1024
                }MB`,
              }
            )
            .refine((file) => {
              return ACCEPTED_FILE_TYPES.includes(file.type);
            }, "File must be a PNG"),
        })
      ),
    })
  ),
});

export type Product = z.infer<typeof productSchema>;
