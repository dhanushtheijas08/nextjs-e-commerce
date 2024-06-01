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
