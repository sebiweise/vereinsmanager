/*
  Warnings:

  - A unique constraint covering the columns `[mitgliedId,gruppeId]` on the table `GruppeMitglied` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GruppeMitglied_mitgliedId_gruppeId_key" ON "public"."GruppeMitglied"("mitgliedId", "gruppeId");
