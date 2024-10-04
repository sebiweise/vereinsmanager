/*
  Warnings:

  - A unique constraint covering the columns `[telefonnummer]` on the table `Telefon` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Telefon_telefonnummer_key" ON "public"."Telefon"("telefonnummer");
