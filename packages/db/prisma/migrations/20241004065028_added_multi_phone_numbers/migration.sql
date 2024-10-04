/*
  Warnings:

  - You are about to drop the column `telefon_festnetz` on the `Mitglied` table. All the data in the column will be lost.
  - You are about to drop the column `telefon_mobil` on the `Mitglied` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."TelefonType" AS ENUM ('mobil', 'festnetz');

-- AlterTable
ALTER TABLE "public"."Mitglied" DROP COLUMN "telefon_festnetz",
DROP COLUMN "telefon_mobil";

-- CreateTable
CREATE TABLE "public"."TelefonOnMitglied" (
    "mitgliedId" INTEGER NOT NULL,
    "telefonId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TelefonOnMitglied_pkey" PRIMARY KEY ("mitgliedId","telefonId")
);

-- CreateTable
CREATE TABLE "public"."Telefon" (
    "id" TEXT NOT NULL,
    "telefonnummer" TEXT NOT NULL,
    "type" "public"."TelefonType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Telefon_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."TelefonOnMitglied" ADD CONSTRAINT "TelefonOnMitglied_mitgliedId_fkey" FOREIGN KEY ("mitgliedId") REFERENCES "public"."Mitglied"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TelefonOnMitglied" ADD CONSTRAINT "TelefonOnMitglied_telefonId_fkey" FOREIGN KEY ("telefonId") REFERENCES "public"."Telefon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
