-- AlterTable
ALTER TABLE "public"."Mitglied" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "strasse" DROP NOT NULL,
ALTER COLUMN "stadt" DROP NOT NULL,
ALTER COLUMN "postleitzahl" DROP NOT NULL,
ALTER COLUMN "geburtsdatum" DROP NOT NULL;
