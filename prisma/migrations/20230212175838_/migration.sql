-- CreateEnum
CREATE TYPE "TranscriptionStatus" AS ENUM ('PROCESSING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "Transcription" (
    "id" TEXT NOT NULL,
    "transcript" JSONB,
    "text" TEXT,
    "persons" INTEGER,
    "language" TEXT,
    "status" "TranscriptionStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "fileId" TEXT,

    CONSTRAINT "Transcription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transcription_fileId_key" ON "Transcription"("fileId");

-- AddForeignKey
ALTER TABLE "Transcription" ADD CONSTRAINT "Transcription_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
