/*
  Warnings:

  - A unique constraint covering the columns `[proyecto_id]` on the table `cotizaciones` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cotizaciones_proyecto_id_key" ON "cotizaciones"("proyecto_id");
