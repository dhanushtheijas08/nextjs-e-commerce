import NextAuth, { type DefaultSession } from "next-auth";

enum Role {
  USER,
  ADMIN,
}

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  emailVerified: Date;
  image: string;
  isOAuth: boolean;
  role: Role;
};
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
