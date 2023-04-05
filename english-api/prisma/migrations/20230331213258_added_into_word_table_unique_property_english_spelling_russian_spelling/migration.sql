/*
  Warnings:

  - A unique constraint covering the columns `[englishSpelling,russianSpelling]` on the table `Word` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Word_englishSpelling_russianSpelling_key" ON "Word"("englishSpelling", "russianSpelling");
