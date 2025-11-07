/*
  Warnings:

  - Added the required column `hashPassowrd` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hashPassowrd" TEXT NOT NULL;
