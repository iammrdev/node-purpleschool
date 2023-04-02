/*
  Warnings:

  - You are about to drop the column `offerId` on the `Tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_offerId_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "offerId";

-- CreateTable
CREATE TABLE "_OfferToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OfferToTag_AB_unique" ON "_OfferToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_OfferToTag_B_index" ON "_OfferToTag"("B");

-- AddForeignKey
ALTER TABLE "_OfferToTag" ADD CONSTRAINT "_OfferToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OfferToTag" ADD CONSTRAINT "_OfferToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
