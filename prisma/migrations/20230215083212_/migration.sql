-- DropForeignKey
ALTER TABLE "Render" DROP CONSTRAINT "Render_userId_fkey";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "cloneOfId" TEXT;

-- AlterTable
ALTER TABLE "Render" ADD COLUMN     "projectId" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_cloneOfId_fkey" FOREIGN KEY ("cloneOfId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Render" ADD CONSTRAINT "Render_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Render" ADD CONSTRAINT "Render_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
