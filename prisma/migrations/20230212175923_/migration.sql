/*
  Warnings:

  - Made the column `fileId` on table `Transcription` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Transcription" DROP CONSTRAINT "Transcription_fileId_fkey";

-- AlterTable
ALTER TABLE "Transcription" ALTER COLUMN "fileId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Transcription" ADD CONSTRAINT "Transcription_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
