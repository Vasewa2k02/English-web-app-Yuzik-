/*
  Warnings:

  - You are about to drop the column `wordId` on the `dictionaries` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "dictionaries" DROP CONSTRAINT "dictionaries_wordId_fkey";

-- AlterTable
ALTER TABLE "dictionaries" DROP COLUMN "wordId";

-- CreateTable
CREATE TABLE "_DictionaryToWord" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DictionaryToWord_AB_unique" ON "_DictionaryToWord"("A", "B");

-- CreateIndex
CREATE INDEX "_DictionaryToWord_B_index" ON "_DictionaryToWord"("B");

-- AddForeignKey
ALTER TABLE "_DictionaryToWord" ADD CONSTRAINT "_DictionaryToWord_A_fkey" FOREIGN KEY ("A") REFERENCES "dictionaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DictionaryToWord" ADD CONSTRAINT "_DictionaryToWord_B_fkey" FOREIGN KEY ("B") REFERENCES "words"("id") ON DELETE CASCADE ON UPDATE CASCADE;
