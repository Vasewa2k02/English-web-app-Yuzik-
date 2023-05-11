/*
  Warnings:

  - A unique constraint covering the columns `[user_id,word_id]` on the table `lexicon_progresses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "lexicon_progresses_user_id_word_id_key" ON "lexicon_progresses"("user_id", "word_id");
