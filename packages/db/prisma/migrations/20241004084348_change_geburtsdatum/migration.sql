/*
  Warnings:

  - Changed the type of `geburtsdatum` on the `Mitglied` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Mitglied" ALTER COLUMN "rolle" SET DATA TYPE TEXT,
DROP COLUMN "geburtsdatum",
ADD COLUMN     "geburtsdatum" DATE NOT NULL;
