/*
  Warnings:

  - You are about to drop the column `city` on the `Offer` table. All the data in the column will be lost.
  - Added the required column `cityId` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "city",
ADD COLUMN     "cityId" INTEGER NOT NULL,
ALTER COLUMN "image" DROP NOT NULL;

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
