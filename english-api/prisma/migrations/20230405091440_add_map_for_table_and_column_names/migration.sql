/*
  Warnings:

  - You are about to drop the `Dictionary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GrammarProgress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lesson` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LexiconProgress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Statistics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSettings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Word` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Dictionary" DROP CONSTRAINT "Dictionary_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "GrammarProgress" DROP CONSTRAINT "GrammarProgress_taskId_fkey";

-- DropForeignKey
ALTER TABLE "GrammarProgress" DROP CONSTRAINT "GrammarProgress_userId_fkey";

-- DropForeignKey
ALTER TABLE "LexiconProgress" DROP CONSTRAINT "LexiconProgress_userId_fkey";

-- DropForeignKey
ALTER TABLE "LexiconProgress" DROP CONSTRAINT "LexiconProgress_wordId_fkey";

-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_roleId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "Statistics" DROP CONSTRAINT "Statistics_userId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleId_fkey";

-- DropForeignKey
ALTER TABLE "UserSettings" DROP CONSTRAINT "UserSettings_userId_fkey";

-- DropForeignKey
ALTER TABLE "_DictionaryToWord" DROP CONSTRAINT "_DictionaryToWord_A_fkey";

-- DropForeignKey
ALTER TABLE "_DictionaryToWord" DROP CONSTRAINT "_DictionaryToWord_B_fkey";

-- DropTable
DROP TABLE "Dictionary";

-- DropTable
DROP TABLE "GrammarProgress";

-- DropTable
DROP TABLE "Lesson";

-- DropTable
DROP TABLE "LexiconProgress";

-- DropTable
DROP TABLE "Permission";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "Statistics";

-- DropTable
DROP TABLE "Task";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserSettings";

-- DropTable
DROP TABLE "Word";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_settings" (
    "user_id" INTEGER NOT NULL,
    "count_repeat_word_for_learned" INTEGER NOT NULL,
    "count_learning_words_simultaneously" INTEGER NOT NULL,
    "learningModeWords" "LearningMode" NOT NULL,
    "learningModeTasks" "LearningMode" NOT NULL
);

-- CreateTable
CREATE TABLE "lessons" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "theory" TEXT NOT NULL,
    "passing_percent" INTEGER NOT NULL,

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lesson_id" INTEGER NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grammar_progresses" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "task_id" INTEGER NOT NULL,

    CONSTRAINT "grammar_progresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dictionaries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "creator_id" INTEGER NOT NULL,

    CONSTRAINT "dictionaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "words" (
    "id" SERIAL NOT NULL,
    "english_spelling" TEXT NOT NULL,
    "transcription" TEXT NOT NULL,
    "russian_spelling" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "words_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lexicon_progresses" (
    "id" SERIAL NOT NULL,
    "progress_count" INTEGER NOT NULL,
    "is_learned" BOOLEAN NOT NULL,
    "user_id" INTEGER NOT NULL,
    "word_id" INTEGER NOT NULL,

    CONSTRAINT "lexicon_progresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statistics" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "words" INTEGER NOT NULL,
    "tasks" INTEGER NOT NULL,
    "quiz_points" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "statistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "user_id" INTEGER NOT NULL,
    "refresh_token" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" SERIAL NOT NULL,
    "descriptor" TEXT NOT NULL,
    "context" TEXT,
    "method" "Method" NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_settings_user_id_key" ON "users_settings"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "words_english_spelling_russian_spelling_key" ON "words"("english_spelling", "russian_spelling");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_user_id_key" ON "sessions"("user_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_settings" ADD CONSTRAINT "users_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grammar_progresses" ADD CONSTRAINT "grammar_progresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grammar_progresses" ADD CONSTRAINT "grammar_progresses_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dictionaries" ADD CONSTRAINT "dictionaries_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lexicon_progresses" ADD CONSTRAINT "lexicon_progresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lexicon_progresses" ADD CONSTRAINT "lexicon_progresses_word_id_fkey" FOREIGN KEY ("word_id") REFERENCES "words"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "statistics" ADD CONSTRAINT "statistics_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DictionaryToWord" ADD CONSTRAINT "_DictionaryToWord_A_fkey" FOREIGN KEY ("A") REFERENCES "dictionaries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DictionaryToWord" ADD CONSTRAINT "_DictionaryToWord_B_fkey" FOREIGN KEY ("B") REFERENCES "words"("id") ON DELETE CASCADE ON UPDATE CASCADE;
