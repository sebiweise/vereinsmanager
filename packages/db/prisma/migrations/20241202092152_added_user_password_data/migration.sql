-- AlterTable
ALTER TABLE "auth"."User" ADD COLUMN     "invalidLoginAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lockedAt" TIMESTAMP(3),
ADD COLUMN     "passwordHash" TEXT;
