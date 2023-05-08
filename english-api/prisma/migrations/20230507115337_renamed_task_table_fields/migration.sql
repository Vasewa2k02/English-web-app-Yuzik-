/*
  Warnings:

  - You are about to drop the column `description` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `english_sentence` to the `tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `russian_sentence` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "english_sentence" TEXT NOT NULL,
ADD COLUMN     "russian_sentence" TEXT NOT NULL;
