/*
  Warnings:

  - You are about to drop the column `userId` on the `Topic` table. All the data in the column will be lost.
  - You are about to drop the `_OfferToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_userId_fkey";

-- DropForeignKey
ALTER TABLE "_OfferToTag" DROP CONSTRAINT "_OfferToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_OfferToTag" DROP CONSTRAINT "_OfferToTag_B_fkey";

-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "userId";

-- DropTable
DROP TABLE "_OfferToTag";
