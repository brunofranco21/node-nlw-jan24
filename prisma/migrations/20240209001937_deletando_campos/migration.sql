/*
  Warnings:

  - You are about to drop the column `indice` on the `Poll` table. All the data in the column will be lost.
  - You are about to drop the column `indice2` on the `Poll` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Poll" DROP COLUMN "indice",
DROP COLUMN "indice2";
