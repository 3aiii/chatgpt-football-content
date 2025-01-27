/*
  Warnings:

  - You are about to drop the column `details` on the `blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `blog` DROP COLUMN `details`,
    ADD COLUMN `content` LONGTEXT NULL;
