/*
  Warnings:

  - Added the required column `title` to the `teste` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "teste" ADD COLUMN     "title" TEXT NOT NULL;
