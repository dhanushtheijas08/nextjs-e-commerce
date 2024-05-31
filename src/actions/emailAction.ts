"use server";

import { getBaseUrl } from "@/lib/utils";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const baseUrl = getBaseUrl();

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationLink = `${baseUrl}/auth/verify-email?token=${token}&email=${email}`;

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["delivered@resend.dev"],
      subject: "Hello world",
      html: `
        <h1>Hello world</h1>
        <p>Click the link below to verify your email</p>
        <a href="${verificationLink}">Verify Email</a>
      `,
    });
    return { data, error };
  } catch (error) {
    return { error };
  }
};
