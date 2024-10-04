/*
  Warnings:

  - You are about to drop the column `type` on the `Telefon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Telefon" DROP COLUMN "type";

-- DropEnum
DROP TYPE "public"."TelefonType";
