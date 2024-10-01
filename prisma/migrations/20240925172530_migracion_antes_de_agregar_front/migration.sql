/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `empresas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ruc]` on the table `empresas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `marcas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "empresas_nombre_key" ON "empresas"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "empresas_ruc_key" ON "empresas"("ruc");

-- CreateIndex
CREATE UNIQUE INDEX "marcas_nombre_key" ON "marcas"("nombre");
