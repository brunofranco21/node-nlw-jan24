/*
  Warnings:

  - You are about to drop the column `indice` on the `Poll` table. All the data in the column will be lost.
  - You are about to drop the `teste` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Poll" DROP COLUMN "indice";

-- DropTable
DROP TABLE "teste";
