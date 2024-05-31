"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import AuthCard from "@/components/auth/auth-card";

import Link from "next/link";

import { useAction } from "next-safe-action/hooks";

import type { LoginInput } from "@/schema/authSchema";
import { loginSchema } from "@/schema/authSchema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/actions/authAction";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });
  const { execute, status } = useAction(login, {
    onSuccess: (data) => {
      if (data.status === "success") router.replace("/");
    },
  });
  const onSubmit = (data: LoginInput) => {
    const { email, password } = data;
    execute({ email, password });
  };
  return (
    <AuthCard
      cardTitle="Welcome back"
      cardDescription="Enter your email below to login to your account."
      showSocialLogin
      authCardType="login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="sara@gmail.com"
                    type="email"
                    disabled={status === "executing"}
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-between items-center">
                  <span>Password</span>

                  <Link
                    href="/auth/forgot-password"
                    className="text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="**********"
                    type="password"
                    disabled={status === "executing"}
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="font-spartan">
                  Hold <span className="font-bold">Ctrl</span> to display your
                  password temporarily.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button
              type="submit"
              className="w-full mt-2 text-base"
              disabled={status === "executing"}
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </AuthCard>
  );
};

export default LoginForm;
