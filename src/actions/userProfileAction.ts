"use server";
import prisma from "@/lib/db";
import { userProfileSchema } from "@/schema/userProfileSchema";
import { createSafeActionClient } from "next-safe-action";
import { compare, hash } from "bcrypt";
import { revalidatePath } from "next/cache";

const action = createSafeActionClient();

export const userProfileAction = action(userProfileSchema, async (data) => {
  try {
    const existUser = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!existUser) {
      throw new Error("User not found");
    }

    if (data.newPassword === "") {
      const user = await prisma.user.update({
        where: {
          id: data.id,
        },
        data: {
          name: data.name,
          email: data.email,
          image: existUser.image ? data.imgUrl : null,
        },
      });
      if (!user) throw new Error("User data failed to update");

      return {
        status: "success",
        message: "User data updated successfully",
      };
    }

    if (!existUser.password)
      throw new Error("User logined with social account");

    if (!data.oldPassword || !data.newPassword)
      throw new Error("Enter old and new password to update password");
    if (data.newPassword === data.newPassword)
      throw new Error("New password must be different from old password");
    const passwordMatch = compare(data.oldPassword!, existUser.password!);

    if (!passwordMatch) throw new Error("Old password does not match");

    const hashedPassword = await hash(data.newPassword!, 10);

    const user = await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        image: existUser.image ? data.imgUrl : null,
      },
    });

    if (!user) throw new Error("User data failed to update");

    revalidatePath("/dashboard/profile");

    return {
      status: "success",
      message: "User data updated successfully",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "error",
        message: error.message,
      };
    } else {
      return {
        status: "error",
        message: "Something went wrong. Please try again later.",
      };
    }
  }
});
