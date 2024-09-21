/*
  Warnings:

  - You are about to drop the column `orden_servicio_id` on the `actas_aceptacion` table. All the data in the column will be lost.
  - Added the required column `nombre_proyecto` to the `actas_aceptacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orden_servicio` to the `actas_aceptacion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "actas_aceptacion" DROP CONSTRAINT "actas_aceptacion_orden_servicio_id_fkey";

-- AlterTable
ALTER TABLE "actas_aceptacion" DROP COLUMN "orden_servicio_id",
ADD COLUMN     "nombre_proyecto" TEXT NOT NULL,
ADD COLUMN     "orden_servicio" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "actas_aceptacion" ADD CONSTRAINT "actas_aceptacion_orden_servicio_fkey" FOREIGN KEY ("orden_servicio") REFERENCES "oservicios"("numero_orden") ON DELETE RESTRICT ON UPDATE CASCADE;
