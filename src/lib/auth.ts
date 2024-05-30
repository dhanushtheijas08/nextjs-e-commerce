import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";

import prisma from "./db";

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
