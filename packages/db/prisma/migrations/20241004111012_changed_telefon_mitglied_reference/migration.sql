/*
  Warnings:

  - You are about to drop the `TelefonOnMitglied` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."TelefonOnMitglied" DROP CONSTRAINT "TelefonOnMitglied_mitgliedId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TelefonOnMitglied" DROP CONSTRAINT "TelefonOnMitglied_telefonId_fkey";

-- DropIndex
DROP INDEX "public"."Telefon_telefonnummer_key";

-- AlterTable
ALTER TABLE "public"."Telefon" ADD COLUMN     "mitgliedId" INTEGER;

-- DropTable
DROP TABLE "public"."TelefonOnMitglied";

-- AddForeignKey
ALTER TABLE "public"."Telefon" ADD CONSTRAINT "Telefon_mitgliedId_fkey" FOREIGN KEY ("mitgliedId") REFERENCES "public"."Mitglied"("id") ON DELETE SET NULL ON UPDATE CASCADE;
