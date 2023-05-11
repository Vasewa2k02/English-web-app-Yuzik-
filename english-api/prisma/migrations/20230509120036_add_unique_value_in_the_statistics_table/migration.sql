/*
  Warnings:

  - A unique constraint covering the columns `[date,user_id]` on the table `statistics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "statistics_date_user_id_key" ON "statistics"("date", "user_id");
