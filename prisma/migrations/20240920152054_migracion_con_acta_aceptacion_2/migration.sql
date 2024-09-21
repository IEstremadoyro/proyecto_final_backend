/*
  Warnings:

  - You are about to drop the column `estaddo_orden` on the `oservicios` table. All the data in the column will be lost.
  - Added the required column `estado_orden` to the `oservicios` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "cotizaciones_proyecto_id_key";

-- AlterTable
ALTER TABLE "oservicios" DROP COLUMN "estaddo_orden",
ADD COLUMN     "estado_orden" "ESTADO" NOT NULL;
