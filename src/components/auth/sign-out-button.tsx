"use client";
import { ButtonHTMLAttributes } from "react";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const SignOutButton = (prop: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button {...prop} onClick={() => signOut()}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
