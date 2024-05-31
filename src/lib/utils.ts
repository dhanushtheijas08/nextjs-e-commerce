import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomToken() {
  return {
    token: crypto.randomUUID(),
    // 10 mins = 1000ms * 60s * 10m
    expiresAt: new Date(Date.now() + 1000 * 60 * 10 * 10),
  };
}

export function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.DOMAIN_URL}`;
  return "http://localhost:3000";
}
