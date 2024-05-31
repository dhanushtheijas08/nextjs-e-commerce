import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomToken() {
  return {
    token: crypto.randomUUID(),
    // 10 mins = 1000ms * 60s * 10m
    expiresAt: new Date(Date.now() + 1000 * 60 * 10),
  };
}
