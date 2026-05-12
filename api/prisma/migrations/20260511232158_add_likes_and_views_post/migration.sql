/*
  Warnings:

  - Added the required column `totalLikes` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalViews` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "totalLikes" INTEGER NOT NULL,
ADD COLUMN     "totalViews" INTEGER NOT NULL;
