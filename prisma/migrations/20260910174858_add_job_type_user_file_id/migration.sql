/*
  Warnings:

  - Added the required column `jobType` to the `AnalyzeFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userFileId` to the `AnalyzeFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `analyzefile` ADD COLUMN `jobType` VARCHAR(191) NOT NULL,
    ADD COLUMN `userFileId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `AnalyzeFile` ADD CONSTRAINT `AnalyzeFile_userFileId_fkey` FOREIGN KEY (`userFileId`) REFERENCES `UserFile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
