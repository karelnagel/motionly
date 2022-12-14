/*
  Warnings:

  - Added the required column `fps` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "fps" INTEGER NOT NULL;
