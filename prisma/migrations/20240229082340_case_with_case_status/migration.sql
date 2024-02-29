/*
  Warnings:

  - You are about to drop the column `status` on the `case` table. All the data in the column will be lost.
  - Added the required column `caseStatus` to the `Case` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `case` DROP COLUMN `status`,
    ADD COLUMN `caseStatus` INTEGER NOT NULL;
