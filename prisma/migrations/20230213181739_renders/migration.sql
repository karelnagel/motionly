-- CreateEnum
CREATE TYPE "RenderStatus" AS ENUM ('PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "RenderType" AS ENUM ('MEDIA', 'STILL');

-- CreateTable
CREATE TABLE "Render" (
    "id" TEXT NOT NULL,
    "fileUrl" TEXT,
    "status" "RenderStatus" NOT NULL DEFAULT 'PROCESSING',
    "progress" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "cost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "RenderType" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Render_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Render" ADD CONSTRAINT "Render_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
