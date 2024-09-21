/*
  Warnings:

  - You are about to drop the column `estado_orden` on the `oservicios` table. All the data in the column will be lost.
  - Added the required column `estaddo_orden` to the `oservicios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "oservicios" DROP COLUMN "estado_orden",
ADD COLUMN     "estaddo_orden" "ESTADO" NOT NULL;
