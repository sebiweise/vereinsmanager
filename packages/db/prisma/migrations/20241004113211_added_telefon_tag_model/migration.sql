-- AlterTable
ALTER TABLE "public"."Telefon" ADD COLUMN     "telefonTagId" TEXT;

-- CreateTable
CREATE TABLE "public"."TelefonTag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TelefonTag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Telefon" ADD CONSTRAINT "Telefon_telefonTagId_fkey" FOREIGN KEY ("telefonTagId") REFERENCES "public"."TelefonTag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
