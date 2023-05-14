/*
  Warnings:

  - A unique constraint covering the columns `[english_sentence,russian_sentence,lesson_id]` on the table `tasks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tasks_english_sentence_russian_sentence_lesson_id_key" ON "tasks"("english_sentence", "russian_sentence", "lesson_id");
