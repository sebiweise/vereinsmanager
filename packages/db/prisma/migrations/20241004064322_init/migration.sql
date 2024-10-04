-- CreateEnum
CREATE TYPE "public"."MitgliederStatus" AS ENUM ('Aktiv', 'Ehrenabteilung', 'Inaktiv');

-- CreateTable
CREATE TABLE "public"."Alarm" (
    "einsatznummer" TEXT NOT NULL,
    "datum" TEXT NOT NULL,
    "einsatzstichwort" TEXT NOT NULL,
    "staerke" INTEGER NOT NULL,
    "einsatzort" TEXT NOT NULL,
    "kommentar" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Alarm_pkey" PRIMARY KEY ("einsatznummer")
);

-- CreateTable
CREATE TABLE "public"."Mitglied" (
    "id" SERIAL NOT NULL,
    "nachname" TEXT NOT NULL,
    "vorname" TEXT NOT NULL,
    "rolle" INTEGER NOT NULL,
    "geburtsdatum" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "telefon_mobil" TEXT NOT NULL,
    "telefon_festnetz" TEXT NOT NULL,
    "strasse" TEXT NOT NULL,
    "stadt" TEXT NOT NULL,
    "postleitzahl" TEXT NOT NULL,
    "status" "public"."MitgliederStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mitglied_pkey" PRIMARY KEY ("id")
);
