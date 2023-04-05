/*
  Warnings:

  - You are about to drop the `_DictionaryToWord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DictionaryToWord" DROP CONSTRAINT "_DictionaryToWord_A_fkey";

-- DropForeignKey
ALTER TABLE "_DictionaryToWord" DROP CONSTRAINT "_DictionaryToWord_B_fkey";

-- DropForeignKey
ALTER TABLE "dictionaries" DROP CONSTRAINT "dictionaries_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "grammar_progresses" DROP CONSTRAINT "grammar_progresses_task_id_fkey";

-- DropForeignKey
ALTER TABLE "grammar_progresses" DROP CONSTRAINT "grammar_progresses_user_id_fkey";

-- DropForeignKey
ALTER TABLE "lexicon_progresses" DROP CONSTRAINT "lexicon_progresses_user_id_fkey";

-- DropForeignKey
ALTER TABLE "lexicon_progresses" DROP CONSTRAINT "lexicon_progresses_word_id_fkey";

-- DropForeignKey
ALTER TABLE "permissions" DROP CONSTRAINT "permissions_role_id_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "statistics" DROP CONSTRAINT "statistics_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_lesson_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_role_id_fkey";

-- DropForeignKey
ALTER TABLE "users_settings" DROP CONSTRAINT "users_settings_user_id_fkey";

-- AlterTable
ALTER TABLE "dictionaries" ADD COLUMN     "wordId" INTEGER;

-- DropTable
DROP TABLE "_DictionaryToWord";

-- CreateTable
CREATE TABLE "dictionary_to_word" (
    "id" SERIAL NOT NULL,
    "dictionaryId" INTEGER NOT NULL,
    "wordId" INTEGER NOT NULL,

    CONSTRAINT "dictionary_to_word_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dictionary_to_word_dictionaryId_wordId_key" ON "dictionary_to_word"("dictionaryId", "wordId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_settings" ADD CONSTRAINT "users_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grammar_progresses" ADD CONSTRAINT "grammar_progresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grammar_progresses" ADD CONSTRAINT "grammar_progresses_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dictionaries" ADD CONSTRAINT "dictionaries_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dictionaries" ADD CONSTRAINT "dictionaries_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "words"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dictionary_to_word" ADD CONSTRAINT "dictionary_to_word_dictionaryId_fkey" FOREIGN KEY ("dictionaryId") REFERENCES "dictionaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dictionary_to_word" ADD CONSTRAINT "dictionary_to_word_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "words"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lexicon_progresses" ADD CONSTRAINT "lexicon_progresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lexicon_progresses" ADD CONSTRAINT "lexicon_progresses_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "words"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "statistics" ADD CONSTRAINT "statistics_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
