"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import AuthCard from "@/components/auth/auth-card";

import { registerSchema } from "@/schema/authSchema";
import type { registerInput } from "@/schema/authSchema";

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
import { useAction } from "next-safe-action/hooks";
import { register } from "@/actions/authAction";

const RegisterForm = () => {
  const form = useForm<registerInput>({
    resolver: zodResolver(registerSchema),
  });
  const { execute, status } = useAction(register, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (data) => {
      console.log(data);
    },
  });
  const onSubmit = (data: registerInput) => {
    const { email, password, username } = data;
    execute({ email, password, username });
  };
  return (
    <AuthCard
      cardTitle="Create an account"
      cardDescription="Enter your email below to create an account"
      showSocialLogin
      authCardType="register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="dhanush theijas"
                    type="text"
                    disabled={status === "executing"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="********"
                    type="password"
                    disabled={status === "executing"}
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

export default RegisterForm;
