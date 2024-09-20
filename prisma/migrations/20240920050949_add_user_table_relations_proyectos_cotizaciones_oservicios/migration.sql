/*
  Warnings:

  - You are about to drop the column `estaddo_orden` on the `oservicios` table. All the data in the column will be lost.
  - Added the required column `usuario_id` to the `cotizaciones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado_orden` to the `oservicios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario_id` to the `oservicios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario_id` to the `proyectos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cotizaciones" ADD COLUMN     "usuario_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "oservicios" DROP COLUMN "estaddo_orden",
ADD COLUMN     "estado_orden" "ESTADO" NOT NULL,
ADD COLUMN     "usuario_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "proyectos" ADD COLUMN     "usuario_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "habilitado" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "proyectos" ADD CONSTRAINT "proyectos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cotizaciones" ADD CONSTRAINT "cotizaciones_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oservicios" ADD CONSTRAINT "oservicios_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
