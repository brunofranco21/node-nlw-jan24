/*
  Warnings:

  - Added the required column `indice` to the `Poll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Poll" ADD COLUMN     "indice" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "teste" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "teste_pkey" PRIMARY KEY ("id")
);
