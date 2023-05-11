/*
  Warnings:

  - A unique constraint covering the columns `[user_id,task_id]` on the table `grammar_progresses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "grammar_progresses_user_id_task_id_key" ON "grammar_progresses"("user_id", "task_id");
