"use client";
// import { signIn } from "@/lib/auth";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export function SignInButton() {
  return (
    // <form
    //   action={async () => {
    //     "use server";
    //     await signIn("github", {
    //       redirectTo: "/home",
    //     });
    //   }}
    // >
    //   <button type="submit">Sign in</button>
    // </form>
    <Button onClick={() => signIn("github", { redirectTo: "/dashboard" })}>
      Sign In
    </Button>
  );
}
