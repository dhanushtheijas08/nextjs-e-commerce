"use server";

import prisma from "@/lib/db";
import { productSchema } from "@/schema/productSchema";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const action = createSafeActionClient();

export const createProductAction = action(
  productSchema,
  async ({ id, name, description, price, variants }) => {
    const parsedProduct = productSchema.safeParse({
      id,
      name,
      description,
      price,
      variants,
    });

    if (!parsedProduct.success)
      return {
        status: "error",
        message: parsedProduct.error.errors.map((e) => e.message),
      };

    if (parsedProduct.data.id) {
      const product = await prisma.product.findUnique({
        where: {
          id: parsedProduct.data.id,
        },
      });
      if (!product)
        return {
          status: "error",
          message: "Product not found",
        };

      await prisma.product.update({
        where: {
          id: parsedProduct.data.id,
        },
        data: {
          name: parsedProduct.data.name,
          description: parsedProduct.data.description,
          price: parsedProduct.data.price,
        },
      });
      return {
        status: "success",
        message: "Product updated successfully",
      };
    }

    const product = await prisma.product.create({
      data: {
        name: parsedProduct.data.name,
        description: parsedProduct.data.description,
        price: parsedProduct.data.price,
        productVariant: {
          createMany: {
            data: parsedProduct.data.variants.map((variant) => ({
              name: variant.variantName,
              color: variant.variantColorCode,
            })),
          },
        },
      },
    });

    if (!product)
      return {
        status: "error",
        message: "Product not created",
      };

    revalidatePath("/dashboard/products");
    return {
      status: "success",
      message: "Product created successfully",
    };
  }
);

export const deleteProductAction = action(
  z.object({ id: z.coerce.number() }),
  async ({ id }) => {
    if (!id)
      return {
        status: "error",
        message: "Product ID is required",
      };
    const product = await prisma.product.delete({
      where: {
        id,
      },
    });

    if (!product)
      return {
        status: "error",
        message: "Product not deleted",
      };

    revalidatePath("/dashboard/products");

    return {
      status: "success",
      message: "Product deleted successfully",
    };
  }
);
