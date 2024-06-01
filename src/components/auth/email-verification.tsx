"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const EmailVerification = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState("");
  useEffect(() => {
    const verifyUserToken = async () => {
      if (!token || !email) {
        toast.error("Invalid token");
        router.push("/auth/verify-email/error");
      }
      setIsLoading(true);
      try {
        const response = await fetch("/api/verify-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, email }),
        });
        const data = await response.json();
        if (data.success) {
          toast.error(`${data.message}. You can now login.`);
          router.replace("/auth/login");
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`${error.message}. Try to register again.`);

          if (
            error.message === "Token not found" ||
            error.message === "Token expired"
          ) {
            router.replace(
              `/auth/verify-email/error?errorMsg=${error.message}`
            );
          } else if (
            error.message === "Invalid token" ||
            error.message === "User not found"
          ) {
            router.replace("/auth/register");
          }
        }
      }
      setIsLoading(false);
    };

    verifyUserToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, email]);

  if (isLoading) {
    return (
      <div
        className="animate-spin inline-block size-12 border-[5px] border-current  text-foreground rounded-md"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <p> {success}</p>
      <p> Loading : {isLoading}</p>
      <p> Error : {error}</p>
    </div>
  );
};

export default EmailVerification;
