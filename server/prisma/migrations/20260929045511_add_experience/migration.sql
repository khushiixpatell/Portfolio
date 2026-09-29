/*
  Warnings:

  - You are about to drop the column `highlights` on the `Experience` table. All the data in the column will be lost.
  - Made the column `endDate` on table `Experience` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Experience` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "highlights",
ADD COLUMN     "companyUrl" TEXT,
ALTER COLUMN "endDate" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL;
