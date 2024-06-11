/*
  Warnings:

  - Changed the type of `color` on the `ProductVariant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "color",
ADD COLUMN     "color" INTEGER NOT NULL,
ALTER COLUMN "name" SET DATA TYPE TEXT;
