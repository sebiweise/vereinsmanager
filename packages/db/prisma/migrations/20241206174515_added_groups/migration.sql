/*
  Warnings:

  - You are about to drop the column `rolle` on the `Mitglied` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Mitglied` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Mitglied" DROP COLUMN "rolle",
DROP COLUMN "status";

-- DropEnum
DROP TYPE "public"."MitgliederStatus";

-- CreateTable
CREATE TABLE "public"."Gruppe" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gruppe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GruppeMitglied" (
    "id" SERIAL NOT NULL,
    "gruppeId" INTEGER NOT NULL,
    "mitgliedId" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "beitrittsdatum" DATE,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GruppeMitglied_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gruppe_name_key" ON "public"."Gruppe"("name");

-- AddForeignKey
ALTER TABLE "public"."GruppeMitglied" ADD CONSTRAINT "GruppeMitglied_gruppeId_fkey" FOREIGN KEY ("gruppeId") REFERENCES "public"."Gruppe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GruppeMitglied" ADD CONSTRAINT "GruppeMitglied_mitgliedId_fkey" FOREIGN KEY ("mitgliedId") REFERENCES "public"."Mitglied"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
