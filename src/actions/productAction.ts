"use server";

import prisma from "@/lib/db";
import { productSchema } from "@/schema/productSchema";
import { createSafeActionClient } from "next-safe-action";

const action = createSafeActionClient();

export const createProductAction = action(
  productSchema,
  async ({ id, name, description, price }) => {
    const parsedProduct = productSchema.safeParse({
      id,
      name,
      description,
      price,
    });

    if (!parsedProduct.success)
      return {
        status: "error",
        message: parsedProduct.error.errors.map((e) => e.message),
      };

    const product = await prisma.product.create({
      data: {
        name: parsedProduct.data.name,
        description: parsedProduct.data.description,
        price: parsedProduct.data.price,
      },
    });

    if (!product)
      return {
        status: "error",
        message: "Product not created",
      };

    return {
      status: "success",
      message: "Product created successfully",
    };
  }
);
