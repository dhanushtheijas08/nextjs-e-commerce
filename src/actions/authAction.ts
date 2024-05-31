"use server";

import { hash } from "bcrypt";
import { createSafeActionClient } from "next-safe-action";

import prisma from "@/lib/db";
import { loginSchema, registerSchema } from "@/schema/authSchema";
import { generateVerificationToken } from "./tokenAction";
import { sendVerificationEmail } from "./emailAction";
import { signIn } from "@/lib/auth";
const action = createSafeActionClient({});

export const login = action(loginSchema, async ({ email, password }) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new Error("User Not Exist");

    if (!user.emailVerified) throw new Error("Email not verified");

    await signIn("credentials", {
      email: user.email,
      password,
      redirectTo: "/",
    });

    return {
      status: "success",
      message: "User logged in successfully",
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
});

export const register = action(
  registerSchema,
  async ({ email, password, username }) => {
    try {
      if (!email || !password || !username)
        throw new Error("All fields are required");
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
      if (user) {
        const verificationToken = await generateVerificationToken(email);
        await sendVerificationEmail(email, verificationToken.token);
      }

      return {
        status: "success",
        message: "User registered successfully",
      };
    } catch (error) {
      if (error instanceof Error) {
        return { status: "error", message: error.message };
      } else {
        return {
          status: "error",
          message: "An unknown error occurred",
        };
      }
    }
  }
);
