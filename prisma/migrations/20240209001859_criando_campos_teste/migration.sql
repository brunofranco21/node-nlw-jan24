/*
  Warnings:

  - Added the required column `indice2` to the `Poll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Poll" ADD COLUMN     "indice2" INTEGER NOT NULL;
