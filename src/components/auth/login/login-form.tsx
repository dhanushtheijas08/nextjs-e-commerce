"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import AuthCard from "@/components/auth/auth-card";

import type { LoginInput } from "@/schema/loginSchema";
import { loginSchema } from "@/schema/loginSchema";

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

const LoginForm = () => {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = (data: LoginInput) => {
    console.log(data);
  };
  return (
    <AuthCard
      cardTitle="Welcome back"
      cardDescription="Enter your email below to login to your account."
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
                  <Input placeholder="sara@gmail.com" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" {...field} type="password" />
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
            <Button type="submit" className="w-full mt-2">
              Login
            </Button>
          </div>
        </form>
      </Form>
    </AuthCard>
  );
};

export default LoginForm;
