/*
  Warnings:

  - You are about to drop the column `precio` on the `articulos` table. All the data in the column will be lost.
  - Added the required column `fuente` to the `articulos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idMarca` to the `articulos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precioUnitario` to the `articulos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "articulos" DROP COLUMN "precio",
ADD COLUMN     "fuente" TEXT NOT NULL,
ADD COLUMN     "idMarca" INTEGER NOT NULL,
ADD COLUMN     "precioUnitario" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "marcas" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "marcas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "articulos" ADD CONSTRAINT "articulos_idMarca_fkey" FOREIGN KEY ("idMarca") REFERENCES "marcas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
