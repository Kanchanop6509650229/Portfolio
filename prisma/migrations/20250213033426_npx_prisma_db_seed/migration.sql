/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `liveUrl` on the `project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `project` DROP COLUMN `imageUrl`,
    DROP COLUMN `liveUrl`;
