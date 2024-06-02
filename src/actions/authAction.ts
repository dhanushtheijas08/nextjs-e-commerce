"use server";

import { hash } from "bcrypt";
import { createSafeActionClient } from "next-safe-action";

import prisma from "@/lib/db";
import { loginSchema, registerSchema } from "@/schema/authSchema";
import { generateVerificationToken } from "./tokenAction";
import { sendVerificationEmail } from "./emailAction";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
const action = createSafeActionClient({});

export const login = action(loginSchema, async ({ email, password }) => {
  try {
    if (!email || !password) throw new Error("All fields are required");
    const user = await signIn("credentials", {
      email: email,
      password,
      redirect: false,
    });
    if (!user)
      throw new Error(
        "Access denied. Please check your credentials and try again."
      );

    return {
      status: "success",
      message: "User logged in successfully",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "AccessDenied":
          return {
            status: "error",
            message:
              "Access denied. Please check your credentials and try again.",
          };
        case "CredentialsSignin":
          console.log(error.message);
          return {
            status: "error",
            message: error.message.split("Read")[0],
          };
        case "EmailSignInError":
          return {
            status: "error",
            message: "Error with email sign-in. Please try again later.",
          };
        default:
          return {
            status: "error",
            message: "An authentication error occurred. Please try again.",
          };
      }
    } else if (error instanceof Error) {
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
        if (!existingUser.emailVerified) {
          const verificationToken = await generateVerificationToken(email);
          await sendVerificationEmail(email, verificationToken.token);
          throw new Error("Email not verified. Verification email sent");
        }
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
