import NextAuth from "next-auth";

import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcrypt";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./db";
import { loginSchema } from "@/schema/authSchema";
import { CredentialsSignin } from "@auth/core/errors";

class CustomError extends CredentialsSignin {
  code = "custom";
}
export const { auth, handlers, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validCredentials = loginSchema.safeParse(credentials);
        if (!validCredentials.success) {
          throw new CustomError("Invalid credentials");
        }
        const { email, password } = validCredentials.data;
        if (!email || !password) {
          throw new CustomError("Missing credentials");
        }
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          throw new CustomError("User not found");
        }
        if (!user.emailVerified) {
          throw new CustomError("Email not verified");
        }
        const passwordMatch = await bcrypt.compare(password, user.password!);
        if (!passwordMatch) {
          throw new CustomError("Invalid password");
        }
        return user;
      },
    }),
  ],
});
