/*
  Warnings:

  - Added the required column `description` to the `AnalyzeFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `analyzefile` ADD COLUMN `description` TEXT NOT NULL;
