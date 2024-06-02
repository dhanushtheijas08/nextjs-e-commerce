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

enum Role {
  USER,
  ADMIN,
}
export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, token }) {
      if (session && token.sub) {
        session.user.id = token.sub;
      }
      if (session.user && token.email) {
        session.user.role = token.role as Role;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.image = token.image as string;
        session.user.emailVerified = token.emailVerified as Date;
        session.user.isOAuth = token.isOAuth as boolean;
      }
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;
      let user = await prisma.user.findUnique({
        where: { id: token.sub },
      });
      if (!user) return token;

      token.id = user.id;
      token.email = user.email;
      token.image = user.image;
      token.role = user.role;
      token.emailVerified = user.emailVerified;
      token.isOAuth = user.password ? false : true;

      return token;
    },
  },
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
