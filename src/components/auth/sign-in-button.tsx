"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { ButtonHTMLAttributes } from "react";

type SignInButtonProps = {
  signType: "github" | "google";
  children: React.ReactNode;
  buttonVariant?: "default" | "outline";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const SignInButton = ({
  signType,
  children,
  buttonVariant,
  ...prop
}: SignInButtonProps) => {
  return (
    <Button {...prop} variant={buttonVariant} onClick={() => signIn(signType)}>
      {children}
    </Button>
  );
};

export default SignInButton;
