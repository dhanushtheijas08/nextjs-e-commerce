import prisma from "@/lib/db";
import { generateRandomToken } from "@/lib/utils";

export const generateVerificationToken = async (email: string) => {
  const userToken = generateRandomToken();
  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token: userToken.token,
      expires: userToken.expiresAt,
    },
  });

  return verificationToken;
};

export const deleteVerificationToken = async (token: string) => {
  const deletedToken = await prisma.verificationToken.deleteMany({
    where: { token },
  });
  return deletedToken;
};

export const verifyToken = async (token: string, email: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        token,
      },
    });
    if (!verificationToken || verificationToken.email !== email) {
      throw new Error("Invalid token");
    }
    if (verificationToken.expires < new Date()) {
      throw new Error("Token expired");
    }
    await deleteVerificationToken(verificationToken.token);
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        emailVerified: new Date(),
      },
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};
