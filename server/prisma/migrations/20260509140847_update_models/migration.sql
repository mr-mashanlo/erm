/*
  Warnings:

  - You are about to drop the column `companyId` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `Type` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Asset` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Type` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Type` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Type` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Type" DROP CONSTRAINT "Type_companyId_fkey";

-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "companyId",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Type" DROP COLUMN "companyId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Asset_code_key" ON "Asset"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_slug_key" ON "Company"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Type_slug_key" ON "Type"("slug");

-- AddForeignKey
ALTER TABLE "Type" ADD CONSTRAINT "Type_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
