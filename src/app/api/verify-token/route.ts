import { deleteVerificationToken } from "@/actions/tokenAction";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  console.log("GET /api/verify-token");
  const body = await request.json();
  const { token, email } = body;
  if (!token || !email) {
    return NextResponse.json({
      success: false,
      message: "Invalid token",
      redirect: "/auth/register",
    });
  }

  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
      token,
    },
  });
  if (!verificationToken || verificationToken.email !== email) {
    return NextResponse.json({
      success: false,
      message: "Token not found",
      redirect: "/auth/register",
    });
  }
  if (verificationToken.expires < new Date()) {
    return NextResponse.json({
      success: false,
      message: "Token Expired",
      redirect: "/auth/register",
    });
  }
  await deleteVerificationToken(verificationToken.token);
  const user = await prisma.user.update({
    where: {
      email: verificationToken.email,
    },
    data: {
      emailVerified: new Date(),
    },
  });
  if (!user) {
    return NextResponse.json({
      success: false,
      message: "User not found",
      redirect: "/auth/register",
    });
  }
  return NextResponse.json({ success: true, message: "Token verified" });
}
