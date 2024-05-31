"use server";

import { hash, compare } from "bcrypt";

import { createSafeActionClient } from "next-safe-action";
import { loginSchema, registerSchema } from "@/schema/authSchema";
import prisma from "@/lib/db";
import { generateRandomToken } from "@/lib/utils";
const action = createSafeActionClient();

export const generateVerificationToken = async (email: string) => {
  const userToken = generateRandomToken();

  await prisma.verificationToken.create({
    data: {
      email,
      token: userToken.token,
      expires: userToken.expiresAt,
    },
  });
};

export const deleteVerificationToken = async (
  token: string,
  tokenId: string
) => {
  const deletedToken = await prisma.verificationToken.delete({
    where: {
      id_token: {
        id: tokenId,
        token,
      },
    },
  });

  return deletedToken;
};

export const verifyToken = async (token: string, email: string) => {
  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
      token,
    },
  });

  if (!verificationToken || verificationToken.email !== email) {
    throw new Error("Invalid token");
  }

  if (verificationToken.expires < new Date()) {
    throw new Error("Token expired");
  }

  return verificationToken;
};

export const login = action(loginSchema, async ({ email, password }) => {
  console.log(email, password);
});

export const register = action(
  registerSchema,
  async ({ email, password, username }) => {
    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (existingUser) {
        throw new Error("User already exists");
      }
      const hashedPassword = await hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: username,
        },
      });
      console.log(user);

      return {
        status: "success",
        message: "User registered successfully",
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
          message: "An unknown error occurred",
        };
      }
    }
  }
);
