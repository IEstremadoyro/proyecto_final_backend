-- CreateEnum
CREATE TYPE "ESTADO" AS ENUM ('PENDIENTE', 'ACEPTADA', 'RECHAZADA', 'CANCELADA');

-- CreateTable
CREATE TABLE "empresas" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ruc" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "correo_electronico" TEXT NOT NULL,
    "habilitado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "empresas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proyectos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha_inicio" DATE NOT NULL,
    "fecha_fin" DATE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "empresa_id" INTEGER NOT NULL,

    CONSTRAINT "proyectos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cotizaciones" (
    "id" SERIAL NOT NULL,
    "numero_cotizacion" TEXT NOT NULL,
    "fecha_cotizacion" DATE NOT NULL,
    "estado_cotizacion" "ESTADO" NOT NULL DEFAULT 'PENDIENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "proyecto_id" INTEGER NOT NULL,

    CONSTRAINT "cotizaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalle_cotizaciones" (
    "id" INTEGER NOT NULL,
    "item" INTEGER NOT NULL,
    "cotizacion_id" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio_unitario" DOUBLE PRECISION NOT NULL,
    "articulo_id" INTEGER NOT NULL,

    CONSTRAINT "detalle_cotizaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articulos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "articulos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oservicios" (
    "id" SERIAL NOT NULL,
    "numero_orden" TEXT NOT NULL,
    "fecha_orden" DATE NOT NULL,
    "estaddo_orden" "ESTADO" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cotizacion_id" INTEGER NOT NULL,

    CONSTRAINT "oservicios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalle_ordenes" (
    "id" SERIAL NOT NULL,
    "item" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio_unitario" DOUBLE PRECISION NOT NULL,
    "oservicio_id" INTEGER NOT NULL,
    "articulo_id" INTEGER NOT NULL,

    CONSTRAINT "detalle_ordenes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "empresas_correo_electronico_key" ON "empresas"("correo_electronico");

-- CreateIndex
CREATE UNIQUE INDEX "cotizaciones_numero_cotizacion_key" ON "cotizaciones"("numero_cotizacion");

-- CreateIndex
CREATE UNIQUE INDEX "oservicios_numero_orden_key" ON "oservicios"("numero_orden");

-- CreateIndex
CREATE UNIQUE INDEX "oservicios_cotizacion_id_key" ON "oservicios"("cotizacion_id");

-- AddForeignKey
ALTER TABLE "proyectos" ADD CONSTRAINT "proyectos_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cotizaciones" ADD CONSTRAINT "cotizaciones_proyecto_id_fkey" FOREIGN KEY ("proyecto_id") REFERENCES "proyectos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_cotizaciones" ADD CONSTRAINT "detalle_cotizaciones_cotizacion_id_fkey" FOREIGN KEY ("cotizacion_id") REFERENCES "cotizaciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_cotizaciones" ADD CONSTRAINT "detalle_cotizaciones_articulo_id_fkey" FOREIGN KEY ("articulo_id") REFERENCES "articulos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oservicios" ADD CONSTRAINT "oservicios_cotizacion_id_fkey" FOREIGN KEY ("cotizacion_id") REFERENCES "cotizaciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_ordenes" ADD CONSTRAINT "detalle_ordenes_articulo_id_fkey" FOREIGN KEY ("articulo_id") REFERENCES "articulos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_ordenes" ADD CONSTRAINT "detalle_ordenes_oservicio_id_fkey" FOREIGN KEY ("oservicio_id") REFERENCES "oservicios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
