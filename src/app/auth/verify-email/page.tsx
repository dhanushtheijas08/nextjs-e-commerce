import { verifyToken } from "@/actions/tokenAction";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

type VerificationPageProps = {
  searchParams: { token: string; email: string };
};

const VerificationPage = async ({ searchParams }: VerificationPageProps) => {
  const searchParam = new URLSearchParams(searchParams);
  const token = searchParam.get("token");
  const email = searchParam.get("email");

  if (!token || !email) {
    redirect("/auth/register");
  }
  const user = await verifyToken(token!, email!);
  if (!user) {
    redirect("/auth/register");
  }

  redirect("/auth/verify-email/success");

  return null;
};
export default VerificationPage;
