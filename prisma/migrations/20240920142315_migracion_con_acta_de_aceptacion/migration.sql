-- CreateTable
CREATE TABLE "actas_aceptacion" (
    "id" SERIAL NOT NULL,
    "numero_cotizacion" TEXT NOT NULL,
    "fecha_inicio" DATE NOT NULL,
    "fecha_final" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orden_servicio_id" INTEGER NOT NULL,
    "empresa_id" INTEGER NOT NULL,
    "proyecto_id" INTEGER NOT NULL,

    CONSTRAINT "actas_aceptacion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "actas_aceptacion" ADD CONSTRAINT "actas_aceptacion_orden_servicio_id_fkey" FOREIGN KEY ("orden_servicio_id") REFERENCES "oservicios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actas_aceptacion" ADD CONSTRAINT "actas_aceptacion_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actas_aceptacion" ADD CONSTRAINT "actas_aceptacion_proyecto_id_fkey" FOREIGN KEY ("proyecto_id") REFERENCES "proyectos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
