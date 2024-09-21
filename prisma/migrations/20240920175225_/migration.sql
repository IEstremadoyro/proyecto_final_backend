/*
  Warnings:

  - You are about to drop the column `cotizacion_id` on the `oservicios` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[numero_cotizacion]` on the table `oservicios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `numero_cotizacion` to the `oservicios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "oservicios" DROP CONSTRAINT "oservicios_cotizacion_id_fkey";

-- DropIndex
DROP INDEX "oservicios_cotizacion_id_key";

-- AlterTable
ALTER TABLE "oservicios" DROP COLUMN "cotizacion_id",
ADD COLUMN     "numero_cotizacion" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "oservicios_numero_cotizacion_key" ON "oservicios"("numero_cotizacion");

-- AddForeignKey
ALTER TABLE "oservicios" ADD CONSTRAINT "oservicios_numero_cotizacion_fkey" FOREIGN KEY ("numero_cotizacion") REFERENCES "cotizaciones"("numero_cotizacion") ON DELETE RESTRICT ON UPDATE CASCADE;
